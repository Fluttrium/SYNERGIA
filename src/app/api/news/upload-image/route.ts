import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Сохраняем в public/uploads
    const filename = `${Date.now()}-${file.name}`;
    const filepath = path.join(process.cwd(), "public/uploads", filename);

    await writeFile(filepath, buffer);

    // Возвращаем URL для вставки в MD редактор
    const imageUrl = `/uploads/${filename}`;

    return NextResponse.json({ 
      url: imageUrl,
      imageUrl: imageUrl, // для совместимости
      success: true 
    });
  } catch (error: any) {
    console.error("Error uploading image:", error);
    return NextResponse.json({
      error: error.message,
      success: false
    }, { status: 500 });
  }
}

