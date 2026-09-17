'use client';

import { motion } from 'framer-motion';
import { Mail, ArrowRight, ExternalLink } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaGoogle, FaWhatsapp } from 'react-icons/fa';
import ScrollReveal from './scroll-reveal';

export default function Contact() {
  return (
    <section id="contact" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Contact
            </span>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.05}>
          <div className="max-w-2xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-6">
              Have an idea
              <br />
              worth <span className="gradient-text">building?</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg mb-10">
              I&apos;m interested in AI agents, AI SaaS, automation, and ambitious
              product ideas. If you&apos;re working on something exciting, let&apos;s talk.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.1}>
          <div className="flex flex-col sm:flex-row gap-3 mb-10">
            <a
              href="mailto:amaaniqbal0011@gmail.com"
              className="group inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl bg-[#ea4335] text-white text-sm font-semibold hover:bg-[#d93025] transition-all shadow-lg shadow-[#ea4335]/20"
            >
              <FaGoogle className="w-4 h-4" />
              Start a Conversation
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="https://github.com/AmaanIqbal0011"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#24292f] text-white text-sm font-semibold hover:bg-[#1a1e23] transition-all shadow-lg shadow-[#24292f]/20"
            >
              <SiGithub className="w-4 h-4" />
              View GitHub
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href="https://www.linkedin.com/in/amaniqbal0011/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#0a66c2] text-white text-sm font-semibold hover:bg-[#0958a8] transition-all shadow-lg shadow-[#0a66c2]/20"
            >
              <FaLinkedinIn className="w-4 h-4" />
              Connect on LinkedIn
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
            <a
              href="https://wa.me/923292030521"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-7 py-3.5 rounded-xl bg-[#25d366] text-white text-sm font-semibold hover:bg-[#1da851] transition-all shadow-lg shadow-[#25d366]/20"
            >
              <FaWhatsapp className="w-4 h-4" />
              WhatsApp
              <ExternalLink className="w-3.5 h-3.5 opacity-60" />
            </a>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.15}>
          <div className="flex gap-3">
            <a
              href="mailto:amaaniqbal0011@gmail.com"
              aria-label="Email"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-[#ea4335]/30 text-[#ea4335] hover:bg-[#ea4335] hover:text-white hover:border-[#ea4335] transition-all duration-300"
            >
              <FaGoogle className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://github.com/AmaanIqbal0011"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-[#24292f]/30 text-[#24292f] dark:text-foreground hover:bg-[#24292f] hover:text-white hover:border-[#24292f] transition-all duration-300"
            >
              <SiGithub className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://www.linkedin.com/in/amaniqbal0011/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-[#0a66c2]/30 text-[#0a66c2] hover:bg-[#0a66c2] hover:text-white hover:border-[#0a66c2] transition-all duration-300"
            >
              <FaLinkedinIn className="w-[18px] h-[18px]" />
            </a>
            <a
              href="https://wa.me/923292030521"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp"
              className="flex items-center justify-center w-11 h-11 rounded-xl border border-[#25d366]/30 text-[#25d366] hover:bg-[#25d366] hover:text-white hover:border-[#25d366] transition-all duration-300"
            >
              <FaWhatsapp className="w-[18px] h-[18px]" />
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
