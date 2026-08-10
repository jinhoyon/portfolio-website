"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  const LINKS = [
    { href: "#projects", label: t.links.projects },
    { href: "#architecture", label: t.links.approach },
    { href: "#skills", label: t.links.skills },
    { href: "#experience", label: t.links.experience },
    { href: "#contact", label: t.links.contact },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/90 backdrop-blur">
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a href="#top" className="shrink-0 whitespace-nowrap font-semibold tracking-tight text-zinc-900">
          {t.name} <span className="text-zinc-400 font-normal">| {t.role}</span>
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="whitespace-nowrap text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className="inline-flex shrink-0 items-center gap-1.5 whitespace-nowrap text-sm text-zinc-600 hover:text-zinc-900 transition-colors"
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" strokeWidth={1.75} />
            {t.langToggle}
          </button>
          <motion.a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-zinc-900 bg-zinc-900 text-white text-sm px-4 py-2 hover:bg-zinc-700 hover:border-zinc-700 transition-colors"
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            {t.resume}
          </motion.a>
        </nav>

        <button
          className="lg:hidden text-zinc-700"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-zinc-200 bg-white"
          >
            <div className="px-6 py-4 flex flex-col gap-4">
              {LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm text-zinc-600 hover:text-zinc-900"
                >
                  {link.label}
                </a>
              ))}
              <button
                onClick={toggleLanguage}
                className="inline-flex items-center gap-1.5 text-sm text-zinc-600 hover:text-zinc-900 w-fit"
                aria-label="Toggle language"
              >
                <Languages className="h-4 w-4" strokeWidth={1.75} />
                {t.langToggle}
              </button>
              <a
                href="/resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 border border-zinc-900 bg-zinc-900 text-white text-sm px-4 py-2"
              >
                <FileText className="h-4 w-4" strokeWidth={1.75} />
                {t.resume}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
