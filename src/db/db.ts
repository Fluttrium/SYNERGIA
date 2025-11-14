import sqlite3 from "sqlite3";

let db: sqlite3.Database;

interface User {
  id?: string;
  username: string;
  password: string;
  email?: string;
  name?: string;
  surname?: string;
  phone?: string;
  role?: 'admin' | 'user';
  createdAt?: string;
}

export interface News {
  id: number;
  title: string;
  description: string;
  image: Buffer;
  link: string;
  body?: string; // Markdown контент
}

export interface NewsNew {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  body?: string; // Markdown контент
}

//открытие базы данных
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
    }
  );
}
//закрытие базы данных
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
//Добавление новости
export async function addItem(news: Omit<News, "id">): Promise<number> {
  const insertSql = `INSERT INTO items (title, description, image, link, body) VALUES (?, ?, ?, ?, ?)`;
  const values: [string, string, Buffer, string, string] = [
    news.title,
    news.description,
    news.image,
    news.link,
    news.body || '',
  ];

  return new Promise<number>((resolve, reject) => {
    db.run(insertSql, values, function (err) {
      if (err) {
        console.error("Ошибка при вставке элемента:", err.message);
        reject(err);
      } else {
        const id = this.lastID;
        console.log(`Вставлена строка с ID ${id}`);
        resolve(id);
      }
    });
  });
}
//Загрузка всех новостей
export async function fetchNewsFromDatabase(): Promise<NewsNew[]> {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const selectSql = `SELECT * FROM items ORDER BY id DESC`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении новостей из базы данных:",
          err.message
        );
        reject(err);
      } else {
        const rowsWithBase64Images = (
          rows as Array<{
            id: number;
            title: string;
            description: string;
            image: Buffer;
            link: string;
            body?: string;
          }>
        ).map((row) => ({
          id: row.id.toString(),
          title: row.title,
          description: row.description,
          image: row.image
            ? `data:image/jpeg;base64,${row.image.toString("base64")}`
            : "",
          link: row.link,
          body: row.body || '',
        }));
        resolve(rowsWithBase64Images);
      }
    });
  });
}

//Получение новости по ID
export async function getNewsById(id: string): Promise<NewsNew | null> {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const selectSql = `SELECT * FROM items WHERE id = ?`;

  return new Promise<NewsNew | null>((resolve, reject) => {
    db.get(selectSql, [id], (err, row: any) => {
      if (err) {
        console.error("Ошибка при получении новости:", err.message);
        reject(err);
      } else if (!row) {
        resolve(null);
      } else {
        resolve({
          id: row.id.toString(),
          title: row.title,
          description: row.description,
          image: row.image
            ? `data:image/jpeg;base64,${row.image.toString("base64")}`
            : "",
          link: row.link,
          body: row.body || '',
        });
      }
    });
  });
}

//Обновление новости
export async function updateNews(id: string, updates: Partial<NewsNew>): Promise<void> {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const fields: string[] = [];
  const values: any[] = [];

  if (updates.title !== undefined) {
    fields.push('title = ?');
    values.push(updates.title);
  }
  if (updates.description !== undefined) {
    fields.push('description = ?');
    values.push(updates.description);
  }
  if (updates.link !== undefined) {
    fields.push('link = ?');
    values.push(updates.link);
  }
  if (updates.body !== undefined) {
    fields.push('body = ?');
    values.push(updates.body);
  }

  if (fields.length === 0) {
    return Promise.resolve();
  }

  values.push(id);
  const updateSql = `UPDATE items SET ${fields.join(', ')} WHERE id = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(updateSql, values, (err) => {
      if (err) {
        console.error("Ошибка при обновлении новости:", err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
//Удаление новости по ID
export async function deleteNews(id: string): Promise<void> {
  const deleteSql = `DELETE FROM items WHERE id = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(deleteSql, id, (err) => {
      if (err) {
        console.error("Ошибка при удалении элемента:", err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
// Загрузка юзера по username
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
        resolve(user);
      }
    });
  });
}

