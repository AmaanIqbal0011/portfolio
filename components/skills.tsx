'use client';

import { motion } from 'framer-motion';
import {
  SiNextdotjs, SiTypescript, SiPython, SiTailwindcss,
  SiReact, SiPostgresql,
} from 'react-icons/si';
import { Brain, Cpu, Workflow, Database, Cloud, Rocket, Bot, Sparkles } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

const CATEGORIES = [
  {
    title: 'AI & Agentic Development',
    items: [
      { name: 'AI Agents', icon: Bot },
      { name: 'Agentic AI', icon: Brain },
      { name: 'OpenAI Agent SDK', icon: Sparkles },
      { name: 'LLM Applications', icon: Cpu },
      { name: 'Tool Calling', icon: Workflow },
      { name: 'AI Automation', icon: Rocket },
      { name: 'Prompt Engineering', icon: null },
    ],
  },
  {
    title: 'Full Stack',
    items: [
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React', icon: SiReact },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Python', icon: SiPython },
      { name: 'FastAPI', icon: SiPython },
      { name: 'REST APIs', icon: null },
    ],
  },
  {
    title: 'Databases & Infrastructure',
    items: [
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'Neon', icon: Database },
      { name: 'Prisma', icon: Database },
      { name: 'Vercel', icon: Cloud },
      { name: 'Cloud Infrastructure', icon: Cloud },
    ],
  },
  {
    title: 'Automation',
    items: [
      { name: 'n8n', icon: Workflow },
      { name: 'Trigger.dev', icon: Rocket },
      { name: 'OAuth', icon: null },
      { name: 'API Integrations', icon: null },
      { name: 'Workflow Automation', icon: Workflow },
    ],
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { type: 'spring' as const, damping: 20, stiffness: 300 },
  },
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Skills
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            Technology &amp; Expertise
          </h2>
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-8">
          {CATEGORIES.map((cat, catIdx) => (
            <ScrollReveal key={cat.title} delay={catIdx * 0.08}>
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                {cat.title}
              </h3>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="flex flex-wrap gap-2"
              >
                {cat.items.map(({ name, icon: Icon }) => (
                  <motion.div
                    key={name}
                    variants={item}
                    whileHover={{ scale: 1.05, y: -2 }}
                    className="group flex items-center gap-2 px-3.5 py-2.5 rounded-xl border border-border bg-card/50 hover:border-brand/30 hover:bg-brand/5 transition-all duration-200 cursor-default"
                  >
                    {Icon && (
                      <Icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-brand transition-colors duration-200" />
                    )}
                    <span className="text-sm font-medium">{name}</span>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
