"use client";

import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";
import Link from "next/dist/client/link";

interface FormData {
  title: string;
  description: string;
  link: string;
  file: FileList;
}

interface NewsItem {
  id: string;
  date: string;
  title: string;
  description: string;
  image: string;
  link: string;
}

export default function Admin() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [blogs, setBlogs] = useState<NewsItem[]>([]);

  useEffect(() => {
    async function fetchNews() {
      try {
        const res = await fetch('/api/getnews');
        const data = await res.json();
        setBlogs(data);
      } catch (error) {
        console.error('Ошибка при загрузке новостей:', error);
      }
    }

    fetchNews();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("file", data.file[0]);
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("link", data.link);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl);
        setMessage(`Новость загружена успешно с ID: ${result.itemId}`);
        alert(`Новость загружена успешно с ID: ${result.itemId}`);
        reset();
        setBlogs([...blogs, {
          id: result.itemId,
          date: new Date().toLocaleDateString(), // Добавляем текущую дату
          title: data.title,
          description: data.description,
          image: result.imageUrl,
          link: data.link,
        }]);
      } else {
        setMessage(`Upload failed: ${result.error}`);
        alert(`Upload failed: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      setMessage("Error uploading file");
      alert("Error uploading file");
    }
  };
  async function deleteNews(id: string) {
    try {
      const response = await fetch('/api/deletnews', {
        method: 'DELETE',
        body: JSON.stringify({ id }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== id));
      } else {
        console.error('Ошибка при удалении новости:', await response.text());
      }
    } catch (error) {
      console.error('Ошибка при удалении новости:', error);
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
                  <Image
                    src={blog.image}
                    alt="blog"
                    width={500}
                    height={500}
                    className="w-full h-64 object-left object-cover transition-transform duration-300 hover:scale-105"
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


  return (
    <div>
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto mt-28 py-36">
      <Link href="/admin/admin_panel">
            <button
              type="button"
              className="inline-flex justify-center items-center px-4 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
              style={{ width: "210px", height: "50px" }}
            >
              Вернуться в меню
            </button>
          </Link>
        <main className="main">
          <h1 className="title text-4xl font-bold text-center">
            Добавить новость
          </h1>

          <label htmlFor="title" className="block font-medium text-2xl">
            Заголовок:
          </label>
          <textarea
            id="title"
            rows={2}
            {...register("title", { required: true })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <br />
          <label htmlFor="description" className="block font-medium text-2xl ">
            Описание:
          </label>
          <textarea
            id="description"
            rows={4}
            {...register("description", { required: true })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <label htmlFor="link" className="block font-medium text-2xl mt-5">
            Ссылка:
          </label>

          <textarea
            id="link"
            rows={1}
            {...register("link", { required: true })}
            required
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          ></textarea>
          <br />
          <label
            htmlFor="file"
            className=" block font-medium text-2xl mt-5 mr-2"
          >
            Изображение:
          </label>
          <input
            type="file"
            id="file"
            {...register("file", { required: true })}
            accept="image/*"
            required
          />
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="inline-flex justify-center items-center px-4 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
              style={{ width: "210px", height: "50px" }}
            >
              Загрузить Новость
            </button>
          </div>

          {message && <p>{message}</p>}
          {imageUrl && (
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px',
              border: '1px solid #ddd',
              boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
              borderRadius: '10px',
              maxWidth: '200px',
              maxHeight: '200px',
              overflow: 'hidden',
            }}>
              <img src={imageUrl} alt="Uploaded" style={{
                maxWidth: '100%',
                maxHeight: '100%',
                borderRadius: '10px',
                transition: 'transform 0.3s ease',
              }} 
              onMouseOver={e => e.currentTarget.style.transform = 'scale(1.1)'}
              onMouseOut={e => e.currentTarget.style.transform = 'scale(1)'} 
              />
            </div>
            
            
          )}
        </main>
      </div>
    </form>
    <NewsComponent />
    </div>


  );
}
