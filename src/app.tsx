import { Hono } from "hono";
import { cors } from "hono/cors";
import { config } from "./config.js";
import { serveStatic } from "@hono/node-server/serve-static";
import { compress } from "hono/compress";
import { prettyJSON } from "hono/pretty-json";
import { trimTrailingSlash } from "hono/trailing-slash";
import logger from "./utils/logger.js";
import registry from "./registry.js";
import robotstxt from "./robots.txt.js";
import NotFound from "./views/NotFound.js";
import Home from "./views/Home.js";
import Error from "./views/Error.js";

const app = new Hono();

// 压缩响应
app.use(compress());

// prettyJSON
app.use(prettyJSON());

// 尾部斜杠重定向
app.use(trimTrailingSlash());

// CORS
app.use(
  "*",
  cors({
    // 可写为数组
    origin: (origin) => {
      // 是否指定域名
      const isSame = config.ALLOWED_HOST && origin.endsWith(config.ALLOWED_HOST);
      return isSame ? origin : config.ALLOWED_DOMAIN;
    },
    allowMethods: ["POST", "GET", "OPTIONS"],
    allowHeaders: ["X-Custom-Header", "Upgrade-Insecure-Requests"],
    credentials: true,
  }),
);

// 静态资源
app.use(
  "/*",
  serveStatic({
    root: "./public",
    rewriteRequestPath: (path) => (path === "/favicon.ico" ? "/favicon.png" : path),
  }),
);

// HTTP 缓存控制
app.use("*", async (c, next) => {
  await next();
  // 已经设置过的不覆盖
  if (c.res.headers.has("Cache-Control")) return;
  const path = c.req.path;
  const contentType = c.res.headers.get("Content-Type") || "";
  if (contentType.includes("text/html")) {
    // HTML 页面：不缓存，始终请求服务器
    c.header("Cache-Control", "no-cache, no-store, must-revalidate");
  } else if (contentType.includes("application/xml")) {
    // RSS 响应：短缓存
    c.header("Cache-Control", `public, max-age=${config.CACHE_TTL}, s-maxage=${config.CACHE_TTL}`);
  } else if (contentType.includes("application/json")) {
    // API JSON 响应：短缓存，允许条件请求
    c.header("Cache-Control", `public, max-age=60, s-maxage=${config.CACHE_TTL}`);
  } else if (
    path.startsWith("/assets/") ||
    path.startsWith("/ico/") ||
    path.startsWith("/logo/")
  ) {
    // 静态资源：长缓存
    c.header("Cache-Control", "public, max-age=86400, immutable");
  }
});

// 主路由
app.route("/api", registry);

// robots
app.get("/robots.txt", robotstxt);
// 首页
app.get("/", (c) => c.html(<Home />));
app.get("/api", (c) => c.html(<Home />));
// 404
app.notFound((c) => c.html(<NotFound />, 404));
// error
app.onError((err, c) => {
  logger.error(`❌ [ERROR] ${err?.message}`);
  return c.html(<Error error={err?.message} />, 500);
});

export default app;
