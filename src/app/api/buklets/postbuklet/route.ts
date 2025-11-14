import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;

    console.log("Received buklet data:", { name });

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

    // Извлекаем группы файлов (такой же формат как для брошюр)
    const fileGroups: Array<{
      title: string;
      description: string;
      images: File[];
      pdfs: File[];
    }> = [];

    let groupIndex = 0;
    while (true) {
      const groupTitle = formData.get(`group_${groupIndex}_title`) as string;
      if (!groupTitle) break;

      const groupDescription = formData.get(`group_${groupIndex}_description`) as string;
      const groupImages = formData.getAll(`group_${groupIndex}_images`) as File[];
      const groupPdfs = formData.getAll(`group_${groupIndex}_pdfs`) as File[];

      // Фильтруем пустые файлы
      const validImages = groupImages.filter(img => img.size > 0);
      const validPdfs = groupPdfs.filter(pdf => pdf.size > 0);

      if (validImages.length === 0 && validPdfs.length === 0) {
        return NextResponse.json(
          { error: `Группа файлов "${groupTitle}" должна содержать хотя бы один файл` },
          { status: 400 }
        );
      }

      fileGroups.push({
        title: groupTitle,
        description: groupDescription || '',
        images: validImages,
        pdfs: validPdfs
      });

      groupIndex++;
    }

    if (fileGroups.length === 0) {
      return NextResponse.json(
        { error: "Необходимо добавить хотя бы одну группу файлов" },
        { status: 400 }
      );
    }

    console.log(`Processing ${fileGroups.length} file groups for buklet`);

    const bukletId = await addBukletWithGroups(name, fileGroups);

    return NextResponse.json({
      message: "Буклет успешно добавлен",
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

async function addBukletWithGroups(
  name: string,
  fileGroups: Array<{
    title: string;
    description: string;
    images: File[];
    pdfs: File[];
  }>
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      db.serialize(async () => {
        // Вставляем основную информацию о буклете
        db.run(
          "INSERT INTO buklets (name) VALUES (?)",
          [name],
          async function (err) {
            if (err) {
              console.error("Error inserting buklet:", err);
              reject(err);
              return;
            }
            const bukletId = this.lastID;
            console.log(`Inserted buklet with ID: ${bukletId}`);

            let completedGroups = 0;
            const totalGroups = fileGroups.length;

            const checkCompletion = () => {
              completedGroups++;
              if (completedGroups === totalGroups) {
                console.log(`Buklet ${bukletId} completed with ${fileGroups.length} groups`);
                resolve(bukletId);
              }
            };

            // Обрабатываем каждую группу файлов
            for (let groupIndex = 0; groupIndex < fileGroups.length; groupIndex++) {
              const group = fileGroups[groupIndex];
              
              // Вставляем информацию о группе файлов
              db.run(
                "INSERT INTO buklet_file_groups (buklet_id, title, description) VALUES (?, ?, ?)",
                [bukletId, group.title, group.description],
                async function (err) {
                  if (err) {
                    console.error(`Error inserting file group ${groupIndex + 1}:`, err);
                    reject(err);
                    return;
                  }
                  const groupId = this.lastID;

                  let completedFiles = 0;
                  const totalFiles = group.images.length + group.pdfs.length;

                  const checkGroupCompletion = () => {
                    completedFiles++;
                    if (completedFiles === totalFiles) {
                      checkCompletion();
                    }
                  };

                  // Вставляем изображения группы
                  for (let imgIndex = 0; imgIndex < group.images.length; imgIndex++) {
                    const imageFile = group.images[imgIndex];
                    const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
                    
                    db.run(
                      "INSERT INTO buklet_images (buklet_id, group_id, image, filename) VALUES (?, ?, ?, ?)",
                      [bukletId, groupId, imageBuffer, imageFile.name],
                      function (err) {
                        if (err) {
                          console.error(`Error inserting image ${imgIndex + 1} in group ${groupIndex + 1}:`, err);
                          reject(err);
                          return;
                        }
                        checkGroupCompletion();
                      }
                    );
                  }

                  // Вставляем PDF файлы группы
                  for (let pdfIndex = 0; pdfIndex < group.pdfs.length; pdfIndex++) {
                    const pdfFile = group.pdfs[pdfIndex];
                    const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
                    
                    db.run(
                      "INSERT INTO buklet_pdfs (buklet_id, group_id, pdf, filename) VALUES (?, ?, ?, ?)",
                      [bukletId, groupId, pdfBuffer, pdfFile.name],
                      function (err) {
                        if (err) {
                          console.error(`Error inserting PDF ${pdfIndex + 1} in group ${groupIndex + 1}:`, err);
                          reject(err);
                          return;
                        }
                        checkGroupCompletion();
                      }
                    );
                  }

                  // Если в группе нет файлов
                  if (totalFiles === 0) {
                    checkGroupCompletion();
                  }
                }
              );
            }
          }
        );
      });
    } catch (error) {
      console.error("Error in addBukletWithGroups:", error);
      reject(error);
    }
  });
}
