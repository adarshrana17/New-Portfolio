import { Mail } from 'lucide-react';
import { GithubIcon, LinkedinIcon, InstagramIcon } from './Icons';
import { personalInfo } from '../data/portfolioData';

export default function SocialLinks({ className = '', iconSize = 18, variant = 'default' }) {
  const { links } = personalInfo;

  const socialItems = [
    { name: 'GitHub', href: links.github, icon: GithubIcon },
    { name: 'LinkedIn', href: links.linkedin, icon: LinkedinIcon },
    // { name: 'Twitter', href: links.twitter, icon: TwitterIcon },
    { name: 'Instagram', href: links.instagram, icon: InstagramIcon },
  ];

  if (variant === 'sidebar') {
    return (
      <div className={`flex items-center justify-between px-2 text-slate-400 ${className}`}>
        {socialItems.map((item) => {
          const Icon = item.icon;
          return (
            <a
              key={item.name}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={item.name}
              className="p-2 rounded-lg text-slate-400 hover:text-orange-400 hover:bg-slate-800/60 transition-all duration-200"
            >
              <Icon size={iconSize} />
            </a>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialItems.map((item) => {
        const Icon = item.icon;
        return (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={item.name}
            className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/40 hover:bg-slate-800 transition-all duration-200 shadow-sm"
          >
            <Icon size={iconSize} />
          </a>
        );
      })}
      {links.email && (
        <a
          href={
            links.email.startsWith('http')
              ? links.email
              : `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(links.email)}`
          }
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Email"
          title="Send Email"
          className="w-10 h-10 rounded-xl bg-slate-900/80 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-orange-400 hover:border-orange-500/40 hover:bg-slate-800 transition-all duration-200 shadow-sm"
        >
          <Mail size={iconSize} />
        </a>
      )}
    </div>
  );
}
