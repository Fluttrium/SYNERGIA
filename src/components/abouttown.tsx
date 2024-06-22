import Image from "next/image";
import "@/components/styles/About2.scss";

export default function About2() {
  return (
    <section className="about2 relative flex justify-center h-auto p-4 mt-40">
      <div className="bg-white mx-4 p-6 border border-gray-300">
        <div className="flex flex-col text-center mb-0">
          <div className="mx-7 mb-0">
            <p className="text-2xl md:text-3xl lg:text-4xl font-bold pb-6 mb-0">
              Дружба народов в цифрах
            </p>
            <p className="text-center text-base md:text-lg lg:text-xl w-full md:w-3/4 lg:w-2/3 mx-auto mb-0">
              Важное место во внешних связях Санкт-Петербурга занимает сотрудничество с зарубежными городами и регионами, начало которым было положено в 1953 году, когда были установлены связи с финским городом Турку. В настоящее время 93 зарубежных города и 30 зарубежных регионов имеют двусторонние документы о сотрудничестве с Санкт-Петербургом.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
