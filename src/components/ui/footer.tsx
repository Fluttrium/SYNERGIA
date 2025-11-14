/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import Link from "next/link";
import "@/components/styles/Footer.scss";

export default function Footer() {
  return (
    <section className="relative bg-black text-white">
      <div className="container mx-auto px-4 py-8 md:grid md:grid-cols-3 md:gap-8">
        {/* Колонки для больших экранов */}
        <div className="hidden md:block col-span-1">
          <h2 className="text-3xl font-bold">СИНЕРГИЯ</h2>
          <p className="text-sm mt-2">
            Фонд развития культурно-делового сотрудничества городов-побратимов{" "}
            <span style={{ whiteSpace: "nowrap" }}>Санкт-Петербург</span>{" "}
            «СИНЕРГИЯ»
          </p>
        </div>
        {/* Одна колонка для маленьких экранов */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:col-span-2 md:pr-40 md:gap-8">
          <div className="footer-column flex flex-col items-center md:items-start gap-1">
            <p className="text-xl font-bold pb-2">Карта сайта</p>
            <Link href="/" className="text-sm cursor-pointer block mb-1">
              Главная
            </Link>
            <Link href="/news" className="text-sm cursor-pointer block mb-1">
              Новости
            </Link>
            <Link href="/towns" className="text-sm cursor-pointer block mb-1">
              Города-побратимы
            </Link>
          </div>
          <div className="footer-column flex flex-col items-center md:items-start gap-1">
            <p className="text-xl font-bold pb-2">Фонд</p>
            <Link href="/aim" className="text-sm cursor-pointer block mb-1">
              Цели и задачи
            </Link>
            <Link href="/reports" className="text-sm cursor-pointer block mb-1">
              Отчеты
            </Link>
            <Link href="/requisites" className="text-sm cursor-pointer block mb-1">
              Реквизиты
            </Link>
          </div>
          <div className="footer-column flex flex-col items-center md:items-start gap-1">
            <p className="text-xl font-bold pb-2">Информация</p>
            <Link href="/history" className="text-sm cursor-pointer block mb-1">
              История
            </Link>
            <Link href="/culture" className="text-sm cursor-pointer block mb-1">
              Культура
            </Link>
            <Link href="/economics" className="text-sm cursor-pointer block mb-1">
              Экономика
            </Link>
          </div>
        </div>

        <div className="md:hidden text-center col-span-1 mt-8">
          <h2 className="text-3xl font-bold">СИНЕРГИЯ</h2>
          <p className="text-sm mt-2">
            Фонд развития культурно-делового сотрудничества городов-побратимов{" "}
            <span style={{ whiteSpace: "nowrap" }}>Санкт-Петербург</span>{" "}
            «СИНЕРГИЯ»
          </p>
        </div>
      </div>

      <hr className="bg-white/50 h-0.5" />

      <div className="container mx-auto px-2 py-2 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">&copy; 2023 Фонд "СИНЕРГИЯ"</p>
        <p className="text-sm text-center">
          Все права на сайт защищены и охраняются <br />
          законодательством РФ
        </p>
        <div className="flex items-center">
          <p className="text-sm mr-2">Дизайн и разработка</p>
          <a
            href="http://fluttrium.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/logo/image-removebg-preview.png"
              alt="Logo"
              width={150}
              height={150}
            />
          </a>
        </div>
      </div>

      {/* Атом только для больших экранов */}
      <div className="hidden md:block image-container lg:absolute top-0 right-0 mt-8 lg:mt-4 mr-8 lg:mr-12 z-1">
        <Image
          src="./atom.svg"
          alt="atom"
          width={300}
          height={300}
          className="atom-image2 pulsate"
        />
      </div>
    </section>
  );
}
