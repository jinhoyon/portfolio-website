"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const groupVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.15 },
  },
};

/** Like RevealGroup, but plays on mount instead of on scroll into view —
 *  for above-the-fold content (e.g. the hero) that should animate in
 *  immediately rather than waiting for a scroll trigger. */
export default function MountStaggerGroup({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={groupVariants}
    >
      {children}
    </motion.div>
  );
}
