import SectionHeading from './SectionHeading';
import { certificationsData, achievementsData } from '../data/portfolioData';
import { Award, Calendar, CheckCircle2, Trophy, ArrowUpRight } from 'lucide-react';

export default function CertificationsSection() {
  return (
    <section id="certifications" className="py-12 sm:py-16 border-b border-slate-800/60">
      <SectionHeading
        badge="Credentials & Milestones"
        title="Certifications &"
        highlight="Achievements"
        subtitle="Formal certifications, verified skill credentials, and key professional achievements."
      />

      {/* Certifications: Cardless Split Rows */}
      <div className="mb-14">
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <Award size={16} className="text-orange-500" />
          <span>Professional Certifications</span>
        </h3>

        <div className="divide-y divide-slate-800/70 border-t border-b border-slate-800/70">
          {certificationsData.map((cert) => (
            <div
              key={cert.id}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 first:pt-6 last:pb-6 items-baseline"
            >
              {/* Date & Badge Rail */}
              <div className="md:col-span-3 flex md:flex-col items-center md:items-start gap-2">
                <span className="text-xs font-mono font-bold text-orange-400 flex items-center gap-1.5">
                  <Calendar size={12} />
                  <span>{cert.date}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium bg-slate-900 border border-slate-800 text-slate-400">
                  {cert.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="md:col-span-9 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-base font-bold text-slate-100 flex items-center gap-1.5">
                    <span>{cert.title}</span>
                    <ArrowUpRight size={14} className="text-slate-500" />
                  </h4>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 shrink-0">
                    <CheckCircle2 size={13} />
                    <span className="hidden sm:inline">Verified</span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-slate-300">
                  {cert.issuer}
                </p>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  {cert.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Achievements: Clean Numbered Milestones */}
      <div>
        <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
          <Trophy size={16} className="text-orange-500" />
          <span>Key Milestones & Contributions</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {achievementsData.map((ach, idx) => (
            <div key={ach.id} className="space-y-2 border-l-2 border-slate-800 pl-4 hover:border-orange-500 transition-colors">
              <span className="text-xs font-mono font-bold text-orange-400 block">
                0{idx + 1}
              </span>
              <h4 className="text-sm font-bold text-slate-200">
                {ach.title}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {ach.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
