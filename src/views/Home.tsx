import type { FC } from "hono/jsx";
import Layout from "./Layout.js";

const Home: FC = () => {
  return (
    <Layout title="DailyHot API">
      <main>
        <h1>$ DailyHot API</h1>
        <p>聚合 50+ 平台热榜数据，支持 JSON / RSS 输出，便于 AI Agent 集成。</p>

        <h2># 给 AI 使用</h2>
        <p>将以下内容添加到你的 AI Agent / GPTs 的 system prompt 中即可调用本 API：</p>
        <div class="code-block">
          <pre><code>{`DailyHot API 可获取中文互联网各平台热榜。
Base URL: {当前域名}/api

获取热榜:  GET /api/{name}
获取RSS:   GET /api/{name}?rss=true
查看所有源: GET /api/all
订阅源列表: GET /api/feeds
按标签筛选: GET /api/feeds?tag={tag}
可选参数:  ?cache=false (跳过缓存) &limit=N (限制条数)`}</code></pre>
        </div>

        <h2># 接口规范</h2>
        <table>
          <thead>
            <tr><th>Endpoint</th><th>Method</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>GET /api/&#123;name&#125;</code></td><td>GET</td><td>获取指定平台热榜 JSON</td></tr>
            <tr><td><code>GET /api/&#123;name&#125;?rss=true</code></td><td>GET</td><td>获取 RSS 2.0 XML</td></tr>
            <tr><td><code>GET /api/all</code></td><td>GET</td><td>所有可用接口列表</td></tr>
            <tr><td><code>GET /api/feeds</code></td><td>GET</td><td>订阅源元数据(含标签/描述)</td></tr>
            <tr><td><code>GET /api/feeds/&#123;name&#125;</code></td><td>GET</td><td>单个源详细信息</td></tr>
          </tbody>
        </table>

        <h2># 请求参数</h2>
        <table>
          <thead>
            <tr><th>Param</th><th>Type</th><th>Description</th></tr>
          </thead>
          <tbody>
            <tr><td><code>cache</code></td><td>bool</td><td>设为 false 跳过缓存</td></tr>
            <tr><td><code>limit</code></td><td>int</td><td>限制返回条目数</td></tr>
            <tr><td><code>rss</code></td><td>bool</td><td>设为 true 返回 RSS XML</td></tr>
            <tr><td><code>tag</code></td><td>string</td><td>按标签筛选 (仅 /api/feeds)</td></tr>
            <tr><td><code>detail</code></td><td>bool</td><td>获取详细元数据 (仅 /api/feeds)</td></tr>
          </tbody>
        </table>

        <h2># 响应结构</h2>
        <div class="code-block">
          <pre><code>{`{
  "code": 200,
  "name": "weibo",
  "title": "微博热搜",
  "type": "热搜",
  "total": 50,
  "updateTime": "2024-01-01T00:00:00.000Z",
  "data": [
    { "id": 1, "title": "标题", "hot": 9999, "url": "https://..." }
  ]
}`}</code></pre>
        </div>

        <h2># 快速链接</h2>
        <p>
          <a href="/api/all">/api/all</a> ·{" "}
          <a href="/api/feeds">/api/feeds</a> ·{" "}
          <a href="https://github.com/liubaicai/DailyHot">GitHub</a>
        </p>
      </main>
    </Layout>
  );
};

export default Home;
