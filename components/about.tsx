'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import { ArrowRight, Brain, Code, Workflow, Layers } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

const STRENGTHS = [
  { icon: Brain, label: 'AI Agents & Agentic AI', iconClass: 'text-brand', bgClass: 'bg-brand/10' },
  { icon: Layers, label: 'AI-Powered SaaS', iconClass: 'text-purple-500', bgClass: 'bg-purple-500/10' },
  { icon: Code, label: 'Full-Stack Development', iconClass: 'text-emerald-500', bgClass: 'bg-emerald-500/10' },
  { icon: Workflow, label: 'Workflow Automation', iconClass: 'text-brand', bgClass: 'bg-brand/10' },
] as const;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-28 sm:py-36">
      {/* Subtle grid background */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />

      <div className="relative mx-auto max-w-6xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: Profile Image */}
          <ScrollReveal>
            <div className="relative flex justify-center lg:justify-start">
              {/* Background shape */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[85%] h-[85%] bg-gradient-to-br from-brand/8 via-purple-500/5 to-transparent rounded-full blur-[60px]" />
              </div>

              {/* Image container */}
              <div className="relative">
                <div className="relative w-72 h-80 sm:w-80 sm:h-[360px] lg:w-[380px] lg:h-[420px] rounded-3xl overflow-hidden border border-border/60 shadow-[0_0_40px_-12px_rgba(129,140,248,0.1)]">
                  <Image
                    src="/about.png"
                    alt="Amaan Iqbal — AI Agent Developer"
                    fill
                    sizes="(max-width: 640px) 288px, (max-width: 1024px) 320px, 380px"
                    className="object-cover object-center"
                    priority
                  />
                  {/* Bottom gradient for depth */}
                  <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* Right: Content */}
          <div>
            <ScrollReveal>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px flex-1 max-w-12 bg-border" />
                <span className="text-xs font-semibold uppercase tracking-widest text-brand">
                  About Me
                </span>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={0.05}>
              <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-bold tracking-tight mb-6 leading-[1.15]">
                Building Intelligent Systems
                <br />
                <span className="gradient-text">From Ideas to Reality</span>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-muted-foreground leading-relaxed text-[15px] mb-8 max-w-lg">
                I&apos;m Amaan Iqbal — an AI Agent Developer and Computer Science student
                focused on building intelligent AI-powered products, autonomous agents,
                and production-ready software that solves real problems.
              </p>
            </ScrollReveal>

            {/* Strengths grid */}
            <ScrollReveal delay={0.15}>
              <motion.div
                variants={container}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-40px' }}
                className="grid grid-cols-2 gap-3 mb-10"
              >
                {STRENGTHS.map(({ icon: Icon, label, iconClass, bgClass }) => (
                  <motion.div
                    key={label}
                    variants={item}
                    className="flex items-center gap-3 p-3 rounded-xl border border-border/60 bg-card/30 hover:border-brand/20 transition-all duration-300"
                  >
                    <div className={`flex items-center justify-center w-9 h-9 rounded-lg ${bgClass} flex-shrink-0`}>
                      <Icon className={`w-4 h-4 ${iconClass}`} />
                    </div>
                    <span className="text-sm font-medium text-foreground/90">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </ScrollReveal>

            {/* CTA buttons */}
            <ScrollReveal delay={0.2}>
              <div className="flex flex-col sm:flex-row items-start gap-3">
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-3 rounded-xl bg-foreground text-background text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-foreground/5"
                >
                  Let&apos;s Work Together
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#projects"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-border text-sm font-semibold hover:bg-accent hover:border-brand/20 transition-all"
                >
                  View My Work
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
