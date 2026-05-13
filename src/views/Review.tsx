import type { FC } from "hono/jsx";
import { css, Style } from "hono/css";
import { html } from "hono/html";
import Layout from "./Layout.js";

const Review: FC = () => {
  const reviewClass = css`
    :-hono-global {
      main.review-page {
        max-width: 1280px;
        padding: 48px 24px 64px;
      }
      .review-hero {
        display: grid;
        gap: 8px;
        margin-bottom: 20px;
      }
      .review-hero p {
        max-width: 760px;
      }
      .review-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin: 20px 0 22px;
        padding: 14px 16px;
        border: 1px solid var(--border);
        border-radius: 10px;
        background: linear-gradient(180deg, rgba(13, 17, 23, 0.96), rgba(10, 14, 20, 0.96));
      }
      .review-status-text {
        color: var(--text-dim);
        font-size: 0.85rem;
      }
      .review-stats {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
      }
      .review-stat {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 4px 9px;
        border: 1px solid var(--border);
        border-radius: 999px;
        color: var(--text-dim);
        font-size: 0.78rem;
      }
      .review-stat strong {
        color: var(--text);
        font-weight: 700;
      }
      .review-stat.ok strong {
        color: var(--green);
      }
      .review-stat.error strong {
        color: #f85149;
      }
      .review-refresh {
        cursor: pointer;
        border: 1px solid rgba(88, 166, 255, 0.45);
        border-radius: 6px;
        background: rgba(88, 166, 255, 0.12);
        color: var(--accent);
        font-family: var(--mono);
        font-size: 0.82rem;
        padding: 7px 12px;
      }
      .review-refresh:hover:not(:disabled) {
        background: rgba(88, 166, 255, 0.2);
      }
      .review-refresh:disabled {
        cursor: not-allowed;
        opacity: 0.55;
      }
      .review-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
        gap: 16px;
      }
      .review-card {
        position: relative;
        min-height: 280px;
        display: flex;
        flex-direction: column;
        gap: 12px;
        overflow: hidden;
        padding: 16px;
        border: 1px solid var(--border);
        border-radius: 12px;
        background:
          radial-gradient(circle at top right, rgba(88, 166, 255, 0.12), transparent 34%),
          var(--surface);
        box-shadow: 0 16px 36px rgba(0, 0, 0, 0.18);
      }
      .review-card::before {
        content: "";
        position: absolute;
        inset: 0 0 auto;
        height: 2px;
        background: var(--accent);
        opacity: 0.35;
      }
      .review-card.is-ok {
        border-color: rgba(63, 185, 80, 0.4);
      }
      .review-card.is-ok::before {
        background: var(--green);
      }
      .review-card.is-error {
        border-color: rgba(248, 81, 73, 0.48);
      }
      .review-card.is-error::before {
        background: #f85149;
      }
      .review-card-head {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 12px;
      }
      .review-card-title {
        min-width: 0;
      }
      .review-card h2 {
        overflow: hidden;
        margin: 0;
        padding: 0;
        border: 0;
        color: var(--text);
        font-size: 1rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .review-card-meta {
        margin: 3px 0 0;
        color: var(--text-dim);
        font-size: 0.72rem;
      }
      .review-badge {
        flex: 0 0 auto;
        border: 1px solid var(--border);
        border-radius: 999px;
        padding: 2px 8px;
        color: var(--text-dim);
        font-size: 0.7rem;
      }
      .review-badge.status-loading {
        color: var(--accent);
        border-color: rgba(88, 166, 255, 0.45);
      }
      .review-badge.status-ok {
        color: var(--green);
        border-color: rgba(63, 185, 80, 0.45);
      }
      .review-badge.status-error {
        color: #f85149;
        border-color: rgba(248, 81, 73, 0.45);
      }
      .review-list {
        display: grid;
        gap: 8px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
      .review-list li {
        display: grid;
        grid-template-columns: 24px minmax(0, 1fr);
        gap: 8px;
        align-items: start;
        min-height: 28px;
      }
      .review-rank {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        width: 22px;
        height: 22px;
        border-radius: 6px;
        background: rgba(110, 118, 129, 0.12);
        color: var(--text-dim);
        font-size: 0.72rem;
      }
      .review-item-body {
        min-width: 0;
      }
      .review-item-title {
        display: block;
        overflow: hidden;
        color: var(--text);
        font-size: 0.86rem;
        line-height: 1.45;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      a.review-item-title:hover {
        color: var(--accent);
      }
      .review-item-hot {
        display: block;
        overflow: hidden;
        color: var(--text-dim);
        font-size: 0.7rem;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .review-empty {
        color: var(--text-dim);
        font-size: 0.82rem;
      }
      .review-links {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-top: auto;
        padding-top: 12px;
        border-top: 1px solid var(--border);
      }
      .review-link {
        display: inline-flex;
        align-items: center;
        border: 1px solid var(--border);
        border-radius: 6px;
        padding: 3px 8px;
        font-size: 0.72rem;
      }
      .review-message-card {
        grid-column: 1 / -1;
        min-height: auto;
      }
      @media (max-width: 720px) {
        main.review-page {
          padding: 28px 16px 44px;
        }
        .review-toolbar {
          align-items: stretch;
          flex-direction: column;
        }
        .review-refresh {
          width: 100%;
        }
        .review-grid {
          grid-template-columns: 1fr;
        }
      }
    }
  `;

  return (
    <Layout title="Review | DailyHot API">
      <Style>{reviewClass}</Style>
      <main class="review-page">
        <section class="review-hero">
          <h1>$ DailyHot Review</h1>
          <p>实时拉取所有新闻源，每个接口展示 5 条内容，用于快速验证 API 可用性。</p>
          <p>
            <a href="/">返回首页</a> · <a href="/api/all">查看全部接口</a>
          </p>
        </section>

        <section class="review-toolbar" aria-label="接口检测概览">
          <div>
            <p id="review-status-text" class="review-status-text">准备加载接口列表...</p>
            <div class="review-stats">
              <span class="review-stat">总数 <strong id="stat-total">0</strong></span>
              <span class="review-stat ok">可用 <strong id="stat-ok">0</strong></span>
              <span class="review-stat error">失败 <strong id="stat-error">0</strong></span>
              <span class="review-stat">等待 <strong id="stat-pending">0</strong></span>
            </div>
          </div>
          <button id="review-refresh" class="review-refresh" type="button">重新检测</button>
        </section>

        <section id="review-grid" class="review-grid" aria-live="polite"></section>
      </main>
      {html`
        <script>
          (() => {
            const grid = document.getElementById("review-grid");
            const refreshButton = document.getElementById("review-refresh");
            const statusText = document.getElementById("review-status-text");
            const stats = {
              total: document.getElementById("stat-total"),
              ok: document.getElementById("stat-ok"),
              error: document.getElementById("stat-error"),
              pending: document.getElementById("stat-pending"),
            };
            const state = { total: 0, ok: 0, error: 0 };

            const setText = (element, value) => {
              if (element) element.textContent = String(value);
            };

            const updateStats = () => {
              const pending = Math.max(state.total - state.ok - state.error, 0);
              setText(stats.total, state.total);
              setText(stats.ok, state.ok);
              setText(stats.error, state.error);
              setText(stats.pending, pending);
              if (pending > 0) {
                setText(statusText, "正在检测 " + pending + " 个接口...");
              } else if (state.total > 0) {
                setText(statusText, "检测完成：" + state.ok + " 个可用，" + state.error + " 个失败。");
              }
            };

            const createNode = (tag, className, text) => {
              const element = document.createElement(tag);
              if (className) element.className = className;
              if (text !== undefined) element.textContent = text;
              return element;
            };

            const safeHref = (value) => {
              if (!value) return null;
              try {
                const url = new URL(String(value), window.location.origin);
                if (url.protocol === "http:" || url.protocol === "https:") return url.href;
              } catch {
                return null;
              }
              return null;
            };

            const setCardStatus = (elements, status, text) => {
              elements.card.classList.remove("is-loading", "is-ok", "is-error");
              elements.card.classList.add("is-" + status);
              elements.badge.className = "review-badge status-" + status;
              elements.badge.textContent = text;
            };

            const createCard = (route) => {
              const card = createNode("article", "review-card is-loading");
              const head = createNode("div", "review-card-head");
              const titleWrap = createNode("div", "review-card-title");
              const title = createNode("h2", "", route.name);
              const meta = createNode("p", "review-card-meta", "/api" + route.path);
              const badge = createNode("span", "review-badge status-loading", "loading");
              const list = createNode("ol", "review-list");
              const empty = createNode("p", "review-empty", "加载中...");
              const links = createNode("div", "review-links");
              const apiLink = createNode("a", "review-link", "JSON");

              apiLink.href = "/api" + route.path + "?limit=5";
              titleWrap.append(title, meta);
              head.append(titleWrap, badge);
              links.append(apiLink);
              card.append(head, list, empty, links);

              return { card, title, meta, badge, list, empty, links };
            };

            const appendSourceLink = (elements, value) => {
              const href = safeHref(value);
              if (!href) return;
              const link = createNode("a", "review-link", "源站");
              link.href = href;
              link.target = "_blank";
              link.rel = "noopener noreferrer";
              elements.links.append(link);
            };

            const renderItems = (elements, items) => {
              elements.list.replaceChildren();
              items.slice(0, 5).forEach((item, index) => {
                const row = createNode("li");
                const rank = createNode("span", "review-rank", String(index + 1));
                const body = createNode("div", "review-item-body");
                const href = safeHref(item.url || item.mobileUrl);
                const title = createNode(href ? "a" : "span", "review-item-title", item.title || "无标题");
                const hotText = item.hot === undefined || item.hot === null ? "" : "热度：" + item.hot;
                const hot = createNode("span", "review-item-hot", hotText);

                if (href) {
                  title.href = href;
                  title.target = "_blank";
                  title.rel = "noopener noreferrer";
                }
                body.append(title, hot);
                row.append(rank, body);
                elements.list.append(row);
              });
              elements.empty.hidden = items.length > 0;
              if (items.length === 0) elements.empty.textContent = "接口可用，但暂无数据。";
            };

            const loadSource = async (route, elements) => {
              try {
                const endpoint = "/api" + route.path + "?limit=5";
                const response = await fetch(endpoint, { cache: "no-store" });
                let payload;
                try {
                  payload = await response.json();
                } catch {
                  throw new Error("响应不是 JSON");
                }
                if (!response.ok || payload.code !== 200) {
                  throw new Error(payload.message || "HTTP " + response.status);
                }

                const items = Array.isArray(payload.data) ? payload.data : [];
                elements.title.textContent = payload.title || route.name;
                elements.meta.textContent =
                  (payload.name || route.name) +
                  " · " +
                  (payload.type || "热榜") +
                  " · " +
                  (payload.total ?? items.length) +
                  " 条";
                renderItems(elements, items);
                appendSourceLink(elements, payload.link);
                setCardStatus(elements, "ok", "ok");
                state.ok += 1;
              } catch (error) {
                elements.empty.hidden = false;
                elements.empty.textContent = error instanceof Error ? error.message : "请求失败";
                setCardStatus(elements, "error", "error");
                state.error += 1;
              } finally {
                updateStats();
              }
            };

            const renderMessage = (message) => {
              const card = createNode("article", "review-card review-message-card is-error");
              const title = createNode("h2", "", "加载失败");
              const text = createNode("p", "review-empty", message);
              card.append(title, text);
              grid.append(card);
            };

            const runQueue = async (items, worker, concurrency) => {
              let index = 0;
              const workers = Array.from(
                { length: Math.min(concurrency, items.length) },
                async () => {
                  while (index < items.length) {
                    const item = items[index];
                    index += 1;
                    await worker(item);
                  }
                },
              );
              await Promise.all(workers);
            };

            const runReview = async () => {
              grid.replaceChildren();
              refreshButton.disabled = true;
              state.total = 0;
              state.ok = 0;
              state.error = 0;
              updateStats();
              setText(statusText, "正在读取 /api/all ...");

              try {
                const response = await fetch("/api/all", { cache: "no-store" });
                const payload = await response.json();
                if (!response.ok || payload.code !== 200 || !Array.isArray(payload.routes)) {
                  throw new Error(payload.message || "接口列表返回异常");
                }
                const routes = payload.routes
                  .filter((route) => route && route.path)
                  .sort((a, b) => String(a.name).localeCompare(String(b.name)));

                state.total = routes.length;
                updateStats();

                if (routes.length === 0) {
                  setText(statusText, "暂无可检测的新闻源。");
                  return;
                }

                const cards = new Map();
                routes.forEach((route) => {
                  const elements = createCard(route);
                  cards.set(route.name, elements);
                  grid.append(elements.card);
                });

                await runQueue(routes, (route) => loadSource(route, cards.get(route.name)), 8);
              } catch (error) {
                const message = error instanceof Error ? error.message : "请求失败";
                setText(statusText, "检测失败：" + message);
                renderMessage(message);
              } finally {
                refreshButton.disabled = false;
              }
            };

            refreshButton.addEventListener("click", runReview);
            runReview();
          })();
        </script>
      `}
    </Layout>
  );
};

export default Review;
