import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export const revalidate = 0; // отключение кэширования

export async function GET(req: NextRequest) {
  try {
    const buklets = await getBuklets();
    return NextResponse.json({ buklets, status: 200 });
  } catch (error: any) {
    console.error("Ошибка при получении буклетов:", error);
    return NextResponse.json({
      message: "Ошибка при получении буклетов",
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
        console.error("Ошибка при выполнении запроса:", err.message);
        reject(err);
      } else {
        resolve(rows);
      }
    });
  });
}
