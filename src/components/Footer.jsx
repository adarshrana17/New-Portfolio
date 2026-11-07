import SocialLinks from './SocialLinks';
import { personalInfo } from '../data/portfolioData';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="pt-8 pb-12 border-t border-slate-800/60 mt-12">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Copyright */}
        <div className="text-xs text-slate-400 text-center sm:text-left">
          <p>© {currentYear} <span className="text-slate-200 font-medium">{personalInfo.name}</span>. All rights reserved.</p>
        </div>

        {/* Social Links */}
        <div className="flex items-center gap-4">
          <SocialLinks iconSize={16} />
        </div>
      </div>
    </footer>
  );
}
