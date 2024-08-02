/* eslint-disable react/no-unescaped-entities */
import Input from "./ui/inputs/forminput";
import "@/components/styles/Form.scss";

export default function Table() {
  return (
    <div className="flex justify-center items-center min-h-screen p-2 md:p-4">
      <div className="overflow-x-auto w-full sm:w-11/12 md:w-3/4">
        <div className="shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs sm:text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  Флаг
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs sm:text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  Страна
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs sm:text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  Город-побратим
                </th>
                <th
                  scope="col"
                  className="px-2 py-2 text-left text-xs sm:text-sm md:text-xs font-medium text-gray-500 uppercase tracking-wider border-b border-gray-200"
                >
                  Год установления связи
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200">
                <img
                  src="flags/Flag_of_Jordan.svg"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Иордания
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Акаба
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2003
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Egypt.webp"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Египет
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Александрия
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2005
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Kazakhstan.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Казахстан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Алма-Ата
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1996
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Belgium_(civil).svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Бельгия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Антверпен
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1958
              </td>
            </tr>
            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Kazakhstan.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Казахстан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Нур-Султан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2008
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Azerbaijan.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Азербайджан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Баку
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1998
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Thailand.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Таиланд
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Бангкок
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Spain.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Испания
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Барселона
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1984
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_France.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Франция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Бордо
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1991
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Argentina.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Аргентина
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Буэнос-Айрес
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2010
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Poland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Польша
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Варшава
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Italy.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Италия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Венеция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2006
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Palestine.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Палестинская национальная администрация
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Вифлеем
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2003
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Russia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Россия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Воркута
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1942
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Cuba.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Республика Куба
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Гавана
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2000
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_France.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Франция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Гавр
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1965
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Germany.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Германия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Гамбург
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1957
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Poland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Польша
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Гданьск
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1961
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Italy.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Италия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Генуя
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Sweden.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Швеция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Гётеборг
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1962
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Austria.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Австрия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Грац
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2001
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Latvia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Латвия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Даугавпилс
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1965
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Germany.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Германия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Дрезден
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1961
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Tajikistan.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Таджикистан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Душанбе
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1991
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Armenia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Армения
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Ереван
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Croatia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хорватия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Загреб
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1968
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Иматра (как регион Южная Карелия)
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2007
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Iran.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Иран
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Исфахан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1999
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_South_Africa.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                ЮАР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Йоханнесбург
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2009
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Lithuania.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Литва
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Каунас{" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2007
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Canada.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Канада
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Квебек
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_South_Africa.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                ЮАР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Кейптаун
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2001
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Canada.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Канада
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Квебек
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Sri_Lanka.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Шри-Ланка
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Коломбо
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1968
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Romania.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Румыния
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Констанца
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2007
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Котка
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Slovakia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Словакия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Кошице
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1995
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Poland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Польша
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Краков
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2006
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Лаппеенранта (как регион Южная Карелия){" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2007
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_France.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Франция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Лион
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1993
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_United_States.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                США
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Лос-Анджелес
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1990
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_the_United_Kingdom.webp"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Великобритания
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Манчестер
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1962
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Argentina.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Аргентина
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Мар-дель-Плата
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2009
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Slovenia.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Словения
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Марибор
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2001{" "}
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Australia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Австралия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Мельбурн{" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1989
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Миккели
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1996
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Belarus.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Белоруссия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Минск
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2000
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Uruguay.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Уругвай
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Монтевидео{" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1998
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_India.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Индия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Мумбаи
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1963
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Russia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Россия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Нижний Новгород
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2016
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_France.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Франция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Ницца
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Russia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Россия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Омск
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1943
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Denmark.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Дания
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Орхус
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1989
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Japan_(geometric).png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Япония
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Осака
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1979
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Kyrgyzstan_(1992-2023).png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Киргизия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Ош
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2004
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_France.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Франция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Париж(Город-Партнер)
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1991
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_People's_Republic_of_China.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                КНР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Пекин
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2009
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Russia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Россия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Туапсе
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1998
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Greece.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Греция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Пирей
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1965
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Bulgaria.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Болгария
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Пловдив
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1980
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_South_Korea.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Республика Корея
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Пусан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2008
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/720px-Flag_of_Brazil.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Бразилия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Рио-де-Жанейро
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1986
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Latvia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Латвия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Рига
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_the_Netherlands.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Нидерланды
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Роттердам
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1966
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Greece.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Греция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Салоники
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_United_States.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                США
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Сент-Питерсберг
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Cuba.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Республика Куба
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Сантьяго-де-Куба
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1974
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Russia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Россия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Севастополь
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2000
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Norway.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Норвегия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Ставангер
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2008
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Turkey.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Турция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Стамбул
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1990
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Sweden.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Швеция
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Стокгольм
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1992
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Estonia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Эстония
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Таллин
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1999
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Тампере
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1993
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Estonia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Эстония
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Тарту
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2006
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_Georgia.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Грузия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Тбилиси
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1999
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Турку{" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1953
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_South_Korea.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Республика Корея{" "}
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Тэгу
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1997
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/660px-Flag_of_Israel.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Израиль
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хайфа
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2008
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Vietnam.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Вьетнам
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хайфон
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2006
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Sudan.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Судан
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хартум
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2002
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Finland.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Финляндия
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хельсинки
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1993
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_Vietnam.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Вьетнам
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Хошимин
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1977
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_United_States.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                США
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Чикаго
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1992
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_People's_Republic_of_China.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                КНР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Чэнду
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1998
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_People's_Republic_of_China.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                КНР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Циндао
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                2007
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/Flag_of_the_People's_Republic_of_China.svg.png"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                КНР
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Шанхай
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1988
              </td>
            </tr>

            <tr>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                <img
                  src="flags/800px-Flag_of_the_United_Kingdom.webp"
                  alt="Флаг страны 1"
                  className="w-8 h-auto"
                />
              </td>
              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Великобритания
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                Эдинбург
              </td>

              <td className="px-2 py-2 whitespace-nowrap border-b border-gray-200 text-xs sm:text-sm md:text-base">
                1995
              </td>
            </tr>

            {/* Добавьте остальные строки */}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
}
