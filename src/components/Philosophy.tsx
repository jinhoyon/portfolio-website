"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

/** Three engineering decisions, each set large with its reason and a link to where it happened. */
export default function Philosophy() {
  const { language } = useLanguage();
  const t = translations[language].philosophy;

  return (
    <section id="approach" className="break-keep border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} />

        <RevealGroup className="flex flex-col gap-14 md:gap-20">
          {t.values.map(({ title, description, linkLabel, href }) => (
            <RevealItem
              key={href}
              hover={false}
              className="grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:gap-12"
            >
              <h3 className="text-balance text-2xl font-semibold leading-[1.15] tracking-tight text-foreground sm:text-3xl lg:text-4xl">
                {title}
              </h3>
              <div className="max-w-2xl lg:pt-2">
                <p className="text-[15px] leading-relaxed text-zinc-700 sm:text-base">{description}</p>
                <Link
                  href={href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                >
                  {linkLabel}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                </Link>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
