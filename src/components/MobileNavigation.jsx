import { useState, useEffect } from 'react';
import {
  Menu,
  X,
  Home,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  Mail,
  Download,
  FileText,
  Sun,
  Moon
} from 'lucide-react';
import { personalInfo, navItems } from '../data/portfolioData';
import SocialLinks from './SocialLinks';
import ARLogo from './ARLogo';

const iconMap = {
  Home,
  User,
  Briefcase,
  FolderGit2,
  Cpu,
  Award,
  GraduationCap,
  Mail
};

export default function MobileNavigation({
  activeSection,
  onNavigate,
  theme = 'dark',
  onToggleTheme
}) {
  const [isOpen, setIsOpen] = useState(false);
  const { name, role, links } = personalInfo;

  // Prevent background scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    setIsOpen(false);
    if (onNavigate) {
      onNavigate(id);
    } else {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="lg:hidden">
      {/* Mobile Top App Bar */}
      <header className="fixed top-0 left-0 right-0 h-16 bg-[#0a0d14]/90 backdrop-blur-md border-b border-slate-800/80 z-40 px-4 flex items-center justify-between">
        <a 
          href="#home" 
          onClick={(e) => handleNavClick(e, 'home')}
          className="flex items-center gap-3"
        >
          <ARLogo className="h-7 w-auto" />
          <div>
            <h1 className="text-sm font-bold text-slate-100 leading-tight">
              {name}
            </h1>
            <p className="text-[10px] text-slate-400">
              {role}
            </p>
          </div>
        </a>

        {/* Header Controls: Theme Toggle & Menu Hamburger */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-orange-500/50 transition-colors focus:outline-none"
          >
            {theme === 'dark' ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} className="text-indigo-400" />}
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            className="p-2 rounded-lg bg-slate-800/80 border border-slate-700/80 text-slate-300 hover:text-white hover:border-orange-500/50 transition-colors focus:outline-none"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Slide-out Drawer Menu */}
      <div
        className={`mobile-drawer fixed top-0 right-0 bottom-0 w-72 max-w-[80vw] bg-[#0a0d14] border-l border-slate-800 z-50 flex flex-col transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Drawer Header */}
        <div className="mobile-drawer-header p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <ARLogo className="h-6 w-auto" />
            <span className="text-sm font-semibold text-slate-200">Navigation</span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            aria-label="Close drawer"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-slate-800 text-orange-400 border border-slate-700/80 shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`}
              >
                {isActive && (
                  <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-500 rounded-r-full" />
                )}
                <Icon size={18} className={`shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-400'}`} />
                <span className="truncate">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Drawer Bottom Action: Socials & Resume */}
        <div className="mobile-drawer-footer p-4 border-t border-slate-800/80 space-y-3 bg-[#080a10]/60 transition-colors">
          <SocialLinks variant="sidebar" iconSize={16} />
          <a
            href={links.resume}
            download="Adarsh_Rana_Resume.pdf"
            className="mobile-resume-btn w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-orange-500/40 transition-all duration-200 shadow-sm group"
          >
            <FileText size={15} className="text-orange-400 group-hover:scale-110 transition-transform" />
            <span>Download Resume</span>
            <Download size={13} className="text-slate-400 group-hover:text-orange-400 ml-auto transition-colors" />
          </a>
        </div>
      </div>
    </div>
  );
}
