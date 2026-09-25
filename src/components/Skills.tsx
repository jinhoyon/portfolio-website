"use client";

import Link from "next/link";
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

        <div className="mt-6 grid gap-3 text-sm leading-relaxed text-zinc-600 sm:grid-cols-2">
          <p><span className="font-medium text-foreground">TypeScript · Next.js</span><br />{language === "en" ? "This portfolio: typed story blocks and bilingual content rendered through shared React components." : "이 포트폴리오: 타입이 정의된 스토리 블록과 한·영 콘텐츠를 공통 React 컴포넌트로 렌더링합니다."}</p>
          <p><Link href="/projects/darfin#architecture" className="font-medium text-foreground underline underline-offset-4">Python · Spring Boot · Gemini ↗</Link><br />{language === "en" ? "Darfin: source-data processing, queued AI jobs, and persisted explanations with freshness checks." : "Darfin: 원천 데이터 처리, AI 작업 큐, 최신성을 확인해 재사용하는 저장된 설명."}</p>
          <p><Link href="/projects/seenior" className="font-medium text-foreground underline underline-offset-4">React · LLM output validation ↗</Link><br />{language === "en" ? "Seenior: generated documentation and diagrams, with validation and retries before rendering." : "Seenior: 문서·다이어그램 생성과 렌더링 전 검증·재시도."}</p>
        </div>

        <p className="mt-6 text-sm text-zinc-600">
          <span className="font-medium text-foreground">{t.certifiedLabel}</span> {t.certifiedText}
        </p>
      </div>
    </section>
  );
}
