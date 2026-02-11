import { useState, useEffect, useRef, Suspense, memo, useCallback } from "react"
import {
    motion,
    AnimatePresence,
    useMotionValue,
    useSpring,
    useTransform,
} from "framer-motion"
import {
    Code2,
    Database,
    Brain,
    Mail,
    Github,
    Linkedin,
    Server,
    Send,
    Menu,
    X,
    Zap,
    ArrowRight,
    Terminal,
    Cpu,
    Layers,
    Briefcase,
    GraduationCap,
    Heart,
    Coffee,
    Sparkles,
    Rocket,
    Palette,
    Globe,
    Smartphone,
    Shield,
    TrendingUp,
    Star,
    Users,
    BookOpen,
    MessageCircle,
    Upload,
    Lightbulb,
    ExternalLink,
    Network,
    Search,
    ChevronUp,
} from "lucide-react"
import { projects, skills, aboutMe } from "./data/portfolioData"
import type { ContactForm } from "./types/portfolio"
import { lazy } from "react"
const HeroScene = lazy(() =>
    import("./components/Scene3DEnhanced").then((m) => ({
        default: m.HeroScene,
    }))
)
import {
    ScrambleText,
    FloatingElement,
    MorphingText,
} from "./components/AnimatedElements"
import {
    AnimatedLetters,
    HoverGlowCard,
    FancyCounter,
} from "./components/AdvancedEffects"
import { AdvancedCursor, MouseSpotlight } from "./components/AdvancedEffects"
import LoadingScreen from "./components/LoadingScreen"

// ── Single unified scroll listener ──────────────────────────────
// ONE rAF-throttled scroll handler that all components read from.
type ScrollCallback = (scrollY: number) => void
const scrollCallbacks = new Set<ScrollCallback>()
let scrollRAFScheduled = false

function onGlobalScroll() {
    if (!scrollRAFScheduled) {
        scrollRAFScheduled = true
        requestAnimationFrame(() => {
            const y = window.scrollY
            scrollCallbacks.forEach((cb) => cb(y))
            scrollRAFScheduled = false
        })
    }
}

function useGlobalScroll(cb: ScrollCallback) {
    useEffect(() => {
        scrollCallbacks.add(cb)
        // Bootstrap if first subscriber
        if (scrollCallbacks.size === 1) {
            window.addEventListener("scroll", onGlobalScroll, { passive: true })
        }
        return () => {
            scrollCallbacks.delete(cb)
            if (scrollCallbacks.size === 0) {
                window.removeEventListener("scroll", onGlobalScroll)
            }
        }
    }, [cb])
}

// Scroll Progress Bar — pure CSS transform, no Framer
const ScrollProgress = () => {
    const barRef = useRef<HTMLDivElement>(null)

    const handleScroll = useCallback(() => {
        const el = barRef.current
        if (el) {
            const progress =
                window.scrollY /
                (document.documentElement.scrollHeight - window.innerHeight)
            el.style.transform = `scaleX(${Math.min(progress, 1)})`
        }
    }, [])

    useGlobalScroll(handleScroll)

    // initial render
    useEffect(() => {
        handleScroll()
    }, [handleScroll])

    return (
        <div
            ref={barRef}
            className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 origin-left z-[100] will-change-transform"
            style={{ transform: "scaleX(0)" }}
        />
    )
}

// Back to Top Button
const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useGlobalScroll(
        useCallback((y: number) => {
            setIsVisible(y > 500)
        }, [])
    )

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0, y: 20 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg shadow-purple-500/30 hover:shadow-xl hover:shadow-purple-500/40 transition-all duration-300 group hover:scale-110 active:scale-90"
                >
                    <div className="animate-bounce-subtle">
                        <ChevronUp className="w-6 h-6 text-white" />
                    </div>
                </motion.button>
            )}
        </AnimatePresence>
    )
}

// Noise overlay removed for performance

// Floating particles - CSS-only for performance (no Framer Motion per-particle)
const FloatingParticles = ({ count = 8 }: { count?: number }) => {
    const particles = Array.from({ length: Math.min(count, 10) }, (_, i) => ({
        id: i,
        size: Math.random() * 4 + 2,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: Math.random() * 20 + 15,
        delay: Math.random() * 5,
    }))

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {particles.map((particle) => (
                <div
                    key={particle.id}
                    className="absolute rounded-full bg-gradient-to-r from-blue-400/20 to-purple-400/20 animate-float-particle"
                    style={{
                        width: particle.size,
                        height: particle.size,
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        animationDuration: `${particle.duration}s`,
                        animationDelay: `${particle.delay}s`,
                    }}
                />
            ))}
        </div>
    )
}

// Glowing orb decoration - CSS animation instead of Framer Motion
const GlowingOrb = ({
    className = "",
    color = "purple",
}: {
    className?: string
    color?: string
}) => {
    const colorClasses: Record<string, string> = {
        purple: "from-purple-500/20 to-purple-500/0",
        blue: "from-blue-500/20 to-blue-500/0",
        cyan: "from-cyan-500/20 to-cyan-500/0",
    }

    return (
        <div
            className={`absolute rounded-full bg-gradient-radial ${colorClasses[color]} blur-3xl pointer-events-none animate-glow-orb ${className}`}
        />
    )
}

// Single shared IntersectionObserver for all scroll reveals — replays on re-enter
const useScrollReveal = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible")
                    } else {
                        entry.target.classList.remove("visible")
                    }
                })
            },
            { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
        )

        // Observe all .reveal and .stagger-children elements
        const elements = document.querySelectorAll(
            ".reveal, .stagger-children, .stagger-grid"
        )
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])
}

// Smooth scroll hook
const useSmoothScroll = () => {
    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const link = target.closest('a[href^="#"]')
            if (link) {
                e.preventDefault()
                const id = link.getAttribute("href")?.slice(1)
                if (id) {
                    const element = document.getElementById(id)
                    element?.scrollIntoView({ behavior: "smooth" })
                }
            }
        }
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])
}

// Animated counter
const AnimatedCounter = ({
    value,
    suffix = "",
}: {
    value: number
    suffix?: string
}) => {
    const ref = useRef<HTMLSpanElement>(null)
    const [count, setCount] = useState(0)
    const triggered = useRef(false)

    useEffect(() => {
        const el = ref.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !triggered.current) {
                    triggered.current = true
                    observer.disconnect()
                    const duration = 2000
                    const startTime = Date.now()
                    const animate = () => {
                        const elapsed = Date.now() - startTime
                        const progress = Math.min(elapsed / duration, 1)
                        const eased = 1 - Math.pow(1 - progress, 3)
                        setCount(Math.floor(eased * value))
                        if (progress < 1) requestAnimationFrame(animate)
                    }
                    animate()
                }
            },
            { threshold: 0.1 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [value])

    return (
        <span ref={ref}>
            {count}
            {suffix}
        </span>
    )
}

