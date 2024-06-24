import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { MenuItem } from "@/components/ui/header";
import { IconContext } from "react-icons";
import { IoIosArrowDown } from "react-icons/io";

interface Props {
  item: MenuItem;
  dropTitle: string;
}

export default function Dropdown({ item, dropTitle }: Props) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const menuItems = item?.children ? item.children : [];
  const dropdownRef = useRef<HTMLDivElement>(null);
  const hoverTimeoutRef = useRef<number | null>(null);

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
    }, 300); // Устанавливаем задержку перед закрытием (в миллисекундах)
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
        className={`text-lg focus:text-blue-400 flex flex-row items-center ${
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
      </div>
      {isOpen && (
        <div
          className="fixed top-0 bottom-0 left-0 z-20 bg-black/40"
          onClick={toggle}
        ></div>
      )}
    </div>
  );
}