// Загрузка юзера по email или username
export async function getUserByEmailOrUsername(emailOrUsername: string): Promise<User | null> {
  const selectSql = `SELECT * FROM users WHERE username = ? OR email = ?`;

  return new Promise<User | null>((resolve, reject) => {
    db.get(selectSql, [emailOrUsername, emailOrUsername], (err, user: User) => {
      if (err) {
        console.error(
          "Ошибка при получении данных пользователя из базы данных:",
          err.message
        );
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

// Загрузка юзера по ID
export async function getUserById(id: string): Promise<User | null> {
  const selectSql = `SELECT id, username, email, name, surname, phone, role, createdAt FROM users WHERE id = ?`;

  return new Promise<User | null>((resolve, reject) => {
    db.get(selectSql, [id], (err, user: User) => {
      if (err) {
        console.error(
          "Ошибка при получении данных пользователя по ID:",
          err.message
        );
        reject(err);
      } else {
        resolve(user);
      }
    });
  });
}

// Получение всех пользователей (для админки)
export async function getAllUsers(): Promise<User[]> {
  const selectSql = `SELECT id, username, email, name, surname, phone, role, createdAt FROM users`;

  return new Promise<User[]>((resolve, reject) => {
    db.all(selectSql, (err, users: User[]) => {
      if (err) {
        console.error(
          "Ошибка при получении списка пользователей:",
          err.message
        );
        reject(err);
      } else {
        resolve(users || []);
      }
    });
  });
}

// Создание нового пользователя
export async function createUser(user: Omit<User, 'id' | 'createdAt'>): Promise<string> {
  const insertSql = `INSERT INTO users (username, password, email, name, surname, phone, role) VALUES (?, ?, ?, ?, ?, ?, ?)`;
  const values = [
    user.username,
    user.password,
    user.email || '',
    user.name || '',
    user.surname || '',
    user.phone || '',
    user.role || 'user'
  ];

  return new Promise<string>((resolve, reject) => {
    db.run(insertSql, values, function (err) {
      if (err) {
        console.error("Ошибка при создании пользователя:", err.message);
        reject(err);
      } else {
        resolve(this.lastID.toString());
      }
    });
  });
}

// Обновление данных пользователя
export async function updateUser(id: string, updates: Partial<User>): Promise<void> {
  const fields: string[] = [];
  const values: any[] = [];

  if (updates.name !== undefined) {
    fields.push('name = ?');
    values.push(updates.name);
  }
  if (updates.surname !== undefined) {
    fields.push('surname = ?');
    values.push(updates.surname);
  }
  if (updates.phone !== undefined) {
    fields.push('phone = ?');
    values.push(updates.phone);
  }
  if (updates.email !== undefined) {
    fields.push('email = ?');
    values.push(updates.email);
  }
  if (updates.role !== undefined) {
    fields.push('role = ?');
    values.push(updates.role);
  }

  if (fields.length === 0) {
    return Promise.resolve();
  }

  values.push(id);
  const updateSql = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`;

  return new Promise<void>((resolve, reject) => {
    db.run(updateSql, values, (err) => {
      if (err) {
        console.error("Ошибка при обновлении пользователя:", err.message);
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
//Добавление проекта
export async function addProject(news: Omit<News, "id">): Promise<number> {
  const insertSql = `INSERT INTO project (title, description, image, link) VALUES(?, ?, ?, ?)`;
  const values: [string, string, Buffer, string] = [
    news.title,
    news.description,
    news.image,
    news.link,
  ];

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
//Получение всех проектов из бд
export async function fetchProjectsFromDatabase(): Promise<any[]> {
  if (!db) {
    throw new Error("Database not initialized");
  }

  const selectSql = `SELECT * FROM project`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении новостей из базы данных:",
          err.message
        );
        reject(err);
      } else {
        const rowsWithBase64Images = (
          rows as Array<{
            id: number;
            title: string;
            description: string;
            image: Buffer;
            link: string;
          }>
        ).map((row) => ({
          id: row.id,
          title: row.title,
          description: row.description,
          image: row.image
            ? `data:image/jpeg;base64,${row.image.toString("base64")}`
            : "",
          link: row.link,
        }));
        resolve(rowsWithBase64Images);
      }
    });
  });
}
//Удаление прокта по ID
export async function deletProject(id: string) {
  const deletSql = `DELETE FROM project WHERE id = ?`;

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
//добавление буклета
export async function addBukletPage(
  name: string,
  images: Buffer[],
  pdfs: Buffer[]
): Promise<number> {
  const insertSql = `INSERT INTO buklets (name, images, pdfs) VALUES (?, ?, ?)`;

  try {
    const imagesBuffer = Buffer.concat(images);
    const pdfsBuffer = Buffer.concat(pdfs);

    const result = await new Promise<number>((resolve, reject) => {
      db.run(insertSql, [name, imagesBuffer, pdfsBuffer], function (err) {
        if (err) {
          console.error("Ошибка при вставке элемента:", err.message);
          reject(err);
        } else {
          const id = this.lastID;
          console.log(`Вставлена строка с ID ${id}`);
          resolve(id);
        }
      });
    });

    return result;
  } catch (error) {
    console.error("Ошибка при выполнении вставки:", error);
    throw error;
  }
}
//получение всех буклетов
export async function fetchBukletsFromDatabase(): Promise<any[]> {
  const selectSql = `SELECT * FROM buklets`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении проектов из базы данных:",
          err.message
        );
        reject(err);
      }

      const buklets = rows.map((row: any) => ({
        id: row.id,
        name: row.name,
        images: row.images.toString("base64").split(","),
        pdfs: row.pdfs.toString("base64").split(","),
      }));

      resolve(buklets);
    });
  });
}
//Получение проекта по ID
export async function fetchBukletsFromDatabaseById(id: number): Promise<any[]> {
  const selectSql = `SELECT * FROM buklets WHERE id = ?`;

  return new Promise<any>((resolve, reject) => {
    db.get(selectSql, [id], (err, row) => {
      if (err) {
        console.error(
          "Ошибка при получении данных пользователя из базы данных:",
          err.message
        );
        reject(err);
      } else {
        resolve(row);
      }
    });
  });
}
//Удаление буклета
export async function deletBuklet(id: string) {
  const deletSql = `DELETE FROM buklets WHERE id = ?`;

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

//Добавление брошюры
export async function addBrochure(
  name: string,
  language: string,
  description: string,
  images: Buffer[],
  pdfs: Buffer[]
): Promise<number> {
  return new Promise((resolve, reject) => {
    db.serialize(() => {
      // Вставляем основную информацию о брошюре
      db.run(
        "INSERT INTO brochures (name, language, description) VALUES (?, ?, ?)",
        [name, language, description],
        function (err) {
          if (err) {
            reject(err);
            return;
          }
          const brochureId = this.lastID;

          // Вставляем изображения
          const insertImage = db.prepare(
            "INSERT INTO brochure_images (brochure_id, image) VALUES (?, ?)"
          );
          images.forEach((imageBuffer) => {
            insertImage.run([brochureId, imageBuffer]);
          });
          insertImage.finalize();

          // Вставляем PDF
          const insertPdf = db.prepare(
            "INSERT INTO brochure_pdfs (brochure_id, pdf) VALUES (?, ?)"
          );
          pdfs.forEach((pdfBuffer) => {
            insertPdf.run([brochureId, pdfBuffer]);
          });
          insertPdf.finalize();

          resolve(brochureId);
        }
      );
    });
  });
}

//Получение всех брошюр
export async function fetchBrochuresFromDatabase(): Promise<any[]> {
  const selectSql = `SELECT id, name, language, description FROM brochures ORDER BY language, name`;

  return new Promise<any[]>((resolve, reject) => {
    db.all(selectSql, (err, rows) => {
      if (err) {
        console.error(
          "Ошибка при получении брошюр из базы данных:",
          err.message
        );
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

//Получение брошюры по ID
export async function fetchBrochureFromDatabaseById(id: number): Promise<any> {
  const selectSql = `
    SELECT 
      brochures.id, 
      brochures.name,
      brochures.language,
      brochures.description,
      (
        SELECT GROUP_CONCAT(HEX(image), ',')
        FROM (
          SELECT DISTINCT image
          FROM brochure_images
          WHERE brochure_images.brochure_id = brochures.id
        )
      ) as images,
      (
        SELECT GROUP_CONCAT(HEX(pdf), ',')
        FROM (
          SELECT DISTINCT pdf
          FROM brochure_pdfs
          WHERE brochure_pdfs.brochure_id = brochures.id
        )
      ) as pdfs
    FROM brochures
    WHERE brochures.id = ?;
  `;

  return new Promise<any>((resolve, reject) => {
    db.get(selectSql, [id], (err, row) => {
      if (err) {
        console.error(
          "Ошибка при получении брошюры из базы данных:",
          err.message
        );
        reject(err);
      } else {
        if (row) {
          const rowData = row as any;
          const result = {
            id: rowData.id,
            name: rowData.name,
            language: rowData.language,
            description: rowData.description,
            images: rowData.images
              ? rowData.images
                  .split(",")
                  .map((img: string) => Buffer.from(img, "hex").toString("base64"))
              : [],
            pdfs: rowData.pdfs
              ? rowData.pdfs
                  .split(",")
                  .map((pdf: string) => Buffer.from(pdf, "hex").toString("base64"))
              : [],
          };
          resolve(result);
        } else {
          resolve(null);
        }
      }
    });
  });
}

//Удаление брошюры
export async function deleteBrochure(id: string) {
  return new Promise<void>((resolve, reject) => {
    db.serialize(() => {
      // Удаляем связанные изображения
      db.run("DELETE FROM brochure_images WHERE brochure_id = ?", [id]);
      // Удаляем связанные PDF
      db.run("DELETE FROM brochure_pdfs WHERE brochure_id = ?", [id]);
      // Удаляем основную запись
      db.run("DELETE FROM brochures WHERE id = ?", [id], function (err) {
        if (err) {
          console.error("Ошибка при удалении брошюры:", err.message);
          reject(err);
        } else {
          resolve();
        }
      });
    });
  });
}
