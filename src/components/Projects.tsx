"use client";

import { useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight, Github } from "lucide-react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import Polaroid from "./Polaroid";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { PROJECTS_META } from "@/lib/projectsMeta";

const TILTS = [-4, 3, -2, 5];
const SAG = 28; // how far the line dips at its middle, in px
const LINE_TOP = 10;

/** y of the line at fraction f of its width (quadratic curve from edge to edge). */
const lineY = (f: number) => LINE_TOP + 4 * SAG * f * (1 - f);

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const projects = t.items.map((item, i) => ({
    ...item,
    ...PROJECTS_META[i],
    name: item.title.split(" — ")[0],
    tagline: item.title.split(" — ")[1],
  }));
  const reduce = useReducedMotion();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const go = (to: number) => {
    if (to < 0 || to >= projects.length || to === index) return;
    setState([to, to > index ? 1 : -1]);
  };
  const project = projects[index];

  return (
    <section id="projects" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        {/* Desktop: every project hangs on one line; click a photo to open it below. */}
        <div className="relative hidden h-[350px] md:block">
          <svg className="absolute inset-x-0 top-0 h-20 w-full overflow-visible" viewBox="0 0 100 80" preserveAspectRatio="none" aria-hidden="true">
            <path d={`M0 ${LINE_TOP} Q50 ${LINE_TOP + 2 * SAG} 100 ${LINE_TOP}`} fill="none" stroke="#a1a1aa" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute left-0 top-[6px] size-2 -translate-x-1/2 rounded-full bg-zinc-400" aria-hidden="true" />
          <span className="absolute right-0 top-[6px] size-2 translate-x-1/2 rounded-full bg-zinc-400" aria-hidden="true" />
          {projects.map((p, i) => {
            const f = (i + 0.5) / projects.length;
            return (
              <Polaroid
                key={p.slug}
                src={p.images[0]}
                position={p.thumbPosition}
                name={p.name}
                period={p.period}
                tilt={TILTS[i % TILTS.length]}
                selected={i === index}
                onSelect={() => go(i)}
                nudge={i === index ? index + 1 : 0}
                className="absolute w-[min(13rem,20vw)] -translate-x-1/2"
                style={{ left: `${f * 100}%`, top: lineY(f) - 18 }}
              />
            );
          })}
        </div>

        {/* Phone: the photos hang side by side, the front one is open below. */}
        <div className="md:hidden">
          <motion.div
            className="relative h-[320px] touch-pan-y overflow-hidden"
            onPanEnd={(_, info) => {
              const { x, y } = info.offset;
              // Only a clearly sideways swipe changes the item; a scroll that drifts sideways doesn't.
              if (Math.abs(x) < 50 || Math.abs(x) < Math.abs(y) * 1.5) return;
              go(index + (x < 0 ? 1 : -1));
            }}
          >
            <span className="absolute inset-x-0 top-[10px] h-[1.5px] bg-zinc-400" aria-hidden="true" />
            {projects.map((p, i) => {
              const offset = i - index;
              const front = offset === 0;
              return (
                <motion.div
                  key={p.slug}
                  className="absolute left-1/2 top-0 -ml-24 w-48 origin-top"
                  initial={false}
                  animate={{ x: offset * 170, scale: front ? 1 : 0.8 }}
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
                  style={{ zIndex: projects.length - Math.abs(offset) }}
                >
                  <Polaroid
                    src={p.images[0]}
                position={p.thumbPosition}
                    name={p.name}
                    period={p.period}
                    tilt={TILTS[i % TILTS.length]}
                    selected={front}
                    onSelect={() => go(i)}
                    draggable={false}
                    focusable={false}
                    nudge={front ? index + 1 : 0}
                  />
                </motion.div>
              );
            })}
          </motion.div>

          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={() => go(index - 1)}
              disabled={index === 0}
              aria-label={t.prev}
              className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 transition-[transform,opacity] active:scale-95 disabled:opacity-30"
            >
              <ChevronLeft className="size-5" />
            </button>
            <span className="text-sm tabular-nums text-zinc-500" aria-live="polite">
              {index + 1} / {projects.length}
            </span>
            <button
              type="button"
              onClick={() => go(index + 1)}
              disabled={index === projects.length - 1}
              aria-label={t.next}
              className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 transition-[transform,opacity] active:scale-95 disabled:opacity-30"
            >
              <ChevronRight className="size-5" />
            </button>
          </div>
        </div>

        {/* The open project */}
        <div className="relative mt-8 overflow-hidden md:mt-4">
          <AnimatePresence mode="wait" initial={false} custom={dir}>
            <motion.article
              key={project.slug}
              custom={dir}
              variants={{
                enter: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * 32 }),
                center: { opacity: 1, x: 0 },
                exit: (d: number) => ({ opacity: 0, x: reduce ? 0 : d * -32 }),
              }}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="grid border border-zinc-200 bg-white md:grid-cols-2"
            >
              <ProjectImageCarousel aspect="aspect-16/9" images={project.images} className="hidden border-0 border-zinc-200 md:block md:border-r" />

              <div className="flex flex-col p-8 md:p-10">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{project.category}</span>
                <Link href={`/projects/${project.slug}`} className="group mt-3 focus-visible:outline-2 focus-visible:outline-offset-4">
                  <h3 className="text-foreground">
                    <span className="block text-2xl font-semibold tracking-tight transition-colors group-hover:text-zinc-600">{project.name}</span>
                    <span className="mt-1 block text-base font-normal text-zinc-500">{project.tagline}</span>
                  </h3>
                </Link>
                <p className="mt-5 text-[15px] leading-relaxed text-zinc-700">{project.summary}</p>
                <p className="mt-4 text-xs leading-relaxed text-zinc-500">{project.stack.join(" · ")}</p>

                <div className="mt-auto flex items-center gap-6 pt-8 text-sm font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.75} />
                    {t.githubLabel}
                  </a>
                </div>
              </div>
            </motion.article>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
