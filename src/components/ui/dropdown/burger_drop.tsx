import { GiHamburgerMenu } from "react-icons/gi";

import React, { useState } from "react";
import Link from "next/link";

import { MenuItem } from "@/components/ui/header";

import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import Offcanvas from "../Offcanvas";

interface Props {
  item: MenuItem;
}

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
        <button className="hover:text-blue-400 flex flex-row " onClick={toggle}>
          <IconContext.Provider
            value={{ className: "block md:hidden shared-class", size: "35" }}
          >
            <GiHamburgerMenu />
          </IconContext.Provider>
        </button>
        <div
          className={`absolute top-10 right-0 z-30 w-max h-max flex flex-col py-4 bg-slate-200/75 rounded-md ${transClass}`}
        >
          <button
            onClick={openOffcanvas}
            className="text-lg focus:outline-none px-4 py-1 text-left"
          >
            Контакты
          </button>
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
      {isOpenn && <Offcanvas onClose={closeOffcanvas} />}
    </>
  );
}
interface BurgerTextProps {
  text: string;
}
const BurgerDrop: React.FC<BurgerTextProps> = ({ text }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="flex flex-col rounded-md border-2 max-w-md py-5 px-5 relative">
      <button onClick={toggleExpand}>
        <IconContext.Provider
          value={{ className: "block md:hidden shared-class", size: "35" }}
        >
          <GiHamburgerMenu />
        </IconContext.Provider>
      </button>
      {expanded && (
        <div className="mt-2 inset-x-0 top-0">
          <p className="text-gray-700">{text}</p>
        </div>
      )}
    </div>
  );
};
