"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { MdEditor, config } from 'md-editor-rt';
import 'md-editor-rt/lib/style.css';
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Настройка языка редактора на русский
config({
  editorConfig: {
    languageUserDefined: {
      'ru-RU': {
        toolbarTips: {
          bold: 'Жирный',
          underline: 'Подчеркнутый',
          italic: 'Курсив',
          strikeThrough: 'Зачёркнутый',
          title: 'Заголовок',
          sub: 'Подстрочный',
          sup: 'Надстрочный',
          quote: 'Цитата',
          unorderedList: 'Маркированный список',
          orderedList: 'Нумерованный список',
          task: 'Список задач',
          codeRow: 'Строчный код',
          code: 'Блок кода',
          link: 'Ссылка',
          image: 'Изображение',
          table: 'Таблица',
          mermaid: 'Диаграмма',
          katex: 'Формула',
          revoke: 'Отменить',
          next: 'Вернуть',
          save: 'Сохранить',
          prettier: 'Форматировать',
          pageFullscreen: 'Полный экран (страница)',
          fullscreen: 'Полный экран',
          preview: 'Предпросмотр',
          htmlPreview: 'HTML просмотр',
          catalog: 'Оглавление',
          github: 'GitHub'
        },
        titleItem: {
          h1: 'Заголовок 1',
          h2: 'Заголовок 2',
          h3: 'Заголовок 3',
          h4: 'Заголовок 4',
          h5: 'Заголовок 5',
          h6: 'Заголовок 6'
        },
        imgTitleItem: {
          link: 'Добавить ссылку на изображение',
          upload: 'Загрузить изображение',
          clip2upload: 'Вставить изображение'
        },
        linkModalTips: {
          linkTitle: 'Добавить ссылку',
          imageTitle: 'Добавить изображение',
          descLabel: 'Описание:',
          descLabelPlaceHolder: 'Введите описание...',
          urlLabel: 'Ссылка:',
          urlLabelPlaceHolder: 'Введите ссылку...',
          buttonOK: 'OK'
        },
        copyCode: {
          text: 'Копировать',
          successTips: 'Скопировано!',
          failTips: 'Ошибка копирования!'
        },
        footer: {
          markdownTotal: 'Количество слов',
          scrollAuto: 'Автопрокрутка'
        }
      }
    }
  }
});

