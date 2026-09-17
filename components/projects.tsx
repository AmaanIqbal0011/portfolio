'use client';

import { motion } from 'framer-motion';
import { ExternalLink, ArrowUpRight, Bot, FileText, CheckSquare } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

interface Project {
  title: string;
  description: string;
  tags: string[];
  category: string;
  liveUrl: string;
  githubUrl: string;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
}

const PROJECTS: Project[] = [
  {
    title: 'AI JobPilot',
    description:
      'AI-powered job search and application assistant. Resume intelligence, company analysis, job tracking, and a Kanban interface — all driven by AI automation.',
    tags: ['Next.js', 'AI', 'Kanban', 'Automation'],
    category: 'AI Agent • Productivity',
    liveUrl: '#',
    githubUrl: '#',
    icon: Bot,
    gradient: 'from-blue-500/10 to-cyan-500/5',
  },
  {
    title: 'AI-Powered Tech Blog',
    description:
      'A modern technical blogging platform with an AI chatbot, writer dashboard, real-time data, authentication, and CRUD — built with Next.js and FastAPI.',
    tags: ['Next.js', 'FastAPI', 'OpenAI', 'Real-time'],
    category: 'AI SaaS • Content',
    liveUrl: '#',
    githubUrl: '#',
    icon: FileText,
    gradient: 'from-purple-500/10 to-pink-500/5',
  },
  {
    title: 'AI Productivity App',
    description:
      'AI-powered task management with an intelligent assistant, task workflows, authentication, and a clean interface for focused productivity.',
    tags: ['Next.js', 'FastAPI', 'Neon', 'AI Assistant'],
    category: 'AI Agent • Productivity',
    liveUrl: '#',
    githubUrl: '#',
    icon: CheckSquare,
    gradient: 'from-emerald-500/10 to-teal-500/5',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const cardVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Projects() {
  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Projects
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            Other Work
          </h2>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid md:grid-cols-2 xl:grid-cols-3 gap-4"
        >
          {PROJECTS.map(project => {
            const Icon = project.icon;
            return (
              <motion.div
                key={project.title}
                variants={cardVariant}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="group flex flex-col rounded-2xl border border-border bg-card overflow-hidden hover:border-brand/20 transition-all duration-300"
              >
                {/* Card header visual */}
                <div className={`relative h-44 bg-gradient-to-br ${project.gradient} flex items-center justify-center overflow-hidden`}>
                  <div className="absolute inset-0 grid-bg grid-fade opacity-15" />
                  <div className="absolute inset-0 bg-gradient-to-t from-card/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="relative z-10 flex items-center justify-center w-14 h-14 rounded-2xl bg-background/50 backdrop-blur-sm border border-border group-hover:scale-110 transition-transform duration-500">
                    <Icon className="w-6 h-6 text-foreground" />
                  </div>
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <ArrowUpRight className="w-4 h-4 text-muted-foreground" />
                  </div>
                </div>

                {/* Card body */}
                <div className="flex flex-col flex-1 p-5">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-bold">{project.title}</h3>
                  </div>
                  <p className="text-xs text-brand font-medium mb-2">{project.category}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent text-accent-foreground">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2 pt-3 border-t border-border">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-foreground text-background hover:opacity-90 transition-opacity">
                      <ExternalLink className="w-3 h-3" />
                      Demo
                    </a>
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg border border-border hover:bg-accent transition-colors">
                      Code
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
