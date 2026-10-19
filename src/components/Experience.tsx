"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import OrgBadge, { type OrgId } from "./OrgBadge";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

type Role = {
  org: OrgId;
  badgeRole: string;
  period: string;
  title: string;
  company: string;
  achievements: readonly string[];
};

function RoleBody({ role }: { role: Role }) {
  return (
    <>
      <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{role.period}</span>
      {/* The badge shows the organization and role; the heading stays for screen readers. */}
      <h3 className="sr-only">{role.title} — {role.company}</h3>
      <ul className="mt-4 flex flex-col gap-2.5">
        {role.achievements.map((a) => (
          <li key={a} className="relative pl-4 text-[15px] leading-relaxed text-zinc-700 before:absolute before:left-0 before:text-zinc-300 before:content-['—']">
            {a}
          </li>
        ))}
      </ul>
    </>
  );
}

const tiltFor = (i: number) => (i % 2 === 0 ? 4 : -3);

/** Phone layout: the badges hang side by side on one rail; the front one's role is shown below. */
function MobileCarousel({ roles, badgeName, prevLabel, nextLabel }: { roles: readonly Role[]; badgeName: string; prevLabel: string; nextLabel: string }) {
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const reduce = useReducedMotion();
  const go = (to: number) => {
    if (to < 0 || to >= roles.length || to === index) return;
    setState([to, to > index ? 1 : -1]);
  };
  const role = roles[index];

  return (
    <div className="sm:hidden">
      <motion.div
        className="relative h-[330px] touch-pan-y overflow-hidden border-t border-zinc-200"
        onPanEnd={(_, info) => {
          const { x, y } = info.offset;
          // Only a clearly sideways swipe changes the item; a scroll that drifts sideways doesn't.
          if (Math.abs(x) < 50 || Math.abs(x) < Math.abs(y) * 1.5) return;
          go(index + (x < 0 ? 1 : -1));
        }}
      >
        {roles.map((r, i) => {
          const offset = i - index;
          const front = offset === 0;
          return (
            <motion.button
              key={r.org}
              type="button"
              tabIndex={-1}
              onClick={() => go(i)}
              className="absolute left-1/2 top-0 w-44 -ml-22 origin-top"
              initial={false}
              animate={{ x: offset * 150, scale: front ? 1 : 0.78, opacity: front ? 1 : 0.55 }}
              transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 260, damping: 30 }}
              style={{ zIndex: roles.length - Math.abs(offset) }}
            >
              <OrgBadge org={r.org} name={badgeName} role={r.badgeRole} tilt={tiltFor(i)} draggable={false} nudge={front ? index + 1 : 0} />
            </motion.button>
          );
        })}
      </motion.div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => go(index - 1)}
          disabled={index === 0}
          aria-label={prevLabel}
          className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 transition-[transform,background-color,opacity] active:scale-95 disabled:opacity-30"
        >
          <ChevronLeft className="size-5" />
        </button>
        <span className="text-sm tabular-nums text-zinc-500" aria-live="polite">
          {index + 1} / {roles.length}
        </span>
        <button
          type="button"
          onClick={() => go(index + 1)}
          disabled={index === roles.length - 1}
          aria-label={nextLabel}
          className="flex size-11 items-center justify-center rounded-full bg-zinc-100 text-zinc-800 transition-[transform,background-color,opacity] active:scale-95 disabled:opacity-30"
        >
          <ChevronRight className="size-5" />
        </button>
      </div>

      <div className="relative mt-8 overflow-hidden pb-4">
        <AnimatePresence mode="wait" initial={false} custom={dir}>
          <motion.div
            key={role.org}
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
          >
            <RoleBody role={role} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section id="experience" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <MobileCarousel roles={t.roles} badgeName={t.badgeName} prevLabel={t.prev} nextLabel={t.next} />

        <RevealGroup className="hidden divide-y divide-zinc-200 border-y border-zinc-200 sm:block">
          {t.roles.map((role, i) => (
            <RevealItem
              key={role.org}
              hover={false}
              className="grid grid-cols-[13rem_1fr] gap-10 pb-14"
            >
              {/* The badge hangs from the rule above its row. */}
              <OrgBadge org={role.org} name={t.badgeName} role={role.badgeRole} tilt={tiltFor(i)} />
              <div className="max-w-3xl pt-12">
                <RoleBody role={role} />
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
