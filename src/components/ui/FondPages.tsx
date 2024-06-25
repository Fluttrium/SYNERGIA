import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuItem } from "@/components/ui/header";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";
import Offcanvas from "./Offcanvas";

interface Props {
  item: MenuItem;
  dropTitle: string;
  showOffcanvas: boolean;
}

export default function Dropdown({ item, dropTitle, showOffcanvas }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

  const [isOpenn, setIsOpenn] = useState(false);

  const openOffcanvas = () => {
    setIsOpenn(!isOpenn);
  };

  const closeOffcanvas = () => {
    setIsOpenn(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    setIsOpen(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = window.setTimeout(() => {
      setIsOpen(false);
    }, 100); // Устанавливаем задержку перед закрытием (в миллисекундах)
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  const transClass = isOpen ? "flex" : "hidden";

  return (
    <div
      className="relative flex items-center justify-center"
      ref={dropdownRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button
        className={`text-lg  flex flex-row items-center ${
          isOpen ? "text-blue-400" : ""
        }`}
        onClick={toggle}
      >
        {dropTitle}
      </button>
      <div
        className={`absolute top-16 z-30 w-max h-max flex flex-col py-4 bg-slate-200/75 rounded-md ${transClass}`}
      >
        {menuItems.map((childItem) => (
          <Link
            className="hover:text-blue-400 px-4 py-1"
            onClick={toggle}
            key={childItem.route}
            href={childItem.route || ""}
          >
            {childItem.title}
          </Link>
        ))}
        {showOffcanvas ? (
          <button
            onClick={openOffcanvas}
            className="text-lg  px-4 py-1 text-left hover:text-blue-400"
          >
            Контакты
          </button>
        ) : (
          <></>
        )}
      </div>
      {isOpen}
      {isOpenn ? <Offcanvas onClose={closeOffcanvas} /> : <></>}
    </div>
  );
}
