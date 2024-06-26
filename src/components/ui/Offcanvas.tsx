"use client";
import React, { useState } from "react";
import "@/components/styles/Offcanvas.scss";
import { MdClose } from "react-icons/md";
import { FaVk } from "react-icons/fa";
import { IconContext } from "react-icons";

interface OffcanvasProps {
  onClose: () => void;
}

const Offcanvas: React.FC<OffcanvasProps> = ({ onClose }) => {
  return (
    <div className="offcanvas flex items-center z-50 ">
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
      <div className="px-12">
        <div className="col-12 flex flex-col justify-center items-center space-y-4">
          <p className="text-xl font-bold text-center">
            Контактная информация про организацию
          </p>
          <p className="text-base">Вся Россия: +7 (911) 109-09-79</p>
          <p className="text-base">Электронная почта: fond.synergy@mail.ru</p>
          <p className="text-base">Адрес: ул Славянская, дом 3</p>
          <h3 className="text-2xl font-semibold">Режим работы</h3>
          <p className="text-base">C 09:00 до 19:00 (Пн-Пт)</p>
          <p className="text-base">Выхоной (Сб-Вс)</p>
          <IconContext.Provider value={{ className: "vk-icon", size: "24" }}>
            <FaVk />
          </IconContext.Provider>
        </div>
      </div>
    </div>
  );
};

export default Offcanvas;
