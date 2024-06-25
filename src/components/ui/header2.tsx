"use client";
import React, { useState } from "react";
import Offcanvas from "@/components/ui/Offcanvas";
import Dropdown from "./FondPages";
import Link from "next/link";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

import BurgerDropdown from "./dropdown/burger_drop";

export interface MenuItem {
  title: string;
  route?: string;
  children?: MenuItem[];
}

const menuItemsMig: MenuItem[] = [
  {
    title: "Products",
    children: [
      {
        title: "Буклеты",
        route: "/buklet",
      },
      {
        title: "Услуги в сфере миграции",
        route: "/migration",
      },
    ],
  },
];
const menuItemsPiter: MenuItem[] = [
  {
    title: "Products",
    children: [
      {
        title: "История",
        route: "/history",
      },
      {
        title: "Экономика Сaнкт-Петербурга",
        route: "/economics",
      },
      {
        title: "Услуги в сфере миграции",
        route: "/migration",
      },
      {
        title: "Культура Сaнкт-Петербурга",
        route: "/culture",
      },
      {
        title: "Символы",
        route: "/symbol",
      },
      {
        title: "Духовно-нравственные ценности",
        route: "/petersburgSoul",
      },
    ],
  },
];
const menuItemsAbout: MenuItem[] = [
  {
    title: "Products",
    children: [
      {
        title: "Цели и задачи",
        route: "/aim",
      },
      {
        title: "Новости",
        route: "/news",
      },
      {
        title: "Проекты",
        route: "/project",
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
const menuItemsForBurger: MenuItem[] = [
  {
    title: "Products",
    children: [
      {
        title: "История",
        route: "/history",
      },
      {
        title: "Цели и задачи",
        route: "/aim",
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
        title: "Реквизиты",
        route: "/requisites",
      },
      {
        title: "Отчеты",
        route: "/reports",
      },
      { title: "Города-побратимы", route: "/towns" },
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
    <header className="  fixed w-screen bg-slate-200/75  z-10 border-gray-200 px-4 lg:px-6 py-5 dark:bg-gray-800">
      <div className="flex  md:justify-start justify-between items-center mx-auto max-w-screen-xl">
        <div className="flex flex-row space-x-2  ">
          <Link className="hidden md:flex flex-col justify-items-end" href="/">
            <div className="flex  mb-[-10px] flex-row-reverse   ">
              <div className="  text-xl  right-0 text-right">ФОНД</div>
            </div>
            <div className="  text-3xl font-extrabold text-violet-600  ">
              СИНЕРГИЯ
            </div>
          </Link>
          <div className=" hidden md:flex w-1 bg-black  "></div>
          <div className=" flex items-center   ">
            <Link href={"/"}>
              <Image
                src="./atom_black.svg"
                alt="atom_black"
                width={40}
                height={40}
              />
            </Link>
          </div>
        </div>
        <div className="  hidden md:flex   items-center space-x-10 mx-10">
          <Link href="/towns" className="text-lg ">
            Города-побратимы
          </Link>

          {menuItemsMig.map((item) => {
            return item.hasOwnProperty("children") ? (
              <Dropdown
                item={item}
                dropTitle={"Услуги в сфере миграции"}
                showOffcanvas={false}
              />
            ) : (
              <Link className="hover:text-blue-500" href={item?.route || ""}>
                {item.title}
              </Link>
            );
          })}
          {menuItemsPiter.map((item) => {
            return item.hasOwnProperty("children") ? (
              <Dropdown
                item={item}
                dropTitle={"Санкт-Петербург"}
                showOffcanvas={false}
              />
            ) : (
              <Link className="hover:text-blue-500" href={item?.route || ""}>
                {item.title}
              </Link>
            );
          })}
          {menuItemsAbout.map((item) => {
            return item.hasOwnProperty("children") ? (
              <Dropdown item={item} dropTitle={"О нас"} showOffcanvas={true} />
            ) : (
              <Link className="hover:text-blue-500" href={item?.route || ""}>
                {item.title}
              </Link>
            );
          })}
        </div>

        {menuItemsForBurger.map((item) => {
          return item.hasOwnProperty("children") ? (
            <BurgerDropdown item={item} />
          ) : (
            <Link className="hover:text-blue-500" href={item?.route || ""}>
              {item.title}
            </Link>
          );
        })}
      </div>
      {isOpen && <Offcanvas onClose={closeOffcanvas} />}
    </header>
  );
};

export default Header;
