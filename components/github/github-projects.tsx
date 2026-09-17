'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, Loader2 } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ScrollReveal from '../scroll-reveal';
import GitHubProjectCard from './github-project-card';
import type { MappedProject, ProjectCategory } from '@/lib/github/types';

const FILTERS: { label: string; value: 'all' | ProjectCategory }[] = [
  { label: 'All', value: 'all' },
  { label: 'AI & Agents', value: 'ai' },
  { label: 'Full Stack', value: 'fullstack' },
];

// Fallback projects when GitHub is not connected
const FALLBACK_PROJECTS: MappedProject[] = [
  {
    id: 'fallback-contentpilot',
    name: 'contentpilot',
    displayName: 'ContentPilot',
    description: 'AI-powered content repurposing and distribution platform that helps creators turn one piece of content into platform-ready content across multiple social networks.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'TypeScript',
    languages: ['TypeScript', 'Next.js', 'OpenAI'],
    topics: ['ai', 'content', 'saas'],
    stars: 12,
    forks: 3,
    url: 'https://github.com/AmaanIqbal0011',
    homepage: null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isFeatured: true,
    isHidden: false,
    gradient: 'from-brand/10 via-purple-500/5 to-blue-500/10',
  },
  {
    id: 'fallback-ai-jobpilot',
    name: 'ai-jobpilot',
    displayName: 'AI JobPilot',
    description: 'AI-powered job search and application assistant with resume intelligence, company analysis, job tracking, and a Kanban interface.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'TypeScript',
    languages: ['TypeScript', 'Next.js', 'AI'],
    topics: ['ai', 'jobs', 'automation'],
    stars: 8,
    forks: 2,
    url: 'https://github.com/AmaanIqbal0011',
    homepage: null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isFeatured: false,
    isHidden: false,
    gradient: 'from-blue-500/10 to-cyan-500/5',
  },
  {
    id: 'fallback-agent-toolkit',
    name: 'agent-toolkit',
    displayName: 'Agent Toolkit',
    description: 'Reusable tools and utilities for AI agent development with OpenAI Agent SDK and custom tool-calling architectures.',
    category: 'ai',
    categoryLabel: 'AI & Agents',
    language: 'Python',
    languages: ['Python', 'OpenAI'],
    topics: ['ai', 'agent', 'tools'],
    stars: 15,
    forks: 4,
    url: 'https://github.com/AmaanIqbal0011',
    homepage: null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isFeatured: false,
    isHidden: false,
    gradient: 'from-purple-500/10 to-pink-500/5',
  },
  {
    id: 'fallback-ai-blog',
    name: 'ai-blog-platform',
    displayName: 'AI Tech Blog',
    description: 'A modern technical blogging platform with an AI chatbot, writer dashboard, real-time data, authentication, and CRUD.',
    category: 'fullstack',
    categoryLabel: 'Full Stack',
    language: 'TypeScript',
    languages: ['TypeScript', 'Next.js', 'FastAPI'],
    topics: ['blog', 'ai', 'saas'],
    stars: 6,
    forks: 1,
    url: 'https://github.com/AmaanIqbal0011',
    homepage: null,
    updatedAt: new Date().toISOString(),
    createdAt: new Date().toISOString(),
    isFeatured: false,
    isHidden: false,
    gradient: 'from-emerald-500/10 to-teal-500/5',
  },
];

export default function GitHubProjects() {
  const [projects, setProjects] = useState<MappedProject[]>([]);
  const [filter, setFilter] = useState<'all' | ProjectCategory>('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetch('/api/github/repositories').then(res => res.json()),
      fetch('/api/admin/projects').then(res => res.json()),
    ])
      .then(([repoData, settings]) => {
        const hidden: string[] = settings.hidden || [];
        const images: Record<string, string> = settings.customImages || {};
        if (repoData.data?.mappedProjects?.length > 0) {
          setProjects(repoData.data.mappedProjects
            .filter((p: MappedProject) => !hidden.includes(p.name))
            .map((p: MappedProject) => ({
              ...p,
              customImage: images[p.name] || p.customImage,
            }))
          );
        } else {
          setProjects(FALLBACK_PROJECTS);
        }
      })
      .catch(() => {
        setProjects(FALLBACK_PROJECTS);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = filter === 'all'
    ? projects.filter(p => !p.isHidden)
    : projects.filter(p => !p.isHidden && p.category === filter);

  return (
    <section id="projects" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* Header */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Projects
            </span>
          </div>
          <div className="flex items-end justify-between mb-4">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Featured Work
              </h2>
              <p className="text-muted-foreground text-sm max-w-md">
                A selection of projects I&apos;ve built — from AI agents to full-stack applications.
              </p>
            </div>
            <a
              href="https://github.com/AmaanIqbal0011"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-xs font-medium rounded-xl border border-border hover:bg-accent hover:border-brand/20 transition-all"
            >
              <SiGithub className="w-3.5 h-3.5" />
              GitHub Profile
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </ScrollReveal>

        {/* Filters */}
        <ScrollReveal delay={0.05}>
          <div className="flex flex-wrap gap-2 mb-10">
            {FILTERS.map(f => (
              <button
                key={f.value}
                onClick={() => setFilter(f.value)}
                className={`relative px-4 py-2 text-xs font-medium rounded-xl transition-all duration-300 ${
                  filter === f.value
                    ? 'bg-foreground text-background shadow-lg shadow-foreground/10'
                    : 'text-muted-foreground hover:text-foreground border border-border hover:border-brand/20 hover:bg-accent/50'
                }`}
              >
                {f.label}
                {filter === f.value && (
                  <motion.div
                    layoutId="project-filter"
                    className="absolute inset-0 rounded-xl bg-foreground -z-10"
                    transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  />
                )}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Loading state */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-24 gap-3">
            <Loader2 className="w-6 h-6 text-muted-foreground animate-spin" />
            <p className="text-xs text-muted-foreground">Loading projects...</p>
          </div>
        )}

        {/* Projects grid */}
        {!loading && (
          <motion.div
            layout
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <GitHubProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}

        {/* Empty state */}
        {!loading && filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-sm">No projects found in this category.</p>
          </div>
        )}

        {/* View on GitHub */}
        <ScrollReveal delay={0.15}>
          <div className="mt-12 pt-8 border-t border-border/60 text-center">
            <a
              href="https://github.com/AmaanIqbal0011?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-accent hover:border-brand/20 transition-all"
            >
              View All Projects on GitHub
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
