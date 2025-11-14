/**
 * Скрипт миграции новостей и проектов из SQLite в PostgreSQL
 * 
 * Запуск: node migrate-news-projects.js
 * 
 * Требования:
 * - Файл collection.db должен существовать
 * - DATABASE_URL должен быть настроен в .env
 */

const sqlite3 = require('sqlite3').verbose();
const { PrismaClient } = require('@prisma/client');
require('dotenv').config();

const sqliteDb = new sqlite3.Database('./collection.db', (err) => {
  if (err) {
    console.error('❌ Ошибка подключения к SQLite:', err.message);
    process.exit(1);
  }
  console.log('✅ Подключено к SQLite');
});

const prisma = new PrismaClient();

// Функция для чтения данных из SQLite
function readFromSQLite(query, params = []) {
  return new Promise((resolve, reject) => {
    sqliteDb.all(query, params, (err, rows) => {
      if (err) {
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

// Миграция новостей (items)
async function migrateNews() {
  console.log('\n📰 Миграция новостей...');
  
  try {
    // Читаем новости из SQLite
    const news = await readFromSQLite('SELECT * FROM items ORDER BY id');
    console.log(`   Найдено новостей: ${news.length}`);
    
    for (const item of news) {
      try {
        // Проверяем, существует ли уже новость
        const existing = await prisma.items.findUnique({
          where: { id: item.id }
        });
        
        if (existing) {
          console.log(`   ⏭️  Новость ${item.id} уже существует, пропускаем`);
          continue;
        }
        
        // Создаем новость в PostgreSQL
        const newItem = await prisma.items.create({
          data: {
            id: item.id, // Сохраняем оригинальный ID
            title: item.title || null,
            description: item.description || null,
            image: item.image ? Buffer.from(item.image) : null,
            link: item.link || null,
            body: item.body || null
          }
        });
        
        console.log(`   ✅ Новость ${item.id} "${item.title || 'Без названия'}" мигрирована`);
        
      } catch (error) {
        console.error(`   ❌ Ошибка миграции новости ${item.id}:`, error.message);
        // Продолжаем миграцию других новостей
      }
    }
    
    console.log(`✅ Миграция новостей завершена: ${news.length} новостей`);
  } catch (error) {
    console.error('❌ Ошибка миграции новостей:', error);
    throw error;
  }
}

// Миграция проектов (project)
async function migrateProjects() {
  console.log('\n🎯 Миграция проектов...');
  
  try {
    // Читаем проекты из SQLite
    const projects = await readFromSQLite('SELECT * FROM project ORDER BY id');
    console.log(`   Найдено проектов: ${projects.length}`);
    
    for (const project of projects) {
      try {
        // Проверяем, существует ли уже проект
        const existing = await prisma.project.findUnique({
          where: { id: project.id }
        });
        
        if (existing) {
          console.log(`   ⏭️  Проект ${project.id} уже существует, пропускаем`);
          continue;
        }
        
        // Создаем проект в PostgreSQL
        const newProject = await prisma.project.create({
          data: {
            id: project.id, // Сохраняем оригинальный ID
            title: project.title || null,
            description: project.description || null,
            image: project.image ? Buffer.from(project.image) : null,
            link: project.link || null
          }
        });
        
        console.log(`   ✅ Проект ${project.id} "${project.title || 'Без названия'}" мигрирован`);
        
      } catch (error) {
        console.error(`   ❌ Ошибка миграции проекта ${project.id}:`, error.message);
        // Продолжаем миграцию других проектов
      }
    }
    
    console.log(`✅ Миграция проектов завершена: ${projects.length} проектов`);
  } catch (error) {
    console.error('❌ Ошибка миграции проектов:', error);
    throw error;
  }
}

// Основная функция миграции
async function runMigration() {
  try {
    console.log('🚀 Начало миграции новостей и проектов из SQLite в PostgreSQL...\n');
    
    // Проверяем подключение к PostgreSQL
    await prisma.$connect();
    console.log('✅ Подключено к PostgreSQL\n');
    
    // Мигрируем новости
    await migrateNews();
    
    // Мигрируем проекты
    await migrateProjects();
    
    console.log('\n✅ Миграция завершена успешно!');
    
  } catch (error) {
    console.error('\n❌ Ошибка миграции:', error);
    process.exit(1);
  } finally {
    sqliteDb.close((err) => {
      if (err) {
        console.error('❌ Ошибка закрытия SQLite:', err.message);
      }
    });
    await prisma.$disconnect();
  }
}

// Запуск миграции
runMigration();

