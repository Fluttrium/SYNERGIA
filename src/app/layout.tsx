import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "./(default)/globals.css";
import { AuthProviderWrapper } from "@/components/providers/auth-provider-wrapper";

const font = Nunito_Sans({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Фонд «СИНЕРГИЯ»",
  description: "Фонд развития культурно-делового сотрудничества городов-побратимов Санкт-Петербурга «СИНЕРГИЯ»",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/favicon/atom_blacck.ico" />
      </head>
      <body className={font.className}>
        <AuthProviderWrapper>{children}</AuthProviderWrapper>
      </body>
    </html>
  );
}
