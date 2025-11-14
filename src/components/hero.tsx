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
      // Убираем все контролы и настройки для автовоспроизведения
      video.controls = false;
      video.setAttribute('playsinline', 'true');
      video.setAttribute('webkit-playsinline', 'true');
      
      const handleCanPlay = async () => {
        setVideoLoaded(true);
        try {
          await video.play();
          // Убираем паузу, если видео было приостановлено
          if (video.paused) {
            video.play();
          }
        } catch (error: any) {
          console.error("Ошибка воспроизведения видео:", error);
          // Не устанавливаем ошибку, если это просто политика автовоспроизведения
          if (error.name !== 'NotAllowedError' && error.name !== 'NotSupportedError') {
            setVideoError(true);
          }
        }
      };

      const handleError = () => {
        console.error("Ошибка загрузки видео");
        setVideoError(true);
      };

      const handlePlay = () => {
        setVideoLoaded(true);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('canplaythrough', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('play', handlePlay);

      // Пытаемся загрузить и воспроизвести видео
      video.load();
      
      // Пытаемся воспроизвести после небольшой задержки
      setTimeout(() => {
        if (video.readyState >= 2) {
          video.play().catch(console.error);
        }
      }, 100);

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('canplaythrough', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('play', handlePlay);
      };
    }
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover blur-sm z-0 pointer-events-none"
          src="/spbvideo.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          disableRemotePlayback
          controls={false}
          onError={(e) => {
            console.error("Ошибка загрузки видео:", e);
            setVideoError(true);
          }}
          onLoadedData={() => {
            console.log("Видео загружено успешно");
            setVideoLoaded(true);
            if (videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
          }}
          onCanPlay={() => {
            setVideoLoaded(true);
            if (videoRef.current) {
              videoRef.current.play().catch(console.error);
            }
          }}
          onPlay={() => {
            setVideoLoaded(true);
          }}
        ></video>
      ) : (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0"></div>
      )}
      
      {/* Fallback градиент пока видео загружается */}
      {!videoLoaded && !videoError && (
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 z-0 animate-pulse"></div>
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
