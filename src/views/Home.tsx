import type { FC } from "hono/jsx";
import { html } from "hono/html";
import Layout from "./Layout.js";

const Home: FC = () => {
  return (
    <Layout title="DailyHot API">
      <main className="home docs-page">
        <div className="hero">
          <h1 className="hero-title">DailyHot API</h1>
          <p className="hero-desc">
            聚合热门数据的 API 接口，支持 JSON 和 RSS 两种输出格式，覆盖 50+ 热门平台。
          </p>
          <div class="control">
            <button id="all-button">
              <span className="btn-text">全部接口</span>
            </button>
            <button id="feeds-button">
              <span className="btn-text">订阅源列表</span>
            </button>
            <button id="github-button">
              <span className="btn-text">GitHub</span>
            </button>
          </div>
        </div>

        <div className="docs">
          {/* 快速开始 */}
          <section className="doc-section">
            <h2>快速开始</h2>
            <p>
              所有接口均以 <code>/api</code> 为前缀，返回 JSON 格式数据。
            </p>
            <div className="code-block">
              <code>GET /api/&#123;name&#125;</code>
            </div>
            <p>例如获取微博热搜：</p>
            <div className="code-block">
              <code>GET /api/weibo</code>
            </div>
          </section>

          {/* 请求参数 */}
          <section className="doc-section">
            <h2>请求参数</h2>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>参数</th>
                  <th>说明</th>
                  <th>示例</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>cache</code>
                  </td>
                  <td>设为 false 跳过缓存，获取最新数据</td>
                  <td>
                    <code>?cache=false</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>limit</code>
                  </td>
                  <td>限制返回条目数量</td>
                  <td>
                    <code>?limit=10</code>
                  </td>
                </tr>
                <tr>
                  <td>
                    <code>rss</code>
                  </td>
                  <td>设为 true 返回 RSS XML 格式</td>
                  <td>
                    <code>?rss=true</code>
                  </td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* RSS 订阅 */}
          <section className="doc-section">
            <h2>RSS 订阅</h2>
            <p>
              在任意热榜接口后添加 <code>?rss=true</code> 即可获取标准 RSS 2.0
              格式输出，方便订阅到 RSS 阅读器。
            </p>
            <div className="code-block">
              <code>GET /api/zhihu?rss=true</code>
            </div>
            <p>支持与其他参数组合使用：</p>
            <div className="code-block">
              <code>GET /api/bilibili?rss=true&amp;limit=20</code>
            </div>
          </section>

          {/* 订阅源发现 */}
          <section className="doc-section">
            <h2>订阅源发现</h2>
            <p>
              通过 Feeds API 查询所有可用的订阅源信息，便于 AI Agent 或 RSS 客户端自动发现。
            </p>
            <table className="doc-table">
              <thead>
                <tr>
                  <th>接口</th>
                  <th>说明</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <code>GET /api/feeds</code>
                  </td>
                  <td>获取全部订阅源列表</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/feeds?tag=科技</code>
                  </td>
                  <td>按标签筛选订阅源</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/feeds?detail=true</code>
                  </td>
                  <td>获取各源的详细元数据（较慢）</td>
                </tr>
                <tr>
                  <td>
                    <code>GET /api/feeds/&#123;name&#125;</code>
                  </td>
                  <td>获取单个订阅源的详细信息</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* 返回格式 */}
          <section className="doc-section">
            <h2>返回格式</h2>
            <p>JSON 响应的基本结构：</p>
            <div className="code-block code-json">
              <pre>
                <code>{`{
  "code": 200,
  "name": "weibo",
  "title": "微博热搜",
  "type": "热搜",
  "total": 50,
  "updateTime": "2024-01-01T00:00:00.000Z",
  "data": [
    {
      "id": 1,
      "title": "热搜标题",
      "hot": 9999999,
      "url": "https://..."
    }
  ]
}`}</code>
              </pre>
            </div>
          </section>

          {/* 全部接口 */}
          <section className="doc-section">
            <h2>全部接口</h2>
            <p>
              查看{" "}
              <a href="/all" className="doc-link">
                /api/all
              </a>{" "}
              获取当前可用的全部接口列表， 或访问{" "}
              <a href="/feeds" className="doc-link">
                /api/feeds
              </a>{" "}
              获取带描述和标签的完整订阅源信息。
            </p>
          </section>
        </div>
      </main>
      {html`
        <script>
          document.getElementById("all-button").addEventListener("click", () => {
            window.location.href = "/all";
          });
          document.getElementById("feeds-button").addEventListener("click", () => {
            window.location.href = "/feeds";
          });
          document.getElementById("github-button").addEventListener("click", () => {
            window.open("https://github.com/imsyy/DailyHotApi");
          });
        </script>
      `}
    </Layout>
  );
};

export default Home;
