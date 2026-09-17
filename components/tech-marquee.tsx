'use client';

import {
  SiNextdotjs, SiTypescript, SiPython, SiTailwindcss,
  SiReact, SiPostgresql,
} from 'react-icons/si';

const TECH_STACK = [
  { name: 'Next.js', icon: SiNextdotjs },
  { name: 'React', icon: SiReact },
  { name: 'TypeScript', icon: SiTypescript },
  { name: 'Python', icon: SiPython },
  { name: 'FastAPI', icon: SiPython },
  { name: 'OpenAI', icon: null },
  { name: 'OpenAI Agent SDK', icon: null },
  { name: 'Gemini', icon: null },
  { name: 'Neon', icon: SiPostgresql },
  { name: 'PostgreSQL', icon: SiPostgresql },
  { name: 'Prisma', icon: null },
  { name: 'Tailwind CSS', icon: SiTailwindcss },
  { name: 'n8n', icon: null },
  { name: 'Trigger.dev', icon: null },
  { name: 'Vercel', icon: null },
  { name: 'GitHub', icon: null },
];

export default function TechMarquee() {
  const items = [...TECH_STACK, ...TECH_STACK];

  return (
    <section className="relative py-20 sm:py-24 border-y border-border overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8 mb-10">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
          Built With
        </p>
      </div>

      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-48 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        <div className="flex animate-marquee">
          {items.map(({ name, icon: Icon }, i) => (
            <div
              key={`${name}-${i}`}
              className="flex items-center gap-2 px-5 py-3 mx-1.5 rounded-xl border border-border bg-card/20 text-sm font-medium text-muted-foreground whitespace-nowrap shrink-0 hover:border-brand/20 hover:text-foreground hover:bg-card/40 transition-all duration-300 cursor-default"
            >
              {Icon && <Icon className="w-4 h-4" />}
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
