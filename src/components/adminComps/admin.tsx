"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

export const revalidate = 0;

interface FormData {
  title: string;
  description: string;
  link: string;
  file: FileList;
}

interface NewsItem {
  id: string;

  title: string;
  description: string;
  image: string; // URL base64 image
  link: string;
}
interface NewsProps {
  initialBlogs: NewsItem[];
}

export default function Admin({ initialBlogs }: NewsProps) {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [blogs, setBlogs] = useState<NewsItem[]>(initialBlogs);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);

    try {
      const response = await fetch("/api/news/postnews", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl);
        setMessage(`Новость загружена успешно с ID: ${result.itemId}`);
        alert(`Новость загружена успешно с ID: ${result.itemId}`);
        reset();
        setBlogs([
          ...blogs,
          {
            id: result.itemId,
            title: data.title,
            description: data.description,
            image: `data:image/jpeg;base64,${result.image}`,
            link: data.link,
          },
        ]);
      } else {
        setMessage(`Ошибка загрузки: ${result.error}`);
        alert(`Ошибка загрузки: ${result.error}`);
      }
    } catch (error) {
      console.error("Ошибка загрузки файла:", error);
      setMessage("Ошибка загрузки файла");
      alert("Ошибка загрузки файла");
    }
  };

  async function deleteNews(id: string) {
    try {
      const response = await fetch("/api/news/deletnews", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } else {
        console.error("Ошибка при удалении новости:", await response.text());
      }
    } catch (error) {
      console.error("Ошибка при удалении новости:", error);
    }
  }

  const NewsComponent = () => (
    <section className="relative flex bg-white h-max z-1 w-full justify-center py-32">
      <div className="max-w-screen-lg py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-lg overflow-hidden"
            >
              <button
                onClick={() => deleteNews(blog.id)}
                className="text-red-500 hover:text-red-700 transition-colors duration-300"
              >
                Удалить
              </button>
              <div className="overflow-hidden">
                <a href={blog.link}>
                  <img
                    src={blog.image}
                    alt="blog"
                    className="w-full h-64 object-left object-cover transition-transform duration-300 hover:scale-105"
                  />
                </a>
              </div>
              <div className="p-6">
                <span className="text-lg font-bold">{blog.title}</span>
                <p className="text-gray-700 mt-2">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Добавление новостей</h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Заголовок"
          {...register("title", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <textarea
          placeholder="Описание"
          {...register("description", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="text"
          placeholder="Ссылка"
          {...register("link", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <input
          type="file"
          {...register("file", { required: true })}
          className="w-full p-2 border border-gray-300 rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Загрузить новость
        </button>
        {message && <p className="mt-4">{message}</p>}
      </form>
      <NewsComponent />
    </main>
  );
}
