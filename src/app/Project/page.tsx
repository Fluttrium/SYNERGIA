import Project from "@/components/Project";
import { fetchProjectsFromDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0; // отключение кэширования

export default async function Home() {
  let news: NewsType[] = []; // Укажите тип для переменной news

  try {
    news = await fetchProjectsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении новостей:", err);
  }

  return (
    <div>
      <Project initialBlogs={news} />
    </div>
  );
}
