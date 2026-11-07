export default function SectionHeading({ badge, title, highlight, subtitle, align = 'left' }) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-10 ${isCenter ? 'text-center max-w-2xl mx-auto' : 'max-w-3xl'}`}>
      {badge && (
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium tracking-wide uppercase bg-orange-500/10 text-orange-400 border border-orange-500/20 mb-3">
          <span className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse"></span>
          {badge}
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-100">
        {title} {highlight && <span className="text-orange-500">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-slate-400 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
