'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Zap, Bot, Rocket, Brain, Users, ArrowRight, ArrowLeft,
  Search, Code, Database, Mail, Calendar, Globe, MessageSquare,
  BarChart3, FileText, Shield, Sparkles, Target, Lightbulb,
  CheckCircle2, GitBranch, Layers, Workflow, Clock,
} from 'lucide-react';
import ScrollReveal from './scroll-reveal';

/* -------------------------------------------------------------------------- */
/*  Step data                                                                  */
/* -------------------------------------------------------------------------- */

interface WorkflowNode {
  id: string;
  label: string;
  sublabel: string;
  icon: React.ElementType;
  accent: string;
  bgAccent: string;
}

interface StepData {
  id: number;
  title: string;
  tagline: string;
  nodes: WorkflowNode[];
}

const STEPS: StepData[] = [
  {
    id: 1,
    title: 'AI Automation',
    tagline: 'AI follows a fixed workflow — trigger, process, act.',
    nodes: [
      { id: 'trigger', label: 'New Lead', sublabel: 'Form submitted', icon: Zap, accent: 'text-amber-500', bgAccent: 'bg-amber-500/10 border-amber-500/20' },
      { id: 'ai', label: 'AI Qualifies', sublabel: 'Analyzes intent', icon: Brain, accent: 'text-brand', bgAccent: 'bg-brand/10 border-brand/20' },
      { id: 'action', label: 'CRM Updated', sublabel: 'Record created', icon: Database, accent: 'text-emerald-500', bgAccent: 'bg-emerald-500/10 border-emerald-500/20' },
      { id: 'result', label: 'Team Notified', sublabel: 'Slack message', icon: Mail, accent: 'text-purple-500', bgAccent: 'bg-purple-500/10 border-purple-500/20' },
    ],
  },
  {
    id: 2,
    title: 'AI Agents',
    tagline: 'AI that reasons — decides what to do next.',
    nodes: [
      { id: 'goal', label: 'Find Leads', sublabel: 'The objective', icon: Target, accent: 'text-amber-500', bgAccent: 'bg-amber-500/10 border-amber-500/20' },
      { id: 'agent', label: 'Agent', sublabel: 'Thinks & plans', icon: Bot, accent: 'text-brand', bgAccent: 'bg-brand/10 border-brand/20' },
      { id: 'tools', label: 'Uses Tools', sublabel: 'Search, API, Code', icon: Search, accent: 'text-emerald-500', bgAccent: 'bg-emerald-500/10 border-emerald-500/20' },
      { id: 'decide', label: 'Decides', sublabel: 'Best next step', icon: GitBranch, accent: 'text-purple-500', bgAccent: 'bg-purple-500/10 border-purple-500/20' },
      { id: 'act', label: 'Executes', sublabel: 'Task complete', icon: CheckCircle2, accent: 'text-pink-500', bgAccent: 'bg-pink-500/10 border-pink-500/20' },
    ],
  },
  {
    id: 3,
    title: 'SaaS Builder',
    tagline: 'From idea to a complete AI-powered product.',
    nodes: [
      { id: 'idea', label: 'Idea', sublabel: 'Content Assistant', icon: Lightbulb, accent: 'text-amber-500', bgAccent: 'bg-amber-500/10 border-amber-500/20' },
      { id: 'agent', label: 'AI Agent', sublabel: 'Processes content', icon: Bot, accent: 'text-brand', bgAccent: 'bg-brand/10 border-brand/20' },
      { id: 'backend', label: 'Backend', sublabel: 'Data & APIs', icon: Layers, accent: 'text-emerald-500', bgAccent: 'bg-emerald-500/10 border-emerald-500/20' },
      { id: 'dashboard', label: 'Dashboard', sublabel: 'User interface', icon: BarChart3, accent: 'text-purple-500', bgAccent: 'bg-purple-500/10 border-purple-500/20' },
      { id: 'product', label: 'SaaS Product', sublabel: 'Ready to ship', icon: Rocket, accent: 'text-pink-500', bgAccent: 'bg-pink-500/10 border-pink-500/20' },
    ],
  },
  {
    id: 4,
    title: 'Context & Memory',
    tagline: 'AI that remembers — personalizing every response.',
    nodes: [
      { id: 'user', label: 'User', sublabel: 'Sends a message', icon: Users, accent: 'text-amber-500', bgAccent: 'bg-amber-500/10 border-amber-500/20' },
      { id: 'context', label: 'Context', sublabel: 'Preferences & history', icon: Clock, accent: 'text-brand', bgAccent: 'bg-brand/10 border-brand/20' },
      { id: 'memory', label: 'Memory', sublabel: 'Learns over time', icon: Brain, accent: 'text-emerald-500', bgAccent: 'bg-emerald-500/10 border-emerald-500/20' },
      { id: 'ai', label: 'AI', sublabel: 'Understands deeply', icon: Sparkles, accent: 'text-purple-500', bgAccent: 'bg-purple-500/10 border-purple-500/20' },
      { id: 'result', label: 'Response', sublabel: 'Truly personalized', icon: MessageSquare, accent: 'text-pink-500', bgAccent: 'bg-pink-500/10 border-pink-500/20' },
    ],
  },
  {
    id: 5,
    title: 'AI Employee',
    tagline: 'AI that works for you — full autonomy with tools.',
    nodes: [
      { id: 'goal', label: 'Goal', sublabel: 'Weekly report', icon: Target, accent: 'text-amber-500', bgAccent: 'bg-amber-500/10 border-amber-500/20' },
      { id: 'plan', label: 'Plans', sublabel: 'Breaks it down', icon: Brain, accent: 'text-brand', bgAccent: 'bg-brand/10 border-brand/20' },
      { id: 'tools', label: 'Uses Tools', sublabel: 'Email, Calendar, DB', icon: Workflow, accent: 'text-emerald-500', bgAccent: 'bg-emerald-500/10 border-emerald-500/20' },
      { id: 'execute', label: 'Executes', sublabel: 'Delivers results', icon: CheckCircle2, accent: 'text-purple-500', bgAccent: 'bg-purple-500/10 border-purple-500/20' },
      { id: 'learn', label: 'Remembers', sublabel: 'Improves next time', icon: Sparkles, accent: 'text-pink-500', bgAccent: 'bg-pink-500/10 border-pink-500/20' },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/*  Sidebar item                                                               */
/* -------------------------------------------------------------------------- */

interface SidebarItemProps {
  step: StepData;
  isActive: boolean;
  isCompleted: boolean;
  onClick: () => void;
}

function SidebarItem({ step, isActive, isCompleted, onClick }: SidebarItemProps) {
  return (
    <button
      onClick={onClick}
      className={`group relative flex items-start gap-3.5 w-full px-4 py-3.5 rounded-xl text-left transition-all duration-300 ${
        isActive
          ? 'bg-brand/10 border border-brand/20 shadow-[0_0_24px_-8px_rgba(129,140,248,0.18)]'
          : 'hover:bg-accent/60 border border-transparent hover:border-border'
      }`}
    >
      <div
        className={`flex items-center justify-center w-9 h-9 rounded-lg shrink-0 transition-all duration-300 ${
          isActive
            ? 'bg-brand text-white shadow-[0_0_12px_-2px_rgba(99,102,241,0.4)]'
            : isCompleted
            ? 'bg-brand/15 text-brand'
            : 'bg-accent text-muted-foreground group-hover:bg-accent/80'
        }`}
      >
        {isCompleted ? (
          <CheckCircle2 className="w-4 h-4" />
        ) : (
          <span className="text-xs font-bold">{String(step.id).padStart(2, '0')}</span>
        )}
      </div>
      <div className="min-w-0 pt-0.5">
        <p
          className={`text-sm font-semibold leading-tight transition-colors duration-200 ${
            isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
          }`}
        >
          {step.title}
        </p>
        <p className="text-[11px] text-muted-foreground/60 mt-0.5 leading-snug">
          {step.tagline}
        </p>
      </div>
      {isActive && (
        <motion.div
          layoutId="sidebar-indicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 rounded-full bg-brand"
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
        />
      )}
    </button>
  );
}

/* -------------------------------------------------------------------------- */
/*  Workflow visualization components                                           */
/* -------------------------------------------------------------------------- */

/* ---------- Shared: Flow node card ---------- */
function FlowNodeCard({
  node,
  delay,
  isActive,
}: {
  node: WorkflowNode;
  delay: number;
  isActive: boolean;
}) {
  const Icon = node.icon;
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7, y: 12 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="group/node flex flex-col items-center gap-2.5"
    >
      <div
        className={`relative flex items-center justify-center w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-2xl border transition-all duration-300 cursor-default ${node.bgAccent} ${
          isActive ? 'animate-node-pulse' : ''
        } group-hover/node:scale-105 group-hover/node:shadow-[0_0_24px_-6px_rgba(129,140,248,0.15)]`}
      >
        <Icon className={`w-7 h-7 sm:w-8 sm:h-8 ${node.accent}`} />
      </div>
      <div className="text-center">
        <p className="text-xs sm:text-sm font-semibold text-foreground leading-tight">{node.label}</p>
        <p className="text-[10px] sm:text-[11px] text-muted-foreground/60 mt-0.5">{node.sublabel}</p>
      </div>
    </motion.div>
  );
}

/* ---------- Shared: Arrow connector ---------- */
function FlowArrow({ delay, index }: { delay: number; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleX: 0 }}
      animate={{ opacity: 1, scaleX: 1 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex items-center gap-0 mx-1 sm:mx-2 my-4 sm:my-0"
    >
      <div className="relative w-8 sm:w-12 lg:w-16 h-px bg-gradient-to-r from-brand/25 to-brand/10">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute top-0 left-0 w-4 h-px bg-brand/60 animate-data-flow"
            style={{ animationDelay: `${index * 0.6}s` }}
          />
        </div>
      </div>
      <ArrowRight className="w-3 h-3 text-brand/40 -ml-1 shrink-0" />
    </motion.div>
  );
}

/* ---------- Shared: Vertical arrow ---------- */
function FlowArrowVertical({ delay }: { delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scaleY: 0 }}
      animate={{ opacity: 1, scaleY: 1 }}
      transition={{ delay, duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col items-center gap-0 my-2 sm:my-3 mx-auto"
    >
      <div className="relative w-px h-6 sm:h-8 bg-gradient-to-b from-brand/25 to-brand/10">
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute left-0 top-0 w-px h-3 bg-brand/60"
            style={{
              animation: 'data-flow 2.4s ease-in-out infinite',
              animationDirection: 'normal',
            }}
          />
        </div>
      </div>
      <svg className="w-3 h-3 text-brand/40 -mt-0.5" viewBox="0 0 12 12" fill="none">
        <path d="M6 2v8M3 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </motion.div>
  );
}

/* ---------- Step 01: AI Automation (horizontal) ---------- */
function AutomationWorkflow({ isActive }: { isActive: boolean }) {
  const nodes = STEPS[0].nodes;
  return (
    <div className="flex flex-col items-center">
      {/* Horizontal flow */}
      <div className="flex items-center justify-center flex-wrap gap-y-5">
        {nodes.map((node, i) => (
          <div key={node.id} className="flex items-center">
            <FlowNodeCard node={node} delay={i * 0.12} isActive={isActive && i === 1} />
            {i < nodes.length - 1 && <FlowArrow delay={i * 0.12 + 0.1} index={i} />}
          </div>
        ))}
      </div>
      {/* Example strip */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="mt-8 px-5 py-3 rounded-xl bg-accent/50 border border-border/50 text-xs sm:text-[13px] text-muted-foreground max-w-md text-center"
      >
        <span className="font-medium text-foreground">Example:</span>{' '}
        New customer message → AI understands request → Generates reply → Customer gets instant response
      </motion.div>
    </div>
  );
}

/* ---------- Step 02: AI Agents (branching from center) ---------- */
function AgentsWorkflow({ isActive }: { isActive: boolean }) {
  const tools = [
    { label: 'Search', icon: Search, accent: 'text-blue-400' },
    { label: 'Code', icon: Code, accent: 'text-emerald-400' },
    { label: 'APIs', icon: Globe, accent: 'text-purple-400' },
    { label: 'Database', icon: Database, accent: 'text-amber-400' },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Goal → Agent → Decide flow */}
      <div className="flex items-center justify-center flex-wrap gap-y-5">
        <FlowNodeCard node={STEPS[1].nodes[0]} delay={0} isActive={false} />
        <FlowArrow delay={0.1} index={0} />
        <FlowNodeCard node={STEPS[1].nodes[1]} delay={0.12} isActive={isActive} />
        <FlowArrow delay={0.22} index={1} />
        <FlowNodeCard node={STEPS[1].nodes[3]} delay={0.24} isActive={false} />
        <FlowArrow delay={0.34} index={2} />
        <FlowNodeCard node={STEPS[1].nodes[4]} delay={0.36} isActive={false} />
      </div>

      {/* Tools branching from agent */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.4 }}
        className="flex flex-col items-center gap-3"
      >
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/50">
          The Agent Can Choose
        </p>
        <div className="flex items-center gap-3 flex-wrap justify-center">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.35 }}
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg border border-border/60 bg-card/50 hover:border-brand/20 hover:bg-brand/5 transition-all duration-300 cursor-default"
              >
                <Icon className={`w-3.5 h-3.5 ${tool.accent}`} />
                <span className="text-xs font-medium text-muted-foreground">{tool.label}</span>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Example */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="px-5 py-3 rounded-xl bg-accent/50 border border-border/50 text-xs sm:text-[13px] text-muted-foreground max-w-md text-center"
      >
        <span className="font-medium text-foreground">Key difference:</span>{' '}
        An agent doesn&apos;t just follow a workflow — it <span className="font-medium text-brand">decides</span> what to do next.
      </motion.div>
    </div>
  );
}

