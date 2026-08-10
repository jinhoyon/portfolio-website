"use client";

import { Github } from "lucide-react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";
import { useLanguage } from "@/lib/LanguageContext";
import { translations } from "@/lib/translations";

const PROJECT_META = [
  {
    stack: ["React", "Spring Boot", "Java", "Python", "MySQL", "Google Gemini API"],
    images: [
      "[Placeholder: Add screenshot — financial trends view]",
      "[Placeholder: Add screenshot — risk analysis view]",
      "[Placeholder: Add screenshot — business segments view]",
      "[Placeholder: Add screenshot — shareholder status view]",
    ],
    githubUrl: "https://github.com/darfin-ai",
  },
  {
    stack: ["React", "Node.js", "Google Gemini API", "GitHub REST API (Octokit)", "Mermaid.js", "D3.js", "XYFlow"],
    images: [
      "[Placeholder: Add screenshot — auto-generated documentation]",
      "[Placeholder: Add screenshot — interactive UML diagram]",
      "[Placeholder: Add screenshot — repository quiz]",
      "[Placeholder: Add screenshot — architecture breakdown view]",
    ],
    githubUrl: "https://github.com/jinhoyon/Seenior",
  },
  {
    stack: ["Java", "Servlets", "MyBatis", "MySQL", "REST APIs", "AJAX", "Toss Payments"],
    images: [
      "[Placeholder: Add screenshot — booking calendar]",
      "[Placeholder: Add screenshot — reservation flow]",
      "[Placeholder: Add screenshot — session history]",
      "[Placeholder: Add screenshot — Toss payment checkout]",
    ],
    githubUrl: "https://github.com/jinhoyon/fitsbug",
  },
  {
    stack: ["Kotlin", "XML", "Android Studio"],
    images: [
      "[Placeholder: Add screenshot — pH reading screen]",
      "[Placeholder: Add screenshot — reading history]",
      "[Placeholder: Add screenshot — sensor pairing flow]",
      "[Placeholder: Add screenshot — app onboarding]",
    ],
    githubUrl: "https://github.com/jinhoyon/Nail-pHolish-App",
  },
];

export default function Projects() {
  const { language } = useLanguage();
  const t = translations[language].projects;
  const projects = t.items.map((item, i) => ({ ...item, ...PROJECT_META[i] }));

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
                <h3 className="mt-2 text-xl font-semibold text-zinc-900">
                  {project.title}
                </h3>
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
