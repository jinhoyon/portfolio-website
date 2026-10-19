"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import SectionHeader from "./SectionHeader";
import UsedInPolaroid from "./UsedInPolaroid";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { PROJECTS_META } from "@/lib/projectsMeta";
import { SKILL_USES, type SkillUse } from "@/lib/skillUses";

const TILTS = [-3, 2, -2, 3];

type Place = { href: string; name: string; image?: string; position?: string; tile?: { label: string; bg: string; ink: string } };

export default function Skills() {
  const { language } = useLanguage();
  const all = translations[language];
  const t = all.skills;
  const reduce = useReducedMotion();
  const [skill, setSkill] = useState<string>(t.categories[0].items[0]);

  const place = (key: SkillUse): Place => {
    if (key === "site") return { href: "#top", name: t.thisSite, tile: { label: "JY", bg: "#27272a", ink: "#fafaf9" } };
    if (key === "iol") return { href: "#experience", name: "Interactive Organisms Lab", tile: { label: "IOL", bg: "#ffbf00", ink: "#022851" } };
    const i = PROJECTS_META.findIndex((m) => m.slug === key);
    const meta = PROJECTS_META[i];
    return { href: `/projects/${key}`, name: all.projects.items[i].title.split(" — ")[0], image: meta.images[0], position: meta.thumbPosition };
  };

  const uses = SKILL_USES[skill] ?? [];

  const answer = (showName: boolean) => (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={skill}
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {showName && <p className="mb-1 text-2xl font-semibold tracking-tight text-foreground">{skill}</p>}
        <p className="text-sm text-zinc-500">{uses.length ? t.usedIn : t.notShown}</p>
        {uses.length > 0 && (
          <div className="relative mt-6">
            <span aria-hidden="true" className="absolute inset-x-0 top-[9px] h-[1.5px] bg-zinc-400" />
            <ul className="relative grid grid-cols-4 gap-3">
              {uses.map((u, i) => (
                <li key={u}>
                  <UsedInPolaroid {...place(u)} tilt={TILTS[i % TILTS.length]} />
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="skills" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <div className="grid gap-12 lg:grid-cols-[1fr_27rem]">
          {/* Plain rows; each skill is a quiet button. */}
          <div className="divide-y divide-zinc-200 border-y border-zinc-200">
            {t.categories.map(({ title, items }) => (
              <div key={title} className="grid gap-2 py-5 sm:grid-cols-[9rem_1fr] sm:gap-x-6">
                <h3 className="pt-0.5 text-sm text-zinc-500">{title}</h3>
                <ul className="flex flex-wrap gap-x-5 gap-y-1.5">
                  {items.map((item) => {
                    const selected = item === skill;
                    return (
                      <li key={item}>
                        <button
                          type="button"
                          onClick={() => setSkill(item)}
                          aria-pressed={selected}
                          className={`text-[15px] underline-offset-[6px] transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                            selected
                              ? "font-semibold text-zinc-950 underline decoration-2 decoration-zinc-900"
                              : "text-zinc-700 decoration-zinc-300 hover:text-zinc-950 hover:underline"
                          }`}
                        >
                          {item}
                        </button>
                      </li>
                    );
                  })}
                </ul>
                {/* Below lg the answer opens right under the row you picked from. */}
                {(items as readonly string[]).includes(skill) && (
                  <div className="mt-4 sm:col-start-2 lg:hidden" aria-live="polite">
                    {answer(false)}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* The answer: where the picked skill was used, hung on a short line. */}
          <div className="hidden lg:sticky lg:top-28 lg:block lg:self-start" aria-live="polite">
            {answer(true)}
          </div>
        </div>

        <p className="mt-10 text-sm text-zinc-600">
          <span className="font-medium text-foreground">{t.certifiedLabel}</span> {t.certifiedText}
        </p>
      </div>
    </section>
  );
}