// Gradient text component
const GradientText = ({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) => (
    <span
        className={`bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient ${className}`}
    >
        {children}
    </span>
)

// Animated Section Divider - dramatic with expanding line and orbiting dots
const SectionDivider = () => (
    <div className="relative h-32 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 flex items-center reveal reveal-fade">
            <div className="w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent reveal reveal-scale" />
        </div>
        <div className="absolute inset-0 flex items-center reveal reveal-fade reveal-d3">
            <div className="w-2/3 mx-auto h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
        </div>
        <div className="relative z-10 flex items-center gap-4 reveal reveal-scale reveal-d2">
            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
            <div className="w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-pulse relative">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 animate-ping opacity-30" />
            </div>
            <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
        </div>
        {/* Fading edge particles */}
        <div className="absolute left-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-blue-500/50 animate-float-slow" />
        <div
            className="absolute right-1/4 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-purple-500/50 animate-float-slow"
            style={{ animationDelay: "1s" }}
        />
    </div>
)

// Subtle section parallax background — uses the unified scroll listener
const SectionParallax = ({
    children,
    speed = 0.15,
}: {
    children: React.ReactNode
    speed?: number
}) => {
    const ref = useRef<HTMLDivElement>(null)

    const parallaxHandler = useCallback(
        (scrollY: number) => {
            const el = ref.current
            if (!el) return
            const rect = el.getBoundingClientRect()
            const center = rect.top + rect.height / 2
            const viewCenter = window.innerHeight / 2
            const offset = (center - viewCenter) * speed
            el.style.transform = `translate3d(0, ${offset}px, 0)`
        },
        [speed]
    )

    useGlobalScroll(parallaxHandler)

    return (
        <div ref={ref} className="will-change-transform">
            {children}
        </div>
    )
}

// Navigation component
const Navigation = ({
    activeSection,
    scrollToSection,
}: {
    activeSection: string
    scrollToSection: (id: string) => void
}) => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    useGlobalScroll(
        useCallback((y: number) => {
            setIsScrolled(y > 50)
        }, [])
    )

    const navItems = [
        { id: "home", label: "Home" },
        { id: "about", label: "About" },
        { id: "projects", label: "Projects" },
        { id: "skills", label: "Skills" },
        { id: "contact", label: "Contact" },
    ]

    return (
        <motion.nav
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                isScrolled ? "py-4" : "py-6"
            }`}
        >
            <div className="max-w-7xl mx-auto px-6">
                <div
                    className={`flex justify-between items-center transition-all duration-500 ${
                        isScrolled
                            ? "bg-black/80 backdrop-blur-sm border border-white/10 rounded-2xl px-6 py-3 shadow-2xl shadow-purple-500/10"
                            : ""
                    }`}
                >
                    {/* Logo */}
                    <div
                        className="flex items-center gap-3 cursor-pointer group hover:scale-[1.02] transition-transform"
                        onClick={() => scrollToSection("home")}
                    >
                        <div className="relative">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center overflow-hidden group-hover:shadow-lg group-hover:shadow-purple-500/50 transition-all duration-500">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/50 to-transparent animate-spin-slow" />
                                <Terminal className="w-6 h-6 text-white relative z-10" />
                            </div>
                            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a0a0f] animate-pulse" />
                        </div>
                        <div className="hidden sm:block">
                            <ScrambleText
                                text="Suryansh"
                                className="text-lg font-bold text-white"
                            />
                            <p className="text-xs text-gray-400">
                                Full Stack Engineer
                            </p>
                        </div>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <motion.button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={`relative px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95 ${
                                    activeSection === item.id
                                        ? "text-white"
                                        : "text-gray-400 hover:text-white"
                                }`}
                            >
                                {activeSection === item.id && (
                                    <motion.div
                                        layoutId="navIndicator"
                                        className="absolute inset-0 bg-gradient-to-r from-blue-600/80 to-purple-600/80 rounded-xl"
                                        transition={{
                                            type: "spring",
                                            stiffness: 400,
                                            damping: 30,
                                        }}
                                    />
                                )}
                                <span className="relative z-10">
                                    {item.label}
                                </span>
                            </motion.button>
                        ))}
                    </div>

                    {/* CTA Button */}
                    <div className="hidden md:flex items-center gap-3">
                        <a
                            href="https://github.com/suryanshparashar/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 bg-white/5 hover:bg-white/10 rounded-xl border border-white/10 hover:border-purple-500/50 transition-all duration-300 w-8 h-8 hover:scale-110 hover:rotate-12 active:scale-90"
                        >
                            <Github className="w-5 h-5 text-white" />
                        </a>
                        <button
                            onClick={() => scrollToSection("contact")}
                            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl text-sm font-semibold hover:shadow-lg hover:shadow-purple-500/30 transition-all duration-300 flex items-center gap-2 hover:scale-105 active:scale-95"
                        >
                            <span>Let's Talk</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 active:scale-90 transition-transform"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="w-6 h-6" />
                        ) : (
                            <Menu className="w-6 h-6" />
                        )}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black/95 backdrop-blur-sm border-t border-white/10 mt-4"
                    >
                        <div className="p-6 space-y-2">
                            {navItems.map((item, i) => (
                                <motion.button
                                    key={item.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    onClick={() => {
                                        scrollToSection(item.id)
                                        setIsMenuOpen(false)
                                    }}
                                    className={`block w-full text-left px-4 py-3 rounded-xl text-lg font-medium transition-all ${
                                        activeSection === item.id
                                            ? "bg-gradient-to-r from-blue-600/20 to-purple-600/20 text-white"
                                            : "text-gray-400 hover:text-white hover:bg-white/5"
                                    }`}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.nav>
    )
}

// Hero Section
const HeroSection = ({
    scrollToSection,
}: {
    scrollToSection: (id: string) => void
}) => {
    const heroRef = useRef<HTMLElement>(null)
    const heroContentRef = useRef<HTMLDivElement>(null)
    const heroDecoRef = useRef<HTMLDivElement>(null)
    const heroBadgeRef = useRef<HTMLDivElement>(null)
    const heroScrollRef = useRef<HTMLDivElement>(null)
    const heroNameFirstRef = useRef<HTMLSpanElement>(null)
    const heroNameLastRef = useRef<HTMLSpanElement>(null)
    const [heroVisible, setHeroVisible] = useState(true)

    // Mouse-based 3D parallax for hero name
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { stiffness: 150, damping: 25, mass: 0.5 }
    const smoothX = useSpring(mouseX, springConfig)
    const smoothY = useSpring(mouseY, springConfig)

    // SURYANSH layer — closer to camera, moves more
    const firstRotateY = useTransform(smoothX, [-0.5, 0.5], [12, -12])
    const firstRotateX = useTransform(smoothY, [-0.5, 0.5], [-8, 8])
    const firstTranslateX = useTransform(smoothX, [-0.5, 0.5], [25, -25])
    const firstTranslateY = useTransform(smoothY, [-0.5, 0.5], [15, -15])

    // PARASHAR layer — further back, moves less (depth illusion)
    const lastRotateY = useTransform(smoothX, [-0.5, 0.5], [6, -6])
    const lastRotateX = useTransform(smoothY, [-0.5, 0.5], [-4, 4])
    const lastTranslateX = useTransform(smoothX, [-0.5, 0.5], [-15, 15])
    const lastTranslateY = useTransform(smoothY, [-0.5, 0.5], [-10, 10])

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            const { innerWidth, innerHeight } = window
            mouseX.set(e.clientX / innerWidth - 0.5)
            mouseY.set(e.clientY / innerHeight - 0.5)
        }
        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [mouseX, mouseY])

    // Parallax: move layers at different speeds via the unified scroll listener
    const parallaxHandler = useCallback((scrollY: number) => {
        if (!heroContentRef.current) return
        const y = scrollY
        // content moves up slowly
        heroContentRef.current.style.transform = `translate3d(0, ${y * 0.3}px, 0)`
        // split-depth scroll parallax on name words
        if (heroNameFirstRef.current)
            heroNameFirstRef.current.style.setProperty(
                "--scroll-y",
                `${y * 0.15}px`
            )
        if (heroNameLastRef.current)
            heroNameLastRef.current.style.setProperty(
                "--scroll-y",
                `${y * -0.08}px`
            )
        // decorative dots move faster
        if (heroDecoRef.current)
            heroDecoRef.current.style.transform = `translate3d(0, ${y * 0.5}px, 0)`
        // badge moves even slower for depth
        if (heroBadgeRef.current)
            heroBadgeRef.current.style.opacity = `${Math.max(1 - y / 600, 0)}`
        // scroll indicator fades out
        if (heroScrollRef.current)
            heroScrollRef.current.style.opacity = `${Math.max(1 - y / 300, 0)}`
    }, [])

    useGlobalScroll(parallaxHandler)

    // Pause 3D canvas when hero is scrolled off-screen
    useEffect(() => {
        const el = heroRef.current
        if (!el) return
        const observer = new IntersectionObserver(
            ([entry]) => setHeroVisible(entry.isIntersecting),
            { threshold: 0 }
        )
        observer.observe(el)
        return () => observer.disconnect()
    }, [])

    const roles = [
        "Full Stack Developer",
        "AI Engineer",
        "UI/UX Designer",
        "Problem Solver",
    ]

    return (
        <section
            ref={heroRef}
            id="home"
            className="relative min-h-screen flex items-center justify-center overflow-hidden"
        >
            {/* 3D Background */}
            <Suspense
                fallback={<div className="absolute inset-0 bg-[#0a0a0f]" />}
            >
                <HeroScene visible={heroVisible} />
            </Suspense>

            {/* Floating decorative elements - CSS animations */}
            <div
                ref={heroDecoRef}
                className="absolute inset-0 overflow-hidden pointer-events-none will-change-transform"
            >
                <div className="absolute top-1/4 left-10 w-2 h-2 bg-blue-500 rounded-full animate-float-slow" />
                <div
                    className="absolute top-1/3 right-20 w-3 h-3 bg-purple-500 rounded-full animate-float-slow"
                    style={{ animationDelay: "1s" }}
                />
                <div
                    className="absolute bottom-1/3 left-1/4 w-1.5 h-1.5 bg-cyan-500 rounded-full animate-float-slow"
                    style={{ animationDelay: "0.5s" }}
                />
                <div
                    className="absolute top-1/2 right-1/4 w-2 h-2 bg-pink-500 rounded-full animate-float-slow"
                    style={{ animationDelay: "1.5s" }}
                />
                {/* Extra parallax decorations */}
                <div className="absolute top-1/5 left-1/3 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl blob" />
                <div className="absolute bottom-1/4 right-1/3 w-56 h-56 bg-blue-500/5 rounded-full blur-3xl blob blob-delay-1" />
                <div className="absolute top-2/3 left-1/5 w-32 h-32 bg-cyan-500/5 rounded-full blur-3xl blob blob-delay-2" />
            </div>

            {/* Content — parallax via scroll-driven transform */}
            <div
                ref={heroContentRef}
                className="relative z-10 text-center px-6 max-w-6xl mx-auto will-change-transform"
            >
                {/* Badge */}
                <motion.div
                    ref={heroBadgeRef}
                    initial={{ opacity: 0, scale: 0, rotate: -10 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 20,
                        delay: 0.2,
                    }}
                    className="inline-flex items-center gap-3 px-5 py-2.5 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-cyan-500/10 border border-white/10 rounded-full mb-8 hover:border-purple-500/30 transition-colors cursor-default animate-float-badge"
                >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm text-gray-300">
                        Available for opportunities
                    </span>
                    <Sparkles className="w-4 h-4 text-yellow-400" />
                </motion.div>

                {/* Main Heading with staggered animation */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    className="mb-6 relative"
                >
                    {/* Decorative line */}
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute -left-4 top-1/2 w-8 h-[2px] bg-gradient-to-r from-blue-500 to-transparent hidden lg:block"
                    />
                    <motion.div
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: 1, delay: 1.2 }}
                        className="absolute -right-4 top-1/2 w-8 h-[2px] bg-gradient-to-l from-purple-500 to-transparent hidden lg:block"
                    />

                    <h1
                        className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight text-glow-animate"
                        style={{ perspective: "1000px" }}
                    >
                        <motion.span
                            ref={heroNameFirstRef}
                            className="block text-white relative will-change-transform"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                rotateY: firstRotateY,
                                rotateX: firstRotateX,
                                x: firstTranslateX,
                                y: firstTranslateY,
                                translateY: "var(--scroll-y, 0px)",
                                transformStyle: "preserve-3d",
                            }}
                            initial={{
                                opacity: 0,
                                y: 50,
                                rotateX: -40,
                                scale: 0.8,
                            }}
                            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            SURYANSH
                            {/* Glowing underline */}
                            <motion.div
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.8, delay: 1 }}
                                className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent origin-center"
                            />
                        </motion.span>
                        <motion.span
                            ref={heroNameLastRef}
                            className="block mt-2 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient will-change-transform"
                            style={{
                                fontFamily: "'Orbitron', sans-serif",
                                rotateY: lastRotateY,
                                rotateX: lastRotateX,
                                x: lastTranslateX,
                                y: lastTranslateY,
                                translateY: "var(--scroll-y, 0px)",
                                transformStyle: "preserve-3d",
                            }}
                            initial={{
                                opacity: 0,
                                y: 50,
                                rotateX: -40,
                                scale: 0.8,
                            }}
                            animate={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                        >
                            PARASHAR
                        </motion.span>
                    </h1>
                </motion.div>

                {/* Subtitle */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="mb-10"
                >
                    <p className="text-xl sm:text-2xl md:text-3xl text-gray-300 font-light">
                        I'm a{" "}
                        <span className="text-white font-medium relative">
                            <MorphingText
                                words={roles}
                                className="inline-block"
                            />
                            <motion.span
                                className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                                initial={{ scaleX: 0 }}
                                animate={{ scaleX: 1 }}
                                transition={{ duration: 0.6, delay: 1.2 }}
                            />
                        </span>
                    </p>
                </motion.div>

                {/* Stats row */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.9 }}
                    className="flex justify-center gap-8 mb-10"
                >
                    {[
                        { value: "2+", label: "Years Exp" },
                        { value: "50+", label: "Students Helped" },
                        { value: "∞", label: "Curiosity" },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: 1 + i * 0.1 }}
                            className="text-center"
                        >
                            <p className="text-2xl md:text-3xl font-bold text-white">
                                {stat.value}
                            </p>
                            <p className="text-xs text-gray-500 uppercase tracking-wider">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1.1 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <button
                        onClick={() => scrollToSection("projects")}
                        className="group px-8 py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-2xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 flex items-center gap-3 relative overflow-hidden hover-magnetic animate-pulse-ring"
                    >
                        {/* Shimmer effect */}
                        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="relative">View My Work</span>
                        <div className="relative animate-bounce-x">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </button>
                    <button
                        onClick={() => scrollToSection("contact")}
                        className="group px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 rounded-2xl text-lg font-semibold transition-all duration-300 relative overflow-hidden hover-magnetic animate-border-breathe"
                    >
                        <span className="relative z-10">Get in Touch</span>
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                </motion.div>
            </div>

            {/* Scroll Indicator - Outside parallax content */}
            <motion.div
                ref={heroScrollRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
                className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 will-change-[opacity]"
            >
                <div
                    className="flex flex-col items-center gap-2 cursor-pointer group animate-bounce-subtle"
                    onClick={() => scrollToSection("about")}
                >
                    <span className="text-xs text-gray-500 uppercase tracking-widest group-hover:text-gray-300 transition-colors">
                        Scroll
                    </span>
                    <div className="w-6 h-10 border-2 border-gray-500 group-hover:border-gray-300 rounded-full flex justify-center pt-2 transition-colors">
                        <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-scroll-dot" />
                    </div>
                </div>
            </motion.div>

            {/* Gradient overlays */}
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0a0a0f] to-transparent z-10" />
        </section>
    )
}

// About Section
const AboutSection = memo(() => {
    const stats = [
        { value: 5, suffix: "+", label: "Projects Completed", icon: Code2 },
        { value: 3, suffix: "+", label: "Years Experience", icon: Briefcase },
        { value: 15, suffix: "+", label: "Technologies", icon: Layers },
        { value: 100, suffix: "%", label: "Client Satisfaction", icon: Star },
    ]

    const funFacts = [
        { emoji: "☕", text: "300+ cups of coffee this year" },
        { emoji: "🎮", text: "Debugging > Gaming" },
        { emoji: "🌙", text: "Night owl coder" },
        { emoji: "📚", text: "Always learning something new" },
    ]

    return (
        <section id="about" className="py-32 px-6 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-900/5 to-[#0a0a0f]" />

            {/* Ambient blobs */}
            <SectionParallax speed={0.1}>
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl blob" />
                <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl blob blob-delay-1" />
                <div className="absolute top-2/3 left-1/3 w-64 h-64 bg-cyan-500/3 rounded-full blur-3xl blob blob-delay-2" />
            </SectionParallax>

            {/* Animated grid pattern */}
            <div className="absolute inset-0 opacity-[0.03]">
                <div
                    className="w-full h-full"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image/Visual */}
                    <motion.div
                        initial={{
                            opacity: 0,
                            x: -60,
                            scale: 0.5,
                            rotateY: 15,
                        }}
                        whileInView={{ opacity: 1, x: 0, scale: 1, rotateY: 0 }}
                        viewport={{ margin: "-100px" }}
                        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        className="relative"
                    >
                        <div className="relative">
                            <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10 p-8 glow-border shimmer-hover">
                                {/* Decorative elements */}
                                <div className="absolute top-4 left-4 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                                    <div
                                        className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse"
                                        style={{ animationDelay: "0.3s" }}
                                    />
                                    <div
                                        className="w-3 h-3 rounded-full bg-green-500 animate-pulse"
                                        style={{ animationDelay: "0.6s" }}
                                    />
                                </div>

                                {/* Typing cursor animation */}
                                <div className="absolute top-4 right-4">
                                    <div className="w-2 h-4 bg-green-400 animate-pulse" />
                                </div>

                                {/* Code snippet visual */}
                                <div className="mt-8 font-mono text-sm space-y-2">
                                    <p className="text-gray-500 reveal reveal-left">
                                        // About me
                                    </p>
                                    <p className="reveal reveal-left reveal-d1">
                                        <span className="text-purple-400">
                                            const
                                        </span>{" "}
                                        <span className="text-blue-400">
                                            developer
                                        </span>{" "}
                                        <span className="text-white">=</span>{" "}
                                        <span className="text-yellow-400">
                                            {"{"}
                                        </span>
                                    </p>
                                    <p className="pl-4 reveal reveal-left reveal-d2">
                                        <span className="text-cyan-400">
                                            name
                                        </span>
                                        <span className="text-white">:</span>{" "}
                                        <span className="text-green-400">
                                            "Suryansh Parashar"
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="pl-4 reveal reveal-left reveal-d3">
                                        <span className="text-cyan-400">
                                            role
                                        </span>
                                        <span className="text-white">:</span>{" "}
                                        <span className="text-green-400">
                                            "Full Stack Developer"
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="pl-4 reveal reveal-left reveal-d4">
                                        <span className="text-cyan-400">
                                            passion
                                        </span>
                                        <span className="text-white">:</span>{" "}
                                        <span className="text-green-400">
                                            "Building the future"
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="pl-4 reveal reveal-left reveal-d5">
                                        <span className="text-cyan-400">
                                            skills
                                        </span>
                                        <span className="text-white">:</span>{" "}
                                        <span className="text-yellow-400">
                                            [
                                        </span>
                                        <span className="text-green-400">
                                            "React"
                                        </span>
                                        <span className="text-white">,</span>{" "}
                                        <span className="text-green-400">
                                            "Node"
                                        </span>
                                        <span className="text-white">,</span>{" "}
                                        <span className="text-green-400">
                                            "AI"
                                        </span>
                                        <span className="text-yellow-400">
                                            ]
                                        </span>
                                        <span className="text-white">,</span>
                                    </p>
                                    <p className="pl-4 reveal reveal-left reveal-d6">
                                        <span className="text-cyan-400">
                                            available
                                        </span>
                                        <span className="text-white">:</span>{" "}
                                        <span className="text-purple-400">
                                            true
                                        </span>
                                    </p>
                                    <p className="reveal reveal-left reveal-d7">
                                        <span className="text-yellow-400">
                                            {"}"};
                                        </span>
                                        <span className="typing-cursor" />
                                    </p>
                                </div>

                                {/* Floating elements */}
                                <FloatingElement
                                    className="absolute -right-4 top-1/4"
                                    delay={0}
                                >
                                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                                        <Code2 className="w-8 h-8 text-white" />
                                    </div>
                                </FloatingElement>
                                <FloatingElement
                                    className="absolute -left-4 bottom-1/4"
                                    delay={0.5}
                                >
                                    <div className="w-14 h-14 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/30">
                                        <Brain className="w-7 h-7 text-white" />
                                    </div>
                                </FloatingElement>
                                <FloatingElement
                                    className="absolute right-1/4 -bottom-4"
                                    delay={1}
                                >
                                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-green-500 rounded-xl flex items-center justify-center shadow-lg shadow-cyan-500/30">
                                        <Zap className="w-6 h-6 text-white" />
                                    </div>
                                </FloatingElement>
                            </div>
                        </div>

                        {/* Fun facts - Floating cards */}
                        <div className="mt-8 flex flex-wrap gap-3 justify-center">
                            {funFacts.map((fact, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, y: 25, scale: 0.5 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 15,
                                        delay: 0.1 + i * 0.1,
                                    }}
                                    className="px-4 py-2 bg-white/10 border border-white/10 rounded-full text-sm text-gray-400 flex items-center gap-2 cursor-default tag-bounce hover-shake"
                                >
                                    <span>{fact.emoji}</span>
                                    <span>{fact.text}</span>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Right - Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 60, scale: 0.5 }}
                        whileInView={{ opacity: 1, x: 0, scale: 1 }}
                        viewport={{ margin: "-100px" }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            ease: [0.16, 1, 0.3, 1],
                        }}
                        className="space-y-8"
                    >
                        <div>
                            <p className="text-blue-400 font-mono text-sm mb-3 reveal reveal-fade">
                                {"<about>"}
                            </p>
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 reveal reveal-up text-glow-animate">
                                Crafting Digital
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    Experiences
                                </span>
                            </h2>
                        </div>

                        <p className="text-lg text-gray-300 leading-relaxed reveal reveal-up reveal-d3">
                            {aboutMe.bio}
                        </p>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-2 gap-4 pt-8 stagger-children">
                            {stats.map((stat, si) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 25, scale: 0.5 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{}}
                                    transition={{
                                        type: "spring",
                                        stiffness: 300,
                                        damping: 20,
                                        delay: si * 0.1,
                                    }}
                                    className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-colors duration-300 group relative overflow-hidden shimmer-hover card-tilt cursor-default"
                                >
                                    {/* Glow effect on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-cyan-500/0 group-hover:from-blue-500/10 group-hover:via-purple-500/10 group-hover:to-cyan-500/10 transition-all duration-500" />

                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-2">
                                            <stat.icon className="w-5 h-5 text-purple-400 opacity-50 group-hover:opacity-100 transition-opacity" />
                                            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        </div>
                                        <p className="text-4xl font-black text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-500 group-hover:bg-clip-text transition-all">
                                            <AnimatedCounter
                                                value={stat.value}
                                                suffix={stat.suffix}
                                            />
                                        </p>
                                        <p className="text-sm text-gray-400 mt-2">
                                            {stat.label}
                                        </p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <p className="text-blue-400 font-mono text-sm reveal reveal-fade reveal-d8">
                            {"</about>"}
                        </p>
                    </motion.div>
                </div>
            </div>
        </section>
    )
})

// Projects Section - Enhanced for Featured Projects
const ProjectsSection = memo(() => {
    const upcomingProjects = [
        {
            title: "QuizMitra",
            tech: "LangChain + MERN",
            status: "In Development",
            icon: Brain,
        },
        {
            title: "Artha Nirikshana",
            tech: "Decreased latency and faster loading",
            status: "Coming Soon",
            icon: TrendingUp,
        },
        {
            title: "Samsmriti",
            tech: "PYQs with detailed solutions",
            status: "Planning",
            icon: BookOpen,
        },
    ]

    return (
        <section id="projects" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-blue-900/5 to-[#0a0a0f]" />
            <FloatingParticles count={6} />
            <GlowingOrb
                className="w-[500px] h-[500px] -top-64 right-0"
                color="blue"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 reveal reveal-hero reveal-slow">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-full mb-6 reveal reveal-zoom animate-float-badge">
                        <Code2 className="w-4 h-4 text-blue-400" />
                        <span className="text-sm text-blue-300">
                            Hands-On Learning
                        </span>
                    </div>
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<projects>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-glow-animate">
                        Featured <GradientText>Work</GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Projects I built while mastering the tech stack — each
                        one a learning journey that pushed my skills further.
                    </p>
                </div>

                {/* Featured Projects - Large Cards */}
                <div className="space-y-12 mb-20">
                    {projects.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 40, scale: 0.5 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ margin: "-80px" }}
                            transition={{
                                type: "spring",
                                stiffness: 200,
                                damping: 20,
                                delay: i * 0.15,
                            }}
                            style={{ perspective: 800 }}
                        >
                            <HoverGlowCard
                                className="w-full"
                                glowColor={
                                    i === 0
                                        ? "rgba(59, 130, 246, 0.15)"
                                        : "rgba(139, 92, 246, 0.15)"
                                }
                            >
                                <div
                                    className={`relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] overflow-hidden hover:border-white/20 transition-all duration-500 shimmer-hover ${i % 2 === 1 ? "lg:flex-row-reverse" : ""}`}
                                >
                                    <div className="grid lg:grid-cols-2 gap-0">
                                        {/* Image Side */}
                                        <div
                                            className={`relative h-72 lg:h-auto min-h-[400px] ${i % 2 === 1 ? "lg:order-2" : ""}`}
                                        >
                                            <img
                                                src={project.image}
                                                alt={project.title}
                                                className="absolute inset-0 w-full h-full object-cover"
                                            />
                                            <div
                                                className={`absolute inset-0 bg-gradient-to-${i % 2 === 0 ? "r" : "l"} from-transparent via-transparent to-[#0a0a0f]/80`}
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-transparent to-transparent lg:hidden" />

                                            {/* Project number badge */}
                                            <div className="absolute top-6 left-6">
                                                <div
                                                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${i === 0 ? "from-blue-500 to-cyan-500" : "from-purple-500 to-pink-500"} flex items-center justify-center shadow-xl`}
                                                >
                                                    <span className="text-2xl font-black text-white">
                                                        0{i + 1}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Category badge */}
                                            <div className="absolute top-6 right-6">
                                                <span
                                                    className={`px-4 py-2 rounded-full text-sm font-medium border ${project.category === "fullstack" ? "bg-blue-500/20 border-blue-500/30 text-blue-300" : "bg-purple-500/20 border-purple-500/30 text-purple-300"}`}
                                                >
                                                    {project.category ===
                                                    "fullstack"
                                                        ? "Full Stack"
                                                        : "Frontend"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Content Side */}
                                        <div
                                            className={`p-8 lg:p-12 flex flex-col justify-center ${i % 2 === 1 ? "lg:order-1" : ""}`}
                                        >
                                            {/* Title & Description */}
                                            <div className="mb-6">
                                                <h3 className="text-3xl lg:text-4xl font-black text-white mb-4 leading-tight">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-300 text-lg leading-relaxed">
                                                    {project.longDescription ||
                                                        project.description}
                                                </p>
                                            </div>

                                            {/* Key Features */}
                                            <div className="mb-8">
                                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                                                    <Sparkles className="w-4 h-4 text-yellow-400" />
                                                    Key Features
                                                </p>
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {project.highlights
                                                        ?.slice(0, 4)
                                                        .map(
                                                            (
                                                                highlight,
                                                                idx
                                                            ) => (
                                                                <div
                                                                    key={idx}
                                                                    className={`flex items-center gap-2 reveal reveal-left reveal-d${3 + idx}`}
                                                                >
                                                                    <div
                                                                        className={`w-1.5 h-1.5 rounded-full ${i === 0 ? "bg-blue-400" : "bg-purple-400"}`}
                                                                    />
                                                                    <span className="text-sm text-gray-400">
                                                                        {
                                                                            highlight
                                                                        }
                                                                    </span>
                                                                </div>
                                                            )
                                                        )}
                                                </div>
                                            </div>

                                            {/* Tech Stack */}
                                            <div className="mb-8">
                                                <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">
                                                    Tech Stack
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {project.technologies.map(
                                                        (tech) => (
                                                            <span
                                                                key={tech}
                                                                className={`px-3 py-1.5 rounded-lg text-sm font-medium border tag-bounce ${i === 0 ? "bg-blue-500/10 border-blue-500/20 text-blue-300" : "bg-purple-500/10 border-purple-500/20 text-purple-300"}`}
                                                            >
                                                                {tech}
                                                            </span>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Action Buttons */}
                                            <div className="flex flex-wrap gap-4">
                                                {project.githubUrl && (
                                                    <a
                                                        href={project.githubUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 hover-magnetic bg-gradient-to-r ${i === 0 ? "from-blue-500 to-cyan-500 hover:shadow-blue-500/30" : "from-purple-500 to-pink-500 hover:shadow-purple-500/30"} hover:shadow-xl`}
                                                    >
                                                        <Github className="w-5 h-5" />
                                                        View Code
                                                    </a>
                                                )}
                                                {project.liveUrl && (
                                                    <a
                                                        href={project.liveUrl}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="inline-flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-xl font-semibold transition-all duration-300 hover-magnetic"
                                                    >
                                                        <ExternalLink className="w-5 h-5" />
                                                        Live Demo
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Decorative gradient */}
                                    <div
                                        className={`absolute ${i % 2 === 0 ? "right-0" : "left-0"} top-0 bottom-0 w-1/3 bg-gradient-to-${i % 2 === 0 ? "l" : "r"} ${i === 0 ? "from-blue-500/5" : "from-purple-500/5"} to-transparent pointer-events-none hidden lg:block`}
                                    />
                                </div>
                            </HoverGlowCard>
                        </motion.div>
                    ))}
                </div>

                {/* What's Next / Coming Soon Section */}
                <div className="mt-20 reveal reveal-up">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-full mb-4 reveal reveal-scale animate-float-badge">
                            <Rocket className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-yellow-300">
                                In the Pipeline
                            </span>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-bold text-white">
                            What's{" "}
                            <span className="text-transparent bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text">
                                Coming Next
                            </span>
                        </h3>
                    </div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {upcomingProjects.map((project, i) => (
                            <motion.div
                                key={project.title}
                                initial={{ opacity: 0, y: 25, scale: 0.5 }}
                                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                viewport={{}}
                                transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                    delay: i * 0.15,
                                }}
                            >
                                <div className="relative group bg-white/5 border border-dashed border-white/20 rounded-2xl p-6 hover:border-yellow-500/30 transition-all duration-300 card-3d">
                                    {/* Status badge */}
                                    <div className="absolute -top-3 right-4">
                                        <span className="px-3 py-1 bg-yellow-500/20 border border-yellow-500/30 rounded-full text-xs font-medium text-yellow-300">
                                            {project.status}
                                        </span>
                                    </div>

                                    {/* Project icon */}
                                    <div className="w-12 h-12 mb-4 rounded-xl bg-gradient-to-br from-yellow-500/20 to-orange-500/20 border border-yellow-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <project.icon className="w-6 h-6 text-yellow-400" />
                                    </div>

                                    <h4 className="text-lg font-bold text-white mb-2">
                                        {project.title}
                                    </h4>
                                    <p className="text-sm text-gray-400 flex items-center gap-2">
                                        <Code2 className="w-4 h-4" />
                                        {project.tech}
                                    </p>

                                    {/* Shimmer effect */}
                                    <div className="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
                                        <div className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* GitHub CTA */}
                    <div className="text-center mt-12 reveal reveal-fade">
                        <a
                            href="https://github.com/suryanshparashar"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 rounded-2xl font-semibold transition-all duration-300 group hover-magnetic"
                        >
                            <Github className="w-5 h-5" />
                            <span>See More on GitHub</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

                <p className="text-blue-400 font-mono text-sm text-center mt-16 reveal reveal-fade">
                    {"</projects>"}
                </p>
            </div>
        </section>
    )
})

