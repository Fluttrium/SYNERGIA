"use client";
import React, { useEffect, useState } from "react";

interface Buklet {
  id: number;
  name: string;
  images: string[];
  pdfs: string[];
}

export default function Page({ params }: { params: { languageCode: string } }) {
  const [buklet, setBuklet] = useState<Buklet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchBuklet() {
      try {
        const res = await fetch(
          `/api/buklets/getbukletbyid?id=${params.languageCode}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data: Buklet = await res.json();
        setBuklet(data);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    fetchBuklet();
  }, [params.languageCode]);

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

  if (!buklet) {
    return <div>Буклет не найден</div>;
  }

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center py-32">
          {buklet.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {buklet.images.map((imgSrc, index) => (
            <div key={index} className="space-y-6">
              <div className="arch bg-white p-4 shadow-lg">
                <img
                  src={`data:image/png;base64,${imgSrc}`}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                {buklet.pdfs[index] && (
                  <a
                    href={`data:application/pdf;base64,${buklet.pdfs[index]}`}
                    download={`buklet-${index + 1}.pdf`}
                    className="block mt-4 text-blue-500"
                  >
                    Скачать PDF
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
