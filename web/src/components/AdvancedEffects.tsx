import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

// Advanced cursor - optimized: removed trail, single spring pair for dot + ring
export const AdvancedCursor = () => {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)
    const [isHovering, setIsHovering] = useState(false)

    const cursorXSpring = useSpring(cursorX, { damping: 25, stiffness: 200 })
    const cursorYSpring = useSpring(cursorY, { damping: 25, stiffness: 200 })

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX)
            cursorY.set(e.clientY)
        }

        const handleMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            if (target.closest("a, button, [data-cursor]")) {
                setIsHovering(true)
            }
        }

        const handleMouseOut = () => {
            setIsHovering(false)
        }

        window.addEventListener("mousemove", moveCursor, { passive: true })
        document.addEventListener("mouseover", handleMouseOver)
        document.addEventListener("mouseout", handleMouseOut)

        return () => {
            window.removeEventListener("mousemove", moveCursor)
            document.removeEventListener("mouseover", handleMouseOver)
            document.removeEventListener("mouseout", handleMouseOut)
        }
    }, [cursorX, cursorY])

    return (
        <div className="hidden md:block">
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9999]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    willChange: "transform",
                }}
            >
                <div
                    className="rounded-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-150"
                    style={{
                        width: isHovering ? 12 : 20,
                        height: isHovering ? 12 : 20,
                    }}
                />
            </motion.div>

            {/* Hover ring - shares same spring */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[9997]"
                style={{
                    x: cursorXSpring,
                    y: cursorYSpring,
                    translateX: "-50%",
                    translateY: "-50%",
                    willChange: "transform",
                }}
            >
                <div
                    className="rounded-full border-2 transition-all duration-150"
                    style={{
                        width: isHovering ? 60 : 50,
                        height: isHovering ? 60 : 50,
                        opacity: isHovering ? 1 : 0.4,
                        borderColor: isHovering
                            ? "rgb(168, 85, 247)"
                            : "rgba(255, 255, 255, 0.4)",
                    }}
                />
            </motion.div>
        </div>
    )
}

// Mouse spotlight effect - uses CSS custom properties instead of useTransform
export const MouseSpotlight = () => {
    const spotlightRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (spotlightRef.current) {
                spotlightRef.current.style.setProperty("--mx", `${e.clientX}px`)
                spotlightRef.current.style.setProperty("--my", `${e.clientY}px`)
            }
        }
        window.addEventListener("mousemove", handleMouseMove, { passive: true })
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    return (
        <div
            ref={spotlightRef}
            className="fixed inset-0 pointer-events-none z-[5] opacity-50"
            style={{
                background:
                    "radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), rgba(59, 130, 246, 0.1), transparent 40%)",
            }}
        />
    )
}

// Letter-by-letter text animation
export const AnimatedLetters = ({
    text,
    className = "",
    delay = 0,
    staggerDelay = 0.03,
}: {
    text: string
    className?: string
    delay?: number
    staggerDelay?: number
}) => {
    return (
        <span className={className}>
            {text.split("").map((char, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 50, rotateX: -90 }}
                    animate={{ opacity: 1, y: 0, rotateX: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * staggerDelay,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                    className="inline-block"
                    style={{ transformOrigin: "bottom" }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}
        </span>
    )
}

// Parallax container
export const ParallaxContainer = ({
    children,
    speed = 0.5,
}: {
    children: React.ReactNode
    speed?: number
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const [offsetY, setOffsetY] = useState(0)

    useEffect(() => {
        const handleScroll = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect()
                const scrollY = window.scrollY
                const elementTop = rect.top + scrollY
                setOffsetY((scrollY - elementTop) * speed)
            }
        }
        window.addEventListener("scroll", handleScroll, { passive: true })
        return () => window.removeEventListener("scroll", handleScroll)
    }, [speed])

    return (
        <div ref={ref} style={{ transform: `translateY(${offsetY}px)` }}>
            {children}
        </div>
    )
}

// Hover card with glow - uses CSS custom properties instead of setState on every mousemove
export const HoverGlowCard = ({
    children,
    className = "",
    glowColor = "rgba(139, 92, 246, 0.3)",
}: {
    children: React.ReactNode
    className?: string
    glowColor?: string
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const glowRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)

    const handleMouseMove = useCallback(
        (e: React.MouseEvent) => {
            if (!ref.current || !glowRef.current) return
            const rect = ref.current.getBoundingClientRect()
            const x = e.clientX - rect.left
            const y = e.clientY - rect.top
            glowRef.current.style.background = `radial-gradient(400px circle at ${x}px ${y}px, ${glowColor}, transparent 40%)`
        },
        [glowColor]
    )

    return (
        <motion.div
            ref={ref}
            className={`relative overflow-hidden ${className}`}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            {/* Glow effect */}
            <div
                ref={glowRef}
                className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                style={{
                    opacity: isHovered ? 1 : 0,
                }}
            />
            {children}
        </motion.div>
    )
}

// Infinite rotating text
export const RotatingText = ({
    texts,
    className = "",
}: {
    texts: string[]
    className?: string
}) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % texts.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [texts.length])

    return (
        <div className={`relative h-[1.2em] overflow-hidden ${className}`}>
            {texts.map((text, i) => (
                <motion.div
                    key={text}
                    className="absolute inset-0"
                    initial={{ y: "100%", opacity: 0 }}
                    animate={{
                        y: i === index ? "0%" : "-100%",
                        opacity: i === index ? 1 : 0,
                    }}
                    transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                    {text}
                </motion.div>
            ))}
        </div>
    )
}

