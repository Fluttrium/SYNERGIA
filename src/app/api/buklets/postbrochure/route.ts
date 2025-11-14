import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export async function POST(req: NextRequest) {
  try {
            const formData = await req.formData();
            const name = formData.get("name") as string;
            const mainImage = formData.get("mainImage") as File | null;

    console.log("Received data:", { name });

    if (!name) {
      return NextResponse.json(
        { error: "Name is required" },
        { status: 400 }
      );
    }

            // Извлекаем группы файлов
            const fileGroups: Array<{
              title: string;
              description: string;
              link: string;
              images: File[];
              pdfs: File[];
            }> = [];

            let groupIndex = 0;
            while (true) {
              const groupTitle = formData.get(`group_${groupIndex}_title`) as string;
              if (!groupTitle) break;

              const groupDescription = formData.get(`group_${groupIndex}_description`) as string;
              const groupLink = formData.get(`group_${groupIndex}_link`) as string;
              const groupImages = formData.getAll(`group_${groupIndex}_images`) as File[];
              const groupPdfs = formData.getAll(`group_${groupIndex}_pdfs`) as File[];

              // Фильтруем пустые файлы
              const validImages = groupImages.filter(img => img.size > 0);
              const validPdfs = groupPdfs.filter(pdf => pdf.size > 0);

              if (validImages.length === 0 && validPdfs.length === 0 && !groupLink?.trim()) {
                return NextResponse.json(
                  { error: `Группа файлов "${groupTitle}" должна содержать хотя бы один файл или ссылку` },
                  { status: 400 }
                );
              }

              fileGroups.push({
                title: groupTitle,
                description: groupDescription || '',
                link: groupLink || '',
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

            console.log(`Processing ${fileGroups.length} file groups`);

            const brochureId = await addBrochureWithGroups(name, mainImage, fileGroups);

    return NextResponse.json(
      { message: "Brochure added successfully", id: brochureId },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Error adding brochure:", error);
    return NextResponse.json(
      { error: "Failed to add brochure", details: error.message },
      { status: 500 }
    );
  }
}

async function addBrochureWithGroups(
  name: string,
  mainImage: File | null,
  fileGroups: Array<{
    title: string;
    description: string;
    link: string;
    images: File[];
    pdfs: File[];
  }>
): Promise<number> {
  return new Promise(async (resolve, reject) => {
    try {
      db.serialize(async () => {
        // Подготавливаем данные для основной картинки
        let mainImageBuffer = null;
        let mainImageFilename = null;
        
        if (mainImage && mainImage.size > 0) {
          mainImageBuffer = Buffer.from(await mainImage.arrayBuffer());
          mainImageFilename = mainImage.name;
        }

        // Вставляем основную информацию о брошюре
        db.run(
          "INSERT INTO brochures (name, main_image, main_image_filename) VALUES (?, ?, ?)",
          [name, mainImageBuffer, mainImageFilename],
          async function (err) {
            if (err) {
              console.error("Error inserting brochure:", err);
              reject(err);
              return;
            }
            const brochureId = this.lastID;
            console.log(`Inserted brochure with ID: ${brochureId}`);

            let completedGroups = 0;
            const totalGroups = fileGroups.length;

            const checkCompletion = () => {
              completedGroups++;
              if (completedGroups === totalGroups) {
                console.log(`Brochure ${brochureId} completed with ${fileGroups.length} groups`);
                resolve(brochureId);
              }
            };

            // Обрабатываем каждую группу файлов
            for (let groupIndex = 0; groupIndex < fileGroups.length; groupIndex++) {
              const group = fileGroups[groupIndex];
              
                      // Вставляем информацию о группе файлов
                      db.run(
                        "INSERT INTO brochure_file_groups (brochure_id, title, description, link) VALUES (?, ?, ?, ?)",
                        [brochureId, group.title, group.description, group.link],
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
                      "INSERT INTO brochure_images (brochure_id, group_id, image, filename) VALUES (?, ?, ?, ?)",
                      [brochureId, groupId, imageBuffer, imageFile.name],
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
                      "INSERT INTO brochure_pdfs (brochure_id, group_id, pdf, filename) VALUES (?, ?, ?, ?)",
                      [brochureId, groupId, pdfBuffer, pdfFile.name],
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
      console.error("Error in addBrochureWithGroups:", error);
      reject(error);
    }
  });
}
