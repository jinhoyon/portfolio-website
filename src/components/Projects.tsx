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

              <div className="p-8 flex flex-col">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  {project.category} · {project.period}
                </span>
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="mt-2 text-xl font-semibold text-foreground hover:text-zinc-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  {project.summary}
                </p>

                <span className="mt-4 block w-fit border-l-2 border-zinc-800 pl-3 text-sm font-medium text-zinc-700">
                  {project.metric}
                </span>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.stack.map((tech) => (
                    <span
                      key={tech}
                      className="text-xs text-zinc-600 border border-zinc-200 px-2.5 py-1"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="mt-auto pt-6 flex flex-wrap gap-3 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-2 bg-zinc-800 px-4 py-2.5 font-medium text-white transition-colors hover:bg-zinc-600"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-4 w-4" strokeWidth={1.75} />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 border border-zinc-300 bg-white px-4 py-2.5 font-medium text-foreground transition-colors hover:border-zinc-800"
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
