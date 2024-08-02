import Admin from "@/components/adminComps/admin";
import { fetchNewsFromDatabase, initDatabase, closeDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0;

export default async function Home() {
  await initDatabase();

  let news: NewsType[] = []; // Укажите тип для переменной news

  try {
    news = await fetchNewsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }
  return (
    <div>
      <Admin initialBlogs={news} />
    </div>
  );
}
