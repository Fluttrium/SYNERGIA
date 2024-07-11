"use client";

import Link from "next/link";

export default function AdminPanel() {
  return (
    <section className="relative bg-white h-max z-1 w-full md:flex justify-center py-48">
      <div className="column justify-center">
        <h2 className="text-3xl font-bold pb-10 text-center">
          Добро пожаловть в панель управления!
        </h2>
        <div className="flex justify-center">
          <button
            className="inline-flex justify-center items-center px-4 py-2 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
            style={{ width: "410px", height: "100px" }}
          >
            <Link href="/admin" passHref>
              <span className="text-3xl cursor-pointer">Новости</span>
            </Link>
          </button>
        </div>

        <div className="flex justify-center">
          <button
            className="inline-flex justify-center items-center px-4 py-2 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
            style={{ width: "410px", height: "100px" }}
          >
            <Link href="/admin/admin_project" passHref>
              <span className="text-3xl cursor-pointer">Проекты</span>
            </Link>
          </button>
        </div>
        <div className="flex justify-center">
          <button
            className="inline-flex justify-center items-center px-4 py-2 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
            style={{ width: "410px", height: "100px" }}
          >
            <Link href="/admin/admin_postBukletPage" passHref>
              <span className="text-3xl cursor-pointer">Буклеты</span>
            </Link>
          </button>
        </div>
      </div>
    </section>
  );
}
