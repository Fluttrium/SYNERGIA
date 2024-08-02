import AdminProject from "@/components/adminComps/admin_project";
import { initDatabase, fetchProjectsFromDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";

export const revalidate = 0; // отключение кэширования

export default async function Home() {
  await initDatabase();

  let news: NewsType[] = [];

  try {
    news = await fetchProjectsFromDatabase();
  } catch (err) {
    console.error("Ошибка при получении проектов:", err);
  }

  return (
    <>
      <AdminProject initialBlogs={news} />
    </>
  );
}
