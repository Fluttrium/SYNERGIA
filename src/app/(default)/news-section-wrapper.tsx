import News from "@/components/news";
import { fetchNewsFromDatabase, initDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0;

export default async function NewsSectionWrapper() {
  await initDatabase();

  let news: NewsType[] = [];

  try {
    news = await fetchNewsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }

  return <News initialBlogs={news} showLimited={true} />;
}

