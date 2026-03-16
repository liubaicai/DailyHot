FROM node:20-alpine AS base

ENV NODE_ENV=docker

# 清理缓存
RUN rm -rf /var/cache/apk/*

RUN npm install -g pnpm
WORKDIR /app

COPY . .

# 构建
WORKDIR /app/web
ENV VITE_GLOBAL_API=/api
ENV VITE_ICP=
ENV VITE_DIR=/
RUN pnpm install && pnpm build && cp -r dist/* /app/api/public && rm -rf /app/web/node_modules

WORKDIR /app/api
RUN pnpm install && pnpm build

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