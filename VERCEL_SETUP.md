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

**Важно:** Если в пароле есть специальные символы (!, ;, @, # и т.д.), их нужно URL-кодировать:
- `!` → `%21`
- `;` → `%3B`
- `@` → `%40`
- `#` → `%23`

Пример с URL-кодированием:
```
postgresql://gen_user:std%21Y8XUk-RF%3BV@185.211.170.182:5432/default_db?sslmode=require
```

Где:
- `gen_user` - имя пользователя БД
- `std%21Y8XUk-RF%3BV` - пароль (где %21 = !, %3B = ;)
- `185.211.170.182` - IP адрес сервера
- `5432` - порт PostgreSQL
- `default_db` - имя базы данных
- `?sslmode=require` - обязательное SSL соединение (рекомендуется добавить)

## Ваша строка подключения

Ваша строка подключения:
```
postgresql://gen_user:std%21Y8XUk-RF%3BV@185.211.170.182:5432/default_db
```

**Рекомендуется добавить SSL:**
```
postgresql://gen_user:std%21Y8XUk-RF%3BV@185.211.170.182:5432/default_db?sslmode=require
```

