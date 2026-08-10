// Language-independent project data, indexed to match translations.ts `projects.items`.
export const PROJECTS_META = [
  {
    slug: "darfin",
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
    slug: "seenior",
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
    slug: "fitsbug",
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
    slug: "nail-pholish",
    stack: ["Kotlin", "XML", "Android Studio"],
    images: [
      "[Placeholder: Add screenshot — pH reading screen]",
      "[Placeholder: Add screenshot — reading history]",
      "[Placeholder: Add screenshot — sensor pairing flow]",
      "[Placeholder: Add screenshot — app onboarding]",
    ],
    githubUrl: "https://github.com/jinhoyon/Nail-pHolish-App",
  },
] as const;

export type ProjectSlug = (typeof PROJECTS_META)[number]["slug"];
