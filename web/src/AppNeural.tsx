import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { NeuralNetworkCanvas, ContentPanel, PortfolioNode } from './components/NeuralNetwork'
import { Code2, Brain, Layers, MousePointer, RotateCcw } from 'lucide-react'

function App() {
    const [selectedNode, setSelectedNode] = useState<PortfolioNode | null>(null)
    const [showInstructions, setShowInstructions] = useState(true)

    const handleNodeSelect = useCallback((node: PortfolioNode | null) => {
        setSelectedNode(node)
        if (node) setShowInstructions(false)
    }, [])

    const handleClosePanel = useCallback(() => {
        setSelectedNode(null)
    }, [])

    return (
        <div className="w-screen h-screen bg-[#030308] overflow-hidden relative">
            {/* 3D Neural Network Canvas */}
            <div className="absolute inset-0">
                <NeuralNetworkCanvas onNodeSelect={handleNodeSelect} />
            </div>

            {/* Top Navigation Bar */}
            <motion.header
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="fixed top-0 left-0 right-0 z-40 px-6 py-4"
            >
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        className="flex items-center gap-3 cursor-pointer group"
                    >
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-blue-500/30">
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <Code2 className="w-6 h-6 text-white relative z-10" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-white" style={{ fontFamily: "'Orbitron', sans-serif" }}>
                                Suryansh
                            </h1>
                            <p className="text-xs text-gray-400">Neural Portfolio</p>
                        </div>
                    </motion.div>

                    {/* Legend */}
                    <div className="hidden md:flex items-center gap-6 bg-black/40 backdrop-blur-xl px-6 py-3 rounded-full border border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-blue-500" />
                            <span className="text-xs text-gray-400">Input Layer</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-orange-500" />
                            <span className="text-xs text-gray-400">Hidden Layers</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <span className="text-xs text-gray-400">Output Layer</span>
                        </div>
                    </div>

                    {/* Brain icon */}
                    <div className="flex items-center gap-2 text-gray-400">
                        <Brain className="w-5 h-5 text-purple-400" />
                        <span className="text-sm hidden md:inline">AI-Inspired Portfolio</span>
                    </div>
                </div>
            </motion.header>

            {/* Instructions Overlay */}
            <AnimatePresence>
                {showInstructions && !selectedNode && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40"
                    >
                        <div className="bg-black/60 backdrop-blur-xl border border-white/20 rounded-2xl px-8 py-5 shadow-2xl">
                            <div className="flex items-center gap-6">
                                <div className="flex items-center gap-3 text-gray-300">
                                    <MousePointer className="w-5 h-5 text-blue-400" />
                                    <span className="text-sm">Click nodes to explore</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-3 text-gray-300">
                                    <RotateCcw className="w-5 h-5 text-purple-400" />
                                    <span className="text-sm">Drag to rotate</span>
                                </div>
                                <div className="w-px h-6 bg-white/20" />
                                <div className="flex items-center gap-3 text-gray-300">
                                    <Layers className="w-5 h-5 text-cyan-400" />
                                    <span className="text-sm">Scroll to zoom</span>
                                </div>
                            </div>
                            <button
                                onClick={() => setShowInstructions(false)}
                                className="mt-3 text-xs text-gray-500 hover:text-white transition-colors w-full text-center"
                            >
                                Click anywhere to dismiss
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Hero Text Overlay (when no node selected) */}
            <AnimatePresence>
                {!selectedNode && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed left-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none"
                    >
                        <motion.div
                            initial={{ x: -50 }}
                            animate={{ x: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <p className="text-sm text-blue-400 mb-2 font-medium tracking-widest uppercase">
                                Welcome to my
                            </p>
                            <h1 
                                className="text-5xl md:text-7xl font-black leading-tight"
                                style={{ fontFamily: "'Orbitron', sans-serif" }}
                            >
                                <span className="text-white">Neural</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
                                    Portfolio
                                </span>
                            </h1>
                            <p className="text-gray-400 mt-4 max-w-sm text-lg">
                                Explore my skills, projects, and experience through an interactive neural network visualization.
                            </p>
                            
                            {/* Data flow visualization */}
                            <div className="mt-8 flex items-center gap-4">
                                <motion.div
                                    animate={{
                                        boxShadow: [
                                            '0 0 20px rgba(59, 130, 246, 0.3)',
                                            '0 0 40px rgba(139, 92, 246, 0.5)',
                                            '0 0 20px rgba(59, 130, 246, 0.3)'
                                        ]
                                    }}
                                    transition={{ duration: 2, repeat: Infinity }}
                                    className="w-3 h-3 rounded-full bg-blue-500"
                                />
                                <div className="h-px w-20 bg-gradient-to-r from-blue-500 to-transparent" />
                                <span className="text-xs text-gray-500">Data flowing through network</span>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Content Panel (appears when node is selected) */}
            <ContentPanel node={selectedNode} onClose={handleClosePanel} />

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="fixed bottom-4 left-4 z-30 text-xs text-gray-600"
            >
                © {new Date().getFullYear()} Suryansh Parashar • Built with React Three Fiber
            </motion.footer>

            {/* Gradient overlays for depth */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-[#030308] to-transparent" />
                <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#030308] to-transparent" />
                <div className="absolute left-0 top-0 w-64 h-full bg-gradient-to-r from-[#030308] to-transparent" />
            </div>
        </div>
    )
}

export default App
