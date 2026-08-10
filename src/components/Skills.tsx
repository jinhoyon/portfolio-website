"use client";

import { Code2, Layers, Server, Bot, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const ICONS = [Code2, Layers, Server, Bot, Wrench];

export default function Skills() {
  const { language } = useLanguage();
  const t = translations[language].skills;

  return (
    <section id="skills" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
          {t.categories.map(({ title, items }, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={title} hover={false} className="bg-white p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Icon className="h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                  <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    {title}
                  </h3>
                </div>
                <ul className="flex flex-col gap-2.5">
                  {items.map((item) => (
                    <li key={item} className="text-sm text-zinc-800">
                      {item}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <p className="mt-6 text-sm text-zinc-500">
          <span className="font-medium text-zinc-700">{t.certifiedLabel}</span> {t.certifiedText}
        </p>
      </div>
    </section>
  );
}
