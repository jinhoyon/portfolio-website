"use client";

import { useEffect } from "react";
import { smoothScrollTo } from "@/lib/smoothScroll";

// Matches the sticky header's h-16 (64px), so sections don't land partially hidden behind it.
const HEADER_OFFSET = 64;

export default function SmoothAnchorScroll() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]');
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href || href === "#") return;

      const el = document.getElementById(href.slice(1));
      if (!el) return;

      e.preventDefault();
      const targetY = Math.max(
        el.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET,
        0
      );
      smoothScrollTo(targetY);
      history.pushState(null, "", href);
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
