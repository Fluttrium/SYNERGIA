import { fetchNewsFromDatabase, initDatabase } from "@/db/db";
import { NewsNew as NewsType } from "@/db/db";
import { notFound } from "next/navigation";

export const revalidate = 0; // отключение кэширования

interface PageProps {
  params: {
    new: string;
  };
}

export default async function NewsDetailPage({ params }: PageProps) {
  await initDatabase();
  
  const newsId = params.new;
  
  try {
    const news = await fetchNewsFromDatabase();
    const currentNews = news.find(item => item.id?.toString() === newsId);
    
    if (!currentNews) {
      notFound();
    }
    
    return (
      <div className="container mx-auto px-4 py-8">
        <article className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{currentNews.title}</h1>
          <div className="text-gray-600 mb-6">
            {/* Дата будет добавлена позже, когда поле date появится в интерфейсе NewsNew */}
          </div>
          <div className="prose max-w-none">
            {currentNews.description && (
              <div dangerouslySetInnerHTML={{ __html: currentNews.description }} />
            )}
          </div>
        </article>
      </div>
    );
  } catch (error) {
    console.error("Ошибка при получении новости:", error);
    notFound();
  }
}
