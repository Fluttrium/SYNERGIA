const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQLite database.");
  }
);

// Вставка данных
const insertUserSql = `INSERT INTO users (username, password) VALUES (?, ?)`;
const userValue = ["info@synergia.ru", "Synergia2024!"];

db.serialize(() => {
  db.run(
    `
    CREATE TABLE IF NOT EXISTS items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      image BLOB,
      link TEXT
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS project (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT,
      description TEXT,
      image BLOB,
      link TEXT
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS buklets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS buklet_file_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buklet_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      FOREIGN KEY (buklet_id) REFERENCES buklets (id)
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS buklet_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buklet_id INTEGER,
      group_id INTEGER,
      image BLOB,
      filename TEXT,
      FOREIGN KEY (buklet_id) REFERENCES buklets (id),
      FOREIGN KEY (group_id) REFERENCES buklet_file_groups (id)
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS buklet_pdfs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      buklet_id INTEGER,
      group_id INTEGER,
      pdf BLOB,
      filename TEXT,
      FOREIGN KEY (buklet_id) REFERENCES buklets (id),
      FOREIGN KEY (group_id) REFERENCES buklet_file_groups (id)
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS brochures (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      language TEXT,
      description TEXT,
      main_image BLOB,
      main_image_filename TEXT
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS brochure_file_groups (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brochure_id INTEGER,
      title TEXT NOT NULL,
      description TEXT,
      link TEXT,
      FOREIGN KEY (brochure_id) REFERENCES brochures (id)
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS brochure_images (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brochure_id INTEGER,
      group_id INTEGER,
      image BLOB,
      filename TEXT,
      FOREIGN KEY (brochure_id) REFERENCES brochures (id),
      FOREIGN KEY (group_id) REFERENCES brochure_file_groups (id)
    );
    `
  );

  db.run(
    `
    CREATE TABLE IF NOT EXISTS brochure_pdfs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      brochure_id INTEGER,
      group_id INTEGER,
      pdf BLOB,
      filename TEXT,
      FOREIGN KEY (brochure_id) REFERENCES brochures (id),
      FOREIGN KEY (group_id) REFERENCES brochure_file_groups (id)
    );
    `
  );

  db.run(insertUserSql, userValue, function (err) {
    if (err) {
      return console.error(err.message);
    }
    const id = this.lastID; // get the id of the last inserted row
    console.log(`User added with ID ${id}`);
  });
});

db.close((err) => {
  if (err) {
    console.error(err.message);
  }
  console.log("Closed the database connection.");
});
