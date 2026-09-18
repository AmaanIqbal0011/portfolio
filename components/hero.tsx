'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowDown, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';

function ParticlesBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    let animationId = 0;
    let particles: { x: number; y: number; vx: number; vy: number; size: number; opacity: number }[] = [];

    const resize = () => {
      const ratio = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * ratio;
      canvas.height = canvas.offsetHeight * ratio;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
      particles = Array.from({ length: Math.min(42, Math.floor((canvas.offsetWidth * canvas.offsetHeight) / 26000)) }, () => ({
        x: Math.random() * canvas.offsetWidth,
        y: Math.random() * canvas.offsetHeight,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.24,
        size: Math.random() * 1.4 + 0.4,
        opacity: Math.random() * 0.28 + 0.08,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      particles.forEach(particle => {
        particle.x = (particle.x + particle.vx + canvas.offsetWidth) % canvas.offsetWidth;
        particle.y = (particle.y + particle.vy + canvas.offsetHeight) % canvas.offsetHeight;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 133, 255, ${particle.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 h-full w-full" aria-hidden="true" />;
}

function SpotlightEffect() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const springY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  useEffect(() => {
    const handleMouse = (event: MouseEvent) => {
      mouseX.set(event.clientX);
      mouseY.set(event.clientY);
    };
    window.addEventListener('mousemove', handleMouse, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouse);
  }, [mouseX, mouseY]);

  return <motion.div className="pointer-events-none fixed inset-0 z-0" style={{ background: useTransform([springX, springY], ([x, y]) => `radial-gradient(520px circle at ${x}px ${y}px, rgba(99,91,255,0.06), transparent 42%)`) }} />;
}

const fadeUp = (delay: number) => ({ initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const } });

export default function Hero() {
  return (
    <section id="home" className="relative flex min-h-[720px] items-center overflow-hidden pt-24 lg:min-h-screen">
      <SpotlightEffect />
      <div className="absolute inset-0 grid-bg grid-fade opacity-25" />
      <div className="pointer-events-none absolute left-1/2 top-0 h-[520px] w-[780px] -translate-x-1/2 rounded-full bg-brand/8 blur-[140px]" />
      <ParticlesBackground />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-5 pb-20 pt-16 sm:px-8 lg:pb-24 lg:pt-24">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-20">
          <div className="text-center lg:text-left">
            <motion.div {...fadeUp(0.15)} className="mb-7 inline-flex items-center gap-2 rounded-full border border-brand/20 bg-brand/5 px-3.5 py-2 text-[11px] font-semibold uppercase tracking-[0.16em] text-brand">
              <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" /><span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" /></span>
              Available for select projects
            </motion.div>

            <motion.p {...fadeUp(0.25)} className="mb-4 text-sm font-medium text-muted-foreground">Hello, I&apos;m Amaan Iqbal — also known as Manho.</motion.p>
            <motion.h1 {...fadeUp(0.32)} className="text-5xl font-bold leading-[1.02] tracking-[-0.055em] sm:text-6xl lg:text-[76px]">
              Building the <span className="gradient-text">intelligence</span> behind ambitious products.
            </motion.h1>
            <motion.p {...fadeUp(0.42)} className="mx-auto mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg lg:mx-0">
              I design and ship production-ready AI agents, automation systems, and SaaS products that turn complex workflows into simple, scalable experiences.
            </motion.p>

            <motion.div {...fadeUp(0.52)} className="mt-9 flex flex-col justify-center gap-3 sm:flex-row lg:justify-start">
              <a href="#projects" className="group inline-flex items-center justify-center gap-2.5 rounded-xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background shadow-[0_14px_30px_-16px_rgba(15,23,42,0.55)] transition-all hover:-translate-y-0.5 hover:shadow-[0_18px_35px_-16px_rgba(99,91,255,0.5)]">Explore my work <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" /></a>
              <a href="#contact" className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-card/40 px-6 py-3.5 text-sm font-semibold transition-all hover:-translate-y-0.5 hover:border-brand/30 hover:bg-accent">Start a conversation</a>
            </motion.div>

            <motion.div {...fadeUp(0.64)} className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-xs text-muted-foreground lg:justify-start">
              {['AI agents', 'Automation systems', 'Full-stack SaaS'].map(item => <span key={item} className="inline-flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-brand" />{item}</span>)}
            </motion.div>
          </div>

          <motion.div {...fadeUp(0.38)} className="relative mx-auto w-full max-w-[430px] lg:mx-0 lg:ml-auto">
            <div className="absolute -inset-10 rounded-full bg-brand/12 blur-[80px]" />
            <div className="relative rounded-[28px] border border-white/30 bg-white/10 p-2 shadow-[0_30px_80px_-30px_rgba(15,23,42,0.45)] backdrop-blur-xl dark:border-white/10 dark:bg-white/[0.04]">
              <div className="relative aspect-[0.9] overflow-hidden rounded-[22px] bg-muted">
                <Image src="/me1.png" alt="Amaan Iqbal — AI Agent Developer" fill sizes="(max-width: 1024px) 430px, 38vw" className="object-cover object-center" priority />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                <div className="absolute inset-x-5 bottom-5 flex items-end justify-between text-white">
                  <div><p className="text-sm font-semibold">AI Agent Developer</p><p className="mt-1 text-xs text-white/65">Building what&apos;s next</p></div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/15 bg-white/10 backdrop-blur-md"><Sparkles className="h-4 w-4 text-brand-light" /></div>
                </div>
              </div>
            </div>
            <div className="absolute -left-5 top-12 hidden items-center gap-2 rounded-2xl border border-border/70 bg-card/85 px-3.5 py-3 shadow-xl backdrop-blur-xl sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-500"><CheckCircle2 className="h-4 w-4" /></span><div><p className="text-xs font-semibold">Production ready</p><p className="text-[10px] text-muted-foreground">From idea to launch</p></div></div>
            <div className="absolute -right-5 bottom-12 hidden items-center gap-2 rounded-2xl border border-border/70 bg-card/85 px-3.5 py-3 shadow-xl backdrop-blur-xl sm:flex"><span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand/10 text-brand"><Sparkles className="h-4 w-4" /></span><div><p className="text-xs font-semibold">AI-native thinking</p><p className="text-[10px] text-muted-foreground">Agents · systems · SaaS</p></div></div>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.78)} className="mt-20 grid grid-cols-2 gap-3 border-t border-border/70 pt-6 sm:grid-cols-4">
          {[['05+', 'Core disciplines'], ['10+', 'Products & systems'], ['24/7', 'Curious mindset'], ['100%', 'Built with intent']].map(([value, label]) => <div key={label} className="px-2 sm:px-4"><p className="text-xl font-bold tracking-tight sm:text-2xl">{value}</p><p className="mt-1 text-[11px] text-muted-foreground sm:text-xs">{label}</p></div>)}
        </motion.div>
      </div>

      <motion.a href="#about" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3 }} className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground/60 md:flex">Scroll to explore <ArrowDown className="h-3.5 w-3.5 animate-bounce" /></motion.a>
    </section>
  );
}
