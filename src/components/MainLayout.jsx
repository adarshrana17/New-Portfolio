import { useState, useEffect, useRef } from 'react';
import { ArrowUp, Sun, Moon } from 'lucide-react';
import Sidebar from './Sidebar';
import MobileNavigation from './MobileNavigation';
import { navItems } from '../data/portfolioData';

export default function MainLayout({ children }) {
  const [activeSection, setActiveSection] = useState('home');
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Guard against scroll listener overriding activeSection during programmatic navigation smooth scroll
  const isNavigatingRef = useRef(false);
  const navTimerRef = useRef(null);

  // Theme state: defaults to saved localStorage or system preference, fallback to dark
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme');
      if (saved) return saved;
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches
        ? 'light'
        : 'dark';
    }
    return 'dark';
  });

  // Synchronize theme with documentElement and localStorage
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'light') {
      root.classList.add('light');
      root.classList.remove('dark');
    } else {
      root.classList.add('dark');
      root.classList.remove('light');
    }
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  useEffect(() => {
    // Show Back to Top button when user scrolls below the Home section
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 350);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    setActiveSection('home');
    isNavigatingRef.current = true;
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Immediate release of navigation lock if user interrupts smooth scroll with mouse wheel or touch
  useEffect(() => {
    const handleUserInterrupt = () => {
      if (isNavigatingRef.current) {
        isNavigatingRef.current = false;
        if (navTimerRef.current) clearTimeout(navTimerRef.current);
      }
    };

    window.addEventListener('wheel', handleUserInterrupt, { passive: true });
    window.addEventListener('touchstart', handleUserInterrupt, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleUserInterrupt);
      window.removeEventListener('touchstart', handleUserInterrupt);
    };
  }, []);

  // Highly accurate, synchronized scroll tracking for active section detection
  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);
    let ticking = false;

    const updateActiveSectionOnScroll = () => {
      // Prevent intermediate section jumping when user clicks a navigation link
      if (isNavigatingRef.current) return;

      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // 1. If at or near the very top of the page, activate the first section (home)
      if (scrollY < 80) {
        setActiveSection(sectionIds[0]);
        return;
      }

      // 2. If at or near the bottom of the page, activate the last section (contact)
      if (scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection(sectionIds[sectionIds.length - 1]);
        return;
      }

      // 3. Focal line detection:
      // The focal anchor line is at ~35% of the viewport height from the top.
      // Exactly ONE section spans across this focal point at any moment.
      const focalPoint = windowHeight * 0.35;
      let currentActive = null;

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const el = document.getElementById(id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= focalPoint && rect.bottom > focalPoint) {
            currentActive = id;
            break;
          }
        }
      }

      // Fallback: If in between margins, pick the section closest to the focal line
      if (!currentActive) {
        let minDistance = Infinity;
        for (let i = 0; i < sectionIds.length; i++) {
          const id = sectionIds[i];
          const el = document.getElementById(id);
          if (el) {
            const rect = el.getBoundingClientRect();
            const dist = Math.abs(rect.top - focalPoint);
            if (dist < minDistance) {
              minDistance = dist;
              currentActive = id;
            }
          }
        }
      }

      if (currentActive) {
        setActiveSection((prev) => (prev !== currentActive ? currentActive : prev));
      }
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateActiveSectionOnScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateActiveSectionOnScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (navTimerRef.current) clearTimeout(navTimerRef.current);
    };
  }, []);

  const handleNavigate = (id) => {
    setActiveSection(id);
    isNavigatingRef.current = true;
    if (navTimerRef.current) clearTimeout(navTimerRef.current);
    navTimerRef.current = setTimeout(() => {
      isNavigatingRef.current = false;
    }, 850);

    const element = document.getElementById(id);
    if (element) {
      // Calculate offset for mobile header if on small screen
      const isMobile = window.innerWidth < 1024;
      const yOffset = isMobile ? -70 : -20;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
    }
  };

  const handleToggleCollapse = () => {
    setIsCollapsed((prev) => !prev);
  };

  return (
    <div className="relative min-h-screen bg-[#0a0d14] text-slate-100 flex flex-col selection:bg-orange-500/20 selection:text-orange-300 transition-colors duration-300">
      {/* Stunning Atmospheric Canvas Background (Fixed behind all content) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
        {/* Ambient Glowing Orb 1: Warm Amber / Sunset Glow in top-right */}
        <div className="absolute -top-[12%] -right-[8%] w-[640px] h-[640px] rounded-full bg-gradient-to-br from-orange-500/15 via-amber-500/10 to-transparent blur-[130px] opacity-75 pointer-events-none transition-all duration-700" />

        {/* Ambient Glowing Orb 2: Deep Indigo / Violet Aurora in center-left */}
        <div className="absolute top-[35%] -left-[12%] w-[580px] h-[580px] rounded-full bg-gradient-to-tr from-indigo-600/12 via-purple-600/8 to-transparent blur-[140px] opacity-65 pointer-events-none transition-all duration-700" />

        {/* Ambient Glowing Orb 3: Radiant Warm Glow near lower-right */}
        <div className="absolute top-[72%] -right-[10%] w-[540px] h-[540px] rounded-full bg-gradient-to-tl from-orange-500/12 via-rose-500/6 to-transparent blur-[130px] opacity-60 pointer-events-none transition-all duration-700" />

        {/* Geometric Micro Grid Pattern with Radial Vignette Fade */}
        <div className="absolute inset-0 bg-grid-pattern opacity-40 [mask-image:radial-gradient(ellipse_80%_60%_at_50%_25%,#000_60%,transparent_100%)] pointer-events-none" />

        {/* Micro-Dot Sparkle Layer */}
        <div className="absolute inset-0 bg-dot-pattern opacity-30 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_35%,#000_40%,transparent_100%)] pointer-events-none" />
      </div>

      {/* Floating Theme Switch Pill for Quick One-Click Access (Desktop / Laptop) */}
      <div className="fixed top-5 right-6 sm:top-6 sm:right-8 z-40 hidden sm:block">
        <button
          type="button"
          onClick={toggleTheme}
          aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          className="group flex items-center gap-2.5 px-3.5 py-2 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-orange-500/40 shadow-xl shadow-black/30 backdrop-blur-md transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] focus:outline-none focus:ring-2 focus:ring-orange-500/40 cursor-pointer"
        >
          <div className="relative w-4 h-4 flex items-center justify-center">
            {theme === 'dark' ? (
              <Sun size={16} className="text-orange-400 transition-transform duration-500 group-hover:rotate-45" />
            ) : (
              <Moon size={16} className="text-indigo-400 transition-transform duration-500 group-hover:-rotate-12" />
            )}
          </div>
          <span className="text-xs font-semibold font-mono tracking-tight text-slate-300 group-hover:text-white">
            {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
          </span>
        </button>
      </div>

      {/* Fixed Sidebar on Desktop */}
      <Sidebar
        activeSection={activeSection}
        onNavigate={handleNavigate}
        isCollapsed={isCollapsed}
        onToggleCollapse={handleToggleCollapse}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Top Mobile Bar on Small Screens */}
      <MobileNavigation
        activeSection={activeSection}
        onNavigate={handleNavigate}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main
        className={`relative z-10 flex-1 w-full flex flex-col transition-all duration-300 ease-in-out ${
          isCollapsed ? 'lg:pl-20' : 'lg:pl-64 xl:pl-72'
        }`}
      >
        <div
          className={`w-full ${
            isCollapsed ? 'max-w-6xl' : 'max-w-5xl'
          } mx-auto px-4 sm:px-8 lg:px-12 py-4 flex-1 flex flex-col transition-all duration-300 ease-in-out`}
        >
          {children}
        </div>
      </main>

      {/* Floating Back to Top Button - Visible when scrolled below the Home section */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Back to top"
        className={`fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-40 p-3 rounded-2xl bg-slate-900/90 hover:bg-orange-500 text-slate-300 hover:text-slate-950 border border-slate-700/80 hover:border-orange-400 shadow-2xl shadow-black/50 backdrop-blur-md transition-all duration-300 ease-in-out hover:scale-105 active:scale-95 group focus:outline-none focus:ring-2 focus:ring-orange-500/50 cursor-pointer ${
          showBackToTop
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ArrowUp size={18} className="transition-transform duration-200 group-hover:-translate-y-0.5" />
      </button>
    </div>
  );
}
