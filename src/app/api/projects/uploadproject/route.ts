"use server";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile } from "fs/promises";
import { initDatabase, addProject } from "@/db/db"; // Импорт функций работы с базой данных

export async function POST(req: NextRequest) {
  await initDatabase(); // Инициализируем базу данных при запуске запроса

  try {
    const formData = await req.formData();
    const file = formData.get("file") as File; // Приводим к типу File
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;

    if (!file) {
      return NextResponse.json(
        { error: "No files received." },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filename = Date.now() + "_" + file.name.replaceAll(" ", "_");

    const imageUrl = `/uploadsProjects/${filename}`;
    const project = {
      title,
      description,
      image: buffer,
      link,
    };
    // Сохраняем информацию о файле в базу данных
    const itemId = await addProject(project);

    return NextResponse.json({
      message: "Success",
      itemId,
      imageUrl,
      status: 201,
    });
  } catch (error: any) {
    console.error("Error occurred:", error);
    return NextResponse.json({
      message: "Failed",
      error: error.message,
      status: 500,
    });
  }
}
