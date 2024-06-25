import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { IconContext } from "react-icons";
import { MdClose } from "react-icons/md";

export interface OffcanvasMobileItem {
  title: string;
  route?: string;
  children?: OffcanvasMobileItem[];
}

interface OffcanvasProps {
  onClose: () => void;
  menuItems: OffcanvasMobileItem[];
}

const OffcanvasDrop: React.FC<{
  item: OffcanvasMobileItem;
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}> = ({ item, isOpen, onToggle, onClose }) => {
  const dropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropRef.current && !dropRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);

  return (
    <div className="relative inline-block" ref={dropRef}>
      <button
        type="button"
        className="px-4 py-2 text-white focus:outline-none font-medium rounded-lg text-sm inline-flex items-center"
        onClick={onToggle}
      >
        {item.title}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {isOpen && item.children && (
        <div className="absolute mt-2 w-44 bg-white rounded-lg shadow-lg z-50">
          <ul
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="options-menu"
            className="py-1"
          >
            {item.children.map((child, index) => (
              <li key={index}>
                <Link
                  className="block px-2 justify-start py-2 text-sm text-gray-700 hover:bg-gray-100"
                  href={child.route || "#"}
                  passHref
                  onClick={onClose}
                >
                  {child.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const OffcanvasMobile: React.FC<OffcanvasProps> = ({ onClose, menuItems }) => {
  const [openDrop, setOpenDrop] = useState<number | null>(null);

  const handleToggle = (index: number) => {
    setOpenDrop(openDrop === index ? null : index);
  };

  return (
    <div className="offcanvas items-start z-40">
      <div className="absolute top-0">
        <button
          type="button"
          className="text-white mx-3 my-3"
          onClick={onClose}
        >
          <IconContext.Provider
            value={{ className: "shared-class", size: "35" }}
          >
            <MdClose />
          </IconContext.Provider>
        </button>
      </div>
      <div className="flex my-14 justify-start">
        <div className="space-y-5 basis-1/3">
          {menuItems.map((item, index) =>
            item.children ? (
              <OffcanvasDrop
                key={index}
                item={item}
                isOpen={openDrop === index}
                onToggle={() => handleToggle(index)}
                onClose={() => setOpenDrop(null)}
              />
            ) : (
              <Link
                onClick={onClose}
                className="px-4 py-2 text-white hover:text-blue-400 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm inline-flex items-center"
                key={index}
                href={item.route || "#"}
                passHref
              >
                {item.title}
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default OffcanvasMobile;
