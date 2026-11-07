import { useState, useRef, useEffect, useCallback } from 'react';
import gsap from 'gsap';
import SectionHeading from './SectionHeading';
import { projectsData } from '../data/portfolioData';
import {
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  CheckCircle2,
  Sparkles,
  LayoutDashboard,
  Smartphone,
  Apple
} from 'lucide-react';

export default function ProjectsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const sectionRef = useRef(null);
  const showcaseRef = useRef(null);
  const slidesContainerRef = useRef(null);
  const slidesRef = useRef([]);

  const currentIndexRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const totalProjects = projectsData.length;

  // Track desktop breakpoint (>= 1024px) for desktop-only pinned vertical slide deck
  const [isDesktop, setIsDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 1024;
    }
    return true;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth project navigation:
  // - On Mobile (< 1024px): Natural document flow with smooth horizontal slide/fade.
  //   Never traps scroll, never triggers while scrolling vertically.
  // - On Desktop (>= 1024px): Controlled GSAP vertical sliding timeline.
  const goToProject = useCallback((newIndex, customDirection = null) => {
    if (newIndex === currentIndexRef.current || isAnimatingRef.current) return;
    if (newIndex < 0 || newIndex >= totalProjects) return;

    const prevIndex = currentIndexRef.current;
    const dir = customDirection !== null ? customDirection : (newIndex > prevIndex ? 1 : -1);

    isAnimatingRef.current = true;
    currentIndexRef.current = newIndex;
    setCurrentIndex(newIndex);

    // Mobile Transition: Light horizontal slide & fade
    if (!isDesktop) {
      requestAnimationFrame(() => {
        const nextSlide = slidesRef.current[newIndex];
        if (nextSlide) {
          gsap.killTweensOf(nextSlide);
          gsap.fromTo(
            nextSlide,
            { opacity: 0, x: dir * 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(nextSlide, { clearProps: 'x' });
                isAnimatingRef.current = false;
              },
            }
          );
        } else {
          isAnimatingRef.current = false;
        }
      });
      return;
    }

    // Desktop Transition: Synchronized vertical slide timeline
    const currentSlide = slidesRef.current[prevIndex];
    const nextSlide = slidesRef.current[newIndex];

    if (!currentSlide || !nextSlide) {
      isAnimatingRef.current = false;
      return;
    }

    // Kill any active tweens on the affected slides
    gsap.killTweensOf([currentSlide, nextSlide]);

    // Position the incoming slide outside the viewport in the scroll direction
    gsap.set(nextSlide, {
      yPercent: dir > 0 ? 100 : -100,
      opacity: 0,
      autoAlpha: 1,
      zIndex: 2,
    });

    gsap.set(currentSlide, {
      zIndex: 1,
    });

    const tl = gsap.timeline({
      defaults: {
        duration: 0.65,
        ease: 'power2.inOut',
      },
      onComplete: () => {
        // Hide exited slide completely to avoid overlay and pointer event collisions
        gsap.set(currentSlide, { autoAlpha: 0, yPercent: 0 });
        gsap.set(nextSlide, { yPercent: 0, opacity: 1, autoAlpha: 1 });
        isAnimatingRef.current = false;
      },
    });

    // Animate exiting slide out along vertical axis
    tl.to(
      currentSlide,
      {
        yPercent: dir > 0 ? -100 : 100,
        opacity: 0,
      },
      0
    );

    // Animate entering slide in from the opposite side
    tl.to(
      nextSlide,
      {
        yPercent: 0,
        opacity: 1,
      },
      0
    );
  }, [totalProjects, isDesktop]);

  const handleNext = useCallback(() => {
    if (currentIndexRef.current < totalProjects - 1) {
      goToProject(currentIndexRef.current + 1, 1);
      return true;
    }
    return false;
  }, [totalProjects, goToProject]);

  const handlePrev = useCallback(() => {
    if (currentIndexRef.current > 0) {
      goToProject(currentIndexRef.current - 1, -1);
      return true;
    }
    return false;
  }, [goToProject]);

  // GSAP Context: Setup initial slide positions on desktop
  useEffect(() => {
    if (!isDesktop) {
      // Clear GSAP transforms on mobile so CSS controls layout naturally
      slidesRef.current.forEach((slide) => {
        if (!slide) return;
        gsap.set(slide, { clearProps: 'yPercent,zIndex,opacity,visibility' });
      });
      return;
    }

    const ctx = gsap.context(() => {
      slidesRef.current.forEach((slide, idx) => {
        if (!slide) return;
        if (idx === currentIndexRef.current) {
          gsap.set(slide, { yPercent: 0, opacity: 1, autoAlpha: 1, zIndex: 1, clearProps: 'x' });
        } else {
          gsap.set(slide, { yPercent: 100, opacity: 0, autoAlpha: 0, zIndex: 0, clearProps: 'x' });
        }
      });
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isDesktop]);

  // Controlled Wheel / Scroll Handling:
  // - Applies ONLY on Desktop (>= 1024px).
  // - On mobile/tablet, native wheel/touch scroll is 100% unimpeded.
  useEffect(() => {
    const el = showcaseRef.current;
    if (!el) return;

    let accumulatedDelta = 0;
    let resetTimer = null;

    const onWheel = (e) => {
      // Strictly disabled on screens < 1024px to prevent mobile/tablet scroll trapping
      if (window.innerWidth < 1024) return;

      // Scrolling DOWN
      if (e.deltaY > 0) {
        if (currentIndexRef.current < totalProjects - 1) {
          // Strictly lock the main page scroll
          e.preventDefault();
          e.stopPropagation();

          if (isAnimatingRef.current) return;

          accumulatedDelta += e.deltaY;
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            accumulatedDelta = 0;
          }, 200);

          if (accumulatedDelta >= 25) {
            accumulatedDelta = 0;
            handleNext();
          }
        } else {
          accumulatedDelta = 0;
        }
      }
      // Scrolling UP
      else if (e.deltaY < 0) {
        if (currentIndexRef.current > 0) {
          // Strictly lock the main page scroll
          e.preventDefault();
          e.stopPropagation();

          if (isAnimatingRef.current) return;

          accumulatedDelta += e.deltaY;
          if (resetTimer) clearTimeout(resetTimer);
          resetTimer = setTimeout(() => {
            accumulatedDelta = 0;
          }, 200);

          if (accumulatedDelta <= -25) {
            accumulatedDelta = 0;
            handlePrev();
          }
        } else {
          accumulatedDelta = 0;
        }
      }
    };

    el.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      el.removeEventListener('wheel', onWheel);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, [totalProjects, handleNext, handlePrev]);

  // Touch handlers for mobile:
  // - ONLY intentional horizontal swipes trigger project switching.
  // - Vertical scrolling is completely untouched so mobile users can smoothly read through
  //   the complete project details without triggering accidental transitions!
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;
    touchStartX.current = null;
    touchStartY.current = null;

    // Must be predominantly horizontal to avoid intercepting vertical page scrolling
    if (Math.abs(diffX) > 45 && Math.abs(diffX) > Math.abs(diffY) * 1.5) {
      if (diffX > 0) {
        // Swiped Left -> Next project
        if (currentIndexRef.current < totalProjects - 1) {
          handleNext();
        }
      } else {
        // Swiped Right -> Previous project
        if (currentIndexRef.current > 0) {
          handlePrev();
        }
      }
    }
  };

  // Keyboard navigation when section is in view
  useEffect(() => {
    const handleKeyDown = (e) => {
      const el = showcaseRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const inView = rect.top < window.innerHeight * 0.8 && rect.bottom > window.innerHeight * 0.2;
      if (!inView) return;

      if (e.key === 'ArrowRight' || (isDesktop && e.key === 'ArrowDown')) {
        if (currentIndexRef.current < totalProjects - 1) {
          e.preventDefault();
          handleNext();
        }
      } else if (e.key === 'ArrowLeft' || (isDesktop && e.key === 'ArrowUp')) {
        if (currentIndexRef.current > 0) {
          e.preventDefault();
          handlePrev();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalProjects, handleNext, handlePrev, isDesktop]);

  return (
    <section ref={sectionRef} id="projects" className="py-12 sm:py-16 border-b border-slate-800/60">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <SectionHeading
          badge="Featured Portfolio"
          title="Featured"
          highlight="Projects"
          subtitle="Explore professional client & enterprise projects — scroll or use controls to browse each project."
        />

        {/* Navigation Controls */}
        <div className="flex items-center gap-2 self-start sm:self-auto mb-4 sm:mb-10 select-none">
          <span className="text-xs font-mono font-medium text-slate-400 mr-2">
            <span className="text-orange-400 font-bold">{String(currentIndex + 1).padStart(2, '0')}</span>
            {' / '}
            {String(totalProjects).padStart(2, '0')}
          </span>

          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous project"
            className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-colors shadow-sm ${
              currentIndex === 0
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : 'hover:border-orange-500/50 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer'
            }`}
          >
            <ChevronLeft size={18} />
          </button>
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === totalProjects - 1}
            aria-label="Next project"
            className={`w-9 h-9 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center transition-colors shadow-sm ${
              currentIndex === totalProjects - 1
                ? 'opacity-40 cursor-not-allowed text-slate-600'
                : 'hover:border-orange-500/50 hover:bg-slate-800 text-slate-300 hover:text-white cursor-pointer'
            }`}
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>

      {/* Interactive Showcase Deck Wrapper */}
      <div
        ref={showcaseRef}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        className="space-y-4"
      >
        {/* Main Single Project Showcase Container */}
        <div className="group relative rounded-3xl bg-[#0d111a] border border-slate-800/90 shadow-2xl overflow-hidden transition-all duration-300 hover:border-orange-500/40">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Floating Left Navigation Button (Vertically Centered) - Shown on small screens where horizontal slider is active */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous project"
            title="Previous project"
            className={`project-nav-btn lg:hidden absolute left-2 sm:left-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md ${
              currentIndex === 0
                ? 'opacity-25 cursor-not-allowed bg-slate-900/60 text-slate-600 border border-slate-800/60'
                : 'bg-slate-900/90 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-500 shadow-black/40 hover:shadow-orange-500/30 hover:scale-110 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronLeft size={20} className="sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Floating Right Navigation Button (Vertically Centered) - Shown on small screens where horizontal slider is active */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === totalProjects - 1}
            aria-label="Next project"
            title="Next project"
            className={`project-nav-btn lg:hidden absolute right-2 sm:right-3.5 top-1/2 -translate-y-1/2 z-30 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md ${
              currentIndex === totalProjects - 1
                ? 'opacity-25 cursor-not-allowed bg-slate-900/60 text-slate-600 border border-slate-800/60'
                : 'bg-slate-900/90 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-500 shadow-black/40 hover:shadow-orange-500/30 hover:scale-110 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronRight size={20} className="sm:w-6 sm:h-6 stroke-[2.5]" />
          </button>

          {/* Floating Top Navigation Button (Horizontally Centered) - Shown ONLY on large screens for vertical slider */}
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous project slide (Scroll up)"
            title={currentIndex === 0 ? 'First project reached' : 'Previous project (Scroll up)'}
            className={`project-nav-btn hidden lg:flex absolute top-3 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md ${
              currentIndex === 0
                ? 'opacity-25 cursor-not-allowed bg-slate-900/60 text-slate-600 border border-slate-800/60'
                : 'bg-slate-900/90 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-500 shadow-black/40 hover:shadow-orange-500/30 hover:scale-110 active:scale-95 cursor-pointer'
            }`}
          >
            <ChevronUp size={20} className="stroke-[2.5]" />
          </button>

          {/* Floating Bottom Navigation Button (Horizontally Centered) - Shown ONLY on large screens for vertical slider */}
          <button
            type="button"
            onClick={handleNext}
            disabled={currentIndex === totalProjects - 1}
            aria-label="Next project slide (Scroll down)"
            title={currentIndex === totalProjects - 1 ? 'Last project reached' : 'Next project (Scroll down)'}
            className={`project-nav-btn hidden lg:flex absolute bottom-3 left-1/2 -translate-x-1/2 z-30 w-10 h-10 rounded-full items-center justify-center transition-all duration-200 shadow-xl backdrop-blur-md ${
              currentIndex === totalProjects - 1
                ? 'opacity-25 cursor-not-allowed bg-slate-900/60 text-slate-600 border border-slate-800/60'
                : 'bg-slate-900/90 hover:bg-orange-500 text-slate-200 hover:text-slate-950 border border-slate-700/80 hover:border-orange-500 shadow-black/40 hover:shadow-orange-500/30 hover:scale-110 active:scale-95 cursor-pointer animate-bounce hover:animate-none'
            }`}
          >
            <ChevronDown size={20} className="stroke-[2.5]" />
          </button>

          {/* Project Slides Deck - Natural height on mobile (no internal scrollbar), pinned vertical slide deck on desktop */}
          <div
            ref={slidesContainerRef}
            className="relative w-full overflow-hidden lg:min-h-[680px] xl:lg:min-h-[660px]"
          >
            {projectsData.map((project, idx) => {
              const isActive = idx === currentIndex;
              return (
                <div
                  key={project.id}
                  ref={(el) => (slidesRef.current[idx] = el)}
                  className={`project-slide w-full px-8 py-5 sm:px-14 sm:py-7 lg:px-10 lg:pt-13 lg:pb-13 flex flex-col justify-between will-change-transform ${
                    isActive
                      ? 'relative opacity-100 z-10'
                      : 'hidden lg:flex lg:absolute lg:inset-0 lg:opacity-0 lg:z-0 lg:pointer-events-none'
                  } lg:absolute lg:inset-0 lg:w-full lg:h-full lg:overflow-visible`}
                >
                  <div className="space-y-6 flex-1 flex flex-col justify-between">
                    {/* Top Section: Badges, Title, Overview */}
                    <div className="space-y-3 sm:space-y-4">
                      {/* Badges Row */}
                      <div className="flex items-center gap-2.5 flex-wrap">
                        <span className="font-mono text-xs px-2.5 py-0.5 rounded-lg bg-slate-900 text-orange-400 font-bold border border-slate-800">
                          {String(idx + 1).padStart(2, '0')}
                        </span>
                        <span className="px-3 py-0.5 rounded-full text-xs font-semibold bg-orange-500/10 text-orange-400 border border-orange-500/20">
                          {project.subtitle}
                        </span>
                        {project.role && (
                          <span className="hidden sm:inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-900/90 text-slate-300 border border-slate-800">
                            {project.role}
                          </span>
                        )}
                        {project.featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-orange-500 text-slate-950 shadow-sm">
                            <Sparkles size={11} />
                            Featured
                          </span>
                        )}
                      </div>

                      {/* Project Title */}
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white">
                        {project.title}
                      </h3>

                      {/* Overview Description */}
                      <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-4xl">
                        {project.description}
                      </p>
                    </div>

                    {/* Structured Two-Column Content Grid: Engineering Contributions & Platform Capabilities */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 py-4 border-y border-slate-800/60">
                      {/* Left Column: My Role & Architecture Contributions */}
                      <div className="lg:col-span-7 space-y-3">
                        <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-orange-400/90 flex items-center gap-2">
                          <CheckCircle2 size={15} className="text-orange-500" />
                          <span>Key Architecture & Contributions</span>
                        </h4>
                        <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                          {project.contributions.map((contribution, i) => (
                            <li key={i} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-orange-500 shrink-0 mt-2" />
                              <span className="leading-relaxed">{contribution}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Right Column: Key Features & Technologies */}
                      <div className="lg:col-span-5 space-y-5">
                        {/* Key Features */}
                        {project.keyFeatures && project.keyFeatures.length > 0 && (
                          <div className="space-y-2.5">
                            <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                              <Sparkles size={13} className="text-orange-400" />
                              <span>Key Platform Features</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-300">
                              {project.keyFeatures.map((feature, i) => (
                                <li key={i} className="flex items-start gap-2">
                                  <span className="w-1 h-1 rounded-full bg-slate-500 shrink-0 mt-2" />
                                  <span className="leading-snug">{feature}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}

                        {/* Technologies & Tools */}
                        <div>
                          <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-2">
                            Technologies & Tools
                          </h4>
                          <div className="flex flex-wrap gap-1.5 sm:gap-2">
                            {project.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-900 border border-slate-800 text-slate-200 hover:border-orange-500/40 hover:text-orange-300 transition-colors shadow-sm"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-4 pt-1">
                      <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
                        {/* Live Website / CRM URL */}
                        {project.links?.live && (
                          <a
                            href={project.links.live}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-slate-950 transition-all shadow-md shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <span>{project.links.liveLabel || 'Live Website'}</span>
                            <ExternalLink size={14} />
                          </a>
                        )}

                        {/* Admin Panel URL */}
                        {project.links?.admin && (
                          <a
                            href={project.links.admin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-orange-500/40 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                          >
                            <LayoutDashboard size={14} className="text-orange-400" />
                            <span>Admin Panel</span>
                            <ExternalLink size={12} className="text-slate-400" />
                          </a>
                        )}

                        {/* Play Store URL */}
                        {project.links?.playStore && (
                          <a
                            href={project.links.playStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-orange-500/40 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                            title="Google Play Store"
                          >
                            <Smartphone size={14} className="text-emerald-400" />
                            <span>Play Store</span>
                            <ExternalLink size={12} className="text-slate-400" />
                          </a>
                        )}

                        {/* App Store URL */}
                        {project.links?.appStore && (
                          <a
                            href={project.links.appStore}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center gap-2 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-orange-500/40 transition-all shadow-sm hover:scale-[1.02] active:scale-[0.98]"
                            title="Apple App Store"
                          >
                            <Apple size={14} className="text-slate-200" />
                            <span>App Store</span>
                            <ExternalLink size={12} className="text-slate-400" />
                          </a>
                        )}

                        {/* Fallback if no URLs are provided */}
                        {!project.links?.live && !project.links?.admin && (
                          <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono text-slate-400 bg-slate-900/70 border border-slate-800/90">
                            <span className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                            <span>Client & Enterprise Platform (Private Codebase)</span>
                          </div>
                        )}
                      </div>

                      <div className="text-xs font-mono text-slate-400">
                        Project <span className="text-orange-400 font-bold">{idx + 1}</span> of {totalProjects}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
