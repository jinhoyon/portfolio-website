"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { useHangingSwing } from "./motion/useHangingSwing";

export type OrgId = "unetic" | "iol";

/** Visual identity for each organization's badge. Text lives in translations. */
const ORGS: Record<OrgId, { strap: string; disc: string; discInk: string; wordmark: React.ReactNode }> = {
  unetic: {
    strap: "#1a73e8",
    disc: "#e8f0fd",
    discInk: "#1a73e8",
    wordmark: (
      <span className="flex flex-col items-end leading-none">
        <span className="text-[22px] font-black tracking-[-0.04em] text-zinc-950">UNETIC</span>
        <span className="mt-0.5 text-[9px] font-medium text-zinc-600">for Students</span>
      </span>
    ),
  },
  iol: {
    strap: "#022851",
    disc: "#ffbf00",
    discInk: "#022851",
    wordmark: (
      <span className="flex flex-col items-center leading-[0.95] text-[#022851]">
        <span className="text-[13px] font-semibold tracking-[-0.02em]">Interactive</span>
        <span className="text-[13px] font-semibold tracking-[-0.02em]">Organisms Lab</span>
        <span className="mt-1 text-[9px] font-medium text-zinc-500">UC Davis</span>
      </span>
    ),
  },
};

/** Deterministic bar widths from a seed string, so each badge gets its own barcode. */
function barcode(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619);
  const bars: { x: number; w: number }[] = [];
  let x = 0;
  while (x < 120) {
    h = Math.imul(h ^ (h >>> 13), 1274126177);
    const w = 1 + (Math.abs(h) % 3);
    const gap = 1 + ((Math.abs(h) >>> 4) % 3);
    if (x + w > 120) break;
    bars.push({ x, w });
    x += w + gap;
  }
  return bars;
}

export default function OrgBadge({
  org,
  name,
  role,
  tilt = 4,
  draggable = true,
  nudge = 0,
}: {
  org: OrgId;
  name: string;
  role: string;
  tilt?: number;
  /** Off inside the mobile carousel, where a horizontal swipe changes the badge instead. */
  draggable?: boolean;
  /** Changing this replays the swing, e.g. when the badge comes to the front. */
  nudge?: number;
}) {
  const o = ORGS[org];
  const { ref, angle, handlers, draggable: canDrag } = useHangingSwing({ tilt, draggable, nudge });
  const bars = useMemo(() => barcode(org + name), [org, name]);

  return (
    <div ref={ref} className="relative flex justify-center sm:justify-start" aria-hidden="true">
      <motion.div
        className={`flex select-none flex-col items-center ${canDrag ? "cursor-grab touch-pan-y active:cursor-grabbing" : ""}`}
        style={{ rotate: angle, transformOrigin: "50% 0%" }}
        {...handlers}
      >
        {/* Lanyard strap hanging from the timeline rule */}
        <span className="block h-10 w-6 rounded-b-[3px]" style={{ background: o.strap }} />
        {/* Clip */}
        <span className="-mt-1 block h-4 w-14 rounded-[4px] bg-zinc-300" />
        {/* Card */}
        <div className="-mt-1.5 flex w-40 flex-col items-center rounded-[18px] bg-white px-4 pb-5 pt-3 shadow-[0_18px_40px_-18px_rgba(24,24,27,0.35),0_2px_6px_-2px_rgba(24,24,27,0.12)] sm:w-44">
          <span className="mb-4 block h-1.5 w-10 rounded-full bg-zinc-200" />
          <div className="flex h-10 items-center">{o.wordmark}</div>
          <span
            className="mt-5 flex size-[72px] items-center justify-center rounded-full text-xl font-semibold tracking-[-0.03em]"
            style={{ background: o.disc, color: o.discInk }}
          >
            JY
          </span>
          <span className="mt-4 text-lg font-bold tracking-[-0.02em] text-zinc-950">{name}</span>
          <span className="mt-0.5 text-center text-[11px] leading-snug text-zinc-500">{role}</span>
          <svg viewBox="0 0 120 22" className="mt-4 h-[22px] w-[120px]" fill="#18181b">
            {bars.map((b) => (
              <rect key={b.x} x={b.x} y={0} width={b.w} height={22} />
            ))}
          </svg>
        </div>
      </motion.div>
    </div>
  );
}
