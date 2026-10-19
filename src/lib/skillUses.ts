import type { ProjectSlug } from "./projectsMeta";

/** Where a skill shows up: a project page, this portfolio itself, or the lab role in Experience. */
export type SkillUse = ProjectSlug | "site" | "iol";

/**
 * Skill name (as written in translations `skills.categories[].items`, identical in both languages)
 * to the places it was actually used. Skills missing here have no project on the site behind them.
 */
export const SKILL_USES: Record<string, readonly SkillUse[]> = {
  Python: ["darfin"],
  Java: ["darfin", "fitsbug"],
  TypeScript: ["seenior", "site"],
  JavaScript: ["darfin", "fitsbug"],
  SQL: ["darfin", "fitsbug"],
  Kotlin: ["nail-pholish"],
  "HTML/CSS": ["fitsbug", "site"],
  XML: ["darfin", "nail-pholish"],
  "React.js": ["darfin", "seenior", "site"],
  "Tailwind CSS": ["darfin", "seenior", "site"],
  "Three.js": ["site"],
  "D3.js": ["seenior"],
  "Mermaid.js": ["seenior"],
  "Java Servlets": ["fitsbug"],
  "Spring Boot": ["darfin"],
  MyBatis: ["fitsbug"],
  MySQL: ["fitsbug"],
  APScheduler: ["darfin"],
  "STOMP WebSocket": ["darfin"],
  "Google Gemini": ["darfin", "seenior"],
  "Prompt Engineering": ["darfin", "seenior"],
  "LLM Output Validation": ["darfin", "seenior"],
  "Git & GitHub": ["darfin", "seenior", "fitsbug", "nail-pholish"],
  Figma: ["darfin", "iol"],
  "Claude Code": ["seenior", "site"],
};
