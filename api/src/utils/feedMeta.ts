// 各平台简介与分类标签

export interface FeedMeta {
  /** 平台简介 */
  description: string;
  /** 分类标签 */
  tags: string[];
}

const feedMeta: Record<string, FeedMeta> = {
  "36kr": {
    description: "36氪 —— 专注于报道TMT领域的创业投资及商业新闻",
    tags: ["科技", "创业", "商业", "投资"],
  },
  "51cto": {
    description: "51CTO —— 面向IT技术人员的专业技术社区和媒体平台",
    tags: ["科技", "编程", "IT"],
  },
  "52pojie": {
    description: "吾爱破解 —— 国内知名的软件安全与逆向工程技术论坛",
    tags: ["技术", "安全", "软件"],
  },
  acfun: {
    description: "AcFun弹幕视频网 —— 国内老牌弹幕视频站，ACG文化社区",
    tags: ["二次元", "动漫", "视频", "弹幕"],
  },
  baidu: {
    description: "百度热搜 —— 百度搜索实时热门话题与趋势",
    tags: ["综合", "热搜", "搜索引擎"],
  },
  bilibili: {
    description: "哔哩哔哩 —— 国内领先的年轻人文化社区和视频平台",
    tags: ["二次元", "视频", "动漫", "游戏", "科技"],
  },
  coolapk: {
    description: "酷安 —— 面向数码爱好者的应用商店与社区",
    tags: ["数码", "应用", "手机", "科技"],
  },
  csdn: {
    description: "CSDN —— 中国最大的开发者专业技术社区",
    tags: ["编程", "技术", "开发者"],
  },
  dgtle: {
    description: "数字尾巴 —— 致力于分享美好数字生活体验的科技媒体",
    tags: ["数码", "科技", "生活", "评测"],
  },
  "douban-group": {
    description: "豆瓣讨论 —— 豆瓣小组精选话题，涵盖生活、文化、兴趣讨论",
    tags: ["社区", "文化", "生活", "讨论"],
  },
  "douban-movie": {
    description: "豆瓣电影 —— 国内权威的电影评分与新片榜单",
    tags: ["电影", "影视", "评分", "娱乐"],
  },
  douyin: {
    description: "抖音 —— 短视频平台实时上升热点话题",
    tags: ["短视频", "热搜", "娱乐", "社交"],
  },
  earthquake: {
    description: "中国地震台网 —— 实时发布国内外地震速报信息",
    tags: ["地震", "自然灾害", "公共安全"],
  },
  gameres: {
    description: "GameRes游资网 —— 面向游戏从业者的游戏开发资讯平台",
    tags: ["游戏", "游戏开发", "行业"],
  },
  geekpark: {
    description: "极客公园 —— 聚焦互联网前沿科技新闻与创新趋势",
    tags: ["科技", "互联网", "创新", "创业"],
  },
  genshin: {
    description: "原神 —— 米哈游开放世界冒险游戏，米游社最新动态",
    tags: ["游戏", "二次元", "开放世界"],
  },
  github: {
    description: "GitHub Trending —— 全球最大代码托管平台的热门开源项目趋势",
    tags: ["编程", "开源", "开发者", "科技"],
  },
  guokr: {
    description: "果壳 —— 泛科学主题社区，科技有意思",
    tags: ["科学", "科普", "知识"],
  },
  hackernews: {
    description: "Hacker News —— 硅谷知名科技创业新闻聚合社区",
    tags: ["科技", "创业", "编程", "国际"],
  },
  hellogithub: {
    description: "HelloGitHub —— 分享 GitHub 上有趣、入门级的开源项目",
    tags: ["开源", "编程", "开发者"],
  },
  history: {
    description: "历史上的今天 —— 回顾今日在历史上发生的重大事件",
    tags: ["历史", "知识", "文化"],
  },
  honkai: {
    description: "崩坏3 —— 米哈游动作游戏，米游社最新动态",
    tags: ["游戏", "二次元", "动作"],
  },
  hostloc: {
    description: "全球主机交流论坛 —— VPS、服务器、建站技术讨论社区",
    tags: ["技术", "服务器", "建站"],
  },
  hupu: {
    description: "虎扑 —— 国内知名体育与生活社区，步行街热帖",
    tags: ["体育", "社区", "篮球", "生活"],
  },
  huxiu: {
    description: "虎嗅 —— 聚合优质的创新信息与人群的商业科技媒体",
    tags: ["科技", "商业", "财经"],
  },
  ifanr: {
    description: "爱范儿 —— 聚焦新创和消费主题的科技媒体",
    tags: ["科技", "数码", "消费电子"],
  },
  "ithome-xijiayi": {
    description: "IT之家「喜加一」—— 汇总各平台限时免费游戏信息",
    tags: ["游戏", "免费", "福利"],
  },
  ithome: {
    description: "IT之家 —— 前沿科技新闻网站，涵盖数码、软件、科学等",
    tags: ["科技", "数码", "软件", "新闻"],
  },
  jianshu: {
    description: "简书 —— 优质的创作与阅读社区",
    tags: ["写作", "阅读", "社区"],
  },
  juejin: {
    description: "稀土掘金 —— 面向全球中文开发者的技术内容平台",
    tags: ["编程", "技术", "前端", "开发者"],
  },
  kuaishou: {
    description: "快手 —— 短视频与直播平台热榜",
    tags: ["短视频", "直播", "娱乐"],
  },
  linuxdo: {
    description: "Linux.do —— Linux 与开发技术讨论社区",
    tags: ["技术", "Linux", "编程", "社区"],
  },
  lol: {
    description: "英雄联盟 —— 腾讯旗下热门MOBA游戏更新公告",
    tags: ["游戏", "电竞", "MOBA"],
  },
  miyoushe: {
    description: "米游社 —— 米哈游旗下游戏玩家社区，公告与资讯汇总",
    tags: ["游戏", "二次元", "社区"],
  },
  "netease-news": {
    description: "网易新闻 —— 综合性新闻资讯平台热点榜",
    tags: ["新闻", "综合", "热点"],
  },
  newsmth: {
    description: "水木社区 —— 源于清华的高知社群讨论平台",
    tags: ["社区", "学术", "讨论"],
  },
  ngabbs: {
    description: "NGA玩家社区 —— 精英玩家俱乐部，游戏与数码讨论",
    tags: ["游戏", "数码", "社区"],
  },
  nodeseek: {
    description: "NodeSeek —— VPS 与服务器资源交流社区",
    tags: ["技术", "服务器", "VPS"],
  },
  nytimes: {
    description: "纽约时报 —— 世界知名的国际新闻媒体",
    tags: ["新闻", "国际", "时事", "深度报道"],
  },
  producthunt: {
    description: "Product Hunt —— 每日精选最佳新产品发布平台",
    tags: ["科技", "创业", "产品", "国际"],
  },
  "qq-news": {
    description: "腾讯新闻 —— 腾讯旗下综合新闻资讯平台热点榜",
    tags: ["新闻", "综合", "热点"],
  },
  "sina-news": {
    description: "新浪新闻 —— 新浪旗下综合新闻资讯排行",
    tags: ["新闻", "综合", "热点"],
  },
  sina: {
    description: "新浪热榜 —— 新浪全平台热搜、热议与视频热榜",
    tags: ["热搜", "综合", "社交"],
  },
  smzdm: {
    description: "什么值得买 —— 中立的消费决策与网购推荐平台",
    tags: ["购物", "优惠", "消费", "生活"],
  },
  sspai: {
    description: "少数派 —— 高质量数字生活指南与效率工具推荐",
    tags: ["科技", "效率", "数码", "生活"],
  },
  starrail: {
    description: "崩坏：星穹铁道 —— 米哈游回合制策略游戏，米游社最新动态",
    tags: ["游戏", "二次元", "RPG"],
  },
  thepaper: {
    description: "澎湃新闻 —— 专注时政与思想的原创新闻平台",
    tags: ["新闻", "时政", "深度报道"],
  },
  tieba: {
    description: "百度贴吧 —— 全球领先的中文兴趣社区",
    tags: ["社区", "讨论", "综合"],
  },
  toutiao: {
    description: "今日头条 —— 基于个性化推荐的综合资讯平台热榜",
    tags: ["新闻", "综合", "热点"],
  },
  v2ex: {
    description: "V2EX —— 创意工作者与开发者社区",
    tags: ["技术", "编程", "社区", "开发者"],
  },
  weatheralarm: {
    description: "中央气象台 —— 全国气象预警实时信息发布",
    tags: ["天气", "预警", "公共安全"],
  },
  weibo: {
    description: "微博热搜 —— 中国最大社交媒体平台实时热搜榜",
    tags: ["热搜", "社交", "娱乐", "综合"],
  },
  weread: {
    description: "微信读书 —— 微信官方阅读平台书籍排行榜",
    tags: ["阅读", "书籍", "文化"],
  },
  yystv: {
    description: "游研社 —— 以游戏内容为主的新媒体，深度游戏文化报道",
    tags: ["游戏", "文化", "资讯"],
  },
  "zhihu-daily": {
    description: "知乎日报 —— 每天精选知乎优质问答与深度文章",
    tags: ["知识", "问答", "深度阅读"],
  },
  zhihu: {
    description: "知乎热榜 —— 中文互联网知名问答社区实时热门话题",
    tags: ["知识", "问答", "热搜", "综合"],
  },
};

export default feedMeta;
