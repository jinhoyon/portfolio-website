"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import PegTag from "./PegTag";
import SectionHeader from "./SectionHeader";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { PROJECTS_META } from "@/lib/projectsMeta";
import { SKILL_USES, type SkillUse } from "@/lib/skillUses";

// Tempered hardboard with a 24px hole grid, and one tag colour per category.
const BOARD = "#c39a6b";
const HOLE = "#8a6440";
const HOLES = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Ccircle cx='12' cy='12' r='2.2' fill='%238a6440'/%3E%3C/svg%3E")`;
const TAG_COLORS = ["#ffd84d", "#8ec5ff", "#9be0b0", "#ffb3c7", "#f4f4f5"];
const TILTS = [-3, 2, -1, 3, -2, 1];

type Place = { key: SkillUse; href: string; name: string; note: string; image?: string; position?: string; tile?: { label: string; bg: string; ink: string } };

export default function Skills() {
  const { language } = useLanguage();
  const all = translations[language];
  const t = all.skills;
  const reduce = useReducedMotion();
  const [skill, setSkill] = useState<string>(t.categories[0].items[0]);
  const [presses, setPresses] = useState(0);
  const pick = (item: string) => {
    setSkill(item);
    setPresses((n) => n + 1);
  };

  const place = (key: SkillUse): Place => {
    if (key === "site") {
      return { key, href: "#top", name: t.thisSite, note: "Next.js · TypeScript · Three.js", tile: { label: "JY", bg: "#27272a", ink: "#fafaf9" } };
    }
    if (key === "iol") {
      const role = all.experience.roles.find((r) => r.org === "iol")!;
      return { key, href: "#experience", name: "Interactive Organisms Lab", note: role.badgeRole, tile: { label: "IOL", bg: "#ffbf00", ink: "#022851" } };
    }
    const i = PROJECTS_META.findIndex((m) => m.slug === key);
    const [name, tagline] = all.projects.items[i].title.split(" — ");
    const meta = PROJECTS_META[i];
    return { key, href: `/projects/${key}`, name, note: tagline, image: meta.images[0], position: meta.thumbPosition };
  };

  const uses = SKILL_USES[skill] ?? [];

  const panel = (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={skill}
        initial={{ opacity: 0, y: reduce ? 0 : 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: reduce ? 0 : -4 }}
        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-4 md:grid-cols-[14rem_1fr] md:gap-8"
      >
        <div>
          <p className="text-xl font-semibold tracking-tight text-foreground">{skill}</p>
          {uses.length > 0 && <p className="mt-1 text-sm text-zinc-500">{t.usedIn}</p>}
        </div>
        {uses.length ? (
          <ul className="flex flex-wrap gap-3">
            {uses.map((u) => {
              const p = place(u);
              return (
                <li key={u}>
                  <Link
                    href={p.href}
                    className="group flex items-center gap-3 rounded-[12px] bg-white p-2 pr-4 transition-colors hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2"
                  >
                    {p.image ? (
                      <span className="relative block size-12 shrink-0 overflow-hidden rounded-[6px] bg-zinc-100">
                        <Image src={p.image} alt="" fill sizes="48px" className="object-cover" style={{ objectPosition: p.position }} />
                      </span>
                    ) : (
                      <span
                        className="flex size-12 shrink-0 items-center justify-center rounded-[6px] text-xs font-semibold"
                        style={{ background: p.tile!.bg, color: p.tile!.ink }}
                      >
                        {p.tile!.label}
                      </span>
                    )}
                    <span className="flex flex-col">
                      <span className="text-sm font-semibold text-foreground">{p.name}</span>
                      <span className="text-xs text-zinc-500">{p.note}</span>
                    </span>
                    <ArrowRight className="ml-1 size-4 text-zinc-400 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </Link>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="self-end text-[15px] text-zinc-600">{t.notShown}</p>
        )}
      </motion.div>
    </AnimatePresence>
  );

  return (
    <section id="skills" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        {/* The pegboard: one strip per category, each labelled with embossed tape, its tools hanging on pegs. */}
        <motion.div
          className="flex flex-col gap-6 rounded-[14px] px-4 pb-6 pt-5 sm:px-6"
          style={{ backgroundColor: BOARD, backgroundImage: HOLES, backgroundSize: "24px 24px" }}
          initial={{ opacity: 0, y: reduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          {t.categories.map(({ title, items }, row) => {
            const rowSelected = (items as readonly string[]).includes(skill);
            return (
              <div key={title} className="flex flex-col gap-3 md:flex-row md:items-start md:gap-4">
                <h3 className="self-start rounded-[3px] bg-zinc-900 px-2.5 py-1 text-[13px] font-semibold tracking-wide text-zinc-50 md:mt-5 md:w-40 md:shrink-0">
                  {title}
                </h3>
                <div className="flex flex-wrap gap-x-3 gap-y-4">
                  {items.map((item, j) => (
                    <PegTag
                      key={item}
                      label={item}
                      color={TAG_COLORS[row % TAG_COLORS.length]}
                      tilt={TILTS[(row + j) % TILTS.length]}
                      selected={item === skill}
                      hasUses={!!SKILL_USES[item]}
                      nudge={item === skill ? presses : 0}
                      holeColor={HOLE}
                      onPress={() => pick(item)}
                    />
                  ))}
                </div>
                {/* Phone: the answer opens right under the strip you picked from. */}
                {rowSelected && (
                  <div className="rounded-[10px] bg-[#fafaf9] p-4 md:hidden" aria-live="polite">
                    {panel}
                  </div>
                )}
              </div>
            );
          })}
        </motion.div>

        <div className="mt-8 hidden md:block" aria-live="polite">
          {panel}
        </div>

        <p className="mt-10 text-sm text-zinc-600">
          <span className="font-medium text-foreground">{t.certifiedLabel}</span> {t.certifiedText}
        </p>
      </div>
    </section>
  );
}
