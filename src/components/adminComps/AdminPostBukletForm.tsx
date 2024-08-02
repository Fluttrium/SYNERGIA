"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  images: FileList;
  pdfs: FileList;
}

interface Buklet {
  id: number;
  name: string;
}

export default function AdminPostBukletForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");
  const [buklets, setBuklets] = useState<Buklet[]>([]);
  const [fileInputs, setFileInputs] = useState<
    { images: FileList | null; pdfs: FileList | null }[]
  >([{ images: null, pdfs: null }]);

  // Функция для получения буклетов
  async function fetchBuklets() {
    try {
      const response = await fetch("/api/buklets/getbuklets");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      setBuklets(data.buklets);
    } catch (error) {
      console.error("Error fetching buklets:", error);
    }
  }

  // Загрузка списка буклетов при монтировании компонента
  useEffect(() => {
    fetchBuklets();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    fileInputs.forEach((input) => {
      if (input.images) {
        for (let i = 0; i < input.images.length; i++) {
          formData.append("images", input.images[i]);
        }
      }
      if (input.pdfs) {
        for (let i = 0; i < input.pdfs.length; i++) {
          formData.append("pdfs", input.pdfs[i]);
        }
      }
    });

    try {
      const response = await fetch("/api/buklets/postbuklet", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Buklet successfully uploaded with ID: ${result.bukletId}`);
        alert(`Buklet successfully uploaded with ID: ${result.bukletId}`);
        reset();
        setFileInputs([{ images: null, pdfs: null }]);
        // Обновление списка буклетов после загрузки
        await fetchBuklets();
      } else {
        const result = await response.json();
        setMessage(`Upload error: ${result.error}`);
        alert(`Upload error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading buklet:", error);
      setMessage("Error uploading buklet");
      alert("Error uploading buklet");
    }
  };

  async function deleteBuklet(id: number) {
    try {
      const response = await fetch("/api/buklets/delet", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBuklets((prevBuklets) =>
          prevBuklets.filter((buklet) => buklet.id !== id)
        );
      } else {
        const result = await response.json();
        console.error("Ошибка при удалении проекта:", result.error);
      }
    } catch (error) {
      console.error("Ошибка при удалении проекта:", error);
    }
  }

  const addFileInput = () => {
    setFileInputs([...fileInputs, { images: null, pdfs: null }]);
  };

  const handleFileChange = (
    index: number,
    type: "images" | "pdfs",
    files: FileList | null
  ) => {
    const newFileInputs = [...fileInputs];
    newFileInputs[index][type] = files;
    setFileInputs(newFileInputs);
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

            {fileInputs.map((input, index) => (
              <div key={index}>
                <label
                  htmlFor={`images-${index}`}
                  className="block font-medium text-2xl mt-5 mr-2"
                >
                  Изображения:
                </label>
                <input
                  type="file"
                  id={`images-${index}`}
                  accept="image/*"
                  multiple
                  onChange={(e) =>
                    handleFileChange(index, "images", e.target.files)
                  }
                />

                <label
                  htmlFor={`pdfs-${index}`}
                  className="block font-medium text-2xl mt-5 mr-2"
                >
                  PDF файлы:
                </label>
                <input
                  type="file"
                  id={`pdfs-${index}`}
                  accept="application/pdf"
                  multiple
                  onChange={(e) =>
                    handleFileChange(index, "pdfs", e.target.files)
                  }
                />
              </div>
            ))}

            <div className="flex mt-5">
              <button
                type="button"
                onClick={addFileInput}
                className="inline-flex items-center px-4 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95"
                style={{ width: "210px", height: "50px" }}
              >
                Добавить еще фотографии и PDF
              </button>
            </div>

            <div className="flex justify-center mt-5">
              <button
                type="submit"
                className="inline-flex justify-center items-center px-4 text-white rounded bg-purple-500 transition-transform duration-300 ease-in-out transform hover:scale-105 focus:outline-none active:scale-95"
                style={{ width: "210px", height: "50px" }}
              >
                Загрузить Буклет
              </button>
            </div>

            {message && <p>{message}</p>}
          </main>
        </div>
      </form>

      <div className="container mx-auto mt-10">
        <h2 className="text-3xl font-bold text-center">Список Буклетов</h2>
        <ul className="mt-4">
          {buklets.map((buklet) => (
            <li
              key={buklet.id}
              className="flex items-center justify-between p-2 border-b border-gray-300"
            >
              <span className="text-lg">{buklet.name}</span>
              <button
                onClick={() => deleteBuklet(buklet.id)}
                className="text-red-500 hover:text-red-700"
              >
                Удалить
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
