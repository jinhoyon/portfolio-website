"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useHangingSwing } from "./motion/useHangingSwing";

/** An instant photo clipped to the projects clothesline. The whole photo is the button that selects its project. */
export default function Polaroid({
  src,
  position = "center top",
  name,
  period,
  tilt,
  selected,
  onSelect,
  draggable = true,
  nudge = 0,
  focusable = true,
  className = "",
  style,
}: {
  src: string;
  position?: string;
  name: string;
  period: string;
  tilt: number;
  selected: boolean;
  onSelect: () => void;
  draggable?: boolean;
  nudge?: number;
  focusable?: boolean;
  className?: string;
  style?: React.CSSProperties;
}) {
  const { ref, angle, handlers, draggable: canDrag } = useHangingSwing({ tilt, draggable, nudge });

  return (
    <div ref={ref} className={className} style={style}>
      <motion.button
        type="button"
        onClick={onSelect}
        aria-pressed={selected}
        tabIndex={focusable ? 0 : -1}
        className={`group relative flex w-full select-none flex-col items-center rounded-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-zinc-800 ${canDrag ? "cursor-grab active:cursor-grabbing" : ""}`}
        style={{ rotate: angle, transformOrigin: "50% 0%" }}
        {...handlers}
      >
        {/* Wooden peg biting the line */}
        <span className="relative z-10 -mb-3 block h-8 w-3.5 rounded-[2px] bg-[#c9a36a]">
          <span className="absolute inset-x-0 top-3.5 h-0.5 bg-[#a7834c]" />
        </span>
        <motion.span
          className="block w-full bg-white p-2.5 pb-0 shadow-[0_18px_36px_-16px_rgba(24,24,27,0.35),0_2px_6px_-2px_rgba(24,24,27,0.12)]"
          animate={{ scale: selected ? 1.05 : 1, opacity: selected ? 1 : 0.82 }}
          whileHover={{ opacity: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 26 }}
        >
          <span className="relative block aspect-square w-full overflow-hidden bg-zinc-100">
            <Image src={src} alt="" fill sizes="220px" className="object-cover" style={{ objectPosition: position }} draggable={false} />
          </span>
          <span className="flex h-16 flex-col items-start justify-center px-1 text-left">
            <span className="text-[15px] font-semibold leading-tight tracking-tight text-zinc-900">{name}</span>
            <span className="mt-0.5 text-[11px] text-zinc-500">{period}</span>
          </span>
        </motion.span>
      </motion.button>
    </div>
  );
}
