import News from "@/components/news";
import { fetchNewsFromDatabase, initDatabase, closeDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";
import sqlite3 from "sqlite3";

export const revalidate = 0; // отключение кэширования

export default async function NewsSection() {
  await initDatabase();

  let news: NewsType[] = []; // Укажите тип для переменной news

  try {
    news = await fetchNewsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }

  return (
    <div>
      <News initialBlogs={news} />
    </div>
  );
}
