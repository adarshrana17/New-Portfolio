import SectionHeading from './SectionHeading';
import ExperienceCard from './ExperienceCard';
import { experienceData } from '../data/portfolioData';

export default function ExperienceSection() {
  return (
    <section id="experience" className="py-12 sm:py-16 border-b border-slate-800/60">
      <SectionHeading
        badge="Career Journey"
        title="Work"
        highlight="Experience"
        subtitle="Professional roles where I contributed to production web apps, modern UI architecture, and enterprise software."
      />

      <div className="max-w-4xl mx-auto lg:mx-0">
        {experienceData.map((exp, index) => (
          <ExperienceCard
            key={exp.id || index}
            experience={exp}
            isLast={index === experienceData.length - 1}
          />
        ))}
      </div>
    </section>
  );
}
