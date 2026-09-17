'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, GitCommit, GitBranch, Star } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ScrollReveal from '../scroll-reveal';
import type { GitHubRepository } from '@/lib/github/types';
import { LANGUAGE_COLORS } from '@/lib/github/config';

export default function GitHubActivity() {
  const [repos, setRepos] = useState<GitHubRepository[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then(data => {
        if (data.data?.repositories) {
          setRepos(data.data.repositories.slice(0, 5));
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || repos.length === 0) return null;

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-8">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Activity
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-8">
            Recent Activity
          </h2>
        </ScrollReveal>

        <div className="space-y-2">
          {repos.map((repo, i) => (
            <ScrollReveal key={repo.id} delay={i * 0.05}>
              <motion.a
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 4 }}
                className="group flex items-center gap-4 p-4 rounded-xl border border-border bg-card/30 hover:border-brand/20 hover:bg-card/50 transition-all duration-300"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent shrink-0">
                  <SiGithub className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-sm font-bold truncate">{repo.name}</span>
                    {repo.fork && (
                      <span className="px-1.5 py-0.5 text-[9px] font-medium rounded bg-accent text-muted-foreground">
                        fork
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {repo.description || 'No description'}
                  </p>
                </div>

                <div className="hidden sm:flex items-center gap-3 text-xs text-muted-foreground shrink-0">
                  {repo.language && (
                    <div className="flex items-center gap-1.5">
                      <div className={`w-2 h-2 rounded-full ${LANGUAGE_COLORS[repo.language] || 'bg-gray-400'}`} />
                      {repo.language}
                    </div>
                  )}
                  {repo.stargazers_count > 0 && (
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3" />
                      {repo.stargazers_count}
                    </div>
                  )}
                  <span>{new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>

                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
              </motion.a>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
