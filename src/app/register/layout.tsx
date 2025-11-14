import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Регистрация - Фонд СИНЕРГИЯ",
  description: "Регистрация нового пользователя",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

