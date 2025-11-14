"use client";
import { useEffect, useState, useRef } from "react";

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [videoError, setVideoError] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
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

  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Убеждаемся, что видео начинает воспроизведение
    const video = videoRef.current;
    if (video) {
      const handleCanPlay = () => {
        setVideoLoaded(true);
        video.play().catch((error) => {
          console.error("Ошибка воспроизведения видео:", error);
          // Не устанавливаем ошибку, если это просто политика автовоспроизведения
          if (error.name !== 'NotAllowedError') {
            setVideoError(true);
          }
        });
      };

      const handleError = () => {
        console.error("Ошибка загрузки видео");
        setVideoError(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);

      // Пытаемся загрузить видео
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
      };
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover blur-sm z-0"
          src="/spbvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          onError={(e) => {
            console.error("Ошибка загрузки видео:", e);
            setVideoError(true);
          }}
          onLoadedData={() => {
            console.log("Видео загружено успешно");
            setVideoLoaded(true);
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
          }}
        ></video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0"></div>
      )}

      <div className="relative z-20 h-full flex items-center justify-center text-center text-white px-4 md:px-20">
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold basis-2/3 break-words hyphens-auto leading-relaxed">
          {typedText}
        </h1>
      </div>
    </section>
  );
};

export default Hero;