// Skills Section
const SkillsSection = memo(() => {
    const skillCategories = {
        frontend: skills.filter((s) => s.category === "frontend"),
        backend: skills.filter((s) => s.category === "backend"),
        database: skills.filter((s) => s.category === "database"),
        ai: skills.filter((s) => s.category === "ai"),
        tools: skills.filter((s) => s.category === "tools"),
    }

    const categoryLabels: Record<
        string,
        { label: string; icon: any; color: string; glowColor: string }
    > = {
        frontend: {
            label: "Frontend",
            icon: Layers,
            color: "from-blue-500 to-cyan-500",
            glowColor: "rgba(59, 130, 246, 0.2)",
        },
        backend: {
            label: "Backend",
            icon: Server,
            color: "from-purple-500 to-pink-500",
            glowColor: "rgba(168, 85, 247, 0.2)",
        },
        database: {
            label: "Database",
            icon: Database,
            color: "from-green-500 to-emerald-500",
            glowColor: "rgba(34, 197, 94, 0.2)",
        },
        ai: {
            label: "AI & ML",
            icon: Brain,
            color: "from-orange-500 to-red-500",
            glowColor: "rgba(249, 115, 22, 0.2)",
        },
        tools: {
            label: "Tools",
            icon: Cpu,
            color: "from-gray-500 to-gray-600",
            glowColor: "rgba(156, 163, 175, 0.2)",
        },
    }

    return (
        <section id="skills" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-purple-900/5 to-[#0a0a0f]" />

            {/* Ambient blobs */}
            <SectionParallax speed={0.12}>
                <div className="absolute top-1/4 -right-20 w-72 h-72 bg-purple-500/5 rounded-full blur-3xl blob" />
                <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-cyan-500/5 rounded-full blur-3xl blob blob-delay-2" />
            </SectionParallax>

            {/* Animated background decoration - CSS instead of Framer */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-glow-orb" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl animate-glow-orb"
                    style={{ animationDelay: "2s" }}
                />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 reveal reveal-hero reveal-slow">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-full mb-6 reveal reveal-zoom animate-float-badge">
                        <Cpu className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">
                            Technologies
                        </span>
                    </div>
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<skills>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-glow-animate">
                        Tech <GradientText>Arsenal</GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Technologies and tools I use to bring ideas to life.
                    </p>
                </div>

                {/* Skills Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {Object.entries(skillCategories).map(
                        ([key, categorySkills], idx) => {
                            const {
                                label,
                                icon: Icon,
                                color,
                                glowColor,
                            } = categoryLabels[key]
                            return (
                                <motion.div
                                    key={key}
                                    initial={{ opacity: 0, y: 25, scale: 0.5 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    viewport={{ margin: "-60px" }}
                                    transition={{
                                        type: "spring",
                                        stiffness: 250,
                                        damping: 20,
                                        delay: idx * 0.1,
                                    }}
                                    className="bg-white/5 border border-white/10 rounded-3xl p-6 hover:border-purple-500/30 transition-colors duration-500 group relative overflow-hidden glow-border shimmer-hover rainbow-border card-tilt"
                                    style={
                                        {
                                            "--glow-color": glowColor,
                                        } as React.CSSProperties
                                    }
                                >
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                        <div
                                            className={`absolute inset-0 bg-gradient-to-br ${color} opacity-5`}
                                        />
                                    </div>

                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div
                                                className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center hover-spin-icon transition-transform duration-500`}
                                            >
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <h3 className="text-lg font-bold text-white">
                                                {label}
                                            </h3>
                                            <div className="ml-auto w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                        </div>

                                        <div className="space-y-4">
                                            {categorySkills.map((skill, i) => (
                                                <div
                                                    key={skill.name}
                                                    className={`group/skill reveal reveal-left${i > 0 ? ` reveal-d${i}` : ""}`}
                                                >
                                                    <div className="flex justify-between mb-2">
                                                        <span className="text-sm text-gray-300 group-hover/skill:text-white transition-colors">
                                                            {skill.name}
                                                        </span>
                                                        <span className="text-sm text-gray-500 group-hover/skill:text-gray-300 transition-colors">
                                                            {skill.level}%
                                                        </span>
                                                    </div>
                                                    <div className="h-1.5 bg-white/10 rounded-full overflow-hidden relative">
                                                        <div
                                                            className={`h-full bg-gradient-to-r ${color} rounded-full relative skill-bar skill-bar-glow`}
                                                            style={
                                                                {
                                                                    "--skill-level": `${skill.level}%`,
                                                                    "--bar-glow":
                                                                        glowColor,
                                                                    transitionDelay: `${0.2 + i * 0.1}s`,
                                                                } as React.CSSProperties
                                                            }
                                                        >
                                                            {/* Shimmer effect - CSS */}
                                                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            )
                        }
                    )}
                </div>

                <p className="text-blue-400 font-mono text-sm text-center mt-16 reveal reveal-fade">
                    {"</skills>"}
                </p>
            </div>
        </section>
    )
})

