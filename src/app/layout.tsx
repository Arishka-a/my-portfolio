import type { Metadata } from "next";
import "@fontsource-variable/playfair-display";
import "@fontsource-variable/manrope";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Арина — Frontend-разработчик",
  description:
    "Лендинг-презентация frontend-разработчика: стек, опыт, проекты и контакты. React, TypeScript, Next.js.",
  openGraph: {
    title: "Арина — Frontend-разработчик",
    description:
      "Лендинг-презентация frontend-разработчика: стек, опыт, проекты и контакты.",
    type: "website",
    locale: "ru_RU",
  },
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