"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, Mail } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

// WebGL living room: client-only and code-split so three.js stays out of the main bundle.
const LivingRoom = dynamic(() => import("./hero/LivingRoom"), { ssr: false });

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
  const reduce = useReducedMotion();

  return (
    <section
      id="top"
      className="relative h-[calc(100svh-4rem)] min-h-[560px] w-full overflow-hidden break-keep border-b border-zinc-200 bg-background"
    >
      <LivingRoom className="absolute inset-0" />

      {/* Fade the scene out behind the title so it stays legible. */}
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 h-2/5 bg-linear-to-t from-background via-background/80 to-transparent"
        aria-hidden="true"
      />

      <motion.div
        className="relative mx-auto flex h-full max-w-6xl flex-col justify-end gap-8 px-6 pb-20 sm:pb-24"
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
          <a
            href="#contact"
            className="inline-flex items-center gap-2 text-sm font-medium text-zinc-600 transition-colors hover:text-foreground"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            {t.contactMe}
          </a>
        </motion.div>
      </motion.div>

      {/* Quiet scroll cue, centred at the foot of the first screen. */}
      <motion.a
        href="#projects"
        className="absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-xs text-zinc-400 transition-colors hover:text-zinc-700 focus-visible:outline-2 focus-visible:outline-offset-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        {t.scrollCue}
        <motion.span
          animate={reduce ? undefined : { y: [0, 4, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="flex"
        >
          <ArrowDown className="h-3.5 w-3.5" strokeWidth={1.5} />
        </motion.span>
      </motion.a>
    </section>
  );
}
