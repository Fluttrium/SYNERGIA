import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

interface BukletRow {
  id: number;
  name: string;
  image: string;
}

export async function GET(req: Request): Promise<void | Response> {
  const { searchParams } = new URL(req.url);
  const language = searchParams.get("language");

  if (!language) {
    return NextResponse.json(
      { error: "Language parameter is required" },
      { status: 400 }
    );
  }

  return new Promise<void | Response>((resolve, reject) => {
    db.all<BukletRow>(
      "SELECT id, name, image FROM buklets WHERE name = ?",
      [language],
      (err, rows) => {
        if (err) {
          const errorResponse = NextResponse.json(
            { error: err.message },
            { status: 500 }
          );
          reject(errorResponse);
        } else {
          const result = rows.map((row) => ({
            ...row,
            image: JSON.parse(row.image),
          }));
          const successResponse = NextResponse.json(result, { status: 200 });
          resolve(successResponse);
        }
      }
    );
  });
}
