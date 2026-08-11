export type Language = "en" | "ko";

export const translations = {
  en: {
    nav: {
      name: "Jinho (Roy) Yon",
      links: {
        projects: "Projects",
        approach: "Approach",
        skills: "Skills",
        experience: "Experience",
        contact: "Contact",
      },
      resume: "Resume PDF",
      langToggle: "한국어",
    },
    hero: {
      heading: "Building fullstack products and AI-powered systems.",
      paragraph:
        "UC Davis Computer Science & Engineering graduate specializing in fullstack development and applied AI/LLM systems — from HCI research shipped as production Android and React apps to LLM-driven analysis platforms. I like turning that work into something a non-engineer can pick up and run with, not just something that ships.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    projects: {
      eyebrow: "Selected Work",
      title: "Featured Projects",
      subtitle:
        "Fullstack and AI/LLM-powered systems, plus HCI research work shipped as production apps.",
      githubLabel: "GitHub Repo",
      viewDetails: "View Details",
      backToProjects: "Back to Projects",
      techStackLabel: "Tech Stack",
      objectiveLabel: "Objective",
      problemLabel: "The Problem",
      approachLabel: "Approach",
      challengesLabel: "Challenges",
      learningsLabel: "What I Learned",
      items: [
        {
          category: "AI-Powered Fullstack Platform",
          period: "Jun 2026 – Jul 2026",
          title: "Darfin — AI-Powered Company Analysis Platform",
          summary:
            "Built the DART filing pipeline in Python: API collection → XML parsing → diff vs. prior filing → Gemini-powered summarization and risk analysis, run twice daily via APScheduler plus an on-demand LLM worker queue. Also built the React frontend (financial trends, risk, business segments, shareholder status) against a Spring Boot query API, the landing page, and a shared design system.",
          metric: "Automated twice-daily DART filing analysis (06:00 / 18:00 KST)",
          objective:
            "Give retail investors a fast way to understand a KOSPI/KOSDAQ company's DART filings without reading full regulatory disclosures.",
          problem:
            "DART filings are dense, released multiple times a day across hundreds of companies, and easy to misread — a materially important change can be buried in pages of boilerplate, with no easy way to see what actually changed since the last filing.",
          approach:
            "Built a Python pipeline that collects filings via the DART API, parses the XML, diffs each filing against the prior one, and pipes the meaningful deltas to Gemini for summarization and risk analysis. The pipeline runs twice daily via APScheduler, backed by an on-demand LLM worker queue for user-triggered lookups. A Spring Boot query API serves the analyzed data to a React frontend covering financial trends, risk signals, business segments, and shareholder status.",
          challenges: [
            "DART's XML schema varies across filing types, so the parser had to handle inconsistent/nested structures rather than a single fixed shape.",
            "Keeping twice-daily batch analysis and on-demand user requests both fast and within LLM cost/latency budgets meant designing a separate worker queue instead of calling Gemini synchronously everywhere.",
            "Diffing filings so the output surfaces meaningful changes instead of noisy formatting differences between versions.",
          ],
          learnings: [
            "How to combine rule-based parsing with LLM reasoning instead of leaning on either alone — structured fields where the data is reliable, LLM summarization where it isn't.",
            "Running a scheduled batch pipeline and a live on-demand request path in the same system without them contending for resources.",
          ],
        },
        {
          category: "AI-Powered Developer Tooling — IBM Bob Hackathon",
          period: "May 2026",
          title: "Seenior — AI-Powered Developer Onboarding",
          summary:
            "End-to-end LLM app that cuts codebase ramp-up time from hours to under 60 seconds by integrating Google Gemini 2.5 with the GitHub REST API to auto-generate documentation, UML diagrams, and quizzes from any public repository. Rendered as interactive, clickable diagrams via a custom Mermaid.js validation pipeline built with D3.js and XYFlow.",
          metric: "Ramp-up time: hours → under 60 seconds",
          objective:
            "Cut the time it takes a developer to understand an unfamiliar codebase from hours of manual file-reading to under a minute.",
          problem:
            "Onboarding onto a new repo means piecing together architecture and business logic by hand, one file at a time — slow, and easy to come away with the wrong mental model.",
          approach:
            "Built an end-to-end LLM app that pairs Gemini 2.5 with the GitHub REST API (Octokit) to auto-generate documentation, architecture/UML diagrams, and comprehension quizzes from any public repository. Diagrams render as interactive, clickable Mermaid.js visualizations through a custom validation pipeline built with D3.js and XYFlow.",
          challenges: [
            "LLM-generated Mermaid syntax frequently came back malformed, so raw output couldn't be trusted directly — needed a validation and retry layer before rendering.",
            "Balancing diagram detail against readability so large repositories with many files still produced a diagram a human could actually parse.",
          ],
          learnings: [
            "Validating and repairing LLM output programmatically is more reliable than trying to prompt-engineer perfect output every time.",
            "Turning static LLM text output into an interactive, navigable visualization changes how useful it is — the diagram becomes something you explore, not just read.",
          ],
        },
        {
          category: "Fullstack Marketplace Platform",
          period: "Apr 2026 – May 2026",
          title: "Fitsbug — Fitness Marketplace Platform",
          summary:
            "Designed relational database schemas and built an end-to-end personal-training reservation flow (calendars, booking, session history) backed by 20+ Java servlets and 10+ MyBatis mappers. Integrated Toss Payment Gateway for the full payment lifecycle, validated through end-to-end manual testing across cancellation and refund edge cases.",
          metric: "Full payment lifecycle: ready → success → cancel → refund",
          objective:
            "Give independent personal trainers one place to manage bookings, clients, and payments instead of juggling manual scheduling and separate payment tools.",
          problem:
            "Trainers needed reservation management, session history, and real payment processing — including cancellations and refunds — without an existing marketplace platform built for that workflow.",
          approach:
            "Designed the relational schema for members, bookings, and payments, then built the reservation flow (calendar, booking, session history) on top of 20+ Java servlets and 10+ MyBatis mappers. Integrated Toss Payments for the full payment lifecycle (ready → success → cancel → refund), and validated it through end-to-end manual testing across cancellation and refund edge cases.",
          challenges: [
            "Modeling booking and payment state transitions correctly — especially cancel/refund edge cases — without an ORM's built-in state machine to lean on.",
            "Keeping the calendar and booking UI in sync with backend state via AJAX without a frontend framework doing that work for me.",
          ],
          learnings: [
            "Designing a payment lifecycle state machine from scratch against a real payment gateway, rather than trusting a library to handle the edge cases.",
            "Writing MyBatis mappers directly gave more visibility into the actual SQL being run than a heavier ORM would have.",
          ],
        },
        {
          category: "HCI Research — Android App",
          period: "Mar 2025 – Sep 2025",
          title: "Nail pHolish — Wearable pH Sensing App",
          summary:
            "Shipped the front-end for an Android app surfacing real-time oral pH readings from a Nix Color Sensor, built in Kotlin/XML via Android Studio while iterating with hardware and backend teammates on debugging and usability. Work was co-authored into 2 peer-reviewed publications (ACM & INTERACT 2025).",
          metric: "Co-authored 2 peer-reviewed publications (ACM, INTERACT 2025)",
          objective:
            "Turn a hardware research prototype into a usable mobile app that gives people real-time feedback on oral pH from a wearable sensor.",
          problem:
            "The existing prototype produced raw sensor readings with no accessible way for a non-technical user to view or interpret them.",
          approach:
            "Built the Android front-end in Kotlin/XML via Android Studio, surfacing live Nix Color Sensor readings, while iterating directly with hardware and backend teammates on debugging and usability. Co-authored the design and test documentation that translated research findings into shipped product behavior.",
          challenges: [
            "Debugging across the hardware/software boundary, since sensor readings over Bluetooth didn't always arrive consistently.",
            "Translating raw research findings into UI decisions that non-engineer teammates and reviewers could still validate.",
          ],
          learnings: [
            "Working in a cross-functional research team (hardware, backend, design) surfaces different failure modes than a purely software team — debugging often meant ruling out hardware before touching code.",
            "Co-authoring peer-reviewed documentation alongside shipping code is a different discipline than writing code comments — it has to hold up to reviewers who never see the codebase.",
          ],
        },
      ],
    },
    philosophy: {
      eyebrow: "How I Work",
      title: "Engineering Approach",
      values: [
        {
          title: "Teaching Through Building",
          description:
            "Partnering with hardware, backend, and research teams — and writing the design/test documentation that turned research findings into behavior non-engineers could understand and use, across 2 peer-reviewed publications.",
        },
        {
          title: "Pragmatic AI Integration",
          description:
            "Building with Claude Code and Gemini as daily tools, not just APIs — pairing structured data with LLM reasoning instead of over-engineering brittle parsers, e.g. redesigning a filing-analysis pipeline to combine rule-based fields with LLM-powered semantic analysis.",
        },
        {
          title: "End-to-End Ownership",
          description:
            "Comfortable owning the full stack — relational schema design, payment lifecycles, and deployment — moving between Android/Kotlin, Java/Spring Boot, and React/Node.js as the problem demands.",
        },
      ],
    },
    skills: {
      eyebrow: "Toolbox",
      title: "Technical Skills & Competencies",
      categories: [
        { title: "Languages", items: ["Python", "Java", "JavaScript", "SQL", "Kotlin", "HTML/CSS", "XML", "C/C++"] },
        {
          title: "Frontend",
          items: ["React.js", "React Native", "Tailwind CSS", "Three.js", "D3.js", "Mermaid.js", "Android (Kotlin/XML)"],
        },
        {
          title: "Backend & Data",
          items: ["Node.js", "Express.js", "Java Servlets", "Spring Boot", "MyBatis", "REST APIs", "MySQL", "APScheduler", "STOMP WebSocket"],
        },
        {
          title: "AI / LLM",
          items: ["Google Gemini", "OpenAI", "Prompt Engineering", "Retrieval-Augmented Generation", "Model Context Protocol (MCP)"],
        },
        {
          title: "DevOps & Tools",
          items: ["Git & GitHub", "GitHub API (Octokit)", "Render", "Figma", "Claude Code", "VS Code", "Android Studio"],
        },
      ],
      certifiedLabel: "Certified:",
      certifiedText: "Introduction to Model Context Protocol (Anthropic)",
    },
    experience: {
      eyebrow: "Career",
      title: "Work History",
      roles: [
        {
          period: "Mar 2025 — Sep 2025",
          title: "Software Developer, Research Assistant",
          company: "Interactive Organisms Lab — Dr. Katia Vega, UC Davis",
          achievements: [
            "Shipped the front-end of Nail pHolish, an Android app surfacing oral pH readings from a Nix Color Sensor; built screens and flows in Kotlin/XML via Android Studio, iterating with hardware/backend teammates on debugging and usability feedback.",
            "Prototyped UX flows in Figma for DiabetiCat, a feline-health monitoring app, partnering cross-functionally on screen architecture, API contracts, and front-end requirements.",
            "Co-authored 2 peer-reviewed publications (ACM & INTERACT 2025), writing design and test documentation that translated research findings into shipped product behavior across hardware, backend, and UI teams.",
          ],
        },
      ],
    },
    footer: {
      heading: "Open to Software Engineering opportunities.",
      subtext:
        "Recent UC Davis CS&E graduate looking for full-time roles in fullstack and applied AI/LLM engineering.",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "Send a Message",
      formName: "Name",
      formNamePlaceholder: "Jane Doe",
      formEmail: "Email",
      formEmailPlaceholder: "jane@company.com",
      formMessage: "Message",
      formMessagePlaceholder: "Tell me about the role or project...",
      sendButton: "Send Message",
      aboutLine1: "Jinho (Roy) Yon — Software Engineer.",
      aboutLine2: "Building fullstack products and AI-powered systems.",
      copyright: "© 2026 Jinho Yon.",
    },
  },
  ko: {
    nav: {
      name: "Jinho (Roy) Yon",
      links: {
        projects: "프로젝트",
        approach: "소개",
        skills: "기술",
        experience: "경력",
        contact: "연락처",
      },
      resume: "이력서 PDF",
      langToggle: "English",
    },
    hero: {
      heading: "풀스택 제품과 AI 기반 시스템을 만듭니다.",
      paragraph:
        "UC Davis 컴퓨터공학과를 졸업하고 풀스택 개발과 응용 AI/LLM 시스템을 전문으로 합니다. HCI 연구를 실제 프로덕션 Android·React 앱으로 구현한 경험부터 LLM 기반 분석 플랫폼까지 다뤘습니다. 결과물을 출시하는 데서 그치지 않고, 비개발 직군 동료도 바로 이해하고 활용할 수 있게 만드는 일을 좋아합니다.",
      viewProjects: "프로젝트 보기",
      contactMe: "연락하기",
    },
    projects: {
      eyebrow: "대표 작업",
      title: "주요 프로젝트",
      subtitle: "풀스택 및 AI/LLM 기반 시스템과, 프로덕션 앱으로 구현한 HCI 연구 작업입니다.",
      githubLabel: "GitHub 저장소",
      viewDetails: "자세히 보기",
      backToProjects: "프로젝트 목록으로",
      techStackLabel: "기술 스택",
      objectiveLabel: "목표",
      problemLabel: "문제",
      approachLabel: "접근 방식",
      challengesLabel: "어려웠던 점",
      learningsLabel: "배운 점",
      items: [
        {
          category: "AI 기반 풀스택 플랫폼",
          period: "2026.06 – 2026.07",
          title: "Darfin — AI 기반 기업 분석 플랫폼",
          summary:
            "Python으로 DART 공시 파이프라인을 구축했습니다: API 수집 → XML 파싱 → 이전 공시와의 diff 비교 → Gemini 기반 요약·리스크 분석까지 이어지며, APScheduler로 하루 두 번 자동 실행되고 온디맨드 LLM 워커 큐도 함께 운영됩니다. Spring Boot 조회 API와 연동되는 React 프론트엔드(재무 추이, 리스크, 사업 부문, 주주 현황)와 랜딩 페이지, 공용 디자인 시스템도 함께 구축했습니다.",
          metric: "DART 공시 분석 자동화 (매일 06:00 / 18:00 KST)",
          objective:
            "개인 투자자가 전체 공시 원문을 읽지 않고도 KOSPI·KOSDAQ 기업의 DART 공시를 빠르게 파악할 수 있게 하는 것이 목표였습니다.",
          problem:
            "DART 공시는 내용이 방대하고 하루에도 수백 개 기업에서 여러 건씩 올라오며, 정말 중요한 변화가 수십 페이지의 정형화된 문구 속에 묻혀 이전 공시와 무엇이 달라졌는지 한눈에 파악하기 어렵습니다.",
          approach:
            "DART API로 공시를 수집하고 XML을 파싱한 뒤 이전 공시와 diff를 비교해, 의미 있는 변경분만 Gemini에 전달해 요약·리스크 분석을 수행하는 Python 파이프라인을 구축했습니다. 이 파이프라인은 APScheduler로 하루 두 번 자동 실행되며, 사용자가 직접 요청하는 경우를 위한 온디맨드 LLM 워커 큐도 함께 운영됩니다. Spring Boot 조회 API가 분석 결과를 재무 추이, 리스크, 사업 부문, 주주 현황을 다루는 React 프론트엔드에 제공합니다.",
          challenges: [
            "DART의 XML 스키마가 공시 유형마다 달라, 단일 고정 구조가 아니라 일관되지 않고 중첩된 구조를 처리하는 파서가 필요했습니다.",
            "하루 두 번의 배치 분석과 사용자의 온디맨드 요청을 모두 빠르고 LLM 비용·지연 시간 예산 안에서 처리하기 위해, 모든 요청을 동기적으로 Gemini에 보내는 대신 별도의 워커 큐를 설계해야 했습니다.",
            "버전 간 단순 포맷 차이가 아니라 의미 있는 변경만 결과에 드러나도록 공시 간 diff 로직을 설계하는 것이 까다로웠습니다.",
          ],
          learnings: [
            "규칙 기반 파싱과 LLM 추론을 어느 한쪽에만 의존하지 않고 결합하는 법을 배웠습니다 — 데이터가 신뢰할 수 있는 필드는 구조화 처리, 그렇지 않은 부분은 LLM 요약으로 처리했습니다.",
            "예약된 배치 파이프라인과 실시간 온디맨드 요청 경로가 자원을 두고 경쟁하지 않도록 한 시스템 안에서 함께 운영하는 방법을 익혔습니다.",
          ],
        },
        {
          category: "AI 기반 개발자 도구 — IBM Bob 해커톤",
          period: "2026.05",
          title: "Seenior — AI 기반 개발자 온보딩 도구",
          summary:
            "Google Gemini 2.5와 GitHub REST API를 연동해 공개 저장소로부터 문서, UML 다이어그램, 퀴즈를 자동 생성하는 엔드투엔드 LLM 애플리케이션으로, 코드베이스 파악 시간을 수 시간에서 60초 이내로 단축했습니다. D3.js와 XYFlow로 구축한 자체 Mermaid.js 검증 파이프라인을 통해 클릭 가능한 인터랙티브 다이어그램으로 렌더링했습니다.",
          metric: "코드베이스 파악 시간: 수 시간 → 60초 이내",
          objective:
            "낯선 코드베이스를 파악하는 데 걸리는 시간을 수 시간의 수동 파일 읽기에서 1분 이내로 단축하는 것이 목표였습니다.",
          problem:
            "새 저장소에 온보딩한다는 것은 파일 하나하나를 읽으며 아키텍처와 비즈니스 로직을 직접 재구성하는 일이었습니다 — 느리고, 잘못된 멘탈 모델을 갖게 되기도 쉬웠습니다.",
          approach:
            "Gemini 2.5와 GitHub REST API(Octokit)를 연동해 공개 저장소로부터 문서, 아키텍처·UML 다이어그램, 이해도 확인 퀴즈를 자동 생성하는 엔드투엔드 LLM 애플리케이션을 만들었습니다. 다이어그램은 D3.js와 XYFlow로 구축한 자체 검증 파이프라인을 거쳐 클릭 가능한 인터랙티브 Mermaid.js 시각화로 렌더링됩니다.",
          challenges: [
            "LLM이 생성한 Mermaid 문법이 자주 깨져 있어 원본 출력을 그대로 신뢰할 수 없었고, 렌더링 전에 검증·재시도 레이어가 필요했습니다.",
            "파일이 많은 대형 저장소에서도 사람이 실제로 읽을 수 있는 다이어그램이 나오도록 다이어그램의 상세도와 가독성 사이 균형을 맞춰야 했습니다.",
          ],
          learnings: [
            "매번 완벽한 출력을 프롬프트만으로 유도하려 하기보다, LLM 출력을 프로그래밍적으로 검증·복구하는 방식이 더 안정적이라는 것을 배웠습니다.",
            "정적인 LLM 텍스트 출력을 인터랙티브하고 탐색 가능한 시각화로 바꾸면 그 활용도가 완전히 달라진다는 것을 확인했습니다 — 읽는 대상이 아니라 탐색하는 대상이 됩니다.",
          ],
        },
        {
          category: "풀스택 마켓플레이스 플랫폼",
          period: "2026.04 – 2026.05",
          title: "Fitsbug — 피트니스 마켓플레이스 플랫폼",
          summary:
            "관계형 데이터베이스 스키마를 설계하고, 20개 이상의 Java 서블릿과 10개 이상의 MyBatis 매퍼를 기반으로 개인 트레이닝 예약 플로우(캘린더, 예약, 세션 이력)를 엔드투엔드로 구축했습니다. 토스페이먼츠를 연동해 결제 전체 생명주기를 구현하고, 취소·환불 엣지 케이스까지 수동 테스트로 검증했습니다.",
          metric: "결제 전체 생명주기 구현: 준비 → 성공 → 취소 → 환불",
          objective:
            "개인 트레이너가 수동 스케줄링과 별도의 결제 도구를 오가는 대신, 예약·회원·결제를 한곳에서 관리할 수 있게 하는 것이 목표였습니다.",
          problem:
            "트레이너들에게는 예약 관리, 세션 이력, 그리고 취소·환불을 포함한 실제 결제 처리가 필요했지만, 이런 워크플로우를 지원하는 기존 마켓플레이스 플랫폼이 없었습니다.",
          approach:
            "회원, 예약, 결제를 위한 관계형 스키마를 설계한 뒤, 20개 이상의 Java 서블릿과 10개 이상의 MyBatis 매퍼 위에 예약 플로우(캘린더, 예약, 세션 이력)를 구축했습니다. 토스페이먼츠를 연동해 결제 전체 생명주기(준비 → 성공 → 취소 → 환불)를 구현하고, 취소·환불 엣지 케이스까지 엔드투엔드 수동 테스트로 검증했습니다.",
          challenges: [
            "ORM이 제공하는 상태 머신 없이, 특히 취소·환불 엣지 케이스에서 예약과 결제의 상태 전이를 정확히 모델링하는 것이 어려웠습니다.",
            "프론트엔드 프레임워크의 도움 없이 AJAX만으로 캘린더·예약 UI를 백엔드 상태와 동기화 상태로 유지해야 했습니다.",
          ],
          learnings: [
            "라이브러리가 엣지 케이스를 알아서 처리해줄 것이라 믿기보다, 실제 결제 게이트웨이를 대상으로 결제 생명주기 상태 머신을 처음부터 직접 설계해봤습니다.",
            "MyBatis 매퍼를 직접 작성하니 더 무거운 ORM을 썼을 때보다 실제로 실행되는 SQL을 훨씬 명확히 파악할 수 있었습니다.",
          ],
        },
        {
          category: "HCI 연구 — Android 앱",
          period: "2025.03 – 2025.09",
          title: "Nail pHolish — 웨어러블 pH 센싱 앱",
          summary:
            "Nix Color Sensor로 측정한 실시간 구강 pH 수치를 보여주는 Android 앱의 프론트엔드를 Kotlin/XML(Android Studio)로 구현했으며, 하드웨어·백엔드 팀원들과 디버깅 및 사용성 피드백을 함께 반복했습니다. 이 작업은 동료 심사를 거친 논문 2편(ACM, INTERACT 2025)에 공동 저자로 참여하는 성과로 이어졌습니다.",
          metric: "동료 심사 논문 2편 공동 저술 (ACM, INTERACT 2025)",
          objective:
            "하드웨어 연구 프로토타입을, 웨어러블 센서로 측정한 구강 pH를 실시간으로 알려주는 실사용 가능한 모바일 앱으로 만드는 것이 목표였습니다.",
          problem:
            "기존 프로토타입은 원시 센서 값만 출력할 뿐, 비전문가 사용자가 이를 확인하고 해석할 수 있는 방법이 없었습니다.",
          approach:
            "Nix Color Sensor의 실시간 값을 보여주는 Android 프론트엔드를 Kotlin/XML(Android Studio)로 구현하면서, 하드웨어·백엔드 팀원들과 디버깅과 사용성 개선을 함께 반복했습니다. 연구 결과를 실제 제품 동작으로 옮기는 설계·테스트 문서도 공동 저술했습니다.",
          challenges: [
            "블루투스로 전달되는 센서 값이 항상 일정하게 들어오지는 않아, 하드웨어와 소프트웨어의 경계를 넘나들며 디버깅해야 했습니다.",
            "비개발자인 팀원과 심사자도 검증할 수 있는 형태로, 원시 연구 결과를 UI 설계 결정으로 옮겨야 했습니다.",
          ],
          learnings: [
            "하드웨어·백엔드·디자인이 함께하는 다학제 연구팀에서는 순수 소프트웨어 팀과 다른 종류의 실패 상황을 마주하게 됩니다 — 디버깅은 종종 코드를 보기 전에 하드웨어부터 배제하는 과정이었습니다.",
            "코드를 배포하는 것과 별개로, 동료 심사 문서를 공동 저술하는 일은 코드에 대해 전혀 모르는 심사자도 납득할 수 있어야 하는 다른 종류의 훈련이었습니다.",
          ],
        },
      ],
    },
    philosophy: {
      eyebrow: "일하는 방식",
      title: "엔지니어링 접근 방식",
      values: [
        {
          title: "만들며 가르치기",
          description:
            "하드웨어, 백엔드, 연구 팀과 협업하며 설계·테스트 문서를 직접 작성해, 연구 결과를 비개발 직군도 이해하고 활용할 수 있는 형태로 옮겼습니다. 이 과정은 동료 심사 논문 2편으로 이어졌습니다.",
        },
        {
          title: "실용적인 AI 통합",
          description:
            "Claude Code와 Gemini를 단순 API가 아닌 매일 쓰는 도구로 활용합니다. 취약한 파서를 과도하게 설계하는 대신 구조화된 데이터와 LLM 추론을 결합하는 방식을 선호하며, 공시 분석 파이프라인을 규칙 기반 필드와 LLM 기반 의미 분석을 결합해 재설계한 것이 대표적입니다.",
        },
        {
          title: "엔드투엔드 오너십",
          description:
            "관계형 스키마 설계부터 결제 생명주기, 배포까지 전 영역을 주도적으로 담당하며, 문제에 따라 Android/Kotlin, Java/Spring Boot, React/Node.js를 자유롭게 넘나듭니다.",
        },
      ],
    },
    skills: {
      eyebrow: "기술 스택",
      title: "기술 역량",
      categories: [
        { title: "언어", items: ["Python", "Java", "JavaScript", "SQL", "Kotlin", "HTML/CSS", "XML", "C/C++"] },
        {
          title: "프론트엔드",
          items: ["React.js", "React Native", "Tailwind CSS", "Three.js", "D3.js", "Mermaid.js", "Android (Kotlin/XML)"],
        },
        {
          title: "백엔드 & 데이터",
          items: ["Node.js", "Express.js", "Java Servlets", "Spring Boot", "MyBatis", "REST APIs", "MySQL", "APScheduler", "STOMP WebSocket"],
        },
        {
          title: "AI / LLM",
          items: ["Google Gemini", "OpenAI", "Prompt Engineering", "Retrieval-Augmented Generation", "Model Context Protocol (MCP)"],
        },
        {
          title: "DevOps & 도구",
          items: ["Git & GitHub", "GitHub API (Octokit)", "Render", "Figma", "Claude Code", "VS Code", "Android Studio"],
        },
      ],
      certifiedLabel: "인증:",
      certifiedText: "Introduction to Model Context Protocol (Anthropic)",
    },
    experience: {
      eyebrow: "경력",
      title: "경력 사항",
      roles: [
        {
          period: "2025.03 — 2025.09",
          title: "소프트웨어 개발자, 리서치 어시스턴트",
          company: "UC Davis Interactive Organisms Lab — Katia Vega 교수",
          achievements: [
            "Nix Color Sensor 기반 구강 pH 측정 Android 앱 'Nail pHolish'의 프론트엔드를 출시했습니다. Android Studio에서 Kotlin/XML로 화면과 플로우를 구현하고, 하드웨어·백엔드 팀원들과 디버깅 및 사용성 피드백을 반복했습니다.",
            "고양이 건강 모니터링 앱 'DiabetiCat'의 UX 플로우를 Figma로 프로토타이핑하며, 화면 구조·API 계약·프론트엔드 요구사항을 다른 직군 팀원들과 함께 정의했습니다.",
            "동료 심사 논문 2편(ACM, INTERACT 2025)을 공동 저술했으며, 하드웨어·백엔드·UI 팀 전반에서 연구 결과를 실제 제품 동작으로 옮기는 설계·테스트 문서를 작성했습니다.",
          ],
        },
      ],
    },
    footer: {
      heading: "소프트웨어 엔지니어링 기회를 찾고 있습니다.",
      subtext:
        "UC Davis 컴퓨터공학과를 졸업하고, 풀스택 및 응용 AI/LLM 엔지니어링 분야의 정규직을 찾고 있습니다.",
      github: "GitHub",
      linkedin: "LinkedIn",
      sendMessage: "메시지 보내기",
      formName: "이름",
      formNamePlaceholder: "홍길동",
      formEmail: "이메일",
      formEmailPlaceholder: "jane@company.com",
      formMessage: "메시지",
      formMessagePlaceholder: "포지션이나 프로젝트에 대해 알려주세요...",
      sendButton: "메시지 보내기",
      aboutLine1: "Jinho (Roy) Yon — 소프트웨어 엔지니어.",
      aboutLine2: "풀스택 제품과 AI 기반 시스템을 만듭니다.",
      copyright: "© 2026 Jinho Yon.",
    },
  },
} as const;

export type Translations = typeof translations;
