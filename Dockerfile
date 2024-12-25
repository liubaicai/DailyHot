FROM dockerpull.org/node:20-alpine AS base

ENV NODE_ENV=docker

# 清理缓存
RUN rm -rf /var/cache/apk/*

RUN npm install -g pnpm --registry=https://registry.npmmirror.com
WORKDIR /app

COPY . .

# 构建
WORKDIR /app/web
ENV VITE_GLOBAL_API=/api
ENV VITE_ICP=
ENV VITE_DIR=/
RUN sed -i '/name: "douban-movie"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "genshin"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "starrail"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "lol"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "douban-group"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "jianshu"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "sspai"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "thepaper"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN sed -i '/name: "weread"/,/show:/ s/\(show:\) true/\1 false/' src/store/index.js
RUN pnpm install --registry=https://registry.npmmirror.com && pnpm build && cp -r dist/* /app/api/public && rm -rf /app/web/node_modules

WORKDIR /app/api
RUN sed -i 's|app.route("/", registry);|app.route("/api", registry);|; s|app.get("/", (c) => c.html(<Home />));|app.get("/api", (c) => c.html(<Home />));|' src/app.tsx
RUN pnpm install --registry=https://registry.npmmirror.com && pnpm build

RUN ls -li /app/api
RUN ls -li /app/api/public

ENV PORT=80
ENV ALLOWED_DOMAIN=*
ENV ALLOWED_HOST=127.0.0.1
ENV DISALLOW_ROBOT=true
ENV CACHE_TTL=3600
ENV REQUEST_TIMEOUT=6000
ENV USE_LOG_FILE=true
ENV RSS_MODE=false

# 暴露端口
EXPOSE 80

# 运行
CMD ["pnpm", "start"]