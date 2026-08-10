import { Code2, Layers, Server, Bot, Wrench } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";

const CATEGORIES = [
  {
    icon: Code2,
    title: "Languages",
    items: ["Python", "Java", "JavaScript", "SQL", "Kotlin", "HTML/CSS", "XML", "C/C++"],
  },
  {
    icon: Layers,
    title: "Frontend",
    items: ["React.js", "React Native", "Tailwind CSS", "Three.js", "D3.js", "Mermaid.js", "Android (Kotlin/XML)"],
  },
  {
    icon: Server,
    title: "Backend & Data",
    items: ["Node.js", "Express.js", "Java Servlets", "Spring Boot", "MyBatis", "REST APIs", "MySQL", "APScheduler", "STOMP WebSocket"],
  },
  {
    icon: Bot,
    title: "AI / LLM",
    items: ["Google Gemini", "OpenAI", "Prompt Engineering", "Retrieval-Augmented Generation", "Model Context Protocol (MCP)"],
  },
  {
    icon: Wrench,
    title: "DevOps & Tools",
    items: ["Git & GitHub", "GitHub API (Octokit)", "Render", "Figma", "Claude Code", "VS Code", "Android Studio"],
  },
];

export default function Skills() {
  return (
    <section id="skills" className="border-b border-zinc-200">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader eyebrow="Toolbox" title="Technical Skills & Competencies" />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-zinc-200 border border-zinc-200">
          {CATEGORIES.map(({ icon: Icon, title, items }) => (
            <RevealItem key={title} hover={false} className="bg-white p-6">
              <div className="flex items-center gap-2 mb-4">
                <Icon className="h-4 w-4 text-zinc-500" strokeWidth={1.75} />
                <h3 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                  {title}
                </h3>
              </div>
              <ul className="flex flex-col gap-2.5">
                {items.map((item) => (
                  <li key={item} className="text-sm text-zinc-800">
                    {item}
                  </li>
                ))}
              </ul>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-6 text-sm text-zinc-500">
          <span className="font-medium text-zinc-700">Certified:</span> Introduction to Model
          Context Protocol (Anthropic)
        </p>
      </div>
    </section>
  );
}
