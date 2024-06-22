"use client";
import React, { useState } from "react";
import Offcanvas from "@/components/ui/Offcanvas";
import Dropdown from "./FondPages";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

const menuItems: MenuItem[] = [
  {
    title: "Products",
    children: [
      {
        title: "История",
        route: "/history",
      },
      {
        title: "Цели и задачи",
        route: "aim",
      },
      {
        title: "Новости",
        route: "/news",
      },
      {
        title: "Услуги в сфере миграции",
        route: "/migration",
      },
      {
        title: "Экономика Сaнкт-Петербурга",
        route: "/economics",
      },
      {
        title: "Культура Сaнкт-Петербурга",
        route: "/culture",
      },
      {
        title: "Духовно-нравственные ценности",
        route: "/petersburgSoul",
      },
      {
        title: "Реквизиты",
        route: "/requisites",
      },
      {
        title: "Отчеты",
        route: "/reports",
      },
    ],
  },
];
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openOffcanvas = () => {
    setIsOpen(!isOpen);
  };

  const closeOffcanvas = () => {
    setIsOpen(false);
  };

  return (
    <header className="bg-slate-200/75 h-20 z-10 fixed top-0 w-full">
      <nav className="mx-auto flex max-w-7xl justify-center p-2 px-8">
        <div className=""></div>
        <div className="flex gap-x-12 items-end">
          <a href="/(default)" className="text-sm">
            Главная
          </a>
          <a href="/history" className="text-sm">
            O нас
          </a>
          <a href="/news" className="text-sm">
            Новости
          </a>
          <p className="text-4xl font-bold text-violet-600 ">СИНЕРГИЯ</p>

          <a href="/towns" className="text-sm ">
            Города-побратимы
          </a>
          <div className="flex gap-x-12 items-end">
            <button
              onClick={openOffcanvas}
              className="text-sm focus:outline-none"
            >
              Контакты
            </button>
          </div>
          <div className="flex gap-8 items-center text-sm justify-center">
            {menuItems.map((item) => {
              return item.hasOwnProperty("children") ? (
                <Dropdown item={item} />
              ) : (
                <Link className="hover:text-blue-500" href={item?.route || ""}>
                  {item.title}
                </Link>
              );
            })}
          </div>
        </div>
      </nav>

      {isOpen && <Offcanvas onClose={closeOffcanvas} />}
    </header>
  );
};

export default Header;
