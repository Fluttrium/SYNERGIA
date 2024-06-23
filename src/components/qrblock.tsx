/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function QrBlock() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full py-48">
      <div className="max-w-screen-lg mx-auto">
      <h2 className="text-4xl font-bold pb-10 text-center">Полезная информация для иностранных граждан</h2>
        <ul className="font-bold text-black">
          <li className="hover:text-black transition duration-300">
            <a href="/rus" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на русском языке
            </a>
          </li>
          <li className="hover:text-black transition duration-300">
            <a href="/kirgiz" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на киргизском языке (Кыргыз тили)
            </a>
          </li>
          <li className="hover:text-black transition duration-300">
            <a href="/uzbek" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на узбекском языке (o'zbek tilida)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
