"use client";

import { motion } from "framer-motion";
import { useHangingSwing } from "./motion/useHangingSwing";

/** A coloured tag hanging from a peg. Pressing it picks the skill; a dot means projects use it. */
export default function PegTag({
  label,
  color,
  tilt,
  selected,
  hasUses,
  nudge,
  holeColor,
  onPress,
}: {
  label: string;
  color: string;
  tilt: number;
  selected: boolean;
  hasUses: boolean;
  nudge: number;
  holeColor: string;
  onPress: () => void;
}) {
  const { ref, angle, handlers } = useHangingSwing({ tilt, draggable: false, hoverSway: true, nudge });

  return (
    <div ref={ref} className="flex flex-col items-center">
      {/* The peg, sticking out of the board */}
      <span aria-hidden="true" className="relative z-10 block h-3.5 w-1.5 rounded-full bg-zinc-200" />
      <motion.button
        type="button"
        onClick={onPress}
        aria-pressed={selected}
        className="-mt-2 rounded-[6px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-900"
        style={{ rotate: angle, transformOrigin: "50% 0%" }}
        animate={{ scale: selected ? 1.08 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 22 }}
        {...handlers}
      >
        <span
          className={`relative flex items-center gap-1.5 rounded-[6px] px-3 pb-2 pt-5 text-sm font-medium text-zinc-900 shadow-[0_2px_0_rgba(0,0,0,0.22)] ${
            selected ? "outline-2 outline-zinc-900" : ""
          }`}
          style={{ background: color }}
        >
          {/* Punched hole the peg goes through */}
          <span aria-hidden="true" className="absolute left-1/2 top-1.5 size-2 -translate-x-1/2 rounded-full" style={{ background: holeColor }} />
          {hasUses && (
            <span aria-hidden="true" className={`size-1.5 shrink-0 rounded-full ${selected ? "bg-zinc-900" : "bg-zinc-900/25"}`} />
          )}
          {label}
        </span>
      </motion.button>
    </div>
  );
}
