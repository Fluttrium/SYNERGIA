import { NextRequest, NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { addBukletPage, initDatabase } from "@/db/db";

export async function POST(req: NextRequest) {
  await initDatabase();
  try {
    const formData = await req.formData();
    const files = formData.getAll("files");
    const name = formData.get("name") as string;

    // Проверяем, что файлы были переданы
    if (!files || files.length === 0) {
      return NextResponse.json(
        { error: "Не было получено файлов." },
        { status: 400 }
      );
    }

    const imageUrls: string[] = [];

    // Обработка каждого файла
    for (let i = 0; i < files.length; i++) {
      const file = files[i] as File;
      const buffer = Buffer.from(await file.arrayBuffer());
      const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");
      const uploadPath = path.join(
        process.cwd(),
        "public/uploadImgForBuklets",
        filename
      );

      // Записываем файл на сервер
      await writeFile(uploadPath, buffer);
      const imageUrl = `/uploadImgForBuklets/${filename}`;
      imageUrls.push(imageUrl);
    }

    // Добавляем данные в базу данных
    const itemId = await addBukletPage(name, imageUrls);

    return NextResponse.json({
      message: "Успешно",
      itemId,
      imageUrls,
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
