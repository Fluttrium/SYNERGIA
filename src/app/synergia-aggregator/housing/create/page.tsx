"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

export default function CreateHousingListing() {
  const router = useRouter();
  const { user, loading: authLoading, checkAuth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);

  // Проверяем авторизацию только один раз при монтировании
  useEffect(() => {
    // checkAuth уже вызывается в AuthProvider при монтировании
    // Дополнительный вызов не нужен, если только не требуется обновление
  }, []); // Пустой массив зависимостей - выполняется только один раз

  // Если не авторизован - редирект (только после завершения загрузки)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push('/login?redirect=/synergia-aggregator/housing/create');
    }
  }, [user, authLoading, router]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setImages(files);
    
    // Создаем превью
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (!user) {
      router.push('/login?redirect=/synergia-aggregator/housing/create');
      return;
    }

    setLoading(true);

    const formData = new FormData(e.currentTarget);
    images.forEach((img) => formData.append("images", img));

    try {
      const response = await fetch('/api/aggregator/housing', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        router.push(`/synergia-aggregator/housing/${data.listingId}`);
      } else {
        const error = await response.json();
        alert(error.error || 'Ошибка при создании объявления');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Ошибка при создании объявления');
    } finally {
      setLoading(false);
    }
  };

  // Показываем загрузку, пока проверяется авторизация
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  // Если не авторизован, показываем загрузку (редирект уже в процессе)
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mb-4"></div>
          <p className="text-gray-600">Перенаправление на страницу входа...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link 
          href="/synergia-aggregator/housing"
          className="text-purple-600 hover:text-purple-800 mb-4 inline-block"
        >
          ← Назад к объявлениям
        </Link>

        <h1 className="text-3xl font-bold mb-8">Разместить объявление</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-lg p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Заголовок объявления *
            </label>
            <input 
              name="title" 
              required 
              placeholder="Например: Уютная комната в центре"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Описание *
            </label>
            <textarea 
              name="description" 
              required 
              rows={5}
              placeholder="Опишите ваше жилье подробно..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Тип жилья *
              </label>
              <select 
                name="housingType" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Выберите тип</option>
                <option value="room">Комната</option>
                <option value="apartment">Квартира</option>
                <option value="hostel">Хостел</option>
                <option value="dormitory">Общежитие</option>
                <option value="hotel">Гостиница</option>
                <option value="temporary">Временное жилье</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Район *
              </label>
              <select 
                name="district" 
                required 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Выберите район</option>
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
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Адрес
            </label>
            <input 
              name="address" 
              placeholder="Улица, дом, квартира"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Цена (₽) *
              </label>
              <input 
                name="price" 
                type="number" 
                required 
                min="0"
                placeholder="25000"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Период оплаты
              </label>
              <select 
                name="pricePeriod" 
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="month">В месяц</option>
                <option value="day">В день</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Количество комнат
              </label>
              <input 
                name="rooms" 
                type="number" 
                min="0"
                placeholder="1"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Площадь (м²)
              </label>
              <input 
                name="area" 
                type="number" 
                step="0.1"
                min="0"
                placeholder="25"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Этаж
              </label>
              <input 
                name="floor" 
                type="number" 
                min="0"
                placeholder="3"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Всего этажей в доме
            </label>
            <input 
              name="totalFloors" 
              type="number" 
              min="0"
              placeholder="5"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Фотографии (до 10 штук)
            </label>
            <input 
              type="file" 
              multiple 
              accept="image/*"
              onChange={handleImageChange}
              max={10}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
            {imagePreviews.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                {imagePreviews.map((preview, index) => (
                  <div key={index} className="relative">
                    <img 
                      src={preview} 
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Контактный телефон *
            </label>
            <input 
              name="contactPhone" 
              required 
              type="tel"
              placeholder="+7 (999) 123-45-67"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Email
            </label>
            <input 
              name="contactEmail" 
              type="email" 
              placeholder="example@mail.com"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Telegram (опционально)
            </label>
            <input 
              name="contactTelegram" 
              placeholder="@username"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            />
          </div>

          <input type="hidden" name="amenities" value="[]" />

          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className="text-sm text-yellow-800">
              <strong>Важно:</strong> Ваше объявление будет проверено модератором перед публикацией. 
              Обычно это занимает несколько часов.
            </p>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Создание...' : 'Разместить объявление'}
          </button>
        </form>
      </div>
    </div>
  );
}

