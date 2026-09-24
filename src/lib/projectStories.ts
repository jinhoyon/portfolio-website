import type { Language } from "./translations";
import type { ProjectSlug } from "./projectsMeta";

// Narrative project pages: intention → decisions → evidence → outcome → reflection.
// A project with a story here renders the narrative layout; others fall back to
// the summary layout in ProjectDetail.

export type StoryFigure = { src: string; alt: string; caption: string };

// Live component specimens rendered by DarfinSpecimens.tsx.
export type SpecimenKey = "buttons" | "badges" | "aiCallout" | "segmented" | "riskStates" | "priceColors";

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "evidence"; title: string; context: string; note: string; items: { title: string; file: string; code: string; finding: string; implication: string }[] }
  | { type: "link"; label: string; href: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "paths"; items: { label: string; text: string }[] }
  | { type: "figure"; figure: StoryFigure }
  | { type: "diagram"; figure: StoryFigure & { width: number; height: number }; openLabel: string }
  | { type: "gallery"; caption: string; openLabel: string; items: (StoryFigure & { width: number; height: number })[] }
  | { type: "overview"; items: { label: string; title: string; text: string }[] }
  | { type: "stats"; items: { value: string; label: string }[] }
  // firstColumn "key" (default) styles the first column as a short mono label; "text" keeps it as prose.
  | { type: "table"; caption: string; columns: string[]; rows: string[][]; firstColumn?: "key" | "text" }
  | { type: "details"; summary: string; blocks: StoryBlock[] }
  | {
      type: "annotatedFigure";
      figure: StoryFigure & { width: number; height: number };
      // x/y are percentages of the image's width/height.
      notes: { x: number; y: number; title: string; text: string }[];
    }
  | { type: "imageComparison"; title: string; description: string; openLabel: string; before: StoryFigure & { label: string }; after: StoryFigure & { label: string } }
  | { type: "swatches"; caption: string; groups: { label: string; items: { name: string; token: string; hex: string }[] }[] }
  | { type: "typeScale"; caption: string; items: { role: string; spec: string; sample: string; size: number; weight: number }[] }
  | { type: "specimens"; caption: string; items: { component: SpecimenKey; label: string; note: string }[] }
  | {
      type: "compare";
      before: { label: string; points: string[] };
      after: { label: string; points: string[] };
    };

export type StorySection = {
  id: string;
  eyebrow: string;
  heading: string;
  blocks: StoryBlock[];
};

// Groups sections for the contents and the page body. Order here is render order;
// `label` is the short name shown in the contents (section headings stay long).
export type StoryPart = {
  label: string;
  description: string;
  sections: { id: string; label: string }[];
};

export type ProjectStory = {
  tagline: string;
  contentsLabel: string;
  facts: { label: string; value: string }[];
  cover: StoryFigure;
  sections: StorySection[];
  parts?: StoryPart[];
};

export type ResolvedStoryPart = Omit<StoryPart, "sections"> & {
  sections: { section: StorySection; label: string }[];
};

/** Resolve each part's section ids to sections; ids that don't match are skipped. */
export function resolveStoryParts(story: ProjectStory): ResolvedStoryPart[] | undefined {
  const byId = new Map(story.sections.map((s) => [s.id, s]));
  return story.parts?.map((part) => ({
    ...part,
    sections: part.sections.flatMap(({ id, label }) => {
      const section = byId.get(id);
      return section ? [{ section, label }] : [];
    }),
  }));
}

export const storyPartId = (i: number) => `part-${i + 1}`;

