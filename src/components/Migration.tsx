/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import React from "react";

export default function Migration() {
  return (
    <section className="relative bg-white h-max z-1 w-full py-32 flex justify-center">
      <div className="max-w-screen-lg px-4 sm:px-6 lg:px-8">
        {" "}
        {/* Добавлены классы для отступов на маленьких и средних экранах */}
        <h2 className="text-3xl font-bold pb-10 text-center">
          Государственные услуги в сфере миграции
        </h2>
        <p className="text-lg font-semibold text-slate-900 mb-4">
          В Санкт-Петербурге государственные услуги в сфере миграции оказывает
          Управление по вопросам миграции ГУ МВД России по г. Санкт-Петербургу и
          Ленинградской области.
        </p>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 list-outside md:list-inside">
          {services.map((service, index) => (
            <li key={index} className="flex justify-center">
              <div className="w-200 flex justify-center items-center">
                <Link
                  href={service.link}
                  className="block py-3 px-4 border border-gray-300 rounded-md transition-transform hover:scale-105 h-100 w-100 mb-5 text-center"
                  target="_blank" // Добавлен атрибут target="_blank"
                  rel="noopener noreferrer" // Добавлен атрибут rel="noopener noreferrer" для безопасности
                >
                  {service.title}
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

// Массив услуг
const services = [
  {
    title: "Оформление и выдача патентов",
    link: "https://78.мвд.рф/госуслуги/гувм/патент",
  },
  {
    title: "Выдача разрешения на временное проживание",
    link: "https://78.мвд.рф/госуслуги/гувм/разрешение-на-временное-проживание",
  },
  {
    title: "Выдача вида на жительство",
    link: "https://78.мвд.рф/госуслуги/гувм/вид-на-жительство",
  },
  {
    title: "Гражданство Российской Федерации",
    link: "https://78.мвд.рф/ms/гражданство-российской-федерации",
  },
  {
    title: "Участие в государственной программе переселения соотечественников",
    link: "https://78.мвд.рф/госуслуги/гувм/гп-переселения-соотечественников",
  },
  {
    title: "Предоставление статуса вынужденного переселенца",
    link: "https://78.мвд.рф/госуслуги/гувм/статус-вынужденного-переселенца",
  },
  {
    title: "Признание беженцем и предоставление временного убежища",
    link: "https://78.мвд.рф/госуслуги/гувм/признание-беженцем",
  },
  {
    title:
      "Оформление и выдача беженцу проездного документа, содержащего электронный носитель информации",
    link: "https://78.мвд.рф/госуслуги/гувм/проездной-документ-беженца",
  },
  {
    title:
      "Выдача разрешений на привлечение и использование иностранных работников, а также разрешений на работу иностранным гражданам и лицам без гражданства",
    link: "https://78.мвд.рф/госуслуги/гувм/разрешение-на-работу",
  },
  {
    title: "Предоставление адресно-справочной информа",
    link: "https://78.мвд.рф/госуслуги/гувм/адресно-справочной-информация",
  },
  {
    title: "Оформление виз для иностранных граждан",
    link: "https://78.мвд.рф/госуслуги/гувм/виза",
  },
  {
    title: "Оформление приглашений на въезд в Российскую Федерацию",
    link: "https://78.мвд.рф/госуслуги/гувм/приглашения-на-въезд",
  },
  {
    title: "Осуществление миграционного учета",
    link: "https://78.мвд.рф/госуслуги/гувм/миграционный-учет",
  },
];
