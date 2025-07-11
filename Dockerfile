FROM node:20-alpine AS base

# --------- Stage 1: build ứng dụng ---------
FROM base AS builder
WORKDIR /app

# 1. Copy manifest và cài toàn bộ (bao gồm devDeps)
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --frozen-lockfile

# 2. Copy toàn bộ source (bao gồm folder keys)
COPY . .

# 3. Build production
RUN pnpm build

# --------- Stage 2: chỉ chứa runtime ---------
FROM base
WORKDIR /app

# 1. Chỉ cài production dependencies
COPY package.json pnpm-lock.yaml ./
RUN corepack enable pnpm && pnpm install --production --frozen-lockfile

# 2. Lấy dist và keys từ stage build
COPY --from=builder /app/dist ./dist
# COPY --from=builder /app/keys ./keys

ENV NODE_ENV=production
EXPOSE 7878

# 3. Chạy ứng dụng
CMD ["node", "dist/main.js"]
    