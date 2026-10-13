import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import ShaderBackground from './components/ShaderBackground';
import Footer from './components/Footer';
import ContactModal from './components/ContactModal';
import CVPreview from './components/CVPreview';
import { ChevronUp } from 'lucide-react';

export default function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showCVPreview, setShowCVPreview] = useState(() => {
    return window.location.hash === '#cv';
  });

  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#cv') {
        setShowCVPreview(true);
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else {
        setShowCVPreview(false);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  useEffect(() => {
    // Scroll reveal observer
    const revealOptions = {
      root: null,
      rootMargin: '0px 0px -80px 0px',
      threshold: 0.1,
    };

    const handleReveal = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    };

    const observer = new IntersectionObserver(handleReveal, revealOptions);
    const elementsToReveal = document.querySelectorAll('.scroll-reveal');
    elementsToReveal.forEach((el) => observer.observe(el));

    // Handle back-to-top visibility
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showCVPreview]);

  const handleBackToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const handleOpenCV = () => {
    setShowCVPreview(true);
    window.location.hash = 'cv';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleCloseCV = () => {
    setShowCVPreview(false);
    if (window.location.hash === '#cv') {
      history.pushState(null, '', window.location.pathname);
    }
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  if (showCVPreview) {
    return <CVPreview onBack={handleCloseCV} />;
  }

  return (
    <div className="font-sans text-on-surface bg-[#FDFCFB] min-h-screen relative overflow-x-hidden selection:bg-[#1A1A1A] selection:text-[#FDFCFB]">
      {/* 1. Premium Shader GPU-accelerated backdrop */}
      <ShaderBackground />

      {/* 2. Top sticky navigation header */}
      <Header onContactClick={() => setIsContactOpen(true)} />

      {/* 3. Immersive narrative sections */}
      <main>
        <Hero 
          onContactClick={() => setIsContactOpen(true)} 
          onPreviewCV={handleOpenCV}
        />
        
        {/* Scroll-reveal wrappers to inject smooth cascading entry animations */}
        <div className="scroll-reveal transition-all duration-700 opacity-0 translate-y-8">
          <Experience />
        </div>

        <div className="scroll-reveal transition-all duration-700 opacity-0 translate-y-8">
          <Projects />
        </div>

        <div className="scroll-reveal transition-all duration-700 opacity-0 translate-y-8">
          <Skills />
        </div>

        <div className="scroll-reveal transition-all duration-700 opacity-0 translate-y-8">
          <Education />
        </div>
      </main>

      {/* 4. Contact/Booking Dialog Form */}
      <ContactModal isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* 5. Fluid Responsive Footer */}
      <Footer onContactClick={() => setIsContactOpen(true)} />

      {/* 6. Glowing float Back to Top button */}
      <button
        onClick={handleBackToTop}
        className={`cursor-pointer fixed bottom-6 right-6 z-40 bg-surface-container/80 backdrop-blur border border-white/10 text-primary hover:text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 hover:border-secondary/30 ${
          showBackToTop 
            ? 'opacity-100 translate-y-0 visible' 
            : 'opacity-0 translate-y-4 invisible pointer-events-none'
        }`}
        aria-label="Scroll back to top of page"
      >
        <ChevronUp size={20} />
      </button>

    </div>
  );
}
