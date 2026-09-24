import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { LanguageProvider } from "@/lib/LanguageContext";
import SmoothAnchorScroll from "@/components/SmoothAnchorScroll";
import PostHogProvider from "@/components/analytics/PostHogProvider";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "Jinho (Roy) Yon | Software Engineer";
const DESCRIPTION =
  "Portfolio of Jinho (Roy) Yon — Software Engineer specializing in fullstack development and applied AI/LLM systems.";

// The preview image itself comes from app/opengraph-image.tsx.
export const metadata: Metadata = {
  metadataBase: new URL("https://yjinho.com"),
  title: TITLE,
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "Jinho (Roy) Yon",
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <PostHogProvider>
          <LanguageProvider>
            <SmoothAnchorScroll />
            {children}
          </LanguageProvider>
        </PostHogProvider>
      </body>
    </html>
  );
}
