"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, FileText, Languages } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(true);
  const { language, toggleLanguage } = useLanguage();
  const t = translations[language].nav;

  // eslint-disable-next-line react-hooks/set-state-in-effect -- portal target (document.body) only exists client-side
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const hero = document.getElementById("top");
    if (!hero) return;
    // Nav is "dark mode" (transparent over the black hero) as long as the hero
    // still extends below the 64px header; once it scrolls past, flip to light.
    const observer = new IntersectionObserver(
      ([entry]) => setIsDark(entry.isIntersecting),
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  const LINKS = [
    { href: "#projects", label: t.links.projects },
    { href: "#architecture", label: t.links.approach },
    { href: "#skills", label: t.links.skills },
    { href: "#experience", label: t.links.experience },
    { href: "#contact", label: t.links.contact },
  ];

  const linkClass = isDark
    ? "whitespace-nowrap text-sm text-zinc-300 hover:text-white transition-colors"
    : "whitespace-nowrap text-sm text-zinc-600 hover:text-zinc-900 transition-colors";

  const resumeClass = isDark
    ? "inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-white/40 bg-white text-zinc-900 text-sm px-4 py-2 hover:bg-zinc-200 transition-colors"
    : "inline-flex shrink-0 items-center gap-2 whitespace-nowrap border border-zinc-900 bg-zinc-900 text-white text-sm px-4 py-2 hover:bg-zinc-700 hover:border-zinc-700 transition-colors";

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition-colors duration-300 ${
        isDark ? "border-white/10 bg-black/90" : "border-zinc-200 bg-white/90"
      }`}
    >
      <div className="mx-auto max-w-6xl px-6 h-16 flex items-center justify-between">
        <a
          href="#top"
          className={`shrink-0 whitespace-nowrap font-semibold tracking-tight transition-colors duration-300 ${
            isDark ? "text-white" : "text-zinc-900"
          }`}
        >
          {t.name}
        </a>

        <nav className="hidden lg:flex items-center gap-6">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={linkClass}>
              {link.label}
            </a>
          ))}
          <button
            onClick={toggleLanguage}
            className={`inline-flex shrink-0 items-center gap-1.5 ${linkClass}`}
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
            className={resumeClass}
          >
            <FileText className="h-4 w-4" strokeWidth={1.75} />
            {t.resume}
          </motion.a>
        </nav>

        <div className="flex lg:hidden items-center gap-4">
          <button
            onClick={toggleLanguage}
            className={`inline-flex items-center gap-1.5 ${linkClass}`}
            aria-label="Toggle language"
          >
            <Languages className="h-4 w-4" strokeWidth={1.75} />
            {t.langToggle}
          </button>
          <button
            className={`transition-colors duration-300 ${isDark ? "text-white" : "text-zinc-700"}`}
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {mounted &&
        createPortal(
          <AnimatePresence>
            {open && (
              <>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onClick={() => setOpen(false)}
                  className="lg:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-black/10 backdrop-blur-sm"
                  aria-hidden="true"
                />
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                  className="lg:hidden fixed inset-x-0 top-16 z-40 border-b border-zinc-200 bg-white/85 backdrop-blur-xl shadow-lg"
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
              </>
            )}
          </AnimatePresence>,
          document.body
        )}
    </header>
  );
}
