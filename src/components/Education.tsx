import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ChevronDown, GraduationCap, Award, Briefcase } from 'lucide-react';

export default function Education() {
  const { educationItems, t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="education" className="py-28 px-6 md:px-12 bg-[#F5F5F0]/30 relative overflow-hidden border-b border-outline/10">
      <div className="max-w-7xl mx-auto space-y-16">
        
        {/* Section Title */}
        <div className="text-center space-y-4">
          <span className="text-secondary text-[11px] font-bold tracking-[0.25em] uppercase">
            {t('edu.badge')}
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl text-primary tracking-tight uppercase">
            {t('edu.title')}
          </h2>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Vertical Connecting Line (sleek editorial solid gray line) */}
          <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 h-full w-[1px] bg-outline-variant" />

          {/* Timeline Items Stack */}
          <div className="space-y-16 relative">
            {educationItems.map((item, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === item.id;

              return (
                <div
                  key={item.id}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-center ${
                    isEven ? 'md:text-right' : ''
                  }`}
                >
                  
                  {/* Text Header Column (Master/Bachelor labels) */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      isEven ? 'md:pr-12' : 'order-1 md:order-2 md:pl-12'
                    }`}
                  >
                    <div className={`space-y-2 flex flex-col ${isEven ? 'md:items-end' : 'md:items-start'}`}>
                      <span className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-widest bg-[#F5F5F0] px-2.5 py-1 rounded-none border border-outline-variant">
                        <GraduationCap size={12} />
                        {item.period}
                      </span>
                      <h3 className="font-sans font-extrabold text-xl md:text-2xl text-primary">
                        {item.degree}
                      </h3>
                      <p className="text-on-surface-variant/80 font-sans text-xs uppercase tracking-widest font-bold">
                        {item.institution}
                      </p>
                      <p className={`text-on-surface-variant font-sans text-sm max-w-md text-justify ${isEven ? 'md:text-right' : 'md:text-left'}`}>
                        {item.description}
                      </p>
                    </div>
                  </div>

                  {/* Sharp Solid Node */}
                  <div
                    className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-none z-10 transition-transform duration-500 hover:scale-125 border border-[#FDFCFB]"
                  />

                  {/* Expandable Collapsible Details Card */}
                  <div
                    className={`pl-12 md:pl-0 ${
                      isEven ? 'md:pl-12' : 'order-2 md:order-1 md:pr-12'
                    }`}
                  >
                    <div className="bg-[#F5F5F0] rounded-none border border-outline-variant overflow-hidden shadow-sm hover:border-primary duration-300 transition-all">
                      <button
                        onClick={() => toggleExpand(item.id)}
                        className="cursor-pointer w-full p-4 flex justify-between items-center text-left font-sans text-[10px] font-bold uppercase tracking-widest text-primary hover:bg-[#E5E5E1]/30 duration-200 transition-colors"
                        aria-expanded={isExpanded}
                      >
                        <span className="flex items-center gap-2">
                          <Award size={12} className="text-primary" />
                          {t('edu.achievements')}
                        </span>
                        <ChevronDown
                          size={14}
                          className={`text-primary/70 transition-transform duration-300 ${
                            isExpanded ? 'rotate-180' : ''
                          }`}
                        />
                      </button>

                      {/* Collapsible Content Panel */}
                      <div
                        className={`transition-all duration-300 ease-in-out ${
                          isExpanded ? 'max-h-[2500px] border-t border-outline-variant opacity-100 p-5' : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        <div className="space-y-4">
                          {/* Academic Achievements */}
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                              <Award size={12} /> {t('edu.achievements')}
                            </h4>
                            <ul className="space-y-1.5 text-xs text-on-surface-variant pl-4 list-disc marker:text-primary text-justify">
                              {item.achievements.map((ach, idx) => (
                                <li key={idx} className="font-sans text-on-surface-variant/90 text-justify">{ach}</li>
                              ))}
                            </ul>
                          </div>

                          {/* Professional / Lab Experience */}
                          <div className="space-y-2">
                            <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary flex items-center gap-1.5">
                              <Briefcase size={12} /> {t('edu.roles')}
                            </h4>
                            <ul className="space-y-1.5 text-xs text-on-surface-variant pl-4 list-disc marker:text-primary text-justify">
                              {item.experience.map((exp, idx) => (
                                <li key={idx} className="font-sans text-on-surface-variant/90 text-justify">{exp}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
