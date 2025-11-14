import { NextRequest, NextResponse } from "next/server";
import { initDatabase, addItem } from "@/db/db";

export async function POST(req: NextRequest) {
  try {
    await initDatabase();

    const formData = await req.formData();
    const file = formData.get("file") as File;
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const link = formData.get("link") as string;
    const body = formData.get("body") as string || '';

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    
    // Сохраняем новость в базе данных с Markdown контентом
    const itemId = await addItem({
      title,
      description,
      image: buffer,
      link: link || '#',
      body,
    });

    return NextResponse.json({
      message: "News created successfully",
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
