"use client";

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  title: string;
  description: string;
  link: string;
  file: FileList;
}

export default function Admin() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

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

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="container mx-auto mt-28 py-36">
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
              className="inline-flex justify-center items-center px-4 py-2 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
              style={{ width: "210px", height: "50px" }}
            >
              Загрузить Новость
            </button>
          </div>

          {message && <p>{message}</p>}
          {imageUrl && (
            <div>
              <img src={imageUrl} alt="Uploaded" style={{ maxWidth: "100%" }} />
            </div>
          )}
        </main>
      </div>
    </form>
  );
}
