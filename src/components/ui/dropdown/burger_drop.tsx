import { GiHamburgerMenu } from "react-icons/gi";

import React, { useState } from "react";
import Link from "next/link";

import { MenuItem } from "@/components/ui/header2";

import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import OffcanvasMobile, { OffcanvasMobileItem } from "../mobileoffcanvas";

interface Props {
  item: MenuItem;
}
const menuItemsAbout: OffcanvasMobileItem[] = [
  {
    title: "Города-побратимы",
    route: "/towns",
  },
  {
    title: "Услуги",
    children: [
      {
        title: "Буклеты",
        route: "/buklet",
      },
      {
        title: "Услуги в свере миграции",
        route: "/migration",
      },
    ],
  },
  {
    title: "Санкт\u2011Петербург",
    children: [
      {
        title: "История",
        route: "/history",
      },
      {
        title: "Экономика Санкт\u2011Петербурга",
        route: "/economics",
      },
      {
        title: "Услуги в сфере миграции",
        route: "/migration",
      },
      {
        title: "Культура Санкт\u2011Петербурга",
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
  {
    title: "O нас",
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
        route: "/news",
      },
      {
        title: "Реквизиты",
        route: "/requisites",
      },
    ],
  },
];

export default function BurgerDropdown(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const [isOpenn, setIsOpenn] = useState(false);

  const openOffcanvas = () => {
    setIsOpenn(!isOpenn);
  };

  const closeOffcanvas = () => {
    setIsOpenn(false);
  };
  const transClass = isOpen ? "flex" : "hidden";

  return (
    <>
      <div className="relative flex items-center justify-center">
        <button
          className="hover:text-blue-400 flex flex-row "
          onClick={openOffcanvas}
        >
          <IconContext.Provider
            value={{ className: "block md:hidden shared-class", size: "35" }}
          >
            <GiHamburgerMenu />
          </IconContext.Provider>
        </button>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
      {isOpenn && (
        <OffcanvasMobile onClose={closeOffcanvas} menuItems={menuItemsAbout} />
      )}
    </>
  );
}