/* ---------- Step 03: SaaS Builder (vertical with mockup) ---------- */
function SaaSWorkflow({ isActive }: { isActive: boolean }) {
  return (
    <div className="flex flex-col items-center gap-2">
      {/* Vertical flow */}
      <div className="flex flex-col items-center">
        {STEPS[2].nodes.map((node, i) => (
          <div key={node.id} className="flex flex-col items-center">
            <FlowNodeCard node={node} delay={i * 0.12} isActive={isActive && i === 1} />
            {i < STEPS[2].nodes.length - 1 && <FlowArrowVertical delay={i * 0.12 + 0.1} />}
          </div>
        ))}
      </div>

      {/* Mini product preview mockup */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.5 }}
        className="mt-4 w-full max-w-sm"
      >
        <div className="rounded-xl border border-border/60 bg-card/40 overflow-hidden shadow-lg shadow-black/5">
          {/* Mockup header */}
          <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border/40 bg-accent/30">
            <div className="flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-red-400/60" />
              <div className="w-2 h-2 rounded-full bg-amber-400/60" />
              <div className="w-2 h-2 rounded-full bg-emerald-400/60" />
            </div>
            <div className="flex-1 mx-8">
              <div className="h-4 rounded bg-border/40 w-full" />
            </div>
          </div>
          {/* Mockup body */}
          <div className="p-4 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-brand" />
              </div>
              <div className="flex-1">
                <div className="h-2.5 rounded bg-border/50 w-3/4 mb-1.5" />
                <div className="h-2 rounded bg-border/30 w-1/2" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((j) => (
                <div key={j} className="h-14 rounded-lg bg-accent/40 border border-border/30" />
              ))}
            </div>
            <div className="h-2 rounded bg-border/30 w-full" />
            <div className="h-2 rounded bg-border/30 w-2/3" />
          </div>
        </div>
        <p className="text-center text-[11px] text-muted-foreground/50 mt-2 font-medium">
          Your idea, deployed as a real product
        </p>
      </motion.div>
    </div>
  );
}

