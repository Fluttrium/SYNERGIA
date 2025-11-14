import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export const revalidate = 0; // отключение кэширования

export async function GET(req: NextRequest) {
  try {
    // Получаем только брошюры, так как буклеты больше не используются
    const brochures = await getBrochures();
    
    return NextResponse.json({ items: brochures, status: 200 });
  } catch (error: any) {
    console.error("Ошибка при получении материалов:", error);
    return NextResponse.json({
      message: "Ошибка при получении материалов",
      error: error.message,
      status: 500,
    });
  }
}

function getBuklets(): Promise<any[]> {
  const sql = `
    SELECT id, name
    FROM buklets
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Ошибка при выполнении запроса буклетов:", err.message);
        reject(err);
      } else {
        resolve(rows || []);
      }
    });
  });
}

function getBrochures(): Promise<any[]> {
  const sql = `
    SELECT id, name, language, main_image, main_image_filename
    FROM brochures
    ORDER BY language, name
  `;

  return new Promise((resolve, reject) => {
    db.all(sql, [], (err, rows) => {
      if (err) {
        console.error("Ошибка при выполнении запроса брошюр:", err.message);
        reject(err);
      } else {
        // Обрабатываем результаты и добавляем base64 изображения
        const processedRows = (rows || []).map((row: any) => {
          const result: any = {
            id: row.id,
            name: row.name,
            language: row.language,
            type: 'brochure'
          };

          // Добавляем основную картинку если она есть
          if (row.main_image) {
            result.mainImage = `data:image/jpeg;base64,${row.main_image.toString('base64')}`;
            result.mainImageFilename = row.main_image_filename;
          }

          return result;
        });

        resolve(processedRows);
      }
    });
  });
}
