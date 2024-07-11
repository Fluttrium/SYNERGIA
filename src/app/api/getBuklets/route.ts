import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

type LanguageRow = {
  code: string;
};

export async function GET() {
  return new Promise((resolve, reject) => {
    db.all<LanguageRow>(
      "SELECT DISTINCT name AS code FROM buklets",
      [],
      (err, rows) => {
        if (err) {
          reject(NextResponse.json({ error: err.message }, { status: 500 }));
        } else {
          const languages = rows.map((row) => ({
            code: row.code,
            name: row.code,
          }));
          resolve(NextResponse.json(languages, { status: 200 }));
        }
      }
    );
  });
}
