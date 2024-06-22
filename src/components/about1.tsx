/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import "@/components/styles/About1.scss";
import { useEffect } from "react";

export default function About1() {
  useEffect(() => {
    const images = document.querySelectorAll(
      ".image-container img"
    ) as NodeListOf<HTMLImageElement>;

    images.forEach((image: HTMLImageElement) => {
      image.classList.add("pulsate");
    });
  }, []);
  return (
    <section className="relative flex bg-white h-max z-1 py-10">
      <div className="container mx-auto flex flex-col space-y-7">
        <div className="text-center w-full md:w-3/5 mx-auto space-y-9">
          <p className="text-3xl md:text-5xl font-bold">
            Мы – То, Что Мы Делаем
          </p>
          <p className="text-base md:text-xl pb-10">
            Фонд СИНЕРГИЯ больше, чем превосходство группы над индивидами! Это
            проектная деятельность и сверхаддитивный эффект! Это раскрытые
            таланты, насыщенная жизнь, творчество, лидерство, социальная
            активность, международное сотрудничество! Это пространство, в
            котором живут все признаки команды: целеустремленность;
            коммуникация; планирование; совместная работа; синергия: 1+1=3
          </p>
        </div>
        <div className="flex flex-col md:flex-row md:space-x-20 space-y-10 md:space-y-0 items-center">
          <div className="grid text-center">
            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-center items-center bg-fuchsia-700 h-16 w-16 rounded-xl relative mx-auto">
                  <Image src="./planet.svg" alt="atom" width={32} height={34} />
                </div>
                <div className="w-16 h-16 bg-fuchsia-700/20 rotate-45 absolute inset-x-0 top-0 rounded-xl hover:rotate-12 transition-all duration-300 mx-auto"></div>
              </div>
              <p className="font-bold">
                Организует свою работу в тесном взаимодействии с органами
                исполнительной власти
              </p>
              <p className="text-gray-400">
                С государственными, общественными и коммерческими организациями
                РФ, а также с учреждениями и организациями стран ЕАЭС и стран
                БРИКС+
              </p>
            </div>
          </div>
          <div className="grid text-center">
            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-center items-center bg-fuchsia-700 h-16 w-16 rounded-xl relative mx-auto">
                  <Image src="./planet.svg" alt="atom" width={32} height={34} />
                </div>
                <div className="w-16 h-16 bg-fuchsia-700/20 rotate-45 absolute inset-x-0 top-0 rounded-xl hover:rotate-12 transition-all duration-300 mx-auto"></div>
              </div>
              <p className="font-bold">
                Организация культурных мероприятий и фестивалей для
                популяризации культурных ценностей
              </p>
              <p className="text-gray-400">
                Поддержка научных и научно-образовательных проектов для
                повышения инновационного потенциала города
              </p>
            </div>
          </div>
          <div className="grid text-center">
            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-center items-center bg-fuchsia-700 h-16 w-16 rounded-xl relative mx-auto">
                  <Image src="./planet.svg" alt="atom" width={32} height={34} />
                </div>
                <div className="w-16 h-16 bg-fuchsia-700/20 rotate-45 absolute inset-x-0 top-0 rounded-xl hover:rotate-12 transition-all duration-300 mx-auto"></div>
              </div>
              <p className="font-bold">
                Помощь пострадавшим от стихийных бедствий и кризисных ситуаций
              </p>
              <p className="text-gray-400">
                Реализация социальных программ и мероприятий для поддержки
                различных категорий граждан
              </p>
            </div>
          </div>
          <div className="grid text-center">
            <div className="space-y-4">
              <div className="relative">
                <div className="flex justify-center items-center bg-fuchsia-700 h-16 w-16 rounded-xl relative mx-auto">
                  <Image src="./planet.svg" alt="atom" width={32} height={34} />
                </div>
                <div className="w-16 h-16 bg-fuchsia-700/20 rotate-45 absolute inset-x-0 top-0 rounded-xl hover:rotate-12 transition-all duration-300 mx-auto"></div>
              </div>
              <p className="font-bold">
                Проведение мероприятий и кампаний для укрепления позитивного
                восприятия Санкт-Петербурга как города культуры, науки и
                инноваций
              </p>
              <p className="text-gray-400">
                Активное участие в международных процессах и мероприятиях для
                повышения привлекательности города для жителей и инвесторов
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block lg:absolute top-0 right-0 mt-8 lg:mt-12 mr-8 lg:mr-12 z-1">
          <Image
            src="./atom.svg"
            alt="atom"
            width={250}
            height={250}
            className="atom-image pulsate"
          />
        </div>
      </div>
    </section>
  );
}
