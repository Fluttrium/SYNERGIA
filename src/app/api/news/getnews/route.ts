import { NextResponse } from "next/server";
import { closeDatabase, fetchNewsFromDatabase, initDatabase } from "@/db/db";

// Инициализируем базу данных при запуске сервера
initDatabase().catch((err) => {
  console.error("Не удалось инициализировать базу данных:", err);
  process.exit(1);
});

export async function GET() {
  try {
    await initDatabase();
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