// Contact Section
const ContactSection = memo(() => {
    const [contactForm, setContactForm] = useState<ContactForm>({
        name: "",
        email: "",
        subject: "",
        message: "",
    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log("Form submitted:", contactForm)
        alert("Thanks for reaching out! I'll get back to you soon.")
        setContactForm({ name: "", email: "", subject: "", message: "" })
    }

    return (
        <section id="contact" className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-blue-900/5 to-[#0a0a0f]" />

            {/* Ambient blobs */}
            <SectionParallax speed={0.08}>
                <div className="absolute top-1/2 -right-24 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl blob" />
                <div className="absolute bottom-1/4 -left-24 w-72 h-72 bg-blue-500/5 rounded-full blur-3xl blob blob-delay-1" />
            </SectionParallax>

            <div className="max-w-4xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 reveal reveal-up">
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<contact>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-glow-animate">
                        Let's <GradientText>Connect</GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Have a project in mind? Let's create something
                        extraordinary together.
                    </p>
                </div>

                {/* Contact Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 40, scale: 0.5 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ margin: "-80px" }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-12 space-y-6 relative overflow-hidden group glow-border"
                >
                    {/* Decorative background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Floating decorations - CSS */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-500/10 rounded-full blur-2xl animate-glow-orb" />
                    <div
                        className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl animate-glow-orb"
                        style={{ animationDelay: "2s" }}
                    />

                    <div className="relative z-10 grid md:grid-cols-2 gap-6">
                        <div className="group/input">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Name
                            </label>
                            <input
                                type="text"
                                required
                                value={contactForm.name}
                                onChange={(e) =>
                                    setContactForm({
                                        ...contactForm,
                                        name: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 input-focus-glow"
                                placeholder="Your name"
                            />
                        </div>
                        <div className="group/input">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                required
                                value={contactForm.email}
                                onChange={(e) =>
                                    setContactForm({
                                        ...contactForm,
                                        email: e.target.value,
                                    })
                                }
                                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 input-focus-glow"
                                placeholder="your@email.com"
                            />
                        </div>
                    </div>
                    <div className="relative z-10 group/input">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Subject
                        </label>
                        <input
                            type="text"
                            required
                            value={contactForm.subject}
                            onChange={(e) =>
                                setContactForm({
                                    ...contactForm,
                                    subject: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 input-focus-glow"
                            placeholder="What's this about?"
                        />
                    </div>
                    <div className="relative z-10 group/input">
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Message
                        </label>
                        <textarea
                            required
                            rows={5}
                            value={contactForm.message}
                            onChange={(e) =>
                                setContactForm({
                                    ...contactForm,
                                    message: e.target.value,
                                })
                            }
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500/50 focus:bg-white/10 transition-all duration-300 resize-none input-focus-glow"
                            placeholder="Tell me about your project..."
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-4 bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-500 flex items-center justify-center gap-3 relative overflow-hidden group/btn hover-magnetic animate-pulse-ring"
                    >
                        {/* Shimmer effect */}
                        <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-700" />
                        <Send className="w-5 h-5 relative z-10" />
                        <span className="relative z-10">Send Message</span>
                    </button>
                </motion.form>

                {/* Social Links */}
                <div className="flex justify-center gap-4 mt-12 reveal reveal-fade reveal-d4">
                    {[
                        {
                            icon: Github,
                            href: "https://github.com/suryanshparashar/",
                            label: "GitHub",
                            color: "hover:border-gray-400",
                        },
                        {
                            icon: Linkedin,
                            href: "https://www.linkedin.com/in/suryanshparashar-dev/",
                            label: "LinkedIn",
                            color: "hover:border-blue-400",
                        },
                        {
                            icon: Mail,
                            href: "mailto:sparashar2002@gmail.com",
                            label: "Email",
                            color: "hover:border-red-400",
                        },
                    ].map((social) => (
                        <a
                            key={social.label}
                            href={social.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={`w-14 h-14 bg-white/5 hover:bg-white/10 border border-white/10 ${social.color} rounded-2xl flex items-center justify-center transition-all duration-300 group/social social-pop hover-icon-float`}
                        >
                            <social.icon className="w-6 h-6 group-hover/social:scale-110 transition-transform" />
                        </a>
                    ))}
                </div>

                {/* Alternative contact info */}
                <div className="mt-8 text-center text-gray-500 text-sm reveal reveal-fade reveal-d6">
                    <p>Or reach out directly at</p>
                    <a
                        href="mailto:sparashar2002@gmail.com"
                        className="text-purple-400 hover:text-purple-300 transition-colors font-mono"
                    >
                        sparashar2002@gmail.com
                    </a>
                </div>

                <p className="text-blue-400 font-mono text-sm text-center mt-16 reveal reveal-fade">
                    {"</contact>"}
                </p>
            </div>
        </section>
    )
})

// Experience/Testimonials Section
const ExperienceSection = memo(() => {
    const experiences = [
        {
            type: "work",
            title: "Solo Founder, Full Stack Developer, AI Engineer",
            company: "Samsmriti",
            period: "2025 - Present",
            description:
                "Helping GATE aspirants crack the code with AI-powered personalized learning and practice",
            icon: Briefcase,
        },
        {
            type: "work",
            title: "Frontend Developer",
            company: "Prxis Tech Solutions",
            period: "2024 - 2025",
            description:
                "Building scalable web applications and optimizing user experience for clients across industries",
            icon: Briefcase,
        },
        // {
        //     type: "education",
        //     title: "B.Tech in Computer Science (AI & ML)",
        //     company: "VIT Bhopal University",
        //     period: "2022 - 2026",
        //     description: "Specialized in AI/ML and Full Stack Development",
        //     icon: GraduationCap,
        // },
    ]

    const testimonials = [
        {
            quote: "Suryansh Parashar has demonstrated strong overall performance and professionalism in his responsibilities. The quality of his work has been consistently very good, meeting expectations and maintaining high standards.\n\n He successfully completed assigned tasks ahead of the deadline, reflecting excellent time management, planning ability, and dedication to his work. His technical and professional skills are strong, enabling him to handle responsibilities effectively and contribute positively to team objectives.\n\n Additionally, he shows a commendable attitude toward continuous learning and self-improvement. His willingness to enhance his skills and adapt to new challenges highlights his growth mindset and long-term potential.\n\n Overall, his performance has been highly satisfactory, and he remains a valuable asset to the team.",
            author: "Aditya Patil",
            role: "Founder & Chairman, Prxis Tech Solutions",
            rating: 5,
        },
        // {
        //     quote: "One of the most talented developers I've worked with. Always goes above and beyond.",
        //     author: "Project Manager",
        //     role: "Senior PM, Agency",
        //     rating: 5,
        // },
    ]

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-cyan-900/5 to-[#0a0a0f]" />
            <FloatingParticles count={6} />
            <GlowingOrb className="w-96 h-96 -top-48 -right-48" color="cyan" />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 reveal reveal-hero reveal-slow">
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<experience>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
                        <AnimatedLetters text="Journey & " delay={0.1} />
                        <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                            <AnimatedLetters text="Impact" delay={0.4} />
                        </span>
                    </h2>
                </div>

                {/* Timeline */}
                <div className="grid lg:grid-cols-2 gap-16 mb-20">
                    {/* Experience Timeline */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                                <Briefcase className="w-5 h-5" />
                            </div>
                            Experience
                        </h3>
                        {experiences.map((exp, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: -40, scale: 0.5 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ margin: "-60px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 20,
                                    delay: i * 0.2,
                                }}
                                className="relative pl-8 border-l-2 border-white/10 hover:border-purple-500/50 transition-colors group"
                            >
                                <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-gradient-to-r from-blue-500 to-purple-500 group-hover:scale-125 transition-transform timeline-dot" />
                                <HoverGlowCard glowColor="rgba(139, 92, 246, 0.2)">
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-purple-500/30 transition-all card-3d shimmer-hover">
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="text-lg font-bold text-white">
                                                {exp.title}
                                            </h4>
                                            <span className="text-xs text-gray-400 bg-white/5 px-3 py-1 rounded-full">
                                                {exp.period}
                                            </span>
                                        </div>
                                        <p className="text-purple-400 text-sm mb-2">
                                            {exp.company}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {exp.description}
                                        </p>
                                    </div>
                                </HoverGlowCard>
                            </motion.div>
                        ))}
                    </div>

                    {/* Testimonials */}
                    <div className="space-y-8">
                        <h3 className="text-xl font-bold text-white mb-8 flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-cyan-500 to-green-500 rounded-xl flex items-center justify-center">
                                <Heart className="w-5 h-5" />
                            </div>
                            What People Say
                        </h3>
                        {testimonials.map((testimonial, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, x: 40, scale: 0.5 }}
                                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                                viewport={{ margin: "-60px" }}
                                transition={{
                                    type: "spring",
                                    stiffness: 250,
                                    damping: 20,
                                    delay: i * 0.2,
                                }}
                            >
                                <div>
                                    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-cyan-500/30 transition-all relative card-3d shimmer-hover">
                                        <div className="absolute -top-3 -left-3 text-6xl text-purple-500/20 font-serif">
                                            "
                                        </div>
                                        {/* Star rating */}
                                        <div className="flex gap-1 mb-3">
                                            {Array.from({
                                                length: testimonial.rating,
                                            }).map((_, idx) => (
                                                <Star
                                                    key={idx}
                                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                                />
                                            ))}
                                        </div>
                                        <p className="text-gray-300 mb-4 relative z-10 italic whitespace-pre-line">
                                            {testimonial.quote}
                                        </p>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full" />
                                            <div>
                                                <p className="text-white font-medium text-sm">
                                                    {testimonial.author}
                                                </p>
                                                <p className="text-gray-400 text-xs">
                                                    {testimonial.role}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>

                <p className="text-blue-400 font-mono text-sm text-center reveal reveal-fade">
                    {"</experience>"}
                </p>
            </div>
        </section>
    )
})

// Featured Venture Section - Samsmriti
const FeaturedVentureSection = memo(() => {
    const features = [
        {
            icon: Upload,
            title: "Upload Your Materials",
            description:
                "Notes, PDFs, textbooks - bring your own study content",
        },
        {
            icon: MessageCircle,
            title: "Chat Like a Senior",
            description: "Ask doubts anytime, get clear explanations instantly",
        },
        {
            icon: Lightbulb,
            title: "Personalized Learning",
            description: "Answers tailored to YOUR study materials",
        },
        {
            icon: Search,
            title: "PYQs Coming Soon",
            description: "Previous year questions with AI-powered explanations",
        },
    ]

    const techStack = [
        { name: "MongoDB", color: "from-green-500 to-emerald-500" },
        { name: "Express", color: "from-gray-500 to-gray-600" },
        { name: "React", color: "from-cyan-400 to-blue-500" },
        { name: "Node.js", color: "from-green-400 to-green-600" },
        { name: "LangChain", color: "from-purple-500 to-indigo-500" },
        { name: "LangGraph", color: "from-pink-500 to-rose-500" },
        { name: "LangSmith", color: "from-orange-400 to-amber-500" },
    ]

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-emerald-900/5 to-[#0a0a0f]" />
            <FloatingParticles count={8} />
            <GlowingOrb
                className="w-[600px] h-[600px] -top-32 -right-32"
                color="cyan"
            />

            {/* Animated grid background */}
            <div
                className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                    backgroundSize: "50px 50px",
                }}
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-16 reveal reveal-hero reveal-slow">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 border border-emerald-500/20 rounded-full mb-6 reveal reveal-zoom animate-float-badge">
                        <Rocket className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm text-emerald-300">
                            What I'm Building
                        </span>
                    </div>
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<venture>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-glow-animate">
                        Featured <GradientText>Venture</GradientText>
                    </h2>
                </div>

                {/* Main Card — macOS window pop-in */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ margin: "-80px" }}
                    transition={{
                        duration: 0.45,
                        ease: [0.32, 0.72, 0, 1],
                        scale: { duration: 0.5, ease: [0.32, 0.72, 0, 1] },
                    }}
                    className="relative macos-window-pop"
                    style={{ transformOrigin: "center center" }}
                >
                    {/* Shadow expands with card */}
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/20 via-cyan-500/20 to-purple-500/20 blur-3xl window-shadow-bloom" />

                    <div className="relative bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[2rem] overflow-hidden glow-border">
                        {/* Top bar — traffic lights */}
                        <div className="flex items-center gap-2 px-6 py-4 border-b border-white/10 bg-white/5">
                            <div className="flex gap-2">
                                <div className="w-3 h-3 rounded-full bg-red-500" />
                                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                <div className="w-3 h-3 rounded-full bg-green-500" />
                            </div>
                            <div className="flex-1 flex justify-center">
                                <div className="px-4 py-1 bg-white/5 rounded-full text-xs text-gray-400 flex items-center gap-2">
                                    <Globe className="w-3 h-3" />
                                    samsmriti.com
                                </div>
                            </div>
                        </div>

                        <div className="p-8 md:p-12 lg:p-16">
                            <div className="grid lg:grid-cols-2 gap-12 items-center">
                                {/* Left - Content */}
                                <div className="space-y-8">
                                    {/* Logo & Title */}
                                    <div className="space-y-4">
                                        <div className="inline-flex items-center gap-4 reveal reveal-left">
                                            {/* Logo placeholder */}
                                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 via-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-xl shadow-emerald-500/30 animate-morph">
                                                <Brain className="w-8 h-8 text-white" />
                                            </div>
                                            <div>
                                                <h3
                                                    className="text-3xl md:text-4xl font-black text-white"
                                                    style={{
                                                        fontFamily:
                                                            "'Orbitron', sans-serif",
                                                    }}
                                                >
                                                    SAMSMRITI
                                                </h3>
                                                <p className="text-emerald-400 text-sm font-medium">
                                                    Founded by Suryansh
                                                </p>
                                            </div>
                                        </div>

                                        <p className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent reveal reveal-fade reveal-d2">
                                            Your Second Brain for GATE
                                        </p>
                                    </div>

                                    {/* Description */}
                                    <p className="text-gray-300 text-lg leading-relaxed reveal reveal-fade reveal-d3">
                                        Upload your notes, PDFs, or textbooks.
                                        Ask doubts anytime like you're chatting
                                        with a friendly senior. Get instant,
                                        clear explanations tailored to your
                                        study materials.
                                        <span className="text-emerald-400 font-medium">
                                            {" "}
                                            Made by students, for GATE CSE/IT
                                            students.
                                        </span>
                                    </p>

                                    {/* Stats */}
                                    <div className="flex flex-wrap gap-6 reveal reveal-up reveal-d4">
                                        <div className="flex items-center gap-3 px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                                            <Users className="w-5 h-5 text-emerald-400" />
                                            <div>
                                                <p className="text-2xl font-black text-white">
                                                    <FancyCounter
                                                        value={50}
                                                        suffix="+"
                                                    />
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Students Helped
                                                </p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3 px-5 py-3 bg-cyan-500/10 border border-cyan-500/20 rounded-xl">
                                            <BookOpen className="w-5 h-5 text-cyan-400" />
                                            <div>
                                                <p className="text-2xl font-black text-white">
                                                    GATE 2026
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    Target Batch
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    {/* CTA Buttons */}
                                    <div className="flex flex-wrap gap-4 reveal reveal-up reveal-d5">
                                        <a
                                            href="https://samsmriti.com"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-500 via-cyan-500 to-purple-500 rounded-xl text-lg font-semibold hover:shadow-2xl hover:shadow-emerald-500/30 transition-all duration-500 hover:scale-105 active:scale-95"
                                        >
                                            <span>Visit Samsmriti</span>
                                            <ExternalLink className="w-5 h-5" />
                                        </a>
                                    </div>
                                </div>

                                {/* Right - Features & Tech */}
                                <div className="space-y-8">
                                    {/* Architecture Badge */}
                                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full reveal reveal-scale reveal-d2">
                                        <Network className="w-4 h-4 text-purple-400" />
                                        <span className="text-sm text-purple-300">
                                            Multi-Agent Architecture
                                        </span>
                                    </div>

                                    {/* Features Grid */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {features.map((feature, i) => (
                                            <motion.div
                                                key={feature.title}
                                                initial={{
                                                    opacity: 0,
                                                    y: 25,
                                                    scale: 0.5,
                                                }}
                                                whileInView={{
                                                    opacity: 1,
                                                    y: 0,
                                                    scale: 1,
                                                }}
                                                viewport={{}}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20,
                                                    delay: 0.3 + i * 0.1,
                                                }}
                                            >
                                                <HoverGlowCard glowColor="rgba(16, 185, 129, 0.2)">
                                                    <div className="p-4 bg-white/5 border border-white/10 rounded-xl hover:border-emerald-500/30 transition-all h-full card-3d shimmer-hover">
                                                        <feature.icon className="w-6 h-6 text-emerald-400 mb-3" />
                                                        <h4 className="text-sm font-semibold text-white mb-1">
                                                            {feature.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-400">
                                                            {
                                                                feature.description
                                                            }
                                                        </p>
                                                    </div>
                                                </HoverGlowCard>
                                            </motion.div>
                                        ))}
                                    </div>

                                    {/* Tech Stack */}
                                    <div className="space-y-3 reveal reveal-fade reveal-d6">
                                        <p className="text-xs text-gray-500 uppercase tracking-wider">
                                            Powered By
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {techStack.map((tech) => (
                                                <span
                                                    key={tech.name}
                                                    className={`px-3 py-1.5 bg-gradient-to-r ${tech.color} rounded-lg text-xs font-medium text-white shadow-lg reveal reveal-scale reveal-d7`}
                                                >
                                                    {tech.name}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Architecture note */}
                                    <div className="p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl reveal reveal-fade reveal-d8">
                                        <div className="flex items-start gap-3">
                                            <div className="w-8 h-8 bg-purple-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                                                <Cpu className="w-4 h-4 text-purple-400" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-white font-medium mb-1">
                                                    Advanced AI Architecture
                                                </p>
                                                <p className="text-xs text-gray-400">
                                                    LangChain powers individual
                                                    agents while LangGraph
                                                    orchestrates the entire
                                                    system. Full observability
                                                    with LangSmith tracing.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-full blur-3xl" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-purple-500/10 to-transparent rounded-full blur-3xl" />

                        {/* Reflection shine — sweeps across after open */}
                        <motion.div
                            initial={{ x: "-110%" }}
                            whileInView={{ x: "110%" }}
                            viewport={{}}
                            transition={{
                                duration: 0.9,
                                delay: 0.6,
                                ease: [0.25, 0.1, 0.25, 1],
                            }}
                            className="absolute inset-0 z-50 pointer-events-none"
                        >
                            <div className="w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.07] to-transparent skew-x-[-20deg]" />
                        </motion.div>
                    </div>
                </motion.div>

                <p className="text-blue-400 font-mono text-sm text-center mt-16 reveal reveal-fade">
                    {"</venture>"}
                </p>
            </div>
        </section>
    )
})

// Services/What I Do Section
const ServicesSection = memo(() => {
    const services = [
        {
            icon: Globe,
            title: "Web Development",
            description:
                "Building blazing-fast, responsive web applications with React, Next.js, and cutting-edge technologies.",
            features: ["React/Next.js", "Performance", "SEO Optimized"],
            color: "from-blue-500 to-cyan-500",
            delay: 0,
        },
        // {
        //     icon: Smartphone,
        //     title: "Mobile Apps",
        //     description:
        //         "Cross-platform mobile applications that deliver native experiences on iOS and Android.",
        //     features: ["React Native", "Flutter", "Cross-Platform"],
        //     color: "from-purple-500 to-pink-500",
        //     delay: 0.1,
        // },
        {
            icon: Brain,
            title: "AI Integration",
            description:
                "Integrating AI/ML capabilities into applications for intelligent automation and insights.",
            features: ["OpenAI", "LLMs", "Computer Vision"],
            color: "from-orange-500 to-red-500",
            delay: 0.2,
        },
        {
            icon: Server,
            title: "Backend Systems",
            description:
                "Scalable server architectures and APIs that power your applications reliably.",
            features: ["Node.js", "Python", "Microservices"],
            color: "from-green-500 to-emerald-500",
            delay: 0.3,
        },
        // {
        //     icon: Palette,
        //     title: "UI/UX Design",
        //     description:
        //         "Crafting beautiful, intuitive interfaces that users love to interact with.",
        //     features: ["Figma", "Prototyping", "Design Systems"],
        //     color: "from-pink-500 to-rose-500",
        //     delay: 0.4,
        // },
        // {
        //     icon: Shield,
        //     title: "DevOps & Cloud",
        //     description:
        //         "Deploying and maintaining applications with modern cloud infrastructure.",
        //     features: ["AWS", "Docker", "CI/CD"],
        //     color: "from-cyan-500 to-blue-500",
        //     delay: 0.5,
        // },
    ]

    return (
        <section className="py-32 px-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0f] via-indigo-900/5 to-[#0a0a0f]" />
            <FloatingParticles count={6} />
            <GlowingOrb
                className="w-[500px] h-[500px] -top-64 -left-64"
                color="purple"
            />

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header */}
                <div className="text-center mb-20 reveal reveal-hero reveal-slow">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/10 to-blue-500/10 border border-purple-500/20 rounded-full mb-6 reveal reveal-zoom animate-float-badge">
                        <Sparkles className="w-4 h-4 text-purple-400" />
                        <span className="text-sm text-purple-300">
                            What I Bring to the Table
                        </span>
                    </div>
                    <p className="text-blue-400 font-mono text-sm mb-3">
                        {"<services>"}
                    </p>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 text-glow-animate">
                        Services I <GradientText>Offer</GradientText>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        From concept to deployment, I provide end-to-end
                        solutions that drive results.
                    </p>
                </div>

                {/* Services Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service, si) => (
                        <motion.div
                            key={service.title}
                            initial={{ opacity: 0, y: 25, scale: 0.5 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{ margin: "-60px" }}
                            transition={{
                                type: "spring",
                                stiffness: 250,
                                damping: 20,
                                delay: si * 0.1,
                            }}
                        >
                            <HoverGlowCard
                                className="h-full"
                                glowColor={
                                    service.color.includes("blue")
                                        ? "rgba(59, 130, 246, 0.2)"
                                        : service.color.includes("purple")
                                          ? "rgba(139, 92, 246, 0.2)"
                                          : service.color.includes("green")
                                            ? "rgba(34, 197, 94, 0.2)"
                                            : "rgba(236, 72, 153, 0.2)"
                                }
                            >
                                <div className="h-full bg-white/5 border border-white/10 rounded-3xl p-8 hover:border-white/20 transition-all duration-500 group shimmer-hover card-tilt">
                                    {/* Icon */}
                                    <div
                                        className={`w-14 h-14 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg hover-spin-icon transition-all duration-500`}
                                    >
                                        <service.icon className="w-7 h-7 text-white" />
                                    </div>

                                    {/* Content */}
                                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all">
                                        {service.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                        {service.description}
                                    </p>

                                    {/* Features */}
                                    <div className="flex flex-wrap gap-2">
                                        {service.features.map((feature) => (
                                            <span
                                                key={feature}
                                                className={`px-3 py-1 bg-gradient-to-r ${service.color} bg-opacity-10 rounded-full text-xs font-medium text-white/80`}
                                            >
                                                {feature}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Hover arrow */}
                                    <div className="mt-6 flex items-center gap-2 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                                        <span className="text-sm">
                                            Learn more
                                        </span>
                                        <ArrowRight className="w-4 h-4" />
                                    </div>
                                </div>
                            </HoverGlowCard>
                        </motion.div>
                    ))}
                </div>

                {/* Stats bar */}
                <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 reveal reveal-up">
                    {[
                        {
                            value: 50,
                            suffix: "+",
                            label: "Projects Delivered",
                            icon: Rocket,
                        },
                        {
                            value: 100,
                            suffix: "%",
                            label: "Client Satisfaction",
                            icon: Heart,
                        },
                        {
                            value: 24,
                            suffix: "/7",
                            label: "Support Available",
                            icon: Shield,
                        },
                        {
                            value: 3,
                            suffix: "x",
                            label: "Faster Delivery",
                            icon: TrendingUp,
                        },
                    ].map((stat, i) => (
                        <motion.div
                            key={stat.label}
                            initial={{ opacity: 0, y: 25, scale: 0.5 }}
                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                            viewport={{}}
                            transition={{
                                type: "spring",
                                stiffness: 300,
                                damping: 20,
                                delay: i * 0.1,
                            }}
                            className="text-center p-6 bg-white/5 border border-white/10 rounded-2xl hover:border-purple-500/30 transition-colors group cursor-default"
                        >
                            <stat.icon className="w-6 h-6 mx-auto mb-3 text-purple-400 group-hover:scale-110 transition-transform" />
                            <p className="text-3xl font-black text-white mb-1">
                                <FancyCounter
                                    value={stat.value}
                                    suffix={stat.suffix}
                                />
                            </p>
                            <p className="text-xs text-gray-400">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <p className="text-blue-400 font-mono text-sm text-center mt-16 reveal reveal-fade">
                    {"</services>"}
                </p>
            </div>
        </section>
    )
})

// Main App Component
// Marquee Component - CSS animation instead of Framer Motion for smooth infinite scroll
const Marquee = ({
    children,
    speed = 30,
    direction = "left",
}: {
    children: React.ReactNode
    speed?: number
    direction?: "left" | "right"
}) => {
    return (
        <div className="relative overflow-hidden">
            <div
                className="flex gap-8 whitespace-nowrap animate-marquee"
                style={{
                    animationDuration: `${speed}s`,
                    animationDirection:
                        direction === "right" ? "reverse" : "normal",
                }}
            >
                {children}
                {children}
            </div>
        </div>
    )
}

// Enhanced Footer
const EnhancedFooter = () => {
    const technologies = [
        "React",
        "TypeScript",
        "Node.js",
        "Three.js",
        "Framer Motion",
        "TailwindCSS",
        "MongoDB",
        "PostgreSQL",
        "Python",
        "AI/ML",
        "Next.js",
        "GraphQL",
        "Docker",
        "AWS",
        "Figma",
    ]

    return (
        <footer className="relative py-20 overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/20 via-transparent to-transparent" />

            {/* Tech marquee */}
            <div className="mb-16 opacity-30">
                <Marquee speed={40}>
                    {technologies.map((tech, i) => (
                        <span
                            key={i}
                            className="text-6xl md:text-8xl font-black text-white/10 uppercase tracking-wider"
                        >
                            {tech}
                        </span>
                    ))}
                </Marquee>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="grid md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-6 reveal reveal-up">
                            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center">
                                <Terminal className="w-6 h-6 text-white" />
                            </div>
                            <div>
                                <h3
                                    className="text-xl font-bold"
                                    style={{
                                        fontFamily: "'Orbitron', sans-serif",
                                    }}
                                >
                                    SURYANSH
                                </h3>
                                <p className="text-xs text-gray-400">
                                    Full Stack Engineer
                                </p>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6">
                            Crafting digital experiences that push the
                            boundaries of what's possible on the web.
                        </p>
                        <div className="flex gap-3">
                            {[
                                {
                                    icon: Github,
                                    href: "https://github.com/suryanshparashar/",
                                },
                                {
                                    icon: Linkedin,
                                    href: "https://www.linkedin.com/in/suryanshparashar-dev/",
                                },
                                {
                                    icon: Mail,
                                    href: "mailto:sparashar2002@gmail.com",
                                },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-10 h-10 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-purple-500/50 rounded-xl flex items-center justify-center transition-all duration-300 hover-magnetic"
                                >
                                    <social.icon className="w-5 h-5" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">
                            Quick Links
                        </h4>
                        <ul className="space-y-3">
                            {[
                                "Home",
                                "About",
                                "Projects",
                                "Skills",
                                "Contact",
                            ].map((link) => (
                                <li key={link}>
                                    <a
                                        href={`#${link.toLowerCase()}`}
                                        className="text-gray-400 hover:text-white transition-colors inline-flex items-center gap-2 group hover-underline"
                                    >
                                        <span className="w-0 group-hover:w-4 h-[1px] bg-purple-500 transition-all" />
                                        {link}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Status */}
                    <div>
                        <h4 className="text-white font-semibold mb-6">
                            Current Status
                        </h4>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 reveal reveal-left">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                                <span className="text-gray-400">
                                    Available for work
                                </span>
                            </div>
                            <div className="flex items-center gap-3 reveal reveal-left reveal-d1">
                                <Coffee className="w-4 h-4 text-amber-500" />
                                <span className="text-gray-400">
                                    Fueled by coffee
                                </span>
                            </div>
                            <div className="flex items-center gap-3 reveal reveal-left reveal-d2">
                                <div className="animate-pulse">
                                    <Heart className="w-4 h-4 text-red-400 fill-red-400" />
                                </div>
                                <span className="text-gray-400">
                                    Made with passion
                                </span>
                            </div>
                            <div className="flex items-center gap-3 reveal reveal-left reveal-d3">
                                <Rocket className="w-4 h-4 text-purple-400" />
                                <span className="text-gray-400">
                                    Building Samsmriti
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Fun Easter Egg */}
                <div className="mt-12 mb-8 text-center reveal reveal-fade">
                    <p className="text-gray-600 text-xs font-mono cursor-default hover:text-purple-400 hover:scale-105 transition-all">
                        {
                            "/* Thanks for scrolling this far! You're awesome 🚀 */"
                        }
                    </p>
                </div>

                {/* Bottom bar */}
                <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-sm reveal reveal-fade">
                        © {new Date().getFullYear()} Suryansh Parashar. All
                        rights reserved.
                    </p>
                    <p className="text-gray-500 text-sm flex items-center gap-2 reveal reveal-fade">
                        Built with
                        <span className="animate-pulse">❤️</span>
                        using React, Three.js & Framer Motion
                    </p>
                </div>
            </div>

            {/* Decorative gradient */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent" />
        </footer>
    )
}

function App() {
    const [activeSection, setActiveSection] = useState("home")
    const [isLoading, setIsLoading] = useState(true)
    useSmoothScroll()
    useScrollReveal()

    const sectionDetect = useCallback(() => {
        const sections = ["home", "about", "projects", "skills", "contact"]
        const scrollPosition = window.scrollY + window.innerHeight / 3

        for (const section of sections) {
            const element = document.getElementById(section)
            if (element) {
                const { offsetTop, offsetHeight } = element
                if (
                    scrollPosition >= offsetTop &&
                    scrollPosition < offsetTop + offsetHeight
                ) {
                    setActiveSection(section)
                    break
                }
            }
        }
    }, [])

    useGlobalScroll(sectionDetect)

    // Initial detection on mount
    useEffect(() => {
        sectionDetect()
    }, [sectionDetect])

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id)
        element?.scrollIntoView({ behavior: "smooth" })
    }

    return (
        <>
            {/* Loading Screen */}
            <AnimatePresence>
                {isLoading && (
                    <LoadingScreen
                        onLoadingComplete={() => setIsLoading(false)}
                    />
                )}
            </AnimatePresence>

            <div
                className={`min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden ${isLoading ? "opacity-0" : "opacity-100"} transition-opacity duration-500`}
            >
                {/* Custom Cursor */}
                <AdvancedCursor />

                {/* Mouse Spotlight */}
                <MouseSpotlight />

                {/* Scroll Progress Bar */}
                <ScrollProgress />

                {/* Navigation */}
                <Navigation
                    activeSection={activeSection}
                    scrollToSection={scrollToSection}
                />

                {/* Sections */}
                <HeroSection scrollToSection={scrollToSection} />
                <SectionDivider />
                <AboutSection />
                <SectionDivider />
                <FeaturedVentureSection />
                <SectionDivider />
                <ServicesSection />
                <SectionDivider />
                <ProjectsSection />
                <SectionDivider />
                <SkillsSection />
                <SectionDivider />
                <ExperienceSection />
                <SectionDivider />
                <ContactSection />
                <EnhancedFooter />

                {/* Back to Top Button */}
                <BackToTop />
            </div>
        </>
    )
}

export default App
