/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function QrBlock() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full">
      <div className="max-w-screen-lg mx-auto">
        <ul className="font-bold text-black">
          <li className="hover:text-black transition duration-300">
            <a href="/uzbek" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на русском языке
            </a>
          </li>
          <li className="hover:text-black transition duration-300">
            <a href="/kirgiz" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на киргизском языке (Кыргыз тили)
            </a>
          </li>
          <li className="hover:text-black transition duration-300">
            <a href="/tadjik" className="block text-3xl hover:bg-gray-200 p-2 rounded-md">
              Буклеты на таджикском языке (бо забони точики)
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
