import News from "@/components/news";
import { fetchNewsFromDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0;

export default async function NewsSectionWrapper() {
  let news: NewsType[] = [];

  try {
    news = await fetchNewsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }

  return <News initialBlogs={news} showLimited={true} />;
}

