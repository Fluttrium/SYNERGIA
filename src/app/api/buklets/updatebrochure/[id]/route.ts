import { NextRequest, NextResponse } from "next/server";
import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./collection.db", sqlite3.OPEN_READWRITE);

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const mainImage = formData.get("mainImage") as File | null;
    const brochureId = params.id;

    console.log("Updating brochure:", { id: brochureId, name });

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

      // Если нет файлов и нет ссылки, но есть заголовок и описание - это нормально для обновления
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

    console.log(`Processing ${fileGroups.length} file groups for update`);

    await updateBrochureWithGroups(Number(brochureId), name, mainImage, fileGroups);

    return NextResponse.json(
      { message: "Brochure updated successfully", id: Number(brochureId) },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error updating brochure:", error);
    return NextResponse.json(
      { error: "Failed to update brochure", details: error.message },
      { status: 500 }
    );
  }
}

async function updateBrochureWithGroups(
  brochureId: number,
  name: string,
  mainImage: File | null,
  fileGroups: Array<{
    title: string;
    description: string;
    link: string;
    images: File[];
    pdfs: File[];
  }>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      // Подготавливаем данные для основной картинки
      let mainImageBuffer = null;
      let mainImageFilename = null;
      
      if (mainImage && mainImage.size > 0) {
        mainImageBuffer = Buffer.from(await mainImage.arrayBuffer());
        mainImageFilename = mainImage.name;
      }

      // Обновляем основную информацию о брошюре
      const updateSql = mainImageBuffer 
        ? "UPDATE brochures SET name = ?, main_image = ?, main_image_filename = ? WHERE id = ?"
        : "UPDATE brochures SET name = ? WHERE id = ?";
      
      const updateParams = mainImageBuffer 
        ? [name, mainImageBuffer, mainImageFilename, brochureId]
        : [name, brochureId];

      db.run(updateSql, updateParams, async function (err) {
        if (err) {
          console.error("Error updating brochure:", err);
          reject(err);
          return;
        }

        try {
          // Удаляем старые группы файлов и связанные файлы
          await deleteBrochureFileGroups(brochureId);

          // Добавляем новые группы файлов
          await addFileGroupsToBrochure(brochureId, fileGroups);
          
          console.log(`Brochure ${brochureId} updated successfully`);
          resolve();
        } catch (error) {
          console.error("Error updating file groups:", error);
          reject(error);
        }
      });
    } catch (error) {
      console.error("Error in updateBrochureWithGroups:", error);
      reject(error);
    }
  });
}

async function addFileGroupsToBrochure(
  brochureId: number,
  fileGroups: Array<{
    title: string;
    description: string;
    link: string;
    images: File[];
    pdfs: File[];
  }>
): Promise<void> {
  return new Promise(async (resolve, reject) => {
    try {
      let completedGroups = 0;
      const totalGroups = fileGroups.length;

      if (totalGroups === 0) {
        resolve();
        return;
      }

      const checkCompletion = () => {
        completedGroups++;
        if (completedGroups === totalGroups) {
          resolve();
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

            try {
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
                  }
                );
              }

              checkCompletion();
            } catch (error) {
              console.error("Error processing files for group:", error);
              reject(error);
            }
          }
        );
      }
    } catch (error) {
      console.error("Error in addFileGroupsToBrochure:", error);
      reject(error);
    }
  });
}

async function deleteBrochureFileGroups(brochureId: number): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      // Удаляем все связанные файлы и группы для брошюры
      db.run(
        "DELETE FROM brochure_images WHERE brochure_id = ?",
        [brochureId],
        (err) => {
          if (err) {
            console.error("Error deleting brochure images:", err);
            reject(err);
            return;
          }

          db.run(
            "DELETE FROM brochure_pdfs WHERE brochure_id = ?",
            [brochureId],
            (err) => {
              if (err) {
                console.error("Error deleting brochure PDFs:", err);
                reject(err);
                return;
              }

              db.run(
                "DELETE FROM brochure_file_groups WHERE brochure_id = ?",
                [brochureId],
                (err) => {
                  if (err) {
                    console.error("Error deleting brochure file groups:", err);
                    reject(err);
                    return;
                  }
                  
                  console.log(`Deleted all file groups for brochure ${brochureId}`);
                  resolve();
                }
              );
            }
          );
        }
      );
    } catch (error) {
      console.error("Error in deleteBrochureFileGroups:", error);
      reject(error);
    }
  });
}
