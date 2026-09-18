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
        const realProjects: MappedProject[] = repoData.data?.mappedProjects || [];

        // Warn if any DB customImage key doesn't match a real repo name.
        // This catches data mismatches early instead of silently failing.
        const repoNames = new Set(realProjects.map((p: MappedProject) => p.name));
        for (const key of Object.keys(images)) {
          if (!repoNames.has(key)) {
            console.warn(
              `[GitHubProjects] customImage key "${key}" in DB does not match any fetched repo name. ` +
              `It will be ignored. DB keys must use the real GitHub repo name (e.g. "my-repo", not "fallback-my-repo").`
            );
          }
        }

        // Always use real GitHub repo data. Custom images are merged from the DB
        // using the real repo `name` as the key (must match project_settings.repo_name).
        setProjects(
          realProjects
            .filter((p: MappedProject) => !hidden.includes(p.name))
            .map((p: MappedProject) => ({
              ...p,
              // DB customImage takes precedence; fall back to any value already on the mapped project
              customImage: images[p.name] || p.customImage,
            }))
        );
      })
      .catch(() => {
        // On error, show empty state — never silently render fake data
        setProjects([]);
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
