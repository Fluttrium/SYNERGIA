import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

interface BukletRow {
  id: number;
  name: string;
  images: string | null;
  pdfs: string | null;
}

export async function GET(req: NextRequest): Promise<NextResponse> {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json(
      { error: "ID parameter is required" },
      { status: 400 }
    );
  }

  try {
    const sql = `
      SELECT 
        buklets.id, 
        buklets.name,
        (
          SELECT GROUP_CONCAT(HEX(image), ',')
          FROM (
            SELECT DISTINCT image
            FROM buklet_images
            WHERE buklet_images.buklet_id = buklets.id
          )
        ) as images,
        (
          SELECT GROUP_CONCAT(HEX(pdf), ',')
          FROM (
            SELECT DISTINCT pdf
            FROM buklet_pdfs
            WHERE buklet_pdfs.buklet_id = buklets.id
          )
        ) as pdfs
      FROM buklets
      WHERE buklets.id = ?;
    `;

    const rows: BukletRow[] = await new Promise((resolve, reject) => {
      db.all<BukletRow>(sql, [Number(id)], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

    if (rows.length === 0) {
      return NextResponse.json({ error: "Buklet not found" }, { status: 404 });
    }

    const buklet = rows[0];
    const result = {
      id: buklet.id,
      name: buklet.name,
      images: buklet.images
        ? buklet.images
            .split(",")
            .map((img) => Buffer.from(img, "hex").toString("base64"))
        : [],
      pdfs: buklet.pdfs
        ? buklet.pdfs
            .split(",")
            .map((pdf) => Buffer.from(pdf, "hex").toString("base64"))
        : [],
    };

    return NextResponse.json(result, { status: 200 });
  } catch (error: any) {
    console.error("Error in API function:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
