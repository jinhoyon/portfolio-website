"use client";

import { Users, Sparkles, Boxes } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const ICONS = [Users, Sparkles, Boxes];

export default function Philosophy() {
  const { language } = useLanguage();
  const t = translations[language].philosophy;

  return (
    <section id="architecture" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="grid md:grid-cols-3 gap-6">
          {t.values.map(({ title, description }, i) => {
            const Icon = ICONS[i];
            return (
              <RevealItem key={i} className="border border-zinc-200 bg-white p-7">
                <div className="h-10 w-10 flex items-center justify-center border border-zinc-300 mb-5">
                  <Icon className="h-5 w-5 text-zinc-700" strokeWidth={1.5} />
                </div>
                <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
                <p className="mt-2.5 text-sm text-zinc-500 leading-relaxed">
                  {description}
                </p>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
