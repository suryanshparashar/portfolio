import { motion, AnimatePresence } from "framer-motion"
import { useEffect, useState } from "react"

export const LoadingScreen = ({
    onLoadingComplete,
}: {
    onLoadingComplete: () => void
}) => {
    const [progress, setProgress] = useState(0)
    const [isComplete, setIsComplete] = useState(false)

    useEffect(() => {
        const timer = setInterval(() => {
            setProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(timer)
                    setTimeout(() => {
                        setIsComplete(true)
                        setTimeout(onLoadingComplete, 800)
                    }, 500)
                    return 100
                }
                return prev + Math.random() * 15
            })
        }, 100)

        return () => clearInterval(timer)
    }, [onLoadingComplete])

    return (
        <AnimatePresence>
            {!isComplete && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1 }}
                    transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                    className="fixed inset-0 z-[100] bg-[#0a0a0f] flex flex-col items-center justify-center"
                >
                    {/* Animated background */}
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]">
                            <motion.div
                                className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-cyan-500/20 blur-3xl"
                                animate={{
                                    scale: [1, 1.2, 1],
                                    rotate: [0, 180, 360],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                        </div>
                    </div>

                    {/* Logo animation */}
                    <motion.div
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                        className="relative mb-12"
                    >
                        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-2xl flex items-center justify-center relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent"
                                animate={{ rotate: 360 }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "linear",
                                }}
                            />
                            <span
                                className="text-4xl font-black text-white relative z-10"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}
                            >
                                SP
                            </span>
                        </div>

                        {/* Orbiting dots */}
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 bg-blue-400 rounded-full"
                                style={{
                                    top: "50%",
                                    left: "50%",
                                }}
                                animate={{
                                    rotate: 360,
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: i * 0.3,
                                }}
                            >
                                <motion.div
                                    className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                                    style={{
                                        transform: `translateX(${50 + i * 10}px)`,
                                    }}
                                />
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Loading text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="text-center mb-8"
                    >
                        <h1
                            className="text-2xl font-bold text-white mb-2"
                            style={{ fontFamily: "'Orbitron', sans-serif" }}
                        >
                            SURYANSH PARASHAR
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Loading experience...
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <div className="w-64 h-1 bg-white/10 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${Math.min(progress, 100)}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>

                    {/* Percentage */}
                    <motion.p
                        className="text-white/50 text-sm mt-4 font-mono"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        {Math.min(Math.floor(progress), 100)}%
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default LoadingScreen
