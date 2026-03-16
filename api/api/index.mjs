import app from "../dist/app.js";

export default function handler(request) {
  return app.fetch(request);
}
