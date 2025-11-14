"use client";
import React from "react";
import Link from "next/link";

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  body?: string;
}

interface NewsProps {
  initialBlogs: NewsItem[];
  showLimited?: boolean; // Показывать только первые 3 новости
}

export default function News({ initialBlogs, showLimited = false }: NewsProps) {
  const blogs = showLimited ? initialBlogs.slice(0, 3) : initialBlogs;

  return (
    <section className="relative bg-white py-20 px-4 sm:px-6 lg:px-8" id="news">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Новости Фонда СИНЕРГИЯ
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Актуальные события культурно-делового сотрудничества городов-побратимов Санкт-Петербурга
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {blogs.length === 0 ? (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-500 text-lg">Новостей пока нет</p>
            </div>
          ) : (
            blogs.map((blog) => (
              <Link
                key={blog.id}
                href={`/news/${blog.id}`}
                className="bg-white shadow-lg rounded-xl overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group flex flex-col transform hover:-translate-y-1"
              >
                <div className="overflow-hidden h-56 relative">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  {/* Градиент оверлей */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-600 transition-colors duration-300 line-clamp-2 min-h-[3.5rem]">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 text-base line-clamp-3 flex-1 mb-4">
                    {blog.description}
                  </p>
                  
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <span className="text-blue-600 font-semibold text-sm flex items-center">
                      Читать далее
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                    {blog.body && blog.body.length > 0 && (
                      <span className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded">
                        Полная статья
                      </span>
                    )}
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>

        {/* Кнопка "Все новости" если показываем только часть */}
        {showLimited && initialBlogs.length > 3 && (
          <div className="text-center mt-12">
            <Link href="/news">
              <button className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl">
                Все новости ({initialBlogs.length})
              </button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
