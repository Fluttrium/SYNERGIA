"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import toast from 'react-hot-toast';

export interface User {
  id: string;
  username: string;
  email: string;
  name?: string;
  surname?: string;
  phone?: string;
  role: 'admin' | 'user';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const isCheckingRef = useRef(false);

  // Проверка токена и получение данных пользователя
  const checkAuth = useCallback(async () => {
    // Проверяем, что мы на клиенте
    if (typeof window === 'undefined') {
      return;
    }

    // Предотвращаем множественные одновременные вызовы
    if (isCheckingRef.current) {
      return;
    }

    isCheckingRef.current = true;
    setLoading(true);
    try {
      const token = getCookie('token');
      if (!token) {
        setUser(null);
        isCheckingRef.current = false;
        setLoading(false);
        return;
      }

      // Получение полных данных пользователя
      const response = await fetch('/api/users/me', {
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      } else {
        setUser(null);
        // Удаляем невалидный токен
        if (typeof document !== 'undefined') {
          document.cookie = 'token=; Max-Age=0; path=/';
        }
      }
    } catch (error: any) {
      // Игнорируем ошибки сети, если это не критично
      if (error?.message?.includes('Load failed') || error?.message?.includes('Failed to fetch')) {
        // Сетевая ошибка - возможно, сервер не доступен
        console.warn('Network error during auth check:', error.message);
        // Не очищаем токен при сетевых ошибках
      } else {
        console.error('Auth check failed:', error);
        setUser(null);
        // Удаляем невалидный токен только на клиенте
        if (typeof document !== 'undefined') {
          document.cookie = 'token=; Max-Age=0; path=/';
        }
      }
    } finally {
      setLoading(false);
      isCheckingRef.current = false;
    }
  }, []); // Пустой массив зависимостей - функция не пересоздается

  // Логин
  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Устанавливаем пользователя сразу из ответа
      if (data.user) {
        setUser(data.user);
      }
      
      setLoading(false);
      return data.user; // Возвращаем данные пользователя
    } catch (error) {
      setLoading(false);
      throw error;
    }
  };

  // Логаут
  const logout = async () => {
    try {
      if (typeof window !== 'undefined') {
        await fetch('/api/users/logout', {
          method: 'POST',
          credentials: 'include'
        });
      }
      
      // Удаляем токен
      if (typeof document !== 'undefined') {
        document.cookie = 'token=; Max-Age=0; path=/';
      }
      setUser(null);
      
      // Показываем уведомление
      if (typeof window !== 'undefined') {
        toast.success('Вы успешно вышли из системы', {
          icon: '👋',
        });
      }
    } catch (error) {
      console.error('Logout failed:', error);
      // Все равно очищаем локальное состояние
      if (typeof document !== 'undefined') {
        document.cookie = 'token=; Max-Age=0; path=/';
      }
      setUser(null);
      if (typeof window !== 'undefined') {
        toast.success('Вы вышли из системы');
      }
    }
  };

  // Проверяем аутентификацию при монтировании (только на клиенте)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      checkAuth();
    }
  }, [checkAuth]); // checkAuth стабилен благодаря useCallback

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, checkAuth }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Вспомогательная функция для получения cookie
function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) {
    return parts.pop()?.split(';').shift() || null;
  }
  return null;
}

