import type { Language } from "./translations";
import type { ProjectSlug } from "./projectsMeta";

// Narrative project pages: intention → decisions → evidence → outcome → reflection.
// A project with a story here renders the narrative layout; others fall back to
// the summary layout in ProjectDetail.

export type StoryFigure = { src: string; alt: string; caption: string };

export type StoryBlock =
  | { type: "p"; text: string }
  | { type: "evidence"; title: string; context: string; note: string; items: { title: string; file: string; code: string; finding: string; implication: string }[] }
  | { type: "link"; label: string; href: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[] }
  | { type: "steps"; items: string[] }
  | { type: "paths"; items: { label: string; text: string }[] }
  | { type: "figure"; figure: StoryFigure }
  | { type: "imageComparison"; title: string; description: string; openLabel: string; before: StoryFigure & { label: string }; after: StoryFigure & { label: string } }
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

export type ProjectStory = {
  tagline: string;
  contentsLabel: string;
  facts: { label: string; value: string }[];
  cover: StoryFigure;
  sections: StorySection[];
};

export const PROJECT_STORIES: Partial<Record<ProjectSlug, Record<Language, ProjectStory>>> = {
  "darfin": {
    "en": {
      "tagline": "Making company disclosures easier to investigate: structured company information, financial trends, and AI-assisted risk explanations in one interface.",
      "facts": [
        {
          "label": "My role",
          "value": "Company-analysis pipeline, API, and UI"
        },
        {
          "label": "Project",
          "value": "Team project · Jun–Jul 2026"
        },
        {
          "label": "Also contributed",
          "value": "Landing redesign and shared design system"
        },
        {
          "label": "Development",
          "value": "AI-assisted with Claude and Cursor"
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
              "text": "I've always been interested in investing, but I found it hard to know where to start. Many of my friends with finance backgrounds, including some working as investment bankers in Korea, base their decisions on information in official company filings."
            },
            {
              "type": "p",
              "text": "When I asked a friend at an investment bank about his day-to-day work, I learned that his main source of truth was DART, Korea's electronic disclosure system. He kept emphasizing that nothing he works with is secret or insider knowledge: it's all public. For him, DART was easy to navigate. When I tried it myself, I was lost."
            },
            {
              "type": "quote",
              "text": "The information was open. That didn't make it accessible."
            },
            {
              "type": "p",
              "text": "Even for him, the workflow was inefficient: click through several pages to find a filing, download a PDF, then scroll through page after page to find one piece of information. I wanted to build a platform that removes that knowledge gap, so someone like me could start from the same information he works with."
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
              "text": "Samsung Electronics made the problem concrete: even within one company, the location and meaning of the attributes changed between reporting periods. These examples show why financial extraction needed more than one fixed XML rule."
            },
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
            },
            {
              "type": "p",
              "text": "These variations made a growing collection of format-specific extraction rules necessary. I narrowed the XML parser’s responsibility to narrative sections and moved numerical extraction to structured DART endpoints. The parser stayed in the system; its role became more focused."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "Original XML → narrative sections",
                  "text": "Keep the parser for business descriptions and other narrative material. Split the document into sections that can be tracked across filings."
                },
                {
                  "label": "Structured OpenAPI → financial data",
                  "text": "Use DART endpoints for financial statements and key information such as dividends, shareholders, and employees. Retain XML as a fallback for key-information extraction."
                }
              ]
            },
            {
              "type": "p",
              "text": "The final design is a hybrid. Structured endpoints reduced dependence on variable table formats for numbers, while the original filings retained the narrative detail needed for text analysis."
            }
          ]
        },
        {
          "id": "comparison",
          "eyebrow": "An evolving approach",
          "heading": "From filing comparisons to a risk-focused interface",
          "blocks": [
            {
              "type": "p",
              "text": "The early pipeline compared sections across filings. It matched stable section identifiers where available, normalized whitespace, and isolated changed passages. Renamed sections and reorganized documents needed special handling so that structural changes did not overwhelm meaningful ones."
            },
            {
              "type": "p",
              "text": "The final product took a different shape. I removed the filing-changes tab, and the later risk-analysis path used original section text rather than the earlier diff-based findings workflow. Diffs are still computed in the backend, but they are not shown in the final interface."
            },
            {
              "type": "p",
              "text": "The distinction is important to how I describe the result: the company page presents an overview, financial trends, and AI-assisted risk analysis—not a user-facing comparison of filing changes."
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
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/ai-risk-analysis.png",
                "alt": "Darfin AI analysis view with six risk categories, statuses, and explanations",
                "caption": "Risk states come from code; generated text explains the signals. The current quantitative layer has no governance signal, and the risk thresholds remain provisional."
              }
            },
            {
              "type": "p",
              "text": "This makes calculations and state transitions inspectable and repeatable. It does not establish that the thresholds are financially well calibrated; that remains a separate evaluation task."
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
              "type": "p",
              "text": "These are historical design screenshots. The figures and accuracy claims pictured in the mockups are not verified project results."
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
              "text": "My contribution here was the interface redesign. Prefix05 led the disclosure backend, with contributions from sanghyxuk. These comparisons demonstrate changes in hierarchy and presentation; we did not measure a usability improvement."
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
              "type": "p",
              "text": "The project seeded 30 companies. During the supplied code audit, all 24 Python tests passed, covering reporting periods, real DART response transformations, and LLM request handling. The Java analysis package contained 75 test methods covering metrics, risk states, freshness rules, and related behavior; that count is not a claim that they were all run in the audit."
            },
            {
              "type": "list",
              "items": [
                "AI output was checked manually, without a formal benchmark dataset.",
                "Risk thresholds remain provisional, and long narrative inputs are truncated.",
                "No end-to-end latency benchmarks or production usage results were established by the audit."
              ]
            },
            {
              "type": "p",
              "text": "These checks support parts of the implementation. They do not establish investment usefulness or model accuracy. My next priority would be a repeatable evaluation set covering financial values, extracted events, missing information, and generated explanations."
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
              "text": "The most useful boundary in Darfin is the one between source data, calculation, and interpretation. Structured endpoints provide a more stable foundation for numbers. Original filings preserve narrative context. Code makes calculations and state transitions repeatable. The model helps extract and explain information within those boundaries."
            },
            {
              "type": "p",
              "text": "Building across the pipeline, API, and interface made those distinctions concrete: what the system knows, what it computes, and what it generates all need to remain understandable to the person using it."
            }
          ]
        }
      ],
      "contentsLabel": "Inside the project"
    },
    "ko": {
      "tagline": "기업 공시를 더 쉽게 살펴볼 수 있도록, 구조화된 기업 정보와 재무 추이, AI 기반 리스크 설명을 한 화면에 모았습니다.",
      "facts": [
        {
          "label": "역할",
          "value": "기업 분석 파이프라인·API·UI"
        },
        {
          "label": "프로젝트",
          "value": "팀 프로젝트 · 2026년 6–7월"
        },
        {
          "label": "추가 기여",
          "value": "랜딩 리디자인·공통 디자인 시스템"
        },
        {
          "label": "개발 방식",
          "value": "Claude·Cursor를 활용한 AI 보조 개발"
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
              "text": "투자와 주식에 늘 관심이 있었지만 어디서부터 시작해야 할지 막막했습니다. 금융 쪽 배경이 있거나 한국에서 투자은행에 다니는 친구들은 공식 공시에 나온 정보를 바탕으로 투자하는 경우가 많았습니다."
            },
            {
              "type": "p",
              "text": "IB에서 일하는 친구에게 하루 업무를 물어보니, 그의 가장 중요한 정보원은 전자공시시스템 DART였습니다. 친구는 자신이 다루는 정보가 비밀이나 내부자만 아는 정보가 아니라 누구나 볼 수 있는 공개 정보라는 점을 계속 강조했습니다. 업계에 있는 그에게는 DART가 익숙했지만, 제가 직접 써 보니 어디를 봐야 할지 몰라 헤맸습니다."
            },
            {
              "type": "quote",
              "text": "정보는 공개되어 있었지만, 그렇다고 접근하기 쉬운 것은 아니었습니다."
            },
            {
              "type": "p",
              "text": "친구에게도 과정은 비효율적이었습니다. 여러 페이지를 클릭해 공시를 찾고, PDF를 내려받고, 원하는 정보 하나를 찾으려고 여러 페이지를 넘겨야 했습니다. 이 지식 격차를 없애서 저 같은 사람도 그 친구가 보는 정보에서 출발할 수 있는 플랫폼을 만들고 싶었습니다."
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
              "text": "삼성전자 한 기업의 공시에서도 보고 기간에 따라 속성의 위치와 의미가 달라졌습니다. 아래 사례는 재무 수치 추출을 하나의 고정된 XML 규칙으로 처리하기 어려웠던 이유를 보여줍니다."
            },
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
            },
            {
              "type": "p",
              "text": "형식별 추출 규칙을 계속 늘려야 하는 구조였습니다. 그래서 XML 파서는 서술형 섹션을 담당하도록 역할을 좁히고, 수치 추출은 구조화된 DART 엔드포인트로 옮겼습니다. 파서를 없앤 것이 아니라 맡는 일을 더 명확히 했습니다."
            },
            {
              "type": "paths",
              "items": [
                {
                  "label": "원본 XML → 서술형 섹션",
                  "text": "사업 설명 등 서술형 원문을 위해 파서를 유지했습니다. 문서를 섹션으로 나누고 공시 간 연결에 필요한 정보를 보존합니다."
                },
                {
                  "label": "구조화된 OpenAPI → 재무 데이터",
                  "text": "재무제표와 배당·주주·직원 등 주요 정보는 DART의 구조화된 엔드포인트를 사용합니다. 주요 정보 추출에는 XML 보완 경로도 남겨 두었습니다."
                }
              ]
            },
            {
              "type": "p",
              "text": "최종 구조는 두 방식을 함께 사용합니다. 숫자는 가변적인 표 형식에 덜 의존하도록 만들고, 텍스트 분석에는 원본 공시의 서술 내용을 유지했습니다."
            }
          ]
        },
        {
          "id": "comparison",
          "eyebrow": "접근 방식의 변화",
          "heading": "공시 비교에서 리스크 중심 화면으로",
          "blocks": [
            {
              "type": "p",
              "text": "초기 파이프라인은 공시 간 섹션을 비교했습니다. 가능한 경우 안정적인 섹션 식별자로 연결하고, 공백을 정규화한 뒤 변경된 문장을 추렸습니다. 섹션 이름이나 문서 구성이 바뀌는 경우에는 형식 변화가 의미 있는 변경을 덮어버리지 않도록 별도 처리가 필요했습니다."
            },
            {
              "type": "p",
              "text": "최종 제품의 화면 구성은 달라졌습니다. 공시 변경 탭을 제거했고, 이후 리스크 분석은 이전의 diff 기반 findings 경로 대신 원본 섹션 텍스트를 사용하도록 바뀌었습니다. 백엔드는 여전히 diff를 계산하지만 최종 화면에는 표시하지 않습니다."
            },
            {
              "type": "p",
              "text": "따라서 결과물은 공시 변경 비교 화면이 아니라, 기업 개요·재무 추이·AI 기반 리스크 분석을 제공하는 기업 페이지로 설명하는 것이 정확합니다."
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
              "type": "figure",
              "figure": {
                "src": "/images/projects/darfin/ai-risk-analysis.png",
                "alt": "여섯 개 리스크 영역의 상태와 설명을 보여주는 Darfin AI 분석 화면",
                "caption": "리스크 상태는 코드가 결정하고, 생성된 텍스트는 신호를 설명합니다. 현재 정량 계층에는 지배구조 신호가 없으며, 리스크 임계값도 잠정 값입니다."
              }
            },
            {
              "type": "p",
              "text": "이 구조 덕분에 계산과 상태 전이를 검토하고 반복 실행할 수 있습니다. 다만 규칙이 일관되게 실행된다는 사실만으로 재무적으로 적절한 임계값이라는 점까지 입증되지는 않습니다. 별도의 평가가 필요합니다."
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
              "type": "p",
              "text": "당시 디자인을 기록한 화면입니다. 목업에 표시된 수치와 정확도 주장은 검증된 프로젝트 성과가 아닙니다."
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
              "text": "이 부분에서 제 기여는 화면 리디자인입니다. 공시 백엔드는 Prefix05가 이끌었고 sanghyxuk도 기여했습니다. 비교 화면은 정보의 위계와 표현 변화를 보여주며, 사용성 개선을 수치로 측정한 것은 아닙니다."
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
              "type": "p",
              "text": "초기 수집 대상으로 30개 기업을 등록했습니다. 제공된 코드 감사에서는 보고 기간 처리, 실제 DART 응답 변환, LLM 요청 처리 등을 다루는 Python 테스트 24개가 모두 통과했습니다. Java 분석 패키지에는 지표·리스크 상태·데이터 갱신 규칙 등을 다루는 테스트 메서드 75개가 있었습니다. 이는 감사에서 모두 실행했다는 의미는 아닙니다."
            },
            {
              "type": "list",
              "items": [
                "AI 결과는 수동으로 비교했으며, 정식 평가 데이터셋은 없습니다.",
                "리스크 임계값은 잠정 값이고, 긴 서술형 입력은 길이 제한에 따라 잘립니다.",
                "감사에서는 종단 간 지연 시간 벤치마크나 운영 사용자 성과가 확인되지 않았습니다."
              ]
            },
            {
              "type": "p",
              "text": "이 검증은 구현의 일부를 뒷받침하지만 투자 판단의 유용성이나 모델 정확도를 입증하지는 않습니다. 다음으로는 재무 수치, 추출 사건, 누락 정보, 생성된 설명을 반복 평가할 수 있는 데이터셋을 우선 만들고 싶습니다."
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
              "text": "Darfin에서 가장 중요한 구분은 원본 데이터, 계산, 해석 사이의 경계였습니다. 구조화된 엔드포인트는 숫자의 기반이 되고, 원본 공시는 서술 맥락을 보존합니다. 코드는 계산과 상태 전이를 반복 가능하게 만들고, 모델은 그 경계 안에서 정보를 추출하고 설명합니다."
            },
            {
              "type": "p",
              "text": "파이프라인부터 API와 화면까지 만들면서 이 구분이 구체화되었습니다. 시스템이 알고 있는 것, 계산한 것, 생성한 것을 사용하는 사람도 이해할 수 있어야 합니다."
            }
          ]
        }
      ],
      "contentsLabel": "프로젝트 살펴보기"
    }
  }
};
