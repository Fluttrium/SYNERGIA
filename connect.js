const sqlite3 = require("sqlite3").verbose();

// Connecting to or creating a new SQLite database file
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

const value =[
  "aue@gmail.com",
  "aue228"
]

const insertSql = `INSERT INTO users (username, password) VALUES(?, ?)`;

// Serialize method ensures that database queries are executed sequentially
db.serialize(() => {
  // Create the items table if it doesn't exist
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

});