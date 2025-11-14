"use client";

import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import toast from "react-hot-toast";
import { useAuth } from "@/contexts/AuthContext";

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: "",
    password: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { login, checkAuth, user } = useAuth();

  // Если пользователь уже авторизован, редиректим его
  useEffect(() => {
    if (user) {
      const redirectTo = searchParams.get('redirect') || (user.role === 'admin' ? '/admin/admin_panel' : '/profile');
      router.push(redirectTo);
    }
  }, [user, router, searchParams]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Login failed");
      }

      const result = await response.json();
      console.log("✅ Login successful:", result);

      if (!result.user) {
        throw new Error("No user data received");
      }

      // Показываем уведомление об успешном входе
      const userName = result.user.name || result.user.username || "Пользователь";
      toast.success(`Добро пожаловать, ${userName}!`, {
        duration: 1500,
        icon: "👋",
      });

      // Обновляем AuthContext
      await checkAuth();

      // Редирект в зависимости от роли пользователя и параметра redirect
      const redirectTo = searchParams.get('redirect') || (result.user.role === 'admin' ? '/admin/admin_panel' : '/profile');
      
      // Небольшая задержка для обновления состояния, затем редирект
      setTimeout(() => {
        window.location.href = redirectTo;
      }, 800);
      
      // Не сбрасываем isLoading, так как происходит редирект
      
    } catch (error: any) {
      console.error("❌ Error logging in:", error);
      
      // Показываем уведомление об ошибке
      toast.error("❌ Неверный email или пароль", {
        duration: 4000,
      });
      
      setError(
        error.message || "Неверный email или пароль. Пожалуйста, проверьте свои данные и попробуйте снова."
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-28 lg:px-8 bg-gray-50">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto"
          src="/atom_black.svg"
          width={80}
          height={80}
          alt="Фонд СИНЕРГИЯ"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Вход в личный кабинет
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600">
          Нет аккаунта?{" "}
          <Link
            href="/register"
            className="font-semibold text-blue-600 hover:text-blue-500"
          >
            Зарегистрироваться
          </Link>
        </p>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email адрес
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="email"
                autoComplete="username"
                required
                value={formData.username}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Пароль
              </label>
            </div>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={formData.password}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {isLoading ? "Загрузка..." : "Войти"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
