"use server";
import { NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

type BukletRow = {
  id: string;
  name: string;
};

export async function GET() {
  return new Promise<any>((resolve, reject) => {
    db.all<BukletRow>(
      "SELECT DISTINCT id, name FROM buklets",
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
            id: row.id,
            name: row.name,
          }));
          const successResponse = NextResponse.json(languages, { status: 200 });
          resolve(successResponse);
        }
      }
    );
  });
}
