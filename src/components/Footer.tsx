import React from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SOCIAL_LINKS } from '../data';

interface FooterProps {
  onContactClick: () => void;
}

export default function Footer({ onContactClick }: FooterProps) {
  const { language } = useLanguage();
  const currentYear = new Date().getFullYear();

  const handleSocialClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    window.open(href, '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="w-full py-16 bg-[#F5F5F0] border-t border-outline-variant relative z-10 text-primary">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 max-w-7xl mx-auto gap-8">
        
        {/* Brand Copyright */}
        <div className="space-y-1 text-center md:text-left">
          <span className="font-sans font-black uppercase text-sm text-primary tracking-widest">
            ALAN REZKY DWIPUTRA NUR
          </span>
          <p className="text-on-surface-variant/70 text-xs font-sans">
            &copy; {currentYear} Alan Rezky Dwiputra Nur. {language === 'en' ? 'All rights reserved.' : 'Hak cipta dilindungi undang-undang.'}
          </p>
        </div>

        {/* Social Nav Links (Only LinkedIn, GitHub, and WhatsApp) */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10">
          {SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => handleSocialClick(e, link.href)}
              className="text-on-surface-variant/80 hover:text-primary text-xs font-bold uppercase tracking-widest transition-all duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>

      </div>
    </footer>
  );
}
