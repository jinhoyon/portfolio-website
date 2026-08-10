import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import SmoothAnchorScroll from "@/components/SmoothAnchorScroll";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jinho (Roy) Yon | Software Engineer",
  description:
    "Portfolio of Jinho (Roy) Yon — Software Engineer specializing in fullstack development and applied AI/LLM systems.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <LanguageProvider>
          <SmoothAnchorScroll />
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
