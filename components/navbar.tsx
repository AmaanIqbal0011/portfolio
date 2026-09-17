'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from './theme-provider';

const NAV_LEFT = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Certifications', href: '#certificates' },
] as const;

const NAV_RIGHT = [
  { label: 'Projects', href: '#projects' },
  { label: 'Ideas', href: '#ideas' },
  { label: 'Experience', href: '#journey' },
  { label: 'Contact', href: '#contact' },
] as const;

const NAV_ALL = [...NAV_LEFT, ...NAV_RIGHT] as const;

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_ALL.map(l => l.href.slice(1));
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            break;
          }
        }
      },
      { rootMargin: '-30% 0px -60% 0px' }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  const NavLink = ({ label, href }: { label: string; href: string }) => {
    const isActive = activeSection === href.slice(1);
    return (
      <a
        href={href}
        className={`relative px-3.5 py-2 text-sm font-medium rounded-full transition-colors duration-200 ${
          isActive
            ? 'text-foreground'
            : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        {label}
        {isActive && (
          <motion.div
            layoutId="nav-pill"
            className="absolute inset-0 rounded-full bg-accent border border-border/50 -z-10"
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          />
        )}
      </a>
    );
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed top-0 left-0 right-0 z-50 pt-5 px-4 sm:px-6"
      >
        {/* Desktop floating pill */}
        <nav className="hidden lg:flex items-center justify-center mx-auto max-w-[820px] h-[72px] px-3 rounded-full bg-card/80 backdrop-blur-xl border border-border/60 shadow-[0_2px_20px_-4px_rgba(0,0,0,0.08),0_0_40px_-12px_rgba(129,140,248,0.06)]">
          {/* Left links */}
          <div className="flex items-center gap-1">
            {NAV_LEFT.map(({ label, href }) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </div>

          {/* Right links */}
          <div className="flex items-center gap-1">
            {NAV_RIGHT.map(({ label, href }) => (
              <NavLink key={label} label={label} href={href} />
            ))}
          </div>

          {/* Theme toggle */}
          <div className="w-px h-5 bg-border/60 mx-2" />
          <button
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            className="flex items-center justify-center w-8 h-8 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all duration-200"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </nav>

        {/* Mobile: compact bar */}
        <div className="flex lg:hidden items-center justify-between h-14 px-4 rounded-2xl bg-card/80 backdrop-blur-xl border border-border/60 shadow-[0_2px_16px_-4px_rgba(0,0,0,0.08)]">
          <a href="#home" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand to-purple-500 flex items-center justify-center text-white text-sm font-bold">
              M
            </div>
            <span className="text-sm font-semibold tracking-tight">Manho</span>
          </a>

          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="flex items-center justify-center w-9 h-9 rounded-full text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobile}
            />
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.98 }}
              transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              className="fixed top-[76px] left-4 right-4 z-50 rounded-2xl bg-card/95 backdrop-blur-2xl border border-border p-4 shadow-[0_8px_40px_-8px_rgba(0,0,0,0.2)] lg:hidden"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_ALL.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    onClick={closeMobile}
                    className="px-4 py-3.5 text-base font-medium rounded-xl text-muted-foreground hover:text-foreground hover:bg-accent transition-all"
                  >
                    {label}
                  </a>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
