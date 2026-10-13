import { useState } from 'react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, X, Play, Pause, ChevronLeft, ChevronRight, CheckCircle2, Award, Calendar } from 'lucide-react';
import { formatImageUrl } from '../utils/imageHelper';

export default function Projects() {
  const { projects, t } = useLanguage();
  const [selectedProjectId, setSelectedProjectId] = useState<string | null>(null);
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const selectedProject = projects.find(p => p.id === selectedProjectId) || null;

  // Combine images and videos for a unified lightbox media array
  const getProjectMedia = (project: Project) => {
    const media: { type: 'image' | 'video'; url: string }[] = [];
    project.gallery.forEach((img) => media.push({ type: 'image', url: formatImageUrl(img) }));
    project.videos.forEach((vid) => media.push({ type: 'video', url: vid }));
    return media.slice(0, 10);
  };

  const handleOpenProject = (project: Project) => {
    setSelectedProjectId(project.id);
    setActiveMediaIndex(0);
    setIsVideoPlaying(false);
  };

  const handleCloseProject = () => {
    setSelectedProjectId(null);
    setIsVideoPlaying(false);
  };

  const nextMedia = (mediaLength: number) => {
    setActiveMediaIndex((prev) => (prev + 1) % mediaLength);
    setIsVideoPlaying(false);
  };

  const prevMedia = (mediaLength: number) => {
    setActiveMediaIndex((prev) => (prev - 1 + mediaLength) % mediaLength);
    setIsVideoPlaying(false);
  };

  return (
    <section id="work" className="py-28 px-6 md:px-12 bg-[#F5F5F0]/30 border-y border-outline/10 relative">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Section Header */}
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <span className="text-secondary text-[11px] font-bold tracking-[0.25em] uppercase">
            {t('proj.badge')}
          </span>
          <h2 className="font-sans font-black text-3xl md:text-5xl text-primary tracking-tight uppercase">
            {t('proj.title')}
          </h2>
          <p className="text-on-surface-variant/80 font-sans text-sm md:text-base leading-relaxed">
            {t('proj.desc')}
          </p>
        </div>

        {/* Dynamic Project Grid (Matches the UI Design spacing and layout with Editorial Aesthetic) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              onClick={() => handleOpenProject(project)}
              className="group relative h-[520px] rounded-none overflow-hidden bg-surface-container border border-outline-variant shadow-sm cursor-pointer hover:border-primary transition-all duration-500 flex flex-col justify-end"
            >
              <div 
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-[1.03]"
                style={{ backgroundImage: `url('${formatImageUrl(project.coverImage)}')` }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/95 via-[#1A1A1A]/40 to-transparent" />
              
              <div className="relative p-6 w-full z-10 text-white flex flex-col justify-end">
                <div className="space-y-3">
                  <div className="flex flex-col gap-1.5 items-start">
                    <span className="px-2.5 py-1 bg-surface/90 text-primary text-[9px] font-bold tracking-widest uppercase rounded-none border border-outline-variant inline-block">
                      {project.position}
                    </span>
                    {project.duration && (
                      <span className="px-2.5 py-1 bg-black/60 backdrop-blur-xs text-white/95 text-[10px] font-semibold tracking-wider rounded-none border border-white/20 inline-flex items-center gap-1.5 flex-wrap">
                        <Calendar size={11} className="text-secondary shrink-0" />
                        <span className="text-white/80 font-medium text-[9.5px]">Project Time:</span>
                        <span>{project.duration}</span>
                      </span>
                    )}
                  </div>
                  <h3 className="font-sans font-bold text-lg md:text-xl text-white mt-1 leading-snug">
                    {project.title}
                  </h3>
                  <p className="text-neutral-200 text-xs md:text-sm font-sans line-clamp-3 leading-relaxed text-justify">
                    {project.description}
                  </p>
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="flex items-center gap-1.5 text-[9px] font-bold tracking-wide uppercase text-white/90">
                      <Award size={13} className="text-white/80 shrink-0" />
                      <span className="truncate">{t('proj.results')}: {t('proj.results_short')}</span>
                    </span>
                    <button className="cursor-pointer shrink-0 flex items-center gap-1 text-white/90 text-[10px] font-bold tracking-widest uppercase hover:text-white transition-all duration-300">
                      {t('proj.view_details')} <ArrowUpRight size={11} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox / Video Popup Drawer Modal */}
      {selectedProject && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto animate-fade-in"
          onClick={handleCloseProject}
        >
          <div 
            className="bg-[#FDFCFB] border border-outline-variant rounded-none max-w-5xl w-full max-h-[90vh] overflow-y-auto shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={handleCloseProject}
              className="cursor-pointer absolute top-4 right-4 z-10 bg-[#F5F5F0] border border-outline-variant text-primary hover:bg-primary hover:text-surface p-2 rounded-none transition-all duration-200"
            >
              <X size={16} />
            </button>

            {/* Modal Body */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 md:p-8">
              
              {/* Media Gallery (Images + Videos) - taking 7 cols on lg */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="relative aspect-video rounded-none overflow-hidden bg-[#F5F5F0] border border-outline-variant flex items-center justify-center group shadow-sm">
                  {getProjectMedia(selectedProject)[activeMediaIndex]?.type === 'video' ? (
                    <div className="relative w-full h-full">
                      <video 
                        key={getProjectMedia(selectedProject)[activeMediaIndex].url}
                        className="w-full h-full object-cover"
                        controls={isVideoPlaying}
                        autoPlay={false}
                        playsInline
                        muted
                      >
                        <source src={getProjectMedia(selectedProject)[activeMediaIndex].url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {!isVideoPlaying && (
                        <div 
                          className="absolute inset-0 bg-black/20 flex items-center justify-center cursor-pointer"
                          onClick={() => setIsVideoPlaying(true)}
                        >
                          <div className="w-14 h-14 rounded-none bg-[#FDFCFB] border border-outline-variant text-primary flex items-center justify-center shadow-md hover:bg-primary hover:text-surface transition-all duration-300">
                            <Play size={20} className="ml-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <img 
                      src={getProjectMedia(selectedProject)[activeMediaIndex]?.url} 
                      alt={selectedProject.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  )}

                  {/* Left/Right Slideshow Toggles */}
                  {getProjectMedia(selectedProject).length > 1 && (
                    <>
                      <button 
                        onClick={() => prevMedia(getProjectMedia(selectedProject).length)}
                        className="cursor-pointer absolute left-3 top-1/2 -translate-y-1/2 bg-[#FDFCFB]/90 border border-outline-variant text-primary p-2 rounded-none hover:bg-primary hover:text-surface duration-200"
                      >
                        <ChevronLeft size={16} />
                      </button>
                      <button 
                        onClick={() => nextMedia(getProjectMedia(selectedProject).length)}
                        className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 bg-[#FDFCFB]/90 border border-outline-variant text-primary p-2 rounded-none hover:bg-primary hover:text-surface duration-200"
                      >
                        <ChevronRight size={16} />
                      </button>
                    </>
                  )}
                </div>

                {/* Thumbnails list */}
                {getProjectMedia(selectedProject).length > 1 && (
                  <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {getProjectMedia(selectedProject).map((media, idx) => (
                      <button
                        key={idx}
                        onClick={() => {
                          setActiveMediaIndex(idx);
                          setIsVideoPlaying(false);
                        }}
                        className={`cursor-pointer relative w-20 aspect-video rounded-none overflow-hidden border transition-all shrink-0 ${
                          activeMediaIndex === idx ? 'border-primary ring-1 ring-primary' : 'border-outline-variant'
                        }`}
                      >
                        {media.type === 'video' ? (
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center text-white">
                            <Play size={12} />
                          </div>
                        ) : (
                          <img src={media.url} className="w-full h-full object-cover" alt="" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Text Specs Details - taking 5 cols on lg */}
              <div className="lg:col-span-5 flex flex-col justify-between gap-6 text-primary">
                <div className="space-y-5">
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-secondary text-[10px] font-bold uppercase tracking-widest">{selectedProject.position}</span>
                      {selectedProject.duration && (
                        <>
                          <span className="text-on-surface-variant/40">&bull;</span>
                          <span className="inline-flex items-center gap-1.5 text-primary text-[10px] font-semibold uppercase tracking-wider bg-outline/10 px-2 py-0.5">
                            <Calendar size={11} className="text-secondary shrink-0" />
                            <span className="text-on-surface-variant/80 font-medium lowercase first-letter:uppercase">Project Time:</span>
                            {selectedProject.duration}
                          </span>
                        </>
                      )}
                    </div>
                    <h3 className="font-sans font-extrabold text-2xl text-primary mt-1">{selectedProject.title}</h3>
                    <p className="text-[11px] text-on-surface-variant/70 font-sans uppercase tracking-widest font-semibold mt-1">{selectedProject.company}</p>
                  </div>

                  <p className="text-on-surface-variant text-sm font-sans leading-relaxed text-justify">
                    {selectedProject.description}
                  </p>

                  {/* Responsibilities list */}
                  <div className="space-y-2 pt-2">
                    <h4 className="font-sans font-bold text-[10px] text-primary uppercase tracking-widest">
                      {t('proj.responsibilities')}
                    </h4>
                    <ul className="space-y-2 text-xs text-on-surface-variant">
                      {selectedProject.responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex gap-2 items-start">
                          <CheckCircle2 size={12} className="text-primary shrink-0 mt-0.5" />
                          <span className="font-sans text-on-surface-variant/90 text-justify">{resp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Tags & Results Footer */}
                <div className="space-y-4 pt-4 border-t border-outline-variant">
                  <div className="flex flex-wrap gap-1.5">
                    {selectedProject.technologies.map((tech) => (
                      <span 
                        key={tech} 
                        className="px-2.5 py-1 bg-[#F5F5F0] text-primary text-[9px] font-bold tracking-widest uppercase rounded-none border border-outline-variant"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="p-4 bg-[#F5F5F0] border border-outline-variant rounded-none flex items-start gap-3">
                    <Award className="text-primary shrink-0 mt-0.5" size={16} />
                    <div>
                      <h4 className="font-bold text-[10px] text-primary uppercase tracking-widest">
                        {t('proj.results')}
                      </h4>
                      <p className="text-xs text-on-surface-variant mt-1 font-sans text-justify">{selectedProject.results}</p>
                    </div>
                  </div>
                </div>

              </div>



            </div>
          </div>
        </div>
      )}
    </section>
  );
}
