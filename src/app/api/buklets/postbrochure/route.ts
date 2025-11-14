import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  try {
    // Подготавливаем данные для основной картинки
    let mainImageBuffer: Buffer | null = null;
    let mainImageFilename: string | null = null;
    
    if (mainImage && mainImage.size > 0) {
      mainImageBuffer = Buffer.from(await mainImage.arrayBuffer());
      mainImageFilename = mainImage.name;
    }

    // Создаем брошюру
    const brochure = await prisma.brochures.create({
      data: {
        name,
        main_image: mainImageBuffer,
        main_image_filename: mainImageFilename
      }
    });

    const brochureId = brochure.id;
    console.log(`Inserted brochure with ID: ${brochureId}`);

    // Обрабатываем каждую группу файлов
    for (const group of fileGroups) {
      // Создаем группу файлов
      const fileGroup = await prisma.brochure_file_groups.create({
        data: {
          brochure_id: brochureId,
          title: group.title,
          description: group.description || null,
          link: group.link || null
        }
      });

      const groupId = fileGroup.id;

      // Вставляем изображения группы
      for (const imageFile of group.images) {
        const imageBuffer = Buffer.from(await imageFile.arrayBuffer());
        await prisma.brochure_images.create({
          data: {
            brochure_id: brochureId,
            group_id: groupId,
            image: imageBuffer,
            filename: imageFile.name
          }
        });
      }

      // Вставляем PDF файлы группы
      for (const pdfFile of group.pdfs) {
        const pdfBuffer = Buffer.from(await pdfFile.arrayBuffer());
        await prisma.brochure_pdfs.create({
          data: {
            brochure_id: brochureId,
            group_id: groupId,
            pdf: pdfBuffer,
            filename: pdfFile.name
          }
        });
      }
    }

    console.log(`Brochure ${brochureId} completed with ${fileGroups.length} groups`);
    return brochureId;
  } catch (error) {
    console.error("Error in addBrochureWithGroups:", error);
    throw error;
  }
}
