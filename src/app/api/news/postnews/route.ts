import { NextRequest, NextResponse } from "next/server";
import path from "path";
import { writeFile, mkdir } from "fs/promises";
import { initDatabase, addItem } from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    await initDatabase(); // Initialize the database at the start of the request

    const formData = await req.formData();
    const file = formData.get("file") as File;
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
    // Сохраняем изображение как BLOB в базе данных
    const news = {
      title,
      description,
      image: buffer,
      link,
    };
    const itemId = await addItem(news);

    return NextResponse.json({
      message: "Success",
      itemId,
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
