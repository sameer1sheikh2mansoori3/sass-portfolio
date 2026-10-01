export interface StatItem {
  label: string;
  value: string;
  detail: string;
}

export interface SkillItem {
  name: string;
  category: "Core Engine" | "Creative & 3D" | "Systems & Infrastructure" | "Design & Direction";
  level: number; // percentage 0 - 100
  iconTag: string;
  summary: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  year: string;
  role: string;
  tags: string[];
  oneLiner: string;
  accent: string;
  metrics: string;
  previewGradient: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  description: string;
  highlights: string[];
}

export interface SocialLink {
  label: string;
  url: string;
  handle: string;
}

export const PORTFOLIO_DATA = {
  hero: {
    greeting: "INITIATE PROTOCOL // SPARTAN-01",
    name: "ARYAN SHARMA",
    title: "Full-Stack Developer & Creative Technologist",
    doctrine: "Engineering cinematic digital architectures at the bleeding frontier of WebGL, physics, and full-stack rigor.",
    location: "Tokyo / San Francisco / Distributed",
    availability: "Available for Q4 Architectural Commissions",
    statusBadge: "OPERATIONAL // SPARTAN MARCH ACTIVE",
  },

  about: {
    sectionTag: "[ 01 // THE DOCTRINE ]",
    heading: "BUILT FOR THE Crucible OF HIGH-PERFORMANCE WEB EXPERIENCES",
    bioLines: [
      "We forge virtual sanctuaries where brutalist classical typography collides with real-time physics and cinematic choreography.",
      "Rooted in disciplined systems architecture and propelled by WebGL, WebGPU, and modern reactive pipelines.",
      "Every frame is rendered with unyielding intention; every transition calibrated to leave a lasting, visceral mark.",
      "From high-throughput distributed backends to sub-millisecond shader execution, transforming the browser into living theatre."
    ],
    stats: [
      { label: "BATTLE-TESTED", value: "4+ Years", detail: "Specialized in High-Impact Digital Experiences" },
      { label: "MONUMENTS SHIPPED", value: "38 Projects", detail: "From Boutique 3D Sites to Global SaaS Engines" },
      { label: "GLOBAL ENTERPRISE", value: "21 Clients", detail: "North America, Western Europe, and Asia-Pacific" },
      { label: "GLOBAL HONORS", value: "12 Awards", detail: "Awwwards SOTD, FWA of the Day, CSSDA Honors" },
    ] as StatItem[],
  },

  skills: {
    sectionTag: "[ 02 // THE ARSENAL ]",
    heading: "DISCIPLINED WEAPONS & BATTLE-TESTED TECHNOLOGIES",
    description: "Every tool in our armory is honed for maximum frame-rate stability, architectural elegance, and sensory resonance.",
    list: [
      {
        name: "React",
        category: "Core Engine",
        level: 98,
        iconTag: "01",
        summary: "Concurrent rendering, custom hooks, atomic state pipelines, and high-frequency reactive systems.",
      },
      {
        name: "Next.js",
        category: "Core Engine",
        level: 95,
        iconTag: "02",
        summary: "Next.js App Router, SSR, Edge Middleware, ISR caching, and performance-tuned asset streaming.",
      },
      {
        name: "TypeScript",
        category: "Core Engine",
        level: 96,
        iconTag: "03",
        summary: "Type-level programming, strict invariant safety, domain-driven data models, and scalable architectures.",
      },
      {
        name: "Three.js",
        category: "Creative & 3D",
        level: 94,
        iconTag: "04",
        summary: "Custom GLSL vertex/fragment shaders, GLTF animation mixers, shadow architectures, and procedural meshes.",
      },
      {
        name: "GSAP",
        category: "Creative & 3D",
        level: 96,
        iconTag: "05",
        summary: "ScrollTrigger choreography, timeline orchestration, physics smoothing, and hardware-accelerated transforms.",
      },
      {
        name: "Tailwind",
        category: "Creative & 3D",
        level: 97,
        iconTag: "06",
        summary: "Design system tokens, micro-interactions, responsive fluid grids, and atomic utility precision.",
      },
      {
        name: "Node",
        category: "Systems & Infrastructure",
        level: 90,
        iconTag: "07",
        summary: "Distributed microservices, WebSocket bidirectional streams, worker threads, and memory-safe I/O.",
      },
      {
        name: "PostgreSQL",
        category: "Systems & Infrastructure",
        level: 88,
        iconTag: "08",
        summary: "Relational query optimization, indexed spatial queries, connection pooling, and ACID guarantees.",
      },
      {
        name: "Figma",
        category: "Design & Direction",
        level: 92,
        iconTag: "09",
        summary: "Kinetic design prototyping, typographic hierarchy, brutalist visual systems, and motion guidelines.",
      },
    ] as SkillItem[],
  },

  projects: {
    sectionTag: "[ 03 // CAMPAIGNS & MONUMENTS ]",
    heading: "FEATURED ARCHITECTURAL ENDEAVORS",
    description: "Scroll to advance the warrior through each conquered sector. Every campaign pushed performance and artistry to the brink.",
    list: [
      {
        id: "ares-runner",
        title: "ARES RUNNER",
        year: "2024",
        role: "Creative Direction & WebGL Lead",
        tags: ["Three.js", "GLSL Shaders", "GSAP", "React"],
        oneLiner: "An interactive 3D browser pilgrimage traversing scorched mythological dunes with real-time sand deformation.",
        accent: "#C1440E",
        metrics: "60 FPS Stable // 98 Lighthouse // WebGL 2.0",
        previewGradient: "radial-gradient(circle at 70% 30%, #C1440E 0%, #2A0E04 50%, #0A0A0B 100%)",
      },
      {
        id: "vortex-os",
        title: "VORTEX OS",
        year: "2024",
        role: "Principal Frontend Architect",
        tags: ["Next.js 15", "TypeScript", "Tailwind", "Node.js"],
        oneLiner: "Spatial operating system interface engineered for high-throughput aerospace telemetry and orbital trajectory mapping.",
        accent: "#6B7A8F",
        metrics: "<40ms Latency // 100k Data Points/sec // PWA",
        previewGradient: "radial-gradient(circle at 70% 30%, #6B7A8F 0%, #151D28 50%, #0A0A0B 100%)",
      },
      {
        id: "chronos-engine",
        title: "CHRONOS ENGINE",
        year: "2023",
        role: "Creative Technologist",
        tags: ["Three.js", "Web Audio API", "GSAP ScrollTrigger"],
        oneLiner: "Audio-reactive historical chronology charting forgotten ancient empires with procedurally fractured marble relics.",
        accent: "#D4AF37",
        metrics: "Awwwards Site of the Day // FWA of the Day",
        previewGradient: "radial-gradient(circle at 70% 30%, #D4AF37 0%, #2E250A 50%, #0A0A0B 100%)",
      },
      {
        id: "myrmidon-protocol",
        title: "MYRMIDON PROTOCOL",
        year: "2023",
        role: "Lead Full-Stack Architect",
        tags: ["PostgreSQL", "Next.js", "Docker", "Zero-Knowledge"],
        oneLiner: "Distributed cryptographic ledger and zero-knowledge asset verification platform built for institutional custodians.",
        accent: "#C1440E",
        metrics: "SOC2 Compliant // 99.999% SLA Uptime",
        previewGradient: "radial-gradient(circle at 70% 30%, #9E350B 0%, #200802 50%, #0A0A0B 100%)",
      },
      {
        id: "elysium-cinema",
        title: "ELYSIUM CINEMA",
        year: "2022",
        role: "Design Engineer",
        tags: ["Creative Direction", "Figma", "WebGL", "Lenis"],
        oneLiner: "Brutalist editorial archive showcasing documentary filmmaking, lossless audio streaming, and kinetic typography.",
        accent: "#E8E2D6",
        metrics: "CSSDA Best UI/UX/Innovation // 400k Visitors",
        previewGradient: "radial-gradient(circle at 70% 30%, #E8E2D6 0%, #302E2B 50%, #0A0A0B 100%)",
      },
    ] as ProjectItem[],
  },

  experience: {
    sectionTag: "[ 04 // CHRONICLES OF COMBAT ]",
    heading: "BATTLE-PROVEN PROFESSIONAL MILESTONES",
    roles: [
      {
        period: "2023 — PRESENT",
        role: "Principal Creative Technologist",
        company: "Atelier Pantheon",
        location: "San Francisco / Remote",
        description: "Directing real-time WebGL pipelines, architecting spatial design systems, and pioneering next-generation cinematic narratives for premier tech and luxury labels.",
        highlights: [
          "Architected custom WebGL particle engine handling 250,000 instanced elements at 60 FPS in standard browser tabs.",
          "Spearheaded international award-winning interactive experiences generating over 3.2M unique engagements.",
          "Mentored an elite engineering squadron in modern shader programming and GSAP motion orchestration."
        ]
      },
      {
        period: "2021 — 2023",
        role: "Senior Frontend Architect",
        company: "Kinesis Interactive",
        location: "Tokyo, Japan",
        description: "Engineered high-frequency 3D client interfaces, real-time spatial data visualizers, and overhauled full-stack client hydration strategies.",
        highlights: [
          "Reduced client bundle payload by 48% through aggressive tree-shaking, code splitting, and dynamic chunk loading.",
          "Engineered frictionless 60 FPS inertial scroll controllers combining Lenis, Web Workers, and RAF listeners.",
          "Delivered enterprise-grade web applications for Fortune 100 partners with zero critical downtime."
        ]
      },
      {
        period: "2020 — 2021",
        role: "Full-Stack Engineer",
        company: "Apex Digital Systems",
        location: "New York / Hybrid",
        description: "Developed robust full-stack web applications, custom microservices, and bespoke editorial portals bridging design and engineering.",
        highlights: [
          "Implemented automated CI/CD deployment pipelines cutting staging verification cycles from 45 to 8 minutes.",
          "Designed PostgreSQL schema migrations with zero lock contention across active multi-region replicas.",
          "Partnered with creative directors to translate Figma design systems into pixel-perfect accessible components."
        ]
      },
    ] as ExperienceItem[],
  },

  contact: {
    sectionTag: "[ 05 // TRANSMIT DISPATCH ]",
    heading: "SEND THE WAR COUNCIL YOUR SIGNAL",
    subheading: "Whether you seek to commission a flagship digital monument, push WebGL frontiers, or recruit a relentless technical partner.",
    email: "hello@aryan.dev",
    location: "Global Deployment // UTC-8 to UTC+9 Coverage",
    coordinates: "37°46'29\"N 122°25'10\"W // 35°41'22\"N 139°41'30\"E",
    socials: [
      { label: "GitHub", url: "https://github.com", handle: "@aryan-sharma" },
      { label: "LinkedIn", url: "https://linkedin.com", handle: "in/aryan-sharma" },
      { label: "X (Twitter)", url: "https://x.com", handle: "@aryan_tech" },
      { label: "Dribbble", url: "https://dribbble.com", handle: "aryan-creative" },
    ] as SocialLink[],
  },
};

export type PortfolioDataType = typeof PORTFOLIO_DATA;

export function createDefaultPortfolio(username: string, name?: string): PortfolioDataType {
  const cloned = JSON.parse(JSON.stringify(PORTFOLIO_DATA)) as PortfolioDataType;
  const displayName = name || username.toUpperCase();
  cloned.hero.name = displayName;
  cloned.hero.greeting = `INITIATE PROTOCOL // SPARTAN-${username.toUpperCase()}`;
  cloned.contact.email = `${username.toLowerCase()}@spartan.dev`;
  if (cloned.contact.socials && cloned.contact.socials.length > 0) {
    cloned.contact.socials[0].handle = `@${username.toLowerCase()}`;
  }
  return cloned;
}
