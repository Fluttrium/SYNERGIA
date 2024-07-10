"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";

interface Lang {
  id: string;
  name: string;
  image: string[];
}

export default function Page({ params }: { params: { languageCode: string } }) {
  console.log(params.languageCode);
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
        setLangs(data[0]); // Поскольку data является массивом, возьмем первый элемент
      } catch (error) {
        console.error("Ошибка при загрузке проекта:", error);
      }
    }

    fetchProjects();
  }, [params.languageCode]);

  if (!langs) {
    return <div>Loading...</div>;
  }

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center py-32">
          {langs.name}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {langs.image.map((imgSrc, index) => (
            <div key={index} className="space-y-6">
              <div className="arch bg-white p-4 shadow-lg">
                <Image
                  src={imgSrc}
                  alt={`Image ${index + 1}`}
                  className="w-full h-full object-cover"
                  width={500}
                  height={500}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
