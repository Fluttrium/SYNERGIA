"use client";
import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

interface FormData {
  name: string;
  mainImage: FileList | null;
}

interface FileGroup {
  title: string;
  description: string;
  link: string;
  images: FileList | null;
  pdfs: FileList | null;
}


export default function AdminPostBukletForm() {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [message, setMessage] = useState<string>("");
  const [brochures, setBrochures] = useState<any[]>([]);
  const [fileGroups, setFileGroups] = useState<FileGroup[]>([
    { title: "", description: "", link: "", images: null, pdfs: null }
  ]);
  const [editingBrochure, setEditingBrochure] = useState<number | null>(null);
  const [isEditing, setIsEditing] = useState(false);


  // Функция для получения брошюр
  async function fetchBrochures() {
    try {
      const response = await fetch("/api/buklets/getbuklets");
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const data = await response.json();
      console.log("Полученные данные из API:", data);
      // Фильтруем только брошюры
      const brochuresOnly = (data.items || []).filter((item: any) => item.type === 'brochure');
      console.log("Отфильтрованные брошюры:", brochuresOnly);
      brochuresOnly.forEach((brochure: any, index: number) => {
        console.log(`Брошюра ${index + 1}:`, {
          id: brochure.id,
          name: brochure.name?.substring(0, 50) + '...',
          hasMainImage: !!brochure.mainImage,
          mainImageLength: brochure.mainImage?.length || 0
        });
      });
      setBrochures(brochuresOnly);
    } catch (error) {
      console.error("Error fetching brochures:", error);
    }
  }

  // Загрузка списка брошюр при монтировании компонента
  useEffect(() => {
    fetchBrochures();
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // Проверяем, что все группы файлов заполнены
    for (let i = 0; i < fileGroups.length; i++) {
      const group = fileGroups[i];
      if (!group.title.trim()) {
        setMessage(`Ошибка: Заголовок для группы файлов ${i + 1} обязателен`);
        alert(`Ошибка: Заголовок для группы файлов ${i + 1} обязателен`);
        return;
      }
      if (!group.images || group.images.length === 0) {
        if (!group.pdfs || group.pdfs.length === 0) {
          if (!group.link.trim()) {
            setMessage(`Ошибка: В группе файлов ${i + 1} необходимо загрузить файлы или добавить ссылку`);
            alert(`Ошибка: В группе файлов ${i + 1} необходимо загрузить файлы или добавить ссылку`);
            return;
          }
        }
      }
    }

    const formData = new FormData();
    formData.append("name", data.name);
    
    // Добавляем основную картинку, если она выбрана
    if (data.mainImage && data.mainImage.length > 0) {
      formData.append("mainImage", data.mainImage[0]);
    }

    // Добавляем информацию о группах файлов
    fileGroups.forEach((group, index) => {
      formData.append(`group_${index}_title`, group.title);
      formData.append(`group_${index}_description`, group.description);
      formData.append(`group_${index}_link`, group.link);
      
      if (group.images && group.images.length > 0) {
        for (let i = 0; i < group.images.length; i++) {
          formData.append(`group_${index}_images`, group.images[i]);
        }
      }
      if (group.pdfs && group.pdfs.length > 0) {
        for (let i = 0; i < group.pdfs.length; i++) {
          formData.append(`group_${index}_pdfs`, group.pdfs[i]);
        }
      }
    });

    try {
      const endpoint = isEditing ? `/api/buklets/updatebrochure/${editingBrochure}` : "/api/buklets/postbrochure";
      const method = isEditing ? "PUT" : "POST";
      
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        const action = isEditing ? "обновлена" : "загружена";
        setMessage(`Брошюра успешно ${action} с ID: ${result.id}`);
        alert(`Брошюра успешно ${action} с ID: ${result.id}`);
        reset();
        setFileGroups([{ title: "", description: "", link: "", images: null, pdfs: null }]);
        setEditingBrochure(null);
        setIsEditing(false);
        // Обновление списка после загрузки
        await fetchBrochures();
      } else {
        const result = await response.json();
        setMessage(`Upload error: ${result.error}`);
        alert(`Upload error: ${result.error}`);
      }
    } catch (error) {
      console.error("Error uploading brochure:", error);
      setMessage("Error uploading brochure");
      alert("Error uploading brochure");
    }
  };

  async function editBrochure(id: number) {
    try {
      const response = await fetch(`/api/buklets/getbukletbyid?id=${id}`);
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const brochureData = await response.json();
      
      // Заполняем форму данными брошюры
      reset({
        name: brochureData.name
      });
      
      // Устанавливаем режим редактирования
      setEditingBrochure(id);
      setIsEditing(true);
      
      // Если есть группы файлов, загружаем их
      if (brochureData.fileGroups && brochureData.fileGroups.length > 0) {
        setFileGroups(brochureData.fileGroups.map((group: any) => ({
          title: group.title,
          description: group.description,
          link: group.link || "",
          images: null, // Файлы не загружаем при редактировании
          pdfs: null
        })));
      }
      
      // Прокручиваем к форме
      window.scrollTo({ top: 0, behavior: 'smooth' });
      
    } catch (error) {
      console.error("Ошибка при загрузке данных для редактирования:", error);
      alert("Ошибка при загрузке данных для редактирования");
    }
  }

  async function deleteBrochure(id: number) {
    try {
      const response = await fetch("/api/buklets/deletebrochure", {
        method: "DELETE",
        body: JSON.stringify({ id }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        setBrochures((prevBrochures) =>
          prevBrochures.filter((brochure) => brochure.id !== id)
        );
        console.log(`Successfully deleted brochure with ID ${id}`);
      } else {
        const result = await response.json();
        console.error("Ошибка при удалении:", result.error);
        alert(`Ошибка при удалении: ${result.error}`);
      }
    } catch (error) {
      console.error("Ошибка при удалении:", error);
      alert("Ошибка при удалении брошюры");
    }
  }

  const addFileGroup = () => {
    setFileGroups([...fileGroups, { title: "", description: "", link: "", images: null, pdfs: null }]);
  };

  const removeFileGroup = (index: number) => {
    if (fileGroups.length > 1) {
      const newGroups = fileGroups.filter((_, i) => i !== index);
      setFileGroups(newGroups);
    }
  };

  const updateFileGroup = (index: number, field: keyof FileGroup, value: string | FileList | null) => {
    const newGroups = [...fileGroups];
    newGroups[index] = { ...newGroups[index], [field]: value };
    setFileGroups(newGroups);
  };



  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-4xl mx-auto">
          {/* Заголовок */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold text-gray-900">
                {isEditing ? `Редактировать брошюру (ID: ${editingBrochure})` : "Добавить брошюру для мигрантов"}
              </h1>
              {isEditing && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingBrochure(null);
                    setIsEditing(false);
                    reset();
                    setFileGroups([{ title: "", description: "", link: "", images: null, pdfs: null }]);
                  }}
                  className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                >
                  Отменить редактирование
                </button>
              )}
            </div>


            {/* Заголовок */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-lg font-semibold text-gray-700 mb-2">
                Заголовок *
              </label>
              <textarea
                id="name"
                rows={3}
                {...register("name", { required: true })}
                required
                placeholder="Введите название брошюры..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
              />
            </div>

            {/* Основная картинка */}
            <div className="mb-6">
              <label htmlFor="mainImage" className="block text-lg font-semibold text-gray-700 mb-2">
                Основная картинка
              </label>
              <input
                type="file"
                id="mainImage"
                accept="image/*"
                {...register("mainImage")}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-4 file:py-2 file:px-4 file:rounded file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
              />
              <p className="text-sm text-gray-500 mt-2">
                Выберите основную картинку для брошюры (рекомендуется соотношение сторон 16:9)
              </p>
            </div>


            {/* Файлы */}
            <div className="space-y-6">
              <h3 className="text-xl font-semibold text-gray-800">Группы файлов</h3>
              
              {fileGroups.map((group, index) => (
                <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h4 className="text-lg font-medium text-gray-700">
                      Группа файлов #{index + 1}
                    </h4>
                    {fileGroups.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeFileGroup(index)}
                        className="text-red-500 hover:text-red-700 text-sm"
                      >
                        Удалить группу
                      </button>
                    )}
                  </div>

                  {/* Заголовок группы */}
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Заголовок группы *
                    </label>
                    <input
                      type="text"
                      value={group.title}
                      onChange={(e) => updateFileGroup(index, "title", e.target.value)}
                      placeholder="Введите заголовок для этой группы файлов..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                      required
                    />
                  </div>

                  {/* Описание группы */}
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Описание группы
                    </label>
                    <textarea
                      value={group.description}
                      onChange={(e) => updateFileGroup(index, "description", e.target.value)}
                      placeholder="Опишите содержимое этой группы файлов..."
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Ссылка группы */}
                  <div className="mb-4">
                    <label className="block text-base font-medium text-gray-700 mb-2">
                      Ссылка (опционально)
                    </label>
                    <input
                      type="url"
                      value={group.link}
                      onChange={(e) => updateFileGroup(index, "link", e.target.value)}
                      placeholder="https://example.com"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Если у вас есть внешняя ссылка на материал, укажите её здесь
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Изображения */}
                    <div>
                      <label
                        htmlFor={`images-${index}`}
                        className="block text-base font-medium text-gray-700 mb-2"
                      >
                        Изображения
                      </label>
                      <input
                        type="file"
                        id={`images-${index}`}
                        accept="image/*"
                        multiple
                        onChange={(e) => updateFileGroup(index, "images", e.target.files)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                      {group.images && (
                        <p className="text-sm text-gray-500 mt-1">
                          Выбрано файлов: {group.images.length}
                        </p>
                      )}
                    </div>

                    {/* PDF файлы */}
                    <div>
                      <label
                        htmlFor={`pdfs-${index}`}
                        className="block text-base font-medium text-gray-700 mb-2"
                      >
                        PDF файлы
                      </label>
                      <input
                        type="file"
                        id={`pdfs-${index}`}
                        accept="application/pdf"
                        multiple
                        onChange={(e) => updateFileGroup(index, "pdfs", e.target.files)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 file:mr-3 file:py-1 file:px-3 file:rounded file:border-0 file:text-sm file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                      />
                      {group.pdfs && (
                        <p className="text-sm text-gray-500 mt-1">
                          Выбрано файлов: {group.pdfs.length}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Кнопка добавления группы файлов */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={addFileGroup}
                  className="inline-flex items-center px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Добавить еще группу файлов
                </button>
              </div>
            </div>

            {/* Кнопка отправки */}
            <div className="text-center mt-8">
              <button
                type="submit"
                className="inline-flex items-center px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-all duration-200 hover:shadow-xl transform hover:-translate-y-1 text-lg"
              >
                {isEditing ? "Обновить брошюру" : "Загрузить материал"}
              </button>
            </div>

            {/* Сообщение */}
            {message && (
              <div className="mt-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
                <p className="text-purple-800">{message}</p>
              </div>
            )}
          </div>
        </form>

        {/* Список брошюр */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 text-center mb-6">
            Список брошюр для мигрантов
          </h2>
          
          {brochures.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">Брошюры пока не добавлены</p>
              <p className="text-gray-400 text-sm mt-2">Добавьте первую брошюру выше</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {brochures.map((brochure) => (
                <div
                  key={brochure.id}
                  className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-200"
                >
                  <div className="mb-3">
                    {/* Отладочная информация */}
                    <div className="text-xs text-gray-400 mb-1">
                      Debug: ID={brochure.id}, HasImage={!!brochure.mainImage}, ImageLength={brochure.mainImage?.length || 0}
                    </div>
                    
                    {brochure.mainImage ? (
                      <div className="mb-3">
                        <img
                          src={brochure.mainImage}
                          alt={brochure.mainImageFilename || brochure.name}
                          className="w-full h-32 object-cover rounded-lg border border-gray-200"
                          onError={(e) => {
                            console.error('Ошибка загрузки картинки в админ-панели для брошюры:', brochure.id, brochure.name);
                            e.currentTarget.style.display = 'none';
                          }}
                          onLoad={() => {
                            console.log('Картинка загружена в админ-панели для брошюры:', brochure.id, brochure.name);
                          }}
                        />
                      </div>
                    ) : (
                      <div className="mb-3 bg-red-100 border border-red-300 rounded-lg h-32 flex items-center justify-center">
                        <span className="text-red-500 text-sm">Нет картинки для брошюры {brochure.id}</span>
                      </div>
                    )}
                    
                    <h3 className="font-semibold text-gray-800 mb-2" style={{
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {brochure.name}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 text-xs font-medium rounded-full bg-purple-100 text-purple-800">
                        Брошюра
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    <button
                      onClick={() => editBrochure(brochure.id)}
                      className="px-3 py-1 text-sm bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-all duration-200"
                      title="Редактировать брошюру"
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => deleteBrochure(brochure.id)}
                      className="px-3 py-1 text-sm bg-red-500 hover:bg-red-600 text-white rounded-lg transition-all duration-200"
                      title="Удалить брошюру"
                    >
                      Удалить
                    </button>
                  </div>
                  
                  <div className="border-t border-gray-100 pt-3 mt-3">
                    <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
                      <span>ID: {brochure.id}</span>
                    </div>
                    <a
                      href={`/buklet/${brochure.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full text-center bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
                    >
                      Открыть брошюру
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
