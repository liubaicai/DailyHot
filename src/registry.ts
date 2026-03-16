import { fileURLToPath } from "url";
import { config } from "./config.js";
import { Hono } from "hono";
import getRSS from "./utils/getRSS.js";
import feedMeta from "./utils/feedMeta.js";
import path from "path";
import fs from "fs";

const app = new Hono();

// 模拟 __dirname
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// 路由数据
let allRoutePath: Array<string> = [];
const routersDirName: string = "routes";

// 排除路由
const excludeRoutes: Array<string> = [];

// 建立完整目录路径
const routersDirPath = path.join(__dirname, routersDirName);

// 递归查找函数
const findTsFiles = (dirPath: string, allFiles: string[] = [], basePath: string = ""): string[] => {
  // 读取目录下的所有文件和文件夹
  const items: Array<string> = fs.readdirSync(dirPath);
  // 遍历每个文件或文件夹
  items.forEach((item) => {
    const fullPath: string = path.join(dirPath, item);
    const relativePath: string = basePath ? path.posix.join(basePath, item) : item;
    const stat: fs.Stats = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      // 如果是文件夹，递归查找
      findTsFiles(fullPath, allFiles, relativePath);
    } else if (
      stat.isFile() &&
      (item.endsWith(".ts") || item.endsWith(".js")) &&
      !item.endsWith(".d.ts")
    ) {
      // 符合条件
      allFiles.push(relativePath.replace(/\.(ts|js)$/, ""));
    }
  });
  return allFiles;
};

// 获取全部路由
if (fs.existsSync(routersDirPath) && fs.statSync(routersDirPath).isDirectory()) {
  allRoutePath = findTsFiles(routersDirPath);
} else {
  console.error(`📂 The directory ${routersDirPath} does not exist or is not a directory`);
}

// 注册全部路由
for (let index = 0; index < allRoutePath.length; index++) {
  const router = allRoutePath[index];
  // 是否处于排除名单
  if (excludeRoutes.includes(router)) {
    continue;
  }
  const listApp = app.basePath(`/${router}`);
  // 返回榜单
  listApp.get("/", async (c) => {
    // 是否采用缓存
    const noCache = c.req.query("cache") === "false";
    // 限制显示条目
    const limit = c.req.query("limit");
    // 是否输出 RSS
    const rssEnabled = c.req.query("rss") === "true";
    // 获取路由路径
    const { handleRoute } = await import(`./routes/${router}.js`);
    const listData = await handleRoute(c, noCache);
    // 是否限制条目
    if (limit && listData?.data?.length > parseInt(limit)) {
      listData.total = parseInt(limit);
      listData.data = listData.data.slice(0, parseInt(limit));
    }
    // 是否输出 RSS
    if (rssEnabled || config.RSS_MODE) {
      const rss = getRSS(listData);
      if (typeof rss === "string") {
        c.header("Content-Type", "application/xml; charset=utf-8");
        return c.body(rss);
      } else {
        return c.json({ code: 500, message: "RSS generation failed" }, 500);
      }
    }
    return c.json({ code: 200, ...listData });
  });
  // 请求方式错误
  listApp.all("*", (c) => c.json({ code: 405, message: "Method Not Allowed" }, 405));
}

// 获取全部路由
app.get("/all", (c) =>
  c.json(
    {
      code: 200,
      count: allRoutePath.length,
      routes: allRoutePath.map((path) => {
        // 是否处于排除名单
        if (excludeRoutes.includes(path)) {
          return {
            name: path,
            path: undefined,
            message: "This interface is temporarily offline",
          };
        }
        return { name: path, path: `/${path}` };
      }),
    },
    200,
  ),
);

// RSS 订阅源发现接口，便于 AI / AI Agent 查询
app.get("/feeds", async (c) => {
  const baseUrl = new URL(c.req.url);
  const apiBase = `${baseUrl.protocol}//${baseUrl.host}/api`;
  // 是否获取详细信息（加载各路由元数据）
  const detail = c.req.query("detail") === "true";

  // 是否按标签筛选
  const tagFilter = c.req.query("tag");

  const feeds = [];
  for (const route of allRoutePath) {
    if (excludeRoutes.includes(route)) continue;
    const meta = feedMeta[route];
    // 按标签筛选
    if (tagFilter && (!meta || !meta.tags.includes(tagFilter))) continue;
    const feed: Record<string, unknown> = {
      name: route,
      description: meta?.description || "",
      tags: meta?.tags || [],
      url: `${apiBase}/${route}`,
      rss: `${apiBase}/${route}?rss=true`,
    };
    // 详细模式：动态加载路由获取标题等元数据
    if (detail) {
      try {
        const { handleRoute } = await import(`./routes/${route}.js`);
        const routeData = await handleRoute(undefined, false);
        feed.title = routeData.title;
        feed.type = routeData.type;
        feed.link = routeData.link;
        feed.total = routeData.total;
      } catch {
        feed.title = route;
        feed.error = "Failed to load route metadata";
      }
    }
    feeds.push(feed);
  }

  // 收集所有可用标签
  const allTags = [...new Set(Object.values(feedMeta).flatMap((m) => m.tags))].sort();

  return c.json({
    code: 200,
    name: "DailyHot RSS Feeds",
    description:
      "DailyHot 聚合热榜 RSS 订阅源列表。每个源支持 JSON 和 RSS 两种格式，" +
      "可通过 ?rss=true 获取 RSS 输出，?limit=N 限制条目数量，?cache=false 跳过缓存。",
    usage: {
      json: `${apiBase}/{name}`,
      rss: `${apiBase}/{name}?rss=true`,
      feeds_api: `${apiBase}/feeds`,
      feeds_by_tag: `${apiBase}/feeds?tag={tag}`,
      feeds_detail: `${apiBase}/feeds?detail=true`,
      feed_info: `${apiBase}/feeds/{name}`,
      params: {
        rss: "设为 true 返回 RSS XML 格式",
        limit: "限制返回条目数量",
        cache: "设为 false 跳过缓存",
        tag: "按标签筛选订阅源",
        detail: "设为 true 返回各源的详细元数据（较慢）",
      },
    },
    tags: allTags,
    count: feeds.length,
    feeds,
  });
});

// 单个源的详细信息接口
app.get("/feeds/:name{.+}", async (c) => {
  const name = c.req.param("name");
  if (!allRoutePath.includes(name) || excludeRoutes.includes(name)) {
    return c.json({ code: 404, message: `Feed "${name}" not found` }, 404);
  }
  const baseUrl = new URL(c.req.url);
  const apiBase = `${baseUrl.protocol}//${baseUrl.host}/api`;
  const meta = feedMeta[name];
  try {
    const { handleRoute } = await import(`./routes/${name}.js`);
    const routeData = await handleRoute(c, false);
    return c.json({
      code: 200,
      name: routeData.name,
      title: routeData.title,
      type: routeData.type,
      description: meta?.description || routeData.description || "",
      tags: meta?.tags || [],
      link: routeData.link,
      total: routeData.total,
      updateTime: routeData.updateTime,
      url: `${apiBase}/${name}`,
      rss: `${apiBase}/${name}?rss=true`,
      params: routeData.params || {},
    });
  } catch {
    return c.json({ code: 500, message: "Failed to load feed metadata" }, 500);
  }
});

export default app;
