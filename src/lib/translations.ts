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
      items: [
        {
          category: "AI-Powered Fullstack Platform",
          period: "Jun 2026 – Jul 2026",
          title: "Darfin — AI-Powered Company Analysis Platform",
          summary:
            "Built the DART filing pipeline in Python: API collection → XML parsing → diff vs. prior filing → Gemini-powered summarization and risk analysis, run twice daily via APScheduler plus an on-demand LLM worker queue. Also built the React frontend (financial trends, risk, business segments, shareholder status) against a Spring Boot query API, the landing page, and a shared design system.",
          metric: "Automated twice-daily DART filing analysis (06:00 / 18:00 KST)",
        },
        {
          category: "AI-Powered Developer Tooling — IBM Bob Hackathon",
          period: "May 2026",
          title: "Seenior — AI-Powered Developer Onboarding",
          summary:
            "End-to-end LLM app that cuts codebase ramp-up time from hours to under 60 seconds by integrating Google Gemini 2.5 with the GitHub REST API to auto-generate documentation, UML diagrams, and quizzes from any public repository. Rendered as interactive, clickable diagrams via a custom Mermaid.js validation pipeline built with D3.js and XYFlow.",
          metric: "Ramp-up time: hours → under 60 seconds",
        },
        {
          category: "Fullstack Marketplace Platform",
          period: "Apr 2026 – May 2026",
          title: "Fitsbug — Fitness Marketplace Platform",
          summary:
            "Designed relational database schemas and built an end-to-end personal-training reservation flow (calendars, booking, session history) backed by 20+ Java servlets and 10+ MyBatis mappers. Integrated Toss Payment Gateway for the full payment lifecycle, validated through end-to-end manual testing across cancellation and refund edge cases.",
          metric: "Full payment lifecycle: ready → success → cancel → refund",
        },
        {
          category: "HCI Research — Android App",
          period: "Mar 2025 – Sep 2025",
          title: "Nail pHolish — Wearable pH Sensing App",
          summary:
            "Shipped the front-end for an Android app surfacing real-time oral pH readings from a Nix Color Sensor, built in Kotlin/XML via Android Studio while iterating with hardware and backend teammates on debugging and usability. Work was co-authored into 2 peer-reviewed publications (ACM & INTERACT 2025).",
          metric: "Co-authored 2 peer-reviewed publications (ACM, INTERACT 2025)",
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
      items: [
        {
          category: "AI 기반 풀스택 플랫폼",
          period: "2026.06 – 2026.07",
          title: "Darfin — AI 기반 기업 분석 플랫폼",
          summary:
            "Python으로 DART 공시 파이프라인을 구축했습니다: API 수집 → XML 파싱 → 이전 공시와의 diff 비교 → Gemini 기반 요약·리스크 분석까지 이어지며, APScheduler로 하루 두 번 자동 실행되고 온디맨드 LLM 워커 큐도 함께 운영됩니다. Spring Boot 조회 API와 연동되는 React 프론트엔드(재무 추이, 리스크, 사업 부문, 주주 현황)와 랜딩 페이지, 공용 디자인 시스템도 함께 구축했습니다.",
          metric: "DART 공시 분석 자동화 (매일 06:00 / 18:00 KST)",
        },
        {
          category: "AI 기반 개발자 도구 — IBM Bob 해커톤",
          period: "2026.05",
          title: "Seenior — AI 기반 개발자 온보딩 도구",
          summary:
            "Google Gemini 2.5와 GitHub REST API를 연동해 공개 저장소로부터 문서, UML 다이어그램, 퀴즈를 자동 생성하는 엔드투엔드 LLM 애플리케이션으로, 코드베이스 파악 시간을 수 시간에서 60초 이내로 단축했습니다. D3.js와 XYFlow로 구축한 자체 Mermaid.js 검증 파이프라인을 통해 클릭 가능한 인터랙티브 다이어그램으로 렌더링했습니다.",
          metric: "코드베이스 파악 시간: 수 시간 → 60초 이내",
        },
        {
          category: "풀스택 마켓플레이스 플랫폼",
          period: "2026.04 – 2026.05",
          title: "Fitsbug — 피트니스 마켓플레이스 플랫폼",
          summary:
            "관계형 데이터베이스 스키마를 설계하고, 20개 이상의 Java 서블릿과 10개 이상의 MyBatis 매퍼를 기반으로 개인 트레이닝 예약 플로우(캘린더, 예약, 세션 이력)를 엔드투엔드로 구축했습니다. 토스페이먼츠를 연동해 결제 전체 생명주기를 구현하고, 취소·환불 엣지 케이스까지 수동 테스트로 검증했습니다.",
          metric: "결제 전체 생명주기 구현: 준비 → 성공 → 취소 → 환불",
        },
        {
          category: "HCI 연구 — Android 앱",
          period: "2025.03 – 2025.09",
          title: "Nail pHolish — 웨어러블 pH 센싱 앱",
          summary:
            "Nix Color Sensor로 측정한 실시간 구강 pH 수치를 보여주는 Android 앱의 프론트엔드를 Kotlin/XML(Android Studio)로 구현했으며, 하드웨어·백엔드 팀원들과 디버깅 및 사용성 피드백을 함께 반복했습니다. 이 작업은 동료 심사를 거친 논문 2편(ACM, INTERACT 2025)에 공동 저자로 참여하는 성과로 이어졌습니다.",
          metric: "동료 심사 논문 2편 공동 저술 (ACM, INTERACT 2025)",
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
