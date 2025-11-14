"use client";

import { useEffect, useState } from "react";
import { MdPreview } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

export type NewsArticle = {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  body?: string;
};

export default function NewsArticlePage() {
  const params = useParams();
  const id = params.id as string;
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        console.log("📡 Fetching news with ID:", id);
        const response = await fetch(`/api/news/${id}`);
        
        console.log("📥 Response status:", response.status);
        
        if (!response.ok) {
          const errorData = await response.json();
          console.error("❌ Error response:", errorData);
          throw new Error(errorData.message || 'Новость не найдена');
        }

        const data = await response.json();
        console.log("✅ News data received:", data);
        setArticle(data);
      } catch (err: any) {
        console.error("❌ Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка новости...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-red-500 text-lg mb-4">Ошибка: {error}</p>
          <Link href="/news">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Вернуться к новостям
            </button>
          </Link>
        </div>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="text-center">
          <p className="text-gray-600 text-lg mb-4">Новость не найдена</p>
          <Link href="/news">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Вернуться к новостям
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Кнопка назад */}
        <div className="mb-6">
          <Link href="/news">
            <button className="flex items-center text-blue-600 hover:text-blue-700 font-medium">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Назад к новостям
            </button>
          </Link>
        </div>

        {/* Обложка */}
        {article.image && (
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-96 object-cover"
            />
          </div>
        )}

        {/* Основной контент */}
        <article className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>
          
          <p className="text-xl text-gray-600 mb-8">
            {article.description}
          </p>

          {/* Markdown контент */}
          {article.body && article.body.trim() !== '' ? (
            <div className="prose prose-lg max-w-none">
              <MdPreview 
                modelValue={article.body}
                previewTheme="default"
              />
            </div>
          ) : (
            <div className="text-gray-500 italic">
              Полное описание новости отсутствует.
            </div>
          )}

          {/* Внешняя ссылка (если есть) */}
          {article.link && article.link !== '#' && article.link.trim() !== '' && (
            <div className="mt-8 pt-8 border-t border-gray-200">
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <span>Читать далее</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </a>
            </div>
          )}
        </article>
      </div>
    </div>
  );
}

