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
              <ProjectImageCarousel aspect="aspect-4/3" images={project.images} className="border-0 border-b md:border-b-0 md:border-r border-zinc-200" />

              <div className="p-8 flex flex-col">
                <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  {project.category} · {project.period}
                </span>
                <Link href={`/projects/${project.slug}`}>
                  <h3 className="mt-2 text-xl font-semibold text-zinc-900 hover:text-zinc-600 transition-colors">
                    {project.title}
                  </h3>
                </Link>
                <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
                  {project.summary}
                </p>

                <span className="mt-4 inline-block w-fit text-xs font-medium bg-zinc-900 text-white px-3 py-1.5">
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

                <div className="mt-auto pt-6 flex flex-wrap gap-5 text-sm">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-zinc-900 font-medium"
                  >
                    {t.viewDetails}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.75} />
                  </Link>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-zinc-800 hover:text-zinc-900 font-medium"
                  >
                    <Github className="h-3.5 w-3.5" strokeWidth={1.75} />
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
