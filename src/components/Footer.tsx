"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./motion/Reveal";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// Stored split and reversed so the address never appears verbatim in the
// served HTML/JS, which keeps it away from simple scraping bots.
const EMAIL_PARTS = ["2211noyj", "moc.liamg"];
const decodeEmail = () =>
  EMAIL_PARTS.map((p) => p.split("").reverse().join("")).join("@");

export default function Footer() {
  const [email, setEmail] = useState<string | null>(null);
  // eslint-disable-next-line react-hooks/set-state-in-effect -- assemble the address client-side only, after hydration
  useEffect(() => setEmail(decodeEmail()), []);

  const { language } = useLanguage();
  const t = translations[language].footer;

  return (
    <section id="contact" className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="mb-16">
          <h2 className="max-w-xl text-3xl font-semibold tracking-tight sm:text-4xl">
            {t.heading}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-md">{t.subtext}</p>

          <div className="mt-8 flex flex-wrap items-center gap-6">
            <motion.a
              href={
                email
                  ? `https://mail.google.com/mail/?view=cm&fs=1&to=${email}`
                  : undefined
              }
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium bg-white text-zinc-900 px-5 py-3 hover:bg-zinc-200 transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              {email ?? t.emailLabel}
            </motion.a>
            <a
              href="https://github.com/jinhoyon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Github className="h-4 w-4" strokeWidth={1.75} />
              {t.github}
            </a>
            <a
              href="https://www.linkedin.com/in/jinhoyon"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-zinc-300 hover:text-white"
            >
              <Linkedin className="h-4 w-4" strokeWidth={1.75} />
              {t.linkedin}
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="border-t border-zinc-800 pt-8 text-sm text-zinc-500 leading-relaxed">
            {t.aboutLine1}
            <br />
            {t.aboutLine2}
          </p>
          <p className="mt-6 text-xs text-zinc-600">{t.copyright}</p>
        </Reveal>
      </div>
    </section>
  );
}
