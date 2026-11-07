import SectionHeading from './SectionHeading';
import { personalInfo } from '../data/portfolioData';
import { LayoutDashboard, Server, Database, Code2, CheckCircle2 } from 'lucide-react';

const highlightIcons = [LayoutDashboard, Server, Database, Code2];

export default function AboutSection() {
  const { aboutHeading, aboutDescription, highlights } = personalInfo;

  return (
    <section id="about" className="py-12 sm:py-16 border-b border-slate-800/60">
      <SectionHeading
        badge="About Me"
        title="Engineering intuitive web products with"
        highlight="precision"
        subtitle="A look into my engineering background, development philosophy, and technical execution."
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Left Column: Narrative & Core Values */}
        <div className="lg:col-span-6 space-y-5">
          <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
            {aboutHeading}
          </h3>

          <div className="space-y-3.5 text-sm sm:text-base text-slate-300 leading-relaxed">
            {aboutDescription.map((para, idx) => (
              <p key={idx} className="text-slate-400">
                {para}
              </p>
            ))}
          </div>

          {/* Minimalist Core Standards Strip */}
          <div className="flex flex-wrap gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-slate-300 border-t border-slate-800/70 pt-5">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
              <span>Admin Dashboards & Workflows</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
              <span>RESTful API Architecture</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-orange-500 shrink-0" />
              <span>Database Integrity</span>
            </div>
          </div>
        </div>

        {/* Right Column: Structured Architectural Stack (No Cards!) */}
        <div className="lg:col-span-6 divide-y divide-slate-800/70">
          {highlights.map((item, idx) => {
            const Icon = highlightIcons[idx % highlightIcons.length];
            return (
              <div
                key={idx}
                className="group py-4 sm:py-5 first:pt-0 last:pb-0 flex items-start gap-4 transition-all duration-200"
              >
                {/* Monospace Index + Minimalist Icon */}
                <div className="flex items-center gap-2.5 shrink-0 pt-0.5">
                  <span className="text-xs font-mono font-bold text-orange-400/80">
                    {String(idx + 1).padStart(2, '0')}
                  </span>
                  <div className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-300 group-hover:border-orange-500/40 group-hover:text-orange-400 group-hover:bg-orange-500/10 transition-all duration-300">
                    <Icon size={16} />
                  </div>
                </div>

                {/* Content */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-sm sm:text-base font-bold text-slate-100 group-hover:text-orange-400 transition-colors mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
