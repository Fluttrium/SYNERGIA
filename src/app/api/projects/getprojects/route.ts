import { NextResponse } from "next/server";
import { fetchProjectsFromDatabase } from "@/db/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const news = await fetchProjectsFromDatabase(); // Извлекаем новости из базы данных

    return NextResponse.json(news);
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
    return NextResponse.json(
      { error: "Не удалось получить новости" },
      { status: 500 }
    );
  }
}
