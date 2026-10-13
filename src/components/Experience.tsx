import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Briefcase, Calendar, MapPin, ChevronDown, ChevronUp } from 'lucide-react';

export default function Experience() {
  const { workExperiences, t } = useLanguage();
  const [expandedId, setExpandedId] = useState<string | null>('langgeng-cipta-solusi');

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section id="experience" className="py-28 px-6 md:px-12 bg-surface relative overflow-hidden">
      {/* Background Decorative Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000005_1px,transparent_1px),linear-gradient(to_bottom,#00000005_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto mb-20">
          <span className="text-secondary text-[11px] font-bold tracking-[0.25em] uppercase">
            {t('exp.timeline')}
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl text-primary tracking-tight uppercase">
            {t('exp.title')}
          </h2>
          <p className="text-on-surface-variant/80 font-sans text-sm md:text-base leading-relaxed">
            {t('exp.desc')}
          </p>
        </div>

        {/* Timeline Layout */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical Center Line */}
          <div className="absolute left-4 md:left-1/2 top-2 bottom-2 w-[1px] bg-outline-variant/55 md:-translate-x-1/2 pointer-events-none" />

          <div className="space-y-12">
            {workExperiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              const isExpanded = expandedId === exp.id;

              return (
                <div 
                  key={exp.id} 
                  className={`relative flex flex-col md:flex-row items-stretch ${
                    isEven ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-4 md:left-1/2 top-6 w-3.5 h-3.5 bg-surface border-2 border-primary rounded-full md:-translate-x-1/2 z-20 transition-all duration-300 group-hover:scale-125" />

                  {/* Spacer Column for desktop alignment */}
                  <div className="hidden md:block md:w-1/2" />

                  {/* Experience Card Container */}
                  <div className="w-full md:w-1/2 pl-10 md:pl-0 md:px-8">
                    <div 
                      onClick={() => toggleExpand(exp.id)}
                      className={`cursor-pointer group relative p-6 md:p-8 bg-surface-container-low border transition-all duration-300 rounded-none shadow-sm hover:shadow-md hover:bg-surface-container-high ${
                        isExpanded 
                          ? 'border-primary' 
                          : 'border-outline-variant hover:border-primary/50'
                      }`}
                    >
                      {/* Hover border effect */}
                      <div className={`absolute top-0 ${isEven ? 'left-0' : 'right-0'} w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-300`} />

                      {/* Top Header Row */}
                      <div className="flex justify-between items-start gap-4">
                        <div className="space-y-1.5">
                          <span className="text-secondary text-[10px] font-extrabold uppercase tracking-widest block">
                            {exp.position}
                          </span>
                          <h3 className="font-sans font-black text-xl text-primary group-hover:text-primary/90 transition-colors">
                            {exp.company}
                          </h3>
                        </div>
                        <button 
                          className="p-1 rounded-none text-on-surface-variant/70 hover:text-primary transition-colors focus:outline-none"
                          aria-label={isExpanded ? "Collapse details" : "Expand details"}
                        >
                          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                        </button>
                      </div>

                      {/* Meta Information (Date & Location) */}
                      <div className="flex flex-wrap gap-x-4 gap-y-2 mt-4 pt-4 border-t border-outline-variant/50 text-xs text-on-surface-variant/85 font-semibold uppercase tracking-wider">
                        <div className="flex items-center gap-1.5">
                          <Calendar size={13} className="text-secondary" />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin size={13} className="text-secondary" />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Interactive Description Blocks */}
                      <div 
                        className={`transition-all duration-500 ease-in-out origin-top ${
                          isExpanded 
                            ? 'max-h-[3000px] mt-6 opacity-100 pt-4 border-t border-outline-variant/50' 
                            : 'max-h-0 opacity-0 overflow-hidden'
                        }`}
                      >
                        <ul className="space-y-3.5 text-xs text-on-surface-variant/95 leading-relaxed pl-1 text-justify">
                          {exp.description.map((desc, idx) => (
                            <li key={idx} className="flex gap-2.5 items-start">
                              <span className="w-1.5 h-1.5 bg-primary/80 rounded-full shrink-0 mt-1.5" />
                              <span className="font-sans text-justify">{desc}</span>
                            </li>
                          ))}
                        </ul>
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
