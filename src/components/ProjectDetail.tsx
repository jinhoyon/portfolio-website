"use client";

import Link from "next/link";
import { ArrowLeft, Github } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import ProjectImageCarousel from "./ProjectImageCarousel";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";
import { PROJECTS_META, type ProjectSlug } from "@/lib/projectsMeta";

export default function ProjectDetail({ slug }: { slug: ProjectSlug }) {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const metaIndex = PROJECTS_META.findIndex((p) => p.slug === slug);
  const meta = PROJECTS_META[metaIndex];
  const item = t.items[metaIndex];
  const project = { ...item, ...meta };

  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="mx-auto max-w-4xl px-6 py-16">
          <Link
            href="/#projects"
            className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.75} />
            {t.backToProjects}
          </Link>

          <span className="mt-6 block text-xs font-mono uppercase tracking-widest text-zinc-500">
            {project.category} · {project.period}
          </span>
          <h1 className="mt-2 text-3xl sm:text-4xl font-semibold tracking-tight text-zinc-900">
            {project.title}
          </h1>

          <span className="mt-4 inline-block w-fit text-xs font-medium bg-zinc-900 text-white px-3 py-1.5">
            {project.metric}
          </span>

          <ProjectImageCarousel
            aspect={meta.imageAspect}
            images={project.images}
            className="mt-8 border border-zinc-200"
          />

          <p className="mt-8 text-base text-zinc-600 leading-relaxed max-w-3xl">
            {project.summary}
          </p>

          <div className="mt-8">
            <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              {t.techStackLabel}
            </span>
            <div className="mt-3 flex flex-wrap gap-2">
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  className="text-xs text-zinc-600 border border-zinc-200 px-2.5 py-1"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-12 border-t border-zinc-200 pt-10 grid gap-10 sm:grid-cols-2 max-w-3xl">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.objectiveLabel}
              </h2>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                {project.objective}
              </p>
            </div>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.problemLabel}
              </h2>
              <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
                {project.problem}
              </p>
            </div>
          </div>

          <div className="mt-10 max-w-3xl">
            <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
              {t.approachLabel}
            </h2>
            <p className="mt-3 text-sm text-zinc-600 leading-relaxed">
              {project.approach}
            </p>
          </div>

          <div className="mt-10 grid gap-10 sm:grid-cols-2 max-w-3xl">
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.challengesLabel}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {project.challenges.map((challenge, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-zinc-600 leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    {challenge}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                {t.learningsLabel}
              </h2>
              <ul className="mt-3 space-y-2.5">
                {project.learnings.map((learning, i) => (
                  <li key={i} className="flex gap-2.5 text-sm text-zinc-600 leading-relaxed">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-400" />
                    {learning}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-5 text-sm border-t border-zinc-200 pt-8">
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
      </main>
      <Footer />
    </>
  );
}
