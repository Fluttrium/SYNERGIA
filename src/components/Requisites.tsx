/* eslint-disable react/no-unescaped-entities */
export default function QrBlock() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full py-32">
      <div className="max-w-screen-lg mx-auto">
        <div className="bg-gray-100 p-6 rounded-lg shadow-md transform transition duration-300 hover:scale-105">
          <h2 className="text-xl font-bold mb-4">
            Реквизиты Некоммерческой организации
          </h2>
          <div className="border-b-2 border-gray-300 pb-4 mb-4">
            <p className="font-semibold">
              ФОНД РАЗВИТИЯ КУЛЬТУРНО-ДЕЛОВОГО СОТРУДНИЧЕСТВА ГОРОДОВ-ПОБРАТИМОВ
              САНКТ-ПЕТЕРБУРГА "СИНЕРГИЯ"
            </p>
            <p className="text-sm">Фонд "СИНЕРГИЯ"</p>
          </div>
          <p>
            <span className="font-semibold">ИНН:</span> 7811774946
          </p>
          <p>
            <span className="font-semibold">ОГРН:</span> 1227800053898
          </p>
          <p>
            <span className="font-semibold">КПП:</span> 781101001
          </p>
          <p>
            <span className="font-semibold">
              Юридический и фактический адрес:
            </span>{" "}
            192076, г Санкт-Петербург, вн.тер.г. Муниципальный Округ Рыбацкое,
            тер. Усть-Славянка, ул Славянская, д.3, помещ. 2-H
          </p>
          <p>
            <span className="font-semibold">Р/счет:</span> 4070381075500000653
          </p>
          <p>
            <span className="font-semibold">
              в ПАО Северо-Западный банк Сбербанка, г. Санкт-Петербург
            </span>
          </p>
          <p>
            <span className="font-semibold">К/счет:</span> 30101810500000000653
          </p>
          <p>
            <span className="font-semibold">БИК:</span> 044030653
          </p>
          <div className="border-t-2 border-gray-300 pt-4 mt-4">
            <p className="font-semibold">Контакты:</p>
            <p>Вся Россия: +7 (911) 109-09-79</p>
            <p>Санкт-Петербург: +7 (911) 109-09-79</p>
            <p>
              <span className="font-semibold">Электронная почта:</span>{" "}
              fond.synergy@mail.ru
            </p>
            <p>
              <span className="font-semibold">Президент Фонда «СИНЕРГИЯ»:</span>{" "}
              Харитонов Владислав Сергеевич
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
