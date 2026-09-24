"use client";

import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Experience() {
  const { language } = useLanguage();
  const t = translations[language].experience;

  return (
    <section id="experience" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="divide-y divide-zinc-200 border-y border-zinc-200">
          {t.roles.map((role) => (
            <RevealItem key={role.title} hover={false} className="grid gap-3 py-8 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <span className="pt-1.5 font-mono text-xs uppercase tracking-widest text-zinc-500">{role.period}</span>
              <div className="max-w-3xl">
                <h3 className="text-lg font-semibold tracking-tight text-foreground">{role.title}</h3>
                <p className="mt-1 text-sm text-zinc-500">{role.company}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {role.achievements.map((a) => (
                    <li key={a} className="relative pl-4 text-sm leading-relaxed text-zinc-600 before:absolute before:left-0 before:text-zinc-300 before:content-['—']">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
