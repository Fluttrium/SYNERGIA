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
            // Сначала проверяем, есть ли буклет с таким ID
            let bukletSql = `
              SELECT 
                buklets.id, 
                buklets.name
              FROM buklets
              WHERE buklets.id = ?;
            `;

    const bukletRows: BukletRow[] = await new Promise((resolve, reject) => {
      db.all<BukletRow>(bukletSql, [Number(id)], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

            if (bukletRows.length > 0) {
              const buklet = bukletRows[0];
              
              // Получаем группы файлов для этого буклета
              const fileGroups = await getBukletFileGroups(Number(id));
              
              const result = {
                id: buklet.id,
                name: buklet.name,
                type: 'buklet',
                fileGroups: fileGroups
              };
              return NextResponse.json(result, { status: 200 });
            }

            // Если буклет не найден, проверяем брошюры
            let brochureSql = `
              SELECT 
                brochures.id, 
                brochures.name,
                brochures.language,
                brochures.description,
                brochures.main_image,
                brochures.main_image_filename
              FROM brochures
              WHERE brochures.id = ?;
            `;

    const brochureRows: any[] = await new Promise((resolve, reject) => {
      db.all(brochureSql, [Number(id)], (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });

            if (brochureRows.length > 0) {
              const brochure = brochureRows[0];
              
              // Получаем группы файлов для этой брошюры
              const fileGroups = await getBrochureFileGroups(Number(id));
              
              // Подготавливаем основную картинку
              let mainImageData = null;
              if (brochure.main_image) {
                mainImageData = `data:image/jpeg;base64,${brochure.main_image.toString('base64')}`;
              }
              
              const result = {
                id: brochure.id,
                name: brochure.name,
                language: brochure.language,
                description: brochure.description,
                mainImage: mainImageData,
                mainImageFilename: brochure.main_image_filename,
                type: 'brochure',
                fileGroups: fileGroups
              };
              return NextResponse.json(result, { status: 200 });
            }

    return NextResponse.json({ error: "Item not found" }, { status: 404 });
  } catch (error: any) {
    console.error("Error in API function:", error.message);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

async function getBukletFileGroups(bukletId: number): Promise<any[]> {
  return new Promise((resolve, reject) => {
    const groupsSql = `
      SELECT 
        fg.id,
        fg.title,
        fg.description,
        (
          SELECT json_group_array(
            json_object(
              'id', img.id,
              'filename', img.filename,
              'data', 'data:image/jpeg;base64,' || hex(img.image)
            )
          )
          FROM buklet_images img
          WHERE img.group_id = fg.id
        ) as images,
        (
          SELECT json_group_array(
            json_object(
              'id', pdf.id,
              'filename', pdf.filename,
              'data', 'data:application/pdf;base64,' || hex(pdf.pdf)
            )
          )
          FROM buklet_pdfs pdf
          WHERE pdf.group_id = fg.id
        ) as pdfs
      FROM buklet_file_groups fg
      WHERE fg.buklet_id = ?
      ORDER BY fg.id;
    `;

    db.all(groupsSql, [bukletId], (err, rows) => {
      if (err) {
        console.error("Error getting buklet file groups:", err);
        reject(err);
        return;
      }

      const groups = rows.map((row: any) => ({
        id: row.id,
        title: row.title,
        description: row.description,
        images: row.images ? JSON.parse(row.images) : [],
        pdfs: row.pdfs ? JSON.parse(row.pdfs) : []
      }));

      resolve(groups);
    });
  });
}

        async function getBrochureFileGroups(brochureId: number): Promise<any[]> {
          return new Promise((resolve, reject) => {
            const groupsSql = `
              SELECT 
                fg.id,
                fg.title,
                fg.description,
                fg.link,
                (
                  SELECT json_group_array(
                    json_object(
                      'id', img.id,
                      'filename', img.filename,
                      'data', 'data:image/jpeg;base64,' || hex(img.image)
                    )
                  )
                  FROM brochure_images img
                  WHERE img.group_id = fg.id
                ) as images,
                (
                  SELECT json_group_array(
                    json_object(
                      'id', pdf.id,
                      'filename', pdf.filename,
                      'data', 'data:application/pdf;base64,' || hex(pdf.pdf)
                    )
                  )
                  FROM brochure_pdfs pdf
                  WHERE pdf.group_id = fg.id
                ) as pdfs
              FROM brochure_file_groups fg
              WHERE fg.brochure_id = ?
              ORDER BY fg.id;
            `;

            db.all(groupsSql, [brochureId], (err, rows) => {
              if (err) {
                console.error("Error getting brochure file groups:", err);
                reject(err);
                return;
              }

              const groups = rows.map((row: any) => ({
                id: row.id,
                title: row.title,
                description: row.description,
                link: row.link,
                images: row.images ? JSON.parse(row.images) : [],
                pdfs: row.pdfs ? JSON.parse(row.pdfs) : []
              }));

              resolve(groups);
            });
          });
        }
