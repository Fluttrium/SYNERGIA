/**
 * Скрипт миграции таблицы новостей
 * Добавляет поле body для Markdown контента
 * 
 * Запуск: node migrate-news.js
 */

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./collection.db', (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err.message);
    process.exit(1);
  }
  console.log('✅ Подключено к базе данных SQLite');
});

// Миграция: добавление поля body в таблицу items (новости)
function migrateNewsTable() {
  return new Promise((resolve, reject) => {
    db.run("ALTER TABLE items ADD COLUMN body TEXT", (err) => {
      if (err) {
        if (err.message.includes('duplicate column')) {
          console.log('ℹ️  Поле body уже существует');
          resolve();
        } else {
          console.error('❌ Ошибка добавления поля body:', err.message);
          reject(err);
        }
      } else {
        console.log('✅ Поле body добавлено в таблицу items');
        resolve();
      }
    });
  });
}

// Запуск миграции
async function runMigration() {
  try {
    console.log('🚀 Начало миграции таблицы новостей...\n');
    
    await migrateNewsTable();
    console.log('');
    
    console.log('✅ Миграция завершена успешно!');
  } catch (error) {
    console.error('❌ Ошибка миграции:', error.message);
    process.exit(1);
  } finally {
    db.close((err) => {
      if (err) {
        console.error('❌ Ошибка закрытия БД:', err.message);
      }
    });
  }
}

runMigration();

