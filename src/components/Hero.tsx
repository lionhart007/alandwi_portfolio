import React, { useEffect, useState } from 'react';
import { ArrowRight, FileText, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { PROFILE_IMAGE } from '../data';
import { formatImageUrl } from '../utils/imageHelper';

interface HeroProps {
  onContactClick: () => void;
  onPreviewCV: () => void;
}

export default function Hero({ onContactClick, onPreviewCV }: HeroProps) {
  const { language, setLanguage, t } = useLanguage();

  // Roles to cycle through in the typing effect
  const roles = [
    t('hero.typing.iot'),
    t('hero.typing.pm'),
    t('hero.typing.pe'),
    t('hero.typing.cad'),
    t('hero.typing.embedded'),
    t('hero.typing.educator')
  ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [typingSpeed, setTypingSpeed] = useState(100);

  // Reset typing when language toggles to keep it synchronized
  useEffect(() => {
    setTypedText('');
    setCurrentRoleIndex(0);
    setIsDeleting(false);
    setTypingSpeed(100);
  }, [language]);

  useEffect(() => {
    let timer: NodeJS.Timeout;
    const fullText = roles[currentRoleIndex];
    if (!fullText) return;

    const handleType = () => {
      if (!isDeleting) {
        setTypedText(fullText.substring(0, typedText.length + 1));
        if (typedText === fullText) {
          // Pause before deleting
          timer = setTimeout(() => setIsDeleting(true), 2500);
          return;
        }
      } else {
        setTypedText(fullText.substring(0, typedText.length - 1));
        if (typedText === '') {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
          setTypingSpeed(100);
          return;
        }
      }

      setTypingSpeed(isDeleting ? 40 : 100);
    };

    timer = setTimeout(handleType, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, currentRoleIndex, typingSpeed, language, roles]);

  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('work');
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  const handleDownloadCV = () => {
    // Elegant toast trigger or alert (using non-intrusive DOM updates or simple simulated download)
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-6 right-6 bg-surface-container border border-primary/20 text-on-surface px-5 py-3 rounded-xl shadow-2xl z-50 flex items-center gap-3 animate-slide-up duration-300';
    toast.innerHTML = `
      <div class="p-1 bg-primary/10 text-primary rounded-lg">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg>
      </div>
      <div>
        <h4 class="font-bold text-xs">${t('toast.cv_title')}</h4>
        <p class="text-[11px] text-on-surface-variant">${t('toast.cv_desc')}</p>
      </div>
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      setTimeout(() => toast.remove(), 400);
    }, 4000);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 pt-28 pb-16 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full relative z-10 space-y-8">
        
        {/* Full-width header row aligned with Welcome Badge on left and Translate button on right corner */}
        <div className="flex items-center justify-between gap-4 w-full border-b border-outline-variant/20 pb-4 animate-fade-in">
          <h2 className="text-secondary font-sans text-[11px] font-bold tracking-[0.25em] uppercase">
            {t('hero.welcome')}
          </h2>
          
          {/* Premium Mini Language Toggle aligned on the same line, positioned at the right corner */}
          <button
            onClick={() => setLanguage(language === 'en' ? 'id' : 'en')}
            className="cursor-pointer relative h-[26px] px-2.5 bg-surface-container border border-outline-variant/60 text-primary hover:text-white rounded-full flex items-center gap-2 hover:scale-105 active:scale-95 transition-all duration-300 hover:border-primary/50"
            title={language === 'en' ? 'Switch to Indonesian' : 'Ubah ke Bahasa Inggris'}
          >
            <Globe size={11} className="text-primary/70" />
            <span className="text-[8px] font-black tracking-wider font-sans uppercase">
              {language === 'en' ? 'EN' : 'ID'}
            </span>
            {/* Premium micro slide capsule */}
            <div className="relative w-6 h-3.5 bg-primary/20 rounded-full p-[1px] flex items-center">
              <div 
                className={`w-2.5 h-2.5 bg-primary rounded-full shadow transition-all duration-300 ${
                  language === 'en' ? 'translate-x-0' : 'translate-x-[10px]'
                }`}
              />
            </div>
          </button>
        </div>

        {/* Hero columns */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center w-full">
          {/* Text Content */}
          <div className="md:col-span-7 space-y-8 order-2 md:order-1 text-left">
            <div className="space-y-4">
              <h1 className="font-sans font-black text-5xl md:text-7xl text-primary leading-[0.95] tracking-tight">
                ALAN REZKY
              </h1>
            <div className="h-[40px] md:h-[48px] flex items-center">
              <p className="font-sans font-medium text-lg md:text-2xl text-primary/75">
                {typedText}
                <span className="inline-block w-[1px] h-5 md:h-7 ml-1 bg-primary animate-pulse" />
              </p>
            </div>
          </div>

          <p className="font-sans text-base md:text-lg text-on-surface-variant/90 max-w-xl leading-relaxed">
            {t('hero.desc')}
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <a
              href="#work"
              onClick={handleScrollToWork}
              className="cursor-pointer px-8 py-4 bg-primary text-surface rounded-none font-sans text-xs font-bold tracking-widest uppercase hover:bg-primary/90 duration-300 transition-all text-center"
            >
              {t('hero.portfolio')}
            </a>
            <button
              onClick={onPreviewCV}
              className="cursor-pointer px-8 py-4 border border-outline-variant bg-transparent hover:bg-surface-container rounded-none font-sans text-xs font-bold tracking-widest uppercase transition-all duration-300 text-primary flex items-center justify-center gap-2"
            >
              <FileText size={14} />
              {t('hero.cv')}
            </button>
            <button
              onClick={onContactClick}
              className="cursor-pointer px-6 py-4 text-secondary flex items-center justify-center gap-2 hover:gap-3 hover:text-primary duration-300 transition-all font-sans text-xs font-bold tracking-widest uppercase group"
            >
              {t('hero.contact')} 
              <ArrowRight size={14} className="group-hover:translate-x-1 duration-300 transition-transform" />
            </button>
          </div>
        </div>

        {/* Hero Image Block */}
        <div className="md:col-span-5 order-1 md:order-2 flex justify-center md:justify-end">
          <div className="relative group">
            {/* Image Container with Sharp Editorial Styling */}
            <div className="relative w-72 h-72 sm:w-80 sm:h-80 md:w-[360px] md:h-[360px] rounded-none overflow-hidden bg-surface-container-lowest p-2 border border-outline-variant shadow-sm transition-all duration-500 hover:scale-[1.01]">
              <img
                className="w-full h-full object-cover rounded-none select-none transition-all duration-500"
                referrerPolicy="no-referrer"
                alt="A professional close-up headshot of Alan Rezky, Internet of Things Engineer, Project Manager, and Project Engineer."
                src={formatImageUrl(PROFILE_IMAGE)}
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  );
}
