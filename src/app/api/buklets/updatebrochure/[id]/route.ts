import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
  try {
    // Подготавливаем данные для основной картинки
    const updateData: any = { name };
    
    if (mainImage && mainImage.size > 0) {
      updateData.main_image = Buffer.from(await mainImage.arrayBuffer());
      updateData.main_image_filename = mainImage.name;
    }

    // Обновляем основную информацию о брошюре
    await prisma.brochures.update({
      where: { id: brochureId },
      data: updateData
    });

    // Удаляем старые группы файлов и связанные файлы
    await deleteBrochureFileGroups(brochureId);

    // Добавляем новые группы файлов
    await addFileGroupsToBrochure(brochureId, fileGroups);
    
    console.log(`Brochure ${brochureId} updated successfully`);
  } catch (error) {
    console.error("Error in updateBrochureWithGroups:", error);
    throw error;
  }
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
  try {
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
  } catch (error) {
    console.error("Error in addFileGroupsToBrochure:", error);
    throw error;
  }
}

async function deleteBrochureFileGroups(brochureId: number): Promise<void> {
  try {
    // Удаляем все связанные файлы и группы для брошюры
    await prisma.brochure_images.deleteMany({
      where: { brochure_id: brochureId }
    });

    await prisma.brochure_pdfs.deleteMany({
      where: { brochure_id: brochureId }
    });

    await prisma.brochure_file_groups.deleteMany({
      where: { brochure_id: brochureId }
    });

    console.log(`Deleted all file groups for brochure ${brochureId}`);
  } catch (error) {
    console.error("Error in deleteBrochureFileGroups:", error);
    throw error;
  }
}
