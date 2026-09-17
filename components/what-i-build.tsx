'use client';

import { motion } from 'framer-motion';
import { Bot, Users, Layers, Workflow } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

const BUILDS = [
  {
    icon: Bot,
    title: 'AI Agents',
    description:
      'Intelligent agents that reason, use tools, access APIs, and execute tasks autonomously.',
    gradient: 'from-brand/8 to-transparent',
  },
  {
    icon: Users,
    title: 'AI Employees',
    description:
      'AI-powered digital workers designed to automate repetitive business workflows.',
    gradient: 'from-purple-500/8 to-transparent',
  },
  {
    icon: Layers,
    title: 'AI SaaS',
    description:
      'Production-ready AI products with authentication, databases, APIs, dashboards, and billing-ready architecture.',
    gradient: 'from-blue-500/8 to-transparent',
  },
  {
    icon: Workflow,
    title: 'Automation Systems',
    description:
      'Connected workflows that integrate AI, APIs, social platforms, databases, and business processes.',
    gradient: 'from-emerald-500/8 to-transparent',
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

export default function WhatIBuild() {
  return (
    <section id="hire" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              What I Build
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            Products &amp; Systems
          </h2>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid sm:grid-cols-2 gap-4"
        >
          {BUILDS.map(({ icon: Icon, title, description, gradient }) => (
            <motion.div
              key={title}
              variants={cardVariant}
              whileHover={{ y: -6, scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="group relative p-7 rounded-2xl border border-border bg-card/50 hover:border-brand/20 transition-all duration-300 overflow-hidden"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
              <div className="absolute top-0 right-0 w-40 h-40 bg-brand/4 rounded-full blur-[80px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="relative z-10">
                <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-brand/10 border border-brand/10 mb-5 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-5 h-5 text-brand" />
                </div>
                <h3 className="text-lg font-bold mb-2.5">{title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
