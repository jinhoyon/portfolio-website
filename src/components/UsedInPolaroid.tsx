"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useHangingSwing } from "./motion/useHangingSwing";

/** A small polaroid on the Skills line, linking to where a skill was used. Swings in each time it mounts. */
export default function UsedInPolaroid({
  href,
  name,
  tilt,
  image,
  position,
  tile,
}: {
  href: string;
  name: string;
  tilt: number;
  image?: string;
  position?: string;
  tile?: { label: string; bg: string; ink: string };
}) {
  const { ref, angle, handlers } = useHangingSwing({ tilt, draggable: false, hoverSway: true });

  return (
    <div ref={ref} className="w-full">
      <motion.div className="flex flex-col items-center" style={{ rotate: angle, transformOrigin: "50% 0%" }} {...handlers}>
        <span aria-hidden="true" className="relative z-10 -mb-2.5 block h-6 w-2.5 rounded-[2px] bg-[#c9a36a]" />
        <Link
          href={href}
          className="block w-full bg-white p-1.5 pb-0 shadow-[0_12px_24px_-12px_rgba(24,24,27,0.35),0_2px_4px_-2px_rgba(24,24,27,0.12)] focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          {image ? (
            <span className="relative block aspect-square w-full overflow-hidden bg-zinc-100">
              <Image src={image} alt="" fill sizes="128px" className="object-cover" style={{ objectPosition: position }} />
            </span>
          ) : (
            <span
              className="flex aspect-square w-full items-center justify-center text-lg font-semibold"
              style={{ background: tile!.bg, color: tile!.ink }}
            >
              {tile!.label}
            </span>
          )}
          <span className="line-clamp-2 block px-0.5 py-2 text-xs font-semibold leading-tight text-zinc-900">{name}</span>
        </Link>
      </motion.div>
    </div>
  );
}
