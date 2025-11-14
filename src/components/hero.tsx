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

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Убираем все атрибуты контролов
    video.removeAttribute('controls');
    video.controls = false;
    
    // Скрываем overlay кнопку через CSS
    const hideOverlay = () => {
      const style = document.createElement('style');
      style.id = 'hide-video-overlay';
      style.textContent = `
        video::-webkit-media-controls-overlay-play-button {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          width: 0 !important;
          height: 0 !important;
        }
        video::-webkit-media-controls-overlay-enclosure {
          display: none !important;
          opacity: 0 !important;
          visibility: hidden !important;
        }
      `;
      if (!document.getElementById('hide-video-overlay')) {
        document.head.appendChild(style);
      }
    };
    
    hideOverlay();

    // Пытаемся запустить видео
    const tryPlay = async () => {
      try {
        await video.play();
      } catch (err) {
        console.warn("Автоплей заблокирован:", err);
      }
    };
    
    tryPlay();
  }, []);

  return (
    <section className="relative h-screen overflow-hidden">
      {!videoError ? (
        <>
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover blur-sm z-0"
            src="/spbvideo.mp4"
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
            disablePictureInPicture
            controls={false}
            style={{
              objectFit: "cover",
              pointerEvents: "none",
            }}
            onContextMenu={(e) => e.preventDefault()}
            onError={(e) => {
              console.error("Ошибка загрузки видео:", e);
              setVideoError(true);
            }}
            onLoadedData={() => {
              setVideoLoaded(true);
              videoRef.current?.play().catch(() => {});
            }}
            onCanPlay={() => {
              setVideoLoaded(true);
              videoRef.current?.play().catch(() => {});
            }}
            onPlay={() => {
              setVideoLoaded(true);
            }}
          />
        </>
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
