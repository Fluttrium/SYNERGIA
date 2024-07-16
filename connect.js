const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
  "./collection.db",
  sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
  (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log("Connected to the SQlite database.");
  }
);

const value = ["synergia@syner.com", "Syner2024"];

const insertSql = `INSERT INTO users (username, password) VALUES(?, ?)`;

const insertSql2 = `INSERT INTO buklets (name, image) VALUES(?, ?)`;
const imagesArray = ["/qr/рус1.png", "/qr/рус1.png", "/qr/рус1.png"];
const value2 = ["rus", JSON.stringify(imagesArray)];

db.serialize(() => {
  db.run(
    `
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        image TEXT,
        link TEXT
      )
    `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created items table.");
    }
  );
  db.run(
    `
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL
    );
  `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created user table.");
    }
  );

  db.run(insertSql, value, function (err) {
    if (err) {
      return console.error(err.message);
    }
    const id = this.lastID; // get the id of the last inserted row
    console.log(`Rows inserted, ID ${id}`);
  });

  db.run(
    `
    CREATE TABLE IF NOT EXISTS project (
      id  INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT, 
      description TEXT ,
      image TEXT,
      link TEXT
    );
  `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created project table.");
    }
  );

  db.run(
    `
  CREATE TABLE IF NOT EXISTS buklets (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT,
  images TEXT,
  pdfs TEXT
);
  `,
    (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log("Created buklets table.");
    }
  );
});
