'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';
import ScrollReveal from './scroll-reveal';

interface Certificate {
  name: string;
  score: string;
  issuer: string;
  date: string;
  link: string;
}

const FALLBACK_CERTS: Certificate[] = [
  {
    name: 'OpenAI Agent SDK',
    score: '97%',
    issuer: 'GIAIC',
    date: '2023',
    link: '',
  },
  {
    name: 'Prompt Engineering',
    score: '65%',
    issuer: 'PIAIC',
    date: '2023',
    link: '',
  },
  {
    name: 'n8n Automation — Level 1',
    score: '100%',
    issuer: 'n8n',
    date: '2024',
    link: '',
  },
  {
    name: 'n8n Automation — Practical',
    score: '89%',
    issuer: 'n8n',
    date: '2024',
    link: '',
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const },
  },
};

export default function Achievements() {
  const [certificates, setCertificates] = useState<Certificate[]>(FALLBACK_CERTS);

  useEffect(() => {
    fetch('/api/admin/certificates')
      .then(res => res.json())
      .then(data => {
        if (data.certificates?.length > 0) {
          setCertificates(data.certificates);
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section id="certificates" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Certificates
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            Certifications &amp; Results
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mb-12">
            Verified credentials and assessment scores from leading platforms in AI and automation.
          </p>
        </ScrollReveal>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {certificates.map((cert) => (
            <motion.div
              key={cert.name}
              variants={item}
              whileHover={{ y: -4, scale: 1.01 }}
              transition={{ type: 'spring', damping: 20, stiffness: 300 }}
              className="group relative p-6 rounded-2xl border border-border bg-card/50 hover:border-brand/20 transition-all duration-300 overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute top-0 right-0 w-28 h-28 bg-brand/4 rounded-full blur-[60px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10">
                {/* Top row: icon + score */}
                <div className="flex items-center justify-between mb-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/10">
                    <Award className="w-[18px] h-[18px] text-brand" />
                  </div>
                  <span className="text-2xl font-bold gradient-text">{cert.score}</span>
                </div>

                {/* Certificate name */}
                <h3 className="text-sm font-bold mb-3 leading-snug">{cert.name}</h3>

                {/* Divider */}
                <div className="h-px bg-border/60 mb-3" />

                {/* Issuer + date */}
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-muted-foreground">{cert.issuer}</span>
                  <span className="text-xs text-muted-foreground/70">{cert.date}</span>
                </div>

                {/* Link */}
                {cert.link && (
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-xs font-medium text-brand hover:text-brand-light transition-colors"
                  >
                    View Certificate
                    <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
