import { handle } from "hono/vercel";
import app from "../dist/app.js";

export default handle(app);
