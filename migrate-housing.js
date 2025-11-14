const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbPath = path.join(__dirname, "collection.db");
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
  // Основная таблица объявлений о жилье
  db.run(`
    CREATE TABLE IF NOT EXISTS housing_listings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      housing_type TEXT NOT NULL,
      district TEXT NOT NULL,
      address TEXT,
      price INTEGER NOT NULL,
      price_period TEXT DEFAULT 'month',
      rooms INTEGER,
      area REAL,
      floor INTEGER,
      total_floors INTEGER,
      amenities TEXT,
      contact_phone TEXT,
      contact_email TEXT,
      contact_telegram TEXT,
      status TEXT DEFAULT 'pending',
      is_featured BOOLEAN DEFAULT 0,
      views INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users (id)
    )
  `, (err) => {
    if (err) console.error("Error creating housing_listings:", err);
    else console.log("✅ Таблица housing_listings создана");
  });

  // Изображения жилья (по аналогии с brochure_images)
  db.run(`
    CREATE TABLE IF NOT EXISTS housing_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      listing_id INTEGER NOT NULL,
      image BLOB,
      filename TEXT,
      is_main BOOLEAN DEFAULT 0,
      order_index INTEGER DEFAULT 0,
      FOREIGN KEY (listing_id) REFERENCES housing_listings (id)
    )
  `, (err) => {
    if (err) console.error("Error creating housing_images:", err);
    else console.log("✅ Таблица housing_images создана");
  });

  // Индексы для производительности
  db.run(`CREATE INDEX IF NOT EXISTS idx_housing_status ON housing_listings(status)`, (err) => {
    if (err) console.error("Error creating index:", err);
  });
  db.run(`CREATE INDEX IF NOT EXISTS idx_housing_type ON housing_listings(housing_type)`, (err) => {
    if (err) console.error("Error creating index:", err);
  });
  db.run(`CREATE INDEX IF NOT EXISTS idx_housing_district ON housing_listings(district)`, (err) => {
    if (err) console.error("Error creating index:", err);
  });
  
  console.log("✅ Миграция завершена");
});

db.close((err) => {
  if (err) {
    console.error("Error closing database:", err);
  } else {
    console.log("✅ База данных закрыта");
  }
});

