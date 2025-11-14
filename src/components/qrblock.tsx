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

const QrBlock: React.FC = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await fetch("/api/buklets/getbuklets");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setItems(data.items || []); // Присваиваем items из полученных данных
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  const languageNames: Record<string, string> = {
    russian: "Русский",
    uzbek: "Узбекский", 
    tajik: "Таджикский",
    kyrgyz: "Кыргызский",
    kazakh: "Казахский"
  };

  // Группируем элементы по типам
  const buklets = items.filter(item => item.type === 'buklet');
  const brochures = items.filter(item => item.type === 'brochure');

  // Группируем брошюры по языкам
  const brochuresByLanguage = brochures.reduce((acc, brochure) => {
    if (!acc[brochure.language || 'other']) {
      acc[brochure.language || 'other'] = [];
    }
    acc[brochure.language || 'other'].push(brochure);
    return acc;
  }, {} as Record<string, Item[]>);

  if (loading) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full py-48">
        <div className="max-w-screen-xl mx-auto px-4">
          <h2 className="text-4xl font-bold pb-10 text-center">
            Полезная информация для иностранных граждан
          </h2>
          <div className="flex justify-center">
            <div className="block text-3xl h-12 bg-gray-200 p-2 rounded-md animate-pulse">
              Загрузка...
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full py-48">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold pb-10">Полезная информация для иностранных граждан</h2>
          <div className="text-red-600">Ошибка: {error}</div>
        </div>
      </section>
    );
  }

  if (!Array.isArray(items) || items.length === 0) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full py-48">
        <div className="max-w-screen-xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold pb-10">Полезная информация для иностранных граждан</h2>
          <div className="text-gray-600">Материалы пока не добавлены</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative flex bg-white h-max z-1 w-full py-48">
      <div className="max-w-screen-xl mx-auto px-4">
        <h2 className="text-4xl font-bold pb-10 text-center">
          Полезная информация для иностранных граждан
        </h2>
        
        {/* Описание проекта */}
        <div className="mb-12 text-center max-w-4xl mx-auto">
          <p className="text-lg text-gray-600 mb-6">
            Фондом &quot;ОРИЕНТИР&quot; разработаны новые брошюры по миграционному и трудовому законодательству 
            в доступной и понятной мигрантам форме.
          </p>
          <p className="text-base text-gray-500">
            С целью наиболее продуктивного и эффективного информирования мигрантов была организована 
            приемная правовой поддержки для оказания юридической помощи на безвозмездной основе 
            трудящимся-мигрантам.
          </p>
        </div>

        {/* Буклеты */}
        {buklets.length > 0 && (
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6 text-center">Буклеты</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {buklets.map((buklet) => (
                <div key={buklet.id} className="bg-white rounded-lg shadow-md border border-gray-200 p-6 hover:shadow-lg transition-shadow">
                  <h4 className="text-xl font-semibold mb-3 text-gray-800">
                    {buklet.name}
                  </h4>
                  <Link
                    href={`/buklet/${buklet.id}`}
                    className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                  >
                    Открыть буклет
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Брошюры по языкам */}
        {Object.keys(brochuresByLanguage).length > 0 && (
          <div>
            <h3 className="text-2xl font-semibold mb-6 text-center">Брошюры для мигрантов</h3>
            {Object.entries(brochuresByLanguage)
              .filter(([language]) => language && language !== 'other' && language !== 'undefined')
              .map(([language, languageBrochures]) => (
              <div key={language} className="mb-8">
                <h4 className="text-xl font-medium mb-4 text-center">
                  Брошюры на {languageNames[language] || language} языке
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {languageBrochures.map((brochure) => (
                    <div key={brochure.id} className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
                      {brochure.mainImage && (
                        <div className="mb-6">
                          <img
                            src={brochure.mainImage}
                            alt={brochure.mainImageFilename || brochure.name}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        </div>
                      )}
                      
                      <div className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full mb-3">
                        {languageNames[language] || language}
                      </div>
                      <h5 className="text-xl font-bold mb-4 text-gray-800" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.4',
                        maxHeight: '4.2em'
                      }}>
                        {parseLinks(brochure.name)}
                      </h5>
                      <Link
                        href={`/buklet/${brochure.id}`}
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
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
              <div key={language || 'unknown'} className="mb-8">
                <h4 className="text-xl font-medium mb-4 text-center">
                  Брошюры
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
                  {languageBrochures.map((brochure) => (
                    <div key={brochure.id} className="bg-white rounded-xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300">
                      {brochure.mainImage && (
                        <div className="mb-6">
                          <img
                            src={brochure.mainImage}
                            alt={brochure.mainImageFilename || brochure.name}
                            className="w-full h-48 object-cover rounded-xl"
                          />
                        </div>
                      )}
                      
                      <h5 className="text-xl font-bold mb-4 text-gray-800" style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.4',
                        maxHeight: '4.2em'
                      }}>
                        {parseLinks(brochure.name)}
                      </h5>
                      <Link
                        href={`/buklet/${brochure.id}`}
                        className="inline-block bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
                      >
                        Открыть брошюру
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default QrBlock;
