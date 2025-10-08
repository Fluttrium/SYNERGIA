# Используем официальный Node.js образ как базовый
FROM node:18-alpine AS base

# Устанавливаем зависимости только когда они нужны
FROM base AS deps
# Проверяем https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine
RUN apk add --no-cache libc6-compat python3 make g++
WORKDIR /app

# Устанавливаем зависимости на основе предпочитаемого менеджера пакетов
COPY package.json package-lock.json* ./
RUN npm ci

# Пересобираем исходный код только когда это необходимо
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Создаем пользователя для безопасности
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем файлы базы данных
COPY collection.db ./

# Собираем приложение
RUN npm run build

# Продакшн образ, копируем все файлы и запускаем next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Отключаем телеметрию Next.js
ENV NEXT_TELEMETRY_DISABLED 1

# Устанавливаем необходимые пакеты для SQLite
RUN apk add --no-cache sqlite

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Копируем собранное приложение
COPY --from=builder /app/public ./public

# Автоматически используем output traces для уменьшения размера образа
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Копируем базу данных SQLite
COPY --from=builder --chown=nextjs:nodejs /app/collection.db ./

# Устанавливаем права доступа
USER nextjs

EXPOSE 4444

ENV PORT 4444
ENV HOSTNAME "0.0.0.0"

# Запускаем приложение
CMD ["node", "server.js"]
