import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

interface HeaderProps {
  onContactClick: () => void;
}

export default function Header({ onContactClick }: HeaderProps) {
  const { t } = useLanguage();
  const [activeSection, setActiveSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);

  const navItems = [
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Education', href: '#education', id: 'education' },
  ];


  useEffect(() => {
    // 1. Calculate scroll progress and background opacity changes
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
      }
      setIsScrolled(window.scrollY > 20);
    };

    // 2. Intersection Observer to spy on sections and update active indicator
    const observerOptions = {
      root: null,
      rootMargin: '-40% 0px -50% 0px', // Triggers when section occupies the sweet center spot
      threshold: 0,
    };

    const spySections = ['home', 'experience', 'work', 'skills', 'education'];
    const observers = spySections.map((id) => {
      const element = document.getElementById(id);
      if (!element) return null;

      const observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          setActiveSection(id);
        }
      }, observerOptions);

      observer.observe(element);
      return { observer, element };
    });

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observers.forEach((obs) => {
        if (obs) obs.observer.unobserve(obs.element);
      });
    };
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <header
      id="top-nav"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-surface/85 backdrop-blur-md border-b border-outline/15 shadow-sm py-3'
          : 'bg-transparent py-5'
      }`}
    >
      {/* Scroll Progress Indicator */}
      <div
        className="absolute top-0 left-0 h-[2px] bg-primary transition-all duration-100 ease-out z-50"
        style={{ width: `${scrollProgress}%` }}
        role="progressbar"
        aria-valuenow={scrollProgress}
        aria-valuemin={0}
        aria-valuemax={100}
      />

      <div className="flex justify-between items-center px-6 md:px-12 py-1 max-w-7xl mx-auto">
        {/* Brand Logo */}
        <a
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="flex items-center gap-2.5 group"
        >
          <div className="w-8 h-8 bg-primary flex items-center justify-center text-surface font-sans font-black text-xs transition-transform duration-300 group-hover:scale-105 shrink-0">AR</div>
          <span className="font-sans text-xs sm:text-sm font-black uppercase tracking-wider sm:tracking-widest text-primary transition-all duration-300 whitespace-nowrap">ALAN REZKY DWIPUTRA NUR</span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          <ul className="flex items-center gap-8">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`font-sans text-[11px] uppercase tracking-[0.2em] font-medium transition-all duration-300 pb-1 border-b hover:text-primary ${
                    activeSection === item.id
                      ? 'text-primary border-primary'
                      : 'text-on-surface-variant/75 border-transparent'
                  }`}
                >
                  {t(`nav.${item.id}`)}
                </a>
              </li>
            ))}
          </ul>
          <button
            onClick={onContactClick}
            className="cursor-pointer bg-transparent border border-primary text-primary px-5 py-2 rounded-none font-sans text-[10px] font-bold tracking-widest uppercase hover:bg-primary hover:text-surface transition-all duration-300 active:scale-95"
          >
            {t('nav.hire_me')}
          </button>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden text-primary duration-200 transition-all p-2 focus:outline-none"
          aria-expanded={isMobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed inset-x-0 top-[60px] bg-surface-container/95 backdrop-blur-xl border-b border-outline/15 shadow-xl md:hidden transition-all duration-300 ease-in-out transform origin-top ${
          isMobileMenuOpen ? 'opacity-100 scale-y-100 h-auto visible' : 'opacity-0 scale-y-0 h-0 invisible'
        }`}
      >
        <nav className="px-6 py-8 flex flex-col gap-6" aria-label="Mobile Navigation">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href)}
                  className={`block font-sans text-xs uppercase tracking-widest font-bold py-1.5 ${
                    activeSection === item.id ? 'text-primary' : 'text-on-surface-variant/75'
                  }`}
                >
                  {t(`nav.${item.id}`)}
                </a>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onContactClick();
              }}
              className="w-full text-center bg-primary text-surface px-5 py-2.5 rounded-none font-sans text-[10px] font-bold tracking-widest uppercase hover:bg-primary/90 transition-all duration-300"
            >
              {t('nav.hire_me')}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
}
