import { useState, useEffect, useRef } from 'react';
import { Download, Eye, Sparkles } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { GithubIcon, LinkedinIcon } from './Icons';

function AnimatedStatItem({ label, endValue, suffix = '', shouldStart }) {
  const [count, setCount] = useState(0);
  const hasAnimatedRef = useRef(false);

  useEffect(() => {
    if (!shouldStart || hasAnimatedRef.current) return;
    hasAnimatedRef.current = true;

    let startTime = null;
    let animationFrameId;
    const duration = 1800; // 1.8 seconds smooth animation

    // Smooth easeOutCubic curve for natural deceleration
    const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);

      setCount(Math.round(eased * endValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(step);

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [shouldStart, endValue]);

  return (
    <div className="px-4 first:pl-0 last:pr-0">
      <div className="text-2xl sm:text-3xl font-extrabold text-orange-500 tracking-tight font-mono flex items-center justify-center">
        <span>{count}</span>
        <span>{suffix}</span>
      </div>
      <div className="text-xs sm:text-sm font-medium text-slate-400 mt-1">
        {label}
      </div>
    </div>
  );
}

export default function HomeSection({ onNavigate }) {
  const {
    name,
    firstName,
    lastName,
    subRole,
    tagline,
    links,
    images
  } = personalInfo;

  const statsContainerRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);

  // IntersectionObserver to trigger animation when the stats section enters view
  useEffect(() => {
    const el = statsContainerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          // Disconnect once triggered to avoid restarting when scrolling between sections
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  const handleScrollToProjects = (e) => {
    e.preventDefault();
    if (onNavigate) {
      onNavigate('projects');
    } else {
      document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Dynamic statistics:
  // - Experience: animates to actual years of professional experience (2+ years)
  // - Projects: animates to actual count of projects completed (7+)
  // - Technologies & Tools: animates to technical strength count (15+)
  const dynamicStats = [
    {
      id: 'experience',
      label: 'Years Experience',
      endValue: 1,
      suffix: '+'
    },
    {
      id: 'projects',
      label: 'Projects Completed',
      endValue: 7,
      suffix: '+'
    },
    {
      id: 'technologies',
      label: 'Technologies & Tools',
      endValue: 15,
      suffix: '+'
    }
  ];

  return (
    <section id="home" className="pt-20 sm:pt-24 lg:pt-16 pb-12 sm:pb-16 border-b border-slate-800/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Greeting, Name, Intro, CTAs */}
        <div className="lg:col-span-7 space-y-6">
          {/*Availability Badges */}
          <div className="flex flex-wrap items-center gap-2.5 sm:gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>Available for Opportunities</span>
            </div>
          </div>

          {/* Headline Name */}
          <h1 className="text-4xl sm:text-5xl xl:text-6xl font-extrabold tracking-tight text-white leading-tight">
            {firstName} <span className="text-orange-500">{lastName}</span>
          </h1>

          {/* Subtitle Designation */}
          <p className="text-base sm:text-lg font-medium text-slate-300">
            {subRole}
          </p>

          {/* Bio Tagline */}
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed max-w-xl">
            {tagline}
          </p>

          {/* Action CTA Buttons & Social Profiles */}
          <div className="flex flex-wrap items-center gap-3.5 pt-2">
            <a
              href="#projects"
              onClick={handleScrollToProjects}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-orange-500 hover:bg-orange-400 text-slate-950 transition-all duration-200 shadow-lg shadow-orange-500/20 hover:scale-[1.02] active:scale-[0.98]"
            >
              <Eye size={17} />
              <span>View Projects</span>
            </a>

            <a
              href={links.resume}
              download="Adarsh_Rana_Resume.pdf"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700/80 hover:border-slate-600 transition-all duration-200"
            >
              <Download size={17} className="text-orange-400" />
              <span>Download Resume</span>
            </a>

            {/* GitHub & LinkedIn Profiles */}
            <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-800/80 sm:pl-3.5">
              <a
                href={links.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                title="GitHub Profile"
                className="w-11 h-11 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-orange-400 border border-slate-700/80 hover:border-orange-500/40 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              >
                <GithubIcon size={19} />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                title="LinkedIn Profile"
                className="w-11 h-11 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-orange-400 border border-slate-700/80 hover:border-orange-500/40 flex items-center justify-center transition-all duration-200 shadow-sm hover:scale-105 active:scale-95"
              >
                <LinkedinIcon size={19} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Framed Developer Portrait with Decorative Accents */}
        <div className="lg:col-span-5 flex justify-center lg:justify-end">
          <div className="relative">
            {/* Offset Accent Outline Box */}
            <div className="absolute -top-3 -right-3 w-full h-full rounded-3xl border-2 border-orange-500/60 pointer-events-none" />

            {/* Profile Image Container */}
            <div className="relative w-64 sm:w-72 md:w-80 aspect-square rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 shadow-2xl">
              <img
                src={images.heroProfile}
                alt={name}
                className="w-full h-full object-cover object-top filter contrast-[1.05]"
                onError={(e) => {
                  // Fallback if image fails to load
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = `
                    <div class="w-full h-full flex flex-col items-center justify-center bg-slate-900 text-orange-400 p-6 text-center">
                      <span class="text-5xl font-black mb-2">${personalInfo.initials}</span>
                      <span class="text-xs text-slate-400 font-mono">${personalInfo.name}</span>
                    </div>
                  `;
                }}
              />
              {/* Subtle inner gradient shade */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />
            </div>

            {/* "Keep Coding" handwritten style badge */}
            <div className="absolute -bottom-5 -right-3 sm:-right-4 bg-[#0a0d14]/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-orange-500/30 text-orange-400 text-xs font-mono font-medium tracking-wide shadow-lg rotate-2 flex items-center gap-1.5">
              <span>Keep Coding</span>
              <Sparkles size={12} className="text-orange-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Professional Statistics Bar with Animated Counting & Subtle Reveal */}
      <div
        ref={statsContainerRef}
        className={`mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 transition-all duration-700 ease-out ${statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
      >
        <div className="grid grid-cols-3 divide-x divide-slate-800/80 max-w-2xl mx-auto lg:mx-0 text-center">
          {dynamicStats.map((stat) => (
            <AnimatedStatItem
              key={stat.id}
              label={stat.label}
              endValue={stat.endValue}
              suffix={stat.suffix}
              shouldStart={statsVisible}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
