"use client";
import ExpandableText from "./ui/dropdown/dropdown";

const items = [
  { label: "Option 1", onClick: () => console.log("Option 1 clicked") },
  { label: "Option 2", onClick: () => console.log("Option 2 clicked") },
  { label: "Option 3", onClick: () => console.log("Option 3 clicked") },
];

const Faq: React.FC = () => {
  return (
    <section className="relative flex bg-white h-max z-1 w-screen justify-center">
      <div className="flex flex-col md:flex-row md:space-x-5 py-10">
        <div className="flex flex-col mx-6 space-y-10">
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"Синергия представляет собой принцип, согласно которому совместные усилия и взаимодействие могут приводить к более значительным результатам, чем сумма индивидуальных вкладов. Этот принцип применим в различных областях, от бизнеса и медицины до экологии и науки, и подчеркивает важность сотрудничества и интеграции различных элементов для достижения оптимальных результатов"}
              title={"Что значит Синергия?"}
            />
          </div>
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"Учредителями Фонда являются: Общество с ограниченной ответственностью 'Торговый Дом Городов Побратимов СПБ' и Товарищество 'Деловой союз Евразии в Латвии'"}
              title={"Сколько организаций в нашем фонде?"}
            />
          </div>
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"В рамках конференции был достигнут целый ряд договоренностей по развитию дальнейшего сотрудничества и реализации совместных проектов, а также составлен проект резолюции о создании ежегодного фестиваля"}
              title={"Конференция городов-побратимов"}
            />
          </div>
        </div>
        <div className="flex flex-col mx-6 space-y-10 mt-10 md:mt-0">
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"Открытие ежегодного фестиваля является уникальной возможностью для создания новой платформы по обмену опытом и знаниями между участниками фестиваля, что способствует привлечению в регион культурного, технического и экономического опыта, повышению международного имиджа Санкт-Петербурга, а также привлечению инвестиций в местную экономику"}
              title={"Ярмарка Дары Востока"}
            />
          </div>
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"На нашем сайте вы можете найти буклеты и информацию для иностранных граждан"}
              title={"Информация для иностранных граждан"}
            />
          </div>
          <div className="border-2 p-4 rounded-lg">
            <ExpandableText
              text={"Развитие международного,внешнеэкономического и межрегионального сотрудничества Санкт-Петербурга с зарубежными странами и субъектами Российской Федерации, укрепление межнационального согласия"}
              title={"Проектная деятельность фонд СИНЕРГИЯ"}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Faq;
