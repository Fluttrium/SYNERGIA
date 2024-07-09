"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

interface ProjectItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Project() {
  const [blogs, setBlogs] = useState<ProjectItem[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch("/api/getprojects"); // Вызов API метода GET
        const data = await res.json();
        setBlogs(data); // Устанавливаем полученные данные в состояние
      } catch (error) {
        console.error("Ошибка при загрузке проектов:", error);
      }
    }

    fetchProjects();
  }, []);


  return (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <div className="overflow-hidden">
                <a href={blog.link}>
                  <Image
                    src={blog.image}
                    alt="blog"
                    width={500}
                    height={500}
                    
                    className="w-full h-64 object-left object-cover transition-transform duration-300 hover:scale-105 borderRadius: '10px',"
                  />
                </a>
              </div>
              <div className="p-6">
                <span className="block text-gray-500 text-sm mb-2">
                  {blog.date}
                </span>
                <h3 className="text-xl font-bold mb-2">
                  <a
                    href={blog.link}
                    className="hover:text-blue-600 transition-colors duration-300"
                  >
                    {blog.title}
                  </a>
                </h3>
                <p className="text-gray-700 text-base">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
