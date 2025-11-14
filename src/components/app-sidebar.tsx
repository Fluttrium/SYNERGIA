"use client";

import { Home, Users, FileText, Settings, LogOut, Layout, Image } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
} from "@/components/ui/sidebar";

// Пункты меню админа
const items = [
  {
    title: "Личный кабинет",
    url: "/admin/admin_panel",
    icon: Home,
  },
  {
    title: "Пользователи",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Новости",
    url: "/admin/news",
    icon: FileText,
  },
  {
    title: "Проекты",
    url: "/admin/admin_project",
    icon: Layout,
  },
  {
    title: "Буклеты и брошюры",
    url: "/admin/admin_postBukletPage",
    icon: Image,
  },
  {
    title: "Агрегатор - Жилье",
    url: "/admin/aggregator/housing",
    icon: Settings,
  },
];

export function AppSidebar() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Вы вышли из системы");
      router.push("/");
    } catch (error) {
      console.error("Ошибка при выходе:", error);
      toast.error("Ошибка при выходе");
    }
  };

  return (
    <Sidebar className="border-r border-gray-200">
      {/* Шапка сайдбара */}
      <SidebarHeader className="p-4 border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.name || "Администратор"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {user?.email || "admin@synergia.ru"}
            </p>
          </div>
        </div>
      </SidebarHeader>

      {/* Основной контент */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
            Фонд СИНЕРГИЯ
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link 
                      href={item.url}
                      className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-100 hover:text-gray-900 transition-colors"
                    >
                      <item.icon className="mr-3 h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Футер с кнопкой выхода */}
      <SidebarFooter className="p-4 border-t border-gray-200">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              onClick={handleLogout}
              className="flex items-center w-full px-3 py-2 text-sm font-medium text-red-600 rounded-md hover:bg-red-50 transition-colors cursor-pointer"
            >
              <LogOut className="mr-3 h-5 w-5" />
              <span>Выйти</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}

