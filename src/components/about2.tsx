"use client";
import React, { useEffect } from "react";
import "@/components/styles/About2.scss";

export default function About2() {
  const handleImageHover = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.add("hovered");
  };

  const handleImageLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.currentTarget as HTMLDivElement;
    target.classList.remove("hovered");
  };

  return (
    <section className="relative flex bg-white h-max z-1">
      <div className="grid gap-8 m-10">
        <div className="text-center w-full md:w-3/5 mx-auto space-y-9">
          <p className="text-3xl md:text-5xl font-bold">
            Фонд развития культурно-делового сотрудничества городов-побратимов
            Санкт&#8209;Петербурга СИНЕРГИЯ
          </p>
          <p className="text-xl ml-2 pt-5">
            Фонд развития культурно-делового сотрудничества городов-побратимов
            Санкт&#8209;Петербурга СИНЕРГИЯ (Фонд СИНЕРГИЯ) - является СО НКО
            России, учрежденной юридическими лицами и преследующая социальные
            общественно-полезные цели, главная цель - развитие международного,
            внешнеэкономического и межрегионального сотрудничества
            Санкт&#8209;Петербурга с зарубежными странами и субъектами РФ,
            укрепление межнационального согласия
          </p>
        </div>

        <div className="image-grid grid gap-8 md:flex md:flex-row">
          <div
            className="image-container"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <img
              className="rounded-lg large-image hover:scale-105"
              src="culture/Peterhof.jpeg"
              alt="Kazan Image"
              loading="lazy"
            />
          </div>

          <div
            className="image-container"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <img
              className="rounded-lg large-image hover:scale-105"
              src="culture/Kazan.jpeg"
              alt="Kazan Image"
              loading="lazy"
            />
          </div>

          <div
            className="image-container"
            onMouseEnter={handleImageHover}
            onMouseLeave={handleImageLeave}
          >
            <img
              className="rounded-lg large-image hover:scale-105"
              src="culture/hermitage.jpeg"
              alt="Kazan Image"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
