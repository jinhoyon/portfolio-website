"use client";

import { animate, useInView, useMotionValue, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

/**
 * Rotation for something hanging from a point (a badge on a lanyard, a photo on a line):
 * swings into place on first view, sways on hover, can be pushed by a drag,
 * and settles calmly on release. Spread `handlers` onto a motion element and
 * set `style={{ rotate: angle, transformOrigin: "50% 0%" }}`.
 */
export function useHangingSwing({
  tilt,
  draggable = true,
  nudge = 0,
}: {
  tilt: number;
  /** Off where a horizontal swipe should change the item instead. */
  draggable?: boolean;
  /** Changing this replays the swing, e.g. when the item comes to the front. */
  nudge?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const angle = useMotionValue(reduce ? tilt : tilt - 14);
  const dragging = useRef(false);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      angle.set(tilt);
      return;
    }
    const c = animate(angle, [angle.get() - (nudge ? 8 : 0), tilt], { type: "spring", stiffness: 70, damping: 5 });
    return () => c.stop();
  }, [inView, reduce, tilt, angle, nudge]);

  // Ease back from rest (velocity 0) and well damped, so a fast drag never sets it spinning.
  const settle = () => {
    dragging.current = false;
    if (reduce) return;
    angle.stop();
    animate(angle, tilt, { type: "spring", stiffness: 120, damping: 14, velocity: 0 });
  };

  const active = draggable && !reduce;

  const handlers = {
    onPan: (_: PointerEvent, info: { offset: { x: number } }) => {
      if (!active) return;
      dragging.current = true;
      angle.stop();
      angle.jump(tilt + Math.max(-20, Math.min(20, -info.offset.x * 0.25)));
    },
    onPanEnd: settle,
    onHoverStart: () => {
      if (!active || dragging.current) return;
      animate(angle, [angle.get(), tilt - 5, tilt + 3, tilt], { duration: 1.1, ease: "easeOut" });
    },
  };

  return { ref, angle, handlers, draggable: active };
}
