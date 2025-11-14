"use client";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const currentIndexRef = useRef(0);
  const text =
    "Фонд развития культурно-делового сотрудничества городов-побратимов Санкт-Петербурга СИНЕРГИЯ ";

  useEffect(() => {
    currentIndexRef.current = 0;
    setTypedText("");

    const intervalId = setInterval(() => {
      if (currentIndexRef.current >= text.length) {
        clearInterval(intervalId);
        return;
      }

      const currentChar = text[currentIndexRef.current];
      setTypedText((prevText) => prevText + currentChar);
      currentIndexRef.current++;
    }, 90);

    return () => clearInterval(intervalId);
  }, [text]);

  return (
    <section className="relative h-screen overflow-hidden">
      <video
        className="absolute inset-0 w-full h-full object-cover blur-sm z-0"
        src="/spbvideo.mp4"
        autoPlay
        muted
        loop
      ></video>

      <div className="relative z-20 h-full flex items-center justify-center text-center text-white px-4 md:px-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold basis-2/3 break-words hyphens-auto leading-relaxed">
          {typedText}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
