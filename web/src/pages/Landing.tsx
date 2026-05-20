import { useEffect, useRef, useState, type MouseEvent } from "react"
import { Link } from "react-router-dom"
import {
    ArrowUpRight,
    Check,
    Copy,
    Github,
    Linkedin,
    Mail,
    KeyRound,
    Terminal,
    Sparkles,
    Code2,
    Brain,
    Wrench,
    X,
} from "lucide-react"

type MetaTag = {
    name?: string
    property?: string
    content: string
}

const LANDING_META: MetaTag[] = [
    {
        name: "description",
        content:
            "Full-Stack AI Engineer building production AI-native systems and SaaS products end-to-end.",
    },
    {
        property: "og:title",
        content: "Suryansh Parashar | Full-Stack AI Engineer",
    },
    {
        property: "og:description",
        content:
            "I engineer full-stack applications and AI-native systems that ship and work.",
    },
    { property: "og:type", content: "website" },
    { property: "og:image", content: "/og-image.jpg" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:image", content: "/og-image.jpg" },
]

const NAV = [
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Uses", href: "/uses" },
    { label: "Contact", href: "#contact" },
]

type Project = {
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

const PROJECTS: Project[] = [
    {
        title: "Samsmriti",
        role: "Full-Stack AI Engineer",
        tagline: "A live GATE revision tool built and maintained solo.",
        description:
            "Multi-agent system that generates adaptive study plans, explanations, GATE perspectives, common mistakes, and quick points. Designed, built, and deployed end-to-end.",
        stack: [
            "MongoDB",
            "Express.js",
            "React",
            "Node.js",
            "JavaScript",
            "LangChain",
            "LangGraph",
            "Pinecone",
            "Razorpay",
        ],
        live: "https://samsmriti.com",
        // github: "https://github.com/suryanshparashar",
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
        stack: [
            "MongoDB",
            "Express.js",
            "React",
            "Node.js",
            "Sarvam AI",
            "Google AI",
            "Zoho OAuth2",
        ],
        live: "https://quizmitra.suryanshparashar.com/",
        // github: "https://github.com/suryanshparashar",
        sourceOnRequest: true,
        qa: { username: "QA-FAC-001", password: "sparashar" },
    },
    {
        title: "Artha Nirikshana",
        role: "Full-Stack Developer",
        tagline: "MERN budgeting app with categorized insights.",
        description:
            "Full MERN stack with JWT auth, recurring transactions, and category analytics. Designed, built, and deployed end-to-end.",
        stack: [
            "MongoDB (with Aggregation Pipeline)",
            "Express.js",
            "React",
            "Node.js",
            "Recharts",
            "Zoho OAuth2",
            "Google OAuth2",
        ],
        live: "https://artha-nirikshana.suryanshparashar.com/",
        // github: "https://github.com/suryanshparashar",
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

const SKILLS = [
    {
        label: "Languages",
        icon: Code2,
        items: ["JavaScript", "TypeScript", "Java", "Python", "NoSQL"],
    },
    {
        label: "Frameworks",
        icon: Sparkles,
        items: ["Express.js", "React", "Node.js", "MongoDB"],
    },
    {
        label: "AI / Agents",
        icon: Brain,
        items: [
            "LangChain",
            "LangGraph",
            "LangSmith",
            "RAG",
            "Vector DBs",
            "Multi-agent systems",
        ],
    },
    {
        label: "Dev Tools",
        icon: Wrench,
        items: ["Git/GitHub", "npm", "Postman", "Render", "Vercel", "VS Code"],
    },
]

function applyMeta(title: string, meta: MetaTag[]) {
    document.title = title

    meta.forEach((tag) => {
        const selector = tag.name
            ? `meta[name="${tag.name}"]`
            : tag.property
              ? `meta[property="${tag.property}"]`
              : null

        if (!selector) {
            return
        }

        let element = document.querySelector(selector)
        if (!element) {
            element = document.createElement("meta")
            if (tag.name) {
                element.setAttribute("name", tag.name)
            }
            if (tag.property) {
                element.setAttribute("property", tag.property)
            }
            document.head.appendChild(element)
        }
        element.setAttribute("content", tag.content)
    })
}

export default function Landing() {
    useEffect(() => {
        applyMeta("Suryansh Parashar | Full-Stack AI Engineer", LANDING_META)
    }, [])

    return (
        <main className="min-h-screen bg-background text-foreground">
            <Nav />
            <Hero />
            <About />
            <Projects />
            <Experience />
            <Skills />
            <Contact />
            <Footer />
        </main>
    )
}

function Nav() {
    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
                <a
                    href="#top"
                    className="flex items-center gap-2 font-display text-sm font-semibold"
                >
                    <span className="inline-block size-2 rounded-full bg-primary glow-teal" />
                    {/* <span>Suryansh Parashar</span> */}
                    <span>suryansh.parashar</span>
                    <span className="text-primary cursor">_</span>
                </a>
                <nav className="flex items-center gap-1 text-sm">
                    {NAV.map((n) =>
                        n.href.startsWith("/") ? (
                            <Link
                                key={n.href}
                                to={n.href}
                                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {n.label}
                            </Link>
                        ) : (
                            <a
                                key={n.href}
                                href={n.href}
                                className="rounded-md px-3 py-1.5 text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                            >
                                {n.label}
                            </a>
                        )
                    )}
                </nav>
            </div>
        </header>
    )
}

function Hero() {
    const gridRef = useRef<HTMLElement | null>(null)
    const [activeCell, setActiveCell] = useState<{
        x: number
        y: number
    } | null>(null)
    const [trailCells, setTrailCells] = useState<
        Array<{ x: number; y: number; ts: number }>
    >([])
    const [tick, setTick] = useState(0)
    const gridSize = 48
    const fadeDelay = 100
    const fadeDuration = 250

    const handleMouseMove = (event: MouseEvent<HTMLElement>) => {
        if (!gridRef.current) {
            return
        }

        const rect = gridRef.current.getBoundingClientRect()
        const offsetX = event.clientX - rect.left
        const offsetY = event.clientY - rect.top

        const cellX = Math.floor(offsetX / gridSize) * gridSize
        const cellY = Math.floor(offsetY / gridSize) * gridSize
        const nextCell = { x: cellX, y: cellY }

        if (
            activeCell &&
            activeCell.x === nextCell.x &&
            activeCell.y === nextCell.y
        ) {
            return
        }

        const now = Date.now()
        if (activeCell) {
            setTrailCells((prev) => {
                const existingIndex = prev.findIndex(
                    (cell) => cell.x === activeCell.x && cell.y === activeCell.y
                )
                if (existingIndex >= 0) {
                    const next = [...prev]
                    next[existingIndex] = { ...next[existingIndex], ts: now }
                    return next
                }
                return [...prev, { ...activeCell, ts: now }]
            })
        }

        setActiveCell(nextCell)
        setTick(now)
    }

    const handleMouseLeave = () => {
        if (!activeCell) {
            return
        }

        const now = Date.now()
        setTrailCells((prev) => [...prev, { ...activeCell, ts: now }])
        setActiveCell(null)
        setTick(now)
    }

    useEffect(() => {
        if (trailCells.length === 0) {
            return
        }

        const intervalId = window.setInterval(() => {
            const now = Date.now()
            setTrailCells((prev) =>
                prev.filter((cell) => now - cell.ts <= fadeDelay + fadeDuration)
            )
            setTick(now)
        }, 50)

        return () => {
            window.clearInterval(intervalId)
        }
    }, [trailCells.length, fadeDelay, fadeDuration])

    const now = tick || Date.now()

    return (
        <section
            id="top"
            className="relative overflow-hidden border-b border-border/60"
            ref={gridRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="absolute inset-0" aria-hidden>
                <div className="absolute inset-0 grid-bg opacity-50" />
                <div className="pointer-events-none absolute inset-0">
                    {trailCells.map((cell) => {
                        const age = now - cell.ts
                        const opacity =
                            age <= fadeDelay
                                ? 1
                                : Math.max(
                                      0,
                                      1 - (age - fadeDelay) / fadeDuration
                                  )

                        if (opacity <= 0) {
                            return null
                        }

                        return (
                            <span
                                key={`${cell.x}-${cell.y}`}
                                className="absolute rounded-sm bg-primary/5 ring-0 ring-primary/40 backdrop-blur-sm"
                                style={{
                                    width: `${gridSize}px`,
                                    height: `${gridSize}px`,
                                    transform: `translate(${cell.x}px, ${cell.y}px)`,
                                    opacity,
                                }}
                            />
                        )
                    })}
                    {activeCell && (
                        <span
                            className="absolute rounded-sm bg-primary/5 ring-0 ring-primary/40 backdrop-blur-sm"
                            style={{
                                width: `${gridSize}px`,
                                height: `${gridSize}px`,
                                transform: `translate(${activeCell.x}px, ${activeCell.y}px)`,
                            }}
                        />
                    )}
                </div>
            </div>
            <div
                className="pointer-events-none absolute -top-32 left-1/2 size-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-3xl opacity-25"
                aria-hidden
            />
            <div className="relative mx-auto max-w-6xl px-5 pb-28 pt-24 md:pb-36 md:pt-32">
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-xs font-mono text-muted-foreground">
                    <Terminal className="size-3 text-primary" />
                    <span>
                        available for select work · {new Date().getFullYear()}
                    </span>
                </div>
                <h1 className="mt-6 font-display text-5xl font-bold leading-[1.05] tracking-tight md:text-7xl">
                    Full-Stack
                    <br />
                    <span className="text-primary">AI Engineer.</span>
                </h1>
                <p className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
                    I engineer full-stack applications and AI-native systems
                    that ship and work.
                </p>
                <div className="mt-10 flex flex-wrap items-center gap-3">
                    <a
                        href="#projects"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground transition-transform hover:-translate-y-0.5"
                    >
                        View Projects
                        <ArrowUpRight className="size-4" />
                    </a>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium text-foreground transition-colors hover:bg-card"
                    >
                        Contact Me
                    </a>
                </div>
            </div>
        </section>
    )
}

function SectionHeader({ kicker, title }: { kicker: string; title: string }) {
    return (
        <div className="mb-12">
            <div className="font-mono text-xs uppercase tracking-widest text-primary">
                {kicker}
            </div>
            <h2 className="mt-2 font-display text-3xl font-semibold tracking-tight md:text-4xl">
                {title}
            </h2>
        </div>
    )
}

function About() {
    return (
        <section id="about" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <SectionHeader kicker="// about" title="What I'm building." />
                <div className="grid gap-8 text-lg leading-relaxed text-muted-foreground md:grid-cols-3">
                    <p className="md:col-span-2 text-justify">
                        I build AI-native products end-to-end, from the model
                        orchestration layer to the pixels users tap. Lately I've
                        been shipping multi-agent systems that do real work:
                        assessments that grade themselves, study tools that
                        adapt to the student, browser extensions that respect
                        the user. Solo developer. Designed, built, and deployed
                        end-to-end.
                    </p>
                    <p className="text-base">
                        I care about latency budgets, clean abstractions, and
                        shipping things people actually use. If it can't make it
                        to production, it doesn't count.
                    </p>
                </div>
            </div>
        </section>
    )
}

function Projects() {
    const [activeProject, setActiveProject] = useState<Project | null>(null)

    useEffect(() => {
        const handlePointerDown = (event: PointerEvent) => {
            if (!activeProject) {
                return
            }

            const target = event.target as HTMLElement | null
            if (!target) {
                return
            }

            if (target.closest('[data-credentials-root="true"]')) {
                return
            }

            setActiveProject(null)
        }

        document.addEventListener("pointerdown", handlePointerDown)
        return () => {
            document.removeEventListener("pointerdown", handlePointerDown)
        }
    }, [activeProject])

    const handleToggleCredentials = (project: Project) => {
        setActiveProject((prev) =>
            prev?.title === project.title ? null : project
        )
    }

    return (
        <section id="projects" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <SectionHeader kicker="// projects" title="Selected work." />
                <div className="grid gap-5 md:grid-cols-2">
                    {PROJECTS.map((p) => (
                        <ProjectCard
                            key={p.title}
                            project={p}
                            isActive={activeProject?.title === p.title}
                            onToggleCredentials={() =>
                                handleToggleCredentials(p)
                            }
                            onCloseCredentials={() => setActiveProject(null)}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

function ProjectCard({
    project,
    isActive,
    onToggleCredentials,
    onCloseCredentials,
}: {
    project: Project
    isActive: boolean
    onToggleCredentials: () => void
    onCloseCredentials: () => void
}) {
    return (
        <article className="group relative flex flex-col gap-5 rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40">
            <header className="flex items-start justify-between gap-4">
                <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                        {project.role}
                    </div>
                    <h3 className="mt-1 font-display text-xl font-semibold">
                        {project.title}
                    </h3>
                </div>
                {project.highlight && (
                    <span className="shrink-0 rounded-full border border-primary/40 bg-primary/10 px-2.5 py-1 font-mono text-[10px] uppercase tracking-widest text-primary">
                        {project.highlight}
                    </span>
                )}
            </header>

            <p className="text-sm font-medium text-foreground">
                {project.tagline}
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
                {project.description}
            </p>

            <div className="flex flex-wrap gap-1.5">
                {project.stack.map((s) => (
                    <span
                        key={s}
                        className="rounded-md border border-border bg-secondary/60 px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                        {s}
                    </span>
                ))}
            </div>

            <div className="mt-auto flex flex-wrap items-center gap-3 pt-2 text-sm">
                {project.live && (
                    <a
                        href={project.live}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
                    >
                        Live <ArrowUpRight className="size-3.5" />
                    </a>
                )}
                {project.github ? (
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                        <Github className="size-3.5" /> GitHub
                    </a>
                ) : project.sourceOnRequest ? (
                    <span className="text-sm text-muted-foreground">
                        Source available on request
                    </span>
                ) : null}
                {project.qa && (
                    <div
                        className="relative ml-auto"
                        data-credentials-root="true"
                    >
                        <button
                            type="button"
                            onClick={onToggleCredentials}
                            className="inline-flex items-center gap-1.5 rounded-md border border-border bg-secondary/60 px-2.5 py-1 font-mono text-[11px] text-muted-foreground transition-colors hover:text-foreground"
                        >
                            <KeyRound className="size-3" />
                            Test credentials
                        </button>
                        {isActive && (
                            <CredentialsPopover
                                project={project}
                                onClose={onCloseCredentials}
                            />
                        )}
                    </div>
                )}
            </div>
        </article>
    )
}

function CredentialsPopover({
    project,
    onClose,
}: {
    project: Project
    onClose: () => void
}) {
    const [copied, setCopied] = useState({ username: false, password: false })
    const timeoutsRef = useRef<{
        username: number | null
        password: number | null
    }>({
        username: null,
        password: null,
    })

    const clearCopyTimeouts = () => {
        if (timeoutsRef.current.username !== null) {
            window.clearTimeout(timeoutsRef.current.username)
            timeoutsRef.current.username = null
        }
        if (timeoutsRef.current.password !== null) {
            window.clearTimeout(timeoutsRef.current.password)
            timeoutsRef.current.password = null
        }
    }

    useEffect(() => {
        clearCopyTimeouts()
        setCopied({ username: false, password: false })

        return () => {
            clearCopyTimeouts()
        }
    }, [project.title])

    const handleCopy = (field: "username" | "password", value: string) => {
        if (!navigator.clipboard) {
            return
        }

        navigator.clipboard
            .writeText(value)
            .then(() => {
                setCopied((prev) => ({ ...prev, [field]: true }))

                if (timeoutsRef.current[field] !== null) {
                    window.clearTimeout(timeoutsRef.current[field])
                }

                timeoutsRef.current[field] = window.setTimeout(() => {
                    setCopied((prev) => ({ ...prev, [field]: false }))
                    timeoutsRef.current[field] = null
                }, 1200)
            })
            .catch(() => {})
    }

    return (
        <div
            role="dialog"
            aria-modal="false"
            aria-labelledby="credentials-title"
            className="absolute right-0 top-full z-30 mt-2 w-72 rounded-xl border border-border/60 bg-card/15 p-4 shadow-[0_20px_60px_-40px_rgba(0,0,0,0.8)] backdrop-blur-lg"
            data-credentials-root="true"
        >
            <div className="flex items-start justify-between gap-3">
                <div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-primary">
                        Test credentials
                    </div>
                    <h3
                        id="credentials-title"
                        className="mt-1 font-display text-sm font-semibold text-foreground"
                    >
                        {project.title}
                    </h3>
                </div>
                <button
                    type="button"
                    onClick={onClose}
                    className="rounded-md border border-border bg-secondary/60 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                    aria-label="Close credentials"
                >
                    <X className="size-3.5" />
                </button>
            </div>

            <div className="mt-3 space-y-2 text-sm">
                <div className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background/40 px-2.5 py-2 backdrop-blur">
                    <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            username
                        </div>
                        <div className="truncate font-mono text-xs text-foreground">
                            {project.qa?.username}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            handleCopy("username", project.qa?.username ?? "")
                        }
                        className="rounded-md border border-border bg-secondary/60 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy username"
                    >
                        {copied.username ? (
                            <Check className="size-3.5 text-primary" />
                        ) : (
                            <Copy className="size-3.5" />
                        )}
                    </button>
                </div>

                <div className="flex items-center justify-between gap-2 rounded-md border border-border/60 bg-background/40 px-2.5 py-2 backdrop-blur">
                    <div className="min-w-0">
                        <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
                            password
                        </div>
                        <div className="truncate font-mono text-xs text-foreground">
                            {project.qa?.password}
                        </div>
                    </div>
                    <button
                        type="button"
                        onClick={() =>
                            handleCopy("password", project.qa?.password ?? "")
                        }
                        className="rounded-md border border-border bg-secondary/60 p-1.5 text-muted-foreground transition-colors hover:text-foreground"
                        aria-label="Copy password"
                    >
                        {copied.password ? (
                            <Check className="size-3.5 text-primary" />
                        ) : (
                            <Copy className="size-3.5" />
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

function Experience() {
    return (
        <section id="experience" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <SectionHeader
                    kicker="// experience"
                    title="Where I've worked."
                />
                <ol className="relative border-l border-border pl-6">
                    <TimelineItem
                        role="Freelance Frontend Developer"
                        org="Prxis Tech Solutions"
                        period="6 months · aug 2024 — jan 2025"
                        blurb="Shipped marketing site, and internal tooling. Owned design-to-deploy. Improved Lighthouse score from 62 → 98."
                    />
                    <TimelineItem
                        role="B.Tech in CSE (AI & ML)"
                        org="Vellore Institute of Technology"
                        period="Graduating 2026"
                        blurb="Coursework in programming, systems, ML, NLP, and deep learning. Built side projects from day one."
                    />
                </ol>
            </div>
        </section>
    )
}

function TimelineItem({
    role,
    org,
    period,
    blurb,
}: {
    role: string
    org: string
    period: string
    blurb: string
}) {
    return (
        <li className="mb-8 last:mb-0">
            <span className="absolute -left-[6.5px] mt-1.5 size-3 rounded-full border-2 border-background bg-primary" />
            <div className="font-mono text-xs text-muted-foreground">
                {period}
            </div>
            <h3 className="mt-1 font-display text-lg font-semibold">
                {role} <span className="text-muted-foreground">· {org}</span>
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
                {blurb}
            </p>
        </li>
    )
}

function Skills() {
    return (
        <section id="skills" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <SectionHeader kicker="// skills" title="The toolkit." />
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {SKILLS.map(({ label, icon: Icon, items }) => (
                        <div
                            key={label}
                            className="rounded-xl border border-border bg-card p-5"
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="size-4 text-primary" />
                                <h3 className="font-display text-sm font-semibold">
                                    {label}
                                </h3>
                            </div>
                            <ul className="mt-4 space-y-1.5 text-sm text-muted-foreground">
                                {items.map((i) => (
                                    <li
                                        key={i}
                                        className="font-mono text-[13px]"
                                    >
                                        {i}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

function Contact() {
    return (
        <section id="contact" className="relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
            <div className="relative mx-auto max-w-6xl px-5 py-28 text-center">
                <div className="font-mono text-xs uppercase tracking-widest text-primary">
                    // contact
                </div>
                <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                    Let's build something
                    <br />
                    <span className="text-primary">that ships.</span>
                </h2>
                <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                    Open to roles, contract work, and serious collaborations on
                    AI-native products.
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
                    <a
                        href="mailto:sparashar2002@gmail.com"
                        className="inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                    >
                        <Mail className="size-4" /> sparashar2002@gmail.com
                    </a>
                    <a
                        href="https://suryanshparashar.com/linkedin"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium hover:bg-card"
                    >
                        <Linkedin className="size-4" /> LinkedIn
                    </a>
                    <a
                        href="https://suryanshparashar.com/github"
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium hover:bg-card"
                    >
                        <Github className="size-4" /> GitHub
                    </a>
                </div>
            </div>
        </section>
    )
}

function Footer() {
    return (
        <footer className="border-t border-border/60">
            <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-8 text-xs text-muted-foreground md:flex-row">
                <div>
                    &copy; {new Date().getFullYear()} Suryansh Parashar. All
                    rights reserved.
                </div>
                <div className="font-mono">built &amp; deployed solo</div>
            </div>
        </footer>
    )
}
