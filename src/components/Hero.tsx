"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import ChladniBackground from "./hero/chladni/ChladniBackground";

const METRICS = [
  { value: "2025", label: "UC Davis CS&E Grad" },
  { value: "4", label: "Projects Shipped" },
  { value: "2", label: "Publications (ACM/INTERACT)" },
];

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
  return (
    <section
      id="top"
      className="relative h-screen min-h-[640px] w-full overflow-hidden bg-[#0d0f12]"
    >
      <ChladniBackground />

      {/* Vignette / legibility overlay between the sand canvas and text */}
      <div
        className="pointer-events-none absolute inset-0 z-10"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 34%, rgba(13,15,18,0.88) 0%, rgba(13,15,18,0.55) 45%, rgba(13,15,18,0) 75%), linear-gradient(to bottom, rgba(13,15,18,0.65) 0%, rgba(13,15,18,0.1) 22%, rgba(13,15,18,0.1) 70%, rgba(13,15,18,0.85) 100%)",
        }}
      />

      <motion.div
        className="relative z-10 mx-auto flex h-full max-w-6xl flex-col justify-center px-6"
        initial="hidden"
        animate="show"
        variants={container}
      >
        <motion.span
          variants={item}
          className="mb-6 inline-block w-fit rounded-full border border-white/15 px-3 py-1 font-mono text-xs uppercase tracking-widest text-zinc-300 backdrop-blur-sm"
        >
          Software Engineer
        </motion.span>

        <motion.h1
          variants={item}
          className="max-w-2xl text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl md:text-6xl"
        >
          Building fullstack products and AI-powered systems.
        </motion.h1>

        <motion.p
          variants={item}
          className="mt-6 max-w-lg text-lg leading-relaxed text-zinc-300"
        >
          UC Davis Computer Science &amp; Engineering graduate specializing in fullstack
          development and applied AI/LLM systems — from HCI research shipped as
          production Android and React apps to LLM-driven analysis platforms. I like
          turning that work into something a non-engineer can pick up and run with,
          not just something that ships.
        </motion.p>

        <motion.div variants={item} className="mt-8 flex flex-wrap gap-4">
          <motion.a
            href="#projects"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 bg-white px-5 py-3 text-sm font-medium text-zinc-900 transition-colors hover:bg-zinc-200"
          >
            View Projects
            <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
          </motion.a>
          <motion.a
            href="#contact"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 border border-white/25 px-5 py-3 text-sm font-medium text-white transition-colors hover:border-white/60"
          >
            <Mail className="h-4 w-4" strokeWidth={1.75} />
            Contact Me
          </motion.a>
        </motion.div>

        <motion.dl
          variants={item}
          className="mt-12 grid max-w-md grid-cols-3 border-t border-white/15 pt-6"
        >
          {METRICS.map((m) => (
            <div key={m.label}>
              <dt className="sr-only">{m.label}</dt>
              <dd className="text-2xl font-semibold text-white">{m.value}</dd>
              <dd className="mt-1 text-xs text-zinc-400">{m.label}</dd>
            </div>
          ))}
        </motion.dl>
      </motion.div>
    </section>
  );
}
