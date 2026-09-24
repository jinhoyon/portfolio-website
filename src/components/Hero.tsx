"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// WebGL illustration: client-only and code-split so three.js stays out of the main bundle.
const ParticleBust = dynamic(() => import("./hero/ParticleBust"), { ssr: false });

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.4 } },
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
      className="relative h-[calc(100svh-4rem)] min-h-[560px] w-full overflow-hidden break-keep border-b border-zinc-200 bg-background"
    >
      <ParticleBust className="absolute inset-0" />

      {/* Fade the scene out behind the title so it stays legible. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background via-background/80 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto flex h-full max-w-6xl flex-col justify-end gap-8 px-6 pb-12 sm:pb-16"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.div variants={item} className="flex flex-col gap-4">
          <h1 className="max-w-2xl text-balance text-3xl font-semibold leading-[1.1] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {t.heading}
          </h1>
          {/* Role line for recruiters, kept quieter than the headline. */}
          <p className="text-sm text-zinc-500 sm:text-base">{t.subheading}</p>
        </motion.div>

        <motion.div variants={item} className="flex flex-wrap items-center gap-6">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-zinc-800 px-5 py-3 text-sm font-medium text-white transition-colors hover:bg-zinc-600"
          >
            {t.viewProjects}
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </motion.a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            {t.contactMe}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
