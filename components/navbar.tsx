'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, ArrowUpRight } from 'lucide-react';
import { useTheme } from './theme-provider';

const NAV_ITEMS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#projects' },
  { label: 'Capabilities', href: '#skills' },
  { label: 'Certificates', href: '#certificates' },
  { label: 'Journey', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: '-25% 0px -65% 0px', threshold: [0.05, 0.25, 0.5] }
    );
    NAV_ITEMS.forEach(({ href }) => {
      const element = document.getElementById(href.slice(1));
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed inset-x-0 top-0 z-50 px-4 sm:px-6 transition-all duration-300 ${scrolled ? 'pt-3' : 'pt-5'}`}
      >
        <nav className={`mx-auto flex h-[64px] max-w-6xl items-center justify-between rounded-2xl border px-3 sm:px-4 backdrop-blur-2xl transition-all duration-300 ${scrolled ? 'border-border/80 bg-card/90 shadow-[0_16px_45px_-20px_rgba(15,23,42,0.35)]' : 'border-border/60 bg-card/70 shadow-[0_10px_35px_-24px_rgba(15,23,42,0.3)]'}`}>
          <a href="#home" className="flex items-center gap-3 rounded-xl px-2 py-1.5" aria-label="Manho home">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-brand via-brand-light to-purple-400 text-sm font-bold text-white shadow-[0_8px_20px_-8px_rgba(99,91,255,0.8)]">M</span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">Manho<span className="text-brand">.</span></span>
          </a>

          <div className="hidden items-center gap-1 lg:flex">
            {NAV_ITEMS.map(({ label, href }) => {
              const isActive = activeSection === href.slice(1);
              return (
                <a key={label} href={href} className={`relative rounded-lg px-3.5 py-2 text-[13px] font-medium transition-colors ${isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                  {label}
                  {isActive && <motion.span layoutId="nav-active" className="absolute inset-x-2 -bottom-0.5 h-px bg-brand" transition={{ type: 'spring', damping: 25, stiffness: 300 }} />}
                </a>
              );
            })}
          </div>

          <div className="flex items-center gap-1.5">
            <a href="#contact" className="mr-1 hidden items-center gap-1 rounded-lg bg-foreground px-3.5 py-2 text-xs font-semibold text-background transition-opacity hover:opacity-85 sm:inline-flex">
              Let&apos;s talk <ArrowUpRight className="h-3.5 w-3.5" />
            </a>
            <button onClick={toggleTheme} aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? 'Close menu' : 'Open menu'} className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-accent hover:text-foreground lg:hidden">
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-40 bg-slate-950/45 backdrop-blur-sm lg:hidden" onClick={closeMobile} />
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="fixed left-4 right-4 top-[84px] z-50 rounded-2xl border border-border bg-card/95 p-3 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.5)] lg:hidden">
              <div className="flex flex-col gap-1">
                {NAV_ITEMS.map(({ label, href }) => (
                  <a key={label} href={href} onClick={closeMobile} className="rounded-xl px-4 py-3.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-foreground">{label}</a>
                ))}
                <a href="#contact" onClick={closeMobile} className="mt-2 flex items-center justify-center gap-2 rounded-xl bg-foreground px-4 py-3.5 text-sm font-semibold text-background">Let&apos;s work together <ArrowUpRight className="h-4 w-4" /></a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
