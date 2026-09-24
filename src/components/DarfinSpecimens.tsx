import { ArrowRight, Lightbulb } from "lucide-react";
import type { SpecimenKey } from "@/lib/projectStories";

// Class strings copied from darfin-front/src/app/shared/lib/uiRecipes.js (light theme)
// so the specimens render exactly as Darfin does. Copy stays in Darfin's Korean.
const BTN_PRIMARY =
  "inline-flex items-center justify-center gap-2 h-10 px-5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors";
const BTN_SECONDARY =
  "inline-flex items-center justify-center gap-2 h-10 px-4 border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-sm font-medium rounded-md transition-colors";
const BADGE = "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border";

const RISK_STATES: [string, string][] = [
  ["신규발생", "bg-red-100 text-red-700"],
  ["악화", "bg-red-100 text-red-700"],
  ["지속", "bg-amber-100 text-amber-700"],
  ["개선", "bg-blue-100 text-blue-700"],
  ["해소", "bg-emerald-100 text-emerald-700"],
  ["정상", "bg-slate-100 text-slate-600"],
  ["데이터부족", "bg-slate-100 text-slate-400"],
];

function Specimen({ component }: { component: SpecimenKey }) {
  switch (component) {
    case "buttons":
      return (
        <div className="flex flex-wrap gap-2">
          <span className={BTN_PRIMARY}>
            기업 분석 시작 <ArrowRight size={16} aria-hidden="true" />
          </span>
          <span className={BTN_SECONDARY}>공시 검색</span>
        </div>
      );
    case "badges":
      return (
        <div className="flex flex-wrap gap-2">
          <span className={`${BADGE} bg-blue-50 text-blue-700 border-blue-200`}>정기공시</span>
          <span className={`${BADGE} bg-amber-50 text-amber-700 border-amber-200`}>분석 중</span>
          <span className={`${BADGE} bg-slate-50 text-slate-500 border-slate-200`}>분기보고서</span>
        </div>
      );
    case "aiCallout":
      return (
        <div className="flex gap-2 rounded-md border border-blue-100 bg-blue-50/60 px-3.5 py-3 text-sm leading-relaxed">
          <Lightbulb size={14} className="mt-1 shrink-0 text-blue-500" aria-hidden="true" />
          <p className="text-slate-700">
            <span className="font-semibold text-blue-700">AI 요약. </span>
            유동비율이 두 분기 연속 낮아졌지만 아직 1.0 이상입니다.
          </p>
        </div>
      );
    case "segmented":
      return (
        <div className="inline-flex gap-1.5 rounded-lg bg-slate-100/80 p-1.5 text-xs font-medium">
          <span className="whitespace-nowrap rounded-md bg-white px-4 py-2 text-slate-900 shadow-sm">개요</span>
          <span className="whitespace-nowrap rounded-md px-4 py-2 text-slate-500">AI 분석</span>
          <span className="whitespace-nowrap rounded-md px-4 py-2 text-slate-500">재무 추이</span>
        </div>
      );
    case "riskStates":
      return (
        <div className="flex flex-wrap gap-1.5">
          {RISK_STATES.map(([label, cls]) => (
            <span key={label} className={`rounded-full px-2 py-0.5 text-xs font-medium ${cls}`}>
              {label}
            </span>
          ))}
        </div>
      );
    case "priceColors":
      return (
        <div className="flex gap-6 text-sm font-medium tabular-nums">
          <span className="text-slate-900">
            78,400 <span className="text-red-500">▲ 2.4%</span>
          </span>
          <span className="text-slate-900">
            201,500 <span className="text-blue-500">▼ 1.1%</span>
          </span>
        </div>
      );
  }
}

export default function DarfinSpecimens({
  caption,
  items,
}: {
  caption: string;
  items: { component: SpecimenKey; label: string; note: string }[];
}) {
  return (
    <div className="mt-8">
      <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">{caption}</p>
      <div className="grid gap-px border border-zinc-200 bg-zinc-200 sm:grid-cols-2">
        {items.map((item) => (
          <div key={item.component} className="flex min-w-0 flex-col bg-white">
            {/* Darfin's own page ground and system font, so the specimen isn't restyled by the portfolio. */}
            <div
              className="flex min-h-28 items-center overflow-x-auto bg-slate-50 px-5 py-6 [word-break:keep-all]"
              style={{ fontFamily: 'system-ui, -apple-system, "Apple SD Gothic Neo", "Malgun Gothic", sans-serif' }}
            >
              <Specimen component={item.component} />
            </div>
            <div className="border-t border-zinc-200 p-5">
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-sm leading-relaxed text-zinc-600">{item.note}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
