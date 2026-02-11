import { useRef, useEffect, useState } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"

interface MagneticButtonProps {
    children: React.ReactNode
    className?: string
    onClick?: () => void
    strength?: number
}

export const MagneticButton = ({
    children,
    className = "",
    onClick,
    strength = 0.3,
}: MagneticButtonProps) => {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const springConfig = { damping: 15, stiffness: 150 }
    const xSpring = useSpring(x, springConfig)
    const ySpring = useSpring(y, springConfig)

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const centerX = rect.left + rect.width / 2
        const centerY = rect.top + rect.height / 2
        x.set((e.clientX - centerX) * strength)
        y.set((e.clientY - centerY) * strength)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            style={{ x: xSpring, y: ySpring }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Glitch text effect
export const GlitchText = ({
    text,
    className = "",
}: {
    text: string
    className?: string
}) => {
    const [isHovered, setIsHovered] = useState(false)

    return (
        <div
            className={`relative ${className}`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <span className="relative z-10">{text}</span>
            {isHovered && (
                <>
                    <span className="absolute top-0 left-0 z-0 text-cyan-400 animate-glitch-1 clip-glitch">
                        {text}
                    </span>
                    <span className="absolute top-0 left-0 z-0 text-pink-500 animate-glitch-2 clip-glitch">
                        {text}
                    </span>
                </>
            )}
        </div>
    )
}

// Morphing text animation
export const MorphingText = ({
    words,
    className = "",
}: {
    words: string[]
    className?: string
}) => {
    const [index, setIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length)
        }, 3000)
        return () => clearInterval(interval)
    }, [words.length])

    return (
        <motion.span
            key={index}
            initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.5 }}
            className={className}
        >
            {words[index]}
        </motion.span>
    )
}

// Cursor follower
export const CursorFollower = () => {
    const cursorX = useMotionValue(-100)
    const cursorY = useMotionValue(-100)

    const springConfig = { damping: 25, stiffness: 200 }
    const cursorXSpring = useSpring(cursorX, springConfig)
    const cursorYSpring = useSpring(cursorY, springConfig)

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 16)
            cursorY.set(e.clientY - 16)
        }

        window.addEventListener("mousemove", moveCursor)
        return () => window.removeEventListener("mousemove", moveCursor)
    }, [cursorX, cursorY])

    return (
        <motion.div
            className="fixed top-0 left-0 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-[9999] mix-blend-difference"
            style={{
                x: cursorXSpring,
                y: cursorYSpring,
            }}
        />
    )
}

// Reveal text animation
export const RevealText = ({
    children,
    className = "",
    delay = 0,
}: {
    children: string
    className?: string
    delay?: number
}) => {
    const words = children.split(" ")

    return (
        <span className={className}>
            {words.map((word, i) => (
                <span key={i} className="inline-block overflow-hidden">
                    <motion.span
                        className="inline-block"
                        initial={{ y: "100%" }}
                        whileInView={{ y: 0 }}
                        viewport={{ once: true }}
                        transition={{
                            duration: 0.5,
                            delay: delay + i * 0.05,
                            ease: [0.33, 1, 0.68, 1],
                        }}
                    >
                        {word}&nbsp;
                    </motion.span>
                </span>
            ))}
        </span>
    )
}

// 3D Card with tilt effect
export const TiltCard = ({
    children,
    className = "",
}: {
    children: React.ReactNode
    className?: string
}) => {
    const ref = useRef<HTMLDivElement>(null)
    const x = useMotionValue(0)
    const y = useMotionValue(0)

    const xSpring = useSpring(x, { damping: 20, stiffness: 300 })
    const ySpring = useSpring(y, { damping: 20, stiffness: 300 })

    const rotateX = useTransform(ySpring, [-0.5, 0.5], ["15deg", "-15deg"])
    const rotateY = useTransform(xSpring, [-0.5, 0.5], ["-15deg", "15deg"])

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!ref.current) return
        const rect = ref.current.getBoundingClientRect()
        const width = rect.width
        const height = rect.height
        const mouseX = e.clientX - rect.left
        const mouseY = e.clientY - rect.top
        const xPct = mouseX / width - 0.5
        const yPct = mouseY / height - 0.5
        x.set(xPct)
        y.set(yPct)
    }

    const handleMouseLeave = () => {
        x.set(0)
        y.set(0)
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                rotateX,
                rotateY,
                transformStyle: "preserve-3d",
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}

// Floating element - CSS animation instead of Framer infinite
export const FloatingElement = ({
    children,
    className = "",
    delay = 0,
}: {
    children: React.ReactNode
    className?: string
    delay?: number
}) => {
    return (
        <div
            className={`animate-float-slow ${className}`}
            style={{ animationDelay: `${delay}s` }}
        >
            {children}
        </div>
    )
}

// Typing effect
export const TypeWriter = ({
    text,
    className = "",
    speed = 50,
}: {
    text: string
    className?: string
    speed?: number
}) => {
    const [displayText, setDisplayText] = useState("")
    const [index, setIndex] = useState(0)

    useEffect(() => {
        if (index < text.length) {
            const timeout = setTimeout(() => {
                setDisplayText((prev) => prev + text[index])
                setIndex((prev) => prev + 1)
            }, speed)
            return () => clearTimeout(timeout)
        }
    }, [index, text, speed])

    return (
        <span className={className}>
            {displayText}
            <span className="inline-block w-[3px] h-[1em] bg-current ml-1 align-middle animate-pulse" />
        </span>
    )
}

// Scramble text on hover
export const ScrambleText = ({
    text,
    className = "",
}: {
    text: string
    className?: string
}) => {
    const [displayText, setDisplayText] = useState(text)
    const [isHovered, setIsHovered] = useState(false)
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"

    useEffect(() => {
        if (!isHovered) {
            setDisplayText(text)
            return
        }

        let iteration = 0
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((char, idx) => {
                        if (idx < iteration || char === " ") return text[idx]
                        return chars[Math.floor(Math.random() * chars.length)]
                    })
                    .join("")
            )

            if (iteration >= text.length) {
                clearInterval(interval)
            }

            iteration += 1 / 3
        }, 30)

        return () => clearInterval(interval)
    }, [isHovered, text])

    return (
        <span
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {displayText}
        </span>
    )
}
