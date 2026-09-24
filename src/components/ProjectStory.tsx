"use client";

import Image from "next/image";
import { ArrowRight, Check, ChevronDown, X } from "lucide-react";
import type { ProjectStory as Story, StoryBlock, StoryFigure } from "@/lib/projectStories";

function Figure({ figure, aspect, priority = false }: { figure: StoryFigure; aspect: string; priority?: boolean }) {
  return (
    <figure className="mt-8">
      <div className={`relative w-full ${aspect} overflow-hidden border border-zinc-200 bg-zinc-100`}>
        <Image
          src={figure.src}
          alt={figure.alt}
          fill
          preload={priority}
          className="object-contain"
          sizes="(min-width: 896px) 848px, 100vw"
        />
      </div>
      <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">
        {figure.caption}
      </figcaption>
    </figure>
  );
}

function Block({ block, aspect }: { block: StoryBlock; aspect: string }) {
  switch (block.type) {
    case "p":
      return <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-700">{block.text}</p>;
    case "evidence":
      return (
        <div className="mt-8 border-y border-zinc-200 py-8">
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{block.title}</h3>
          <p className="mt-2 text-sm text-zinc-500">{block.context}</p>
          <div className="mt-6 space-y-8">
            {block.items.map((item) => (
              <div key={item.title} className="min-w-0">
                <h4 className="font-semibold text-zinc-800">{item.title}</h4>
                <p className="mt-2 break-words font-mono text-xs leading-relaxed text-zinc-500">{item.file}</p>
                <pre tabIndex={0} aria-label={item.title} className="mt-3 max-w-full overflow-x-auto border border-zinc-200 bg-zinc-50 p-4 text-xs leading-7 text-zinc-800 focus-visible:outline-2 focus-visible:outline-offset-2 sm:text-sm"><code>{item.code}</code></pre>
                <p className="mt-3 text-sm font-medium leading-relaxed text-zinc-800">{item.finding}</p>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-600">{item.implication}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 break-words text-xs leading-relaxed text-zinc-500">{block.note}</p>
        </div>
      );
    case "link":
      return (
        <a href={block.href} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-zinc-700 underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4">
          {block.label}<span aria-hidden="true">↗</span>
        </a>
      );
    case "quote":
      return (
        <blockquote className="mt-8 max-w-2xl border-l-2 border-zinc-800 pl-5 text-xl font-medium leading-snug tracking-tight text-foreground">
          {block.text}
        </blockquote>
      );
    case "list":
      return (
        <ul className="mt-5 flex max-w-2xl flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3 text-base leading-relaxed text-zinc-700">
              <span className="mt-[0.6em] h-1.5 w-1.5 shrink-0 bg-zinc-400" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="mt-6 grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {block.items.map((item, i) => (
            <li key={item} className="flex gap-3 border border-zinc-200 bg-white p-4 sm:flex-col sm:gap-2">
              <span className="font-mono text-xs text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-sm leading-snug text-zinc-700">{item}</span>
            </li>
          ))}
        </ol>
      );
    case "paths":
      return (
        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {block.items.map((item) => (
            <div key={item.label} className="border border-zinc-200 bg-zinc-50 p-6">
              <h3 className="text-base font-semibold text-foreground">{item.label}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600">{item.text}</p>
            </div>
          ))}
        </div>
      );
    case "imageComparison":
      return (
        <div className="mt-10">
          <h3 className="max-w-2xl text-xl font-semibold tracking-tight text-foreground">{block.title}</h3>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-zinc-700">{block.description}</p>
          <div className="mt-6 grid gap-8 md:grid-cols-2 md:gap-5">
            {[block.before, block.after].map((figure) => (
              <figure key={figure.src} className="min-w-0">
                <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">{figure.label}</p>
                <a href={figure.src} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${figure.label}: ${block.openLabel}`}>
                  <div className="relative aspect-[2048/1115] overflow-hidden border border-zinc-200 bg-zinc-100 transition-colors group-hover:border-zinc-500">
                    <Image src={figure.src} alt={figure.alt} fill className="object-contain" sizes="(min-width: 896px) 414px, (min-width: 768px) 46vw, 100vw" />
                  </div>
                  <span className="mt-2 inline-block text-xs text-zinc-600 underline underline-offset-4">{block.openLabel} ↗</span>
                </a>
                <figcaption className="mt-3 text-sm leading-relaxed text-zinc-500">{figure.caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      );
    case "diagram":
      return (
        <figure className="mt-8">
          <a href={block.figure.src} target="_blank" rel="noopener noreferrer" className="group block focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${block.figure.alt}: ${block.openLabel}`}>
            <div className="border border-zinc-200 bg-[#f8f7f6] transition-colors group-hover:border-zinc-500">
              <Image
                src={block.figure.src}
                alt={block.figure.alt}
                width={block.figure.width}
                height={block.figure.height}
                className="h-auto w-full"
                sizes="(min-width: 896px) 848px, 100vw"
              />
            </div>
            <span className="mt-2 inline-block text-xs text-zinc-600 underline underline-offset-4">{block.openLabel} ↗</span>
          </a>
          <figcaption className="mt-2 max-w-2xl text-sm leading-relaxed text-zinc-500">{block.figure.caption}</figcaption>
        </figure>
      );
    case "gallery":
      return (
        <figure className="mt-8">
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {block.items.map((item) => (
              <a key={item.src} href={item.src} target="_blank" rel="noopener noreferrer" className="group block min-w-0 focus-visible:outline-2 focus-visible:outline-offset-4" aria-label={`${item.alt}: ${block.openLabel}`}>
                <div className="relative aspect-[4/5] overflow-hidden border border-zinc-200 bg-white transition-colors group-hover:border-zinc-500">
                  <Image src={item.src} alt={item.alt} fill className="object-cover object-top" sizes="(min-width: 896px) 272px, 33vw" />
                </div>
                {item.caption && <span className="mt-2 block text-xs leading-snug text-zinc-500">{item.caption}</span>}
              </a>
            ))}
          </div>
          <figcaption className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-500">{block.caption}</figcaption>
        </figure>
      );
    case "overview":
      return (
        <ol className="mt-8 grid gap-3 md:grid-cols-3 md:gap-0">
          {block.items.map((item, i) => (
            <li key={item.title} className="relative flex flex-col border border-zinc-200 bg-white p-6 md:[&:not(:first-child)]:border-l-0">
              <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">
                {String(i + 1).padStart(2, "0")} · {item.label}
              </span>
              <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-zinc-600">{item.text}</p>
              {i < block.items.length - 1 && (
                <ArrowRight
                  className="absolute -bottom-3 left-1/2 z-10 h-6 w-6 -translate-x-1/2 rotate-90 bg-background p-0.5 text-zinc-400 md:top-1/2 md:-right-3 md:bottom-auto md:left-auto md:translate-x-0 md:-translate-y-1/2 md:rotate-0"
                  strokeWidth={2}
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ol>
      );
    case "stats":
      return (
        <dl className={`mt-6 grid gap-px border border-zinc-200 bg-zinc-200 ${block.items.length === 2 ? "sm:grid-cols-2" : "grid-cols-2 md:grid-cols-4"}`}>
          {block.items.map((item) => (
            <div key={item.label} className="flex flex-col-reverse bg-white p-5">
              <dt className="mt-1 text-sm leading-snug text-zinc-600">{item.label}</dt>
              <dd className="text-3xl font-semibold tracking-tight text-foreground">{item.value}</dd>
            </div>
          ))}
        </dl>
      );
    case "table":
      return (
        <div className="mt-8">
          <p className="mb-3 font-mono text-xs uppercase tracking-widest text-zinc-500">{block.caption}</p>
          {/* Stacked cards on mobile, a real table from sm up. */}
          <table className="w-full border-collapse text-left text-sm">
            <thead className="hidden sm:table-header-group">
              <tr className="border-b border-zinc-800">
                {block.columns.map((col) => (
                  <th key={col} scope="col" className="py-3 pr-4 font-semibold text-foreground">{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row) => (
                <tr key={row[0]} className="block border-b border-zinc-200 py-3 sm:table-row sm:py-0">
                  {row.map((cell, i) => (
                    <td key={i} className={`block py-0.5 leading-relaxed sm:table-cell sm:py-3 sm:pr-4 sm:align-top ${i === 0 ? "font-mono text-xs text-zinc-500 sm:whitespace-nowrap" : i === row.length - 1 ? "text-zinc-800" : "text-zinc-600"}`}>
                      {i > 0 && <span className="mt-2 block font-mono text-[11px] uppercase tracking-widest text-zinc-400 sm:hidden">{block.columns[i]}</span>}
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "details":
      return (
        <details className="group mt-8 border border-zinc-200 bg-white">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-sm font-medium text-zinc-800 hover:bg-zinc-50 focus-visible:outline-2 focus-visible:outline-offset-2 [&::-webkit-details-marker]:hidden">
            {block.summary}
            <ChevronDown className="h-4 w-4 shrink-0 text-zinc-500 transition-transform group-open:rotate-180" strokeWidth={2} aria-hidden="true" />
          </summary>
          <div className="border-t border-zinc-200 px-5 pb-6 [&>*:first-child]:mt-6 [&>div:first-child]:border-t-0 [&>div:first-child]:pt-0">
            {block.blocks.map((child, i) => (
              <Block key={i} block={child} aspect={aspect} />
            ))}
          </div>
        </details>
      );
    case "annotatedFigure":
      return (
        <figure className="mt-8">
          <div className="relative border border-zinc-200 bg-zinc-100">
            <Image
              src={block.figure.src}
              alt={block.figure.alt}
              width={block.figure.width}
              height={block.figure.height}
              className="h-auto w-full"
              sizes="(min-width: 896px) 848px, 100vw"
            />
            {block.notes.map((note, i) => (
              <span
                key={note.title}
                className="absolute flex h-5 w-5 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-zinc-900 font-mono text-[11px] font-semibold text-white shadow-[0_0_0_2px_rgba(255,255,255,0.9)]"
                style={{ left: `${note.x}%`, top: `${note.y}%` }}
                aria-hidden="true"
              >
                {i + 1}
              </span>
            ))}
          </div>
          <ol className="mt-4 grid gap-x-6 gap-y-4 sm:grid-cols-2">
            {block.notes.map((note, i) => (
              <li key={note.title} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-zinc-900 font-mono text-xs font-semibold text-white" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <p className="text-sm font-semibold leading-snug text-foreground">{note.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-zinc-600">{note.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <figcaption className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-500">{block.figure.caption}</figcaption>
        </figure>
      );
    case "figure":
      return <Figure figure={block.figure} aspect={aspect} />;
    case "compare":
      return (
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="border border-zinc-200 bg-white p-6">
            <h3 className="text-sm font-semibold text-zinc-500">{block.before.label}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {block.before.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-600">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-400" strokeWidth={2} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
          <div className="border border-zinc-800 bg-white p-6">
            <h3 className="text-sm font-semibold text-foreground">{block.after.label}</h3>
            <ul className="mt-4 flex flex-col gap-3">
              {block.after.points.map((point) => (
                <li key={point} className="flex gap-3 text-sm leading-relaxed text-zinc-700">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-zinc-800" strokeWidth={2} aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
  }
}

export default function ProjectStory({
  story,
  stack,
  stackLabel,
  aspect,
  actions,
}: {
  story: Story;
  stack: readonly string[];
  stackLabel: string;
  aspect: string;
  actions: React.ReactNode;
}) {
  return (
    <>
      <p className="mt-6 max-w-2xl text-lg leading-relaxed text-zinc-700">{story.tagline}</p>

      <dl className="mt-10 max-w-2xl divide-y divide-zinc-200 border-y border-zinc-200 text-sm">
        {[...story.facts, { label: stackLabel, value: stack.join(" · ") }].map((fact) => (
          <div key={fact.label} className="grid gap-1 py-3 sm:grid-cols-[8rem_1fr] sm:gap-6">
            <dt className="text-zinc-500">{fact.label}</dt>
            <dd className="leading-relaxed text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">{actions}</div>

      <Figure figure={story.cover} aspect={aspect} priority />

      <nav aria-label={story.contentsLabel} className="mt-10 border-t border-zinc-200 pt-6">
        <p className="font-mono text-xs uppercase tracking-widest text-zinc-500">{story.contentsLabel}</p>
        <ol className="mt-4 grid gap-x-8 gap-y-3 sm:grid-cols-2">
          {story.sections.map((section, i) => (
            <li key={section.id} className="flex gap-3 text-sm">
              <span className="font-mono text-zinc-400" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
              <a href={`#${section.id}`} className="text-zinc-600 underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4">{section.heading}</a>
            </li>
          ))}
        </ol>
      </nav>

      {story.sections.map((section) => (
        <section key={section.id} id={section.id} className="mt-16 scroll-mt-24 border-t border-zinc-200 pt-12">
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{section.eyebrow}</span>
          <h2 className="mt-2 max-w-2xl text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
            {section.heading}
          </h2>
          {section.blocks.map((block, i) => (
            <Block key={i} block={block} aspect={aspect} />
          ))}
        </section>
      ))}
    </>
  );
}
