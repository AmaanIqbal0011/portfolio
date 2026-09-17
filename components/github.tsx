'use client';

import { motion } from 'framer-motion';
import { ExternalLink, GitFork, Star } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ScrollReveal from './scroll-reveal';

const REPOS = [
  {
    name: 'contentpilot',
    description: 'AI-powered content repurposing & distribution SaaS',
    stars: 12,
    forks: 3,
    language: 'TypeScript',
  },
  {
    name: 'ai-jobpilot',
    description: 'AI-powered job search & application assistant',
    stars: 8,
    forks: 2,
    language: 'TypeScript',
  },
  {
    name: 'agent-toolkit',
    description: 'Reusable tools & utilities for AI agent development',
    stars: 15,
    forks: 4,
    language: 'Python',
  },
  {
    name: 'ai-blog-platform',
    description: 'Modern AI-powered technical blogging platform',
    stars: 6,
    forks: 1,
    language: 'TypeScript',
  },
];

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  Python: 'bg-yellow-400',
  JavaScript: 'bg-yellow-300',
};

export default function GitHub() {
  return (
    <section className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              GitHub
            </span>
          </div>
          <div className="flex items-end justify-between mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              Open Source &amp; Code
            </h2>
            <a
              href="https://github.com/AmaanIqbal0011"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>

        <div className="grid sm:grid-cols-2 gap-3">
          {REPOS.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={i * 0.06}>
              <motion.a
                href="https://github.com/AmaanIqbal0011"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3, scale: 1.01 }}
                transition={{ type: 'spring', damping: 20, stiffness: 300 }}
                className="group block p-5 rounded-2xl border border-border bg-card/50 hover:border-brand/20 hover:shadow-[0_0_30px_-8px_rgba(129,140,248,0.08)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <SiGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-sm font-bold">{repo.name}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                  {repo.description}
                </p>
                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1.5">
                    <div className={`w-2 h-2 rounded-full ${LANG_COLORS[repo.language] || 'bg-gray-400'}`} />
                    {repo.language}
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    {repo.stars}
                  </div>
                  <div className="flex items-center gap-1">
                    <GitFork className="w-3 h-3" />
                    {repo.forks}
                  </div>
                </div>
              </motion.a>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <div className="mt-6 text-center sm:hidden">
            <a
              href="https://github.com/AmaanIqbal0011"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              View Full Profile
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
