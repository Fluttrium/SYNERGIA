# Развертывание на VPS

## Быстрый способ:

1. **Подключитесь к VPS:**
```bash
ssh root@YOUR_VPS_IP
```

2. **Создайте директорию и клонируйте код:**
```bash
mkdir -p /opt/synergia
cd /opt/synergia
git clone https://github.com/Fluttrium/SYNERGIA.git .
```

3. **Запустите Docker:**
```bash
docker-compose up -d
```

4. **Откройте порт 4444:**
```bash
ufw allow 4444
```

**Готово!** Приложение доступно по адресу: `http://YOUR_VPS_IP:4444`

## Управление:

```bash
# Просмотр логов
docker-compose logs -f

# Перезапуск
docker-compose restart

# Остановка
docker-compose down

# Обновление кода
git pull
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```
