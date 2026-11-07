import {
  Atom,
  FileCode2,
  FileCode,
  Code2,
  Palette,
  Flame,
  Layers,
  Server,
  Cpu,
  Network,
  Boxes,
  HardDrive,
  Database,
  Table2,
  GitBranch,
  Terminal,
  Send,
  Zap,
  Package,
  Smartphone,
  Radio,
  Gauge,
  Layout,
  Sparkles,
  Laptop,
  Globe,
  Box,
  Workflow
} from 'lucide-react';

const iconMap = {
  Atom,
  FileCode2,
  FileCode,
  Code2,
  Palette,
  Flame,
  Layers,
  Server,
  Cpu,
  Network,
  Boxes,
  HardDrive,
  Database,
  Table2,
  GitBranch,
  Terminal,
  Send,
  Zap,
  Package,
  Smartphone,
  Radio,
  Gauge,
  Layout,
  Sparkles,
  Laptop,
  Globe,
  Box,
  Workflow
};

export default function SkillCard({ skill }) {
  const IconComponent = iconMap[skill.icon] || Sparkles;
  const isCore = skill.isCore;
  const isLearning = skill.level === 'Learning';

  return (
    <div
      className={`group inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-slate-900/90 border transition-all duration-200 shadow-sm ${
        isCore
          ? 'border-slate-700/80 hover:border-orange-500/50'
          : isLearning
          ? 'border-slate-800/80 hover:border-indigo-500/40'
          : 'border-slate-800/90 hover:border-slate-700'
      }`}
    >
      <div
        className={`shrink-0 transition-transform group-hover:scale-110 ${
          isLearning ? 'text-indigo-400' : 'text-orange-400/90'
        }`}
      >
        <IconComponent size={16} />
      </div>

      <span className="text-xs sm:text-sm font-medium text-slate-200 group-hover:text-white transition-colors">
        {skill.name}
      </span>

      {skill.level && (
        <span
          className={`text-[10px] font-mono font-medium px-1.5 py-0.5 rounded transition-colors shrink-0 ${
            isLearning
              ? 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20'
              : isCore
              ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20'
              : 'bg-slate-800/90 text-slate-400'
          }`}
        >
          {skill.level}
        </span>
      )}
    </div>
  );
}
