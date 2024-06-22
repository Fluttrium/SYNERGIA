/* eslint-disable react/no-unescaped-entities */
export default function Reports() {
  return (
    <section className="relative flex bg-white h-max z-1 w-full py-48 mb-60">
      <div className="max-w-screen-lg mx-auto">
        <h2 className="text-3xl font-bold pb-10 text-center">
          ОТЧЕТЫ ФОНДА "СИНЕРГИЯ"
        </h2>
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          <li className="rounded-lg overflow-hidden shadow-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
            <a href="#" download className="block p-4 text-center">
              <p className="font-semibold">Московкина_ГИЭФПТ_побратимы</p>
            </a>
          </li>
          <li className="rounded-lg overflow-hidden shadow-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
            <a href="#" download className="block p-4 text-center">
              <p className="font-semibold">отчет Гайвинис</p>
            </a>
          </li>
          <li className="rounded-lg overflow-hidden shadow-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
            <a href="#" download className="block p-4 text-center">
              <p className="font-semibold">отчет города побратимы</p>
            </a>
          </li>
          <li className="rounded-lg overflow-hidden shadow-md bg-gray-100 hover:bg-gray-200 transition duration-300 ease-in-out">
            <a href="#" download className="block p-4 text-center">
              <p className="font-semibold">Отчет Киёк ГП Евразии</p>
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
