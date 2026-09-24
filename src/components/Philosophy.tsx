"use client";

import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

export default function Philosophy() {
  const { language } = useLanguage();
  const t = translations[language].philosophy;

  return (
    <section id="approach" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="grid gap-10 md:grid-cols-3 md:gap-8">
          {t.values.map(({ title, description }, i) => (
            <RevealItem key={title} hover={false} className="border-t border-zinc-800 pt-5">
              <span className="font-mono text-xs text-zinc-500">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-2 text-lg font-semibold tracking-tight text-foreground">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{description}</p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
