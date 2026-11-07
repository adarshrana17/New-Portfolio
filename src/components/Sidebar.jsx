import {
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
  PanelLeftClose,
  PanelLeftOpen,
  Sun,
  Moon
} from 'lucide-react';
import { motion, LayoutGroup } from 'framer-motion';
import { personalInfo, navItems } from '../data/portfolioData';
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

export default function Sidebar({
  activeSection,
  onNavigate,
  isCollapsed = false,
  onToggleCollapse,
  theme = 'dark',
  onToggleTheme
}) {
  const { name, role, links } = personalInfo;

  const handleNavClick = (e, id) => {
    e.preventDefault();
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
    <aside
      className={`hidden lg:flex flex-col fixed top-0 left-0 h-screen bg-[#08090d] border-r border-slate-800/80 z-40 select-none transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64 xl:w-72'
        }`}
    >
      {/* Top Header / Profile Info */}
      <div className={`border-b border-slate-800/60 transition-all duration-200 ${isCollapsed ? 'p-3.5 flex flex-col items-center gap-3' : 'p-5'}`}>
        {isCollapsed ? (
          <>
            {/* Collapsed Logo */}
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="group relative flex items-center justify-center p-1 rounded-lg focus:outline-none"
              aria-label={name}
            >
              <ARLogo className="h-10 w-auto group-hover:scale-105 transition-transform" />
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center"
              >
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700/80 rotate-45" />
                <span>{name}</span>
              </div>
            </a>

            {/* Expand Toggle Button */}
            <button
              type="button"
              onClick={onToggleCollapse}
              aria-label="Expand sidebar"
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700/80 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            >
              <PanelLeftOpen size={18} />
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center"
              >
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700/80 rotate-45" />
                <span>Expand Sidebar</span>
              </div>
            </button>

            {/* Theme Toggle Button (Collapsed) */}
            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="group relative flex items-center justify-center w-10 h-10 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/60 hover:border-slate-700/80 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
            >
              {theme === 'dark' ? <Sun size={18} className="text-orange-400" /> : <Moon size={18} className="text-indigo-400" />}
              <div
                role="tooltip"
                className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center"
              >
                <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700/80 rotate-45" />
                <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
              </div>
            </button>
          </>
        ) : (
          <div className="flex items-start justify-between">
            <a
              href="#home"
              onClick={(e) => handleNavClick(e, 'home')}
              className="group flex flex-col items-start focus:outline-none"
            >
              <ARLogo className="h-11 sm:h-12 w-auto mb-3 group-hover:scale-105 transition-transform" />
              <h1 className="text-base font-bold text-slate-100 group-hover:text-white tracking-tight">
                {name}
              </h1>
              <p className="text-xs font-medium text-slate-400 mt-0.5">
                {role}
              </p>
            </a>

            {/* Header Actions: Theme Switch + Collapse Toggle */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={onToggleTheme}
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              >
                {theme === 'dark' ? <Sun size={17} className="text-orange-400" /> : <Moon size={17} className="text-indigo-400" />}
              </button>

              <button
                type="button"
                onClick={onToggleCollapse}
                aria-label="Collapse sidebar"
                title="Collapse sidebar"
                className="p-1.5 -mr-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800/80 border border-transparent hover:border-slate-700/60 transition-all duration-200 focus:outline-none focus:ring-1 focus:ring-orange-500/40"
              >
                <PanelLeftClose size={18} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Navigation Links */}
      <LayoutGroup id="sidebarNav">
        <nav
          className={`flex-1 py-4 space-y-1.5 ${isCollapsed ? 'overflow-visible px-2' : 'overflow-y-auto px-4 custom-scrollbar'
            }`}
        >
          {navItems.map((item) => {
            const Icon = iconMap[item.icon] || Home;
            const isActive = activeSection === item.id;

            if (isCollapsed) {
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => handleNavClick(e, item.id)}
                  aria-label={item.label}
                  className={`group relative flex items-center justify-center w-11 h-11 mx-auto rounded-xl transition-colors duration-200 ${isActive
                      ? 'text-orange-400'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                >
                  {/* Single Unified Active Pill: Background + Border + Accent Bar (Collapsed) */}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicatorCollapsed"
                      className="absolute inset-0 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-sm pointer-events-none"
                      transition={{
                        type: 'spring',
                        stiffness: 420,
                        damping: 32,
                        mass: 0.8
                      }}
                    >
                      <span className="absolute -left-2 top-2.5 bottom-2.5 w-1 bg-orange-500 rounded-r-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                    </motion.div>
                  )}

                  <Icon
                    size={19}
                    className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-orange-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                  />

                  {/* Floating Tooltip */}
                  <div
                    role="tooltip"
                    className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center"
                  >
                    <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700/80 rotate-45" />
                    <span>{item.label}</span>
                  </div>
                </a>
              );
            }

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={(e) => handleNavClick(e, item.id)}
                className={`relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors duration-200 group ${isActive
                    ? 'text-orange-400 font-semibold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                  }`}
              >
                {/* Single Unified Active Pill: Background + Border + Accent Bar (Expanded) */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicatorExpanded"
                    className="absolute inset-0 rounded-xl bg-slate-800/90 border border-slate-700/60 shadow-sm pointer-events-none"
                    transition={{
                      type: 'spring',
                      stiffness: 420,
                      damping: 32,
                      mass: 0.8
                    }}
                  >
                    <span className="absolute left-0 top-2 bottom-2 w-1 bg-orange-500 rounded-r-full shadow-[0_0_8px_rgba(249,115,22,0.6)]" />
                  </motion.div>
                )}

                <Icon
                  size={18}
                  className={`relative z-10 transition-colors duration-200 shrink-0 ${isActive ? 'text-orange-400' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                />
                <span className="relative z-10 truncate">{item.label}</span>
              </a>
            );
          })}
        </nav>
      </LayoutGroup>

      {/* Footer Area: Socials & Resume CTA */}
      <div
        className={`sidebar-footer border-t border-slate-800/60 bg-[#080a10]/60 transition-all duration-200 ${isCollapsed ? 'p-3 flex justify-center' : 'p-4 space-y-3'
          }`}
      >
        {/* Social Media Row (only visible when expanded) */}
        {/* {!isCollapsed && <SocialLinks variant="sidebar" iconSize={17} />} */}

        {/* Download Resume Button */}
        {isCollapsed ? (
          <a
            href={links.resume}
            download="Adarsh_Rana_Resume.pdf"
            aria-label="Download Resume"
            className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-orange-500/40 transition-all duration-200 shadow-sm"
          >
            <Download
              size={18}
              className="text-orange-400 group-hover:scale-110 transition-transform"
            />

            {/* Floating Tooltip */}
            <div
              role="tooltip"
              className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900/95 backdrop-blur-md border border-slate-200 dark:border-slate-700/80 text-xs font-semibold text-slate-900 dark:text-slate-100 shadow-xl opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200 whitespace-nowrap z-50 flex items-center"
            >
              <span className="absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-white dark:bg-slate-900 border-l border-b border-slate-200 dark:border-slate-700/80 rotate-45" />
              <span>Download Resume</span>
            </div>
          </a>
        ) : (
          <a
            href={links.resume}
            download="Adarsh_Rana_Resume.pdf"
            className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-800 hover:border-orange-500/40 transition-all duration-200 shadow-sm group"
          >
            <FileText
              size={15}
              className="text-orange-400 group-hover:scale-110 transition-transform"
            />
            <span>Resume</span>
            <Download
              size={13}
              className="text-slate-400 group-hover:text-orange-400 ml-auto transition-colors"
            />
          </a>
        )}
      </div>
    </aside>
  );
}
