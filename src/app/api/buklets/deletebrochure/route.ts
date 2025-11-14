import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { error: "ID is required" },
        { status: 400 }
      );
    }

    // Удаляем связанные изображения и PDF
    await prisma.brochure_images.deleteMany({
      where: { brochure_id: Number(id) }
    });

    await prisma.brochure_pdfs.deleteMany({
      where: { brochure_id: Number(id) }
    });

    // Удаляем группы файлов
    await prisma.brochure_file_groups.deleteMany({
      where: { brochure_id: Number(id) }
    });

    // Удаляем основную запись
    await prisma.brochures.delete({
      where: { id: Number(id) }
    });

    console.log(`Brochure with ID ${id} deleted successfully`);

    return NextResponse.json(
      { message: "Brochure deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error deleting brochure:", error);
    return NextResponse.json(
      { error: "Failed to delete brochure", details: error.message },
      { status: 500 }
    );
  }
}
