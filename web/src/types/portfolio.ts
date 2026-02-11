export interface Project {
    id: string;
    title: string;
    description: string;
    longDescription: string;
    technologies: string[];
    image: string;
    githubUrl?: string;
    liveUrl?: string;
    highlights: string[];
    category: 'fullstack' | 'frontend' | 'backend' | 'ai' | 'mobile';
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate: string;
    grade?: string;
    achievements: string[];
    logo?: string;
}

export interface Skill {
    name: string;
    category: 'frontend' | 'backend' | 'database' | 'tools' | 'ai';
    level: number; // 1-100
    icon: string;
}

export interface Experience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
    description: string[];
    technologies: string[];
}

export interface SocialLink {
    name: string;
    url: string;
    icon: string;
}

export interface ContactForm {
    name: string;
    email: string;
    subject: string;
    message: string;
}
