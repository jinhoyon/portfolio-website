"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import Reveal from "./motion/Reveal";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Footer() {
  const { language } = useLanguage();
  const t = translations[language].footer;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");
    const subject = encodeURIComponent(`Portfolio contact from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:jyon1122@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="bg-zinc-900 text-white">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <Reveal className="border border-zinc-700 p-10 mb-14">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight max-w-lg">
            {t.heading}
          </h2>
          <p className="mt-3 text-zinc-400 max-w-md">{t.subtext}</p>

          <div className="mt-6 flex flex-wrap items-center gap-6">
            <motion.a
              href="mailto:jyon1122@gmail.com"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 text-sm font-medium bg-white text-zinc-900 px-5 py-3 hover:bg-zinc-200 transition-colors"
            >
              <Mail className="h-4 w-4" strokeWidth={1.75} />
              jyon1122@gmail.com
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

        <Reveal delay={0.1} className="grid md:grid-cols-2 gap-14">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              {t.sendMessage}
            </span>
            <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4 max-w-md">
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="name">
                  {t.formName}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  placeholder={t.formNamePlaceholder}
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="email">
                  {t.formEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t.formEmailPlaceholder}
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400"
                />
              </div>
              <div>
                <label className="text-xs text-zinc-400 block mb-1.5" htmlFor="message">
                  {t.formMessage}
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  required
                  placeholder={t.formMessagePlaceholder}
                  className="w-full bg-transparent border border-zinc-700 px-3.5 py-2.5 text-sm placeholder:text-zinc-600 focus:outline-none focus:border-zinc-400 resize-none"
                />
              </div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="self-start bg-white text-zinc-900 text-sm font-medium px-5 py-2.5 hover:bg-zinc-200 transition-colors"
              >
                {t.sendButton}
              </motion.button>
            </form>
          </div>

          <div className="flex flex-col justify-end">
            <p className="text-sm text-zinc-500 leading-relaxed">
              {t.aboutLine1}
              <br />
              {t.aboutLine2}
            </p>
            <p className="mt-6 text-xs text-zinc-600">{t.copyright}</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
