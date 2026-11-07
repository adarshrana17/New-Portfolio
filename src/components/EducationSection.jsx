import SectionHeading from './SectionHeading';
import { educationData } from '../data/portfolioData';
import { GraduationCap, Award, MapPin } from 'lucide-react';

export default function EducationSection() {
  return (
    <section id="education" className="py-12 sm:py-16 border-b border-slate-800/60">
      <SectionHeading
        badge="Academic Background"
        title="Education &"
        highlight="Qualifications"
        subtitle="Foundational computer science education, academic milestones, and engineering coursework."
      />

      {/* Academic Ledger: Cardless Split Timeline Rows */}
      <div className="divide-y divide-slate-800/70 border-t border-b border-slate-800/70">
        {educationData.map((item) => (
          <div
            key={item.id}
            className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 py-8 first:pt-6 last:pb-6 items-start"
          >
            {/* Left Rail: Duration, Score & Location */}
            <div className="lg:col-span-4 space-y-2.5">
              <div className="text-sm font-mono font-bold text-orange-400">
                {item.duration}
              </div>

              {item.score && (
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-orange-500/10 text-orange-400 border border-orange-500/20">
                  <Award size={13} />
                  <span>{item.score}</span>
                </div>
              )}

              {item.location && (
                <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
                  <MapPin size={12} />
                  <span>{item.location}</span>
                </div>
              )}
            </div>

            {/* Right Column: Degree, Institution & Coursework Details */}
            <div className="lg:col-span-8 space-y-3">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                  <GraduationCap size={18} className="text-orange-500 shrink-0" />
                  <span>{item.degree}</span>
                </h3>
                <p className="text-sm font-semibold text-slate-300 mt-1">
                  {item.institution}
                </p>
              </div>

              {item.highlights && item.highlights.length > 0 && (
                <div className="space-y-1.5 text-xs sm:text-sm text-slate-400 leading-relaxed pt-1">
                  {item.highlights.map((point, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-orange-500 font-bold select-none">›</span>
                      <span>{point}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
