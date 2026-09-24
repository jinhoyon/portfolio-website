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
  | { type: "table"; caption: string; columns: string[]; rows: string[][] }
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
          "id": "glance",
          "eyebrow": "At a glance",
          "heading": "Source data, code, and AI each have one job",
          "blocks": [
            {
              "type": "p",
              "text": "Darfin turns Korea's public DART filings into a single company page. Every decision below follows one rule: numbers come from structured data, code decides the risk status, and the model extracts and explains."
            },
            {
              "type": "overview",
              "items": [
                {
                  "label": "Source",
                  "title": "Public DART filings",
                  "text": "Structured OpenAPI for financial data; original XML filings for narrative sections. Scanned twice daily."
                },
                {
                  "label": "Calculate",
                  "title": "Code decides the status",
                  "text": "Java computes ratios, Altman Z′ and Piotroski signals, and a rule-based state machine assigns each risk's status."
                },
                {
                  "label": "Explain",
                  "title": "The model writes the why",
                  "text": "Gemini extracts risks from narrative text and explains the computed signals. It never sets a status."
                }
              ]
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
          "id": "why",
          "eyebrow": "Why I built it",
          "heading": "Public isn't the same as accessible",
          "blocks": [
            {
              "type": "p",
              "text": "I've always been interested in investing, but I found it hard to know where to start. Many of my friends with finance backgrounds, including some working as investment bankers in Korea, base their decisions on information in official company filings."
            },
            {
              "type": "p",
              "text": "When I asked a friend at an investment bank about his day-to-day work, I learned that his main source of truth was DART, Korea's electronic disclosure system. He kept emphasizing that nothing he works with is secret or insider knowledge: it's all public. For him, DART was easy to navigate. When I tried it myself, I was lost."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/dart-homepage.png",
                "width": 1920,
                "height": 958,
                "alt": "DART's homepage with an integrated disclosure search, ten filing-type checkboxes, and a grid of report-section filters",
                "caption": "DART (dart.fss.or.kr). Everything is public, but you need to know which filing type and report section to pick before you see anything useful."
              },
              "openLabel": "Open full-size image"
            },
            {
              "type": "quote",
              "text": "The information was open. That didn't make it accessible."
            },
            {
              "type": "p",
              "text": "Even for him, the workflow was inefficient: click through several pages to find a filing, download a PDF, then scroll through page after page to find one piece of information. I wanted to build a platform that removes that knowledge gap, so someone like me could start from the same information he works with."
            },
            {
              "type": "gallery",
              "caption": "Pages from a single quarterly report. Finding one figure means downloading the document and paging through all of it.",
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
              "text": "Other services already close part of this gap. DartPoint AI pulls DART data into charts and ratio tables, and uses generative AI to summarize each filing. That makes the data reachable, but the verdicts, such as whether a ratio is a problem or whether it's getting better or worse, come either from the reader or from a summary written by a model."
            },
            {
              "type": "link",
              "label": "Visit DartPoint AI",
              "href": "https://dartpoint.ai"
            },
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
            },
            {
              "type": "p",
              "text": "Darfin takes a narrower bet. Instead of another chart per metric, each risk area gets a status that code decides and the model only explains, tracked across quarters. DartPoint covers far more ground; Darfin goes deeper on that one question."
            }
          ]
        },
        {
          "id": "product",
          "eyebrow": "The product",
          "heading": "One company, three focused views",
          "blocks": [
            {
              "type": "p",
              "text": "The company page organizes information into an overview, financial trends, and AI analysis. The overview brings together reported facts such as shareholders, dividends, employees, and audit information. Financial charts make reporting periods easier to compare, while the AI tab presents risk categories, trajectories, and an event timeline."
            },
            {
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/financial-trends.png",
                "alt": "Darfin financial trends showing quarterly revenue, operating profit, and net income",
                "caption": "Financial trends bring values from multiple reporting periods into a single view. Calculations use structured statement data rather than model-generated numbers."
              }
            }
          ]
        },
        {
          "id": "architecture",
          "eyebrow": "How it works",
          "heading": "Collect on a schedule, compute in code, call AI on request",
          "blocks": [
            {
              "type": "p",
              "text": "I led the company-analysis path end to end: the Python pipeline, the Spring Boot API, and the React company page. Darfin's other services (disclosures, paper trading, community) run beside it and are left out of this diagram."
            },
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
            }
          ]
        },
        {
          "id": "data-source",
          "eyebrow": "Decision 01",
          "heading": "Two data sources, two different jobs",
          "blocks": [
            {
              "type": "p",
              "text": "I built an XML parser to split filings into recognizable sections, preserving the narrative text needed for analysis. Extracting financial numbers from those same documents was less reliable."
            },
            {
              "type": "p",
              "text": "Samsung Electronics made the problem concrete: across four filings, revenue was marked up four different ways."
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
              "text": "These variations made a growing collection of format-specific extraction rules necessary. I narrowed the XML parser’s responsibility to narrative sections and moved numerical extraction to structured DART endpoints. The parser stayed in the system; its role became more focused."
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
            },
            {
              "type": "p",
              "text": "An earlier version also compared sections across filings to surface what changed. The backend still computes those diffs, but the final interface dropped the filing-changes tab in favor of risk analysis on the original section text."
            }
          ]
        },
        {
          "id": "risk-engine",
          "eyebrow": "Decision 02",
          "heading": "Calculate the signals. Generate the explanation.",
          "blocks": [
            {
              "type": "p",
              "text": "I separated numerical calculations and status assignment from generated explanations. Java code calculates financial metrics and a deterministic state machine assigns statuses such as new, worsening, persisting, improving, resolved, normal, or insufficient data."
            },
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
              "text": "The calculations include liquidity and leverage ratios, cash-flow measures, DuPont components, Altman Z′, and a partial Piotroski F score. Separately, Gemini extracts risk-related information from narrative sections. It writes risk explanations from the computed states and signals; it does not decide the numerical risk status."
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
            },
            {
              "type": "p",
              "text": "This makes calculations and state transitions inspectable and repeatable."
            }
          ]
        },
        {
          "id": "on-demand",
          "eyebrow": "Decision 03",
          "heading": "Collect regularly. Generate analysis when requested.",
          "blocks": [
            {
              "type": "p",
              "text": "The pipeline scans for periodic filings at 06:00 and 18:00 KST. Expensive model work follows a separate path: when someone opens the AI tab and explanations are unavailable, Spring queues a risk-analysis job. Starring a new company can also queue historical ingestion."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "Scheduled collection",
                  "text": "Discover new periodic filings twice daily, parse their sections, and update stored data."
                },
                {
                  "label": "On-demand AI analysis",
                  "text": "Spring queues work in MariaDB. Python workers process it and write results for the application to read."
                }
              ]
            },
            {
              "type": "p",
              "text": "This avoids automatically spending model calls on companies nobody views. I implemented the initial queue and single-worker flow; sanghyxuk later added concurrent workers and parallel extraction batches."
            },
            {
              "type": "p",
              "text": "The interface follows the same separation. Deterministic panels can appear while AI content is still processing, with loading states limited to the unfinished AI portions."
            }
          ]
        },
        {
          "id": "ui-redesign",
          "eyebrow": "Before and after",
          "heading": "Making the entry points clearer",
          "blocks": [
            {
              "type": "p",
              "text": "The redesign is visible in two places: the landing page’s product preview and the disclosure search entry point. These screenshots from our presentation show the earlier interface alongside the later version."
            },
            {
              "type": "link",
              "label": "Explore the original design in Figma",
              "href": "https://www.figma.com/make/4bvtlHQv0f03JmfNHHCJ7x/Darfin-Dart-Finance-"
            },
            {
              "type": "imageComparison",
              "title": "Landing page: show the source beside the explanation",
              "description": "The earlier hero emphasizes a stock ticker, an AI score, and promotional claims. In my redesign, the preview places a filing excerpt beside an AI explanation, making the relationship between source material and interpretation visible.",
              "openLabel": "Open full-size image",
              "before": {
                "label": "Before · Initial mockup",
                "src": "/images/projects/darfin/slide-31-landing.png",
                "alt": "Original Darfin landing mockup with stock ticker, AI score card, and large promotional headline",
                "caption": "Original landing-page mockup by sanghyxuk, shown on slide 31."
              },
              "after": {
                "label": "After · My redesign",
                "src": "/images/projects/darfin/slide-32-landing.png",
                "alt": "Redesigned Darfin landing page with a filing excerpt and AI explanation side by side",
                "caption": "Redesigned landing page, shown on slide 32. The preview includes an excerpt, explanation, and source reference."
              }
            },
            {
              "type": "imageComparison",
              "title": "Disclosure search: make the company the starting point",
              "description": "I restyled disclosure search around a prominent company input, with the date and disclosure-type filters grouped underneath. The later design supports optional filters and adds quick date ranges, giving the search field a clearer visual priority.",
              "openLabel": "Open full-size image",
              "before": {
                "label": "Before · Original search UI",
                "src": "/images/projects/darfin/slide-31-disclosure-search.png",
                "alt": "Original disclosure search interface with a large form card containing company, date, and filing-type fields",
                "caption": "The original form presents company, date, and disclosure type inside one large card. Slide 31."
              },
              "after": {
                "label": "After · My redesign",
                "src": "/images/projects/darfin/slide-32-disclosure-search.png",
                "alt": "Redesigned disclosure search with a central company input and date and filing-type filters below",
                "caption": "The redesigned page separates the primary search input from the filter area. Slide 32."
              }
            },
            {
              "type": "p",
              "text": "My contribution here was the interface redesign. Prefix05 led the disclosure backend, with contributions from sanghyxuk."
            }
          ]
        },
        {
          "id": "design-system",
          "eyebrow": "Design system",
          "heading": "One set of recipes instead of per-page styles",
          "blocks": [
            {
              "type": "p",
              "text": "By early July, each feature had been built by a different teammate, and the pages had drifted apart: different blues, different card shapes, and paper trading running its own inline fintech palette. Before redesigning more screens, I wrote down the visual language we already had and turned it into code that every page could import."
            },
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
                { "value": "53", "label": "shared class recipes" },
                { "value": "80", "label": "files changed in one commit" },
                { "value": "2", "label": "themes: light and dark" },
                { "value": "2", "label": "languages: Korean and English" }
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
                    { "name": "Page", "token": "slate-50", "hex": "#F8FAFC" },
                    { "name": "Card", "token": "white", "hex": "#FFFFFF" },
                    { "name": "Border", "token": "slate-200", "hex": "#E2E8F0" },
                    { "name": "Secondary text", "token": "slate-500", "hex": "#64748B" },
                    { "name": "Heading", "token": "slate-900", "hex": "#0F172A" }
                  ]
                },
                {
                  "label": "Action and AI",
                  "items": [
                    { "name": "Primary action", "token": "blue-600", "hex": "#2563EB" },
                    { "name": "AI lead text", "token": "blue-700", "hex": "#1D4ED8" },
                    { "name": "AI callout fill", "token": "blue-50", "hex": "#EFF6FF" }
                  ]
                },
                {
                  "label": "Korean market convention",
                  "items": [
                    { "name": "Up · buy", "token": "red-500", "hex": "#EF4444" },
                    { "name": "Down · sell", "token": "blue-500", "hex": "#3B82F6" }
                  ]
                },
                {
                  "label": "Risk states (AI analysis tab)",
                  "items": [
                    { "name": "New", "token": "red-400", "hex": "#F87171" },
                    { "name": "Worsening", "token": "red-500", "hex": "#EF4444" },
                    { "name": "Persisting", "token": "amber-400", "hex": "#FBBF24" },
                    { "name": "Improving", "token": "blue-400", "hex": "#60A5FA" },
                    { "name": "Resolved", "token": "emerald-300", "hex": "#6EE7B7" },
                    { "name": "Normal", "token": "emerald-200", "hex": "#A7F3D0" },
                    { "name": "Insufficient data", "token": "slate-200", "hex": "#E2E8F0" }
                  ]
                }
              ]
            },
            {
              "type": "typeScale",
              "caption": "Type scale (system sans, weights 500 and 600 only)",
              "items": [
                { "role": "Hero title", "spec": "56px · 600 · tight", "sample": "공시를 쉽게", "size": 56, "weight": 600 },
                { "role": "Page title", "spec": "30px · 600", "sample": "삼성전자 기업 분석", "size": 30, "weight": 600 },
                { "role": "Section title", "spec": "18px · 600", "sample": "주요 주주 현황", "size": 18, "weight": 600 },
                { "role": "Body", "spec": "16px · 400 · relaxed", "sample": "최근 공시의 핵심 내용을 한 화면에서 확인하세요.", "size": 16, "weight": 400 },
                { "role": "Label", "spec": "14px · 500", "sample": "분기보고서 · 2026.05.15", "size": 14, "weight": 500 },
                { "role": "Eyebrow and meta", "spec": "12px · 500 · slate-400", "sample": "01 · 기업 분석", "size": 12, "weight": 500 }
              ]
            },
            {
              "type": "specimens",
              "caption": "Signature components, rendered from the recipes (UI copy is Darfin's Korean)",
              "items": [
                { "component": "aiCallout", "label": "AI callout", "note": "The signature element. Marks every AI-written insight with a lightbulb and a blue tint." },
                { "component": "riskStates", "label": "Risk-state badges", "note": "Seven states from the rule-based engine. Bad is red, watch is amber, improving is blue." },
                { "component": "buttons", "label": "Buttons", "note": "Fixed 40px height. One primary action per section." },
                { "component": "segmented", "label": "Segmented tabs", "note": "Used for the three company views." },
                { "component": "badges", "label": "Badges", "note": "Pill shape; info, working, and neutral variants." },
                { "component": "priceColors", "label": "Price colors", "note": "Red for gains and blue for losses, following Korean market convention." }
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
        },
        {
          "id": "contribution",
          "eyebrow": "My contribution",
          "heading": "Building across the pipeline, API, and interface",
          "blocks": [
            {
              "type": "p",
              "text": "I led the company-analysis implementation across Python, Spring Boot, and React. I also redesigned the existing landing page and introduced shared design tokens and component recipes across several application areas, alongside dark mode and an English locale."
            },
            {
              "type": "p",
              "text": "Darfin was a team project. Sanghyxuk created the initial landing page and company-analysis mockup, contributed later fixes, and added worker concurrency. Prefix05 led the disclosure backend; other teammates led trading, community, authentication, and payments. The paper-trading design-system migration was reverted, so my UI unification did not cover every screen."
            }
          ]
        },
        {
          "id": "validation",
          "eyebrow": "Evidence and limits",
          "heading": "What was checked—and what remains open",
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
              "text": "The Python suite was run during a code review and passed. The Java figure is the number of test methods in the analysis package. What isn't proven yet:"
            },
            {
              "type": "list",
              "items": [
                "AI output was checked by hand; there's no benchmark dataset yet.",
                "Risk thresholds are provisional, and long narrative inputs are truncated.",
                "There are no latency benchmarks or production usage data.",
                "The redesigns changed hierarchy and presentation; usability wasn't measured, and numbers shown in the mockups are placeholders."
              ]
            },
            {
              "type": "p",
              "text": "So the work shows the implementation behaves as designed, not that it is accurate or useful for investing. Next, I'd build a repeatable evaluation set covering financial values, extracted events, missing information, and generated explanations."
            }
          ]
        },
        {
          "id": "reflection",
          "eyebrow": "Reflection",
          "heading": "Make the boundaries understandable",
          "blocks": [
            {
              "type": "p",
              "text": "The most useful boundary in Darfin is between source data, calculation, and interpretation: structured endpoints for numbers, original filings for narrative context, code for repeatable calculations, and the model for extraction and explanation within those limits. Building across the pipeline, API, and interface taught me that what a system knows, computes, and generates all need to stay understandable to the person using it."
            }
          ]
        }
      ],
      "contentsLabel": "Inside the project",
      "parts": [
        {
          "label": "Overview",
          "description": "The problem and the product, for anyone",
          "sections": [
            { "id": "why", "label": "Why I built it" },
            { "id": "product", "label": "The product" },
            { "id": "glance", "label": "At a glance" }
          ]
        },
        {
          "label": "Design",
          "description": "The interface and its visual system",
          "sections": [
            { "id": "ui-redesign", "label": "Redesign" },
            { "id": "design-system", "label": "Design system" }
          ]
        },
        {
          "label": "Engineering",
          "description": "How it works and the key decisions",
          "sections": [
            { "id": "architecture", "label": "Architecture" },
            { "id": "data-source", "label": "Two data sources" },
            { "id": "risk-engine", "label": "Risk engine" },
            { "id": "on-demand", "label": "On-demand AI" }
          ]
        },
        {
          "label": "Wrap-up",
          "description": "What was checked, who did what, and lessons",
          "sections": [
            { "id": "validation", "label": "Evidence and limits" },
            { "id": "contribution", "label": "My contribution" },
            { "id": "reflection", "label": "Reflection" }
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
          "id": "glance",
          "eyebrow": "한눈에 보기",
          "heading": "원본 데이터, 코드, AI가 각자 한 가지 역할을 맡습니다",
          "blocks": [
            {
              "type": "p",
              "text": "Darfin은 DART에 공개된 공시를 하나의 기업 페이지로 정리합니다. 아래의 모든 결정은 같은 원칙을 따릅니다. 숫자는 구조화된 데이터에서 가져오고, 리스크 상태는 코드가 정하며, 모델은 정보를 추출하고 설명합니다."
            },
            {
              "type": "overview",
              "items": [
                {
                  "label": "원본",
                  "title": "DART 공시",
                  "text": "재무 데이터는 구조화된 OpenAPI에서, 서술형 섹션은 원본 XML 공시에서 가져옵니다. 하루 두 번 확인합니다."
                },
                {
                  "label": "계산",
                  "title": "상태는 코드가 결정",
                  "text": "Java가 재무 비율, Altman Z′, Piotroski 신호를 계산하고, 규칙 기반 상태 머신이 리스크별 상태를 정합니다."
                },
                {
                  "label": "설명",
                  "title": "이유는 모델이 작성",
                  "text": "Gemini는 서술형 텍스트에서 리스크를 추출하고 계산된 신호를 설명합니다. 상태를 정하지는 않습니다."
                }
              ]
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
          "id": "why",
          "eyebrow": "만든 이유",
          "heading": "공개된 정보라고 접근하기 쉬운 것은 아니었습니다",
          "blocks": [
            {
              "type": "p",
              "text": "투자와 주식에 늘 관심이 있었지만 어디서부터 시작해야 할지 막막했습니다. 금융 쪽 배경이 있거나 한국에서 투자은행에 다니는 친구들은 공식 공시에 나온 정보를 바탕으로 투자하는 경우가 많았습니다."
            },
            {
              "type": "p",
              "text": "IB에서 일하는 친구에게 하루 업무를 물어보니, 그의 가장 중요한 정보원은 전자공시시스템 DART였습니다. 친구는 자신이 다루는 정보가 비밀이나 내부자만 아는 정보가 아니라 누구나 볼 수 있는 공개 정보라는 점을 계속 강조했습니다. 업계에 있는 그에게는 DART가 익숙했지만, 제가 직접 써 보니 어디를 봐야 할지 몰라 헤맸습니다."
            },
            {
              "type": "diagram",
              "figure": {
                "src": "/images/projects/darfin/deck/dart-homepage.png",
                "width": 1920,
                "height": 958,
                "alt": "공시통합검색과 공시 유형 체크박스, 보고서 항목 필터가 있는 DART 홈페이지",
                "caption": "DART(dart.fss.or.kr). 모든 정보가 공개되어 있지만, 원하는 내용을 보려면 먼저 어떤 공시 유형과 보고서 항목을 골라야 하는지 알아야 합니다."
              },
              "openLabel": "원본 크기로 보기"
            },
            {
              "type": "quote",
              "text": "정보는 공개되어 있었지만, 그렇다고 접근하기 쉬운 것은 아니었습니다."
            },
            {
              "type": "p",
              "text": "친구에게도 과정은 비효율적이었습니다. 여러 페이지를 클릭해 공시를 찾고, PDF를 내려받고, 원하는 정보 하나를 찾으려고 여러 페이지를 넘겨야 했습니다. 이 지식 격차를 없애서 저 같은 사람도 그 친구가 보는 정보에서 출발할 수 있는 플랫폼을 만들고 싶었습니다."
            },
            {
              "type": "gallery",
              "caption": "분기보고서 한 건의 일부 페이지입니다. 숫자 하나를 찾으려면 문서를 내려받아 처음부터 넘겨 봐야 합니다.",
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
              "text": "이 격차를 줄이려는 서비스도 이미 있습니다. DartPoint AI는 DART 데이터를 차트와 비율 표로 보여주고, 생성형 AI로 공시를 한 건씩 요약합니다. 데이터에 닿기는 쉬워졌지만, 이 비율이 문제인지, 나아지고 있는지에 대한 판단은 여전히 사용자에게 맡겨지거나 모델이 쓴 요약에서 나옵니다."
            },
            {
              "type": "link",
              "label": "DartPoint AI 살펴보기",
              "href": "https://dartpoint.ai"
            },
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
            },
            {
              "type": "p",
              "text": "Darfin은 범위를 좁혔습니다. 지표마다 차트를 하나 더 보여주는 대신, 리스크 영역마다 코드가 상태를 정하고 모델은 그 상태를 설명하며, 이를 분기에 걸쳐 추적합니다. DartPoint가 훨씬 넓은 범위를 다룬다면, Darfin은 이 한 가지 질문을 더 깊게 다룹니다."
            }
          ]
        },
        {
          "id": "product",
          "eyebrow": "제품 화면",
          "heading": "한 기업을 세 가지 관점에서 살펴봅니다",
          "blocks": [
            {
              "type": "p",
              "text": "기업 페이지는 개요, 재무 추이, AI 분석으로 구성됩니다. 개요에는 주주·배당·직원·감사 정보 등 공시된 사실을 모았습니다. 재무 차트는 보고 기간 간 비교를 돕고, AI 탭은 리스크 영역과 추이, 추출한 사건의 타임라인을 보여줍니다."
            },
            {
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/financial-trends.png",
                "alt": "분기별 매출액·영업이익·당기순이익을 보여주는 Darfin 재무 추이 화면",
                "caption": "여러 보고 기간의 값을 한 화면에서 비교합니다. 수치 계산에는 모델이 생성한 숫자가 아닌 구조화된 재무제표 데이터를 사용합니다."
              }
            }
          ]
        },
        {
          "id": "architecture",
          "eyebrow": "동작 방식",
          "heading": "수집은 정해진 시간에, 계산은 코드로, AI는 요청할 때",
          "blocks": [
            {
              "type": "p",
              "text": "Python 파이프라인, Spring Boot API, React 기업 페이지로 이어지는 기업 분석 경로 전체를 이끌었습니다. 공시 분석·모의투자·커뮤니티 등 Darfin의 다른 서비스는 이 경로와 나란히 동작하며, 아래 구조도에서는 제외했습니다."
            },
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
            }
          ]
        },
        {
          "id": "data-source",
          "eyebrow": "핵심 결정 01",
          "heading": "서술형 텍스트와 숫자에 서로 다른 데이터 경로를 적용했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "공시를 식별 가능한 섹션으로 나누는 XML 파서를 만들고, 분석에 필요한 서술형 원문을 보존했습니다. 다만 같은 문서에서 재무 수치를 추출하는 일은 일관되게 처리하기 어려웠습니다."
            },
            {
              "type": "p",
              "text": "삼성전자의 공시 네 건에서도 매출이 네 가지 다른 방식으로 표기되어 있었습니다."
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
              "text": "형식별 추출 규칙을 계속 늘려야 하는 구조였습니다. 그래서 XML 파서는 서술형 섹션을 담당하도록 역할을 좁히고, 수치 추출은 구조화된 DART 엔드포인트로 옮겼습니다. 파서를 없앤 것이 아니라 맡는 일을 더 명확히 했습니다."
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
            },
            {
              "type": "p",
              "text": "초기 버전은 공시 간 섹션을 비교해 무엇이 바뀌었는지 보여주었습니다. 백엔드는 지금도 이 diff를 계산하지만, 최종 화면에서는 공시 변경 탭을 없애고 원본 섹션 텍스트를 바탕으로 한 리스크 분석에 집중했습니다."
            }
          ]
        },
        {
          "id": "risk-engine",
          "eyebrow": "핵심 결정 02",
          "heading": "신호는 코드로 계산하고, 설명은 모델로 작성했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "수치 계산과 상태 판정을 생성형 설명에서 분리했습니다. Java 코드가 재무 지표를 계산하고, 규칙 기반 상태 머신이 신규발생·악화·지속·개선·해소·정상·데이터부족 등의 상태를 결정합니다."
            },
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
              "text": "계산 대상에는 유동성·레버리지 비율, 현금흐름 지표, DuPont 구성 요소, Altman Z′, 일부 신호를 사용하는 Piotroski F 점수가 포함됩니다. 별도로 Gemini는 서술형 섹션에서 리스크 관련 정보를 추출합니다. 리스크 설명은 계산된 상태와 신호를 바탕으로 작성하며, 수치 기반 상태 자체를 결정하지 않습니다."
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
            },
            {
              "type": "p",
              "text": "이 구조 덕분에 계산과 상태 전이를 검토하고 반복 실행할 수 있습니다."
            }
          ]
        },
        {
          "id": "on-demand",
          "eyebrow": "핵심 결정 03",
          "heading": "공시는 정기적으로 수집하고, AI 분석은 요청할 때 실행했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "파이프라인은 매일 한국 시간 06:00과 18:00에 정기 공시를 확인합니다. 모델 호출은 별도 경로로 실행됩니다. 사용자가 AI 탭을 열었을 때 설명이 준비되지 않았다면 Spring이 리스크 분석 작업을 큐에 넣습니다. 새 기업을 즐겨찾기에 추가하면 과거 공시 수집 작업도 등록할 수 있습니다."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "정기 수집",
                  "text": "하루 두 번 새 정기 공시를 확인하고 섹션을 파싱해 저장된 데이터를 갱신합니다."
                },
                {
                  "label": "요청 기반 AI 분석",
                  "text": "Spring이 MariaDB에 작업을 등록합니다. Python 워커가 처리한 뒤 애플리케이션이 읽을 결과를 저장합니다."
                }
              ]
            },
            {
              "type": "p",
              "text": "아무도 조회하지 않는 기업에 매일 모델 호출 비용을 쓰지 않도록 한 구조입니다. 초기 큐와 단일 워커 흐름은 제가 구현했고, 이후 sanghyxuk이 동시 워커와 병렬 추출 처리를 추가했습니다."
            },
            {
              "type": "p",
              "text": "화면에도 같은 구분을 적용했습니다. AI 분석 중에도 계산이 끝난 패널은 먼저 표시하고, 아직 준비되지 않은 AI 영역에만 로딩 상태를 보여줍니다."
            }
          ]
        },
        {
          "id": "ui-redesign",
          "eyebrow": "이전과 이후",
          "heading": "시작 화면의 정보 위계를 정리했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "랜딩 페이지의 제품 미리보기와 공시 검색 시작 화면에서 리디자인을 확인할 수 있습니다. 발표 자료에 담긴 초기 화면과 이후 버전을 함께 배치했습니다."
            },
            {
              "type": "link",
              "label": "Figma에서 리디자인 전 원본 보기",
              "href": "https://www.figma.com/make/4bvtlHQv0f03JmfNHHCJ7x/Darfin-Dart-Finance-"
            },
            {
              "type": "imageComparison",
              "title": "랜딩 페이지: 원문과 설명을 함께 보여주기",
              "description": "초기 화면은 주가 시세, AI 점수, 홍보 문구를 강조했습니다. 제가 리디자인한 화면에서는 공시 발췌문 옆에 AI 설명을 배치해, 원본 정보와 해석의 관계가 드러나도록 구성했습니다.",
              "openLabel": "원본 크기로 보기",
              "before": {
                "label": "이전 · 초기 목업",
                "src": "/images/projects/darfin/slide-31-landing.png",
                "alt": "주가 시세와 AI 점수 카드, 큰 홍보 제목이 있는 초기 Darfin 랜딩 목업",
                "caption": "sanghyxuk이 만든 초기 랜딩 목업입니다. 발표 자료 31번 슬라이드."
              },
              "after": {
                "label": "이후 · 리디자인",
                "src": "/images/projects/darfin/slide-32-landing.png",
                "alt": "공시 발췌문과 AI 설명을 나란히 배치한 Darfin 랜딩 리디자인",
                "caption": "리디자인한 랜딩 페이지입니다. 원문 발췌, 설명, 출처를 함께 보여줍니다. 32번 슬라이드."
              }
            },
            {
              "type": "imageComparison",
              "title": "공시 검색: 기업 입력을 시작점으로",
              "description": "기업 입력을 눈에 띄게 배치하고 기간과 공시 유형 필터를 그 아래에 모았습니다. 이후 버전은 선택적으로 필터를 사용할 수 있고 빠른 기간 선택도 제공해, 검색 입력에 시각적 우선순위를 부여합니다.",
              "openLabel": "원본 크기로 보기",
              "before": {
                "label": "이전 · 기존 검색 화면",
                "src": "/images/projects/darfin/slide-31-disclosure-search.png",
                "alt": "기업명, 기간, 공시 유형을 큰 폼 카드에 배치한 기존 공시 검색 화면",
                "caption": "기존 화면은 기업·기간·공시 유형을 하나의 큰 카드에 배치했습니다. 31번 슬라이드."
              },
              "after": {
                "label": "이후 · 리디자인",
                "src": "/images/projects/darfin/slide-32-disclosure-search.png",
                "alt": "중앙 기업 검색 입력 아래에 기간과 유형 필터를 배치한 공시 검색 리디자인",
                "caption": "리디자인에서는 검색 입력과 필터 영역을 분리했습니다. 32번 슬라이드."
              }
            },
            {
              "type": "p",
              "text": "이 부분에서 제 기여는 화면 리디자인입니다. 공시 백엔드는 Prefix05가 이끌었고 sanghyxuk도 기여했습니다."
            }
          ]
        },
        {
          "id": "design-system",
          "eyebrow": "디자인 시스템",
          "heading": "화면마다 다른 스타일 대신 하나의 레시피로",
          "blocks": [
            {
              "type": "p",
              "text": "7월 초에는 기능마다 다른 팀원이 화면을 만들어 페이지 간 스타일이 조금씩 달라져 있었습니다. 파란색의 톤, 카드 모양이 서로 달랐고 모의투자는 자체 인라인 스타일 팔레트를 쓰고 있었습니다. 더 많은 화면을 리디자인하기 전에, 이미 쓰고 있던 시각 언어를 문서로 정리하고 모든 페이지가 가져다 쓸 수 있는 코드로 만들었습니다."
            },
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
                { "value": "53", "label": "공유 클래스 레시피" },
                { "value": "80", "label": "한 커밋에서 변경한 파일" },
                { "value": "2", "label": "테마: 라이트·다크" },
                { "value": "2", "label": "언어: 한국어·영어" }
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
                    { "name": "페이지 배경", "token": "slate-50", "hex": "#F8FAFC" },
                    { "name": "카드", "token": "white", "hex": "#FFFFFF" },
                    { "name": "테두리", "token": "slate-200", "hex": "#E2E8F0" },
                    { "name": "보조 텍스트", "token": "slate-500", "hex": "#64748B" },
                    { "name": "제목", "token": "slate-900", "hex": "#0F172A" }
                  ]
                },
                {
                  "label": "동작과 AI",
                  "items": [
                    { "name": "주요 동작", "token": "blue-600", "hex": "#2563EB" },
                    { "name": "AI 강조 텍스트", "token": "blue-700", "hex": "#1D4ED8" },
                    { "name": "AI 콜아웃 배경", "token": "blue-50", "hex": "#EFF6FF" }
                  ]
                },
                {
                  "label": "국내 시장 관례",
                  "items": [
                    { "name": "상승 · 매수", "token": "red-500", "hex": "#EF4444" },
                    { "name": "하락 · 매도", "token": "blue-500", "hex": "#3B82F6" }
                  ]
                },
                {
                  "label": "리스크 상태 (AI 분석 탭)",
                  "items": [
                    { "name": "신규발생", "token": "red-400", "hex": "#F87171" },
                    { "name": "악화", "token": "red-500", "hex": "#EF4444" },
                    { "name": "지속", "token": "amber-400", "hex": "#FBBF24" },
                    { "name": "개선", "token": "blue-400", "hex": "#60A5FA" },
                    { "name": "해소", "token": "emerald-300", "hex": "#6EE7B7" },
                    { "name": "정상", "token": "emerald-200", "hex": "#A7F3D0" },
                    { "name": "데이터부족", "token": "slate-200", "hex": "#E2E8F0" }
                  ]
                }
              ]
            },
            {
              "type": "typeScale",
              "caption": "타입 스케일 (시스템 산세리프, 굵기 500·600만 사용)",
              "items": [
                { "role": "히어로 제목", "spec": "56px · 600 · tight", "sample": "공시를 쉽게", "size": 56, "weight": 600 },
                { "role": "페이지 제목", "spec": "30px · 600", "sample": "삼성전자 기업 분석", "size": 30, "weight": 600 },
                { "role": "섹션 제목", "spec": "18px · 600", "sample": "주요 주주 현황", "size": 18, "weight": 600 },
                { "role": "본문", "spec": "16px · 400 · relaxed", "sample": "최근 공시의 핵심 내용을 한 화면에서 확인하세요.", "size": 16, "weight": 400 },
                { "role": "라벨", "spec": "14px · 500", "sample": "분기보고서 · 2026.05.15", "size": 14, "weight": 500 },
                { "role": "아이브로·메타", "spec": "12px · 500 · slate-400", "sample": "01 · 기업 분석", "size": 12, "weight": 500 }
              ]
            },
            {
              "type": "specimens",
              "caption": "레시피로 렌더링한 대표 컴포넌트",
              "items": [
                { "component": "aiCallout", "label": "AI 콜아웃", "note": "대표 요소입니다. AI가 작성한 인사이트에는 항상 전구 아이콘과 파란 배경을 붙입니다." },
                { "component": "riskStates", "label": "리스크 상태 배지", "note": "규칙 기반 엔진의 7가지 상태. 나쁨은 빨강, 주의는 호박색, 개선은 파랑입니다." },
                { "component": "buttons", "label": "버튼", "note": "높이 40px 고정. 섹션마다 주요 동작은 하나만 둡니다." },
                { "component": "segmented", "label": "세그먼트 탭", "note": "기업 상세의 세 가지 보기에 사용합니다." },
                { "component": "badges", "label": "배지", "note": "알약 모양. 정보, 진행 중, 중립 세 가지 변형." },
                { "component": "priceColors", "label": "가격 색상", "note": "국내 시장 관례에 따라 상승은 빨강, 하락은 파랑입니다." }
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
        },
        {
          "id": "contribution",
          "eyebrow": "내 기여",
          "heading": "파이프라인부터 API와 화면까지 연결했습니다",
          "blocks": [
            {
              "type": "p",
              "text": "Python, Spring Boot, React 전반의 기업 분석 기능 구현을 이끌었습니다. 기존 랜딩 페이지를 리디자인하고, 여러 화면에 공유 디자인 토큰과 컴포넌트 규칙을 도입했으며, 다크 모드와 영어 지원도 추가했습니다."
            },
            {
              "type": "p",
              "text": "Darfin은 팀 프로젝트입니다. sanghyxuk은 초기 랜딩 페이지와 기업 분석 목업을 만들었고, 이후 수정과 워커 동시 처리를 담당했습니다. Prefix05는 공시 수집 백엔드를, 다른 팀원들은 모의투자·커뮤니티·인증·결제를 이끌었습니다. 모의투자 화면의 디자인 시스템 이전은 되돌려져, UI 통일이 모든 화면에 적용된 것은 아닙니다."
            }
          ]
        },
        {
          "id": "validation",
          "eyebrow": "검증과 한계",
          "heading": "확인한 것과 아직 남은 과제",
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
              "text": "Python 테스트는 코드 검토 과정에서 실행해 모두 통과했습니다. Java 수치는 분석 패키지에 있는 테스트 메서드 수입니다. 아직 검증하지 못한 부분은 다음과 같습니다."
            },
            {
              "type": "list",
              "items": [
                "AI 결과는 수동으로 확인했으며, 정식 평가 데이터셋은 아직 없습니다.",
                "리스크 임계값은 잠정 값이고, 긴 서술형 입력은 길이 제한으로 잘립니다.",
                "지연 시간 벤치마크나 실제 운영 사용 데이터는 없습니다.",
                "리디자인은 정보 위계와 표현을 바꾼 것이며, 사용성은 측정하지 않았습니다. 목업 속 수치는 예시 값입니다."
              ]
            },
            {
              "type": "p",
              "text": "즉, 구현이 설계대로 동작한다는 점은 보여주지만 정확도나 투자 판단의 유용성까지 입증하지는 않습니다. 다음으로는 재무 수치, 추출 사건, 누락 정보, 생성된 설명을 반복 평가할 수 있는 데이터셋을 만들고 싶습니다."
            }
          ]
        },
        {
          "id": "reflection",
          "eyebrow": "회고",
          "heading": "데이터·계산·해석의 경계를 이해할 수 있게",
          "blocks": [
            {
              "type": "p",
              "text": "Darfin에서 가장 중요한 구분은 원본 데이터, 계산, 해석 사이의 경계였습니다. 숫자는 구조화된 엔드포인트가, 서술 맥락은 원본 공시가, 반복 가능한 계산은 코드가, 추출과 설명은 모델이 맡습니다. 파이프라인부터 API와 화면까지 직접 만들면서, 시스템이 알고 있는 것과 계산한 것, 생성한 것을 사용하는 사람도 구분할 수 있어야 한다는 점을 배웠습니다."
            }
          ]
        }
      ],
      "contentsLabel": "프로젝트 살펴보기",
      "parts": [
        {
          "label": "개요",
          "description": "누구나 읽을 수 있는 문제와 제품 소개",
          "sections": [
            { "id": "why", "label": "만든 이유" },
            { "id": "product", "label": "제품 화면" },
            { "id": "glance", "label": "한눈에 보기" }
          ]
        },
        {
          "label": "디자인",
          "description": "화면과 시각 언어",
          "sections": [
            { "id": "ui-redesign", "label": "리디자인" },
            { "id": "design-system", "label": "디자인 시스템" }
          ]
        },
        {
          "label": "엔지니어링",
          "description": "동작 방식과 핵심 결정",
          "sections": [
            { "id": "architecture", "label": "동작 방식" },
            { "id": "data-source", "label": "두 가지 데이터 경로" },
            { "id": "risk-engine", "label": "리스크 엔진" },
            { "id": "on-demand", "label": "요청 시 AI 분석" }
          ]
        },
        {
          "label": "마무리",
          "description": "검증한 것, 역할 분담, 배운 점",
          "sections": [
            { "id": "validation", "label": "검증과 한계" },
            { "id": "contribution", "label": "내 기여" },
            { "id": "reflection", "label": "회고" }
          ]
        }
      ]
    }
  }
};
