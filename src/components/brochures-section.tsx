"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

// Функция для парсинга ссылок в тексте
function parseLinks(text: string) {
  const urlRegex = /(https?:\/\/(?:www\.)?[^\s]+)/gi;
  const parts = text.split(urlRegex);
  
  return parts.map((part, index) => {
    if (urlRegex.test(part)) {
      let displayText = part;
      
      if (part.length > 50) {
        try {
          const domain = new URL(part).hostname;
          displayText = `${domain}...`;
        } catch {
          displayText = part.substring(0, 47) + '...';
        }
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

interface Item {
  id: number;
  name: string;
  type: 'buklet' | 'brochure';
  language?: string;
  mainImage?: string;
  mainImageFilename?: string;
}

const BrochuresSection: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const response = await fetch("/api/buklets/getbuklets");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      // Фильтруем только брошюры
      const brochuresOnly = (data.items || []).filter((item: any) => item.type === 'brochure');
      setItems(brochuresOnly);
    } catch (error) {
      console.error("Error fetching brochures:", error);
    } finally {
      setLoading(false);
    }
  };

  // Группируем брошюры по языкам
  const brochuresByLanguage = items.reduce((acc, brochure) => {
    const language = brochure.language || 'other';
    if (!acc[language]) {
      acc[language] = [];
    }
    acc[language].push(brochure);
    return acc;
  }, {} as Record<string, Item[]>);

  // Названия языков
  const languageNames: Record<string, string> = {
    'russian': 'Русском',
    'tajik': 'Таджикском', 
    'uzbek': 'Узбекском',
    'kyrgyz': 'Кыргызском',
    'kazakh': 'Казахском',
    'other': 'Других языках'
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Загрузка брошюр...</p>
          </div>
        </div>
      </section>
    );
  }

  if (items.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Брошюры для мигрантов</h2>
            <p className="text-gray-600">Пока нет доступных брошюр</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50 relative z-30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Брошюры для мигрантов
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Полезная информация и руководства для трудовых мигрантов на разных языках
          </p>
        </div>

        <div className="space-y-12">
          {/* Брошюры с определенными языками */}
          {Object.entries(brochuresByLanguage)
            .filter(([language]) => language && language !== 'other' && language !== 'undefined')
            .map(([language, languageBrochures]) => (
            <div key={language} className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Брошюры на {languageNames[language] || language} языке
                </h3>
                <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {languageBrochures.map((brochure) => (
                  <div key={brochure.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    {/* Картинка */}
                    {brochure.mainImage && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={brochure.mainImage}
                          alt={brochure.mainImageFilename || brochure.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Язык */}
                    <div className="inline-block bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full mb-3 font-medium">
                      {languageNames[language] || language}
                    </div>
                    
                    {/* Заголовок */}
                    <h4 className="text-lg font-bold mb-3 text-gray-800" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.4',
                      minHeight: '2.8em'
                    }}>
                      {parseLinks(brochure.name)}
                    </h4>
                    
                    {/* Кнопка */}
                    <Link
                      href={`/buklet/${brochure.id}`}
                      className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
                    >
                      Открыть брошюру
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
          
          {/* Брошюры без определенного языка */}
          {Object.entries(brochuresByLanguage)
            .filter(([language]) => !language || language === 'other' || language === 'undefined')
            .map(([language, languageBrochures]) => (
            <div key={language || 'unknown'} className="mb-12">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                  Другие брошюры
                </h3>
                <div className="w-24 h-1 bg-purple-600 mx-auto rounded-full"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {languageBrochures.map((brochure) => (
                  <div key={brochure.id} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 group">
                    {/* Картинка */}
                    {brochure.mainImage && (
                      <div className="mb-4 overflow-hidden rounded-lg">
                        <img
                          src={brochure.mainImage}
                          alt={brochure.mainImageFilename || brochure.name}
                          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    
                    {/* Язык */}
                    <div className="inline-block bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full mb-3 font-medium">
                      Общая информация
                    </div>
                    
                    {/* Заголовок */}
                    <h4 className="text-lg font-bold mb-3 text-gray-800" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      lineHeight: '1.4',
                      minHeight: '2.8em'
                    }}>
                      {parseLinks(brochure.name)}
                    </h4>
                    
                    {/* Кнопка */}
                    <Link
                      href={`/buklet/${brochure.id}`}
                      className="inline-block w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 text-center"
                    >
                      Открыть брошюру
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка "Все брошюры" */}
        <div className="text-center mt-12">
          <Link
            href="/buklet"
            className="inline-block bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Посмотреть все брошюры
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BrochuresSection;