interface NewsItem {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  body?: string;
}

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Форма для создания/редактирования
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    link: "",
    body: "",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Функция загрузки изображений в MD редактор
  const onUploadImg = async (files: File[]) => {
    try {
      const formData = new FormData();
      formData.append("file", files[0]);

      const response = await fetch("/api/news/upload-image", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (response.ok && result.url) {
        return Promise.resolve([result.url]);
      } else {
        toast.error("Ошибка загрузки изображения");
        return Promise.reject();
      }
    } catch (error) {
      console.error("Ошибка загрузки изображения:", error);
      toast.error("Ошибка загрузки изображения");
      return Promise.reject();
    }
  };

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      console.log("📡 Fetching news from API...");
      const response = await fetch("/api/news/getnews");
      console.log("📥 Response status:", response.status);
      
      const data = await response.json();
      console.log("📦 Response data:", data);
      
      // API возвращает { news: [...] }
      if (data.news) {
        console.log("✅ Found", data.news.length, "news items");
        setNews(data.news);
      } else {
        console.log("⚠️ No news array in response");
        setNews([]);
      }
    } catch (error) {
      console.error("❌ Ошибка загрузки новостей:", error);
      toast.error("Ошибка загрузки новостей");
      setNews([]);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (item: NewsItem) => {
    setEditingNews(item);
    setFormData({
      title: item.title,
      description: item.description,
      link: item.link,
      body: item.body || "",
    });
    setIsCreating(true);
  };

  const handleCreate = () => {
    setEditingNews(null);
    setFormData({
      title: "",
      description: "",
      link: "",
      body: "",
    });
    setIsCreating(true);
  };

  const handleCancel = () => {
    setIsCreating(false);
    setEditingNews(null);
    setImageFile(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const submitFormData = new FormData();
      
      if (imageFile) {
        submitFormData.append("file", imageFile);
      }
      submitFormData.append("title", formData.title);
      submitFormData.append("description", formData.description);
      submitFormData.append("link", formData.link || "#");
      submitFormData.append("body", formData.body);

      const response = await fetch("/api/news/postnews", {
        method: "POST",
        body: submitFormData,
      });

      const result = await response.json();

      if (response.ok) {
        toast.success("Новость успешно создана!");
        setIsCreating(false);
        setFormData({ title: "", description: "", link: "", body: "" });
        setImageFile(null);
        await fetchNews();
      } else {
        toast.error(result.error || "Ошибка создания новости");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка создания новости");
    }
  };

  const handleUpdate = async () => {
    if (!editingNews) return;

    try {
      const response = await fetch("/api/news/update", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: editingNews.id,
          ...formData,
        }),
      });

      if (response.ok) {
        toast.success("Новость обновлена!");
        setIsCreating(false);
        setEditingNews(null);
        await fetchNews();
      } else {
        toast.error("Ошибка обновления");
      }
    } catch (error) {
      console.error("Ошибка:", error);
      toast.error("Ошибка обновления новости");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Вы уверены, что хотите удалить эту новость?")) return;

    try {
      console.log("🗑️ Deleting news:", id);
      
      const response = await fetch(`/api/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast.success("✅ Новость успешно удалена");
        setNews(news.filter((n) => n.id !== id));
      } else {
        const errorData = await response.json();
        console.error("Delete error:", errorData);
        toast.error("Ошибка удаления: " + errorData.message);
      }
    } catch (error) {
      console.error("Ошибка удаления:", error);
      toast.error("Ошибка удаления новости");
    }
  };

  if (isCreating) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="w-full p-8"
      >
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-gray-900">
            {editingNews ? "Редактирование новости" : "Создание новости"}
          </h1>
          <div className="space-x-2">
            <Button variant="outline" onClick={handleCancel}>
              Отмена
            </Button>
            {editingNews ? (
              <Button onClick={handleUpdate}>
                Сохранить изменения
              </Button>
            ) : null}
          </div>
        </div>

        {editingNews ? (
          // Редактирование существующей новости
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description">Краткое описание</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>
                <div>
                  <Label htmlFor="link">Внешняя ссылка (необязательно)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Содержание статьи (Markdown)</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Используйте кнопку &quot;Изображение&quot; для загрузки картинок в статью
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <MdEditor
                    language="ru-RU"
                    modelValue={formData.body}
                    onChange={(value) => setFormData({ ...formData, body: value })}
                    onUploadImg={onUploadImg}
                    style={{ height: "100%" }}
                    previewTheme="default"
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        ) : (
          // Создание новой новости
          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Основная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">Заголовок *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Краткое описание *</Label>
                  <textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="image">Изображение *</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="link">Внешняя ссылка (необязательно)</Label>
                  <Input
                    id="link"
                    value={formData.link}
                    onChange={(e) =>
                      setFormData({ ...formData, link: e.target.value })
                    }
                    placeholder="https://..."
                  />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Содержание статьи (Markdown)</CardTitle>
                <p className="text-sm text-gray-500 mt-1">
                  Используйте кнопку &quot;Изображение&quot; для загрузки картинок в статью
                </p>
              </CardHeader>
              <CardContent>
                <div className="h-[600px]">
                  <MdEditor
                    language="ru-RU"
                    modelValue={formData.body}
                    onChange={(value) => setFormData({ ...formData, body: value })}
                    onUploadImg={onUploadImg}
                    style={{ height: "100%" }}
                    previewTheme="default"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end">
              <Button type="submit">
                Создать новость
              </Button>
            </div>
          </form>
        )}
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full p-8"
    >
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-5xl lg:text-7xl font-bold text-gray-900">
          Новости
        </h1>
        <Button onClick={handleCreate} size="lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Создать новость
        </Button>
      </div>

      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : news.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">Новостей пока нет</p>
          <Button onClick={handleCreate}>
            Создать первую новость
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {news.map((item) => (
            <Card key={item.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row">
                {/* Изображение */}
                <div className="relative h-48 md:h-auto md:w-64 flex-shrink-0 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                
                {/* Контент */}
                <CardContent className="flex-1 p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2 text-gray-900">{item.title}</h3>
                      <p className="text-gray-600 line-clamp-2">
                        {item.description}
                      </p>
                      {item.body && (
                        <p className="text-sm text-gray-400 mt-2">
                          Есть полное содержание ({item.body.length} символов)
                        </p>
                      )}
                    </div>
                  </div>
                  
                  {/* Кнопки действий */}
                  <div className="flex flex-wrap gap-2 mt-4">
                    <Button
                      size="sm"
                      onClick={() => handleEdit(item)}
                    >
                      ✏️ Редактировать
                    </Button>
                    <a href={`/news/${item.id}`} target="_blank" rel="noopener noreferrer">
                      <Button size="sm" variant="outline">
                        👁️ Просмотр
                      </Button>
                    </a>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(item.id)}
                    >
                      🗑️ Удалить
                    </Button>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>
      )}
    </motion.div>
  );
}
