/* eslint-disable react/no-unescaped-entities */
import React from 'react';

export default function News() {
  const blogs = [
    {
      date: "Oct 26, 2018",
      title: "Конференция городов-побратимов Санкт-Петербурга",
      description: "",
      image: "Vitse-konsul-Indii-560x416.jpg",
      link: "https://www.dp.ru/a/2018/11/02/Sostojalas_konferencija_po"
    },
    {
      date: "Oct 24, 2018",
      title: "Выставка-ярмарка Дары Востока в КВЦ Евразия",
      description: "",
      image: "darVostok.jpg",
      link: "https://www.dp.ru/a/2018/10/24/Konferencija_o_sozdanii_ezh"
    },
    {
      date: "Dec 22, 2023",
      title: "The no-fuss guide to upselling and cross selling",
      description: "",
      image: "darVostok.jpg",
      link: "https://www.dp.ru/a/2018/10/24/Konferencija_o_sozdanii_ezh"
    },
  ];

  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <div key={index} className="bg-white shadow-md rounded-lg overflow-hidden w-256">
              <div className="overflow-hidden">
                <a href={blog.link}>
                  <img src={blog.image} alt="blog" className="w-full h-64 object-cover transition-transform duration-300 hover:scale-105" />
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
