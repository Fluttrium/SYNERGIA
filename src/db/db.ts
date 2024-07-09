import { rejects } from "assert";
import { resolve } from "path";
import sqlite3 from "sqlite3";

let db: sqlite3.Database;

interface User {
  username: string;
  password: string;
}

export async function initDatabase() {
  db = new sqlite3.Database(
    "./collection.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    async (err) => {
      if (err) {
        console.error("Ошибка открытия базы данных SQLite:", err.message);
        throw err;
      }
      console.log("Подключение к базе данных SQLite выполнено успешно.");

      // Создание таблицы items, если она не существует
      await db.run(`
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY,
        title TEXT,
        description TEXT,
        image TEXT,
        link TEXT
      )
    `);

      console.log("Создана таблица items.");
    }
  );
}

export async function addItem(
  title: string,
  description: string,
  image: string,
  link: string
): Promise<number> {
  const insertSql = `INSERT INTO items(title, description, image, link) VALUES(?, ?, ?, ?)`;
  const values = [title, description, image, link];

  return new Promise<number>((resolve, reject) => {
    db.run(insertSql, values, function (err) {
      if (err) {
        console.error("Ошибка при вставке элемента:", err.message);
        reject(err);
      }

      const id = this.lastID; // Получаем ID последней вставленной строки
      console.log(`Вставлена строка с ID ${id}`);
      resolve(id);
    });
  });
}
export async function fetchNewsFromDatabase(): Promise<any[]> {
  const selectSql = `SELECT * FROM items`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении новостей из базы данных:",
          err.message
        );
        reject(err);
      }

      resolve(rows); // Возвращаем массив объектов новостей из базы данных
    });
  });
}
export async function closeDatabase() {
  return new Promise<void>((resolve, reject) => {
    db.close((err) => {
      if (err) {
        console.error("Ошибка при закрытии базы данных SQLite:", err.message);
        reject(err);
      }
      console.log("Соединение с базой данных SQLite закрыто.");
      resolve();
    });
  });
}

export async function giveUser(username: string): Promise<User | null> {
  const selectSql = `SELECT * FROM users WHERE username = ?`;

  return new Promise<User | null>((resolve, reject) => {
    db.get(selectSql, [username], (err, user: User) => {
      if (err) {
        console.error(
          "Ошибка при получении данных пользователя из базы данных:",
          err.message
        );
        reject(err);
      } else {
        resolve(user); // Возвращаем данные пользователя или null, если пользователь не найден
      }
    });
  });
}

export async function deletNews(id: string) {
  const deletSql = `DELETE FROM items WHERE id = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(deletSql, id, function (err) {
      if (err) {
        console.error("Ошибка при удалении элемента:", err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}

export async function addProject(
  pretitle: string,
  title: string,
  description: string,
  image: string
): Promise<number> {
  const insertSql = `INSERT INTO projects(pretitle, title, description, image, ) VALUES(?, ?, ?, ?)`;
  const values = [pretitle, title, description, image];

  return new Promise<number>((resolve, reject) => {
    db.run(insertSql, values, function (err) {
      if (err) {
        console.error("Ошибка при вставке элемента:", err.message);
        reject(err);
      }

      const id = this.lastID; // Получаем ID последней вставленной строки
      console.log(`Вставлена строка с ID ${id}`);
      resolve(id);
    });
  });
}

export async function fetchProjectsFromDatabase(): Promise<any[]> {
  const selectSql = `SELECT * FROM projects`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении проектов из базы данных:",
          err.message
        );
        reject(err);
      }

      resolve(rows); // Возвращаем массив объектов новостей из базы данных
    });
  });
}

export async function deletProject(id: string) {
  const deletSql = `DELETE FROM projects WHERE id = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(deletSql, id, function (err) {
      if (err) {
        console.error("Ошибка при удалении проекта:", err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
