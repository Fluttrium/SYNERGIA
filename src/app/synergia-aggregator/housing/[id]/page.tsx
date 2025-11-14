"use client";

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';

interface HousingListingDetail {
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
  amenities: string[];
  contactPhone: string;
  contactEmail: string;
  contactTelegram: string;
  views: number;
  createdAt: string;
  images: Array<{
    image: string;
    filename: string;
    isMain: boolean;
    orderIndex: number;
  }>;
}

const housingTypeLabels: { [key: string]: string } = {
  room: "Комната",
  apartment: "Квартира",
  hostel: "Хостел",
  dormitory: "Общежитие",
  hotel: "Гостиница",
  temporary: "Временное жилье",
};

export default function HousingDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [listing, setListing] = useState<HousingListingDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (params.id) {
      fetchListing();
    }
  }, [params.id]);

  const fetchListing = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/aggregator/housing/${params.id}`);
      if (response.ok) {
        const data = await response.json();
        setListing(data);
      } else {
        router.push('/synergia-aggregator/housing');
      }
    } catch (error) {
      console.error('Error fetching listing:', error);
      router.push('/synergia-aggregator/housing');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          <p className="mt-4 text-gray-600">Загрузка объявления...</p>
        </div>
      </div>
    );
  }

  if (!listing) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600 mb-4">Объявление не найдено</p>
          <Link 
            href="/synergia-aggregator/housing"
            className="text-purple-600 hover:text-purple-800"
          >
            Вернуться к списку
          </Link>
        </div>
      </div>
    );
  }

  const mainImage = listing.images.find(img => img.isMain) || listing.images[0];
  const otherImages = listing.images.filter((img, idx) => idx !== 0 || !img.isMain);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <Link href="/synergia-aggregator" className="text-purple-600 hover:text-purple-800">
              СИНЕРГИЯ.Агрегатор
            </Link>
            <span className="text-gray-400">/</span>
            <Link href="/synergia-aggregator/housing" className="text-purple-600 hover:text-purple-800">
              Жилье
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600">{listing.title}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Основной контент */}
          <div className="lg:col-span-2">
            {/* Заголовок */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-800 mb-2">
                    {listing.title}
                  </h1>
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-semibold">
                      {housingTypeLabels[listing.housingType] || listing.housingType}
                    </span>
                    <span>{listing.district}</span>
                    {listing.address && <span>• {listing.address}</span>}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-purple-600">
                    {listing.price.toLocaleString()} ₽
                  </div>
                  <div className="text-sm text-gray-500">
                    /{listing.pricePeriod === 'month' ? 'месяц' : 'день'}
                  </div>
                </div>
              </div>
            </div>

            {/* Изображения */}
            {listing.images.length > 0 && (
              <div className="bg-white rounded-lg shadow-md p-6 mb-6">
                <div className="mb-4">
                  <img 
                    src={listing.images[selectedImage]?.image || mainImage?.image} 
                    alt={listing.title}
                    className="w-full h-96 object-cover rounded-lg"
                  />
                </div>
                {listing.images.length > 1 && (
                  <div className="grid grid-cols-5 gap-2">
                    {listing.images.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedImage(idx)}
                        className={`relative h-20 rounded-lg overflow-hidden border-2 ${
                          selectedImage === idx ? 'border-purple-600' : 'border-transparent'
                        }`}
                      >
                        <img 
                          src={img.image} 
                          alt={`${listing.title} ${idx + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Описание */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Описание</h2>
              <p className="text-gray-600 whitespace-pre-line leading-relaxed">
                {listing.description}
              </p>
            </div>

            {/* Характеристики */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Характеристики</h2>
              <div className="grid grid-cols-2 gap-4">
                {listing.rooms && (
                  <div>
                    <span className="text-gray-600">Комнат:</span>
                    <span className="ml-2 font-semibold">{listing.rooms}</span>
                  </div>
                )}
                {listing.area && (
                  <div>
                    <span className="text-gray-600">Площадь:</span>
                    <span className="ml-2 font-semibold">{listing.area} м²</span>
                  </div>
                )}
                {listing.floor && (
                  <div>
                    <span className="text-gray-600">Этаж:</span>
                    <span className="ml-2 font-semibold">
                      {listing.floor}{listing.totalFloors ? ` из ${listing.totalFloors}` : ''}
                    </span>
                  </div>
                )}
                <div>
                  <span className="text-gray-600">Район:</span>
                  <span className="ml-2 font-semibold">{listing.district}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Боковая панель */}
          <div className="lg:col-span-1">
            {/* Контакты */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-6 sticky top-4">
              <h2 className="text-xl font-bold text-gray-800 mb-4">Контакты</h2>
              
              {listing.contactPhone && (
                <div className="mb-4">
                  <a 
                    href={`tel:${listing.contactPhone}`}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors block text-center mb-2"
                  >
                    📞 Позвонить
                  </a>
                  <p className="text-sm text-gray-600 text-center">{listing.contactPhone}</p>
                </div>
              )}

              {listing.contactTelegram && (
                <div className="mb-4">
                  <a 
                    href={`https://t.me/${listing.contactTelegram.replace('@', '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
                  >
                    💬 Написать в Telegram
                  </a>
                </div>
              )}

              {listing.contactEmail && (
                <div className="mb-4">
                  <a 
                    href={`mailto:${listing.contactEmail}`}
                    className="w-full border-2 border-purple-600 text-purple-600 hover:bg-purple-600 hover:text-white font-semibold py-3 px-4 rounded-lg transition-colors block text-center"
                  >
                    ✉️ Написать на email
                  </a>
                </div>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span>Просмотров:</span>
                    <span className="font-semibold">{listing.views}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Опубликовано:</span>
                    <span className="font-semibold">
                      {new Date(listing.createdAt).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Полезные ссылки */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4">Полезные ссылки</h3>
              <div className="space-y-2">
                <Link 
                  href="/synergia-aggregator/housing"
                  className="block text-purple-600 hover:text-purple-800"
                >
                  ← Все объявления
                </Link>
                <Link 
                  href="/synergia-aggregator/housing/create"
                  className="block text-purple-600 hover:text-purple-800"
                >
                  + Разместить объявление
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