/* ---------- Step 04: Context & Memory (central + floating cards) ---------- */
function MemoryWorkflow({ isActive }: { isActive: boolean }) {
  const memoryCards = [
    { label: 'Preferences', icon: Shield, delay: 0.5 },
    { label: 'History', icon: Clock, delay: 0.6 },
    { label: 'Goals', icon: Target, delay: 0.7 },
    { label: 'Projects', icon: FileText, delay: 0.8 },
  ];

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Top: User node */}
      <FlowNodeCard node={STEPS[3].nodes[0]} delay={0} isActive={false} />

      <FlowArrowVertical delay={0.1} />

      {/* Center: AI with memory cards orbiting */}
      <div className="relative flex items-center justify-center py-4">
        {/* Floating memory cards */}
        <div className="absolute inset-0 flex items-center justify-center">
          {memoryCards.map((card, i) => {
            const Icon = card.icon;
            const positions = [
              '-translate-x-[120px] sm:-translate-x-[140px] -translate-y-2',
              'translate-x-[120px] sm:translate-x-[140px] -translate-y-2',
              '-translate-x-[80px] sm:-translate-x-[100px] translate-y-12',
              'translate-x-[80px] sm:translate-x-[100px] translate-y-12',
            ];
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: card.delay, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className={`absolute ${positions[i]} animate-memory-drift`}
                style={{ animationDelay: `${i * 1.2}s` }}
              >
                <div className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border/50 bg-card/60 backdrop-blur-sm shadow-sm cursor-default hover:border-brand/20 transition-colors duration-300">
                  <Icon className="w-3.5 h-3.5 text-brand/70" />
                  <span className="text-[11px] font-medium text-muted-foreground whitespace-nowrap">
                    {card.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Central AI node */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <div className={`flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-2xl border-2 border-brand/20 bg-brand/5 ${isActive ? 'animate-node-pulse' : ''}`}>
            <Sparkles className="w-9 h-9 sm:w-10 sm:h-10 text-brand" />
          </div>
        </motion.div>
      </div>

      {/* Result */}
      <FlowArrowVertical delay={0.4} />
      <FlowNodeCard node={STEPS[3].nodes[4]} delay={0.45} isActive={false} />

      {/* Example */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="px-5 py-3 rounded-xl bg-accent/50 border border-border/50 text-xs sm:text-[13px] text-muted-foreground max-w-md text-center"
      >
        <span className="font-medium text-foreground">The result:</span>{' '}
        AI doesn&apos;t just respond — it <span className="font-medium text-brand">understands the context</span> of who you are and what you need.
      </motion.div>
    </div>
  );
}

/* ---------- Step 05: AI Employee (central hub + orbiting tools) ---------- */
function EmployeeWorkflow({ isActive }: { isActive: boolean }) {
  const employeeTools = [
    { label: 'Email', icon: Mail, color: 'text-blue-400', bg: 'bg-blue-400/8 border-blue-400/15' },
    { label: 'Calendar', icon: Calendar, color: 'text-emerald-400', bg: 'bg-emerald-400/8 border-emerald-400/15' },
    { label: 'CRM', icon: Database, color: 'text-amber-400', bg: 'bg-amber-400/8 border-amber-400/15' },
    { label: 'Browser', icon: Globe, color: 'text-purple-400', bg: 'bg-purple-400/8 border-purple-400/15' },
    { label: 'Code', icon: Code, color: 'text-pink-400', bg: 'bg-pink-400/8 border-pink-400/15' },
    { label: 'Reports', icon: BarChart3, color: 'text-cyan-400', bg: 'bg-cyan-400/8 border-cyan-400/15' },
  ];

  return (
    <div className="flex flex-col items-center gap-5">
      {/* Goal → Plan flow */}
      <div className="flex items-center justify-center flex-wrap gap-y-5">
        <FlowNodeCard node={STEPS[4].nodes[0]} delay={0} isActive={false} />
        <FlowArrow delay={0.1} index={0} />
        <FlowNodeCard node={STEPS[4].nodes[1]} delay={0.12} isActive={isActive} />
        <FlowArrow delay={0.22} index={1} />
        <FlowNodeCard node={STEPS[4].nodes[2]} delay={0.24} isActive={false} />
      </div>

      {/* Central AI Employee card with tools orbiting */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="relative w-full max-w-lg mx-auto py-8"
      >
        {/* Central card */}
        <div className="relative z-10 mx-auto w-fit">
          <div className={`flex items-center gap-3 px-6 py-4 rounded-2xl border-2 border-brand/20 bg-brand/5 shadow-[0_0_32px_-8px_rgba(129,140,248,0.12)] ${isActive ? 'animate-node-pulse' : ''}`}>
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-brand/15">
              <Bot className="w-5 h-5 text-brand" />
            </div>
            <div>
              <p className="text-sm font-bold text-foreground">AI Employee</p>
              <p className="text-[11px] text-muted-foreground/60">Working autonomously</p>
            </div>
          </div>
        </div>

        {/* Orbiting tools */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {employeeTools.map((tool, i) => {
            const Icon = tool.icon;
            const angle = (i / employeeTools.length) * Math.PI * 2 - Math.PI / 2;
            const radius = typeof window !== 'undefined' && window.innerWidth < 640 ? 100 : 140;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            return (
              <motion.div
                key={tool.label}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.07, duration: 0.4 }}
                className="absolute pointer-events-auto"
                style={{ transform: `translate(${x}px, ${y}px)` }}
              >
                <div
                  className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border bg-card/60 backdrop-blur-sm cursor-default hover:scale-110 transition-transform duration-300 ${tool.bg}`}
                  style={{ animation: `tool-orbit 3s ease-in-out ${i * 0.4}s infinite` }}
                >
                  <Icon className={`w-3.5 h-3.5 ${tool.color}`} />
                  <span className="text-[10px] font-medium text-muted-foreground hidden sm:inline">
                    {tool.label}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>

      {/* Execute → Learn flow */}
      <div className="flex items-center justify-center flex-wrap gap-y-5">
        <FlowNodeCard node={STEPS[4].nodes[3]} delay={0.7} isActive={false} />
        <FlowArrow delay={0.8} index={3} />
        <FlowNodeCard node={STEPS[4].nodes[4]} delay={0.82} isActive={false} />
      </div>

      {/* Example */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        className="px-5 py-3 rounded-xl bg-accent/50 border border-border/50 text-xs sm:text-[13px] text-muted-foreground max-w-md text-center"
      >
        <span className="font-medium text-foreground">Example:</span>{' '}
        &ldquo;Prepare my weekly report&rdquo; → Collects data from email, calendar & CRM → Analyzes → Creates report → Sends it → Remembers for next time.
      </motion.div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step content wrapper                                                       */
/* -------------------------------------------------------------------------- */

function StepContent({ step, isActive }: { step: StepData; isActive: boolean }) {
  const renderWorkflow = () => {
    switch (step.id) {
      case 1: return <AutomationWorkflow isActive={isActive} />;
      case 2: return <AgentsWorkflow isActive={isActive} />;
      case 3: return <SaaSWorkflow isActive={isActive} />;
      case 4: return <MemoryWorkflow isActive={isActive} />;
      case 5: return <EmployeeWorkflow isActive={isActive} />;
      default: return null;
    }
  };

  return (
    <motion.div
      key={step.id}
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -24 }}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="flex flex-col"
    >
      {/* Step title area */}
      <div className="mb-8">
        <div className="flex items-center gap-2.5 mb-2">
          <span className="text-xs font-bold uppercase tracking-wider text-brand">
            Step {String(step.id).padStart(2, '0')}
          </span>
          <div className="h-px flex-1 max-w-12 bg-border" />
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm max-w-lg leading-relaxed">
          {step.tagline}
        </p>
      </div>

      {/* Visualization area */}
      <div className="relative flex-1 min-h-[380px] sm:min-h-[420px] rounded-2xl border border-border bg-card/30 p-5 sm:p-8 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none" />
        {/* Subtle radial glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-brand/3 rounded-full blur-[80px]" />
        </div>

        <div className="relative z-10">
          {renderWorkflow()}
        </div>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Main component                                                             */
/* -------------------------------------------------------------------------- */

export default function AgentArchitecture() {
  const [currentStep, setCurrentStep] = useState(0);

  const step = STEPS[currentStep];

  const goNext = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, STEPS.length - 1));
  }, []);

  const goBack = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <section id="ideas" className="relative py-28 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        {/* ---- Header ---- */}
        <ScrollReveal>
          <div className="flex items-center gap-3 mb-4">
            <div className="h-px flex-1 max-w-12 bg-border" />
            <span className="text-xs font-semibold uppercase tracking-widest text-brand">
              How I Think About AI
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">
            From Automation <span className="text-muted-foreground">to</span>{' '}
            <span className="gradient-text">AI Employees</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-2xl mb-10">
            A simple evolution of how intelligent systems can automate tasks, use tools, understand context, and work autonomously.
          </p>
        </ScrollReveal>

        {/* ---- Progress indicator ---- */}
        <ScrollReveal delay={0.1}>
          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold text-foreground">
                {String(currentStep + 1).padStart(2, '0')}
              </span>
              <span className="text-sm text-muted-foreground/50 font-medium">/ {String(STEPS.length).padStart(2, '0')}</span>
            </div>
            <div className="flex-1 max-w-xs">
              <div className="h-1.5 rounded-full bg-border/60 overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-light"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                />
              </div>
            </div>
            <span className="text-xs font-semibold text-muted-foreground/60 uppercase tracking-wider hidden sm:block">
              {step.title}
            </span>
          </div>
        </ScrollReveal>

        {/* ---- Main content ---- */}
        <div className="grid lg:grid-cols-[260px_1fr] gap-8 lg:gap-10">
          {/* Left: Step navigation */}
          <div className="flex lg:flex-col gap-1.5 overflow-x-auto lg:overflow-visible pb-2 lg:pb-0 scrollbar-none">
            {STEPS.map((s, i) => (
              <SidebarItem
                key={s.id}
                step={s}
                isActive={currentStep === i}
                isCompleted={i < currentStep}
                onClick={() => setCurrentStep(i)}
              />
            ))}
          </div>

          {/* Right: Step visualization */}
          <AnimatePresence mode="wait">
            <StepContent key={step.id} step={step} isActive={true} />
          </AnimatePresence>
        </div>

        {/* ---- Bottom controls ---- */}
        <div className="flex items-center justify-between mt-8">
          <button
            onClick={goBack}
            disabled={currentStep === 0}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl border border-border hover:bg-accent disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>

          {/* Dot indicators */}
          <div className="flex items-center gap-2">
            {STEPS.map((s, i) => (
              <button
                key={s.id}
                onClick={() => setCurrentStep(i)}
                className="group relative p-1"
                aria-label={`Go to step ${i + 1}: ${s.title}`}
              >
                <div
                  className={`transition-all duration-300 rounded-full ${
                    i === currentStep
                      ? 'w-7 h-2 bg-brand'
                      : i < currentStep
                      ? 'w-2 h-2 bg-brand/40 group-hover:bg-brand/60'
                      : 'w-2 h-2 bg-border group-hover:bg-muted-foreground/40'
                  }`}
                />
              </button>
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={currentStep === STEPS.length - 1}
            className="flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-xl bg-foreground text-background hover:opacity-90 disabled:opacity-25 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
}
