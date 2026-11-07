import { ExternalLink, Sparkles, FolderGit2 } from 'lucide-react';
import { GithubIcon } from './Icons';

export default function ProjectCard({ project, onSelect }) {
  return (
    <div className="group relative rounded-2xl bg-slate-900/50 border border-slate-800/80 hover:border-orange-500/30 overflow-hidden transition-all duration-300 flex flex-col h-full shadow-sm">
      {/* Project Image / Visual Placeholder */}
      <div className="relative h-48 w-full bg-slate-950/80 overflow-hidden border-b border-slate-800/80">
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent z-10" />
        
        {/* Placeholder Graphic / Illustration */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center group-hover:scale-105 transition-transform duration-500 bg-grid-pattern">
          <div className="w-14 h-14 rounded-2xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 mb-3 shadow-inner">
            <FolderGit2 size={28} />
          </div>
          <span className="text-xs font-mono font-medium text-slate-400 tracking-wider uppercase">
            {project.subtitle || 'Interactive Web Application'}
          </span>
        </div>

        {/* Featured Badge */}
        {project.featured && (
          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-orange-500 text-slate-950 shadow-md">
            <Sparkles size={12} />
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col grow">
        <div className="mb-3">
          <h3 className="text-lg font-bold text-slate-100 group-hover:text-orange-400 transition-colors">
            {project.title}
          </h3>
          {project.subtitle && (
            <p className="text-xs text-orange-400 font-medium mt-0.5">
              {project.subtitle}
            </p>
          )}
        </div>

        <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed mb-4 grow">
          {project.description}
        </p>

        {/* Key Features Bullet Summary */}
        {project.keyFeatures && project.keyFeatures.length > 0 && (
          <div className="mb-4 space-y-1.5 text-xs text-slate-400">
            {project.keyFeatures.slice(0, 2).map((feature, i) => (
              <div key={i} className="flex items-start gap-2">
                <span className="text-orange-500 font-bold mt-0.5">•</span>
                <span className="line-clamp-1">{feature}</span>
              </div>
            ))}
          </div>
        )}

        {/* Tech Stack Pills */}
        <div className="flex flex-wrap gap-1.5 mb-6">
          {project.technologies.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-0.5 rounded-md text-[11px] font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60"
            >
              {tech}
            </span>
          ))}
          {project.technologies.length > 5 && (
            <span className="px-2 py-0.5 rounded-md text-[10px] text-slate-400 bg-slate-800/40">
              +{project.technologies.length - 5}
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2.5 pt-3 border-t border-slate-800/60 mt-auto">
          {project.links?.demo && (
            <a
              href={project.links.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-orange-500 text-slate-950 hover:bg-orange-400 transition-colors"
            >
              <span>Live Demo</span>
              <ExternalLink size={13} />
            </a>
          )}
          {project.links?.github && (
            <a
              href={project.links.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-semibold bg-slate-800 text-slate-200 hover:bg-slate-700 hover:text-white border border-slate-700 transition-colors"
            >
              <GithubIcon size={14} />
              <span>Code</span>
            </a>
          )}
          {onSelect && (
            <button
              type="button"
              onClick={() => onSelect(project)}
              className="p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              title="View Details"
            >
              Details
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
