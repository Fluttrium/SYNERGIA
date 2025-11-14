import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Профиль - Фонд СИНЕРГИЯ",
  description: "Личный кабинет пользователя",
};

export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

