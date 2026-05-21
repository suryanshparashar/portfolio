import { useEffect, useRef, useState, type MouseEvent } from "react"
import { useInView } from "../hooks/useInView"
import { Link } from "react-router-dom"
import {
    ArrowUpRight,
    Check,
    Copy,
    Github,
    KeyRound,
    Terminal,
    X,
} from "lucide-react"
import {
    LANDING_META,
    NAV,
    PROJECTS,
    SKILLS,
    EXPERIENCE,
    CONTACT_DESC,
    CONTACT_LINKS,
    type Project,
} from "../data/landing"

// ── Meta helper ───────────────────────────
function applyMeta(title: string, meta: typeof LANDING_META) {
    document.title = title
    meta.forEach((tag) => {
        const selector = tag.name
            ? `meta[name="${tag.name}"]`
            : tag.property
              ? `meta[property="${tag.property}"]`
              : null
        if (!selector) return
        let el = document.querySelector(selector)
        if (!el) {
            el = document.createElement("meta")
            if (tag.name) el.setAttribute("name", tag.name)
            if (tag.property) el.setAttribute("property", tag.property)
            document.head.appendChild(el)
        }
        el.setAttribute("content", tag.content)
    })
}

// ── Page ──────────────────────────────────
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

// ── Nav ───────────────────────────────────
function Nav() {
    return (
        <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-md">
            <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5">
                <a
                    href="#top"
                    className="flex items-center gap-2 font-display text-sm font-semibold"
                >
                    <span className="inline-block size-2 rounded-full bg-primary glow-teal" />
                    <span>suryansh.parashar</span>
                    <span className="text-primary sp-cursor">_</span>
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

// ── Hero — no reveal, first paint ─────────
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

// ── Shared section header ─────────────────
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

// ── About ─────────────────────────────────
function About() {
    const { ref, inView } = useInView()

    return (
        <section id="about" className="border-b border-border/60">
            <div ref={ref} className="mx-auto max-w-6xl px-5 py-24">
                <div className={`reveal ${inView ? "visible" : ""}`}>
                    <SectionHeader
                        kicker="// about"
                        title="What I'm building."
                    />
                </div>
                <div
                    className={`grid gap-8 text-lg leading-relaxed text-muted-foreground md:grid-cols-3 reveal ${inView ? "visible" : ""}`}
                    style={{ transitionDelay: inView ? "0.1s" : "0s" }}
                >
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

// ── Projects ──────────────────────────────
function Projects() {
    const [activeProject, setActiveProject] = useState<Project | null>(null)
    const { ref, inView } = useInView()

    useEffect(() => {
        const handlePointerDown = (e: PointerEvent) => {
            if (!activeProject) return
            if (
                !(e.target as HTMLElement)?.closest(
                    '[data-credentials-root="true"]'
                )
            ) {
                setActiveProject(null)
            }
        }
        document.addEventListener("pointerdown", handlePointerDown)
        return () =>
            document.removeEventListener("pointerdown", handlePointerDown)
    }, [activeProject])

    return (
        <section id="projects" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <SectionHeader kicker="// projects" title="Selected work." />
                {/* ref on the grid — fires once when grid scrolls into view */}
                <div ref={ref} className="grid gap-5 md:grid-cols-2">
                    {PROJECTS.map((p, i) => (
                        // Wrapper div carries the reveal; ProjectCard is untouched
                        <div
                            key={p.title}
                            className={`reveal ${inView ? "visible" : ""}`}
                            style={{
                                transitionDelay: inView ? `${i * 0.1}s` : "0s",
                            }}
                        >
                            <ProjectCard
                                project={p}
                                isActive={activeProject?.title === p.title}
                                onToggleCredentials={() =>
                                    setActiveProject((prev) =>
                                        prev?.title === p.title ? null : p
                                    )
                                }
                                onCloseCredentials={() =>
                                    setActiveProject(null)
                                }
                            />
                        </div>
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

// ── Experience ────────────────────────────
function Experience() {
    const { ref, inView } = useInView<HTMLOListElement>()

    return (
        <section id="experience" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <div className={`reveal ${inView ? "visible" : ""}`}>
                    <SectionHeader
                        kicker="// experience"
                        title="Where I've worked."
                    />
                </div>
                <ol ref={ref} className="relative border-l border-border pl-6">
                    {EXPERIENCE.map((item, i) => (
                        <div
                            key={item.org}
                            className={`mb-8 last:mb-0 reveal ${inView ? "visible" : ""}`}
                            style={{
                                transitionDelay: inView ? `${i * 0.12}s` : "0s",
                            }}
                        >
                            <TimelineItem {...item} />
                        </div>
                    ))}
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
    active,
}: (typeof EXPERIENCE)[0]) {
    return (
        <li>
            <span
                className={`absolute -left-[6.5px] mt-1.5 size-3 rounded-full border-2 border-background ${active ? "bg-primary" : "bg-muted-foreground/40"}`}
            />
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

// ── Skills ────────────────────────────────
function Skills() {
    const { ref, inView } = useInView()

    return (
        <section id="skills" className="border-b border-border/60">
            <div className="mx-auto max-w-6xl px-5 py-24">
                <div className={`reveal ${inView ? "visible" : ""}`}>
                    <SectionHeader kicker="// skills" title="The toolkit." />
                </div>
                <div
                    ref={ref}
                    className="grid gap-4 md:grid-cols-2 lg:grid-cols-5 sp-grid"
                >
                    {SKILLS.map(({ label, icon: Icon, items }, i) => (
                        <div
                            key={label}
                            className={`rounded-xl border border-border bg-card p-5 reveal ${inView ? "visible" : ""}`}
                            style={{
                                transitionDelay: inView ? `${i * 0.08}s` : "0s",
                            }}
                        >
                            <div className="flex items-center gap-2">
                                <Icon className="size-4 text-primary" />
                                <h3 className="font-display text-sm font-semibold">
                                    {label}
                                </h3>
                            </div>
                            <ul className="mt-4 space-y-1.5">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="font-mono text-[13px] text-muted-foreground"
                                    >
                                        {item}
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

// ── Contact ───────────────────────────────
function Contact() {
    const { ref, inView } = useInView()

    return (
        <section id="contact" className="relative overflow-hidden">
            <div className="absolute inset-0 grid-bg opacity-30" aria-hidden />
            <div
                ref={ref}
                className="relative mx-auto max-w-6xl px-5 py-28 text-center"
            >
                <div className={`reveal ${inView ? "visible" : ""}`}>
                    <div className="font-mono text-xs uppercase tracking-widest text-primary">
                        // contact
                    </div>
                    <h2 className="mt-2 font-display text-4xl font-semibold tracking-tight md:text-5xl">
                        Let's build something
                        <br />
                        <span className="text-primary">that ships.</span>
                    </h2>
                    <p className="mx-auto mt-5 max-w-md text-muted-foreground">
                        {CONTACT_DESC}
                    </p>
                </div>
                <div
                    className={`mt-10 flex flex-wrap items-center justify-center gap-3 reveal ${inView ? "visible" : ""}`}
                    style={{ transitionDelay: inView ? "0.15s" : "0s" }}
                >
                    {CONTACT_LINKS.map((link) => {
                        const Icon = link.icon
                        const isPrimary = !!link.display
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target={
                                    link.href.startsWith("mailto")
                                        ? undefined
                                        : "_blank"
                                }
                                rel="noreferrer"
                                className={
                                    isPrimary
                                        ? "inline-flex items-center gap-2 rounded-md bg-primary px-5 py-3 text-sm font-medium text-primary-foreground"
                                        : "inline-flex items-center gap-2 rounded-md border border-border bg-card/60 px-5 py-3 text-sm font-medium hover:bg-card"
                                }
                            >
                                <Icon className="size-4" />
                                {link.display ?? link.label}
                            </a>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}

// ── Footer ────────────────────────────────
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
