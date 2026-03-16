# DailyHot 今日热榜

> 聚合全网热点，热门尽览无余

集成了 [DailyHotApi](https://github.com/imsyy/DailyHotApi) 的 API 接口与 [DailyHot](https://github.com/imsyy/DailyHot) 的 Web 前端，支持 **JSON** 和 **RSS** 两种输出格式，方便 AI Agent 和 RSS 阅读器订阅。

## 项目结构

```
DailyHot/
├── api/          # 后端 API（TypeScript + Hono + Node.js）
├── web/          # 前端（Vue 3 + Vite + Pinia + Naive UI）
└── Dockerfile    # 多阶段 Docker 构建
```

## 部署

### Docker（推荐）

```bash
docker build -t dailyhot .
docker run -d -p 80:80 dailyhot
```

### 手动部署

```bash
# 前端
cd web
pnpm install && pnpm build
cp -r dist/* ../api/public

# 后端
cd ../api
pnpm install && pnpm build
pnpm start
```

### 环境变量

| 变量 | 说明 | 默认值 |
|------|------|--------|
| `PORT` | 服务端口 | `6688`（Docker 中为 `80`） |
| `ALLOWED_DOMAIN` | 允许跨域的域名 | `*` |
| `CACHE_TTL` | 缓存过期时间（秒） | `3600` |
| `REQUEST_TIMEOUT` | 请求超时时间（毫秒） | `6000` |
| `RSS_MODE` | 全局 RSS 模式（所有接口默认返回 RSS） | `false` |
| `DISALLOW_ROBOT` | 禁止搜索引擎爬取 | `true` |
| `USE_LOG_FILE` | 是否将日志写入文件 | `true` |

## API 接口

### 获取热榜数据

```
GET /api/{name}
```

| 参数 | 说明 |
|------|------|
| `cache=false` | 跳过缓存，获取最新数据 |
| `limit=N` | 限制返回条目数量 |
| `rss=true` | 以 RSS XML 格式返回 |

示例：

```bash
# JSON 格式
curl https://your-host/api/zhihu

# RSS 格式
curl https://your-host/api/zhihu?rss=true

# 限制 10 条
curl https://your-host/api/weibo?limit=10
```

### 获取全部路由

```
GET /api/all
```

返回所有可用的热榜源名称和路径。

## RSS 订阅

每个热榜源都支持 RSS 输出，只需在接口地址后添加 `?rss=true`：

```
https://your-host/api/{name}?rss=true
```

可直接在 RSS 阅读器（如 Feedly、Inoreader、NetNewsWire 等）中添加订阅。

### 订阅源发现（AI 友好）

提供专为 AI Agent 设计的订阅源发现接口，返回所有源的简介、分类标签和订阅地址：

```
GET /api/feeds
```

响应示例：

```json
{
  "code": 200,
  "name": "DailyHot RSS Feeds",
  "description": "DailyHot 聚合热榜 RSS 订阅源列表...",
  "usage": {
    "json": "https://your-host/api/{name}",
    "rss": "https://your-host/api/{name}?rss=true",
    "feeds_api": "https://your-host/api/feeds",
    "feeds_by_tag": "https://your-host/api/feeds?tag={tag}",
    "feed_info": "https://your-host/api/feeds/{name}"
  },
  "tags": ["二次元", "体育", "公共安全", "创业", "编程", "..."],
  "count": 54,
  "feeds": [
    {
      "name": "zhihu",
      "description": "知乎热榜 —— 中文互联网知名问答社区实时热门话题",
      "tags": ["知识", "问答", "热搜", "综合"],
      "url": "https://your-host/api/zhihu",
      "rss": "https://your-host/api/zhihu?rss=true"
    }
  ]
}
```

#### 按标签筛选

```bash
# 只看游戏相关源
curl https://your-host/api/feeds?tag=游戏

# 只看科技相关源
curl https://your-host/api/feeds?tag=科技

# 只看编程相关源
curl https://your-host/api/feeds?tag=编程
```

#### 获取单个源详情

```bash
curl https://your-host/api/feeds/bilibili
```

返回该源的标题、类型、简介、标签、更新时间、订阅地址等完整元数据。

#### 获取详细模式

```bash
curl https://your-host/api/feeds?detail=true
```

加载每个源的实时元数据（标题、类型、条目数等），响应较慢，适合一次性抓取全量信息。

### 支持的平台

| 平台 | 名称 | 标签 |
|------|------|------|
| 36氪 | `36kr` | 科技、创业、商业、投资 |
| 51CTO | `51cto` | 科技、编程、IT |
| 吾爱破解 | `52pojie` | 技术、安全、软件 |
| AcFun | `acfun` | 二次元、动漫、视频、弹幕 |
| 百度 | `baidu` | 综合、热搜、搜索引擎 |
| 哔哩哔哩 | `bilibili` | 二次元、视频、动漫、游戏、科技 |
| 酷安 | `coolapk` | 数码、应用、手机、科技 |
| CSDN | `csdn` | 编程、技术、开发者 |
| 数字尾巴 | `dgtle` | 数码、科技、生活、评测 |
| 豆瓣讨论 | `douban-group` | 社区、文化、生活、讨论 |
| 豆瓣电影 | `douban-movie` | 电影、影视、评分、娱乐 |
| 抖音 | `douyin` | 短视频、热搜、娱乐、社交 |
| 中国地震台 | `earthquake` | 地震、自然灾害、公共安全 |
| GameRes游资网 | `gameres` | 游戏、游戏开发、行业 |
| 极客公园 | `geekpark` | 科技、互联网、创新、创业 |
| 原神 | `genshin` | 游戏、二次元、开放世界 |
| GitHub Trending | `github` | 编程、开源、开发者、科技 |
| 果壳 | `guokr` | 科学、科普、知识 |
| Hacker News | `hackernews` | 科技、创业、编程、国际 |
| HelloGitHub | `hellogithub` | 开源、编程、开发者 |
| 历史上的今天 | `history` | 历史、知识、文化 |
| 崩坏3 | `honkai` | 游戏、二次元、动作 |
| 全球主机交流 | `hostloc` | 技术、服务器、建站 |
| 虎扑 | `hupu` | 体育、社区、篮球、生活 |
| 虎嗅 | `huxiu` | 科技、商业、财经 |
| 爱范儿 | `ifanr` | 科技、数码、消费电子 |
| IT之家 | `ithome` | 科技、数码、软件、新闻 |
| IT之家「喜加一」 | `ithome-xijiayi` | 游戏、免费、福利 |
| 简书 | `jianshu` | 写作、阅读、社区 |
| 稀土掘金 | `juejin` | 编程、技术、前端、开发者 |
| 快手 | `kuaishou` | 短视频、直播、娱乐 |
| Linux.do | `linuxdo` | 技术、Linux、编程、社区 |
| 英雄联盟 | `lol` | 游戏、电竞、MOBA |
| 米游社 | `miyoushe` | 游戏、二次元、社区 |
| 网易新闻 | `netease-news` | 新闻、综合、热点 |
| 水木社区 | `newsmth` | 社区、学术、讨论 |
| NGA | `ngabbs` | 游戏、数码、社区 |
| NodeSeek | `nodeseek` | 技术、服务器、VPS |
| 纽约时报 | `nytimes` | 新闻、国际、时事、深度报道 |
| Product Hunt | `producthunt` | 科技、创业、产品、国际 |
| 腾讯新闻 | `qq-news` | 新闻、综合、热点 |
| 新浪新闻 | `sina-news` | 新闻、综合、热点 |
| 新浪热榜 | `sina` | 热搜、综合、社交 |
| 什么值得买 | `smzdm` | 购物、优惠、消费、生活 |
| 少数派 | `sspai` | 科技、效率、数码、生活 |
| 崩坏：星穹铁道 | `starrail` | 游戏、二次元、RPG |
| 澎湃新闻 | `thepaper` | 新闻、时政、深度报道 |
| 百度贴吧 | `tieba` | 社区、讨论、综合 |
| 今日头条 | `toutiao` | 新闻、综合、热点 |
| V2EX | `v2ex` | 技术、编程、社区、开发者 |
| 中央气象台 | `weatheralarm` | 天气、预警、公共安全 |
| 微博 | `weibo` | 热搜、社交、娱乐、综合 |
| 微信读书 | `weread` | 阅读、书籍、文化 |
| 游研社 | `yystv` | 游戏、文化、资讯 |
| 知乎日报 | `zhihu-daily` | 知识、问答、深度阅读 |
| 知乎 | `zhihu` | 知识、问答、热搜、综合 |

## 许可证

基于 [DailyHotApi](https://github.com/imsyy/DailyHotApi)（MIT）与 [DailyHot](https://github.com/imsyy/DailyHot)（MIT）。
