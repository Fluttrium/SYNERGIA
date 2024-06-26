/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function Project() {
  const blogs = [
    {
      date: "г. Санкт-Петербург 01.05.2023-30.11.2023",
      title: "Гармоничная миграция в Санкт-Петербурге – Правовая поддержка мигрантов и переселенцев",
      description: "Оказаны юридические консультации и оказана правовая консультационная помощь на безвозмездной основе по гражданскому, миграционному и трудовому праву мигрантам, добровольным переселенцам, вынужденным переселенцам, беженцам (в т. ч. дети беженцев, семьи беженцев), лицам со статусом «временное убежище», лицам без гражданства, в том числе мигрантам, иностранным гражданам, попавшим в трудную жизненную ситуацию в Санкт-Петербурге, а также членам их семей, на базе открытой Приемной Правовой Поддержки Фонда «СИНЕРГИЯ». За юридической консультацией обратилось более 400 человек.",
      image: "projects/2024-06-23 17.15.16.jpg",
      link: ""
    },
    {
      date: "г. Санкт-Петербург 01.06.2022-30.11.2022",
      title: "Гармоничная миграция в Санкт-Петербурге – Правовая поддержка мигрантов и переселенцев из Украины, ДНР, ЛНР",
      description: "Оказана квалифицированная юридическая помощь на безвозмездной основе беженцам, переселенцам, мигрантам по действующему, актуальному миграционному законодательству Российской Федерации, относящемуся к легализации нахождения беженцев (вынужденных переселенцев), мигрантов в пределах территории РФ и ее субъектов, по вопросам постановки на миграционный учет; получения статуса беженца, разрешения на временное проживания, вида на жительства и гражданства РФ в упрощенном порядке. Правовую юридическую помощь на безвозмездной основе получили более 600 иностранных граждан.",
      image: "projects/2024-06-23 17.15.28.jpg",
      link: ""
    },
  ];

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg py-8">
        <h2 className="text-3xl font-bold pb-10 text-center">Опыт успешной реализации социально значимых проектов</h2>
        <div className="grid grid-cols-1 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-full">
              <div className="overflow-hidden">
                <a href={blog.link}>
                  <img 
                    src={blog.image} 
                    alt="blog" 
                    className={`w-full h-64 object-cover transition-transform duration-300 hover:scale-105 ${index === 0 ? 'object-center' : 'object-left-top'}`} 
                  />
                </a>
              </div>
              <div className="p-6">
                <span className="block text-gray-500 text-sm mb-2">{blog.date}</span>
                <h3 className="text-xl font-bold mb-2">
                  <a href={blog.link} className="hover:text-blue-600 transition-colors duration-300">
                    {blog.title}
                  </a>
                </h3>
                <p className="text-gray-700 text-base">
                  {blog.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
