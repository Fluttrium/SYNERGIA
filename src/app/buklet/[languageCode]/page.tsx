"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Lang {
  id: string;
  name: string;
  images: string[];
  pdfs: string[];
}

export default function Page({ params }: { params: { languageCode: string } }) {
  const [langs, setLangs] = useState<Lang | null>(null);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `/api/data/getBukletPage?language=${params.languageCode}`
        );
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setLangs(data[0]);
      } catch (error) {
        console.error("Ошибка при загрузке проекта:", error);
      }
    }

    fetchProjects();
  }, [params.languageCode]);

  if (!langs) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
        <div className="w-screen py-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ">
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

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center py-32">
          {langs.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {langs.images.map((imgSrc, index) => (
            <div key={index} className="space-y-6">
              <div className="arch bg-white p-4 shadow-lg">
                <a href={langs.pdfs[index]} download>
                  <Image
                    src={imgSrc}
                    alt={`Image ${index + 1}`}
                    className="w-full h-full object-cover"
                    width={500}
                    height={500}
                  />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
