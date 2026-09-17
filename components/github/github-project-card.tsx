'use client';

import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { SiGithub } from 'react-icons/si';
import type { MappedProject } from '@/lib/github/types';

interface Props {
  project: MappedProject;
  index: number;
}

export default function GitHubProjectCard({ project, index }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
      className="group relative flex flex-col rounded-2xl border border-border/60 bg-card/50 overflow-hidden hover:border-brand/20 hover:shadow-[0_8px_30px_-12px_rgba(129,140,248,0.12)] transition-all duration-500"
    >
      {/* Image Section */}
      <div className="relative aspect-[16/10] bg-gradient-to-br from-muted/50 to-muted overflow-hidden">
        {project.customImage ? (
          <img
            src={project.customImage}
            alt={project.displayName}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex flex-col items-center gap-3">
              <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-background/80 backdrop-blur-sm border border-border/60 group-hover:scale-110 group-hover:shadow-lg transition-all duration-500">
                <SiGithub className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors" />
              </div>
              <span className="text-xs font-medium text-muted-foreground/70">{project.displayName}</span>
            </div>
          </div>
        )}

        {/* Featured Badge */}
        {project.isFeatured && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider rounded-full bg-brand/90 text-white shadow-lg">
              Featured
            </span>
          </div>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Quick Action on Hover */}
        <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-background/90 backdrop-blur-sm border border-border/60 hover:bg-background transition-colors"
          >
            <SiGithub className="w-3 h-3" />
            View
          </a>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        <p className="text-[11px] font-semibold uppercase tracking-wider text-brand mb-2">
          {project.categoryLabel}
        </p>

        {/* Title */}
        <h3 className="text-base font-bold mb-2 group-hover:text-brand transition-colors duration-300">
          {project.displayName}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1 line-clamp-2">
          {project.description}
        </p>

        {/* Tech Stack */}
        {project.topics.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.topics.slice(0, 3).map(topic => (
              <span
                key={topic}
                className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/50 text-accent-foreground border border-border/40"
              >
                {topic}
              </span>
            ))}
            {project.topics.length > 3 && (
              <span className="px-2 py-0.5 text-[10px] font-medium rounded-md bg-accent/50 text-accent-foreground border border-border/40">
                +{project.topics.length - 3}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-2 mt-4">
          {project.homepage && (
            <a
              href={project.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              <Globe className="w-3 h-3" />
              Live Demo
            </a>
          )}
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex items-center justify-center gap-1.5 px-3 py-2 text-xs font-semibold rounded-xl border border-border hover:bg-accent hover:border-brand/20 transition-all ${!project.homepage ? 'flex-1' : ''}`}
          >
            <SiGithub className="w-3 h-3" />
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}
