"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface HousingListing {
  id: number;
  title: string;
  description: string;
  housingType: string;
  district: string;
  address: string;
  price: number;
  pricePeriod: string;
  rooms: number | null;
  area: number | null;
  floor: number | null;
  totalFloors: number | null;
  views: number;
  mainImage?: string;
}

export default function HousingPage() {
  const [listings, setListings] = useState<HousingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    district: "Все районы",
    housingType: "Любой тип",
    maxPrice: "",
  });

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    // Обновляем список при изменении фильтров (с небольшой задержкой для debounce)
    const timeoutId = setTimeout(() => {
      fetchListings();
    }, 300);
    
    return () => clearTimeout(timeoutId);
  }, [filters.district, filters.housingType, filters.maxPrice]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (filters.district !== "Все районы") params.append("district", filters.district);
      if (filters.housingType !== "Любой тип") params.append("housingType", filters.housingType);
      if (filters.maxPrice) params.append("maxPrice", filters.maxPrice);
      // Для публичной страницы показываем только approved объявления
      // (pending объявления должны быть одобрены админом через /admin/aggregator/housing)
      params.append("status", "approved");

      const response = await fetch(`/api/aggregator/housing?${params.toString()}`);
      
      if (!response.ok) {
        console.error("Failed to fetch listings:", response.status, response.statusText);
        const errorData = await response.json().catch(() => ({}));
        console.error("Error details:", errorData);
        setListings([]);
        return;
      }
      
      const data = await response.json();
      console.log("Fetched listings:", {
        total: data.total || 0,
        listingsCount: data.listings?.length || 0,
        listings: data.listings
      });
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const housingTypeLabels: { [key: string]: string } = {
    room: "Комната",
    apartment: "Квартира",
    hostel: "Хостел",
    dormitory: "Общежитие",
    hotel: "Гостиница",
    temporary: "Временное жилье",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-purple-800 text-white py-16">
        <div className="container mx-auto px-4">
          {/* Breadcrumb Navigation */}
          <div className="mb-6">
            <nav className="flex items-center space-x-2 text-sm">
              <Link href="/synergia-aggregator" className="hover:text-purple-200 transition-colors">
                СИНЕРГИЯ.Агрегатор
              </Link>
              <span className="text-purple-300">/</span>
              <span className="text-white font-medium">Жилье</span>
            </nav>
          </div>
          
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Жилье для мигрантов
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
              Аренда комнат, квартир, хостелов. Временное и постоянное жилье для мигрантов в Санкт-Петербурге.
            </p>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Район
                  </label>
                  <select 
                    value={filters.district}
                    onChange={(e) => setFilters({...filters, district: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option>Все районы</option>
                    <option>Центральный</option>
                    <option>Адмиралтейский</option>
                    <option>Василеостровский</option>
                    <option>Петроградский</option>
                    <option>Красногвардейский</option>
                    <option>Невский</option>
                    <option>Калининский</option>
                    <option>Кировский</option>
                    <option>Московский</option>
                    <option>Фрунзенский</option>
                    <option>Красносельский</option>
                    <option>Колпинский</option>
                    <option>Пушкинский</option>
                    <option>Павловский</option>
                    <option>Кронштадтский</option>
                    <option>Курортный</option>
                    <option>Приморский</option>
                    <option>Выборгский</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Тип жилья
                  </label>
                  <select 
                    value={filters.housingType}
                    onChange={(e) => setFilters({...filters, housingType: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option>Любой тип</option>
                    <option value="room">Комната</option>
                    <option value="apartment">Квартира</option>
                    <option value="hostel">Хостел</option>
                    <option value="dormitory">Общежитие</option>
                    <option value="hotel">Гостиница</option>
                    <option value="temporary">Временное жилье</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Цена до (₽/месяц)
                  </label>
                  <input 
                    type="number" 
                    placeholder="50000"
                    value={filters.maxPrice}
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="mt-4 flex flex-col md:flex-row gap-4">
                <button 
                  onClick={fetchListings}
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
                >
                  Найти жилье
                </button>
                <Link 
                  href="/synergia-aggregator/housing/create"
                  className="border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center"
                >
                  Разместить объявление
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Список объявлений в стиле Авито */}
      <section className="py-8">
        <div className="container mx-auto px-4">
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
              <p className="mt-4 text-gray-600">Загрузка объявлений...</p>
            </div>
          ) : listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">Объявления не найдены</p>
              <Link 
                href="/synergia-aggregator/housing/create"
                className="text-purple-600 hover:text-purple-800 font-semibold"
              >
                Разместите первое объявление →
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-gray-800">
                  Найдено объявлений: {listings.length}
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((listing) => (
                  <Link 
                    key={listing.id}
                    href={`/synergia-aggregator/housing/${listing.id}`}
                    className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow overflow-hidden"
                  >
                    <div className="relative h-48 bg-gray-200">
                      {listing.mainImage ? (
                        <img 
                          src={listing.mainImage} 
                          alt={listing.title}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                          Нет фото
                        </div>
                      )}
                      <div className="absolute top-2 right-2 bg-purple-600 text-white px-2 py-1 rounded text-sm font-semibold">
                        {housingTypeLabels[listing.housingType] || listing.housingType}
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl font-bold text-purple-600">
                          {listing.price.toLocaleString()} ₽
                        </span>
                        <span className="text-sm text-gray-500">
                          /{listing.pricePeriod === 'month' ? 'мес' : 'день'}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        {listing.rooms && <span>Комнат: {listing.rooms}</span>}
                        {listing.area && <span>{listing.area} м²</span>}
                        {listing.floor && <span>Этаж: {listing.floor}/{listing.totalFloors}</span>}
                      </div>
                      <div className="mt-2 text-xs text-gray-500">
                        {listing.district} • {listing.views} просмотров
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* Housing Categories - оставляем для навигации */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-800">
            Типы жилья
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Комната */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-200 rounded-md opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Комната</h3>
              <p className="text-gray-600 mb-4">
                Отдельная комната в квартире с общими удобствами. Идеально для временного проживания.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Цена:</span> от 15,000 ₽/месяц
              </div>
              <button 
                onClick={() => {
                  setFilters({...filters, housingType: "room"});
                  fetchListings();
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Смотреть комнаты
              </button>
            </div>

            {/* Квартира */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-200 rounded-md opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Квартира</h3>
              <p className="text-gray-600 mb-4">
                Отдельная квартира со всеми удобствами. Для семей или длительного проживания.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Цена:</span> от 35,000 ₽/месяц
              </div>
              <button 
                onClick={() => {
                  setFilters({...filters, housingType: "apartment"});
                  fetchListings();
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Смотреть квартиры
              </button>
            </div>

            {/* Хостел */}
            <div className="bg-gray-50 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-lg mb-4 flex items-center justify-center">
                <div className="w-12 h-12 bg-purple-200 rounded-md opacity-60"></div>
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-800">Хостел</h3>
              <p className="text-gray-600 mb-4">
                Общие комнаты с кроватями. Экономичный вариант для краткосрочного проживания.
              </p>
              <div className="text-sm text-gray-500 mb-4">
                <span className="font-medium">Цена:</span> от 500 ₽/день
              </div>
              <button 
                onClick={() => {
                  setFilters({...filters, housingType: "hostel"});
                  fetchListings();
                }}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-lg transition-colors"
              >
                Смотреть хостелы
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Нужна помощь с жильем?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Свяжитесь с нашими специалистами для получения консультации по вопросам аренды жилья.
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Получить консультацию
            </button>
            <Link 
              href="/synergia-aggregator"
              className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-3 rounded-lg font-semibold transition-colors inline-block"
            >
              Вернуться к категориям
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
