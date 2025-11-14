"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";

interface MyListing {
  id: number;
  title: string;
  description: string | null;
  housingType: string;
  district: string;
  address: string | null;
  price: number;
  pricePeriod: string;
  rooms: number | null;
  area: number | null;
  floor: number | null;
  totalFloors: number | null;
  status: string;
  views: number;
  createdAt: string;
  mainImage?: string;
  mainImageFilename?: string;
}

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [listings, setListings] = useState<MyListing[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    } else if (user) {
      fetchMyListings();
    }
  }, [authLoading, user, router]);

  const fetchMyListings = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/users/my-listings', {
        credentials: 'include',
      });
      
      if (response.ok) {
        const data = await response.json();
        setListings(data.listings || []);
      } else {
        console.error('Failed to fetch listings');
      }
    } catch (error) {
      console.error('Error fetching listings:', error);
    } finally {
      setLoading(false);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const housingTypeLabels: { [key: string]: string } = {
    room: "Комната",
    apartment: "Квартира",
    hostel: "Хостел",
    dormitory: "Общежитие",
    hotel: "Гостиница",
    temporary: "Временное жилье",
  };

  const statusLabels: { [key: string]: { text: string; color: string } } = {
    pending: { text: "На модерации", color: "bg-yellow-100 text-yellow-800" },
    approved: { text: "Одобрено", color: "bg-green-100 text-green-800" },
    rejected: { text: "Отклонено", color: "bg-red-100 text-red-800" },
    archived: { text: "В архиве", color: "bg-gray-100 text-gray-800" },
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white shadow rounded-lg p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Личный кабинет
          </h1>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-semibold mb-4">Информация о профиле</h2>
              <dl className="space-y-2">
                <div>
                  <dt className="text-sm font-medium text-gray-500">Имя:</dt>
                  <dd className="text-base text-gray-900">{user.name || "Не указано"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Фамилия:</dt>
                  <dd className="text-base text-gray-900">{user.surname || "Не указано"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Email:</dt>
                  <dd className="text-base text-gray-900">{user.email}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Телефон:</dt>
                  <dd className="text-base text-gray-900">{user.phone || "Не указан"}</dd>
                </div>
                <div>
                  <dt className="text-sm font-medium text-gray-500">Роль:</dt>
                  <dd className="text-base text-gray-900">
                    {user.role === 'admin' ? 'Администратор' : 'Пользователь'}
                  </dd>
                </div>
              </dl>
            </div>

            <div>
              <h2 className="text-xl font-semibold mb-4">Быстрые действия</h2>
              <div className="space-y-3">
                <Link
                  href="/synergia-aggregator/housing/create"
                  className="block w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition text-center"
                >
                  + Разместить объявление
                </Link>
                {user.role === 'admin' && (
                  <button
                    onClick={() => router.push('/admin')}
                    className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Перейти в админ-панель
                  </button>
                )}
                <button
                  onClick={() => router.push('/')}
                  className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
                >
                  На главную
                </button>
                <button
                  onClick={async () => {
                    await logout();
                    router.push('/');
                  }}
                  className="w-full bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                  Выйти
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Мои объявления */}
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Мои объявления</h2>
            <Link
              href="/synergia-aggregator/housing/create"
              className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
            >
              + Добавить объявление
            </Link>
          </div>

          {listings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 mb-4">У вас пока нет объявлений</p>
              <Link
                href="/synergia-aggregator/housing/create"
                className="inline-block bg-purple-600 text-white px-6 py-3 rounded-lg hover:bg-purple-700 transition"
              >
                Разместить первое объявление
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.map((listing) => (
                <div key={listing.id} className="border rounded-lg overflow-hidden hover:shadow-lg transition">
                  {listing.mainImage && (
                    <img
                      src={listing.mainImage}
                      alt={listing.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">
                        {listing.title}
                      </h3>
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                        statusLabels[listing.status]?.color || statusLabels.pending.color
                      }`}>
                        {statusLabels[listing.status]?.text || listing.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">
                      {housingTypeLabels[listing.housingType] || listing.housingType} • {listing.district}
                    </p>
                    <p className="text-xl font-bold text-purple-600 mb-2">
                      {listing.price.toLocaleString()} ₽/{listing.pricePeriod === 'month' ? 'мес' : 'день'}
                    </p>
                    <div className="flex justify-between items-center text-sm text-gray-500 mb-3">
                      <span>Просмотров: {listing.views}</span>
                      <span>{new Date(listing.createdAt).toLocaleDateString('ru-RU')}</span>
                    </div>
                    <div className="flex gap-2">
                      <Link
                        href={`/synergia-aggregator/housing/${listing.id}`}
                        className="flex-1 text-center bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition"
                      >
                        Посмотреть
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

