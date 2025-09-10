# ====== Builder ======
FROM node:20-alpine AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
RUN apk add --no-cache bash
RUN corepack enable

# Copy lockfiles and package.json (for better caching)
COPY package.json ./
COPY pnpm-lock.yaml* ./
COPY yarn.lock* ./
COPY package-lock.json* ./

# Auto-detect package manager
RUN set -eux; \
    if [ -f pnpm-lock.yaml ]; then echo "Using pnpm"; pnpm i --frozen-lockfile; \
    elif [ -f yarn.lock ]; then echo "Using yarn"; yarn install --frozen-lockfile; \
    elif [ -f package-lock.json ]; then echo "Using npm"; npm ci; \
    else echo "No lockfile, using npm install"; npm install; fi

# Copy the rest
COPY . .

# Ensure prisma dir exists even if project doesn't use prisma (prevents COPY failures later)
RUN mkdir -p prisma

# Generate Prisma client if schema exists
RUN if [ -f "prisma/schema.prisma" ]; then \
      if [ -f pnpm-lock.yaml ]; then pnpm prisma generate; \
      elif [ -f yarn.lock ]; then yarn prisma generate; \
      else npx prisma generate; \
    fi; \
    else echo "No prisma/schema.prisma found, skipping generate"; fi

# Build Next.js
RUN if [ -f pnpm-lock.yaml ]; then pnpm build; \
    elif [ -f yarn.lock ]; then yarn build; \
    else npm run build; fi

# ====== Runner ======
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

RUN addgroup -g 1001 -S nodejs && adduser -S nextjs -u 1001

# Copy artifacts
COPY --from=builder /app/.next /app/.next
COPY --from=builder /app/public /app/public
COPY --from=builder /app/node_modules /app/node_modules
COPY --from=builder /app/package.json /app/package.json
COPY --from=builder /app/prisma /app/prisma

# Entrypoint
COPY scripts/entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

USER nextjs
EXPOSE 3000
ENTRYPOINT ["/entrypoint.sh"]
CMD ["node","node_modules/.bin/next","start","-p","3000"]
