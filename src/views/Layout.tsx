import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";

const Layout: FC = (props) => {
  const globalClass = css`
    :-hono-global {
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }
      :root {
        --text-color: #000;
        --text-color-gray: #cbcbcb;
        --text-color-hover: #fff;
        --icon-color: #444;
      }
      @media (prefers-color-scheme: dark) {
        :root {
          --text-color: #fff;
          --text-color-gray: #cbcbcb;
          --text-color-hover: #3c3c3c;
          --icon-color: #cbcbcb;
        }
      }
      a {
        text-decoration: none;
        color: var(--text-color);
      }
      body {
        width: 100vw;
        height: 100vh;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        color: var(--text-color);
        background-color: var(--text-color-hover);
        font-family: "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei";
        transition:
          color 0.3s,
          background-color 0.3s;
      }
      main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 20px;
        margin: 20px;
        height: 100%;
      }
      .img {
        width: 120px;
        height: 120px;
        margin-bottom: 20px;
      }
      .img img,
      .img svg {
        width: 100%;
        height: 100%;
      }
      .title {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 40px;
      }
      .title .title-text {
        font-size: 28px;
        font-weight: bold;
        margin-bottom: 12px;
        text-align: center;
      }
      .title .title-tip {
        font-size: 20px;
        opacity: 0.8;
      }
      .title .content {
        margin-top: 30px;
        display: flex;
        padding: 20px;
        border-radius: 12px;
        border: 1px dashed var(--text-color);
        user-select: text;
      }
      .control {
        display: flex;
        flex-direction: row;
        align-items: center;
      }
      .control button {
        display: flex;
        flex-direction: row;
        align-items: center;
        color: var(--text-color);
        border: var(--text-color) solid;
        background-color: var(--text-color-hover);
        border-radius: 8px;
        padding: 8px 12px;
        margin: 0 8px;
        transition:
          color 0.3s,
          background-color 0.3s;
        cursor: pointer;
      }
      .control button .btn-icon {
        width: 22px;
        height: 22px;
        margin-right: 8px;
      }
      .control button .btn-text {
        font-size: 14px;
      }
      .control button:hover {
        border: var(--text-color) solid;
        background: var(--text-color);
        color: var(--text-color-hover);
      }
      .control button i {
        margin-right: 6px;
      }
      footer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        line-height: 30px;
        padding: 20px;
      }
      .social {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin-bottom: 8px;
      }
      .social .link {
        display: flex;
        flex-direction: row;
        align-items: center;
        margin: 0 4px;
      }
      .social .link::after {
        content: "";
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: var(--text-color);
        opacity: 0.4;
        margin-left: 8px;
      }
      .social .link:last-child::after {
        display: none;
      }
      .social .link svg {
        width: 22px;
        height: 22px;
      }
      footer .power,
      footer .icp {
        font-size: 14px;
      }
      footer a {
        color: var(--text-color-gray);
        transition: color 0.3s;
      }
      /* 文档页面样式 */
      .docs-page {
        max-width: 800px;
        width: 100%;
        height: auto;
        align-items: flex-start;
      }
      .hero {
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .hero-title {
        font-size: 36px;
        font-weight: bold;
        margin-bottom: 12px;
      }
      .hero-desc {
        font-size: 18px;
        opacity: 0.8;
        margin-bottom: 24px;
        line-height: 1.6;
      }
      .docs {
        width: 100%;
        text-align: left;
        user-select: text;
      }
      .doc-section {
        margin-bottom: 32px;
      }
      .doc-section h2 {
        font-size: 22px;
        font-weight: bold;
        margin-bottom: 12px;
        padding-bottom: 8px;
        border-bottom: 1px solid var(--text-color-gray);
      }
      .doc-section p {
        font-size: 15px;
        line-height: 1.8;
        margin-bottom: 10px;
      }
      .doc-section code {
        background: rgba(128, 128, 128, 0.15);
        padding: 2px 6px;
        border-radius: 4px;
        font-family: "SF Mono", "Fira Code", "Consolas", monospace;
        font-size: 14px;
      }
      .code-block {
        background: rgba(128, 128, 128, 0.1);
        border: 1px solid rgba(128, 128, 128, 0.2);
        border-radius: 8px;
        padding: 12px 16px;
        margin: 10px 0;
        overflow-x: auto;
      }
      .code-block code {
        background: none;
        padding: 0;
        font-size: 14px;
      }
      .code-block pre {
        margin: 0;
        white-space: pre;
        line-height: 1.6;
      }
      .doc-table {
        width: 100%;
        border-collapse: collapse;
        margin: 10px 0;
        font-size: 14px;
      }
      .doc-table th,
      .doc-table td {
        border: 1px solid rgba(128, 128, 128, 0.3);
        padding: 8px 12px;
        text-align: left;
      }
      .doc-table th {
        background: rgba(128, 128, 128, 0.1);
        font-weight: 600;
      }
      .doc-link {
        color: #3b82f6;
        text-decoration: underline;
        transition: opacity 0.2s;
      }
      .doc-link:hover {
        opacity: 0.7;
      }
      footer a:hover {
        color: var(--text-color);
      }
    }
  `;
  return (
    <html lang="zh-CN">
      <head>
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta charset="utf-8" />
        <title>{props.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="description" content="今日热榜 API，一个聚合热门数据的 API 接口" />
        <Style>{globalClass}</Style>
      </head>
      <body>
        {props.children}
        <footer>
          <div class="power">
            Copyright&nbsp;©&nbsp;
              無名
            &nbsp;|&nbsp;Power by&nbsp;
              Hono
          </div>
          <div class="icp">
          </div>
        </footer>
      </body>
    </html>
  );
};

export default Layout;
