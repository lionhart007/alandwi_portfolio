import React, { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { X, Send, CheckCircle2, ShieldAlert } from 'lucide-react';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const { t, language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [domain, setDomain] = useState('iot-monitoring');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setError(language === 'en' ? 'Please fill in all required fields.' : 'Mohon lengkapi semua data yang diperlukan.');
      return;
    }
    setError('');
    setIsSubmitting(true);

    // Simulate database/API persist with absolute premium responsive layout
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      
      // Save to localStorage so it demonstrates offline persistence
      const submissions = JSON.parse(localStorage.getItem('alex_contact_subs') || '[]');
      submissions.push({ name, email, domain, message, date: new Date().toISOString() });
      localStorage.setItem('alex_contact_subs', JSON.stringify(submissions));

      // Reset form fields
      setName('');
      setEmail('');
      setDomain('iot-monitoring');
      setMessage('');
    }, 1500);
  };

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={onClose}
    >
      <div
        className="bg-[#FDFCFB] border border-outline-variant rounded-none max-w-lg w-full p-6 md:p-8 shadow-2xl relative overflow-hidden text-primary"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="cursor-pointer absolute top-4 right-4 bg-[#F5F5F0] border border-outline-variant text-primary hover:bg-primary hover:text-surface p-2 rounded-none transition-all duration-200 z-10"
        >
          <X size={16} />
        </button>

        {isSubmitted ? (
          // Success State
          <div className="text-center py-8 space-y-6 animate-scale-up">
            <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 rounded-none flex items-center justify-center mx-auto text-emerald-800">
              <CheckCircle2 size={32} />
            </div>
            <div className="space-y-2">
              <h3 className="font-sans font-extrabold text-2xl text-primary uppercase tracking-wider">
                {t('contact.success')}
              </h3>
              <p className="text-on-surface-variant/80 text-sm max-w-sm mx-auto leading-relaxed font-sans">
                {t('contact.success_desc')}
              </p>
            </div>
            <button
              onClick={() => {
                setIsSubmitted(false);
                onClose();
              }}
              className="cursor-pointer px-5 py-3 bg-primary text-surface text-[10px] font-bold uppercase tracking-widest rounded-none hover:bg-primary/95 transition-all duration-300"
            >
              {language === 'en' ? 'Back to Portfolio' : 'Kembali ke Portofolio'}
            </button>
          </div>
        ) : (
          // Form State
          <div className="space-y-6 relative z-10">
            <div>
              <h3 className="font-sans font-black text-2xl text-primary uppercase tracking-wider">
                {t('contact.title')}
              </h3>
              <p className="text-on-surface-variant/80 text-xs mt-1 font-sans">
                {t('contact.desc')}
              </p>
            </div>

            {error && (
              <div className="p-3 bg-red-100 border border-red-300 rounded-none flex items-center gap-2.5 text-xs text-red-800">
                <ShieldAlert size={14} className="shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-primary/80 block">
                  {t('contact.name')} <span className="text-primary">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Sarah Connor"
                  className="w-full bg-[#F5F5F0] border border-outline-variant rounded-none px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/40 focus:border-primary outline-none duration-200"
                />
              </div>

              {/* Email */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-primary/80 block">
                  {t('contact.email')} <span className="text-primary">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. sarah@cyberdyne.com"
                  className="w-full bg-[#F5F5F0] border border-outline-variant rounded-none px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/40 focus:border-primary outline-none duration-200"
                />
              </div>

              {/* Project Domain Option */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-primary/80 block">
                  {language === 'en' ? 'Project Scope' : 'Kategori / Bidang Proyek'}
                </label>
                <select
                  value={domain}
                  onChange={(e) => setDomain(e.target.value)}
                  className="w-full bg-[#F5F5F0] border border-outline-variant rounded-none px-4 py-3 text-sm text-primary focus:border-primary outline-none duration-200 cursor-pointer"
                >
                  <option value="iot-monitoring">
                    {language === 'en' ? 'IoT & Smart Monitoring Systems (SHMS / AMI / THMS)' : 'Sistem IoT & Monitoring Cerdas (SHMS / AMI / THMS)'}
                  </option>
                  <option value="embedded-firmware">
                    {language === 'en' ? 'Embedded Systems & Firmware Development (STM32 / ESP32 / C/C++)' : 'Embedded Systems & Firmware (STM32 / ESP32 / C/C++)'}
                  </option>
                  <option value="hardware-pcb">
                    {language === 'en' ? 'Hardware Engineering & PCB Design (EasyEDA / Fusion 360 / Sensors)' : 'Rekayasa Hardware & Desain PCB (EasyEDA / Fusion 360 / Sensor)'}
                  </option>
                  <option value="cad-enclosure">
                    {language === 'en' ? '3D CAD Enclosure Design & Prototyping (Fusion 360 / SketchUp)' : 'Desain Casing 3D CAD & Prototyping (Fusion 360 / SketchUp)'}
                  </option>
                  <option value="field-commissioning">
                    {language === 'en' ? 'On-Site Installation, DAU/RTU Panel Assembly & QC' : 'Instalasi Lapangan, Perakitan Panel DAU/RTU & QC'}
                  </option>
                  <option value="iot-consulting">
                    {language === 'en' ? 'Technical Advisory & IoT Solutions Architecture' : 'Konsultasi Teknis & Solusi Arsitektur IoT'}
                  </option>
                </select>
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-widest text-primary/80 block">
                  {t('contact.message')} <span className="text-primary">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={language === 'en' ? 'Describe your project scope and timelines...' : 'Tuliskan detail proyek, kebutuhan, atau pertanyaan Anda di sini...'}
                  className="w-full bg-[#F5F5F0] border border-outline-variant rounded-none px-4 py-3 text-sm text-primary placeholder:text-on-surface-variant/40 focus:border-primary outline-none duration-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="cursor-pointer w-full py-4 bg-primary text-surface rounded-none font-sans text-[10px] font-bold tracking-widest uppercase flex items-center justify-center gap-2 hover:bg-primary/95 transition-all duration-300 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <div className="w-4 h-4 border-2 border-surface border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send size={12} /> {t('contact.send')}
                  </>
                )}
              </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
