import type { Metadata } from "next";
import localFont from "next/font/local";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/providers/SmoothScrollProvider";
import { SplashCursorMount } from "@/components/providers/SplashCursorMount";
import { BeamsGlobalMount } from "@/components/providers/BeamsGlobalMount";
import { SITE_URL } from "@/lib/ciiia";

const clashDisplay = localFont({
  src: "../fonts/ClashDisplay-Variable.woff2",
  variable: "--font-clash",
  weight: "200 700",
  display: "swap",
});

const satoshi = localFont({
  src: [
    { path: "../fonts/Satoshi-Variable.woff2", weight: "300 900", style: "normal" },
    { path: "../fonts/Satoshi-VariableItalic.woff2", weight: "300 900", style: "italic" },
  ],
  variable: "--font-satoshi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "CII.IA | De la idea a la operación",
  description:
    "Centro de Innovación Industrial en Inteligencia Artificial. Desde el PIIT, en Nuevo León, acompañamos a empresas e instituciones a llevar la inteligencia artificial de la idea a la operación.",
  metadataBase: new URL(SITE_URL),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="es-MX"
      className={`${clashDisplay.variable} ${satoshi.variable} ${GeistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full bg-background text-foreground grain">
        <BeamsGlobalMount />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <SplashCursorMount />
      </body>
    </html>
  );
}
