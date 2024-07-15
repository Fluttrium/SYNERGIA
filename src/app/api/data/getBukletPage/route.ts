import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

interface BukletRow {
  id: number;
  name: string;
  image: string;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language");

  if (!language) {
    return NextResponse.json(
      { error: "Language parameter is required" },
      { status: 400 }
    );
  }

  return new Promise((resolve, reject) => {
    db.all<BukletRow>(
      "SELECT id, name, image FROM buklets WHERE name = ?",
      [language],
      (err, rows) => {
        if (err) {
          reject(NextResponse.json({ error: err.message }, { status: 500 }));
        } else {
          const result = rows.map((row) => ({
            ...row,
            image: JSON.parse(row.image),
          }));
          resolve(NextResponse.json(result, { status: 200 }));
        }
      }
    );
  });
}
