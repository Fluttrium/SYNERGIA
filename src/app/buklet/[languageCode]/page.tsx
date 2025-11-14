"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// Функция для парсинга ссылок в тексте
function parseLinks(text: string) {
  // Регулярное выражение для поиска URL (включая vk.com, youtube.com и другие)
  const urlRegex = /(https?:\/\/(?:www\.)?[^\s]+)/gi;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      // Создаем более читаемый текст для ссылки
      let displayText = part;
      
      // Сокращаем длинные ссылки
      if (part.length > 50) {
        const domain = new URL(part).hostname;
        displayText = `${domain}...`;
      }
      
      return (
        <a
          key={index}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-purple-600 hover:text-purple-800 underline font-medium transition-colors duration-200"
          title={part}
        >
          {displayText}
        </a>
      );
    }
    return part;
  });
}

interface FileGroup {
  id: number;
  title: string;
  description: string;
  link?: string;
  images: Array<{
    id: number;
    filename: string;
    data: string;
  }>;
  pdfs: Array<{
    id: number;
    filename: string;
    data: string;
  }>;
}

interface Item {
  id: number;
  name: string;
  type: 'buklet' | 'brochure';
  language?: string;
  description?: string;
  mainImage?: string;
  mainImageFilename?: string;
  images?: string[];
  pdfs?: string[];
  fileGroups?: FileGroup[];
}

export default function Page({ params }: { params: { languageCode: string } }) {
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchItem() {
      try {
        const res = await fetch(
          `/api/buklets/getbukletbyid?id=${params.languageCode}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: Item = await res.json();
        setItem(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchItem();
  }, [params.languageCode]);

  const languageNames: Record<string, string> = {
    russian: "Русский",
    uzbek: "Узбекский", 
    tajik: "Таджикский",
    kyrgyz: "Кыргызский",
    kazakh: "Казахский"
  };

  if (loading) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
        <div className="w-screen py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="bg-gray shadow-md rounded-lg overflow-hidden animate-pulse"
              >
                <div className="w-full h-64 bg-gray-200"></div>
                <div className="p-6">
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-6 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!item) {
    return <div>Материал не найден</div>;
  }

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg mx-auto px-4">
        <div className="mb-8">
          {item.type === 'brochure' && item.language && (
            <div className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full mb-4">
              {languageNames[item.language] || item.language}
            </div>
          )}
          <h2 className="text-3xl font-bold mb-4 max-w-4xl">
            {parseLinks(item.name)}
          </h2>
          {item.description && (
            <p className="text-lg text-gray-600 max-w-4xl mb-6" style={{
              display: '-webkit-box',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {parseLinks(item.description)}
            </p>
          )}
          {item.type === 'brochure' && item.mainImage && (
            <div className="mb-8">
              <img
                src={item.mainImage}
                alt={item.mainImageFilename || item.name}
                className="max-w-2xl rounded-lg shadow-lg"
              />
            </div>
          )}
        </div>
        
                {/* Отображение для брошюр с группами файлов */}
                {item.type === 'brochure' && item.fileGroups && item.fileGroups.length > 0 && (
                  <div className="space-y-8">
                    {item.fileGroups.map((group, groupIndex) => (
                      <div key={group.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="mb-6">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            {group.title}
                          </h3>
                          {group.description && (
                            <p className="text-gray-600 mb-3 max-w-4xl" style={{
                              display: '-webkit-box',
                              WebkitLineClamp: 3,
                              WebkitBoxOrient: 'vertical',
                              overflow: 'hidden'
                            }}>
                              {parseLinks(group.description)}
                            </p>
                          )}
                          {group.link && (
                            <div className="mb-3">
                              <a
                                href={group.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors duration-200"
                              >
                                Открыть ссылку
                                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                              </a>
                            </div>
                          )}
                        </div>


                        {/* PDF файлы группы */}
                        {group.pdfs.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {group.pdfs.map((pdf, pdfIndex) => (
                              <div key={pdf.id} className="bg-white p-8 shadow-xl rounded-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center mb-6">
                                  <div className="text-6xl mr-4">📄</div>
                                  <h4 className="text-xl font-bold text-gray-800 flex-1">
                                    {pdf.filename}
                                  </h4>
                                </div>
                                <div className="text-left">
                                  <a
                                    href={pdf.data}
                                    download={pdf.filename}
                                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                                  >
                                    Скачать PDF
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Отображение для буклетов с группами файлов */}
                {item.type === 'buklet' && item.fileGroups && item.fileGroups.length > 0 && (
                  <div className="space-y-8">
                    {item.fileGroups.map((group, groupIndex) => (
                      <div key={group.id} className="bg-gray-50 rounded-lg p-6">
                        <div className="mb-6">
                          <h3 className="text-2xl font-semibold text-gray-800 mb-2">
                            {group.title}
                          </h3>
                          {group.description && (
                            <p className="text-gray-600">{group.description}</p>
                          )}
                        </div>


                        {/* PDF файлы группы */}
                        {group.pdfs.length > 0 && (
                          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                            {group.pdfs.map((pdf, pdfIndex) => (
                              <div key={pdf.id} className="bg-white p-8 shadow-xl rounded-xl border border-gray-100 hover:shadow-2xl transition-all duration-300">
                                <div className="flex items-center mb-6">
                                  <div className="text-6xl mr-4">📄</div>
                                  <h4 className="text-xl font-bold text-gray-800 flex-1">
                                    {pdf.filename}
                                  </h4>
                                </div>
                                <div className="text-left">
                                  <a
                                    href={pdf.data}
                                    download={pdf.filename}
                                    className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
                                  >
                                    Скачать PDF
                                  </a>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {/* Отображение для старых буклетов (без групп файлов) */}
                {item.type === 'buklet' && item.images && item.images.length > 0 && (!item.fileGroups || item.fileGroups.length === 0) && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {item.images.map((imgSrc, index) => (
            <div key={index} className="space-y-6">
              <div className="arch bg-white p-4 shadow-lg">
                <img
                  src={`data:image/png;base64,${imgSrc}`}
                            alt={`${item.name} - изображение ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                          {item.pdfs && item.pdfs[index] && (
                            <div className="mt-4 text-center">
                              <a
                                href={`data:application/pdf;base64,${item.pdfs[index]}`}
                                download={`${item.name}-${index + 1}.pdf`}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                  >
                    Скачать PDF
                  </a>
                            </div>
                )}
              </div>
            </div>
          ))}
                  </div>
                )}

                {/* Только PDF файлы для старых буклетов */}
                {item.type === 'buklet' && item.pdfs && item.pdfs.length > 0 && (!item.images || item.images.length === 0) && (!item.fileGroups || item.fileGroups.length === 0) && (
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-4">Доступные документы</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {item.pdfs.map((pdfSrc, index) => (
                        <div key={index} className="arch bg-white p-6 shadow-lg">
                          <div className="text-center">
                            <div className="text-4xl mb-4">📄</div>
                            <h4 className="text-lg font-semibold mb-2">
                              {item.name} - Часть {index + 1}
                            </h4>
                            <a
                              href={`data:application/pdf;base64,${pdfSrc}`}
                              download={`${item.name}-${index + 1}.pdf`}
                              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                            >
                              Скачать PDF
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

        <div className="text-center mt-8">
          <Link
            href="/buklet"
            className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
          >
            ← Вернуться к списку материалов
          </Link>
        </div>
      </div>
    </section>
  );
}
