import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bluedebug — Automatización y Transformación Digital",
  description:
    "Eliminamos tareas manuales y optimizamos tus procesos para que puedas centrarte en hacer crecer tu negocio. Agenda una llamada gratuita.",
  keywords: ["automatización", "transformación digital", "pymes", "startups", "procesos", "software a medida"],
  openGraph: {
    title: "Bluedebug — Automatización y Transformación Digital",
    description: "Eliminamos tareas manuales y optimizamos tus procesos.",
    url: "https://bluedebug.com",
    siteName: "Bluedebug",
    locale: "es_ES",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className="antialiased" suppressHydrationWarning>{children}</body>
    </html>
  );
}
