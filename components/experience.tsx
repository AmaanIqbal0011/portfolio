'use client';

import ScrollReveal from './scroll-reveal';

interface TimelineItem {
  period: string;
  title: string;
  description: string;
  type: 'education' | 'certification' | 'project';
}

const TIMELINE: TimelineItem[] = [
  {
    period: '2023',
    title: 'Computer Science & AI Studies',
    description:
      'Began focused study in computer science with emphasis on artificial intelligence, software engineering, and modern web development.',
    type: 'education',
  },
  {
    period: '2023',
    title: 'GIAIC — OpenAI Agent SDK',
    description:
      'Completed GIAIC training on the OpenAI Agent SDK, building foundational skills in agent architecture, tool calling, and agentic AI systems.',
    type: 'certification',
  },
  {
    period: '2023',
    title: 'PIAIC — Prompt Engineering',
    description:
      'Completed PIAIC prompt engineering program, mastering advanced prompting techniques, LLM application design, and AI-powered workflows.',
    type: 'certification',
  },
  {
    period: '2024',
    title: 'n8n Automation Certification',
    description:
      'Achieved Level 1 certification in n8n for workflow automation, building automated systems that connect APIs, databases, and AI models.',
    type: 'certification',
  },
  {
    period: '2024',
    title: 'AI Agent Development',
    description:
      'Deep dive into building production AI agents using OpenAI Agent SDK, LangChain, and custom tool-calling architectures.',
    type: 'project',
  },
  {
    period: '2024–25',
    title: 'ContentPilot.media',
    description:
      'Building an AI-powered content repurposing SaaS — from concept to production. Full-stack development with Next.js, AI APIs, and social platform integrations.',
    type: 'project',
  },
  {
    period: '2025',
    title: 'SaaS & Agent Product Development',
    description:
      'Continuing to build AI agents, AI employees, automation systems, and production SaaS products. Focused on the next generation of agentic software.',
    type: 'project',
  },
];

const TYPE_COLORS: Record<TimelineItem['type'], string> = {
  education: 'bg-blue-500/10 text-blue-400 border-blue-500/20',
  certification: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  project: 'bg-brand/10 text-brand border-brand/20',
};

const TYPE_LABELS: Record<TimelineItem['type'], string> = {
  education: 'Education',
  certification: 'Certification',
  project: 'Project',
};

const TYPE_DOT_COLORS: Record<TimelineItem['type'], string> = {
  education: 'bg-blue-400',
  certification: 'bg-emerald-400',
  project: 'bg-brand',
};

export default function Experience() {
  return (
    <section id="journey" className="relative py-28 sm:py-36">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-12">
            Experience &amp; Education
          </h2>
        </ScrollReveal>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[15px] sm:left-[23px] top-0 bottom-0 w-px bg-gradient-to-b from-border via-border to-transparent" />

          <div className="space-y-8">
            {TIMELINE.map((item, i) => (
              <ScrollReveal key={`${item.period}-${item.title}`} delay={i * 0.05}>
                <div className="relative flex gap-4 sm:gap-6 pl-0">
                  {/* Dot */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div className={`w-8 h-8 sm:w-12 sm:h-12 rounded-full border-2 flex items-center justify-center ${TYPE_COLORS[item.type]}`}>
                      <div className={`w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full ${TYPE_DOT_COLORS[item.type]}`} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex-1 pb-2">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="text-xs font-medium text-muted-foreground">{item.period}</span>
                      <span className={`px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border ${TYPE_COLORS[item.type]}`}>
                        {TYPE_LABELS[item.type]}
                      </span>
                    </div>
                    <h3 className="text-base font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
