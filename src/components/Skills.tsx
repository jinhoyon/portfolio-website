"use client";

import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language].skills;

  return (
    <section id="skills" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="divide-y divide-zinc-200 border-y border-zinc-200">
          {t.categories.map(({ title, items }) => (
            <RevealItem key={title} hover={false} className="grid gap-1 py-5 sm:grid-cols-[12rem_1fr] sm:gap-6">
              <h3 className="text-sm text-zinc-500">{title}</h3>
              <p className="text-sm leading-relaxed text-foreground">{items.join(" · ")}</p>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-sm text-zinc-600">
          <span className="font-medium text-foreground">{t.certifiedLabel}</span> {t.certifiedText}
        </p>
      </div>
    </section>
  );
}
