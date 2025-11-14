import React from 'react';
import Link from 'next/link';

export default function SynergiaAggregatorPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Кнопка вернуться на сайт */}
          <div className="mb-8">
            <Link 
              href="/"
              className="inline-flex items-center gap-2 bg-white/20 hover:bg-white/30 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 backdrop-blur-sm"
            >
              ← Вернуться на сайт
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            СИНЕРГИЯ.Агрегатор
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Найдите жилье в Санкт-Петербурге. Аренда комнат, квартир и хостелов для мигрантов.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link 
              href="/synergia-aggregator/housing"
              className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-center"
            >
              Найти жилье
            </Link>
            <Link 
              href="/synergia-aggregator/housing/create"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors text-center"
            >
              Разместить объявление
            </Link>
          </div>
        </div>
      </section>

      {/* Housing Section */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            {/* Жилье - крупная карточка */}
            <div className="bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-700 rounded-2xl shadow-2xl overflow-hidden transform hover:scale-[1.02] transition-all duration-300">
              <div className="p-8 md:p-12 lg:p-16">
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                  {/* Иконка */}
                  <div className="flex-shrink-0">
                    <div className="w-24 h-24 md:w-32 md:h-32 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <svg className="w-12 h-12 md:w-16 md:h-16 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                    </div>
                  </div>
                  
                  {/* Контент */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                      Поиск жилья
                    </h3>
                    <p className="text-lg md:text-xl text-white/90 mb-8 leading-relaxed">
                      Найдите подходящее жилье в Санкт-Петербурге. Аренда комнат, квартир, хостелов. 
                      Временное и постоянное жилье для мигрантов с проверенными объявлениями.
                    </p>
                    
                    {/* Кнопки */}
                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <Link 
                        href="/synergia-aggregator/housing"
                        className="inline-flex items-center justify-center gap-2 bg-white text-purple-700 px-8 py-4 rounded-xl font-bold text-lg hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Смотреть объявления
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                      <Link 
                        href="/synergia-aggregator/housing/create"
                        className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                      >
                        Разместить объявление
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Почему СИНЕРГИЯ.Агрегатор?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-200 rounded-lg opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Безопасно</h3>
              <p className="text-gray-600">
                Все объявления проверяются. Мы заботимся о вашей безопасности.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-200 rounded-lg opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Многоязычно</h3>
              <p className="text-gray-600">
                Поддержка на русском, таджикском, узбекском и других языках.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-20 h-20 bg-purple-100 rounded-xl mx-auto mb-4 flex items-center justify-center">
                <div className="w-16 h-16 bg-purple-200 rounded-lg opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Быстро</h3>
              <p className="text-gray-600">
                Найдите нужную услугу за несколько минут. Удобный поиск и фильтры.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Готовы найти жилье?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Присоединяйтесь к СИНЕРГИЯ.Агрегатору и найдите подходящее жилье в Санкт-Петербурге.
          </p>
          <Link 
            href="/synergia-aggregator/housing"
            className="inline-block bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors text-lg"
          >
            Начать поиск жилья
          </Link>
        </div>
      </section>
    </div>
  );
}
