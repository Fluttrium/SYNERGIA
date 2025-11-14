import { NextResponse } from "next/server";
import { fetchNewsFromDatabase } from "@/db/db";

export const runtime = "nodejs";

export async function GET() {
  try {
    const news = await fetchNewsFromDatabase();
    console.log("✅ API: Returning", news.length, "news items");
    
    // Возвращаем в формате { news: [...] } для совместимости
    return NextResponse.json({ 
      news,
      total: news.length 
    });
  } catch (err) {
    console.error("❌ Ошибка при получении новостей:", err);
    return NextResponse.json(
      { error: "Не удалось получить новости", news: [] },
      { status: 500 }
    );
  }
}
