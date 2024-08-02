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
    const news = await fetchNewsFromDatabase(); // Извлекаем новости из базы данных
    await closeDatabase();
    return NextResponse.json(news);
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
    return NextResponse.json(
      { error: "Не удалось получить новости" },
      { status: 500 }
    );
  }
}
