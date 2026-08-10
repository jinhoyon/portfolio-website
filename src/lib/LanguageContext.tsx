"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "ko";

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always starts as "en" to match the server-rendered markup; the stored
  // preference is applied after mount to avoid a hydration mismatch.
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    const stored = window.localStorage.getItem("language");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from localStorage, a client-only external source unavailable during SSR
    if (stored === "en" || stored === "ko") setLanguage(stored);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("language", language);
  }, [language]);

  const toggleLanguage = () => setLanguage((l) => (l === "en" ? "ko" : "en"));

  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within a LanguageProvider");
  return ctx;
}
