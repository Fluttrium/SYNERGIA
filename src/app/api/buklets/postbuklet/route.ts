import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  try {
    // Создаем буклет
    const buklet = await prisma.buklets.create({
      data: {
        name
      }
    });

    const bukletId = buklet.id;
    console.log(`Inserted buklet with ID: ${bukletId}`);

    // Обрабатываем каждую группу файлов
    for (const group of fileGroups) {
      // Создаем группу файлов
      const fileGroup = await prisma.buklet_file_groups.create({
        data: {
          buklet_id: bukletId,
          title: group.title,
          description: group.description || null
        }
      });

      const groupId = fileGroup.id;

      // Вставляем изображения группы
      for (const imageFile of group.images) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        await prisma.buklet_images.create({
          data: {
            buklet_id: bukletId,
            group_id: groupId,
            image: imageBuffer,
            filename: imageFile.name
          }
        });
      }

      // Вставляем PDF файлы группы
      for (const pdfFile of group.pdfs) {
        const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
        await prisma.buklet_pdfs.create({
          data: {
            buklet_id: bukletId,
            group_id: groupId,
            pdf: pdfBuffer,
            filename: pdfFile.name
          }
        });
      }
    }

    console.log(`Buklet ${bukletId} completed with ${fileGroups.length} groups`);
    return bukletId;
  } catch (error) {
    console.error("Error in addBukletWithGroups:", error);
    throw error;
  }
}
