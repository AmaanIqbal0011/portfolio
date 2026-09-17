'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Play, Sparkles, ArrowUpRight } from 'lucide-react';
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
    <section id="featured" className="relative py-28 sm:py-36">
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
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Visual / Hero */}
          <ScrollReveal delay={0.1}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="group relative rounded-2xl border border-border bg-card overflow-hidden"
            >
              {/* Gradient placeholder visual */}
              <div className="aspect-[16/10] relative bg-gradient-to-br from-brand/10 via-purple-500/5 to-blue-500/10 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 grid-bg grid-fade opacity-25" />
                {/* Animated gradient orb */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-brand/10 rounded-full blur-[80px] group-hover:bg-brand/15 transition-all duration-700" />
                <div className="relative z-10 text-center p-8">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand/10 border border-brand/20 mb-4 group-hover:scale-105 transition-transform duration-500">
                    <Sparkles className="w-7 h-7 text-brand" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">ContentPilot.media</h3>
                  <p className="text-sm text-muted-foreground max-w-xs mx-auto">
                    Turn one piece of content into platform-ready content across multiple networks.
                  </p>
                </div>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end justify-center pb-8">
                  <div className="flex gap-2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold">
                      <Play className="w-3 h-3" />
                      View Project
                    </span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-2 p-4 border-t border-border">
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg bg-foreground text-background text-xs font-semibold hover:opacity-90 transition-opacity">
                  <Play className="w-3 h-3" />
                  Live Demo
                </a>
                <a href="#" target="_blank" rel="noopener noreferrer"
                   className="flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-xs font-semibold hover:bg-accent transition-colors">
                  <ExternalLink className="w-3 h-3" />
                  Case Study
                </a>
              </div>
            </motion.div>
          </ScrollReveal>

          {/* Right: Details */}
          <ScrollReveal delay={0.2} className="space-y-6">
            <p className="text-muted-foreground leading-relaxed text-[15px]">
              An AI-powered content repurposing and distribution platform that helps
              creators, entrepreneurs, and small teams turn one piece of content into
              platform-ready content across multiple social networks.
            </p>

            {/* Workflow */}
            <div>
              <h4 className="text-sm font-semibold mb-3">How it works</h4>
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
