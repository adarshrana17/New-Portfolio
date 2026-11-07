import { Calendar, MapPin, ArrowUpRight } from 'lucide-react';

export default function ExperienceCard({ experience, isLast = false }) {
  return (
    <div className="relative flex gap-5 sm:gap-8 group">
      {/* Left Timeline Rail & Node */}
      <div className="flex flex-col items-center shrink-0">
        <div
          className={`w-3.5 h-3.5 rounded-full mt-2 transition-all duration-300 ${
            experience.isCurrent
              ? 'bg-orange-500 ring-4 ring-orange-500/20'
              : 'bg-slate-700 group-hover:bg-orange-400 group-hover:ring-4 group-hover:ring-orange-500/10'
          }`}
        />
        {!isLast && (
          <div className="w-px grow bg-slate-800 my-2 group-hover:bg-slate-700 transition-colors" />
        )}
      </div>

      {/* Experience Details: Open, Cardless Editorial Layout */}
      <div className={`grow pb-10 sm:pb-12 ${isLast ? 'pb-2' : ''}`}>
        <div className="border-b border-slate-800/60 pb-8 last:border-b-0">
          {/* Header Row: Company, Role, Period & Location */}
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-3">
            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h3 className="text-lg sm:text-xl font-extrabold text-white group-hover:text-orange-400 transition-colors flex items-center gap-1.5">
                  <span>{experience.company}</span>
                  <ArrowUpRight size={16} className="text-slate-500 group-hover:text-orange-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </h3>
                {experience.isCurrent && (
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Current
                  </span>
                )}
              </div>
              <p className="text-sm font-semibold text-slate-300 mt-1">
                {experience.role}
              </p>
            </div>

            {/* Date & Location Rail */}
            <div className="flex sm:flex-col sm:items-end gap-3 sm:gap-1 text-xs text-slate-400 font-mono shrink-0">
              <div className="flex items-center gap-1.5">
                <Calendar size={13} className="text-orange-400" />
                <span>{experience.period}</span>
              </div>
              {experience.location && (
                <div className="flex items-center gap-1 text-slate-500">
                  <MapPin size={11} />
                  <span>{experience.location}</span>
                </div>
              )}
            </div>
          </div>

          {/* Key Contributions & Achievements */}
          {experience.highlights && experience.highlights.length > 0 && (
            <ul className="space-y-2 mb-4 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-3xl">
              {experience.highlights.map((point, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="text-orange-500 font-bold select-none mt-0.5">›</span>
                  <span className="text-slate-300">{point}</span>
                </li>
              ))}
            </ul>
          )}

          {/* Tech Stack Ghost Pills */}
          {experience.technologies && experience.technologies.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-1">
              {experience.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-300 hover:border-orange-500/40 hover:text-orange-300 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
