import SectionHeading from './SectionHeading';
import SkillCard from './SkillCard';
import { skillsData } from '../data/portfolioData';
import { Layout, Server, Database, Terminal, BookOpen, Sparkles } from 'lucide-react';

const categoryIcons = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Terminal,
  learning: BookOpen
};

export default function SkillsSection() {
  return (
    <section id="skills" className="py-12 sm:py-16 border-b border-slate-800/60">
      <SectionHeading
        badge="Technical Arsenal"
        title="Skills &"
        highlight="Technologies"
        subtitle="Core professional technologies I leverage in production, alongside modern tools and active technical explorations."
      />

      {/* Categorized Engineering Matrix (Cardless Structured Rows) */}
      <div className="divide-y divide-slate-800/70 border-t border-b border-slate-800/70">
        {Object.entries(skillsData).map(([key, group]) => {
          const Icon = categoryIcons[key] || Sparkles;
          const isLearning = key === 'learning';

          return (
            <div
              key={key}
              className="grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 py-6 first:pt-6 last:pb-6 items-start"
            >
              {/* Domain Title & Identifier */}
              <div className="md:col-span-4 flex items-center gap-3">
                <div
                  className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 border ${
                    isLearning
                      ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
                      : 'bg-orange-500/10 border-orange-500/20 text-orange-400'
                  }`}
                >
                  <Icon size={18} />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white tracking-tight">
                    {group.title}
                  </h3>
                  <span className="text-xs font-mono text-slate-400">
                    {isLearning ? 'Active exploration' : `${group.skills.length} competencies`}
                  </span>
                </div>
              </div>

              {/* Skills Badges */}
              <div className="md:col-span-8 flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
