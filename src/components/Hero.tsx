"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language].hero;

  return (
    <section
      id="top"
      className="relative w-full break-keep border-b border-zinc-200 bg-background"
    >
      <motion.div
        className="mx-auto flex min-h-[calc(100vh-4rem)] max-w-6xl flex-col justify-center px-6 py-24"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.h1
          variants={item}
          className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          {t.heading}
        </motion.h1>

        <motion.div variants={item} className="mt-6 max-w-xl text-lg text-zinc-600">
          <p className="leading-relaxed">{t.intro}</p>
          <ul className="mt-4 flex flex-col gap-2.5">
            {t.points.map((point) => (
              <li key={point} className="flex gap-3 leading-relaxed">
                <span className="mt-[0.7em] h-1.5 w-1.5 shrink-0 bg-zinc-400" aria-hidden="true" />
                {point}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-zinc-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-600"
          >
            {t.viewProjects}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-5 py-3 text-sm font-medium text-foreground transition-colors hover:border-zinc-800"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            {t.contactMe}
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
