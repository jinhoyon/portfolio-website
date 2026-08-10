import { Github } from "lucide-react";
import ProjectImageCarousel from "./ProjectImageCarousel";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";

const PROJECTS = [
  {
    category: "AI-Powered Fullstack Platform",
    period: "Jun 2026 – Jul 2026",
    title: "Darfin — AI-Powered Company Analysis Platform",
    summary:
      "Built the DART filing pipeline in Python: API collection → XML parsing → diff vs. prior filing → Gemini-powered summarization and risk analysis, run twice daily via APScheduler plus an on-demand LLM worker queue. Also built the React frontend (financial trends, risk, business segments, shareholder status) against a Spring Boot query API, the landing page, and a shared design system.",
    metric: "Automated twice-daily DART filing analysis (06:00 / 18:00 KST)",
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
    category: "AI-Powered Developer Tooling — IBM Bob Hackathon",
    period: "May 2026",
    title: "Seenior — AI-Powered Developer Onboarding",
    summary:
      "End-to-end LLM app that cuts codebase ramp-up time from hours to under 60 seconds by integrating Google Gemini 2.5 with the GitHub REST API to auto-generate documentation, UML diagrams, and quizzes from any public repository. Rendered as interactive, clickable diagrams via a custom Mermaid.js validation pipeline built with D3.js and XYFlow.",
    metric: "Ramp-up time: hours → under 60 seconds",
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
    category: "Fullstack Marketplace Platform",
    period: "Apr 2026 – May 2026",
    title: "Fitsbug — Fitness Marketplace Platform",
    summary:
      "Designed relational database schemas and built an end-to-end personal-training reservation flow (calendars, booking, session history) backed by 20+ Java servlets and 10+ MyBatis mappers. Integrated Toss Payment Gateway for the full payment lifecycle, validated through end-to-end manual testing across cancellation and refund edge cases.",
    metric: "Full payment lifecycle: ready → success → cancel → refund",
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
    category: "HCI Research — Android App",
    period: "Mar 2025 – Sep 2025",
    title: "Nail pHolish — Wearable pH Sensing App",
    summary:
      "Shipped the front-end for an Android app surfacing real-time oral pH readings from a Nix Color Sensor, built in Kotlin/XML via Android Studio while iterating with hardware and backend teammates on debugging and usability. Work was co-authored into 2 peer-reviewed publications (ACM & INTERACT 2025).",
    metric: "Co-authored 2 peer-reviewed publications (ACM, INTERACT 2025)",
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
  return (
    <section id="projects" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader
          eyebrow="Selected Work"
          title="Featured Projects"
          subtitle="Fullstack and AI/LLM-powered systems, plus HCI research work shipped as production apps."
        />

        <RevealGroup className="flex flex-col gap-8">
          {PROJECTS.map((project) => (
            <RevealItem
              key={project.title}
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
                    GitHub Repo
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
