import type { Metadata } from "next";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Имя Фамилия — Frontend-разработчик",
  description:
    "Лендинг-презентация разработчика: стек, опыт, проекты, контакты.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru">
      <body>{children}</body>
    </html>
  );
}