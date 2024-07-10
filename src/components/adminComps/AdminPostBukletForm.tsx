"use client";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  files: FileList;
}

export default function AdminPostBukletForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [imageUrl, setImageUrl] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    // Проверяем, что файлы добавлены в FormData
    if (data.files.length === 0) {
      alert("Please select at least one file.");
      return;
    }

    // Добавляем каждый файл в FormData
    for (let i = 0; i < data.files.length; i++) {
      formData.append("files", data.files[i]);
    }

    try {
      const response = await fetch("/api/data/postBukletPage", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setImageUrl(result.imageUrl);
        setMessage(`Новость загружена успешно с ID: ${result.itemId}`);
        alert(`Новость загружена успешно с ID: ${result.itemId}`);
        reset(); // Сбрасываем форму после успешной загрузки
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
    <div>
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="container mx-auto mt-28 py-56">
          <main className="main">
            <h1 className="title text-4xl font-bold text-center">
              Добавить страницу с буклетами
            </h1>

            <label htmlFor="name" className="block font-medium text-2xl">
              Заголовок:
            </label>
            <textarea
              id="name"
              rows={2}
              {...register("name", { required: true })}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            ></textarea>
            <br />

            <label
              htmlFor="files"
              className=" block font-medium text-2xl mt-5 mr-2"
            >
              Изображения:
            </label>
            <input
              type="file"
              id="files"
              {...register("files", { required: true })}
              accept="image/*"
              multiple
              required
            />
            <br />
            <div className="flex justify-center">
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95 mt-5"
                style={{ width: "210px", height: "50px" }}
              >
                Загрузить Буклет
              </button>
            </div>

            {message && <p>{message}</p>}
            {imageUrl && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "10px",
                  border: "1px solid #ddd",
                  boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                  borderRadius: "10px",
                  maxWidth: "200px",
                  maxHeight: "200px",
                  overflow: "hidden",
                }}
              >
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "100%",
                    borderRadius: "10px",
                    transition: "transform 0.3s ease",
                  }}
                  onMouseOver={(e) =>
                    (e.currentTarget.style.transform = "scale(1.1)")
                  }
                  onMouseOut={(e) =>
                    (e.currentTarget.style.transform = "scale(1)")
                  }
                />
              </div>
            )}
          </main>
        </div>
      </form>
    </div>
  );
}
