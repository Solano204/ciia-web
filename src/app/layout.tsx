import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SplashCursorMount } from "@/components/providers/SplashCursorMount";
import { BeamsGlobalMount } from "@/components/providers/BeamsGlobalMount";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CII.IA | De la idea a la operación",
  description:
    "Centro de Innovación Industrial en Inteligencia Artificial. Desde el PIIT, en Nuevo León, acompañamos a empresas e instituciones a llevar la inteligencia artificial de la idea a la operación.",
  metadataBase: new URL("https://ciia-web.vercel.app"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <BeamsGlobalMount />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SplashCursorMount />
      </body>
    </html>
  );
}
