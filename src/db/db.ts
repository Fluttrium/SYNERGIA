import sqlite3 from "sqlite3";

let db: sqlite3.Database;

interface User {
    username: string;
    password: string;
}

export interface News {
    id: number;
    title: string;
    description: string;
    image: Buffer; // Измените тип на Buffer
    link: string;
}

export interface NewsNew {
    id: string;
    title: string;
    description: string;
    image: string; // Измените тип на Buffer
    link: string;
}

export interface Report {
    id: number;
    email: string;
    name: string,
    message: string;
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
    const insertSql = `INSERT INTO items (title, description, image, link)
                       VALUES (?, ?, ?, ?)`;
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

    const selectSql = `SELECT *
                       FROM items`;

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

//Удаление новости по ID
export async function deleteNews(id: string): Promise<void> {
    const deleteSql = `DELETE
                       FROM items
                       WHERE id = ?`;

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

// Загрузка юзера по ID
export async function giveUser(username: string): Promise<User | null> {
    const selectSql = `SELECT *
                       FROM users
                       WHERE username = ?`;

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

//Добавление проекта
export async function addProject(news: Omit<News, "id">): Promise<number> {
    const insertSql = `INSERT INTO project (title, description, image, link)
                       VALUES (?, ?, ?, ?)`;
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

    const selectSql = `SELECT *
                       FROM project`;

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
    const deletSql = `DELETE
                      FROM project
                      WHERE id = ?`;

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
    const insertSql = `INSERT INTO buklets (name, images, pdfs)
                       VALUES (?, ?, ?)`;

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
    const selectSql = `SELECT *
                       FROM buklets`;

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
    const selectSql = `SELECT *
                       FROM buklets
                       WHERE id = ?`;

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
    const deletSql = `DELETE
                      FROM buklets
                      WHERE id = ?`;

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

//функция сохранения репорта
export async function addReport(report: Omit<Report, "id">, p0: (err: any) => void): Promise<number> {
    const insertSql = `INSERT INTO report (email, name, message)
                       VALUES (?, ?, ?)`;
    const values: [string, string, string] = [
        report.email,
        report.name,
        report.message,

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
//функция получения всех репортов
export async function fetchReportsFromDB(): Promise<any[]> {
    const selectSql = `SELECT *
                       FROM report`;

    return new Promise<any[]>((resolve, reject) => {
        db.all(selectSql, (err, rows) => {
            if (err) {
                console.error(
                    "Ошибка при получении репортов из базы данных:",
                    err.message
                );
                reject(err);
            }

            const report = rows.map((row: any) => ({
                id: row.id,
                email: row.email,
                name: row.name,
                message: row.message,
            }));

            resolve(report);
        });
    });
}
