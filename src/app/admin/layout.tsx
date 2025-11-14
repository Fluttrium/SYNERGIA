"use client";

import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AppSidebar />
      <main className="flex-1 overflow-auto bg-gray-50">
        <div className="sticky top-0 z-10 bg-white border-b border-gray-200 px-4 py-3 flex items-center">
          <SidebarTrigger />
          <div className="ml-4">
            <h1 className="text-xl font-semibold text-gray-900">
              Фонд СИНЕРГИЯ - Админ панель
            </h1>
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
}
