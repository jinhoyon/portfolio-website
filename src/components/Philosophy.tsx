import { Users, Sparkles, Boxes } from "lucide-react";
import SectionHeader from "./SectionHeader";
import RevealGroup from "./motion/RevealGroup";
import RevealItem from "./motion/RevealItem";

const VALUES = [
  {
    icon: Users,
    title: "Teaching Through Building",
    description:
      "Partnering with hardware, backend, and research teams — and writing the design/test documentation that turned research findings into behavior non-engineers could understand and use, across 2 peer-reviewed publications.",
  },
  {
    icon: Sparkles,
    title: "Pragmatic AI Integration",
    description:
      "Building with Claude Code and Gemini as daily tools, not just APIs — pairing structured data with LLM reasoning instead of over-engineering brittle parsers, e.g. redesigning a filing-analysis pipeline to combine rule-based fields with LLM-powered semantic analysis.",
  },
  {
    icon: Boxes,
    title: "End-to-End Ownership",
    description:
      "Comfortable owning the full stack — relational schema design, payment lifecycles, and deployment — moving between Android/Kotlin, Java/Spring Boot, and React/Node.js as the problem demands.",
  },
];

export default function Philosophy() {
  return (
    <section id="architecture" className="border-b border-zinc-200 bg-zinc-50">
      <div className="mx-auto max-w-6xl px-6 py-20">
        <SectionHeader
          eyebrow="How I Work"
          title="Engineering Approach"
        />

        <RevealGroup className="grid md:grid-cols-3 gap-6">
          {VALUES.map(({ icon: Icon, title, description }) => (
            <RevealItem key={title} className="border border-zinc-200 bg-white p-7">
              <div className="h-10 w-10 flex items-center justify-center border border-zinc-300 mb-5">
                <Icon className="h-5 w-5 text-zinc-700" strokeWidth={1.5} />
              </div>
              <h3 className="text-base font-semibold text-zinc-900">{title}</h3>
              <p className="mt-2.5 text-sm text-zinc-500 leading-relaxed">
                {description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
