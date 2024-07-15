import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

type LanguageRow = {
  code: string;
};

export async function GET() {
  return new Promise<any>((resolve, reject) => {
    db.all<LanguageRow>(
      "SELECT DISTINCT name AS code FROM buklets",
      [],
      (err, rows) => {
        if (err) {
          const errorResponse = NextResponse.json(
            { error: err.message },
            { status: 500 }
          );
          reject(errorResponse);
        } else {
          const languages = rows.map((row) => ({
            code: row.code,
            name: row.code,
          }));
          const successResponse = NextResponse.json(languages, { status: 200 });
          resolve(successResponse);
        }
      }
    );
  });
}
