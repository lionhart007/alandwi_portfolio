import React, { useState } from 'react';
import { ArrowLeft, Download, Loader2, FileText } from 'lucide-react';
import { CONTACT_INFO } from '../data';
import jsPDF from 'jspdf';
import { toPng } from 'html-to-image';

interface CVPreviewProps {
  onBack: () => void;
}

export default function CVPreview({ onBack }: CVPreviewProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  // Precision off-screen A4 renderer that guarantees 100% distortion-free / non-stretched output
  // High-fidelity 2-page PDF generation strictly preserving aspect ratio (never stretched, never blank)
  const handleDownloadPDF = async () => {
    const page1 = document.getElementById('cv-page-1');
    const page2 = document.getElementById('cv-page-2');
    if (!page1) return;

    try {
      setIsDownloading(true);

      if (document.fonts) {
        await document.fonts.ready;
      }

      // Temporarily remove shadow and border during export for crisp borderless paper edges
      const originalBorder1 = page1.style.border;
      const originalShadow1 = page1.style.boxShadow;
      page1.style.border = 'none';
      page1.style.boxShadow = 'none';

      let originalBorder2 = '';
      let originalShadow2 = '';
      if (page2) {
        originalBorder2 = page2.style.border;
        originalShadow2 = page2.style.boxShadow;
        page2.style.border = 'none';
        page2.style.boxShadow = 'none';
      }

      try {
        // 1. Capture Page 1 directly from the active live DOM
        const imgData1 = await toPng(page1, {
          quality: 1.0,
          pixelRatio: 2.0,
          backgroundColor: '#ffffff',
          skipFonts: true,
          fontEmbedCSS: '',
        });

        // 2. Capture Page 2 if present
        let imgData2: string | null = null;
        if (page2) {
          imgData2 = await toPng(page2, {
            quality: 1.0,
            pixelRatio: 2.0,
            backgroundColor: '#ffffff',
            skipFonts: true,
            fontEmbedCSS: '',
          });
        }

        const pdf = new jsPDF({
          orientation: 'portrait',
          unit: 'mm',
          format: 'a4',
          compress: true,
        });

        const pdfWidth = 210; // mm
        const pdfHeight = 297; // mm

        // Helper: strictly preserve aspect ratio to guarantee zero stretching (ScaleX === ScaleY)
        const addProportionalPage = (imgData: string) => {
          const imgProps = pdf.getImageProperties(imgData);
          const imgAspect = imgProps.width / imgProps.height;
          const pageAspect = pdfWidth / pdfHeight;

          let renderWidth = pdfWidth;
          let renderHeight = pdfHeight;
          let xOffset = 0;
          let yOffset = 0;

          if (imgAspect > pageAspect) {
            // Content is proportionally wider: fit to width, zero stretching
            renderWidth = pdfWidth;
            renderHeight = pdfWidth / imgAspect;
            yOffset = 0;
          } else {
            // Content is proportionally taller or exact: fit to height, center horizontally
            renderHeight = pdfHeight;
            renderWidth = pdfHeight * imgAspect;
            xOffset = (pdfWidth - renderWidth) / 2;
          }

          pdf.addImage(imgData, 'PNG', xOffset, yOffset, renderWidth, renderHeight, undefined, 'FAST');
        };

        // Render Page 1
        addProportionalPage(imgData1);

        // Render Page 2
        if (imgData2) {
          pdf.addPage('a4', 'portrait');
          addProportionalPage(imgData2);
        }

        pdf.save('CV_Alan_Rezky_Dwiputra_Nur.pdf');
      } finally {
        page1.style.border = originalBorder1;
        page1.style.boxShadow = originalShadow1;
        if (page2) {
          page2.style.border = originalBorder2;
          page2.style.boxShadow = originalShadow2;
        }
      }
    } catch (err) {
      console.error('Direct PDF export error, falling back to print dialog:', err);
      window.print();
    } finally {
      setIsDownloading(false);
    }
  };

  const serifStyle = {
    fontFamily: '"Times New Roman", Times, "Liberation Serif", Georgia, serif',
  };

  return (
    <div className="min-h-screen bg-[#E5E3DE] text-neutral-900 py-6 sm:py-10 px-2 sm:px-6 relative">
      
      {/* Precision CSS Stylesheet for Screen & Print */}
      <style>{`
        .cv-sheet {
          width: 100%;
          max-width: 794px;
          min-height: 1123px;
          margin: 0 auto;
          box-sizing: border-box;
          background: #ffffff;
        }
        .cv-sheet .text-justify {
          text-align: justify !important;
          text-justify: inter-word;
        }
        @media print {
          @page {
            size: A4 portrait;
            margin: 0;
          }
          body {
            background: #ffffff !important;
            color: #000000 !important;
          }
          .no-print {
            display: none !important;
          }
          .cv-page-container {
            padding: 0 !important;
            margin: 0 !important;
            background: transparent !important;
          }
          .cv-sheet {
            width: 210mm !important;
            height: 297mm !important;
            min-height: 297mm !important;
            max-height: 297mm !important;
            box-shadow: none !important;
            border: none !important;
            margin: 0 auto !important;
            padding: 16mm 18mm !important;
            page-break-after: always !important;
            break-after: page !important;
            box-sizing: border-box !important;
            overflow: hidden !important;
          }
          .cv-sheet:last-child {
            page-break-after: auto !important;
            break-after: auto !important;
          }
        }
      `}</style>

      {/* Top Floating Action Bar (Hidden when printing) */}
      <div className="no-print max-w-[794px] mx-auto mb-6 flex flex-wrap items-center justify-between gap-3 bg-[#1A1A1A] text-white px-5 py-3.5 rounded-none shadow-2xl border border-white/10 sticky top-4 z-50">
        <button
          onClick={onBack}
          className="cursor-pointer flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-300 hover:text-white transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Portfolio</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-3">
          <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 bg-white/10 text-[11px] font-sans text-neutral-300">
            <FileText size={13} className="text-emerald-400" />
            <span>ATS 2-Page A4 Format</span>
          </div>

          {/* Primary Direct Download PDF Button */}
          <button
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="cursor-pointer flex items-center gap-2 px-5 py-2.5 bg-white text-black text-xs font-extrabold uppercase tracking-wider rounded-none hover:bg-neutral-200 shadow-md transition-all duration-200 active:scale-95 disabled:opacity-75 disabled:cursor-wait"
            title="Download clean 2-page CV as PDF file"
          >
            {isDownloading ? (
              <>
                <Loader2 size={15} className="animate-spin text-black" />
                <span>Generating PDF...</span>
              </>
            ) : (
              <>
                <Download size={15} />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Helpful Hint on Screen (Hidden when printing) */}
      <div className="no-print max-w-[794px] mx-auto mb-4 text-center">
        <p className="text-[11px] text-neutral-700 font-sans">
          Standardized <span className="font-bold text-neutral-900">2-Page A4 ATS Curriculum Vitae</span> format optimized for clean layout and precision export.
        </p>
      </div>

      <div className="cv-page-container max-w-[794px] mx-auto space-y-8">
        
        {/* ======================================================== */}
        {/* PAGE 1: HEADER, PROFESSIONAL EXPERIENCE, EDUCATION       */}
        {/* ======================================================== */}
        <div className="relative">
          <div className="no-print mb-2 text-right">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-neutral-500 bg-neutral-200/80 px-2.5 py-1">
              Page 1 of 2
            </span>
          </div>

          <div
            id="cv-page-1"
            className="cv-sheet bg-white text-black p-8 sm:p-12 md:p-14 shadow-2xl rounded-none border border-neutral-300 select-text"
            style={serifStyle}
          >
            {/* Document Header */}
            <header className="text-center pb-3 mb-4 border-b-[1.5px] border-black">
              <h1 className="text-2xl sm:text-[28px] font-bold uppercase tracking-wide text-black mb-1.5 leading-tight">
                {CONTACT_INFO.name}
              </h1>
              <p className="text-[12px] sm:text-[12.5px] text-[#222222] leading-relaxed">
                <span>{CONTACT_INFO.location}</span>
                <span className="mx-2 font-light text-neutral-400">|</span>
                <a href={`tel:${CONTACT_INFO.phone.replace(/[^0-9+]/g, '')}`} className="hover:underline text-black font-medium">
                  {CONTACT_INFO.phone}
                </a>
                <span className="mx-2 font-light text-neutral-400">|</span>
                <a href={`mailto:${CONTACT_INFO.email}`} className="hover:underline text-black font-medium">
                  {CONTACT_INFO.email}
                </a>
                <br />
                <a href={CONTACT_INFO.linkedinUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-black">
                  {CONTACT_INFO.linkedin}
                </a>
                <span className="mx-2 font-light text-neutral-400">|</span>
                <a href={CONTACT_INFO.githubUrl} target="_blank" rel="noopener noreferrer" className="hover:underline text-black">
                  {CONTACT_INFO.github}
                </a>
              </p>
            </header>

            {/* SECTION: PROFESSIONAL EXPERIENCE */}
            <section className="mb-5">
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2.5">
                Professional Experience
              </h2>

              {/* Langgeng Cipta Solusi */}
              <div className="mb-4">
                <div className="flex justify-between items-baseline flex-wrap text-[12.5px] sm:text-[13px]">
                  <span className="font-bold uppercase text-black">Langgeng Cipta Solusi</span>
                  <span className="font-bold text-black text-right">Bandung, West Java</span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px] italic text-[#333333]">
                  <span>Internet of Things Developer, Hardware Engineer, 3D CAD Designer, Project Manager, and Project Engineer</span>
                  <span className="font-normal not-italic text-black text-right">Dec 2022 — Present</span>
                </div>

                <ul className="list-disc pl-4 text-[11px] sm:text-[11.5px] text-[#111111] space-y-1.5 mt-1 leading-snug text-justify">
                  <li>
                    Developed high-reliability RTU (Remote Terminal Unit) firmware for real-time sensor data acquisition and smart modem firmware to read and transmit AMI (Advanced Metering Infrastructure) electric meter data across STM32 ARM 32-bit, ESP32, and ATmega microcontrollers, integrating DLMS/COSEM, MQTT, Wi-Fi, and custom fiber-optic protocols.
                  </li>
                  <li>
                    Designed custom PCB layouts and optimized existing PCB component architectures using EasyEDA and Fusion 360, developing reliable power distribution circuitry and multi-sensor interfaces (tiltmeter, strain gauge, 2D/3D anemometers, accelerometers, cable tension sensors, and LVDT); conducted laboratory and on-site sensor calibrations.
                  </li>
                  <li>
                    Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs, and utilized SketchUp to simulate bridge sensor placement and field installation layouts; coordinated with <span className="font-bold">PT ADS</span> for the production of SHMS panel enclosures and supporting equipment, and with <span className="font-bold">PT Pudak Scientific</span> for Smart Meter Like AMI, DCU, and THMS enclosures across design, costing, timelines, and business model formulation.
                  </li>
                  <li>
                    Served as Project Manager for the Sei Wampu Toll Bridge SHMS handling the project end-to-end, communicating directly with client <span className="font-bold">PT Hutama Karya Indonesia</span> for planning, site permits, and project handover, while handling on-site sensor installation and integration in the field; served as Project Engineer for the Sodongkopo Bridge SHMS (Pangandaran) for client <span className="font-bold">West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V)</span> handling sensor installation and integration on the bridge from start to finish; served as Sensor Developer for the Merah Putih Bridge SHMS (Ambon) developing the multi-sensor monitoring suite, firmware, PCB layouts, and sensor calibrations; and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure all delivered instruments and monitoring systems functioned flawlessly in strict accordance with client specifications.
                  </li>
                </ul>
              </div>

              {/* BrightCHAMPS */}
              <div>
                <div className="flex justify-between items-baseline flex-wrap text-[12.5px] sm:text-[13px]">
                  <span className="font-bold uppercase text-black">BrightCHAMPS</span>
                  <span className="font-bold text-black text-right">Indonesia (Remote)</span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px] italic text-[#333333]">
                  <span>Coding Educator</span>
                  <span className="font-normal not-italic text-black text-right">Sep 2023 — Dec 2024</span>
                </div>

                <ul className="list-disc pl-4 text-[11px] sm:text-[11.5px] text-[#111111] space-y-1 mt-1 leading-snug text-justify">
                  <li>
                    Taught core coding principles and computational thinking to students across diverse age groups.
                  </li>
                  <li>
                    Instructed programming languages and environments including Python, Scratch / Code blocks, JavaScript, HTML, CSS, C, and C++.
                  </li>
                </ul>
              </div>
            </section>

            {/* SECTION: KEY ENGINEERING PROJECTS (PART 1) */}
            <section>
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Key Engineering Projects
              </h2>

              <div className="space-y-2.5">
                {/* SHM Pangandaran */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Structural Health Monitoring System at Sodongkopo Bridge, Pangandaran, West Java</span>
                    <span className="text-black text-[11px]"><span className="text-neutral-500 font-semibold">Project Time: </span>Jun 2026 — Oct 2026</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Served as Project Engineer on the Sodongkopo Bridge SHMS project for client <span className="font-bold">West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V)</span> handling sensor installation and integration on the bridge from start to finish; supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections; coordinated with PT ADS for enclosure panels and supporting SHMS equipment; designed dustproof and waterproof (weatherproof) sensor enclosures in Fusion 360 to optimize production costs, and used SketchUp to simulate bridge sensor placement; developed custom PCB layouts and component circuitry using EasyEDA and Fusion 360; and conducted Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure all delivered equipment functioned in strict accordance with client specifications.
                  </p>
                </div>

                {/* SHM Seiwampu */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Structural Health Monitoring System at Sei Wampu Toll Bridge, Medan, North Sumatera</span>
                    <span className="text-black text-[11px]"><span className="text-neutral-500 font-semibold">Project Time: </span>Aug 2024 — Oct 2025</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Served as Project Manager handling the Sei Wampu Toll Bridge SHMS project from inception to completion, communicating directly with client <span className="font-bold">PT Hutama Karya Indonesia</span> regarding project planning, project permits &amp; site licensing, and final project handover, and handling on-site sensor installation and integration in the field from start to finish; supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections; developed RTU firmware and custom PCB layouts with fiber-optic communication protocols; coordinated with PT ADS for enclosure panels and supporting equipment; designed dustproof and waterproof sensor enclosures in Fusion 360 to reduce production costs, and simulated sensor placement using SketchUp; and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to guarantee all delivered systems functioned flawlessly according to client specifications.
                  </p>
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* ======================================================== */}
        {/* PAGE 2: KEY ENGINEERING PROJECTS, ADDITIONAL, SKILLS     */}
        {/* ======================================================== */}
        <div className="relative">
          <div className="no-print mb-2 text-right">
            <span className="text-[11px] font-sans font-semibold uppercase tracking-widest text-neutral-500 bg-neutral-200/80 px-2.5 py-1">
              Page 2 of 2
            </span>
          </div>

          <div
            id="cv-page-2"
            className="cv-sheet bg-white text-black p-8 sm:p-12 md:p-14 shadow-2xl rounded-none border border-neutral-300 select-text"
            style={serifStyle}
          >
            {/* Header on Page 2 */}
            <div className="flex justify-between items-center text-[10px] uppercase tracking-wider text-neutral-500 pb-2 mb-3 border-b border-neutral-300">
              <span className="font-bold text-black">{CONTACT_INFO.name} — CURRICULUM VITAE</span>
              <span>Page 2 of 2</span>
            </div>

            {/* SECTION: KEY ENGINEERING PROJECTS */}
            <section className="mb-4">
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Key Engineering Projects (Continued)
              </h2>

              <div className="space-y-2.5">
                {/* SHM Ambon */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Structural Health Monitoring System at Merah Putih Bridge, Ambon, Maluku</span>
                    <span className="text-black text-[11px]"><span className="text-neutral-500 font-semibold">Project Time: </span>Jun 2023 — Apr 2024</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Served as Sensor Developer for the Merah Putih Bridge SHMS project in Ambon, Maluku. Developed custom sensor firmware and PCB layouts (EasyEDA &amp; Fusion 360) for multi-sensor suites with Wi-Fi telemetry, independent power distribution, and instrument calibrations; supervised device production workflows, DAU panel assembly, and QC inspections; and coordinated with PT ADS for enclosure panels and supporting SHMS equipment.
                  </p>
                </div>

                {/* Smart Water Meter */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Smart Water Meter Monitoring System</span>
                    <span className="text-neutral-500 text-[11px]">Langgeng Cipta Solusi</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Designed dustproof and waterproof (weatherproof) sensor enclosures in Fusion 360, optimizing dimensions and material selection to reduce production costs; developed RTU firmware for real-time sensor data acquisition; and managed the end-to-end production pipeline from assembly, QC inspections, sensor data accuracy validation, to functional field readiness testing.
                  </p>
                </div>

                {/* Modem Smart Meter AMI */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Modem for Smart Meter AMI (Advanced Metering Infrastructure)</span>
                    <span className="text-neutral-500 text-[11px]">Langgeng Cipta Solusi</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Developed high-reliability smart modem firmware to read and transmit AMI (Advanced Metering Infrastructure) electric meter data across STM32 ARM 32-bit microcontrollers, implementing DLMS/COSEM communication protocols and cellular/Wi-Fi telemetry; designed custom PCB layouts and optimized component circuitry using EasyEDA and Fusion 360.
                  </p>
                </div>

                {/* Smart Meter Like AMI & DCU */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Smart Meter Like AMI and DCU (Data Collector Unit)</span>
                    <span className="text-neutral-500 text-[11px]">Langgeng Cipta Solusi</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Coordinated with PT Pudak Scientific for the production of smart meter like AMI and Data Collector Unit (DCU) enclosures, managing the full pipeline from 3D CAD design, unit production pricing, manufacturing timelines, to business model formulation. Engineered 3D enclosures in Fusion 360 &amp; SketchUp and routed energy data via MQTT protocol.
                  </p>
                </div>

                {/* THMS */}
                <div>
                  <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px]">
                    <span className="font-bold text-black">Transformer Health Monitoring System (THMS)</span>
                    <span className="text-neutral-500 text-[11px]">Langgeng Cipta Solusi</span>
                  </div>
                  <p className="text-[11px] sm:text-[11.5px] text-[#222222] leading-snug mt-0.5 pl-3 border-l-2 border-neutral-300 text-justify">
                    Coordinated with PT Pudak Scientific for the production of Transformer Health Monitoring System (THMS) protective enclosures, managing 3D CAD design, unit production pricing, manufacturing timelines, to business model formulation. Supervised device production workflows and quality inspection for electrical substation environments.
                  </p>
                </div>
              </div>
            </section>

            {/* SECTION: ADDITIONAL EXPERIENCE */}
            <section className="mb-4">
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Additional Experience
              </h2>

              <ul className="list-disc pl-4 text-[11px] sm:text-[11.5px] text-[#111111] space-y-1.5 leading-snug text-justify">
                <li>
                  Internship at <span className="font-bold">PT. Inti Konten Indonesia (INTENS)</span> as IT Solution (2021). Worked on creating active animal tracking system utilizing RFID and real-time monitoring web dashboard.
                </li>
                <li>
                  Internship at <span className="font-bold">PT. Telkom Indonesia Tbk.</span> Telkom Tangerang, Tangerang Region (2020). Worked on creating web portal for coordinating corporate customer access orders and dispatch workflows.
                </li>
                <li>
                  Research & Laboratory Assistant at <span className="font-bold">RnEST Laboratory</span> (2019 — 2022). Conducted applied research on embedded hardware, sensor arrays, and microcontroller modules; managed academic laboratory operations and practicum courses.
                </li>
                <li>
                  Mechanical Engineering Specialist at <span className="font-bold">PT PLN (Persero)</span> (2017). Handled machine maintenance, preventive checks, and diagnostic updates for power generation equipment.
                </li>
              </ul>
            </section>

            {/* SECTION: TECHNICAL SKILLS */}
            <section className="mb-4">
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-1.5">
                Technical Skills & Competencies
              </h2>

              <div className="text-[11px] sm:text-[11.5px] text-[#111111] space-y-1 leading-snug text-justify">
                <p>
                  <span className="font-bold">Embedded & Hardware:</span> STM32 ARM 32-bit, ESP32, ATmega, Microcontrollers, Firmware Development, Custom PCB Design (EasyEDA, Fusion 360), Sensor Interfacing & Calibration (Tiltmeter, Strain Gauge, Anemometer 2D/3D, Accelerometer, LVDT, ATRH).
                </p>
                <p>
                  <span className="font-bold">Protocols & IoT:</span> HTTP, UDP, MQTT, DLMS / COSEM, Wi-Fi, Fiber Optic, RS485 / Modbus, RFID.
                </p>
                <p>
                  <span className="font-bold">CAD & 3D Design:</span> Fusion 360 (3D Modeling & Electronics/PCB), SketchUp, 3D Protective Enclosure Design, Waterproof & Dustproof Enclosures, Rapid Prototyping.
                </p>
                <p>
                  <span className="font-bold">Software & Languages:</span> C, C++, Python, JavaScript, TypeScript, HTML/CSS, PHP/Laravel, Git.
                </p>
                <p>
                  <span className="font-bold">Management & Operations:</span> Project Engineering, Project Management, Quality Control (QC), Field Deployment, Technical Documentation.
                </p>
              </div>
            </section>

            {/* SECTION: EDUCATION (Moved to the very bottom of CV) */}
            <section>
              <h2 className="text-[13px] sm:text-[14px] font-bold uppercase tracking-wider text-black border-b border-black pb-0.5 mb-2">
                Education
              </h2>

              <div className="space-y-1">
                <div className="flex justify-between items-baseline flex-wrap text-[12.5px] sm:text-[13px]">
                  <span className="font-bold uppercase tracking-wider text-black">TELKOM UNIVERSITY</span>
                  <span className="font-bold text-black text-right">Bandung, Indonesia</span>
                </div>
                <div className="flex justify-between items-baseline flex-wrap text-[12px] sm:text-[12.5px] italic text-[#333333]">
                  <span>Bachelor of Engineering in Computer Engineering – GPA 3.41</span>
                  <span className="font-normal not-italic text-black text-right">Nov 2022</span>
                </div>

                <ul className="list-disc pl-4 text-[11px] sm:text-[11.5px] text-[#111111] space-y-1 mt-1 leading-snug text-justify">
                  <li>
                    Research assistant in applied research of “The Implementation of Internet of Things, Machine Learning, and Linear Robot on Electricity Monitoring System” with funding IDR 5,750,000.
                  </li>
                  <li>
                    1<sup>st</sup> place in <span className="font-bold">Technogine National Competition</span> – Technovation Division as a Research Assistant of Robotic and Embedded System Technology Laboratory.
                  </li>
                  <li>
                    2<sup>nd</sup> place in <span className="font-bold">School of Electrical Engineering Festival - National Line Follower Competition</span> as a Research Assistant of Robotic and Embedded System Technology Laboratory.
                  </li>
                  <li>
                    Teaching assistant of Robotic and Embedded System Technology Laboratory, teaching Digital System Design practicum course with 210 students.
                  </li>
                  <li>
                    Innovillage 2021, Implementation of social project of Hydroelectric Power Plant With Wireless Remote Monitoring and Control System in Tambolosu Village, South Konawe Regency with funding IDR 17,500,000.
                  </li>
                  <li>
                    Final project with the title “Correction of Linear Robot Movement on Smart Electricity Meters Using Backpropagation Neural Network Algorithm”.
                  </li>
                </ul>
              </div>
            </section>
          </div>
        </div>

      </div>

      {/* Bottom Floating Bar for Mobile (Hidden on Print) */}
      <div className="no-print max-w-[794px] mx-auto mt-8 flex flex-wrap items-center justify-center gap-3 text-center">
        <button
          onClick={onBack}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-neutral-800 text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-black transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Portfolio</span>
        </button>

        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-2.5 bg-black text-white text-xs font-bold uppercase tracking-wider rounded-none hover:bg-neutral-800 transition-colors shadow-lg disabled:opacity-75"
        >
          {isDownloading ? (
            <>
              <Loader2 size={14} className="animate-spin text-white" />
              <span>Generating PDF...</span>
            </>
          ) : (
            <>
              <Download size={14} />
              <span>Download PDF (2 Pages)</span>
            </>
          )}
        </button>
      </div>

    </div>
  );
}
