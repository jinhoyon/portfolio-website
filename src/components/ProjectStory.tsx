"use client";

import Image from "next/image";
import { Check, X } from "lucide-react";
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
      <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600">{story.tagline}</p>

      <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-y border-zinc-200 py-6 lg:grid-cols-4">
        {story.facts.map((fact) => (
          <div key={fact.label}>
            <dt className="font-mono text-xs uppercase tracking-widest text-zinc-500">{fact.label}</dt>
            <dd className="mt-1.5 text-sm leading-snug text-foreground">{fact.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-6 flex flex-wrap gap-3">{actions}</div>

      <Figure figure={story.cover} aspect={aspect} priority />

      <div className="mt-8">
        <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{stackLabel}</span>
        <div className="mt-3 flex flex-wrap gap-2">
          {stack.map((tech) => (
            <span key={tech} className="border border-zinc-200 px-2.5 py-1 text-xs text-zinc-600">
              {tech}
            </span>
          ))}
        </div>
      </div>

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
