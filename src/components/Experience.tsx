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
    <section id="experience" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="flex flex-col">
          {t.roles.map((role, i) => (
            <RevealItem
              key={i}
              hover={false}
              className="grid md:grid-cols-[200px_1fr] gap-4 md:gap-10 relative pb-12"
            >
              <div className="flex md:block gap-3 items-start">
                <div className="hidden md:flex flex-col items-center h-full absolute -left-[9px] top-1">
                  <span className="h-3 w-3 rounded-full border-2 border-zinc-900 bg-white shrink-0" />
                  {i < t.roles.length - 1 && (
                    <span className="w-px flex-1 bg-zinc-300 mt-1" />
                  )}
                </div>
                <span className="text-sm font-mono text-zinc-500 md:pl-6">{role.period}</span>
              </div>

              <div className="border border-zinc-200 bg-white p-7 -mt-1">
                <h3 className="text-lg font-semibold text-zinc-900">{role.title}</h3>
                <p className="text-sm text-zinc-500 mt-1">{role.company}</p>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {role.achievements.map((a, j) => (
                    <li key={j} className="text-sm text-zinc-600 leading-relaxed pl-4 relative before:content-['—'] before:absolute before:left-0 before:text-zinc-300">
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
