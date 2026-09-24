"use client";

import Link from "next/link";
import { ArrowRight, Github } from "lucide-react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { PROJECTS_META } from "@/lib/projectsMeta";

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const projects = t.items.map((item, i) => ({ ...item, ...PROJECTS_META[i] }));

  return (
    <section id="projects" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow={t.eyebrow} title={t.title} subtitle={t.subtitle} />

        <RevealGroup className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <RevealItem
              key={i}
              as="article"
              className="grid md:grid-cols-2 border border-zinc-200 bg-white"
            >
              <ProjectImageCarousel aspect="aspect-16/9" images={project.images} className="border-0 border-b md:border-b-0 md:border-r border-zinc-200" />

              <div className="flex flex-col p-8 md:p-10">
                <span className="font-mono text-xs uppercase tracking-widest text-zinc-500">{project.period}</span>
                <Link href={`/projects/${project.slug}`} className="group mt-3 focus-visible:outline-2 focus-visible:outline-offset-4">
                  <h3 className="text-foreground">
                    <span className="block text-2xl font-semibold tracking-tight transition-colors group-hover:text-zinc-600">
                      {project.title.split(" — ")[0]}
                    </span>
                    <span className="mt-1 block text-base font-normal text-zinc-500">
                      {project.title.split(" — ")[1]}
                    </span>
                  </h3>
                </Link>
                <p className="mt-5 text-sm leading-relaxed text-zinc-600">{project.summary}</p>
                <p className="mt-4 text-xs leading-relaxed text-zinc-500">{project.stack.join(" · ")}</p>

                <div className="mt-auto flex items-center gap-6 pt-8 text-sm font-medium">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group inline-flex items-center gap-1.5 text-foreground underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" strokeWidth={1.75} />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-500 transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-4"
                  >
                    <Github className="h-4 w-4" strokeWidth={1.75} />
                    {t.githubLabel}
                  </a>
                </div>
              </div>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
