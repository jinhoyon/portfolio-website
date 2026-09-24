"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { resolveStoryParts, storyPartId, type ProjectStory } from "@/lib/projectStories";

// A section counts as "current" once its top passes this line below the sticky nav.
const ACTIVE_OFFSET = 140;

export default function StorySidebar({
  story,
  backHref,
  backLabel,
}: {
  story: ProjectStory;
  backHref: string;
  backLabel: string;
}) {
  const parts = resolveStoryParts(story);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sectionIds = parts?.flatMap((part) => part.sections.map(({ section }) => section.id)) ?? [];
  const idsKey = sectionIds.join(",");

  useEffect(() => {
    const ids = idsKey.split(",").filter(Boolean);
    let frame = 0;
    const update = () => {
      frame = 0;
      let current: string | null = null;
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= ACTIVE_OFFSET) current = id;
      }
      // At the very bottom, the last section may never reach the line; mark it current.
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
        current = ids[ids.length - 1] ?? current;
      }
      setActiveId(current);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [idsKey]);

  if (!parts) return null;

  return (
    <aside className="hidden lg:block">
      <nav
        aria-label={story.contentsLabel}
        className="sticky top-24 max-h-[calc(100vh-7rem)] overflow-y-auto pb-8"
      >
        <Link
          href={backHref}
          className="group inline-flex items-center gap-1.5 text-sm text-zinc-500 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
        >
          <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-0.5" strokeWidth={1.75} />
          {backLabel}
        </Link>
        <ol className="mt-8 flex flex-col gap-6">
          {parts.map((part, i) => {
            const partActive = part.sections.some(({ section }) => section.id === activeId);
            return (
              <li key={part.label}>
                <a
                  href={`#${storyPartId(i)}`}
                  className={`flex items-baseline gap-2 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 ${
                    partActive ? "text-foreground" : "text-zinc-400 hover:text-zinc-700"
                  }`}
                >
                  <span className="font-mono text-xs font-normal">{String(i + 1).padStart(2, "0")}</span>
                  {part.label}
                </a>
                <ul className="mt-2 flex flex-col border-l border-zinc-200">
                  {part.sections.map(({ section, label }) => {
                    const active = section.id === activeId;
                    return (
                      <li key={section.id}>
                        <a
                          href={`#${section.id}`}
                          aria-current={active ? "location" : undefined}
                          className={`-ml-px block border-l py-1.5 pl-4 text-sm leading-snug transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 ${
                            active
                              ? "border-zinc-800 font-medium text-foreground"
                              : "border-transparent text-zinc-500 hover:border-zinc-400 hover:text-zinc-800"
                          }`}
                        >
                          {label}
                        </a>
                      </li>
                    );
                  })}
                </ul>
              </li>
            );
          })}
        </ol>
      </nav>
    </aside>
  );
}
