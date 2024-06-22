"use client";
import { useEffect, useState } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const text =
    "Ф.онд развития культурно-делового сотрудничества городов побратимов Санкт-Петербурга СИНЕРГИЯ ";

  useEffect(() => {
    let currentIndex = 0; // создаем переменную для обозначения индекса символа в тексте
    const intervalId = setInterval(() => {
      setTypedText((prevText) => {
        if (currentIndex >= text.length) {
          clearInterval(intervalId);
          return prevText; // возвращаем текст
        }
        console.log("текущий текст:", prevText);
        console.log("текущий буква", text[currentIndex]);
        return prevText + text[currentIndex]; // добавляем букву с индексом
      });
      console.log("Current index:", currentIndex);
      currentIndex++; // увеличиваем индекс на 1
    }, 90); // задержка

    return () => clearInterval(intervalId);
  }, []);

  return (
    <section className="relative h-screen">
      <video
        className="fixed inset-0 w-full h-full object-cover blur-sm"
        src="/spbvideo.mp4"
        autoPlay
        muted
        loop
      ></video>

      <div className="fixed inset-0 flex items-center justify-center text-center text-white px-4 md:px-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold basis-2/3">
          {typedText}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
