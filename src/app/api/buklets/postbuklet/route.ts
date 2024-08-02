import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const images = formData.getAll("images");
    const pdfs = formData.getAll("pdfs");
    const name = formData.get("name") as string;

    if (!images || images.length === 0 || !pdfs || pdfs.length === 0) {
      return NextResponse.json(
        { error: "Не было получено изображений или PDF файлов." },
        { status: 400 }
      );
    }

    const imageBuffers: Buffer[] = [];
    const pdfBuffers: Buffer[] = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      imageBuffers.push(buffer);
    }

    for (let i = 0; i < pdfs.length; i++) {
      const file = pdfs[i] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      pdfBuffers.push(buffer);
    }

    const bukletId = await addBuklet(name, imageBuffers, pdfBuffers);

    return NextResponse.json({
      message: "Успешно",
      bukletId,
      status: 201,
    });
  } catch (error: any) {
    console.error("Произошла ошибка:", error);
    return NextResponse.json({
      message: "Ошибка",
      error: error.message,
      status: 500,
    });
  }
}

async function addBuklet(
  name: string,
  images: Buffer[],
  pdfs: Buffer[]
): Promise<number> {
  const insertBukletSql = `INSERT INTO buklets (name) VALUES (?)`;

  return new Promise<number>((resolve, reject) => {
    db.run(insertBukletSql, [name], function (err) {
      if (err) {
        console.error("Ошибка при вставке буклета:", err.message);
        reject(err);
        return;
      }

      const bukletId = this.lastID;

      const insertImageSql = `INSERT INTO buklet_images (buklet_id, image) VALUES (?, ?)`;
      const insertPdfSql = `INSERT INTO buklet_pdfs (buklet_id, pdf) VALUES (?, ?)`;

      // вставка изщображения
      let imageInsertCount = 0;
      if (images.length > 0) {
        images.forEach((image) => {
          db.run(insertImageSql, [bukletId, image], function (err) {
            if (err) {
              console.error("Ошибка при вставке изображения:", err.message);
              reject(err);
              return;
            }
            imageInsertCount++;
            if (imageInsertCount === images.length && pdfs.length === 0) {
              resolve(bukletId);
            }
          });
        });
      } else {
        imageInsertCount = images.length;
      }

      // вставка пдф в таблицу

      let pdfInsertCount = 0;
      if (pdfs.length > 0) {
        pdfs.forEach((pdf) => {
          db.run(insertPdfSql, [bukletId, pdf], function (err) {
            if (err) {
              console.error("Ошибка при вставке PDF:", err.message);
              reject(err);
              return;
            }
            pdfInsertCount++;
            if (
              pdfInsertCount === pdfs.length &&
              imageInsertCount === images.length
            ) {
              resolve(bukletId);
            }
          });
        });
      } else {
        pdfInsertCount = pdfs.length;
      }

      if (images.length === 0 && pdfs.length === 0) {
        resolve(bukletId);
      }
    });
  });
}
