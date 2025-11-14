import News from "@/components/news";
import { fetchNewsFromDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0; // отключение кэширования

export default async function NewsSection() {
  let news: NewsType[] = [];

  try {
    news = await fetchNewsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }

  return (
    <div>
      <News initialBlogs={news} showLimited={false} />
    </div>
  );
}
