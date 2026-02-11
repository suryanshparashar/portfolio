import { motion } from "framer-motion"
import { Code2, Github, Linkedin, Mail, Menu, X } from "lucide-react"

interface NavigationProps {
    activeSection: string
    isMenuOpen: boolean
    setIsMenuOpen: (open: boolean) => void
    scrollToSection: (id: string) => void
}

const navItems = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "education", label: "Education" },
    { id: "projects", label: "Projects" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
]

export const Navigation = ({
    activeSection,
    isMenuOpen,
    setIsMenuOpen,
    scrollToSection,
}: NavigationProps) => {
    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-lg border-b border-white/10"
        >
            <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center space-x-3 cursor-pointer"
                    onClick={() => scrollToSection("home")}
                >
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <Code2 className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xl font-bold">Suryansh</span>
                </motion.div>

                {/* Desktop Navigation */}
                <div className="hidden md:flex space-x-8">
                    {navItems.map((item) => (
                        <motion.button
                            key={item.id}
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection(item.id)}
                            className={`text-sm font-medium transition-colors ${
                                activeSection === item.id
                                    ? "text-blue-400"
                                    : "text-gray-300 hover:text-white"
                            }`}
                        >
                            {item.label}
                        </motion.button>
                    ))}
                </div>

                {/* Social Links */}
                <div className="hidden md:flex space-x-4">
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="https://github.com/suryanshparashar/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Github className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: -5 }}
                        href="https://www.linkedin.com/in/suryanshparashar-dev/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Linkedin className="w-5 h-5" />
                    </motion.a>
                    <motion.a
                        whileHover={{ scale: 1.2, rotate: 5 }}
                        href="mailto:sparashar2002@gmail.com"
                        className="text-gray-300 hover:text-white transition-colors"
                    >
                        <Mail className="w-5 h-5" />
                    </motion.a>
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? (
                        <X className="w-6 h-6" />
                    ) : (
                        <Menu className="w-6 h-6" />
                    )}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="md:hidden bg-slate-800/95 backdrop-blur-lg border-t border-white/10"
                >
                    <div className="px-6 py-4 space-y-3">
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className="block w-full text-left text-gray-300 hover:text-white transition-colors py-2"
                            >
                                {item.label}
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}
