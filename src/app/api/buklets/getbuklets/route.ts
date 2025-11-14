import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const revalidate = 0; // отключение кэширования

export async function GET(req: NextRequest) {
  try {
    // Получаем только брошюры, так как буклеты больше не используются
    const brochures = await getBrochures();
    
    return NextResponse.json({ items: brochures, status: 200 });
  } catch (error: any) {
    console.error("Ошибка при получении материалов:", error);
    return NextResponse.json({
      message: "Ошибка при получении материалов",
      error: error.message,
      status: 500,
    });
  }
}

async function getBrochures(): Promise<any[]> {
  try {
    const brochures = await prisma.brochures.findMany({
      orderBy: [
        { language: 'asc' },
        { name: 'asc' }
      ],
      select: {
        id: true,
        name: true,
        language: true,
        main_image: true,
        main_image_filename: true
      }
    });

    return brochures.map((brochure) => {
      const result: any = {
        id: brochure.id,
        name: brochure.name,
        language: brochure.language,
        type: 'brochure'
      };

      // Добавляем основную картинку если она есть
      if (brochure.main_image) {
        result.mainImage = `data:image/jpeg;base64,${Buffer.from(brochure.main_image).toString('base64')}`;
        result.mainImageFilename = brochure.main_image_filename;
      }

      return result;
    });
  } catch (error: any) {
    console.error("Ошибка при выполнении запроса брошюр:", error);
    throw error;
  }
}
