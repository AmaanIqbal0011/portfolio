'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { ExternalLink, Play } from 'lucide-react';
import { SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si';
import ScrollReveal from './scroll-reveal';

const FEATURES = [
  'AI Video Repurposing',
  'AI-Generated Clips & Captions',
  'Platform-Specific Content',
  'Social Media Scheduling',
  'AI Content Workflows',
  'Analytics Dashboard',
  'Multi-Platform Distribution',
  'OAuth & Integrations',
];

const TECH = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'Clerk', icon: null },
  { name: 'Neon', icon: null },
  { name: 'Prisma', icon: null },
  { name: 'OpenAI', icon: null },
  { name: 'Trigger.dev', icon: null },
];

const WORKFLOW_STEPS = [
  'Long-form Content',
  'AI Analysis',
  'Context Understanding',
  'Content Repurposing',
  'Platform-specific Assets',
  'Scheduling & Distribution',
  'Analytics',
];

export default function FeaturedProject() {
  return (
    <section id="featured" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Featured Project
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="flex items-center gap-3 mb-2">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">
              ContentPilot
            </h2>
            <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-brand/10 text-brand border border-brand/20">
              .media
            </span>
          </div>
          <p className="text-muted-foreground text-sm mb-10">
            AI SaaS &bull; AI Agents &bull; Content Automation
          </p>
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            <span className="text-xs font-medium text-amber-600 dark:text-amber-400">
              In Development — Beta &amp; App Review in Progress (Meta, TikTok, LinkedIn)
            </span>
          </div>
        </ScrollReveal>

        <div className="grid items-start gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left: Visual / Hero */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="group relative overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-[0_24px_60px_-32px_rgba(15,23,42,0.38)]"
            >
              {/* Product screenshot */}
              <div className="aspect-[16/10] relative overflow-hidden">
                <Image
                  src="/contentpilot.png"
                  alt="ContentPilot — AI content repurposing platform"
                  fill
                  sizes="(max-width: 1024px) 100vw, 55vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <div className="flex gap-2">
                    <a href="https://contentpilot.media/" target="_blank" rel="noopener noreferrer"
                       className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold">
                      <Play className="w-3 h-3" />
                      View Project
                    </a>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 border-t border-border/70 bg-card/80 p-4">
                <a href="https://contentpilot.media/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Play className="w-3 h-3" />
                  Live Demo
                </a>
                <a href="https://contentpilot.media/" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Join Waitlist
                </a>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right: Details */}
          <ScrollReveal delay={0.2} className="space-y-6">
            <p className="max-w-xl text-[15px] leading-8 text-muted-foreground">
              An AI-powered content repurposing and distribution platform that helps
              creators, entrepreneurs, and small teams turn one piece of content into
              platform-ready content across multiple social networks.
            </p>

            {/* Workflow */}
            <div className="rounded-2xl border border-border/70 bg-card/45 p-5">
              <h4 className="mb-3 text-sm font-semibold">How it works</h4>
              <div className="relative">
                {WORKFLOW_STEPS.map((step, i) => (
                  <div key={step} className="flex items-center gap-3 text-sm relative">
                    {/* Connector line */}
                    {i < WORKFLOW_STEPS.length - 1 && (
                      <div className="absolute left-[9px] top-[24px] w-px h-[calc(100%-8px)] bg-border" />
                    )}
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-brand/10 text-brand text-[10px] font-bold shrink-0 relative z-10">
                      {i + 1}
                    </div>
                    <span className="text-muted-foreground py-2">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Key Capabilities</h4>
              <div className="flex flex-wrap gap-2">
                {FEATURES.map(f => (
                  <span key={f} className="px-2.5 py-1 text-xs font-medium rounded-lg bg-accent text-accent-foreground border border-border hover:border-brand/20 transition-colors">
                    {f}
                  </span>
                ))}
              </div>
            </div>

            {/* Tech */}
            <div>
              <h4 className="text-sm font-semibold mb-3">Technology</h4>
              <div className="flex flex-wrap gap-2">
                {TECH.map(({ name, icon: Icon }) => (
                  <div key={name} className="flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-lg border border-border bg-card hover:border-brand/20 transition-colors">
                    {Icon && <Icon className="w-3 h-3" />}
                    {name}
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
