// Language-independent project data, indexed to match translations.ts `projects.items`.
export const PROJECTS_META = [
  {
    slug: "darfin",
    stack: ["React", "Spring Boot", "Java", "Python", "MySQL", "Google Gemini API"],
    imageAspect: "aspect-[1600/871]",
    images: [
      "/images/projects/darfin/landing.png",
      "/images/projects/darfin/watchlist.png",
      "/images/projects/darfin/company-overview.png",
      "/images/projects/darfin/ai-risk-analysis.png",
      "/images/projects/darfin/financial-trends.png",
      "/images/projects/darfin/disclosure-search.png",
      "/images/projects/darfin/mock-investment.png",
    ],
    githubUrl: "https://github.com/darfin-ai",
  },
  {
    slug: "seenior",
    stack: ["React", "Node.js", "Google Gemini API", "GitHub REST API (Octokit)", "Mermaid.js", "D3.js", "XYFlow"],
    imageAspect: "aspect-[1600/873]",
    images: [
      "/images/projects/seenior/landing.png",
      "/images/projects/seenior/documentation.png",
      "/images/projects/seenior/uml-flowchart.png",
      "/images/projects/seenior/quiz.png",
    ],
    githubUrl: "https://github.com/jinhoyon/Seenior",
  },
  {
    slug: "fitsbug",
    stack: ["Java", "Servlets", "MyBatis", "MySQL", "REST APIs", "AJAX", "Toss Payments"],
    imageAspect: "aspect-4/3",
    images: [
      "/images/projects/fitsbug/dashboard.png",
      "/images/projects/fitsbug/member-management.png",
      "/images/projects/fitsbug/revenue.png",
    ],
    githubUrl: "https://github.com/jinhoyon/fitsbug",
  },
  {
    slug: "nail-pholish",
    stack: ["Kotlin", "XML", "Android Studio"],
    imageAspect: "aspect-16/9",
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
