import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { addBukletPage, initDatabase } from "@/db/db";

export async function POST(req: NextRequest) {
  await initDatabase();
  try {
    const formData = await req.formData();
    const images = formData.getAll("images");
    const pdfs = formData.getAll("pdfs");
    const name = formData.get("name") as string;

    if (!images || images.length === 0 || !pdfs || pdfs.length === 0) {
      return NextResponse.json(
        { error: "Не было получено изображений или PDF файлов." },
        { status: 400 }
      );
    }

    const imageUrls: string[] = [];
    const pdfUrls: string[] = [];

    for (let i = 0; i < images.length; i++) {
      const file = images[i] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(
        process.cwd(),
        "public/uploadImgForBuklets",
        filename
      );

      await writeFile(uploadPath, buffer);
      const imageUrl = `/uploadImgForBuklets/${filename}`;
      imageUrls.push(imageUrl);
    }

    for (let i = 0; i < pdfs.length; i++) {
      const file = pdfs[i] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(
        process.cwd(),
        "public/uploadPdfForBuklets",
        filename
      );

      await writeFile(uploadPath, buffer);
      const pdfUrl = `/uploadPdfForBuklets/${filename}`;
      pdfUrls.push(pdfUrl);
    }

    const itemId = await addBukletPage(name, imageUrls, pdfUrls);

    return NextResponse.json({
      message: "Успешно",
      itemId,
      imageUrls,
      pdfUrls,
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
