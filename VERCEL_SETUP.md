# Настройка базы данных на Vercel

## Проблема
После деплоя на Vercel база данных не работает, потому что не настроена переменная окружения `DATABASE_URL`.

## Решение

### 1. Получите строку подключения к PostgreSQL на Timeweb Cloud

Формат строки подключения:
```
postgresql://USERNAME:PASSWORD@HOST:PORT/DATABASE?sslmode=require
```

### 2. Настройте переменную окружения на Vercel

1. Откройте проект на Vercel: https://vercel.com/dashboard
2. Перейдите в **Settings** → **Environment Variables**
3. Добавьте переменную:
   - **Name**: `DATABASE_URL`
   - **Value**: ваша строка подключения к PostgreSQL
   - **Environment**: Production, Preview, Development (выберите все)
4. Нажмите **Save**

### 3. Перезапустите деплой

После добавления переменной окружения:
1. Перейдите в **Deployments**
2. Найдите последний деплой
3. Нажмите **Redeploy** (три точки → Redeploy)

### 4. Проверьте подключение

Откройте в браузере:
```
https://ваш-домен.vercel.app/api/health
```

Должен вернуться ответ:
```json
{
  "status": "ok",
  "timestamp": "...",
  "service": "synergia-app",
  "database": "connected"
}
```

## Важно

- **Не коммитьте** `DATABASE_URL` в репозиторий
- Используйте переменные окружения Vercel для хранения секретов
- Для production рекомендуется использовать connection pooling (если доступно на Timeweb Cloud)

## Формат DATABASE_URL для Timeweb Cloud

Пример:
```
postgresql://user:password@host.timeweb.cloud:5432/database_name?sslmode=require
```

Где:
- `user` - имя пользователя БД
- `password` - пароль БД
- `host.timeweb.cloud` - хост сервера
- `5432` - порт PostgreSQL (обычно 5432)
- `database_name` - имя базы данных
- `?sslmode=require` - обязательное SSL соединение

