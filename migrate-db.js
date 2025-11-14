/**
 * Скрипт миграции базы данных SQLite
 * Добавляет поля для системы авторизации с ролями
 * 
 * Запуск: node migrate-db.js
 */

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./collection.db', (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к БД:', err.message);
    process.exit(1);
  }
  console.log('✅ Подключено к базе данных SQLite');
});

// Миграция: добавление полей в таблицу users
function migrateUsers() {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Проверяем существование таблицы users
      db.get("SELECT name FROM sqlite_master WHERE type='table' AND name='users'", (err, row) => {
        if (err) {
          reject(err);
          return;
        }

        if (!row) {
          console.log('📝 Создание таблицы users...');
          // Создаем таблицу users с нуля
          db.run(`
            CREATE TABLE users (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT UNIQUE NOT NULL,
              password TEXT NOT NULL,
              email TEXT,
              name TEXT,
              surname TEXT,
              phone TEXT,
              role TEXT DEFAULT 'user',
              createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
            )
          `, (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('✅ Таблица users создана');
              resolve();
            }
          });
        } else {
          console.log('📝 Обновление таблицы users...');
          // Таблица существует, добавляем недостающие поля
          const alterQueries = [
            { sql: "ALTER TABLE users ADD COLUMN email TEXT", field: 'email' },
            { sql: "ALTER TABLE users ADD COLUMN name TEXT", field: 'name' },
            { sql: "ALTER TABLE users ADD COLUMN surname TEXT", field: 'surname' },
            { sql: "ALTER TABLE users ADD COLUMN phone TEXT", field: 'phone' },
            { sql: "ALTER TABLE users ADD COLUMN role TEXT DEFAULT 'user'", field: 'role' },
            { sql: "ALTER TABLE users ADD COLUMN createdAt TEXT", field: 'createdAt' }
          ];

          let completed = 0;
          let hasErrors = false;

          alterQueries.forEach(query => {
            db.run(query.sql, (err) => {
              completed++;
              if (err) {
                // Игнорируем ошибку "duplicate column" - поле уже существует
                if (!err.message.includes('duplicate column')) {
                  console.error(`❌ Ошибка добавления поля ${query.field}:`, err.message);
                  hasErrors = true;
                } else {
                  console.log(`ℹ️  Поле ${query.field} уже существует`);
                }
              } else {
                console.log(`✅ Поле ${query.field} добавлено`);
              }

              if (completed === alterQueries.length) {
                if (hasErrors) {
                  reject(new Error('Ошибки при миграции'));
                } else {
                  resolve();
                }
              }
            });
          });
        }
      });
    });
  });
}

// Создание тестового администратора (если не существует)
function createTestAdmin() {
  return new Promise((resolve, reject) => {
    const adminUsername = 'admin';
    const adminPassword = 'admin123'; // В production используйте хеширование!
    
    db.get('SELECT id FROM users WHERE username = ?', [adminUsername], (err, row) => {
      if (err) {
        reject(err);
        return;
      }

      if (row) {
        console.log('ℹ️  Администратор уже существует');
        resolve();
      } else {
        db.run(
          `INSERT INTO users (username, password, email, name, surname, role) 
           VALUES (?, ?, ?, ?, ?, ?)`,
          [adminUsername, adminPassword, 'admin@synergia.ru', 'Администратор', 'Системы', 'admin'],
          (err) => {
            if (err) {
              reject(err);
            } else {
              console.log('✅ Тестовый администратор создан');
              console.log('   Username: admin');
              console.log('   Password: admin123');
              resolve();
            }
          }
        );
      }
    });
  });
}

// Запуск миграции
async function runMigration() {
  try {
    console.log('🚀 Начало миграции базы данных...\n');
    
    await migrateUsers();
    console.log('');
    
    await createTestAdmin();
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

