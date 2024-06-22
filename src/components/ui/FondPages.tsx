import React, { useState } from "react";
import Link from "next/link";

import { MenuItem } from "@/components/ui/header";

import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  item: MenuItem;
}

export default function Dropdown(props: Props) {
  const { item } = props;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];

  const toggle = () => {
    setIsOpen((old) => !old);
  };

  const transClass = isOpen ? "flex" : "hidden";

  return (
    <>
      <div className="relative flex items-center justify-center">
        <button
          className=" text-lg *:focus:text-blue-400 flex flex-row items-center "
          onClick={toggle}
        >
          О нас
          <IconContext.Provider
            value={{ className: "shared-class pl-1", size: "20" }}
          >
            <IoIosArrowDown />
          </IconContext.Provider>
        </button>
        <div
          className={`absolute top-16 z-30 w-max h-max flex flex-col py-4 bg-slate-200/75 rounded-md ${transClass}`}
        >
          {menuItems.map((item) => (
            <Link
              key={item.route}
              className="hover:text-blue-400 px-4 py-1"
              href={item?.route || ""}
              onClick={toggle}
            >
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      {isOpen ? (
        <div
          className="fixed top-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      ) : (
        <></>
      )}
    </>
  );
}