export const PROJECT_STORIES: Partial<Record<ProjectSlug, Record<Language, ProjectStory>>> = {
  "darfin": {
    "en": {
      "tagline": "Making company disclosures easier to investigate: structured company information, financial trends, and AI-assisted risk explanations in one interface.",
      "facts": [
        {
          "label": "Role",
          "value": "Company-analysis pipeline, API, and UI"
        },
        {
          "label": "Team",
          "value": "Team of 4 · Jun–Jul 2026"
        },
        {
          "label": "Also contributed",
          "value": "Landing redesign and shared design system"
        },
        {
          "label": "Tools",
          "value": "Claude and Cursor (AI-assisted development)"
        }
      ],
      "cover": {
        "src": "/images/projects/darfin/company-overview.png",
        "alt": "Darfin company overview page for Samsung Electronics showing shareholder ratios, dividend yield, employee count, and a list of recent reports",
        "caption": "Company overview for Samsung Electronics: shareholder structure, dividend yield, headcount, and the latest reports, pulled together from its DART filings."
      },
      "sections": [
        {
          "id": "why",
          "eyebrow": "Why I built it",
          "heading": "Public isn't the same as accessible",
          "blocks": [
            {
              "type": "p",
              "text": "A friend who works as an investment banker in Korea told me his main source of truth is DART, the government's electronic filing system. Nothing he relies on is secret; it's all public. When I tried DART myself, I was lost."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/dart-homepage.png",
                "width": 1920,
                "height": 958,
                "alt": "DART's homepage with an integrated disclosure search, ten filing-type checkboxes, and a grid of report-section filters",
                "caption": "DART (dart.fss.or.kr). You pick a filing type and report section before you see anything."
              },
              "openLabel": "Open full-size image"
            },
            {
              "type": "quote",
              "text": "The information was open. That didn't make it accessible."
            },
            {
              "type": "gallery",
              "caption": "Finding one figure means downloading a report and paging through all of it.",
              "openLabel": "Open full-size image",
              "items": [
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-cover.png",
                  "width": 642,
                  "height": 827,
                  "alt": "Quarterly report cover page",
                  "caption": "Cover"
                },
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-business.png",
                  "width": 659,
                  "height": 826,
                  "alt": "Quarterly report business overview page, dense Korean text",
                  "caption": "Business overview"
                },
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-financials.png",
                  "width": 656,
                  "height": 826,
                  "alt": "Quarterly report consolidated financial statement table",
                  "caption": "Financial statements"
                }
              ]
            },
            {
              "type": "p",
              "text": "I wanted someone like me to start from the same information he works with, without learning the system first."
            }
          ]
        },
        {
          "id": "features",
          "eyebrow": "What Darfin does",
          "heading": "Four features, one path",
          "blocks": [
            {
              "type": "p",
              "text": "Our team framed three gaps: comparing filings by hand, missing the changes that matter, and research scattered across sites. I led company analysis; teammates led the other three."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "Company analysis · my focus",
                  "text": "Turns annual and quarterly reports into an overview, financial trends, and risk statuses, so you don't compare reports by hand."
                },
                {
                  "label": "Disclosure analysis",
                  "text": "Summarizes long ad-hoc filings, such as major events and share issuances, so you know which ones are worth opening."
                },
                {
                  "label": "Mock trading",
                  "text": "Practice with real-time prices and virtual money, then get a portfolio score. Act on what you learned without the risk."
                },
                {
                  "label": "Community",
                  "text": "Ask a question about a company and accept the best answer. Beginners learn from people who already read filings."
                }
              ]
            },
            {
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/financial-trends.png",
                "alt": "Darfin financial trends showing quarterly revenue, operating profit, and net income",
                "caption": "Company analysis has three views: overview, AI analysis, and financial trends (shown)."
              }
            },
            {
              "type": "stats",
              "items": [
                {
                  "value": "30",
                  "label": "companies seeded"
                },
                {
                  "value": "3",
                  "label": "views per company"
                },
                {
                  "value": "7",
                  "label": "rule-based risk states"
                },
                {
                  "value": "2×",
                  "label": "daily filing scans"
                }
              ]
            }
          ]
        },
        {
          "id": "design-why",
          "eyebrow": "Design rationale",
          "heading": "Built for reading the source, not watching the market",
          "blocks": [
            {
              "type": "p",
              "text": "Before designing, I looked at how people reach this information today. Three things felt off."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "DART: learn the system first",
                  "text": "You choose from ten filing types before you see anything. Our team counted seven stops before you learn what changed."
                },
                {
                  "label": "DartPoint AI: the market comes first",
                  "text": "The homepage leads with stock prices and an AI chat, and the judgments come from AI summaries. It covers every listed company, but reads like a market app with AI added."
                },
                {
                  "label": "Our first mockup: a score without a basis",
                  "text": "A stock ticker, an AI score, and a promotional headline. A score asks you to trust a number without showing where it came from."
                }
              ]
            },
            {
              "type": "link",
              "label": "Visit DartPoint AI",
              "href": "https://dartpoint.ai"
            },
            {
              "type": "quote",
              "text": "Check the basis for an interpretation before the opinion."
            },
            {
              "type": "p",
              "text": "That line from our presentation became the brief. In practice, Darfin:"
            },
            {
              "type": "list",
              "items": [
                "Starts from the company, not the filing type.",
                "Leads with what the filing says, not with prices or scores.",
                "Marks every AI-written line in blue, and uses blue for nothing else except actions.",
                "Shows each risk's status and how long it has lasted, instead of one score.",
                "Keeps the visuals quiet so the content leads."
              ]
            },
            {
              "type": "details",
              "summary": "Compare Darfin with DartPoint AI",
              "blocks": [
                {
                  "type": "table",
                  "caption": "Two approaches to the same gap",
                  "columns": [
                    "Aspect",
                    "DartPoint AI",
                    "Darfin"
                  ],
                  "rows": [
                    [
                      "Coverage",
                      "All listed companies, plus stock prices and forecasts",
                      "30 seeded companies"
                    ],
                    [
                      "Financial ratios",
                      "Values shown with their components",
                      "Combined into a status for each risk area"
                    ],
                    [
                      "AI",
                      "Summarizes one filing at a time; chat assistant",
                      "Explains computed statuses across quarters"
                    ],
                    [
                      "Who judges",
                      "Generative AI, inside each filing summary",
                      "Rules in code; the model explains"
                    ],
                    [
                      "Change over time",
                      "A chart per metric; year-over-year figures in summaries",
                      "Status per risk area: new, worsening, persisting, improving, resolved"
                    ]
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "ui-redesign",
          "eyebrow": "Before and after",
          "heading": "Two screens, redesigned",
          "blocks": [
            {
              "type": "p",
              "text": "I redesigned the landing page and disclosure search. The earlier versions are the team's first designs."
            },
            {
              "type": "link",
              "label": "Explore the original design in Figma",
              "href": "https://www.figma.com/make/4bvtlHQv0f03JmfNHHCJ7x/Darfin-Dart-Finance-"
            },
            {
              "type": "imageComparison",
              "title": "Landing page: show the source beside the explanation",
              "description": "The earlier hero led with a ticker, an AI score, and promotional claims. The redesign puts a filing excerpt beside its explanation.",
              "openLabel": "Open full-size image",
              "before": {
                "label": "Before · Initial mockup",
                "src": "/images/projects/darfin/slide-31-landing.png",
                "alt": "Original Darfin landing mockup with stock ticker, AI score card, and large promotional headline",
                "caption": "Original landing-page mockup by sanghyxuk."
              },
              "after": {
                "label": "After · My redesign",
                "src": "/images/projects/darfin/slide-32-landing.png",
                "alt": "Redesigned Darfin landing page with a filing excerpt and AI explanation side by side",
                "caption": "Redesigned landing page. The preview includes an excerpt, explanation, and source reference."
              }
            },
            {
              "type": "imageComparison",
              "title": "Disclosure search: make the company the starting point",
              "description": "The redesign makes the company input the main entry point and groups the optional filters beneath it.",
              "openLabel": "Open full-size image",
              "before": {
                "label": "Before · Original search UI",
                "src": "/images/projects/darfin/slide-31-disclosure-search.png",
                "alt": "Original disclosure search interface with a large form card containing company, date, and filing-type fields",
                "caption": "The original form presents company, date, and disclosure type inside one large card."
              },
              "after": {
                "label": "After · My redesign",
                "src": "/images/projects/darfin/slide-32-disclosure-search.png",
                "alt": "Redesigned disclosure search with a central company input and date and filing-type filters below",
                "caption": "The redesigned page separates the primary search input from the filter area."
              }
            }
          ]
        },
        {
          "id": "design-system",
          "eyebrow": "Design system",
          "heading": "One set of recipes for every page",
          "blocks": [
            {
              "type": "p",
              "text": "Each teammate had styled their own pages, so the blues, cards, and palettes drifted apart. I turned the look we already had into 53 shared class recipes and moved most pages onto them in one change."
            },
            {
              "type": "details",
              "summary": "Show the full design system: colors, type, components, and rules",
              "blocks": [
                {
                  "type": "steps",
                  "items": [
                    "Audit the company-analysis pages, the most complete surface, and inventory the classes they actually use",
                    "Write DESIGN_SYSTEM.md: principles, color, type, layout, components, motion, content rules, and audit notes",
                    "Encode the patterns as named constants in uiRecipes.js (CARD, BTN_PRIMARY, AI_CALLOUT, …)",
                    "Migrate account, auth, community, disclosure, company analysis, and the app shell in one change"
                  ]
                },
                {
                  "type": "stats",
                  "items": [
                    {
                      "value": "53",
                      "label": "shared class recipes"
                    },
                    {
                      "value": "80",
                      "label": "files changed in one commit"
                    },
                    {
                      "value": "2",
                      "label": "themes: light and dark"
                    },
                    {
                      "value": "2",
                      "label": "languages: Korean and English"
                    }
                  ]
                },
                {
                  "type": "quote",
                  "text": "If it's blue, you can click it or the AI wrote it."
                },
                {
                  "type": "p",
                  "text": "That rule from the design doc sums up the system. Neutrals are always slate, blue appears only on actions and AI-written insight, and nothing is heavier than semibold, so hierarchy comes from size, color, and space. Every color ships with a dark-mode pair."
                },
                {
                  "type": "swatches",
                  "caption": "Color tokens (Tailwind names, light theme)",
                  "groups": [
                    {
                      "label": "Structure",
                      "items": [
                        {
                          "name": "Page",
                          "token": "slate-50",
                          "hex": "#F8FAFC"
                        },
                        {
                          "name": "Card",
                          "token": "white",
                          "hex": "#FFFFFF"
                        },
                        {
                          "name": "Border",
                          "token": "slate-200",
                          "hex": "#E2E8F0"
                        },
                        {
                          "name": "Secondary text",
                          "token": "slate-500",
                          "hex": "#64748B"
                        },
                        {
                          "name": "Heading",
                          "token": "slate-900",
                          "hex": "#0F172A"
                        }
                      ]
                    },
                    {
                      "label": "Action and AI",
                      "items": [
                        {
                          "name": "Primary action",
                          "token": "blue-600",
                          "hex": "#2563EB"
                        },
                        {
                          "name": "AI lead text",
                          "token": "blue-700",
                          "hex": "#1D4ED8"
                        },
                        {
                          "name": "AI callout fill",
                          "token": "blue-50",
                          "hex": "#EFF6FF"
                        }
                      ]
                    },
                    {
                      "label": "Korean market convention",
                      "items": [
                        {
                          "name": "Up · buy",
                          "token": "red-500",
                          "hex": "#EF4444"
                        },
                        {
                          "name": "Down · sell",
                          "token": "blue-500",
                          "hex": "#3B82F6"
                        }
                      ]
                    },
                    {
                      "label": "Risk states (AI analysis tab)",
                      "items": [
                        {
                          "name": "New",
                          "token": "red-400",
                          "hex": "#F87171"
                        },
                        {
                          "name": "Worsening",
                          "token": "red-500",
                          "hex": "#EF4444"
                        },
                        {
                          "name": "Persisting",
                          "token": "amber-400",
                          "hex": "#FBBF24"
                        },
                        {
                          "name": "Improving",
                          "token": "blue-400",
                          "hex": "#60A5FA"
                        },
                        {
                          "name": "Resolved",
                          "token": "emerald-300",
                          "hex": "#6EE7B7"
                        },
                        {
                          "name": "Normal",
                          "token": "emerald-200",
                          "hex": "#A7F3D0"
                        },
                        {
                          "name": "Insufficient data",
                          "token": "slate-200",
                          "hex": "#E2E8F0"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "typeScale",
                  "caption": "Type scale (system sans, weights 500 and 600 only)",
                  "items": [
                    {
                      "role": "Hero title",
                      "spec": "56px · 600 · tight",
                      "sample": "공시를 쉽게",
                      "size": 56,
                      "weight": 600
                    },
                    {
                      "role": "Page title",
                      "spec": "30px · 600",
                      "sample": "삼성전자 기업 분석",
                      "size": 30,
                      "weight": 600
                    },
                    {
                      "role": "Section title",
                      "spec": "18px · 600",
                      "sample": "주요 주주 현황",
                      "size": 18,
                      "weight": 600
                    },
                    {
                      "role": "Body",
                      "spec": "16px · 400 · relaxed",
                      "sample": "최근 공시의 핵심 내용을 한 화면에서 확인하세요.",
                      "size": 16,
                      "weight": 400
                    },
                    {
                      "role": "Label",
                      "spec": "14px · 500",
                      "sample": "분기보고서 · 2026.05.15",
                      "size": 14,
                      "weight": 500
                    },
                    {
                      "role": "Eyebrow and meta",
                      "spec": "12px · 500 · slate-400",
                      "sample": "01 · 기업 분석",
                      "size": 12,
                      "weight": 500
                    }
                  ]
                },
                {
                  "type": "specimens",
                  "caption": "Signature components, rendered from the recipes (UI copy is Darfin's Korean)",
                  "items": [
                    {
                      "component": "aiCallout",
                      "label": "AI callout",
                      "note": "The signature element. Marks every AI-written insight with a lightbulb and a blue tint."
                    },
                    {
                      "component": "riskStates",
                      "label": "Risk-state badges",
                      "note": "Seven states from the rule-based engine. Bad is red, watch is amber, improving is blue."
                    },
                    {
                      "component": "buttons",
                      "label": "Buttons",
                      "note": "Fixed 40px height. One primary action per section."
                    },
                    {
                      "component": "segmented",
                      "label": "Segmented tabs",
                      "note": "Used for the three company views."
                    },
                    {
                      "component": "badges",
                      "label": "Badges",
                      "note": "Pill shape; info, working, and neutral variants."
                    },
                    {
                      "component": "priceColors",
                      "label": "Price colors",
                      "note": "Red for gains and blue for losses, following Korean market convention."
                    }
                  ]
                },
                {
                  "type": "compare",
                  "before": {
                    "label": "Avoid",
                    "points": [
                      "Raw hex values or one-off class strings in page code",
                      "Bold (700+) type; the wordmark is the only exception",
                      "Blue on anything that isn't clickable or AI-written",
                      "A light-only color without its dark pair",
                      "Hard-coded copy instead of Korean and English locale keys"
                    ]
                  },
                  "after": {
                    "label": "Required",
                    "points": [
                      "Cards: 1px slate-200 border, 12px radius, no shadow",
                      "Tabular numerals for every price, count, and date",
                      "word-break: keep-all so Korean words don't split",
                      "Source markers (DART attribution, receipt numbers) kept visible",
                      "Every animation collapses to its end state under reduced motion"
                    ]
                  }
                },
                {
                  "type": "evidence",
                  "title": "What the recipes look like in code",
                  "context": "Pages import named constants instead of retyping class strings.",
                  "note": "Source: darfin-front commit 392abc3 (Jul 8, 2026). The design doc was later removed from the repo during pre-deploy cleanup; uiRecipes.js remains.",
                  "items": [
                    {
                      "title": "Shared recipe module",
                      "file": "darfin-front/src/app/shared/lib/uiRecipes.js",
                      "code": "export const CARD =\n  \"rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900\";\n\nexport const AI_CALLOUT =\n  \"flex gap-2 rounded-md border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 px-3.5 py-3\";\n\nexport const PRICE_UP = \"text-red-500 dark:text-red-400\";\nexport const PRICE_DOWN = \"text-blue-500 dark:text-blue-400\";",
                      "finding": "Each constant carries its dark-mode pair, so a page can't ship a light-only color by accident.",
                      "implication": "Changing a recipe restyles every screen that imports it, instead of hunting down copies of the same class string."
                    }
                  ]
                },
                {
                  "type": "details",
                  "summary": "Inconsistencies I logged instead of fixing",
                  "blocks": [
                    {
                      "type": "list",
                      "items": [
                        "Two shades of the same \"example\" badge blue (blue-600 and blue-700) for one component role.",
                        "Five card paddings in use; new cards should pick from those instead of adding a sixth.",
                        "The shadcn theme tokens still pointed at near-black defaults, not Darfin blue, so only dialogs and dropdowns used them.",
                        "Footer links were still placeholders."
                      ]
                    }
                  ]
                },
                {
                  "type": "p",
                  "text": "One limit: I also migrated the paper-trading pages, then reverted that change the same day. Trading's shared primitives use the recipes, but its pages keep their original styling."
                }
              ]
            }
          ]
        },
        {
          "id": "architecture",
          "eyebrow": "How it works",
          "heading": "Collect on a schedule, call AI on request",
          "blocks": [
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/architecture.png",
                "width": 2688,
                "height": 895,
                "alt": "Architecture diagram: DART feeds a scheduled Python pipeline into MariaDB; Spring Boot reads and writes MariaDB, computes metrics and risk states, and serves React; AI workers running Gemini pick up jobs from MariaDB",
                "caption": "The pipeline writes filings and financial data twice a day. Spring computes metrics and risk states, and queues an AI job only when someone opens the AI tab."
              },
              "openLabel": "Open full-size image"
            },
            {
              "type": "p",
              "text": "The pipeline collects filings at 06:00 and 18:00 KST. Spring computes metrics and risk states, and queues an AI job only when someone opens the AI tab, so no model calls are spent on companies nobody views. Panels that don't need AI render right away."
            },
            {
              "type": "p",
              "text": "I built the company-analysis path end to end, including the first job queue and worker. Sanghyxuk later added concurrent workers."
            }
          ]
        },
        {
          "id": "data-source",
          "eyebrow": "Decision 01",
          "heading": "Numbers from the API, text from the XML",
          "blocks": [
            {
              "type": "p",
              "text": "I first parsed DART's XML filings for everything. Text worked; numbers didn't. Samsung Electronics marked up revenue four different ways across four filings:"
            },
            {
              "type": "table",
              "caption": "Samsung Electronics · revenue across filings",
              "columns": [
                "Filing",
                "How revenue appears",
                "Why one rule breaks"
              ],
              "rows": [
                [
                  "2023 Q3",
                  "Packed into one ACODE string with context, decimals, and currency",
                  "No separate ADECIMAL attribute anywhere in the file"
                ],
                [
                  "FY2024",
                  "Split across ACODE, ACONTEXT, and ADECIMAL",
                  "Needs a different attribute-reading rule"
                ],
                [
                  "2023 Q1 · 2024 Q1",
                  "Layout code X23, with no IFRS concept",
                  "Matching ifrs-full_Revenue finds nothing"
                ],
                [
                  "FY2023",
                  "Label 영업수익: 16×, but 0× in FY2022 and FY2024",
                  "Label text isn't a stable identifier"
                ]
              ]
            },
            {
              "type": "details",
              "summary": "See the raw XML evidence (4 files)",
              "blocks": [
                {
                  "type": "evidence",
                  "title": "The same company, different XML representations",
                  "context": "Samsung Electronics · corp_code 00126380",
                  "note": "Source: raw DART files in darfin-company-analysis/data/raw/00126380/. Attribute excerpts are shortened with … for readability; the last example shows label occurrence counts, not XML.",
                  "items": [
                    {
                      "title": "2023 Q3: several fields in one attribute",
                      "file": "20231114002109.xml",
                      "code": "ACODE=\"ifrs-full_Revenue|CFY2023dTQQ_…ConsolidatedMember|-6|KRW|\"",
                      "finding": "0 ADECIMAL attributes in the entire file.",
                      "implication": "A parser expecting a separate decimal attribute would miss that metadata. Here, the concept, context, decimal value, and currency have to be unpacked from ACODE."
                    },
                    {
                      "title": "FY2024: the same metadata in separate attributes",
                      "file": "20250311001085.xml",
                      "code": "ACODE=\"ifrs-full_Revenue\"\nACONTEXT=\"CFY2024dFY_…\"\nADECIMAL=\"-6\"",
                      "finding": "1,016 ADECIMAL attributes in the file.",
                      "implication": "The extraction logic now needs to read ACODE, ACONTEXT, and ADECIMAL separately. One attribute-reading rule cannot cover both representations."
                    },
                    {
                      "title": "2023 Q1 and 2024 Q1: layout codes instead of concepts",
                      "file": "20230515002335.xml · 20240516001421.xml",
                      "code": "ACODE=\"X23\"",
                      "finding": "These files use layout codes such as X23 without an IFRS concept.",
                      "implication": "Matching ACODE against ifrs-full_Revenue cannot identify revenue in this representation. The parser needs additional table or label context."
                    },
                    {
                      "title": "Across annual reports: labels change too",
                      "file": "20240312000736.xml (FY2023)",
                      "code": "영업수익\nFY2022: 0\nFY2023: 16\nFY2024: 0",
                      "finding": "The label 영업수익 occurs 16 times in FY2023 and zero times in the FY2022 and FY2024 annual reports.",
                      "implication": "An exact text match cannot serve as a stable identifier across years. A missing label does not mean the underlying financial concept is absent."
                    }
                  ]
                }
              ]
            },
            {
              "type": "p",
              "text": "So the parser now handles narrative sections only, and every number comes from DART's structured endpoints."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/data-sources.png",
                "width": 2688,
                "height": 824,
                "alt": "Diagram: a DART filing branches into original XML, which becomes narrative sections for Gemini, and structured OpenAPI, which becomes financial data for Java metrics and risk states; XML is a dashed fallback",
                "caption": "Each source does the job it's reliable for. The XML path stays as a fallback for key information such as dividends and shareholders."
              },
              "openLabel": "Open full-size image"
            }
          ]
        },
        {
          "id": "risk-engine",
          "eyebrow": "Decision 02",
          "heading": "Code sets the status; the model explains it",
          "blocks": [
            {
              "type": "steps",
              "items": [
                "Structured financial data",
                "Metrics calculated in Java",
                "Rule-based risk states",
                "Gemini explanation"
              ]
            },
            {
              "type": "p",
              "text": "Java calculates the financial measures, and a rule-based state machine gives each risk a status, from new to resolved. Gemini only writes the explanation, from the computed signals and the filing text."
            },
            {
              "type": "details",
              "summary": "Show the calculations: 8 measures and what each one checks",
              "blocks": [
                {
                  "type": "p",
                  "text": "Each measure answers one plain question about the company, and each one feeds a specific risk card."
                },
                {
                  "type": "table",
                  "caption": "What Darfin calculates, and why",
                  "columns": [
                    "Measure",
                    "The question it answers",
                    "How Darfin uses it"
                  ],
                  "rows": [
                    [
                      "Current ratio",
                      "Can it pay the bills due within a year? Current assets ÷ current liabilities.",
                      "Liquidity: flagged below 1.0, or when it falls 1.5σ below the company's own 12-quarter average."
                    ],
                    [
                      "Debt ratio",
                      "How much of the business is funded by borrowing? Total liabilities ÷ equity.",
                      "Leverage: flagged above 200%, or when equity is negative."
                    ],
                    [
                      "Interest coverage",
                      "Does operating profit cover interest payments? Operating income ÷ interest expense.",
                      "Leverage: flagged below 1×."
                    ],
                    [
                      "Accruals ratio",
                      "Is reported profit backed by cash? (Net income − operating cash flow) ÷ total assets.",
                      "Earnings quality: flagged above 10%, or when there's a profit but operating cash flow is negative."
                    ],
                    [
                      "DuPont components",
                      "What drives return on equity? ROE = net margin × asset turnover × leverage (assets ÷ equity), with margin and turnover over the trailing 12 months.",
                      "Shows whether returns come from margins, efficiency, or borrowing. Asset turnover also feeds the operational card."
                    ],
                    [
                      "Altman Z′",
                      "How close is the company to financial distress? A weighted score of working capital, retained earnings, operating profit, equity, and sales, each scaled by assets or liabilities.",
                      "Going concern: flagged below 1.1, the distress zone, or when equity is negative."
                    ],
                    [
                      "Piotroski F (partial)",
                      "Are the fundamentals getting stronger? Seven yes/no checks on profitability, cash flow, leverage, liquidity, and efficiency.",
                      "Shown as supporting evidence on the earnings-quality card; it doesn't set a status."
                    ],
                    [
                      "Cash conversion cycle",
                      "How long is cash tied up in operations? Receivable days + inventory days − payable days.",
                      "Operational: flagged when it rises 1.5σ above the company's own history, or when operating margin or asset turnover falls 1.5σ below it."
                    ]
                  ]
                },
                {
                  "type": "details",
                  "summary": "Why these measures, and what's approximated",
                  "blocks": [
                    {
                      "type": "list",
                      "items": [
                        "They're standard, published formulas, so every status can be traced back to numbers in the filing. That's the reason the calculation lives in code instead of the model.",
                        "A ratio that's normal for a bank can be alarming for a chipmaker. With no peer data yet, Darfin also compares each company to its own last 12 quarters (a z-score), and needs at least 8 quarters before judging at all.",
                        "Altman Z′ is the private-company variant: book equity replaces market capitalization, so it only needs filing data.",
                        "Piotroski F uses 7 of its 9 signals; new share issuance and gross margin weren't extracted.",
                        "Working-capital days use revenue in place of cost of goods sold, which wasn't extracted, over a 91-day quarter.",
                        "Annual reports give full-year totals, so Q4 is derived as the annual figure minus the first three quarters.",
                        "The thresholds are provisional and were left for a team decision."
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "annotatedFigure",
              "figure": {
                "src": "/images/projects/darfin/ai-risk-analysis.png",
                "alt": "Darfin AI analysis view with six risk categories, statuses, and explanations",
                "caption": "Samsung Electronics' AI analysis tab (Korean UI).",
                "width": 1600,
                "height": 870
              },
              "notes": [
                {
                  "x": 34.6,
                  "y": 39.3,
                  "title": "Status badge → code",
                  "text": "“Resolved” is assigned by the Java state machine from computed metrics, not by the model."
                },
                {
                  "x": 12.5,
                  "y": 50.6,
                  "title": "Explanation → Gemini",
                  "text": "The paragraph is generated from the computed state and signals, plus risks extracted from the filing text."
                },
                {
                  "x": 47.5,
                  "y": 52.1,
                  "title": "Figures → structured data",
                  "text": "Values like the 0.30 debt ratio and 11.78× interest coverage are calculated in Java and quoted, not generated."
                },
                {
                  "x": 58.6,
                  "y": 67.4,
                  "title": "Missing data stays visible",
                  "text": "Governance has no quantitative signal yet, so it shows “Insufficient data” instead of a guess."
                }
              ]
            }
          ]
        },
        {
          "id": "validation",
          "eyebrow": "Evidence and limits",
          "heading": "What was checked, and what wasn't",
          "blocks": [
            {
              "type": "stats",
              "items": [
                {
                  "value": "24 / 24",
                  "label": "Python tests passing: reporting periods, DART response parsing, LLM requests"
                },
                {
                  "value": "75",
                  "label": "Java test methods written: metrics, risk states, freshness rules"
                }
              ]
            },
            {
              "type": "p",
              "text": "Tests cover the pipeline and the risk engine. Not proven yet:"
            },
            {
              "type": "list",
              "items": [
                "AI output was checked by hand; there's no benchmark dataset yet.",
                "Risk thresholds are provisional, and long narrative inputs are truncated.",
                "There are no latency benchmarks or production usage data.",
                "The redesigns changed hierarchy and presentation; usability wasn't measured, and numbers shown in the mockups are placeholders.",
                "Section-by-section filing diffs are still computed, but the final interface doesn't show them."
              ]
            },
            {
              "type": "p",
              "text": "Next, I'd build an evaluation set for financial values, extracted events, and generated explanations."
            }
          ]
        },
        {
          "id": "reflection",
          "eyebrow": "Team and takeaways",
          "heading": "What I owned, and what I learned",
          "blocks": [
            {
              "type": "p",
              "text": "I led company analysis across Python, Spring Boot, and React, redesigned the landing page, and built the shared design system with dark mode and English. Sanghyxuk made the first landing and company mockups and added worker concurrency; Prefix05 led the disclosure backend; other teammates led trading, community, authentication, and payments."
            },
            {
              "type": "p",
              "text": "The lesson I'd keep: people trust a system more when they can tell what it read, what it calculated, and what it generated. Darfin's design and architecture both come down to keeping those three visible."
            }
          ]
        }
      ],
      "contentsLabel": "Inside the project",
      "parts": [
        {
          "label": "Overview",
          "description": "The problem and the product",
          "sections": [
            {
              "id": "why",
              "label": "Why I built it"
            },
            {
              "id": "features",
              "label": "What Darfin does"
            }
          ]
        },
        {
          "label": "Design",
          "description": "Why it looks the way it does",
          "sections": [
            {
              "id": "design-why",
              "label": "Why this design"
            },
            {
              "id": "ui-redesign",
              "label": "Redesign"
            },
            {
              "id": "design-system",
              "label": "Design system"
            }
          ]
        },
        {
          "label": "Engineering",
          "description": "How it works",
          "sections": [
            {
              "id": "architecture",
              "label": "How it works"
            },
            {
              "id": "data-source",
              "label": "Two data sources"
            },
            {
              "id": "risk-engine",
              "label": "Risk engine"
            }
          ]
        },
        {
          "label": "Wrap-up",
          "description": "Limits, credit, and lessons",
          "sections": [
            {
              "id": "validation",
              "label": "Evidence and limits"
            },
            {
              "id": "reflection",
              "label": "Team and takeaways"
            }
          ]
        }
      ]
    },
    "ko": {
      "tagline": "기업 공시를 더 쉽게 살펴볼 수 있도록, 구조화된 기업 정보와 재무 추이, AI 기반 리스크 설명을 한 화면에 모았습니다.",
      "facts": [
        {
          "label": "역할",
          "value": "기업 분석 파이프라인·API·UI"
        },
        {
          "label": "팀",
          "value": "4인 팀 · 2026년 6–7월"
        },
        {
          "label": "추가 기여",
          "value": "랜딩 리디자인·공통 디자인 시스템"
        },
        {
          "label": "도구",
          "value": "Claude·Cursor (AI 보조 개발)"
        }
      ],
      "cover": {
        "src": "/images/projects/darfin/company-overview.png",
        "alt": "삼성전자의 주주 비율, 배당수익률, 직원 수, 최근 보고서 목록이 표시된 Darfin 기업 개요 화면",
        "caption": "삼성전자 기업 개요: DART 공시에서 가져온 지배구조, 배당수익률, 직원 수, 최근 보고서를 한 화면에 모았습니다."
      },
      "sections": [
        {
          "id": "why",
          "eyebrow": "만든 이유",
          "heading": "공개된 정보라고 접근하기 쉬운 것은 아니었습니다",
          "blocks": [
            {
              "type": "p",
              "text": "한국에서 투자은행에 다니는 친구는 업무의 기준이 DART, 즉 전자공시시스템이라고 했습니다. 그가 쓰는 정보는 비밀이 아니라 모두 공개된 것이었습니다. 그런데 제가 직접 DART를 써 보니 어디서부터 봐야 할지 알 수 없었습니다."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/dart-homepage.png",
                "width": 1920,
                "height": 958,
                "alt": "공시통합검색과 공시 유형 체크박스, 보고서 항목 필터가 있는 DART 홈페이지",
                "caption": "DART (dart.fss.or.kr). 무엇이든 보려면 먼저 공시 유형과 보고서 항목을 골라야 합니다."
              },
              "openLabel": "원본 크기로 보기"
            },
            {
              "type": "quote",
              "text": "정보는 공개되어 있었지만, 그렇다고 접근하기 쉬운 것은 아니었습니다."
            },
            {
              "type": "gallery",
              "caption": "숫자 하나를 찾으려면 보고서를 내려받아 처음부터 끝까지 넘겨 봐야 합니다.",
              "openLabel": "원본 크기로 보기",
              "items": [
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-cover.png",
                  "width": 642,
                  "height": 827,
                  "alt": "분기보고서 표지",
                  "caption": "표지"
                },
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-business.png",
                  "width": 659,
                  "height": 826,
                  "alt": "빽빽한 텍스트로 된 분기보고서 사업의 내용 페이지",
                  "caption": "사업의 내용"
                },
                {
                  "src": "/images/projects/darfin/deck/quarterly-report-financials.png",
                  "width": 656,
                  "height": 826,
                  "alt": "분기보고서 연결재무제표 표",
                  "caption": "재무제표"
                }
              ]
            },
            {
              "type": "p",
              "text": "저 같은 사람도 시스템을 먼저 배우지 않고, 그가 보는 것과 같은 정보에서 시작할 수 있게 하고 싶었습니다."
            }
          ]
        },
        {
          "id": "features",
          "eyebrow": "Darfin이 하는 일",
          "heading": "네 가지 기능, 하나의 흐름",
          "blocks": [
            {
              "type": "p",
              "text": "우리 팀은 문제를 세 가지로 정리했습니다. 공시를 직접 찾아 비교하는 수작업, 중요한 변화를 놓치는 것, 여러 사이트에 흩어진 흐름입니다. 기업 분석은 제가, 나머지 세 기능은 팀원들이 이끌었습니다."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "기업 분석 · 담당",
                  "text": "사업·분기보고서를 개요, 재무 추이, 리스크 상태로 정리해 보고서를 직접 비교하지 않아도 됩니다."
                },
                {
                  "label": "공시 분석",
                  "text": "주요사항, 증권 발행 같은 긴 수시공시를 요약해 어떤 공시를 열어볼지 알려줍니다."
                },
                {
                  "label": "모의투자",
                  "text": "실시간 시세와 가상 자금으로 연습하고 포트폴리오 평가를 받습니다. 위험 없이 배운 것을 실행해 봅니다."
                },
                {
                  "label": "커뮤니티",
                  "text": "기업에 대해 질문하고 가장 좋은 답변을 채택합니다. 초보자가 공시를 읽을 줄 아는 사람에게 배웁니다."
                }
              ]
            },
            {
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/financial-trends.png",
                "alt": "분기별 매출액·영업이익·당기순이익을 보여주는 Darfin 재무 추이 화면",
                "caption": "기업 분석은 개요, AI 분석, 재무 추이(사진)의 세 가지 보기로 구성됩니다."
              }
            },
            {
              "type": "stats",
              "items": [
                {
                  "value": "30",
                  "label": "초기 등록 기업"
                },
                {
                  "value": "3",
                  "label": "기업별 화면 구성"
                },
                {
                  "value": "7",
                  "label": "규칙 기반 리스크 상태"
                },
                {
                  "value": "2회",
                  "label": "하루 공시 확인"
                }
              ]
            }
          ]
        },
        {
          "id": "design-why",
          "eyebrow": "설계 이유",
          "heading": "시세를 보는 화면이 아니라, 원문을 읽는 화면으로",
          "blocks": [
            {
              "type": "p",
              "text": "디자인을 시작하기 전에, 사람들이 지금 이 정보에 어떻게 접근하는지 살펴봤습니다. 세 가지가 불편했습니다."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "DART: 시스템부터 알아야 합니다",
                  "text": "무엇이든 보려면 열 가지 공시 유형 중 하나를 먼저 골라야 합니다. 우리 팀은 무엇이 바뀌었는지 알기까지 일곱 번 멈춘다고 정리했습니다."
                },
                {
                  "label": "DartPoint AI: 시장이 먼저 보입니다",
                  "text": "홈페이지가 주가와 AI 대화로 시작하고, 판단은 AI 요약에서 나옵니다. 모든 상장사를 다루지만 AI를 더한 시세 앱처럼 읽힙니다."
                },
                {
                  "label": "첫 목업: 근거 없는 점수",
                  "text": "주가 티커, AI 점수, 홍보 문구. 점수 하나는 어디서 나왔는지 보여주지 않은 채 숫자를 믿으라고 요구합니다."
                }
              ]
            },
            {
              "type": "link",
              "label": "DartPoint AI 살펴보기",
              "href": "https://dartpoint.ai"
            },
            {
              "type": "quote",
              "text": "의견보다 먼저, 해석의 근거를 확인해야 합니다."
            },
            {
              "type": "p",
              "text": "발표 자료의 이 문장이 디자인 방향이 되었습니다. 그래서 Darfin은:"
            },
            {
              "type": "list",
              "items": [
                "공시 유형이 아니라 기업에서 시작합니다.",
                "시세나 점수가 아니라 공시 내용을 먼저 보여줍니다.",
                "AI가 쓴 문장은 모두 파란색으로 표시하고, 파란색은 동작 외에는 쓰지 않습니다.",
                "점수 하나 대신 리스크별 상태와 지속 기간을 보여줍니다.",
                "시각 요소를 절제해 내용이 앞서게 합니다."
              ]
            },
            {
              "type": "details",
              "summary": "Darfin과 DartPoint AI 비교",
              "blocks": [
                {
                  "type": "table",
                  "caption": "같은 문제에 대한 두 가지 접근",
                  "columns": [
                    "구분",
                    "DartPoint AI",
                    "Darfin"
                  ],
                  "rows": [
                    [
                      "범위",
                      "전체 상장사, 주가·실적 예측 포함",
                      "초기 등록 30개 기업"
                    ],
                    [
                      "재무 비율",
                      "값과 구성 항목을 표시",
                      "리스크 영역별 상태로 종합"
                    ],
                    [
                      "AI",
                      "공시 한 건씩 요약, 대화형 어시스턴트",
                      "분기에 걸쳐 계산된 상태를 설명"
                    ],
                    [
                      "판단 주체",
                      "공시 요약 안의 생성형 AI",
                      "코드의 규칙이 판단하고 모델이 설명"
                    ],
                    [
                      "시간에 따른 변화",
                      "지표별 차트, 요약 속 전년 동기 비교",
                      "리스크 영역별 상태: 신규발생·악화·지속·개선·해소"
                    ]
                  ]
                }
              ]
            }
          ]
        },
        {
          "id": "ui-redesign",
          "eyebrow": "이전과 이후",
          "heading": "두 화면을 리디자인했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "랜딩 페이지와 공시 검색을 리디자인했습니다. 이전 화면은 팀의 첫 디자인입니다."
            },
            {
              "type": "link",
              "label": "Figma에서 리디자인 전 원본 보기",
              "href": "https://www.figma.com/make/4bvtlHQv0f03JmfNHHCJ7x/Darfin-Dart-Finance-"
            },
            {
              "type": "imageComparison",
              "title": "랜딩 페이지: 원문과 설명을 함께 보여주기",
              "description": "초기 화면은 주가 티커, AI 점수, 홍보 문구를 앞세웠습니다. 리디자인은 공시 발췌문과 그 설명을 나란히 놓습니다.",
              "openLabel": "원본 크기로 보기",
              "before": {
                "label": "이전 · 초기 목업",
                "src": "/images/projects/darfin/slide-31-landing.png",
                "alt": "주가 시세와 AI 점수 카드, 큰 홍보 제목이 있는 초기 Darfin 랜딩 목업",
                "caption": "sanghyxuk이 만든 초기 랜딩 목업입니다."
              },
              "after": {
                "label": "이후 · 리디자인",
                "src": "/images/projects/darfin/slide-32-landing.png",
                "alt": "공시 발췌문과 AI 설명을 나란히 배치한 Darfin 랜딩 리디자인",
                "caption": "리디자인한 랜딩 페이지입니다. 원문 발췌, 설명, 출처를 함께 보여줍니다."
              }
            },
            {
              "type": "imageComparison",
              "title": "공시 검색: 기업 입력을 시작점으로",
              "description": "리디자인은 기업 입력을 주 진입점으로 두고, 선택 필터를 그 아래에 모았습니다.",
              "openLabel": "원본 크기로 보기",
              "before": {
                "label": "이전 · 기존 검색 화면",
                "src": "/images/projects/darfin/slide-31-disclosure-search.png",
                "alt": "기업명, 기간, 공시 유형을 큰 폼 카드에 배치한 기존 공시 검색 화면",
                "caption": "기존 화면은 기업·기간·공시 유형을 하나의 큰 카드에 배치했습니다."
              },
              "after": {
                "label": "이후 · 리디자인",
                "src": "/images/projects/darfin/slide-32-disclosure-search.png",
                "alt": "중앙 기업 검색 입력 아래에 기간과 유형 필터를 배치한 공시 검색 리디자인",
                "caption": "리디자인에서는 검색 입력과 필터 영역을 분리했습니다."
              }
            }
          ]
        },
        {
          "id": "design-system",
          "eyebrow": "디자인 시스템",
          "heading": "모든 화면에 하나의 레시피",
          "blocks": [
            {
              "type": "p",
              "text": "팀원마다 자기 화면을 따로 꾸미다 보니 파란색, 카드, 팔레트가 조금씩 달라졌습니다. 이미 쓰던 스타일을 53개의 공유 클래스 레시피로 정리하고, 대부분의 화면을 한 번에 옮겼습니다."
            },
            {
              "type": "details",
              "summary": "디자인 시스템 전체 보기: 색상, 타이포그래피, 컴포넌트, 규칙",
              "blocks": [
                {
                  "type": "steps",
                  "items": [
                    "가장 완성도가 높은 기업 분석 화면을 기준으로 실제 사용 중인 클래스를 전수 조사",
                    "DESIGN_SYSTEM.md 작성: 원칙, 색상, 타이포그래피, 레이아웃, 컴포넌트, 모션, 콘텐츠 규칙, 감사 노트",
                    "패턴을 uiRecipes.js의 이름 있는 상수로 정리 (CARD, BTN_PRIMARY, AI_CALLOUT 등)",
                    "계정, 인증, 커뮤니티, 공시, 기업 분석, 앱 셸을 한 번의 변경으로 이전"
                  ]
                },
                {
                  "type": "stats",
                  "items": [
                    {
                      "value": "53",
                      "label": "공유 클래스 레시피"
                    },
                    {
                      "value": "80",
                      "label": "한 커밋에서 변경한 파일"
                    },
                    {
                      "value": "2",
                      "label": "테마: 라이트·다크"
                    },
                    {
                      "value": "2",
                      "label": "언어: 한국어·영어"
                    }
                  ]
                },
                {
                  "type": "quote",
                  "text": "파란색이라면, 누를 수 있거나 AI가 쓴 것입니다."
                },
                {
                  "type": "p",
                  "text": "디자인 문서의 이 규칙이 시스템 전체를 요약합니다. 중립색은 항상 slate, 파란색은 동작과 AI가 작성한 인사이트에만 쓰고, semibold보다 굵은 글꼴은 쓰지 않아 위계는 크기·색·여백으로 만듭니다. 모든 색상에는 다크 모드 짝이 있습니다."
                },
                {
                  "type": "swatches",
                  "caption": "색상 토큰 (Tailwind 이름, 라이트 테마)",
                  "groups": [
                    {
                      "label": "구조",
                      "items": [
                        {
                          "name": "페이지 배경",
                          "token": "slate-50",
                          "hex": "#F8FAFC"
                        },
                        {
                          "name": "카드",
                          "token": "white",
                          "hex": "#FFFFFF"
                        },
                        {
                          "name": "테두리",
                          "token": "slate-200",
                          "hex": "#E2E8F0"
                        },
                        {
                          "name": "보조 텍스트",
                          "token": "slate-500",
                          "hex": "#64748B"
                        },
                        {
                          "name": "제목",
                          "token": "slate-900",
                          "hex": "#0F172A"
                        }
                      ]
                    },
                    {
                      "label": "동작과 AI",
                      "items": [
                        {
                          "name": "주요 동작",
                          "token": "blue-600",
                          "hex": "#2563EB"
                        },
                        {
                          "name": "AI 강조 텍스트",
                          "token": "blue-700",
                          "hex": "#1D4ED8"
                        },
                        {
                          "name": "AI 콜아웃 배경",
                          "token": "blue-50",
                          "hex": "#EFF6FF"
                        }
                      ]
                    },
                    {
                      "label": "국내 시장 관례",
                      "items": [
                        {
                          "name": "상승 · 매수",
                          "token": "red-500",
                          "hex": "#EF4444"
                        },
                        {
                          "name": "하락 · 매도",
                          "token": "blue-500",
                          "hex": "#3B82F6"
                        }
                      ]
                    },
                    {
                      "label": "리스크 상태 (AI 분석 탭)",
                      "items": [
                        {
                          "name": "신규발생",
                          "token": "red-400",
                          "hex": "#F87171"
                        },
                        {
                          "name": "악화",
                          "token": "red-500",
                          "hex": "#EF4444"
                        },
                        {
                          "name": "지속",
                          "token": "amber-400",
                          "hex": "#FBBF24"
                        },
                        {
                          "name": "개선",
                          "token": "blue-400",
                          "hex": "#60A5FA"
                        },
                        {
                          "name": "해소",
                          "token": "emerald-300",
                          "hex": "#6EE7B7"
                        },
                        {
                          "name": "정상",
                          "token": "emerald-200",
                          "hex": "#A7F3D0"
                        },
                        {
                          "name": "데이터부족",
                          "token": "slate-200",
                          "hex": "#E2E8F0"
                        }
                      ]
                    }
                  ]
                },
                {
                  "type": "typeScale",
                  "caption": "타입 스케일 (시스템 산세리프, 굵기 500·600만 사용)",
                  "items": [
                    {
                      "role": "히어로 제목",
                      "spec": "56px · 600 · tight",
                      "sample": "공시를 쉽게",
                      "size": 56,
                      "weight": 600
                    },
                    {
                      "role": "페이지 제목",
                      "spec": "30px · 600",
                      "sample": "삼성전자 기업 분석",
                      "size": 30,
                      "weight": 600
                    },
                    {
                      "role": "섹션 제목",
                      "spec": "18px · 600",
                      "sample": "주요 주주 현황",
                      "size": 18,
                      "weight": 600
                    },
                    {
                      "role": "본문",
                      "spec": "16px · 400 · relaxed",
                      "sample": "최근 공시의 핵심 내용을 한 화면에서 확인하세요.",
                      "size": 16,
                      "weight": 400
                    },
                    {
                      "role": "라벨",
                      "spec": "14px · 500",
                      "sample": "분기보고서 · 2026.05.15",
                      "size": 14,
                      "weight": 500
                    },
                    {
                      "role": "아이브로·메타",
                      "spec": "12px · 500 · slate-400",
                      "sample": "01 · 기업 분석",
                      "size": 12,
                      "weight": 500
                    }
                  ]
                },
                {
                  "type": "specimens",
                  "caption": "레시피로 렌더링한 대표 컴포넌트",
                  "items": [
                    {
                      "component": "aiCallout",
                      "label": "AI 콜아웃",
                      "note": "대표 요소입니다. AI가 작성한 인사이트에는 항상 전구 아이콘과 파란 배경을 붙입니다."
                    },
                    {
                      "component": "riskStates",
                      "label": "리스크 상태 배지",
                      "note": "규칙 기반 엔진의 7가지 상태. 나쁨은 빨강, 주의는 호박색, 개선은 파랑입니다."
                    },
                    {
                      "component": "buttons",
                      "label": "버튼",
                      "note": "높이 40px 고정. 섹션마다 주요 동작은 하나만 둡니다."
                    },
                    {
                      "component": "segmented",
                      "label": "세그먼트 탭",
                      "note": "기업 상세의 세 가지 보기에 사용합니다."
                    },
                    {
                      "component": "badges",
                      "label": "배지",
                      "note": "알약 모양. 정보, 진행 중, 중립 세 가지 변형."
                    },
                    {
                      "component": "priceColors",
                      "label": "가격 색상",
                      "note": "국내 시장 관례에 따라 상승은 빨강, 하락은 파랑입니다."
                    }
                  ]
                },
                {
                  "type": "compare",
                  "before": {
                    "label": "지양",
                    "points": [
                      "페이지 코드에 직접 쓴 hex 값이나 일회성 클래스 문자열",
                      "700 이상의 굵은 글꼴 (워드마크만 예외)",
                      "누를 수 없거나 AI가 쓰지 않은 요소에 파란색 사용",
                      "다크 모드 짝이 없는 라이트 전용 색상",
                      "한국어·영어 로케일 키 대신 하드코딩한 문구"
                    ]
                  },
                  "after": {
                    "label": "필수",
                    "points": [
                      "카드: 1px slate-200 테두리, 12px 모서리, 그림자 없음",
                      "모든 가격·수량·날짜에 고정폭 숫자(tabular-nums)",
                      "한국어 단어가 끊기지 않도록 word-break: keep-all",
                      "DART 출처 표기, 접수번호 등 출처 표시 유지",
                      "동작 줄이기 설정에서는 모든 애니메이션이 최종 상태로 표시"
                    ]
                  }
                },
                {
                  "type": "evidence",
                  "title": "코드로 정리한 레시피",
                  "context": "페이지는 클래스 문자열을 다시 쓰지 않고 이름 있는 상수를 가져다 씁니다.",
                  "note": "출처: darfin-front 커밋 392abc3 (2026년 7월 8일). 디자인 문서는 이후 배포 전 정리 과정에서 저장소에서 삭제되었고, uiRecipes.js는 남아 있습니다.",
                  "items": [
                    {
                      "title": "공유 레시피 모듈",
                      "file": "darfin-front/src/app/shared/lib/uiRecipes.js",
                      "code": "export const CARD =\n  \"rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900\";\n\nexport const AI_CALLOUT =\n  \"flex gap-2 rounded-md border border-blue-100 dark:border-blue-900/50 bg-blue-50/60 dark:bg-blue-950/30 px-3.5 py-3\";\n\nexport const PRICE_UP = \"text-red-500 dark:text-red-400\";\nexport const PRICE_DOWN = \"text-blue-500 dark:text-blue-400\";",
                      "finding": "모든 상수가 다크 모드 짝을 함께 담고 있어, 라이트 전용 색상이 실수로 배포되지 않습니다.",
                      "implication": "레시피 하나를 바꾸면 이를 가져다 쓰는 모든 화면이 함께 바뀌므로, 같은 클래스 문자열의 복사본을 찾아다닐 필요가 없습니다."
                    }
                  ]
                },
                {
                  "type": "details",
                  "summary": "고치지 않고 기록만 해 둔 불일치",
                  "blocks": [
                    {
                      "type": "list",
                      "items": [
                        "같은 역할의 '예시' 배지에 두 가지 파란색(blue-600, blue-700)이 쓰이고 있었습니다.",
                        "카드 안쪽 여백이 다섯 가지였습니다. 새 카드는 여섯 번째를 만들지 말고 이 중에서 고르도록 했습니다.",
                        "shadcn 테마 토큰은 Darfin 파란색이 아닌 검정에 가까운 기본값을 가리키고 있어, 대화상자와 드롭다운만 사용했습니다.",
                        "푸터 링크는 아직 임시 링크였습니다."
                      ]
                    }
                  ]
                },
                {
                  "type": "p",
                  "text": "한계도 있습니다. 모의투자 페이지도 이전했지만 같은 날 되돌렸습니다. 모의투자의 공통 UI 요소는 레시피를 사용하지만, 페이지 자체는 기존 스타일을 유지합니다."
                }
              ]
            }
          ]
        },
        {
          "id": "architecture",
          "eyebrow": "동작 방식",
          "heading": "수집은 정해진 시간에, AI는 요청할 때",
          "blocks": [
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/architecture.png",
                "width": 2688,
                "height": 895,
                "alt": "구조도: DART 데이터가 정기 실행되는 Python 파이프라인을 거쳐 MariaDB에 저장되고, Spring Boot가 MariaDB를 읽고 쓰며 지표와 리스크 상태를 계산해 React에 제공하고, Gemini를 사용하는 AI 워커가 MariaDB에서 작업을 가져갑니다",
                "caption": "파이프라인은 하루 두 번 공시와 재무 데이터를 저장합니다. Spring이 지표와 리스크 상태를 계산하고, 사용자가 AI 탭을 열 때만 AI 작업을 큐에 넣습니다."
              },
              "openLabel": "원본 크기로 보기"
            },
            {
              "type": "p",
              "text": "파이프라인은 매일 06:00과 18:00(KST)에 공시를 수집합니다. Spring이 지표와 리스크 상태를 계산하고, 누군가 AI 탭을 열 때만 AI 작업을 대기열에 넣어 아무도 보지 않는 기업에 모델 호출 비용을 쓰지 않습니다. AI가 필요 없는 패널은 바로 표시됩니다."
            },
            {
              "type": "p",
              "text": "기업 분석 경로는 첫 작업 대기열과 워커를 포함해 처음부터 끝까지 제가 만들었습니다. 이후 sanghyxuk이 동시 워커를 추가했습니다."
            }
          ]
        },
        {
          "id": "data-source",
          "eyebrow": "핵심 결정 01",
          "heading": "숫자는 API에서, 텍스트는 XML에서",
          "blocks": [
            {
              "type": "p",
              "text": "처음에는 DART의 XML 공시에서 모든 것을 추출했습니다. 텍스트는 잘 됐지만 숫자는 그렇지 않았습니다. 삼성전자는 네 개의 공시에서 매출을 네 가지 방식으로 표기했습니다."
            },
            {
              "type": "table",
              "caption": "삼성전자 · 공시별 매출 표현",
              "columns": [
                "공시",
                "매출 표현 방식",
                "단일 규칙이 깨지는 이유"
              ],
              "rows": [
                [
                  "2023년 3분기",
                  "개념·맥락·소수점·통화를 ACODE 문자열 하나에 담음",
                  "파일 전체에 ADECIMAL 속성이 없음"
                ],
                [
                  "2024년 사업보고서",
                  "ACODE, ACONTEXT, ADECIMAL로 분리",
                  "다른 속성 추출 규칙이 필요"
                ],
                [
                  "2023·2024년 1분기",
                  "IFRS 개념 없이 레이아웃 코드 X23 사용",
                  "ifrs-full_Revenue로 찾을 수 없음"
                ],
                [
                  "2023년 사업보고서",
                  "영업수익 라벨 16회, 2022·2024년에는 0회",
                  "항목 이름은 안정적인 식별자가 아님"
                ]
              ]
            },
            {
              "type": "details",
              "summary": "원본 XML 근거 보기 (파일 4개)",
              "blocks": [
                {
                  "type": "evidence",
                  "title": "같은 기업, 서로 다른 XML 표현",
                  "context": "삼성전자 · corp_code 00126380",
                  "note": "출처: darfin-company-analysis/data/raw/00126380/의 DART 원본 파일. 속성 발췌문의 …는 가독성을 위한 생략입니다. 마지막 예시는 XML이 아닌 항목 이름의 등장 횟수입니다.",
                  "items": [
                    {
                      "title": "2023년 3분기: 여러 정보를 하나의 속성에",
                      "file": "20231114002109.xml",
                      "code": "ACODE=\"ifrs-full_Revenue|CFY2023dTQQ_…ConsolidatedMember|-6|KRW|\"",
                      "finding": "파일 전체에서 ADECIMAL 속성이 0개입니다.",
                      "implication": "소수점 정보를 별도 속성에서 찾는 파서는 해당 정보를 놓칠 수 있습니다. 이 형식에서는 ACODE 안의 개념·맥락·소수점·통화 정보를 분리해야 합니다."
                    },
                    {
                      "title": "2024년 사업보고서: 같은 정보를 개별 속성으로",
                      "file": "20250311001085.xml",
                      "code": "ACODE=\"ifrs-full_Revenue\"\nACONTEXT=\"CFY2024dFY_…\"\nADECIMAL=\"-6\"",
                      "finding": "파일에 ADECIMAL 속성이 1,016개 있습니다.",
                      "implication": "이제 ACODE, ACONTEXT, ADECIMAL을 각각 읽어야 합니다. 하나의 속성 추출 규칙으로 두 표현 방식을 모두 처리할 수 없습니다."
                    },
                    {
                      "title": "2023·2024년 1분기: 재무 개념 대신 레이아웃 코드",
                      "file": "20230515002335.xml · 20240516001421.xml",
                      "code": "ACODE=\"X23\"",
                      "finding": "이 파일들은 IFRS 개념 없이 X23 같은 레이아웃 코드를 사용합니다.",
                      "implication": "ACODE를 ifrs-full_Revenue와 대조하는 것만으로는 매출을 식별할 수 없습니다. 표 구조나 항목 이름 등 추가 맥락이 필요합니다."
                    },
                    {
                      "title": "연도별 항목 이름도 달라졌습니다",
                      "file": "20240312000736.xml (FY2023)",
                      "code": "영업수익\nFY2022: 0\nFY2023: 16\nFY2024: 0",
                      "finding": "영업수익은 2023년 사업보고서에서 16회, 2022·2024년 사업보고서에서는 0회 등장합니다.",
                      "implication": "항목 이름의 정확한 일치만으로는 연도를 넘나드는 안정적인 식별이 어렵습니다. 같은 이름이 없다고 해서 재무 개념 자체가 없는 것은 아닙니다."
                    }
                  ]
                }
              ]
            },
            {
              "type": "p",
              "text": "그래서 파서는 서술형 섹션만 맡고, 모든 숫자는 DART의 구조화된 API에서 가져오도록 바꿨습니다."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/data-sources.png",
                "width": 2688,
                "height": 824,
                "alt": "구조도: DART 공시가 원본 XML과 구조화된 OpenAPI로 나뉘고, XML은 서술형 섹션을 거쳐 Gemini로, OpenAPI는 재무 데이터를 거쳐 Java 지표·리스크 상태로 이어지며, XML은 점선으로 보완 경로를 표시합니다",
                "caption": "각 데이터 소스를 가장 안정적인 용도에 사용합니다. 배당·주주 등 주요 정보에는 XML 경로를 보완용으로 남겨 두었습니다."
              },
              "openLabel": "원본 크기로 보기"
            }
          ]
        },
        {
          "id": "risk-engine",
          "eyebrow": "핵심 결정 02",
          "heading": "상태는 코드가 정하고, 설명은 모델이 씁니다",
          "blocks": [
            {
              "type": "steps",
              "items": [
                "구조화된 재무 데이터",
                "Java 지표 계산",
                "규칙 기반 리스크 상태",
                "Gemini 설명 생성"
              ]
            },
            {
              "type": "p",
              "text": "Java가 재무 지표를 계산하고, 규칙 기반 상태 머신이 리스크마다 신규발생부터 해소까지 상태를 정합니다. Gemini는 계산된 신호와 공시 텍스트를 바탕으로 설명만 씁니다."
            },
            {
              "type": "details",
              "summary": "계산 지표 보기: 8가지 지표와 각각이 확인하는 것",
              "blocks": [
                {
                  "type": "p",
                  "text": "각 지표는 기업에 대한 한 가지 질문에 답하고, 특정 리스크 카드의 판단 근거가 됩니다."
                },
                {
                  "type": "table",
                  "caption": "Darfin이 계산하는 지표와 그 이유",
                  "columns": [
                    "지표",
                    "답하는 질문",
                    "Darfin에서의 활용"
                  ],
                  "rows": [
                    [
                      "유동비율",
                      "1년 안에 갚아야 할 돈을 감당할 수 있는가? 유동자산 ÷ 유동부채.",
                      "유동성: 1.0 미만이거나, 자사 최근 12분기 평균보다 1.5σ 이상 낮으면 표시."
                    ],
                    [
                      "부채비율",
                      "사업 자금 중 빌린 돈이 얼마나 되는가? 부채총계 ÷ 자본총계.",
                      "레버리지: 200% 초과 또는 자본잠식(자본이 음수)이면 표시."
                    ],
                    [
                      "이자보상배율",
                      "영업이익으로 이자를 낼 수 있는가? 영업이익 ÷ 이자비용.",
                      "레버리지: 1배 미만이면 표시."
                    ],
                    [
                      "발생액 비율",
                      "보고된 이익이 실제 현금으로 뒷받침되는가? (순이익 − 영업현금흐름) ÷ 자산총계.",
                      "이익의 질: 10% 초과이거나, 이익은 났지만 영업현금흐름이 음수이면 표시."
                    ],
                    [
                      "DuPont 구성 요소",
                      "자기자본이익률(ROE)은 무엇으로 만들어지는가? ROE = 순이익률 × 총자산회전율 × 레버리지(자산 ÷ 자본). 순이익률과 회전율은 최근 12개월 기준.",
                      "수익이 마진, 효율, 차입 중 어디에서 나오는지 보여줍니다. 총자산회전율은 영업 효율 카드에도 쓰입니다."
                    ],
                    [
                      "Altman Z′",
                      "재무적 부실에 얼마나 가까운가? 운전자본, 이익잉여금, 영업이익, 자본, 매출을 자산 또는 부채로 나눈 값의 가중합.",
                      "계속기업: 부실 구간인 1.1 미만이거나 자본이 음수이면 표시."
                    ],
                    [
                      "Piotroski F (일부)",
                      "기초 체력이 좋아지고 있는가? 수익성, 현금흐름, 레버리지, 유동성, 효율에 대한 7가지 예/아니오 판정.",
                      "이익의 질 카드의 보조 근거로 보여주며, 상태를 결정하지는 않습니다."
                    ],
                    [
                      "현금전환주기",
                      "영업에 현금이 얼마나 오래 묶여 있는가? 매출채권 회전일수 + 재고 회전일수 − 매입채무 회전일수.",
                      "영업 효율: 자사 과거 대비 1.5σ 이상 길어지거나, 영업이익률 또는 총자산회전율이 1.5σ 이상 낮아지면 표시."
                    ]
                  ]
                },
                {
                  "type": "details",
                  "summary": "이 지표를 고른 이유와 근사한 부분",
                  "blocks": [
                    {
                      "type": "list",
                      "items": [
                        "공개된 표준 공식이라 모든 상태를 공시 속 숫자까지 되짚어 확인할 수 있습니다. 계산을 모델이 아닌 코드에 맡긴 이유입니다.",
                        "은행에는 정상인 비율이 반도체 기업에는 위험 신호일 수 있습니다. 아직 동종 업계 데이터가 없어, 각 기업을 자사의 최근 12분기와도 비교(z-score)하며, 최소 8분기 이력이 있어야 판단합니다.",
                        "Altman Z′는 비상장 기업용 변형으로, 시가총액 대신 장부상 자본을 사용해 공시 데이터만으로 계산할 수 있습니다.",
                        "Piotroski F는 9가지 신호 중 7가지를 사용합니다. 신주 발행과 매출총이익률은 추출하지 않았습니다.",
                        "운전자본 회전일수는 추출하지 않은 매출원가 대신 매출을 사용하고, 분기를 91일로 계산합니다.",
                        "사업보고서는 연간 합계를 제공하므로, 4분기 값은 연간 값에서 1~3분기를 뺀 값으로 구합니다.",
                        "기준값은 잠정치이며, 팀 결정 사항으로 남겨 두었습니다."
                      ]
                    }
                  ]
                }
              ]
            },
            {
              "type": "annotatedFigure",
              "figure": {
                "src": "/images/projects/darfin/ai-risk-analysis.png",
                "alt": "여섯 개 리스크 영역의 상태와 설명을 보여주는 Darfin AI 분석 화면",
                "caption": "삼성전자 AI 분석 탭.",
                "width": 1600,
                "height": 870
              },
              "notes": [
                {
                  "x": 34.6,
                  "y": 39.3,
                  "title": "상태 배지 → 코드",
                  "text": "‘해소’ 상태는 모델이 아니라, 계산된 지표를 바탕으로 Java 상태 머신이 정합니다."
                },
                {
                  "x": 12.5,
                  "y": 50.6,
                  "title": "설명 → Gemini",
                  "text": "문단은 계산된 상태와 신호, 그리고 공시 원문에서 추출한 리스크를 바탕으로 생성됩니다."
                },
                {
                  "x": 47.5,
                  "y": 52.1,
                  "title": "수치 → 구조화된 데이터",
                  "text": "부채비율 0.30, 이자보상배율 11.78배 같은 값은 Java가 계산한 값을 인용한 것이며, 생성된 숫자가 아닙니다."
                },
                {
                  "x": 58.6,
                  "y": 67.4,
                  "title": "부족한 데이터는 그대로 표시",
                  "text": "지배구조에는 아직 정량 신호가 없어, 추측 대신 ‘데이터부족’으로 표시합니다."
                }
              ]
            }
          ]
        },
        {
          "id": "validation",
          "eyebrow": "검증과 한계",
          "heading": "확인한 것과 아직 확인하지 못한 것",
          "blocks": [
            {
              "type": "stats",
              "items": [
                {
                  "value": "24 / 24",
                  "label": "통과한 Python 테스트: 보고 기간, DART 응답 변환, LLM 요청"
                },
                {
                  "value": "75",
                  "label": "작성된 Java 테스트 메서드: 지표, 리스크 상태, 데이터 갱신 규칙"
                }
              ]
            },
            {
              "type": "p",
              "text": "테스트는 파이프라인과 리스크 엔진을 다룹니다. 아직 증명되지 않은 것:"
            },
            {
              "type": "list",
              "items": [
                "AI 결과는 수동으로 확인했으며, 정식 평가 데이터셋은 아직 없습니다.",
                "리스크 임계값은 잠정 값이고, 긴 서술형 입력은 길이 제한으로 잘립니다.",
                "지연 시간 벤치마크나 실제 운영 사용 데이터는 없습니다.",
                "리디자인은 정보 위계와 표현을 바꾼 것이며, 사용성은 측정하지 않았습니다. 목업 속 수치는 예시 값입니다.",
                "섹션별 공시 비교(diff)는 여전히 계산되지만, 최종 화면에서는 보여주지 않습니다."
              ]
            },
            {
              "type": "p",
              "text": "다음에는 재무 수치, 추출된 사건, 생성된 설명을 검증할 평가 세트를 만들고 싶습니다."
            }
          ]
        },
        {
          "id": "reflection",
          "eyebrow": "팀과 배운 점",
          "heading": "맡은 일과 배운 것",
          "blocks": [
            {
              "type": "p",
              "text": "Python, Spring Boot, React에 걸쳐 기업 분석을 이끌었고, 랜딩 페이지를 리디자인했으며, 다크 모드와 영어 지원을 포함한 공통 디자인 시스템을 만들었습니다. sanghyxuk은 첫 랜딩과 기업 분석 목업을 만들고 워커 동시 처리를 추가했고, Prefix05는 공시 백엔드를, 다른 팀원들은 모의투자·커뮤니티·인증·결제를 이끌었습니다."
            },
            {
              "type": "p",
              "text": "남기고 싶은 교훈은 하나입니다. 사람들은 시스템이 무엇을 읽었고, 무엇을 계산했고, 무엇을 생성했는지 알 수 있을 때 더 신뢰합니다. Darfin의 디자인과 구조는 모두 이 셋을 보이게 하는 일이었습니다."
            }
          ]
        }
      ],
      "contentsLabel": "프로젝트 살펴보기",
      "parts": [
        {
          "label": "개요",
          "description": "문제와 제품",
          "sections": [
            {
              "id": "why",
              "label": "만든 이유"
            },
            {
              "id": "features",
              "label": "Darfin이 하는 일"
            }
          ]
        },
        {
          "label": "디자인",
          "description": "왜 이렇게 디자인했는가",
          "sections": [
            {
              "id": "design-why",
              "label": "설계 이유"
            },
            {
              "id": "ui-redesign",
              "label": "리디자인"
            },
            {
              "id": "design-system",
              "label": "디자인 시스템"
            }
          ]
        },
        {
          "label": "엔지니어링",
          "description": "동작 방식",
          "sections": [
            {
              "id": "architecture",
              "label": "동작 방식"
            },
            {
              "id": "data-source",
              "label": "두 가지 데이터 경로"
            },
            {
              "id": "risk-engine",
              "label": "리스크 엔진"
            }
          ]
        },
        {
          "label": "마무리",
          "description": "한계, 역할, 배운 점",
          "sections": [
            {
              "id": "validation",
              "label": "검증과 한계"
            },
            {
              "id": "reflection",
              "label": "팀과 배운 점"
            }
          ]
        }
      ]
    }
  }
};
