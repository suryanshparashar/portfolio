import { Project, Education, Skill } from '../types/portfolio';

export const projects: Project[] = [
    {
        id: 'artha-nirikshana',
        title: 'Artha Nirikshana',
        description: 'A full-stack expense & income tracking web app with enterprise-grade AES-256-GCM encryption, built for Indian users with glassmorphism UI and ₹ as default currency.',
        longDescription: 'Artha Nirikshana (अर्थ निरीक्षण) — "Your Money\'s Mirror" — is a MERN-stack personal finance tracker designed for Indian users. Track expenses & income with category breakdowns, payment method stats, and net balance summaries. Features interactive Recharts visualizations (line, bar, pie), annual month-by-month financial trends, digital wallet with auto-updates, and Cloudinary-powered avatar uploads. All sensitive financial data (title, category, amount) is encrypted at rest in MongoDB using AES-256-GCM with user-specific keys derived via PBKDF2 — password-independent, so changing your password never affects your data. Dashboard analytics decrypt on-the-fly through manual aggregation.',
        technologies: ['React 18', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT', 'Recharts', 'Cloudinary', 'AES-256-GCM', 'PBKDF2'],
        image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&h=600&fit=crop',
        githubUrl: 'https://github.com/suryanshparashar/Artha-Nirikshana',
        liveUrl: 'https://artha-nirikshana.vercel.app/',
        highlights: [
            'AES-256-GCM encryption for all financial data at rest',
            'Interactive charts — line, bar & pie via Recharts',
            'JWT auth with httpOnly cookies (access + refresh tokens)',
            'Digital wallet with automatic balance updates',
            'Annual month-by-month & year-by-year financial trends',
            'Glassmorphism UI with Indian Rupee (₹) default'
        ],
        category: 'fullstack'
    },
    {
        id: 'raksha-sutra',
        title: 'RakshaSutra',
        description: 'A cross-platform browser extension that generates cryptographically secure passwords using Apple & GitHub-style algorithms — zero data collection, zero tracking.',
        longDescription: 'RakshaSutra is a production-ready, professionally-designed browser extension that generates cryptographically secure passwords using two industry-standard algorithms: Apple-style and GitHub-style. Built with React + TypeScript, it uses the Web Crypto API for true cryptographic randomness (not Math.random()), calculates entropy for strength indication, and maintains complete user privacy — no accounts, no analytics, no network calls. Available across Chrome, Firefox, and Edge stores. Features a modern glassmorphism UI, cross-browser compatibility, and a dedicated landing page. 100% free with no ads and no data collection — a pure passion project.',
        technologies: ['React', 'TypeScript', 'Tailwind CSS', 'Web Crypto API', 'Browser Extensions API', 'Vite'],
        image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=600&fit=crop',
        githubUrl: 'https://github.com/suryanshparashar/RakshaSutra-Password-Generator',
        liveUrl: 'https://rakshasutra.suryanshparashar.com/',
        highlights: [
            'Two proven algorithms — Apple-style & GitHub-style generation',
            'Web Crypto API for true cryptographic randomness',
            'Zero data collection — complete user privacy',
            'Cross-platform — Chrome, Firefox & Edge stores',
            'Entropy-based password strength indication',
            'Professional landing page with store links'
        ],
        category: 'frontend'
    }
];

export const education: Education[] = [
    {
        id: 'edu-1',
        institution: 'VIT Bhopal University',
        degree: 'Bachelor of Technology',
        field: 'CSE (Artificial Intelligence and Machine Learning)',
        startDate: '2022',
        endDate: '2026',
        // grade: '8.5 CGPA',
        achievements: [
            // 'Dean\'s List for Academic Excellence',
            // 'Winner of University Hackathon 2023',
            // 'Published research paper on AI/ML applications',
            // 'Led the coding club as President'
        ]
    },
    {
        id: 'edu-2',
        institution: 'Krishnanand Memorial Academy, Asarganj, Munger, Bihar',
        degree: 'Higher Secondary Education',
        field: 'Science (PCM)',
        startDate: '2019',
        endDate: '2021',
        // grade: '92%',
        achievements: [
            // 'Represented school in inter-school Tabla competition and secured 1st place',
        ]
    }
];

export const skills: Skill[] = [
    // Frontend
    { name: 'React', category: 'frontend', level: 90, icon: 'react' },
    { name: 'JavaScript', category: 'frontend', level: 95, icon: 'javascript' },
    { name: 'TypeScript', category: 'frontend', level: 70, icon: 'typescript' },
    { name: 'Tailwind CSS', category: 'frontend', level: 85, icon: 'tailwind' },
    // { name: 'Redux', category: 'frontend', level: 85, icon: 'redux' },
    
    // Backend
    { name: 'Node.js', category: 'backend', level: 90, icon: 'nodejs' },
    { name: 'Express.js', category: 'backend', level: 88, icon: 'express' },
    { name: 'Python', category: 'backend', level: 70, icon: 'python' },
    { name: 'FastAPI', category: 'backend', level: 15, icon: 'fastapi' },
    
    // Database
    { name: 'MongoDB', category: 'database', level: 90, icon: 'mongodb' },
    { name: 'MySQL', category: 'database', level: 25, icon: 'mysql' },
    { name: 'Redis', category: 'database', level: 75, icon: 'redis' },
    
    // AI/ML
    { name: 'LangChain', category: 'ai', level: 85, icon: 'langchain' },
    { name: 'TensorFlow', category: 'ai', level: 70, icon: 'tensorflow' },
    { name: 'PyTorch', category: 'ai', level: 70, icon: 'pytorch' },
    // { name: 'OpenAI API', category: 'ai', level: 88, icon: 'openai' },
    
    // Tools
    { name: 'Git', category: 'tools', level: 92, icon: 'git' },
    { name: 'Docker', category: 'tools', level: 10, icon: 'docker' },
    { name: 'AWS', category: 'tools', level: 25, icon: 'aws' },
];

export const aboutMe = {
    name: 'Suryansh Parashar',
    title: 'Full Stack Developer & AI Enthusiast',
    bio: `I'm a passionate Full Stack Developer specializing in the MERN stack with a keen interest in Artificial Intelligence and modern web technologies. With a strong foundation in both frontend and backend development, I create scalable, user-centric applications that solve real-world problems.

My journey in tech started with a curiosity about how things work, which evolved into a passion for building innovative solutions. I'm particularly excited about integrating AI capabilities into web applications, leveraging tools like LangChain to create intelligent, responsive systems.

When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing knowledge with the developer community. I believe in writing clean, maintainable code and following best practices to deliver high-quality software.`,
    highlights: [
        '1+ years of experience in web development',
        'Built and deployed 5+ full-stack applications',
        'Strong focus on performance optimization and UX',
        'Active contributor to open-source projects',
        'Passionate about AI/ML integration in web apps'
    ],
    stats: [
        { label: 'Projects Completed', value: '5+' },
        { label: 'Technologies Mastered', value: '15+' },
        { label: 'GitHub Contributions', value: '175+ within a year' },
        { label: 'Client Satisfaction', value: '100%' }
    ]
};
