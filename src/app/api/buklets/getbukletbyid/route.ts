import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

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
    const buklet = await prisma.buklets.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true
      }
    });

    if (buklet) {
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
    const brochure = await prisma.brochures.findUnique({
      where: { id: Number(id) },
      select: {
        id: true,
        name: true,
        language: true,
        description: true,
        main_image: true,
        main_image_filename: true
      }
    });

    if (brochure) {
      // Получаем группы файлов для этой брошюры
      const fileGroups = await getBrochureFileGroups(Number(id));
      
      // Подготавливаем основную картинку
      let mainImageData = null;
      if (brochure.main_image) {
        mainImageData = `data:image/jpeg;base64,${Buffer.from(brochure.main_image).toString('base64')}`;
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
  try {
    const groups = await prisma.buklet_file_groups.findMany({
      where: { buklet_id: bukletId },
      orderBy: { id: 'asc' }
    });

    const fileGroups = await Promise.all(
      groups.map(async (group) => {
        const images = await prisma.buklet_images.findMany({
          where: { group_id: group.id },
          select: {
            id: true,
            filename: true,
            image: true
          }
        });

        const pdfs = await prisma.buklet_pdfs.findMany({
          where: { group_id: group.id },
          select: {
            id: true,
            filename: true,
            pdf: true
          }
        });

        return {
          id: group.id,
          title: group.title,
          description: group.description,
          images: images.map((img) => ({
            id: img.id,
            filename: img.filename,
            data: img.image ? `data:image/jpeg;base64,${Buffer.from(img.image).toString('base64')}` : null
          })),
          pdfs: pdfs.map((pdf) => ({
            id: pdf.id,
            filename: pdf.filename,
            data: pdf.pdf ? `data:application/pdf;base64,${Buffer.from(pdf.pdf).toString('base64')}` : null
          }))
        };
      })
    );

    return fileGroups;
  } catch (error: any) {
    console.error("Error getting buklet file groups:", error);
    throw error;
  }
}

async function getBrochureFileGroups(brochureId: number): Promise<any[]> {
  try {
    const groups = await prisma.brochure_file_groups.findMany({
      where: { brochure_id: brochureId },
      orderBy: { id: 'asc' }
    });

    const fileGroups = await Promise.all(
      groups.map(async (group) => {
        const images = await prisma.brochure_images.findMany({
          where: { group_id: group.id },
          select: {
            id: true,
            filename: true,
            image: true
          }
        });

        const pdfs = await prisma.brochure_pdfs.findMany({
          where: { group_id: group.id },
          select: {
            id: true,
            filename: true,
            pdf: true
          }
        });

        return {
          id: group.id,
          title: group.title,
          description: group.description,
          link: group.link,
          images: images.map((img) => ({
            id: img.id,
            filename: img.filename,
            data: img.image ? `data:image/jpeg;base64,${Buffer.from(img.image).toString('base64')}` : null
          })),
          pdfs: pdfs.map((pdf) => ({
            id: pdf.id,
            filename: pdf.filename,
            data: pdf.pdf ? `data:application/pdf;base64,${Buffer.from(pdf.pdf).toString('base64')}` : null
          }))
        };
      })
    );

    return fileGroups;
  } catch (error: any) {
    console.error("Error getting brochure file groups:", error);
    throw error;
  }
}
