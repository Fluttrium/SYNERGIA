import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Удаляем связанные изображения и PDF
    await new Promise<void>((resolve, reject) => {
      db.serialize(() => {
        // Удаляем изображения
        db.run("DELETE FROM brochure_images WHERE brochure_id = ?", [id], (err) => {
          if (err) {
            console.error("Error deleting brochure images:", err);
          }
        });

        // Удаляем PDF
        db.run("DELETE FROM brochure_pdfs WHERE brochure_id = ?", [id], (err) => {
          if (err) {
            console.error("Error deleting brochure PDFs:", err);
          }
        });

        // Удаляем основную запись
        db.run("DELETE FROM brochures WHERE id = ?", [id], function (err) {
          if (err) {
            console.error("Error deleting brochure:", err);
            reject(err);
          } else {
            console.log(`Brochure with ID ${id} deleted successfully`);
            resolve();
          }
        });
      });
    });

    return NextResponse.json(
      { message: "Brochure deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting brochure:", error);
    return NextResponse.json(
      { error: "Failed to delete brochure", details: error.message },
      { status: 500 }
    );
  }
}
