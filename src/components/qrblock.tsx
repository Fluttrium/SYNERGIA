"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

interface Buklet {
  id: number;
  name: string;
}

const QrBlock: React.FC = () => {
  const [buklets, setBuklets] = useState<Buklet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuklets = async () => {
      try {
        const res = await fetch("/api/buklets/getbuklets");
        if (!res.ok) {
          throw new Error(`Error: ${res.status}`);
        }
        const data = await res.json();
        setBuklets(data.buklets); // Присваиваем buklets из полученных данных
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBuklets();
  }, []);

  if (loading) {
    return (
      <section className="relative flex bg-white h-max z-1 w-full py-48">
        <div className="max-w-screen-lg mx-auto">
          <h2 className="text-4xl font-bold pb-10 text-center">
            Полезная информация для иностранных граждан
          </h2>
          <ul className="font-bold text-black h-12">
            <li className="hover:text-black transition duration-300 justify-center flex">
              <div className="block text-3xl h-12 bg-gray-200 p-2 rounded-md">
                Загрузка...
              </div>
            </li>
          </ul>
        </div>
      </section>
    );
  }

  if (error) {
    return <div>Ошибка: {error}</div>;
  }

  if (!Array.isArray(buklets) || buklets.length === 0) {
    return <div>Некорректные данные</div>;
  }

  return (
    <section className="relative flex bg-white h-max z-1 w-full py-48">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-4xl font-bold pb-10 text-center">
          Полезная информация для иностранных граждан
        </h2>
        <ul className="font-bold text-black">
          {buklets.map((buklet) => (
            <li
              key={buklet.id}
              className="hover:text-black transition duration-300"
            >
              <Link
                href={`/buklet/${buklet.id}`}
                className="block text-3xl hover:bg-gray-200 p-2 rounded-md"
              >
                {buklet.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default QrBlock;
