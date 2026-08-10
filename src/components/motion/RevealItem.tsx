"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

/** A single item inside a RevealGroup/MountStaggerGroup. Also works standalone
 *  (variants without a parent stagger just play their own show state). */
export default function RevealItem({
  children,
  className,
  as = "div",
  hover = true,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
  hover?: boolean;
}) {
  const hoverProps = hover
    ? {
        whileHover: { y: -4 },
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
      }
    : {};

  if (as === "article") {
    return (
      <motion.article className={className} variants={itemVariants} {...hoverProps}>
        {children}
      </motion.article>
    );
  }

  return (
    <motion.div className={className} variants={itemVariants} {...hoverProps}>
      {children}
    </motion.div>
  );
}
