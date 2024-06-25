/* eslint-disable react/no-unescaped-entities */
import "@/components/styles/Aim.scss";
export default function Aim() {
  return (
    <section className="relative bg-white h-max z-1 w-full md:flex justify-center">
      <div className="md:py-32 flex justify-center">
        <div className="max-w-screen-lg ">
          <h2 className="text-3xl font-bold mb-6 md:mb-8 text-center md:text-left mt-20 mx-4">
            Основные направления Фонда
          </h2>
          <ul className="list-disc pl-6 mb-8 ml-6">
            <li className="mb-4">
              <span className="text-xl font-semibold">
                Международное сотрудничество и привлечение инвестиций:
              </span>
              <p className="text-lg mt-2">
                Установление партнерских отношений с зарубежными странами и
                субъектами Российской Федерации. Продвижение экономического
                потенциала Санкт-Петербурга на международном уровне. Привлечение
                инвестиций в экономику города.
              </p>
            </li>
            <li className="mb-4">
              <span className="text-xl font-semibold">
                Культурные и образовательные инициативы:
              </span>
              <p className="text-lg mt-2">
                Организация культурных мероприятий и фестивалей для
                популяризации культурных ценностей. Поддержка научных и
                научно-образовательных проектов для повышения инновационного
                потенциала города.
              </p>
            </li>
            <li className="mb-4">
              <span className="text-xl font-semibold">
                Социальная поддержка и развитие:
              </span>
              <p className="text-lg mt-2">
                Помощь пострадавшим от стихийных бедствий и кризисных ситуаций.
                Реализация социальных программ и мероприятий для поддержки
                различных категорий граждан.
              </p>
            </li>
            <li className="mb-4">
              <span className="text-xl font-semibold">
                Взаимодействие и обмен опытом:
              </span>
              <p className="text-lg mt-2">
                Организация обменов и деловых встреч с представителями других
                городов и международных организаций. Содействие в установлении
                новых партнерских связей и развитии существующих контактов.
              </p>
            </li>
            <li className="mb-4">
              <span className="text-xl font-semibold">
                Продвижение имиджа города:
              </span>
              <p className="text-lg mt-2">
                Проведение мероприятий и кампаний для укрепления позитивного
                восприятия Санкт-Петербурга как города культуры, науки и
                инноваций. Активное участие в международных процессах и
                мероприятиях для повышения привлекательности города для жителей
                и инвесторов.
              </p>
            </li>
          </ul>
          <a
            href="Ustav.pdf"
            download
            className="inline-block bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded text-center md:text-left mb-8 ml-6"
          >
            Устав Фонда СИНЕРГИЯ
          </a>
        </div>
      </div>
    </section>
  );
}
