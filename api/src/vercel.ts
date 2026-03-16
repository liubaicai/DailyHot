import app from "./app.js";

/**
 * Vercel Serverless Function 入口
 * Hono app.fetch 符合 Web Fetch API 标准，Vercel Node.js 运行时原生支持此签名
 * @see https://hono.dev/docs/getting-started/vercel
 */
export default app.fetch;
