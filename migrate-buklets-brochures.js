/**
 * Скрипт миграции буклетов и брошюр из SQLite в PostgreSQL
 * 
 * Запуск: node migrate-buklets-brochures.js
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

// Миграция буклетов
async function migrateBuklets() {
  console.log('\n📦 Миграция буклетов...');
  
  try {
    // Читаем буклеты из SQLite
    const buklets = await readFromSQLite('SELECT * FROM buklets');
    console.log(`   Найдено буклетов: ${buklets.length}`);
    
    for (const buklet of buklets) {
      try {
        // Проверяем, существует ли уже буклет
        const existing = await prisma.buklets.findUnique({
          where: { id: buklet.id }
        });
        
        if (existing) {
          console.log(`   ⏭️  Буклет ${buklet.id} уже существует, пропускаем`);
          continue;
        }
        
        // Создаем буклет в PostgreSQL
        const newBuklet = await prisma.buklets.create({
          data: {
            id: buklet.id, // Сохраняем оригинальный ID
            name: buklet.name || null
          }
        });
        
        console.log(`   ✅ Буклет ${buklet.id} "${buklet.name}" мигрирован`);
        
        // Мигрируем группы файлов буклета
        const fileGroups = await readFromSQLite(
          'SELECT * FROM buklet_file_groups WHERE buklet_id = ?',
          [buklet.id]
        );
        
        for (const group of fileGroups) {
          const newGroup = await prisma.buklet_file_groups.create({
            data: {
              id: group.id,
              buklet_id: buklet.id,
              title: group.title || '',
              description: group.description || null
            }
          });
          
          // Мигрируем изображения группы
          const images = await readFromSQLite(
            'SELECT * FROM buklet_images WHERE buklet_id = ? AND group_id = ?',
            [buklet.id, group.id]
          );
          
          for (const image of images) {
            await prisma.buklet_images.create({
              data: {
                id: image.id,
                buklet_id: buklet.id,
                group_id: group.id,
                image: image.image ? Buffer.from(image.image) : null,
                filename: image.filename || null
              }
            });
          }
          
          // Мигрируем PDF группы
          const pdfs = await readFromSQLite(
            'SELECT * FROM buklet_pdfs WHERE buklet_id = ? AND group_id = ?',
            [buklet.id, group.id]
          );
          
          for (const pdf of pdfs) {
            await prisma.buklet_pdfs.create({
              data: {
                id: pdf.id,
                buklet_id: buklet.id,
                group_id: group.id,
                pdf: pdf.pdf ? Buffer.from(pdf.pdf) : null,
                filename: pdf.filename || null
              }
            });
          }
        }
        
        console.log(`   ✅ Группы файлов буклета ${buklet.id} мигрированы`);
        
      } catch (error) {
        console.error(`   ❌ Ошибка миграции буклета ${buklet.id}:`, error.message);
      }
    }
    
    console.log(`✅ Миграция буклетов завершена: ${buklets.length} буклетов`);
  } catch (error) {
    console.error('❌ Ошибка миграции буклетов:', error);
    throw error;
  }
}

// Миграция брошюр
async function migrateBrochures() {
  console.log('\n📄 Миграция брошюр...');
  
  try {
    // Читаем брошюры из SQLite
    const brochures = await readFromSQLite('SELECT * FROM brochures');
    console.log(`   Найдено брошюр: ${brochures.length}`);
    
    for (const brochure of brochures) {
      try {
        // Проверяем, существует ли уже брошюра
        const existing = await prisma.brochures.findUnique({
          where: { id: brochure.id }
        });
        
        if (existing) {
          console.log(`   ⏭️  Брошюра ${brochure.id} уже существует, пропускаем`);
          continue;
        }
        
        // Создаем брошюру в PostgreSQL
        const newBrochure = await prisma.brochures.create({
          data: {
            id: brochure.id, // Сохраняем оригинальный ID
            name: brochure.name || null,
            language: brochure.language || null,
            description: brochure.description || null,
            main_image: brochure.main_image ? Buffer.from(brochure.main_image) : null,
            main_image_filename: brochure.main_image_filename || null
          }
        });
        
        console.log(`   ✅ Брошюра ${brochure.id} "${brochure.name}" мигрирована`);
        
        // Мигрируем группы файлов брошюры
        const fileGroups = await readFromSQLite(
          'SELECT * FROM brochure_file_groups WHERE brochure_id = ?',
          [brochure.id]
        );
        
        for (const group of fileGroups) {
          const newGroup = await prisma.brochure_file_groups.create({
            data: {
              id: group.id,
              brochure_id: brochure.id,
              title: group.title || '',
              description: group.description || null,
              link: group.link || null
            }
          });
          
          // Мигрируем изображения группы
          const images = await readFromSQLite(
            'SELECT * FROM brochure_images WHERE brochure_id = ? AND group_id = ?',
            [brochure.id, group.id]
          );
          
          for (const image of images) {
            await prisma.brochure_images.create({
              data: {
                id: image.id,
                brochure_id: brochure.id,
                group_id: group.id,
                image: image.image ? Buffer.from(image.image) : null,
                filename: image.filename || null
              }
            });
          }
          
          // Мигрируем PDF группы
          const pdfs = await readFromSQLite(
            'SELECT * FROM brochure_pdfs WHERE brochure_id = ? AND group_id = ?',
            [brochure.id, group.id]
          );
          
          for (const pdf of pdfs) {
            await prisma.brochure_pdfs.create({
              data: {
                id: pdf.id,
                brochure_id: brochure.id,
                group_id: group.id,
                pdf: pdf.pdf ? Buffer.from(pdf.pdf) : null,
                filename: pdf.filename || null
              }
            });
          }
        }
        
        console.log(`   ✅ Группы файлов брошюры ${brochure.id} мигрированы`);
        
      } catch (error) {
        console.error(`   ❌ Ошибка миграции брошюры ${brochure.id}:`, error.message);
      }
    }
    
    console.log(`✅ Миграция брошюр завершена: ${brochures.length} брошюр`);
  } catch (error) {
    console.error('❌ Ошибка миграции брошюр:', error);
    throw error;
  }
}

// Основная функция миграции
async function runMigration() {
  try {
    console.log('🚀 Начало миграции буклетов и брошюр из SQLite в PostgreSQL...\n');
    
    // Проверяем подключение к PostgreSQL
    await prisma.$connect();
    console.log('✅ Подключено к PostgreSQL\n');
    
    // Мигрируем буклеты
    await migrateBuklets();
    
    // Мигрируем брошюры
    await migrateBrochures();
    
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