// Staggered grid reveal
export const StaggeredGrid = ({
    children,
    className = "",
    staggerDelay = 0.1,
}: {
    children: React.ReactNode[]
    className?: string
    staggerDelay?: number
}) => {
    return (
        <div className={className}>
            {children.map((child, i) => (
                <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 50, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{
                        duration: 0.6,
                        delay: i * staggerDelay,
                        ease: [0.33, 1, 0.68, 1],
                    }}
                >
                    {child}
                </motion.div>
            ))}
        </div>
    )
}

// Number counter with fancy effect
export const FancyCounter = ({
    value,
    suffix = "",
    prefix = "",
    duration = 2,
}: {
    value: number
    suffix?: string
    prefix?: string
    duration?: number
}) => {
    const [count, setCount] = useState(0)
    const ref = useRef<HTMLSpanElement>(null)
    const [hasAnimated, setHasAnimated] = useState(false)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated) {
                    setHasAnimated(true)
                    const startTime = Date.now()
                    const animate = () => {
                        const elapsed = Date.now() - startTime
                        const progress = Math.min(
                            elapsed / (duration * 1000),
                            1
                        )
                        const eased = 1 - Math.pow(1 - progress, 4)
                        setCount(Math.floor(eased * value))
                        if (progress < 1) requestAnimationFrame(animate)
                    }
                    animate()
                }
            },
            { threshold: 0.5 }
        )

        if (ref.current) observer.observe(ref.current)
        return () => observer.disconnect()
    }, [value, duration, hasAnimated])

    return (
        <span ref={ref} className="tabular-nums">
            {prefix}
            {count}
            {suffix}
        </span>
    )
}

// Magnetic link effect
export const MagneticLink = ({
    children,
    href,
    className = "",
}: {
    children: React.ReactNode
    href: string
    className?: string
}) => {
    const ref = useRef<HTMLAnchorElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * 0.3)
        y.set((e.clientY - centerY) * 0.3)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    const xSpring = useSpring(x, { stiffness: 150, damping: 15 })
    const ySpring = useSpring(y, { stiffness: 150, damping: 15 })

    return (
        <motion.a
            ref={ref}
            href={href}
            className={className}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            {children}
        </motion.a>
    )
}

// Text scramble effect
export const TextScramble = ({
    text,
    className = "",
    scrambleOnHover = true,
}: {
    text: string
    className?: string
    scrambleOnHover?: boolean
}) => {
    const [displayText, setDisplayText] = useState(text)
    const [isScrambling, setIsScrambling] = useState(false)
    const chars = "!<>-_\\/[]{}—=+*^?#________"

    const scramble = () => {
        if (isScrambling) return
        setIsScrambling(true)

        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, idx) => {
                        if (idx < iteration) return text[idx]
                        if (char === " ") return " "
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(interval)
                setIsScrambling(false)
            }

            iteration += 1 / 3
        }, 30)
    }

    return (
        <span
            className={`font-mono ${className}`}
            onMouseEnter={scrambleOnHover ? scramble : undefined}
        >
            {displayText}
        </span>
    )
}

export default AdvancedCursor
