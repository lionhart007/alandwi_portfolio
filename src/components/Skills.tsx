import { useState } from 'react';
import { SKILL_ITEMS } from '../data';
import { useLanguage } from '../context/LanguageContext';
import { Sparkles, Terminal, Palette, Layers, Radio, Quote } from 'lucide-react';

export default function Skills() {
  const { softSkills, t } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'cad' | 'embedded' | 'iot'>('all');

  const filteredSkills = SKILL_ITEMS.filter((skill) => {
    if (activeFilter === 'all') return true;
    return skill.category === activeFilter;
  });

  // Map category to a visual icon
  const getSkillIcon = (category: string) => {
    switch (category) {
      case 'design':
        return <Palette className="text-secondary" size={16} />;
      case 'cad':
        return <Layers className="text-primary" size={16} />;
      case 'embedded':
        return <Terminal className="text-secondary" size={16} />;
      case 'iot':
        return <Radio className="text-primary" size={16} />;
      default:
        return <Sparkles className="text-secondary" size={16} />;
    }
  };

  return (
    <section id="skills" className="py-28 px-6 md:px-12 relative border-b border-outline/10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
        
        {/* Left Column: Technical Arsenal */}
        <div className="space-y-10">
          <div className="space-y-4">
            <h2 className="font-sans font-black text-3xl md:text-5xl text-primary tracking-tight uppercase">
              {t('skills.title')}
            </h2>
            <p className="text-on-surface-variant/80 font-sans text-sm md:text-base leading-relaxed">
              {t('skills.desc')}
            </p>
          </div>

          {/* Filtering Tabs */}
          <div className="flex flex-wrap gap-2 pb-2">
            {[
              { id: 'all', label: t('skills.filter.all') },
              { id: 'cad', label: t('skills.filter.cad') },
              { id: 'embedded', label: t('skills.filter.embedded') },
              { id: 'iot', label: t('skills.filter.iot') }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id as any)}
                className={`cursor-pointer px-4 py-2 rounded-none text-[10px] font-bold tracking-widest uppercase transition-all duration-300 ${
                  activeFilter === tab.id
                    ? 'bg-primary text-surface font-bold border border-primary'
                    : 'bg-transparent text-on-surface-variant hover:text-primary border border-outline-variant'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Clean Technical Skills List */}
          <div className="space-y-6 min-h-[220px]">
            {filteredSkills.map((skill) => (
              <div key={skill.name} className="space-y-3 group">
                <div className="flex justify-between items-center font-sans text-xs font-semibold">
                  <div className="flex items-center gap-2.5 text-primary">
                    {getSkillIcon(skill.category)}
                    <span className="uppercase tracking-wider text-[11px] md:text-xs font-bold font-sans">
                      {skill.name}
                    </span>
                  </div>
                  <span className="text-[10px] uppercase font-mono tracking-widest text-on-surface-variant font-semibold px-2 py-0.5 border border-outline-variant bg-[#F5F5F0]">
                    {skill.category}
                  </span>
                </div>
                
                {/* Thin, clean editorial line */}
                <div className="h-[1px] w-full bg-outline-variant group-hover:bg-primary transition-colors duration-300" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Soft Skills & Philosophy */}
        <div className="space-y-12">
          <div className="space-y-4">
            <h2 className="font-sans font-black text-3xl md:text-5xl text-primary tracking-tight uppercase">
              {t('skills.soft_title')}
            </h2>
            <p className="text-on-surface-variant/80 font-sans text-sm md:text-base leading-relaxed">
              {t('skills.soft_desc')}
            </p>
          </div>

          {/* Soft Skill Chips */}
          <div className="flex flex-wrap gap-2.5">
            {softSkills.map((skill) => (
              <span
                key={skill}
                className="px-5 py-2.5 rounded-none text-primary bg-transparent font-sans text-[10px] font-bold tracking-widest uppercase border border-outline-variant hover:border-primary cursor-default duration-300 transition-all shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>

          {/* Core Philosophy Box */}
          <div className="p-8 bg-[#F5F5F0] border border-outline-variant rounded-none relative overflow-hidden group shadow-sm">
            <div className="absolute -right-8 -bottom-8 text-primary/5 transform rotate-12 group-hover:scale-105 duration-500 transition-all">
              <Quote size={120} />
            </div>
            
            <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-2">
                <Quote size={14} className="text-primary rotate-180" />
                <h4 className="font-sans font-bold text-[10px] text-primary tracking-widest uppercase">
                  {t('skills.phil_title')}
                </h4>
              </div>
              <p className="text-primary/95 font-sans font-medium text-lg leading-relaxed">
                {t('skills.phil_desc')}
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
