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
  title: " — Mark LXXXV",
  description:
    "Arc reactor online. J.A.R.V.I.S. standing by. Scroll to engage the Mark LXXXV.",
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
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
