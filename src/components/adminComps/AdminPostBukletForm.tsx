"use client";
import React, { useState, useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Image from "next/image";

interface FormData {
  name: string;
  images: FileList[];
  pdfs: FileList[];
}

interface Buklet {
  id: number;
  name: string;
  images: string[];
  pdfs: string[];
}

export default function AdminPostBukletForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");
  const [fileInputs, setFileInputs] = useState<
    { images: FileList | null; pdfs: FileList | null }[]
  >([{ images: null, pdfs: null }]);
  const [buklets, setBuklets] = useState<Buklet[]>([]);

  const fetchBuklets = async () => {
    try {
      const response = await fetch("/api/data/getBukletPage");
      if (response.ok) {
        const data = await response.json();
        setBuklets(data);
      } else {
        console.error("Failed to fetch buklets");
      }
    } catch (error) {
      console.error("Error fetching buklets:", error);
    }
  };

  useEffect(() => {
    fetchBuklets();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);

    fileInputs.forEach((input) => {
      if (
        input.images &&
        input.images.length > 0 &&
        input.pdfs &&
        input.pdfs.length > 0
      ) {
        for (let i = 0; i < input.images.length; i++) {
          formData.append("images", input.images[i]);
        }
        for (let i = 0; i < input.pdfs.length; i++) {
          formData.append("pdfs", input.pdfs[i]);
        }
      } else {
        alert("Please select at least one image and one PDF file.");
        return;
      }
    });

    try {
      const response = await fetch("/api/data/postBukletPage", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        setMessage(`Буклет успешно загружен с ID: ${result.itemId}`);
        alert(`Буклет успешно загружен с ID: ${result.itemId}`);
        reset();
        setFileInputs([{ images: null, pdfs: null }]);
        fetchBuklets();
      } else {
        const result = await response.json();
        setMessage(`Ошибка загрузки: ${result.error}`);
        alert(`Ошибка загрузки: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading buklet:", error);
      setMessage("Ошибка загрузки буклета");
      alert("Ошибка загрузки буклета");
    }
  };

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
                  {...register(`images.${index}`, { required: true })}
                  accept="image/*"
                  multiple
                  required
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
                  {...register(`pdfs.${index}`, { required: true })}
                  accept="application/pdf"
                  multiple
                  required
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

            <div className="mt-10">
              {buklets.length > 0 && (
                <div>
                  <h2 className="text-3xl font-bold text-center">
                    Загруженные буклеты
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-5">
                    {buklets.map((buklet) => (
                      <div
                        key={buklet.id}
                        className="border rounded-lg overflow-hidden shadow-lg"
                      >
                        {buklet.images.map((img, idx) => (
                          <a
                            key={idx}
                            href={buklet.pdfs[idx]}
                            download
                            className="relative h-80 block"
                          >
                            <Image
                              src={img}
                              alt={`Image ${idx + 1}`}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-lg"
                            />
                          </a>
                        ))}
                        <div className="p-4">
                          <h3 className="text-xl font-bold">{buklet.name}</h3>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </form>
    </div>
  );
}
