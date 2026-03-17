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
        --bg: #0a0e14;
        --surface: #0d1117;
        --border: #1e2a3a;
        --text: #c9d1d9;
        --text-dim: #6e7681;
        --accent: #58a6ff;
        --green: #3fb950;
        --mono: "SF Mono", "Fira Code", "JetBrains Mono", "Consolas", monospace;
        --sans: "Inter", system-ui, -apple-system, sans-serif;
      }
      html {
        font-size: 15px;
      }
      body {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        color: var(--text);
        background: var(--bg);
        font-family: var(--mono);
        line-height: 1.6;
        -webkit-font-smoothing: antialiased;
      }
      a {
        color: var(--accent);
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
      main {
        flex: 1;
        max-width: 720px;
        width: 100%;
        margin: 0 auto;
        padding: 48px 24px;
      }
      code {
        font-family: var(--mono);
        font-size: 0.9em;
        background: rgba(110, 118, 129, 0.1);
        padding: 2px 6px;
        border-radius: 3px;
      }
      pre {
        margin: 0;
        white-space: pre;
        line-height: 1.5;
      }
      pre code {
        background: none;
        padding: 0;
      }
      .code-block {
        background: var(--surface);
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 14px 18px;
        margin: 8px 0 16px;
        overflow-x: auto;
        font-size: 0.85rem;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        margin: 8px 0 16px;
        font-size: 0.85rem;
      }
      th, td {
        border: 1px solid var(--border);
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background: var(--surface);
        color: var(--text-dim);
        font-weight: 600;
        text-transform: uppercase;
        font-size: 0.75rem;
        letter-spacing: 0.05em;
      }
      h1 {
        font-size: 1.6rem;
        font-weight: 700;
        color: var(--green);
        margin-bottom: 4px;
      }
      h2 {
        font-size: 1rem;
        font-weight: 600;
        color: var(--accent);
        margin: 32px 0 8px;
        padding-bottom: 6px;
        border-bottom: 1px solid var(--border);
      }
      p {
        margin-bottom: 8px;
        color: var(--text-dim);
        font-size: 0.9rem;
      }
      .tag {
        display: inline-block;
        font-size: 0.7rem;
        padding: 2px 8px;
        border-radius: 3px;
        border: 1px solid var(--border);
        color: var(--text-dim);
        margin-right: 6px;
      }
      footer {
        text-align: center;
        padding: 24px;
        font-size: 0.75rem;
        color: var(--text-dim);
        border-top: 1px solid var(--border);
      }
      @media (max-width: 600px) {
        main { padding: 24px 16px; }
        h1 { font-size: 1.3rem; }
        table { font-size: 0.8rem; }
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
        <meta name="description" content="DailyHot API - 聚合热门数据的 API 接口" />
        <Style>{globalClass}</Style>
      </head>
      <body>
        {props.children}
        <footer>Powered by Hono · DailyHot</footer>
      </body>
    </html>
  );
};

export default Layout;
