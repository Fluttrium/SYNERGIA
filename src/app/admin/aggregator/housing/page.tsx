"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import toast from "react-hot-toast";

interface HousingListing {
  id: number;
  title: string;
  description: string;
  housingType: string;
  district: string;
  address: string | null;
  price: number;
  pricePeriod: string;
  status: string;
  isFeatured: boolean;
  views: number;
  createdAt: string;
  mainImage?: string;
}

const statusLabels: { [key: string]: { text: string; color: string } } = {
  pending: { text: "На модерации", color: "bg-yellow-100 text-yellow-800" },
  approved: { text: "Одобрено", color: "bg-green-100 text-green-800" },
  rejected: { text: "Отклонено", color: "bg-red-100 text-red-800" },
  archived: { text: "В архиве", color: "bg-gray-100 text-gray-800" },
};

const housingTypeLabels: { [key: string]: string } = {
  room: "Комната",
  apartment: "Квартира",
  hostel: "Хостел",
  dormitory: "Общежитие",
  hotel: "Гостиница",
  temporary: "Временное жилье",
};

export default function HousingModerationPage() {
  const [listings, setListings] = useState<HousingListing[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [housingTypeFilter, setHousingTypeFilter] = useState<string>("");
  const [districtFilter, setDistrictFilter] = useState<string>("");

  useEffect(() => {
    fetchListings();
  }, [statusFilter, housingTypeFilter, districtFilter]);

  const fetchListings = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (statusFilter) params.append("status", statusFilter);
      if (housingTypeFilter) params.append("housingType", housingTypeFilter);
      if (districtFilter) params.append("district", districtFilter);

      const response = await fetch(`/api/admin/aggregator/housing?${params.toString()}`, {
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to fetch listings");
      }

      const data = await response.json();
      console.log("Fetched listings:", data);
      setListings(data.listings || []);
    } catch (error) {
      console.error("Error fetching listings:", error);
      toast.error("Ошибка загрузки объявлений");
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: number, action: string) => {
    try {
      const response = await fetch(`/api/admin/aggregator/housing/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update status");
      }

      const result = await response.json();
      toast.success(result.message || "Статус обновлен");
      fetchListings();
    } catch (error) {
      console.error("Error updating status:", error);
      toast.error("Ошибка обновления статуса");
    }
  };

  const deleteListing = async (id: number) => {
    if (!confirm("Вы уверены, что хотите удалить это объявление?")) {
      return;
    }

    try {
      const response = await fetch(`/api/admin/aggregator/housing/${id}`, {
        method: "DELETE",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("Failed to delete listing");
      }

      toast.success("Объявление удалено");
      fetchListings();
    } catch (error) {
      console.error("Error deleting listing:", error);
      toast.error("Ошибка удаления объявления");
    }
  };

  const getUniqueValues = (key: keyof HousingListing) => {
    const values = new Set(listings.map((listing) => listing[key]));
    return Array.from(values).filter(Boolean) as string[];
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full p-8"
    >
      <section className="min-h-screen">
        <div className="mb-8">
          <h1 className="text-5xl lg:text-7xl font-bold text-gray-900 mb-2">
            Модерация объявлений о жилье
          </h1>
          <p className="text-lg text-gray-600">
            Управление объявлениями о жилье
          </p>
        </div>

        {/* Фильтры */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Фильтры</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Статус
              </label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Все статусы</option>
                <option value="pending">На модерации</option>
                <option value="approved">Одобрено</option>
                <option value="rejected">Отклонено</option>
                <option value="archived">В архиве</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Тип жилья
              </label>
              <select
                value={housingTypeFilter}
                onChange={(e) => setHousingTypeFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Все типы</option>
                {Object.entries(housingTypeLabels).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Район
              </label>
              <select
                value={districtFilter}
                onChange={(e) => setDistrictFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value="">Все районы</option>
                {getUniqueValues("district").map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Список объявлений */}
        {loading ? (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
          </div>
        ) : listings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">Объявлений не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="flex flex-col">
                  {/* Изображение */}
                  {listing.mainImage && (
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={listing.mainImage}
                        alt={listing.title}
                        className="w-full h-full object-cover"
                      />
                      {listing.isFeatured && (
                        <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 px-2 py-1 rounded text-xs font-bold">
                          ⭐ Выделено
                        </div>
                      )}
                    </div>
                  )}

                  {/* Контент */}
                  <CardContent className="p-6 flex-1 flex flex-col">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                        {listing.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                        {listing.description}
                      </p>

                      <div className="space-y-1 mb-4 text-sm text-gray-600">
                        <p>
                          <span className="font-semibold">Тип:</span>{" "}
                          {housingTypeLabels[listing.housingType] || listing.housingType}
                        </p>
                        <p>
                          <span className="font-semibold">Район:</span> {listing.district}
                        </p>
                        {listing.address && (
                          <p>
                            <span className="font-semibold">Адрес:</span> {listing.address}
                          </p>
                        )}
                        <p>
                          <span className="font-semibold">Цена:</span> {listing.price.toLocaleString()} ₽ / {listing.pricePeriod}
                        </p>
                        <p>
                          <span className="font-semibold">Просмотры:</span> {listing.views}
                        </p>
                      </div>

                      {/* Статус */}
                      <div className="mb-4">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            statusLabels[listing.status]?.color || "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {statusLabels[listing.status]?.text || listing.status}
                        </span>
                      </div>
                    </div>

                    {/* Кнопки действий */}
                    <div className="flex flex-wrap gap-2 mt-4">
                      {listing.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            onClick={() => updateStatus(listing.id, "approve")}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            ✅ Одобрить
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => updateStatus(listing.id, "reject")}
                          >
                            ❌ Отклонить
                          </Button>
                        </>
                      )}

                      {listing.status === "approved" && !listing.isFeatured && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(listing.id, "feature")}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          ⭐ Выделить
                        </Button>
                      )}

                      {listing.status === "approved" && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => updateStatus(listing.id, "archive")}
                        >
                          📦 В архив
                        </Button>
                      )}

                      {listing.status === "archived" && (
                        <Button
                          size="sm"
                          onClick={() => updateStatus(listing.id, "unarchive")}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          📤 Вернуть из архива
                        </Button>
                      )}

                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteListing(listing.id)}
                      >
                        🗑️ Удалить
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Статистика */}
        <div className="mt-6 text-sm text-gray-600">
          Найдено объявлений: {listings.length}
        </div>
      </section>
    </motion.div>
  );
}

