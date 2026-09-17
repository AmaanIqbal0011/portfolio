'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { GitFork, Star, Users, Eye } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import ScrollReveal from '../scroll-reveal';
import type { GitHubStats } from '@/lib/github/types';

const LANG_COLORS: Record<string, string> = {
  TypeScript: 'bg-blue-400',
  JavaScript: 'bg-yellow-300',
  Python: 'bg-yellow-400',
  Rust: 'bg-orange-500',
  Go: 'bg-cyan-400',
  Java: 'bg-red-400',
  Ruby: 'bg-red-500',
  PHP: 'bg-purple-400',
  Swift: 'bg-orange-400',
  Kotlin: 'bg-purple-500',
  Dart: 'bg-cyan-500',
  HTML: 'bg-orange-300',
  CSS: 'bg-blue-300',
  Shell: 'bg-gray-300',
  Vue: 'bg-green-400',
  Svelte: 'bg-orange-400',
};

export default function GitHubStats() {
  const [stats, setStats] = useState<GitHubStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/github/repositories')
      .then(res => res.json())
      .then(data => {
        if (data.data?.stats) {
          setStats(data.data.stats);
        }
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading || !stats) return null;

  // Don't show if no meaningful data
  if (stats.publicRepos === 0 && stats.totalStars === 0) return null;

  const statItems = [
    { label: 'Public Repos', value: stats.publicRepos, icon: SiGithub },
    { label: 'Followers', value: stats.followers, icon: Users },
    { label: 'Total Stars', value: stats.totalStars, icon: Star },
  ].filter(item => item.value > 0);

  return (
    <section className="relative py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {statItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center p-5 rounded-xl border border-border bg-card/50 text-center"
              >
                <item.icon className="w-4 h-4 text-muted-foreground mb-2" />
                <span className="text-2xl font-bold gradient-text">{item.value}</span>
                <span className="text-xs text-muted-foreground mt-1">{item.label}</span>
              </motion.div>
            ))}

            {/* Top Languages */}
            {stats.topLanguages.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: statItems.length * 0.08 }}
                className="flex flex-col p-5 rounded-xl border border-border bg-card/50"
              >
                <span className="text-xs text-muted-foreground mb-2">Top Languages</span>
                <div className="flex flex-wrap gap-1.5 mt-auto">
                  {stats.topLanguages.slice(0, 3).map(lang => (
                    <div key={lang.name} className="flex items-center gap-1.5 text-xs">
                      <div className={`w-2 h-2 rounded-full ${LANG_COLORS[lang.name] || 'bg-gray-400'}`} />
                      <span className="font-medium">{lang.name}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
