import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

interface BukletRow {
  id: number;
  name: string;
  images: string; // Assuming images are stored as JSON string
  pdfs: string; // Assuming pdfs are stored as JSON string
}

export async function GET(req: NextRequest): Promise<void | Response> {
  const { searchParams } = new URL(req.nextUrl);
  const language = searchParams.get("language");

  if (!language) {
    return NextResponse.json(
      { error: "Language parameter is required" },
      { status: 400 }
    );
  }

  return new Promise<void | Response>((resolve, reject) => {
    db.all<BukletRow>(
      "SELECT id, name, images, pdfs FROM buklets WHERE id = ?",
      [language],
      (err, rows) => {
        if (err) {
          console.error("Database query error:", err.message);
          const errorResponse = NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
          );
          reject(errorResponse);
        } else {
          try {
            const result = rows.map((row) => ({
              id: row.id,
              name: row.name,
              images: JSON.parse(row.images), // Parse images JSON string
              pdfs: JSON.parse(row.pdfs), // Parse pdfs JSON string
            }));
            const successResponse = NextResponse.json(result, { status: 200 });
            resolve(successResponse);
          } catch (error: any) {
            console.error("Error parsing JSON:", error.message);
            const errorResponse = NextResponse.json(
              { error: "Error parsing JSON" },
              { status: 500 }
            );
            reject(errorResponse);
          }
        }
      }
    );
  });
}
