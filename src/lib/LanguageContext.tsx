"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Language = "en" | "ko";

function getPreferredLanguage(): Language {
  try {
    const stored = window.localStorage.getItem("language");
    if (stored === "en" || stored === "ko") return stored;
  } catch {
    // Browser preferences still work when storage is unavailable.
  }

  const languages = navigator.languages?.length
    ? navigator.languages
    : [navigator.language];

  for (const locale of languages) {
    const language = locale.toLowerCase().split("-")[0];
    if (language === "en" || language === "ko") return language;
  }

  return "en";
}

const LanguageContext = createContext<{
  language: Language;
  toggleLanguage: () => void;
} | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  // Always starts as "en" to match the server-rendered markup; the stored
  // or browser preference is applied after mount to avoid a hydration mismatch.
  const [language, setLanguage] = useState<Language>("en");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser preferences and storage are only available after mount
    setLanguage(getPreferredLanguage());
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const toggleLanguage = () => {
    const nextLanguage = language === "en" ? "ko" : "en";
    setLanguage(nextLanguage);
    try {
      // Only an explicit choice should override future browser preferences.
      window.localStorage.setItem("language", nextLanguage);
    } catch {
      // Keep the switch usable even when the browser blocks storage.
    }
  };

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
