import {
    Code2, Brain, Wrench, Plug2, Layers, Mail, Linkedin, Github,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"

export type MetaTag = {
    name?: string
    property?: string
    content: string
}

export type NavItem = {
    label: string
    href: string
}

export type Project = {
    title: string
    role: string
    tagline: string
    description: string
    stack: string[]
    live?: string
    github?: string
    sourceOnRequest?: boolean
    qa?: { username: string; password: string }
    highlight?: string
}

export type SkillCategory = {
    label: string
    icon: LucideIcon
    items: string[]
}

export type ExperienceItem = {
    role: string
    org: string
    period: string
    blurb: string
    active: boolean
}

export type ContactLink = {
    label: string
    href: string
    icon: LucideIcon
    display?: string
}

// ── Meta ──────────────────────────────────
export const LANDING_META: MetaTag[] = [
    { name: "description", content: "Full-Stack AI Engineer building production AI-native systems and SaaS products end-to-end." },
    { property: "og:title", content: "Suryansh Parashar | Full-Stack AI Engineer" },
    { property: "og:description", content: "I engineer full-stack applications and AI-native systems that ship and work." },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/og-image.jpg" },
]

// ── Nav ───────────────────────────────────
export const NAV: NavItem[] = [
    { label: "Projects",   href: "#projects"   },
    { label: "Experience", href: "#experience" },
    { label: "Uses",       href: "/uses"       },
    { label: "Contact",    href: "#contact"    },
]

// ── Projects ──────────────────────────────
export const PROJECTS: Project[] = [
    {
        title: "Samsmriti",
        role: "Full-Stack AI Engineer",
        tagline: "A live GATE revision tool built and maintained solo.",
        description:
            "Multi-agent system that generates adaptive study plans, explanations, GATE perspectives, common mistakes, and quick points. Designed, built, and deployed end-to-end.",
        stack: ["MongoDB", "Express.js", "React", "Node.js", "JavaScript", "LangChain", "LangGraph", "Pinecone", "Razorpay"],
        live: "https://samsmriti.com",
        sourceOnRequest: true,
        qa: { username: "qa@example.com", password: "demo-pass" },
        highlight: "Live SaaS",
    },
    {
        title: "QuizMitra",
        role: "Full-Stack AI Engineer",
        tagline: "Auto-graded assessments with AI-driven feedback loops.",
        description:
            "Multi-agentic pipeline that authors, evaluates, and rubric-scores submissions with explainable feedback for students as well as instructors.",
        stack: ["MongoDB", "Express.js", "React", "Node.js", "Sarvam AI", "Google AI", "Zoho OAuth2"],
        live: "https://quizmitra.suryanshparashar.com/",
        sourceOnRequest: true,
        qa: { username: "QA-FAC-001", password: "sparashar" },
    },
    {
        title: "Artha Nirikshana",
        role: "Full-Stack Developer",
        tagline: "MERN budgeting app with categorized insights.",
        description:
            "Full MERN stack with JWT auth, recurring transactions, and category analytics. Designed, built, and deployed end-to-end.",
        stack: ["MongoDB (with Aggregation Pipeline)", "Express.js", "React", "Node.js", "Recharts", "Zoho OAuth2", "Google OAuth2"],
        live: "https://artha-nirikshana.suryanshparashar.com/",
        sourceOnRequest: true,
        qa: { username: "qa.artha.tester", password: "QA@ArthaTest#2025!" },
    },
    {
        title: "RakshaSutra",
        role: "Browser Extension Developer",
        tagline: "Zero-trust password generator that lives in your toolbar.",
        description:
            "Chromium extension generating cryptographically strong, configurable passwords with zero data collection, real-time entropy display, and one-click copy. Two modes: Syllable-based for memorability, random character-based for max security.",
        stack: ["TypeScript", "Vite", "Web Crypto API", "Manifest V3"],
        live: "https://rakshasutra.suryanshparashar.com/",
        github: "https://github.com/suryanshparashar/RakshaSutra-Password-Generator",
        sourceOnRequest: false,
    },
]

// ── Skills ────────────────────────────────
export const SKILLS: SkillCategory[] = [
    {
        label: "Languages",
        icon: Code2,
        items: ["JavaScript", "TypeScript", "Python"],
    },
    {
        label: "Full-Stack",
        icon: Layers,
        items: ["React", "Node.js", "Express.js", "MongoDB", "Aggregation Pipeline", "Recharts", "Vite"],
    },
    {
        label: "AI / Agents",
        icon: Brain,
        items: ["LangChain", "LangGraph", "LangSmith", "Pinecone", "Sarvam AI", "Google AI", "RAG", "Multi-agent Architecture"],
    },
    {
        label: "Integrations",
        icon: Plug2,
        items: ["Razorpay", "Google OAuth2", "Zoho OAuth2", "Web Crypto API", "Manifest V3", "REST APIs"],
    },
    {
        label: "Dev Tools",
        icon: Wrench,
        items: ["Git / GitHub", "Vercel", "Render", "Postman", "VS Code"],
    },
]

// ── Experience ────────────────────────────
export const EXPERIENCE: ExperienceItem[] = [
    {
        role: "Freelance Frontend Developer",
        org: "Prxis Tech Solutions",
        period: "6 months · aug 2024 — jan 2025",
        blurb: "Shipped marketing site and internal tooling. Owned design-to-deploy. Improved Lighthouse score from 62 → 98.",
        active: true,
    },
    {
        role: "B.Tech in CSE (AI & ML)",
        org: "Vellore Institute of Technology",
        period: "Graduating 2026",
        blurb: "Coursework in programming, systems, ML, NLP, and deep learning. Built side projects from day one.",
        active: false,
    },
]

// ── Contact ───────────────────────────────
export const CONTACT_DESC =
    "Open to roles, contract work, and serious collaborations on AI-native products."

export const CONTACT_LINKS: ContactLink[] = [
    { label: "Email",    href: "mailto:sparashar2002@gmail.com",           icon: Mail,     display: "sparashar2002@gmail.com" },
    { label: "LinkedIn", href: "https://suryanshparashar.com/linkedin",    icon: Linkedin },
    { label: "GitHub",   href: "https://suryanshparashar.com/github",      icon: Github },
]