import React, { createContext, useContext, useState, useEffect } from 'react';
import { Project, EducationItem, SkillItem, CertificationItem, WorkExperience } from '../types';
import { PROJECTS } from '../data';

type Language = 'en' | 'id';

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  workExperiences: WorkExperience[];
  projects: Project[];
  educationItems: EducationItem[];
  certifications: CertificationItem[];
  softSkills: string[];
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    return 'en';
  });

  useEffect(() => {
    localStorage.setItem('portfolio_lang', 'en');
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('portfolio_lang', lang);
  };

  // String Translations Dictionary
  const translations: Record<Language, Record<string, string>> = {
    en: {
      // Nav & General
      'nav.experience': 'Experience',
      'nav.work': 'Work',
      'nav.skills': 'Skills',
      'nav.education': 'Education',
      'nav.credentials': 'Credentials',
      'nav.hire_me': 'Hire Me',
      
      // Hero
      'hero.welcome': 'Welcome to my space',
      'hero.desc': 'A professional Internet of Things (IoT) Developer managing end-to-end IoT engineering projects from inception to completion. Serving as a Project Manager focused on planning, fabrication, and system integration, as well as a Project Engineer with full responsibility for hands-on on-site project implementation.',
      'hero.portfolio': 'View Portfolio',
      'hero.cv': 'Download CV',
      'hero.contact': 'Contact Me',
      'hero.typing.iot': 'Internet of Things Engineer',
      'hero.typing.pm': 'Project Manager',
      'hero.typing.pe': 'Project Engineer',
      'hero.typing.cad': 'CAD 3D Designer',
      'hero.typing.embedded': 'Embedded Systems Developer',
      'hero.typing.educator': 'Coding Educator',

      // Experience Section
      'exp.timeline': 'Career Timeline',
      'exp.title': 'Professional Experience',
      'exp.desc': 'A chronicle of pioneering IoT systems, embedded hardware development, and robust web applications.',

      // Projects Section
      'proj.badge': 'Featured Projects',
      'proj.title': 'Engineering Projects',
      'proj.desc': 'A showcase of end-to-end IoT engineering, sensor infrastructure deployments, and precision hardware implementations.',
      'proj.view_details': 'View Project Details',
      'proj.selected': 'Selected Engineering Project',
      'proj.tech': 'Core Technologies',
      'proj.competencies': 'Acquired Competencies',
      'proj.responsibilities': 'Main Responsibilities',
      'proj.results': 'Measurable Results',
      'proj.results_short': 'Successfully Deployed',
      'proj.close': 'Close Details',
      'proj.time': 'Project Time',
      'proj.sub_title': 'Deployed Infrastructure Systems',
      'proj.sub_desc': 'Regional real-world sensor arrays designed, installed, and successfully deployed in key infrastructures.',

      // Skills Section
      'skills.badge': 'Engineering Competence',
      'skills.title': 'Skills Inventory',
      'skills.desc': 'A deep dive into my technical domain expertise and proficiency levels across multiple categories.',
      'skills.soft_title': 'Soft Skills',
      'skills.soft_desc': 'Critical leadership and cognitive abilities that bridge the gap between technical complexity and business value.',
      'skills.phil_title': 'Design & Engineering Philosophy',
      'skills.phil_desc': 'To develop high-performance physical-digital systems, one must respect both structural constraints and software agility. Code is the nervous system, but hardware is the physical body. Both must operate in flawless synchrony.',
      'skills.filter.all': 'All Fields',
      'skills.filter.cad': 'CAD / Hardware',
      'skills.filter.embedded': 'Embedded Systems',
      'skills.filter.iot': 'IoT & Telemetry',

      // Education Section
      'edu.badge': 'Academic Pedigree',
      'edu.title': 'Education',
      'edu.desc': 'A foundation of theoretical engineering and practical lab research.',
      'edu.achievements': 'Key Achievements',
      'edu.roles': 'Lab / Teaching Roles',

      // Certifications Section
      'cert.badge': 'Verified Credentials',
      'cert.title': 'Professional Certifications',
      'cert.desc': 'Continual learning and verified mastery in data science, engineering, and interface design.',
      'cert.id': 'Credential ID',
      'cert.verify': 'Verify Credential',

      // Contact Form & Modal
      'contact.badge': 'Get In Touch',
      'contact.title': 'Contact Alan',
      'contact.desc': "Let's discuss your next project, embedded engineering challenge, or educational opportunity.",
      'contact.name': 'Your Name',
      'contact.email': 'Your Email',
      'contact.subject': 'Subject',
      'contact.message': 'Message',
      'contact.send': 'Send Message',
      'contact.sending': 'Sending...',
      'contact.close': 'Close',
      'contact.success': 'Message sent successfully!',
      'contact.success_desc': 'I will get back to you as soon as possible.',

      // Toast / Alerts
      'toast.cv_title': 'Curriculum Vitae',
      'toast.cv_desc': 'Alan_Rezky_Resume.pdf downloaded successfully.'
    },
    id: {
      // Nav & General
      'nav.experience': 'Pengalaman',
      'nav.work': 'Portofolio',
      'nav.skills': 'Keahlian',
      'nav.education': 'Pendidikan',
      'nav.credentials': 'Sertifikasi',
      'nav.hire_me': 'Hubungi Saya',

      // Hero
      'hero.welcome': 'Halo & Selamat Datang',
      'hero.desc': 'IoT Developer & Engineer yang fokus mengembangkan solusi Internet of Things secara menyeluruh (end-to-end)—dari riset konsep, desain PCB/hardware, firmware, hingga implementasi lapangan. Terbiasa memimpin sebagai Project Manager dalam perencanaan dan integrasi sistem, sekaligus terjun langsung sebagai Project Engineer untuk perakitan, instalasi, dan pengujian di lapangan.',
      'hero.portfolio': 'Lihat Portofolio',
      'hero.cv': 'Unduh CV',
      'hero.contact': 'Hubungi Saya',
      'hero.typing.iot': 'Internet of Things Engineer',
      'hero.typing.pm': 'Project Manager',
      'hero.typing.pe': 'Project Engineer',
      'hero.typing.cad': 'CAD 3D Designer',
      'hero.typing.embedded': 'Embedded Systems Developer',
      'hero.typing.educator': 'Coding Educator',

      // Experience Section
      'exp.timeline': 'Perjalanan Karir',
      'exp.title': 'Pengalaman Kerja',
      'exp.desc': 'Rekam jejak pengalaman dalam perancangan sistem IoT, pengembangan embedded hardware & firmware, hingga pengembangan aplikasi web.',

      // Projects Section
      'proj.badge': 'Portofolio Proyek',
      'proj.title': 'Engineering Projects',
      'proj.desc': 'Koleksi implementasi proyek IoT end-to-end, pemantauan sensor infrastruktur skala besar, dan perancangan hardware presisi.',
      'proj.view_details': 'Lihat Detail Proyek',
      'proj.selected': 'Detail Proyek',
      'proj.tech': 'Teknologi yang Digunakan',
      'proj.competencies': 'Keahlian & Kompetensi',
      'proj.responsibilities': 'Tanggung Jawab & Peran',
      'proj.results': 'Hasil & Dampak',
      'proj.results_short': 'Berhasil Diimplementasikan',
      'proj.close': 'Tutup',
      'proj.time': 'Project Time',
      'proj.sub_title': 'Sistem Infrastruktur Terpasang',
      'proj.sub_desc': 'Rangkaian sensor dan unit pemantau yang telah terpasang dan beroperasi langsung di infrastruktur nyata.',

      // Skills Section
      'skills.badge': 'Kemampuan Teknis',
      'skills.title': 'Keahlian & Spesialisasi',
      'skills.desc': 'Ringkasan keahlian teknis, perangkat keras, firmware, dan tools yang saya gunakan dalam pengembangan proyek.',
      'skills.soft_title': 'Soft Skills',
      'skills.soft_desc': 'Kemampuan komunikasi, manajemen proyek, dan kepemimpinan yang mendukung kolaborasi tim dan keberhasilan implementasi.',
      'skills.phil_title': 'Prinsip Kerja & Desain',
      'skills.phil_desc': 'Membangun sistem IoT yang tangguh membutuhkan keseimbangan antara software yang adaptif dan hardware yang kokoh. Kode adalah sistem sarafnya, dan perangkat keras adalah fisiknya—keduanya harus bekerja secara selaras dan handal.',
      'skills.filter.all': 'Semua Bidang',
      'skills.filter.cad': 'CAD & Hardware',
      'skills.filter.embedded': 'Embedded Systems',
      'skills.filter.iot': 'IoT & Telemetri',

      // Education Section
      'edu.badge': 'Riwayat Pendidikan',
      'edu.title': 'Pendidikan',
      'edu.desc': 'Fondasi akademis teknik dan pengalaman riset praktis di laboratorium.',
      'edu.achievements': 'Prestasi & Riset',
      'edu.roles': 'Pengalaman Lab & Asisten',

      // Certifications Section
      'cert.badge': 'Sertifikasi',
      'cert.title': 'Sertifikasi Profesional',
      'cert.desc': 'Pelatihan dan verifikasi kompetensi di bidang teknik, data science, dan teknologi.',
      'cert.id': 'ID Kredensial',
      'cert.verify': 'Verifikasi Kredensial',

      // Contact Form & Modal
      'contact.badge': 'Mari Terhubung',
      'contact.title': 'Hubungi Saya',
      'contact.desc': 'Tertarik mendiskusikan proyek IoT, kebutuhan embedded systems, atau peluang kolaborasi lainnya? Jangan ragu untuk menghubungi saya!',
      'contact.name': 'Nama',
      'contact.email': 'Email',
      'contact.subject': 'Subjek / Topik',
      'contact.message': 'Pesan',
      'contact.send': 'Kirim Pesan',
      'contact.sending': 'Mengirimkan...',
      'contact.close': 'Tutup',
      'contact.success': 'Pesan Berhasil Terkirim!',
      'contact.success_desc': 'Terima kasih sudah menghubungi! Saya akan segera membalas pesan Anda.',

      // Toast / Alerts
      'toast.cv_title': 'Curriculum Vitae',
      'toast.cv_desc': 'File CV berhasil diunduh.'
    }
  };

  const t = (key: string) => {
    return translations[language][key] || translations['en'][key] || key;
  };

  // Translated Datasets
  const workExperiences: WorkExperience[] = [
    {
      id: 'langgeng-cipta-solusi',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' 
        ? 'Internet of Things Developer, Project Manager and Project Engineer' 
        : 'Internet of Things Developer, Project Manager and Project Engineer',
      period: language === 'en' ? 'Dec 2022 — Present' : 'Des 2022 — Sekarang',
      location: language === 'en' ? 'Bandung, West Java, Indonesia' : 'Bandung, Jawa Barat, Indonesia',
      description: language === 'en' ? [
        'Developed high-reliability RTU (Remote Terminal Unit) firmware for real-time sensor data acquisition and smart modem firmware to read and transmit AMI (Advanced Metering Infrastructure) electric meter data across STM32 ARM 32-bit, ESP32, and ATmega microcontrollers, integrating DLMS/COSEM, MQTT, Wi-Fi, and custom fiber-optic protocols.',
        'Designed custom PCB layouts and optimized existing PCB component architectures using EasyEDA and Fusion 360, developing reliable power distribution circuitry and multi-sensor interfaces (tiltmeter, strain gauge, 2D/3D anemometers, accelerometers, cable tension sensors, and LVDT); conducted laboratory and on-site sensor calibrations.',
        'Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs, and utilized SketchUp to simulate bridge sensor placement and field installation layouts; coordinated with PT ADS for the production of SHMS panel enclosures and supporting equipment, and with PT Pudak Scientific for Smart Meter Like AMI, DCU, and THMS enclosures across design, costing, timelines, and business model formulation.',
        'Served as Project Manager handling the Sei Wampu Toll Bridge SHMS project from inception to completion, communicating directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover, while handling on-site sensor installation and integration in the field; served as Project Engineer on the Sodongkopo Bridge (Pangandaran) SHMS project for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V) handling sensor installation and integration on the bridge from start to finish, supervising device production workflows, DAU panel assembly, QC inspections, and coordinating with PT ADS; served as Sensor Developer for the Merah Putih Bridge (Ambon) SHMS project developing and calibrating the multi-sensor monitoring suite, firmware, and PCB layouts; and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to guarantee all delivered systems functioned flawlessly in strict compliance with client specifications.'
      ] : [
        'Mengembangkan firmware RTU (Remote Terminal Unit) untuk akuisisi data sensor secara real-time serta firmware modem untuk membaca dan mentransmisikan data meter listrik AMI (Advanced Metering Infrastructure) berbasis mikrokontroler STM32 ARM 32-bit, ESP32, dan ATmega dengan integrasi protokol DLMS/COSEM, MQTT, Wi-Fi, dan transmisi data fiber optic.',
        'Merancang custom layout PCB serta mengoptimalkan (improve) arsitektur komponen PCB eksisting menggunakan EasyEDA dan Fusion 360, mengembangkan sistem distribusi daya mandiri, serta melakukan kalibrasi laboratorium dan lapangan untuk instrumen sensor (tiltmeter, strain gauge, anemometer 2D/3D, accelerometer, cable tension, dan LVDT).',
        'Merancang enclosure sensor yang tahan debu dan air (weatherproof) sesuai spesifikasi dan kebutuhan proyek menggunakan Fusion 360, mengoptimalkan desain serta pemilihan material guna menekan biaya produksi, serta menggunakan SketchUp untuk mensimulasikan tata letak dan pemasangan sensor di jembatan; berkoordinasi dengan PT ADS untuk produksi enclosure panel SHMS dan alat-alat pendukung, serta dengan PT Pudak Scientific untuk perancangan, penentuan biaya produksi, timeline manufaktur, hingga perumusan model bisnis enclosure Smart Meter Like AMI, DCU, dan THMS.',
        'Bertindak sebagai Project Manager yang menangani proyek SHMS Jembatan Tol Sei Wampu Medan, Sumatera Utara dari awal hingga akhir, berkomunikasi langsung dengan klien PT Hutama Karya Indonesia terkait perencanaan proyek, perizinan proyek di lapangan, dan serah terima proyek (project handover), serta menghandle pemasangan dan integrasi sensor di lapangan; bertindak sebagai Project Engineer pada proyek SHMS Jembatan Sodongkopo Pangandaran untuk klien UPTD Pengelolaan Jalan dan Jembatan Wilayah Pelayanan V Jawa Barat yang menghandle proses pemasangan dan integrasi sensor di jembatan dari awal hingga akhir, mengawasi alur kerja produksi perangkat, perakitan panel DAU, inspeksi QC, dan koordinasi dengan PT ADS; menjadi Sensor Developer pada proyek SHMS Jembatan Merah Putih Ambon yang mengembangkan sistem instrumentasi sensor, firmware, dan kalibrasi sensor; serta melaksanakan Factory Acceptance Test (FAT) dan Site Acceptance Test (SAT) untuk memastikan seluruh perangkat yang diterima klien berfungsi optimal dan sesuai spesifikasi kebutuhan klien.'
      ]
    },
    {
      id: 'brightchamps',
      company: 'BrightCHAMPS',
      position: language === 'en' ? 'Coding Educator' : 'Coding Educator',
      period: language === 'en' ? 'Sep 2023 — Dec 2024' : 'Sep 2023 — Des 2024',
      location: language === 'en' ? 'Indonesia (Remote)' : 'Indonesia (Remote)',
      description: language === 'en' ? [
        'Taught core coding principles to kids, teens, and juniors across diverse age groups.',
        'Instructed programming languages and environments including Python, Scratch/Code blocks, JavaScript, HTML, CSS, C, and C++.'
      ] : [
        'Mengajarkan konsep dasar coding, logika pemrograman, dan computational thinking untuk anak-anak dan remaja.',
        'Membimbing pembelajaran bahasa pemrograman dan tools seperti Python, Scratch/Code blocks, JavaScript, HTML, CSS, C, dan C++.'
      ]
    },
    {
      id: 'rnest-lab-assistant',
      company: 'RnEST Laboratory',
      position: language === 'en' ? 'Laboratory Assistant' : 'Asisten Laboratorium',
      period: language === 'en' ? 'Feb 2021 — Feb 2022' : 'Feb 2021 — Feb 2022',
      location: language === 'en' ? 'Bandung, West Java, Indonesia' : 'Bandung, Jawa Barat, Indonesia',
      description: language === 'en' ? [
        'Served as a Laboratory Assistant and assistant in charge of the practicum division.',
        'Administered academic laboratories, managed schedules, and supported students in hands-on experiment modules.'
      ] : [
        'Bertugas sebagai Asisten Laboratorium sekaligus koordinator divisi praktikum.',
        'Mengelola operasional laboratorium, mengatur jadwal, serta membimbing mahasiswa dalam modul praktikum mandiri dan kelompok.'
      ]
    },
    {
      id: 'intens-rfid',
      company: 'PT. Inti Konten Indonesia (INTENS)',
      position: language === 'en' ? 'Information Technology Solutions Developer' : 'IT Solutions Developer',
      period: language === 'en' ? 'Jul 2021' : 'Jul 2021',
      location: language === 'en' ? 'Bandung, West Java, Indonesia' : 'Bandung, Jawa Barat, Indonesia',
      description: language === 'en' ? [
        'Designed and engineered an active animal tracking system utilizing RFID technology.',
        'Created a comprehensive, user-friendly monitoring website and dashboard for livestock tracking systems.'
      ] : [
        'Merancang dan merekayasa sistem pelacakan hewan aktif berbasis teknologi RFID.',
        'Membangun website dan dashboard monitoring yang intuitif untuk sistem pemantauan hewan ternak secara real-time.'
      ]
    },
    {
      id: 'rnest-lab-researcher',
      company: 'RnEST Laboratory',
      position: language === 'en' ? 'Research Assistant' : 'Research Assistant',
      period: language === 'en' ? 'Sep 2019 — Sep 2020' : 'Sep 2019 — Sep 2020',
      location: language === 'en' ? 'Bandung, West Java, Indonesia' : 'Bandung, Jawa Barat, Indonesia',
      description: language === 'en' ? [
        'Conducted cutting-edge research on advanced embedded hardware, sensor arrays, and microcontroller modules.',
        'Fabricated physical robotic prototypes and worked closely on decentralized IoT system development.'
      ] : [
        'Melakukan riset terapan pada perangkat embedded hardware, modul sensor, dan mikrokontroler.',
        'Membuat prototipe fisik robotika dan berkolaborasi dalam pengembangan sistem IoT terdesentralisasi.'
      ]
    },
    {
      id: 'telkom-indonesia-access',
      company: 'Telkom Indonesia',
      position: language === 'en' ? 'Corporate Customer Access Network Specialist' : 'Corporate Access Network Specialist',
      period: language === 'en' ? 'Jul 2020 — Aug 2020' : 'Jul 2020 — Agt 2020',
      location: language === 'en' ? 'Kota Tangerang, Banten, Indonesia' : 'Kota Tangerang, Banten, Indonesia',
      description: language === 'en' ? [
        'Designed and developed a corporate web portal to streamline the coordinate and access order dispatch process.',
        'Simplified internal data input and enhanced workflow management speed for field technicians.'
      ] : [
        'Merancang dan mengembangkan portal web internal untuk mempercepat alur koordinasi dan pengiriman order akses jaringan.',
        'Menyederhanakan proses input data internal serta meningkatkan efisiensi kerja teknisi lapangan.'
      ]
    },
    {
      id: 'pln-persero',
      company: 'PT PLN (Persero)',
      position: language === 'en' ? 'Mechanical Engineering Specialist' : 'Mechanical Engineering Specialist',
      period: language === 'en' ? 'Aug 2017 — Dec 2017' : 'Agt 2017 — Des 2017',
      location: language === 'en' ? 'Kota Kendari, Southeast Sulawesi, Indonesia' : 'Kota Kendari, Sulawesi Tenggara, Indonesia',
      description: language === 'en' ? [
        'Operated as a machine maintenance mechanic, ensuring optimal runtime status of hardware systems.',
        'Conducted preventive maintenance, diagnostic checks, and mechanical updates.'
      ] : [
        'Bertugas dalam perawatan mesin pembangkit guna memastikan keandalan operasional sistem mekanik.',
        'Melakukan pemeliharaan preventif (preventive maintenance), pengecekan diagnostik rutin, dan servis mekanis berkala.'
      ]
    }
  ];

  const projects: Project[] = [
    {
      id: 'shm-pangandaran',
      title: language === 'en' 
        ? 'Structural Health Monitoring System at Sodongkopo Bridge, Pangandaran, West Java' 
        : 'Structural Health Monitoring System di Jembatan Sodongkopo, Pangandaran, Jawa Barat',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'Project Engineer' : 'Project Engineer',
      duration: language === 'en' ? 'June 2026 — October 2026' : 'Juni 2026 — Oktober 2026',
      description: language === 'en' 
        ? 'Served as Project Engineer on the Structural Health Monitoring System (SHMS) project for Sodongkopo Bridge in Pangandaran for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V), handling sensor installation and integration on the bridge from start to finish. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections, and coordinated with PT ADS for the production of SHMS panel enclosures and supporting equipment. Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs, and utilized SketchUp to simulate bridge sensor placement and field installation layouts. Developed custom PCB layouts and optimized existing component architectures using EasyEDA and Fusion 360, calibrated upgraded tiltmeter sensors, engineered strain gauge sensors with tensile sling simulation, and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure all delivered equipment functioned properly according to client specifications.'
        : 'Bertindak sebagai Project Engineer pada proyek Structural Health Monitoring System (SHMS) Jembatan Sodongkopo Pangandaran untuk klien UPTD Pengelolaan Jalan dan Jembatan Wilayah Pelayanan V Jawa Barat yang menangani proses pemasangan dan integrasi sensor di jembatan dari awal hingga akhir. Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel DAU, serta inspeksi Quality Control (QC), dan berkoordinasi dengan PT ADS untuk produksi enclosure panel SHMS dan alat-alat pendukung. Merancang enclosure sensor tahan debu dan air (weatherproof) sesuai spesifikasi menggunakan Fusion 360 guna menekan biaya produksi, menggunakan SketchUp untuk mensimulasikan tata letak sensor di jembatan, merancang custom layout dan optimasi komponen PCB dengan EasyEDA dan Fusion 360, mengkalibrasi sensor tiltmeter, menguji regangan strain gauge, serta melaksanakan Factory Acceptance Test (FAT) dan Site Acceptance Test (SAT) untuk memastikan seluruh perangkat berfungsi optimal sesuai permintaan klien.',
      coverImage: 'https://images.unsplash.com/photo-1418063522825-512fa2474bc6?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1418063522825-512fa2474bc6?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Tiltmeter', 'Strain Gauge', 'DAU & Gateway Panel', 'Vendor Coordination (PT ADS)', 'RTU & DAU Assembly & QC', 'Sensor Calibration', 'Bridge Simulation (SketchUp)', 'Fusion 360 Enclosures', 'FAT & SAT Testing', 'Sensor Installation & Integration'],
      skills: language === 'en' 
        ? ['Project Engineering', 'Vendor Coordination (PT ADS)', 'Sensor Installation & Integration', 'Weatherproof Enclosure Design', 'Bridge Simulation (SketchUp)', 'Tiltmeter Calibration', 'Strain Gauge & Transducer Design', 'DAU Panel Assembly & QC', 'FAT & SAT Execution', 'Bridge SHMS Integration']
        : ['Project Engineering', 'Koordinasi Vendor (PT ADS)', 'Instalasi & Integrasi Sensor', 'Desain Enclosure Weatherproof', 'Simulasi Jembatan (SketchUp)', 'Kalibrasi Sensor Tiltmeter', 'Desain Strain Gauge & Transduser', 'Desain & QC Panel DAU', 'Pelaksanaan FAT & SAT', 'Integrasi SHMS'],
      responsibilities: language === 'en' ? [
        'Served as Project Engineer on the Sodongkopo Bridge SHMS project for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V), handling sensor installation and system integration on the bridge from start to finish.',
        'Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections.',
        'Coordinated with PT ADS for the precision production of SHMS panel enclosures and supporting equipment.',
        'Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs.',
        'Utilized SketchUp to simulate bridge sensor placement and field installation layouts prior to deployment.',
        'Designed custom PCB layouts and optimized existing component architectures using EasyEDA and Fusion 360 for sensor interfaces.',
        'Developed upgraded tiltmeter sensors with software updates and executed high-precision instrument calibrations.',
        'Engineered strain gauge sensors with redesigned transducers and conducted tension tests on steel wire slings to simulate real-world hanger stress.',
        'Conducted Factory Acceptance Testing (FAT) and Site Acceptance Testing (SAT) to ensure all delivered equipment functioned flawlessly according to client specifications.',
        'Designed Data Acquisition Unit (DAU) & gateway panels, verifying clean power distribution and dependable sensor data telemetry.'
      ] : [
        'Bertindak sebagai Project Engineer pada proyek SHMS Jembatan Sodongkopo Pangandaran untuk klien UPTD Pengelolaan Jalan dan Jembatan Wilayah Pelayanan V Jawa Barat yang menangani proses pemasangan dan integrasi sensor di jembatan dari awal hingga akhir.',
        'Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel DAU, serta inspeksi Quality Control (QC).',
        'Berkoordinasi dengan PT ADS untuk produksi panel enclosure dan seluruh peralatan pendukung proyek SHMS.',
        'Merancang enclosure sensor yang tahan debu dan air (weatherproof) menggunakan Fusion 360 guna menekan biaya produksi.',
        'Menggunakan SketchUp untuk mensimulasikan tata letak dan pemasangan sensor di jembatan sebelum instalasi lapangan.',
        'Merancang custom layout dan optimasi komponen PCB menggunakan EasyEDA dan Fusion 360 untuk antarmuka sensor.',
        'Mengembangkan sensor tiltmeter versi terbaru dengan pembaruan software serta kalibrasi presisi sebelum pemasangan.',
        'Merancang sensor strain gauge dengan desain transduser baru dan pengujian simulasi regangan sling hanger jembatan.',
        'Melaksanakan Factory Acceptance Test (FAT) dan Site Acceptance Test (SAT) untuk memastikan seluruh perangkat berfungsi sesuai permintaan klien.',
        'Mendesain panel Data Acquisition Unit (DAU) & gateway dengan pengujian QC transmisi data dan suplai daya mandiri.'
      ],
      results: language === 'en'
        ? 'Successfully delivered the project for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V), coordinated enclosure production with PT ADS, supervised DAU panel assembly and QC, calibrated sensors, executed FAT & SAT, and managed sensor installation and integration from start to finish across Sodongkopo bridge in Pangandaran.'
        : 'Berhasil menyelesaikan proyek untuk klien UPTD Pengelolaan Jalan dan Jembatan Wilayah Pelayanan V Jawa Barat, mengoordinasikan produksi enclosure bersama PT ADS, mengawasi perakitan dan QC panel DAU, mengkalibrasi tiltmeter presisi, melaksanakan FAT & SAT, serta menangani proses pemasangan dan integrasi sensor dari awal hingga akhir di Jembatan Sodongkopo Pangandaran.',
      category: 'embedded'
    },
    {
      id: 'shm-seiwampu',
      title: language === 'en' 
        ? 'Structural Health Monitoring System at Sei Wampu Toll Bridge, Medan, North Sumatera' 
        : 'Structural Health Monitoring System di Jembatan Tol Sei Wampu, Medan, Sumatera Utara',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'Project Manager & IoT Engineer' : 'Project Manager & IoT Engineer',
      duration: language === 'en' ? 'August 2024 — October 2025' : 'Agustus 2024 — Oktober 2025',
      description: language === 'en' 
        ? 'Served as Project Manager handling the Structural Health Monitoring System (SHMS) project for the Sei Wampu Toll Bridge in Medan, North Sumatera from inception to completion. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections. Developed high-reliability RTU (Remote Terminal Unit) firmware and custom PCB layouts for sensor data acquisition with fiber-optic communication protocols. Coordinated directly with PT ADS for precision production of SHMS panel enclosures and supporting equipment. Designed dustproof and waterproof sensor enclosures in Fusion 360 to optimize production costs, and simulated sensor placement using SketchUp. Communicated directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover, handled on-site sensor installation and integration in the field from start to finish, and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to guarantee all delivered systems functioned flawlessly in strict compliance with client specifications.'
        : 'Bertindak sebagai Project Manager yang menangani proyek Structural Health Monitoring System (SHMS) Jembatan Tol Sei Wampu Medan, Sumatera Utara dari awal hingga akhir. Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel DAU, serta inspeksi Quality Control (QC). Mengembangkan firmware RTU dan layout custom PCB dengan protokol transmisi data fiber optik untuk sistem sensor SHMS. Berkoordinasi dengan PT ADS untuk produksi enclosure panel SHMS dan alat-alat pendukung. Merancang enclosure sensor tahan debu dan air menggunakan Fusion 360 untuk menekan biaya produksi serta simulasi penempatan sensor menggunakan SketchUp. Berkomunikasi langsung dengan klien PT Hutama Karya Indonesia terkait perencanaan proyek, perizinan lapangan, dan serah terima proyek (project handover), menangani pemasangan dan integrasi sensor di lapangan dari awal hingga akhir, serta melaksanakan Factory Acceptance Test (FAT) dan Site Acceptance Test (SAT) untuk memastikan seluruh sistem berfungsi optimal dan sesuai spesifikasi klien.',
      coverImage: `${import.meta.env.BASE_URL}seiwampu-cover.jpg`,
      gallery: [
        `${import.meta.env.BASE_URL}seiwampu-cover.jpg`,
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1513828729020-f9b88cf50f55?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1511497584788-876760111969?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Project Management', 'Client Coordination (PT Hutama Karya Indonesia)', 'Vendor Coordination (PT ADS)', 'Fiber Optic Protocol', 'RTU Firmware & PCB Design', 'DAU Panel Assembly & QC', 'Fusion 360 Enclosures', 'SketchUp Simulation', 'FAT & SAT Testing', 'Project Permits & Handover', 'Field Sensor Installation & Integration'],
      skills: language === 'en' 
        ? ['Project Management', 'Client Communication (PT Hutama Karya Indonesia)', 'Vendor Coordination (PT ADS)', 'FAT & SAT Execution', 'Weatherproof Enclosure Design', 'SketchUp Simulation', 'Project Planning & Handover', 'Project Permits & Licensing', 'Fiber Optic Data Transmission', 'DAU Panel Assembly & QC', 'Field Sensor Installation & Integration']
        : ['Project Management', 'Komunikasi Klien (PT Hutama Karya Indonesia)', 'Koordinasi Vendor (PT ADS)', 'Pelaksanaan FAT & SAT', 'Desain Enclosure Weatherproof', 'Simulasi Jembatan (SketchUp)', 'Perencanaan & Serah Terima Proyek', 'Perizinan Proyek Lapangan', 'Transmisi Fiber Optik', 'Desain & QC Panel DAU', 'Instalasi & Integrasi Sensor Lapangan'],
      responsibilities: language === 'en' ? [
        'Handled the Sei Wampu Toll Bridge SHMS project end-to-end from inception to completion as Project Manager.',
        'Communicated directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover.',
        'Supervised device production workflows, Data Acquisition Unit (DAU) panel assembly, and Quality Control (QC) inspections.',
        'Coordinated with PT ADS for the precision production of SHMS panel enclosures and supporting equipment.',
        'Designed dustproof and waterproof sensor enclosures tailored to project requirements using Fusion 360 to optimize production costs, and utilized SketchUp to simulate bridge sensor placement.',
        'Developed dedicated RTU firmware and custom PCB layouts for sensor data acquisition with fiber-optic communication protocols.',
        'Conducted Factory Acceptance Testing (FAT) and on-site Site Acceptance Testing (SAT) to ensure all delivered instruments and monitoring equipment operated flawlessly in compliance with client requirements.',
        'Handled on-site sensor installation and system integration in the field from start to finish, field cable routing, and final commissioning.'
      ] : [
        'Menangani proyek SHMS Jembatan Tol Sei Wampu Medan, Sumatera Utara dari awal hingga akhir sebagai Project Manager.',
        'Berkomunikasi langsung dengan klien PT Hutama Karya Indonesia terkait perencanaan proyek, perizinan proyek di lapangan, dan proses serah terima proyek (project handover).',
        'Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel Data Acquisition Unit (DAU), serta inspeksi Quality Control (QC).',
        'Berkoordinasi dengan PT ADS untuk proses produksi enclosure panel SHMS serta alat-alat pendukung sistem monitoring.',
        'Merancang enclosure sensor tahan debu dan air menggunakan Fusion 360 guna menekan biaya produksi, dan menggunakan SketchUp untuk mensimulasikan penempatan sensor.',
        'Mengembangkan firmware RTU dan layout custom PCB untuk akuisisi data sensor dengan komunikasi data fiber optik.',
        'Melaksanakan Factory Acceptance Test (FAT) dan Site Acceptance Test (SAT) untuk memastikan seluruh perangkat yang diterima klien berfungsi optimal dan sesuai spesifikasi permintaan klien.',
        'Menangani proses pemasangan dan integrasi sensor di lapangan dari awal hingga akhir, penataan kabel, hingga commissioning lapangan.'
      ],
      results: language === 'en'
        ? 'Successfully managed the Sei Wampu Toll Bridge SHMS project end-to-end, coordinated directly with client PT Hutama Karya Indonesia and vendor PT ADS, executed FAT & SAT, established fiber-optic sensor telemetry, and completed on-site sensor installation and integration with zero transmission loss.'
        : 'Berhasil mengelola proyek SHMS Jembatan Tol Sei Wampu dari awal hingga akhir, berkoordinasi langsung dengan klien PT Hutama Karya Indonesia dan vendor PT ADS, melaksanakan FAT & SAT, mengimplementasikan jaringan fiber optic, serta menuntaskan instalasi dan integrasi sensor di lapangan.',
      category: 'embedded'
    },
    {
      id: 'shm-ambon',
      title: language === 'en' 
        ? 'Structural Health Monitoring System at Merah Putih Bridge, Ambon, Maluku' 
        : 'Structural Health Monitoring System di Jembatan Merah Putih, Ambon, Maluku',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'Sensor Developer' : 'Sensor Developer',
      duration: language === 'en' ? 'June 2023 — April 2024' : 'Juni 2023 — April 2024',
      description: language === 'en' 
        ? 'Served as Sensor Developer for the Merah Putih Bridge Structural Health Monitoring System (SHMS) project in Ambon, Maluku. Developed custom firmware and PCB layouts using EasyEDA and Fusion 360 for multi-sensor suites (3D anemometer, accelerometer, tiltmeter, strain gauge, cable tension, temperature, and ATRH) with Wi-Fi telemetry. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections, coordinated with PT ADS for the precision production of enclosure panels and supporting SHMS equipment, engineered dedicated power distribution circuitry, and performed precise sensor calibrations.'
        : 'Bertindak sebagai Sensor Developer untuk proyek Structural Health Monitoring System (SHMS) Jembatan Merah Putih Ambon, Maluku. Mengembangkan firmware dan layout custom PCB (EasyEDA & Fusion 360) untuk berbagai macam sensor (anemometer 3D, accelerometer, tiltmeter, strain gauge, cable tension, suhu, dan ATRH) dengan protokol komunikasi Wi-Fi, merancang sistem distribusi daya mandiri, serta mengkalibrasi instrumen sensor. Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel DAU, inspeksi Quality Control (QC), dan berkoordinasi dengan PT ADS untuk produksi enclosure panel dan alat-alat pendukung proyek SHMS.',
      coverImage: 'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1562408590-e32931084e23?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Firmware Dev', 'PCB (EasyEDA / Fusion 360)', 'Vendor Coordination (PT ADS)', 'Wi-Fi Protocol', 'Cable Tension Sensor', 'Accelerometer & Tiltmeter', '3D Anemometer', 'Power Distribution', 'RTU & DAU Assembly & QC'],
      skills: language === 'en' 
        ? ['Sensor Development', 'Firmware Development', 'PCB Design (EasyEDA / Fusion 360)', 'Vendor Coordination (PT ADS)', 'Wi-Fi Communication', 'Power Distribution Design', 'Sensor Calibration', 'RTU/DAU Assembly & QC Supervision']
        : ['Pengembangan Sensor', 'Pengembangan Firmware', 'Desain PCB (EasyEDA / Fusion 360)', 'Koordinasi Vendor (PT ADS)', 'Protokol Wi-Fi', 'Sistem Distribusi Daya', 'Kalibrasi Sensor', 'Supervisi Perakitan & QC RTU/DAU'],
      responsibilities: language === 'en' ? [
        'Served as Sensor Developer for the Merah Putih Bridge SHMS project in Ambon, Maluku, focusing on sensor instrumentation and firmware development.',
        'Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections for the sensor systems.',
        'Coordinated with PT ADS for the precision fabrication and production of enclosure panels and SHMS supporting equipment.',
        'Developed custom firmware and PCB layouts using EasyEDA and Fusion 360 for multi-sensor suites across the bridge.',
        'Engineered dedicated power distribution circuitry and cabling infrastructure to deliver clean, uninterrupted power to all bridge sensors.',
        'Conducted laboratory and field calibration for tiltmeter and cable tension accelerometer sensors to ensure exact measurement accuracy.'
      ] : [
        'Bertindak sebagai Sensor Developer pada proyek SHMS Jembatan Merah Putih Ambon yang merancang dan mengembangkan sistem instrumentasi sensor serta firmware.',
        'Mengawasi alur kerja produksi perangkat (device production workflows), perakitan panel DAU, serta inspeksi Quality Control (QC) untuk sistem sensor.',
        'Berkoordinasi dengan PT ADS untuk produksi enclosure panel dan alat-alat pendukung proyek Structural Health Monitoring System.',
        'Mengembangkan firmware dan layout custom PCB (EasyEDA & Fusion 360) untuk berbagai macam sensor di sepanjang jembatan.',
        'Merancang sistem distribusi daya mandiri dan infrastruktur kabel agar suplai daya sensor selalu stabil.',
        'Melakukan kalibrasi laboratorium dan lapangan untuk sensor tiltmeter dan accelerometer ketegangan kabel (cable tension).'
      ],
      results: language === 'en'
        ? 'Successfully coordinated enclosure production with PT ADS, supervised DAU panel assembly and QC, and developed and calibrated multi-sensor firmware with custom Wi-Fi telemetry and stable power distribution on Merah Putih Bridge in Ambon.'
        : 'Berhasil mengoordinasikan produksi enclosure bersama PT ADS, mengawasi perakitan dan QC panel DAU, serta mengembangkan dan mengkalibrasi firmware multi-sensor dengan telemetri Wi-Fi stabil di Jembatan Merah Putih Ambon.',
      category: 'embedded'
    },
    {
      id: 'watermeter-project',
      title: language === 'en' 
        ? 'Smart Water Meter Monitoring System' 
        : 'Smart Water Meter Monitoring System',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'Enclosure Designer' : 'Enclosure Designer & Quality Engineer',
      duration: '',
      description: language === 'en' 
        ? 'Designed dustproof and waterproof (weatherproof) sensor and Remote Terminal Unit (RTU) enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs. Took full responsibility for the end-to-end production, assembly, and Quality Control (QC) processes of RTUs for water meter sensors, conducted sensor data validation and testing, and performed comprehensive functional testing on fully assembled Remote Terminal Units.'
        : 'Merancang enclosure sensor dan Remote Terminal Unit (RTU) yang tahan debu dan air (weatherproof) sesuai spesifikasi dan kebutuhan proyek menggunakan Fusion 360 guna mengoptimalkan dimensi dan menekan biaya produksi. Bertanggung jawab penuh dalam alur produksi, perakitan (assembly), dan Quality Control (QC) RTU sensor water meter, serta melakukan validasi data sensor dan pengujian fungsi menyeluruh pada perangkat RTU.',
      coverImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Fusion 360', 'SketchUp', 'Dustproof & Waterproof Enclosures', 'Cost Optimization', 'RTU Assembly & QC', 'Water Meter Sensor', 'Sensor Data Testing', '3D CAD Modeling', 'Rapid Prototyping'],
      skills: language === 'en' 
        ? ['Weatherproof Enclosure Design', 'Cost Optimization', 'RTU Production & Assembly', 'Quality Control (QC)', 'Sensor Data Testing & Validation', 'CAD Modeling']
        : ['Desain Enclosure Weatherproof', 'Optimasi Biaya Produksi', 'Produksi & Assembly RTU', 'Quality Control (QC)', 'Pengujian & Validasi Data Sensor', 'Pemodelan CAD & Prototyping'],
      responsibilities: language === 'en' ? [
        'Designed dustproof and waterproof (weatherproof) sensor and Remote Terminal Unit (RTU) enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs.',
        'Took full ownership of the end-to-end production pipeline, manual assembly, and Quality Control (QC) inspection for water meter sensor RTUs.',
        'Conducted extensive sensor data testing, flow rate validation, and readout accuracy verification for water meter sensors.',
        'Performed comprehensive functional and reliability testing on fully assembled Remote Terminal Units to ensure flawless field deployment.'
      ] : [
        'Merancang enclosure sensor dan RTU yang tahan debu dan air (weatherproof) menggunakan Fusion 360 guna mengoptimalkan dimensi dan menekan biaya produksi.',
        'Bertanggung jawab penuh mengawal alur produksi, perakitan (assembly), dan Quality Control (QC) unit RTU water meter.',
        'Melakukan pengujian dan validasi data sensor water meter guna memastikan tingkat presisi pembacaan dan transmisi data.',
        'Menjalankan uji fungsional dan keandalan menyeluruh pada unit RTU yang telah selesai dirakit sebelum dipasang di lapangan.'
      ],
      results: language === 'en'
        ? 'Successfully delivered rugged dustproof and waterproof enclosures engineered for cost optimization, and managed the production, assembly, QC, and validation testing for water meter RTUs, ensuring 100% operational reliability and measurement accuracy in field deployments.'
        : 'Berhasil membuat enclosure kokoh tahan air/debu dengan optimasi biaya produksi serta mengelola alur produksi, perakitan, QC, dan pengujian data sensor RTU water meter dengan keandalan operasional tinggi di lapangan.',
      category: 'embedded'
    },
    {
      id: 'modem-smart-meter-ami',
      title: language === 'en'
        ? 'Modem for Smart Meter AMI (Advanced Metering Infrastructure)'
        : 'Modem untuk Smart Meter AMI (Advanced Metering Infrastructure)',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'Firmware & Embedded Systems Developer' : 'Firmware & Embedded Systems Developer',
      duration: '',
      description: language === 'en'
        ? 'Developed high-reliability modem firmware for AMI (Advanced Metering Infrastructure) electric meters across STM32 ARM 32-bit hardware platforms, implementing DLMS/COSEM communication protocols to read and transmit real-time electricity usage data reliably to central servers.'
        : 'Mengembangkan firmware modem untuk smart meter AMI (Advanced Metering Infrastructure) berbasis platform STM32 ARM 32-bit, mengimplementasikan protokol komunikasi DLMS/COSEM untuk membaca dan mentransmisikan data meter listrik secara real-time.',
      coverImage: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1508672019048-805c876b67e2?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['STM32 ARM 32-bit', 'Firmware Dev', 'DLMS / COSEM', 'AMI Smart Meter', 'C / C++', 'Serial Communication', 'Energy Data Acquisition'],
      skills: language === 'en'
        ? ['Firmware Development', 'STM32 Architecture', 'DLMS Protocol Integration', 'Smart Meter Systems', 'Electricity Data Acquisition']
        : ['Pengembangan Firmware', 'Arsitektur STM32 ARM', 'Integrasi Protokol DLMS', 'Sistem Smart Meter AMI', 'Akuisisi Data Energi'],
      responsibilities: language === 'en' ? [
        'Developed high-reliability modem firmware for smart meters on available STM32 ARM 32-bit hardware architecture to read and transmit AMI electric meter data.',
        'Researched, analyzed, and implemented DLMS/COSEM communication protocols for AMI smart meters.',
        'Implemented and deployed the modem into AMI smart meters to reliably acquire and transmit electricity usage data.'
      ] : [
        'Mengembangkan firmware modem smart meter pada platform hardware STM32 ARM 32-bit untuk membaca dan mengirim data meter listrik AMI.',
        'Mempelajari dan mengimplementasikan standar protokol komunikasi DLMS untuk meter AMI.',
        'Mengintegrasikan modem ke smart meter AMI guna memperoleh dan mengirimkan data penggunaan listrik secara real-time.'
      ],
      results: language === 'en'
        ? 'Successfully developed STM32 ARM 32-bit modem firmware and integrated DLMS protocols with AMI smart meters for accurate, automated electricity usage data transmission.'
        : 'Berhasil mengembangkan firmware modem STM32 ARM 32-bit dan mengimplementasikannya ke smart meter AMI berbasis protokol DLMS untuk pengiriman data listrik yang akurat.',
      category: 'embedded'
    },
    {
      id: 'smart-meter-ami-dcu',
      title: language === 'en'
        ? 'Smart Meter Like AMI and DCU (Data Collector Unit)'
        : 'Smart Meter Like AMI and DCU (Data Collector Unit)',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'CAD 3D Designer & IoT Systems Engineer' : 'CAD 3D Designer & IoT Systems Engineer',
      duration: '',
      description: language === 'en'
        ? 'Coordinated with PT Pudak Scientific for the production of smart meter like AMI and Data Collector Unit (DCU) enclosures, managing the entire pipeline from 3D CAD enclosure design, unit production pricing and costing, manufacturing timeline scheduling, to business model formulation. Engineered rugged protective enclosures using Fusion 360 and SketchUp, optimizing designs to reduce production costs, and routed energy consumption data to central MQTT brokers for automated telemetry.'
        : 'Berkoordinasi dengan PT Pudak Scientific untuk produksi enclosure smart meter like AMI dan Data Collector Unit (DCU), mulai dari desain 3D CAD enclosure, harga dan biaya produksi, waktu produksi hingga formulasi model bisnis. Merancang enclosure protektif menggunakan Fusion 360 dan SketchUp untuk menekan biaya produksi dan upgrade smart meter ke standar AMI, serta menyalurkan data pemakaian energi ke broker MQTT untuk pemantauan otomatis.',
      coverImage: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581092335397-9583fe92d232?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Vendor Coordination (PT Pudak Scientific)', 'Costing & Business Model', 'Production Timeline Scheduling', 'Cost-Optimized Enclosures', 'Fusion 360 / SketchUp / 3D CAD', '3D Enclosure Design', 'DCU (Data Collector Unit)', 'MQTT Protocol', 'Prepaid Smart Meter'],
      skills: language === 'en'
        ? ['CAD 3D Modeling', 'Enclosure Engineering', 'Cost Optimization', 'Vendor Coordination (PT Pudak Scientific)', 'Production Costing & Pricing', 'Business Model Formulation', 'Manufacturing Timelines', 'MQTT Telemetry']
        : ['Pemodelan CAD 3D', 'Rekayasa Enclosure', 'Optimasi Biaya Produksi', 'Koordinasi Vendor (PT Pudak Scientific)', 'Estimasi Biaya & Penetapan Harga', 'Formulasi Model Bisnis', 'Penjadwalan Manufaktur', 'Telemetri MQTT'],
      responsibilities: language === 'en' ? [
        'Coordinated with PT Pudak Scientific for the manufacturing of smart meter like AMI and DCU enclosures covering 3D design, unit production pricing, manufacturing lead times, and business model formulation.',
        'Engineered 3D protective enclosures using Fusion 360 and SketchUp, optimizing dimensions and material selection to reduce production costs and upgrade meters to AMI standards.',
        'Designed custom 3D enclosures for Data Collector Units (DCU) optimized for field installation and environmental protection.',
        'Streamed energy consumption data from prepaid smart meters to central servers via MQTT protocol.',
        'Monitored operational status and connectivity of smart meters deployed with Data Collector Units in the field.'
      ] : [
        'Berkoordinasi dengan PT Pudak Scientific untuk produksi enclosure smart meter like AMI dan Data Collector Unit (DCU), mulai dari desain 3D CAD, harga produksi, waktu produksi hingga formulasi model bisnis.',
        'Merancang 3D enclosure khusus untuk smart meter prabayar menggunakan Fusion 360 dan SketchUp guna menekan biaya manufaktur dan memenuhi standar AMI.',
        'Mendesain 3D enclosure untuk Data Collector Unit (DCU) dengan ketahanan fisik tinggi dan kemudahan instalasi di lapangan.',
        'Mengumpulkan data penggunaan energi listrik dari smart meter prabayar dan mengirimkannya ke broker pusat via protokol MQTT.',
        'Melakukan pemantauan berkala terhadap status koneksi dan transmisi data smart meter yang terpasang bersama DCU di lapangan.'
      ],
      results: language === 'en'
        ? 'Successfully partnered with PT Pudak Scientific to establish unit pricing, production timelines, and business models while modeling custom cost-optimized 3D enclosures for prepaid smart meters & DCUs and streaming live energy telemetry via MQTT.'
        : 'Berhasil bekerja sama dengan PT Pudak Scientific dalam menetapkan harga produksi, jadwal manufaktur, dan model bisnis, serta menghasilkan desain 3D enclosure hemat biaya untuk smart meter & DCU dan telemetri data via MQTT.',
      category: 'cad'
    },
    {
      id: 'transformer-health-monitoring',
      title: language === 'en'
        ? 'Transformer Health Monitoring System (THMS)'
        : 'Transformer Health Monitoring System (THMS)',
      company: 'Langgeng Cipta Solusi',
      position: language === 'en' ? 'CAD 3D Designer & Production Quality Engineer' : 'CAD 3D Designer & Production Quality Engineer',
      duration: '',
      description: language === 'en'
        ? 'Coordinated with PT Pudak Scientific for the production of Transformer Health Monitoring System (THMS) protective enclosures, managing the entire pipeline from 3D CAD enclosure design, unit production pricing and costing, manufacturing timeline scheduling, to business model formulation. Engineered protective enclosures in Fusion 360 and SketchUp, optimizing design to reduce production costs for substation environments, and supervised device production workflows and Quality Control (QC) inspections.'
        : 'Berkoordinasi dengan PT Pudak Scientific untuk produksi enclosure Transformer Health Monitoring System (THMS), mulai dari desain 3D CAD enclosure, harga dan biaya produksi, waktu produksi hingga formulasi model bisnis. Merancang enclosure protektif dalam Fusion 360 dan SketchUp dengan efisiensi biaya untuk lingkungan gardu trafo listrik, serta mengawasi alur kerja produksi perangkat (device production workflows) dan Quality Control (QC).',
      coverImage: 'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=600&auto=format&fit=crop',
      gallery: [
        'https://images.unsplash.com/photo-1473163928189-364b2c4e1135?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?q=80&w=1200&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
      ],
      videos: [],
      technologies: ['Vendor Coordination (PT Pudak Scientific)', 'Costing & Business Model', 'Production Timeline Scheduling', 'CAD 3D Enclosure', 'Cost Optimization', 'Fusion 360', 'SketchUp', 'Transformer Health Monitoring', 'THMS Hardware', 'Production Supervision & QC'],
      skills: language === 'en'
        ? ['3D Enclosure Design', 'Cost Optimization', 'Vendor Coordination (PT Pudak Scientific)', 'Cost Estimation & Pricing', 'Business Model Formulation', 'Production Process Supervision', 'Quality Control & Inspection']
        : ['Desain Enclosure 3D', 'Optimasi Biaya Produksi', 'Koordinasi Vendor (PT Pudak Scientific)', 'Estimasi Biaya & Penetapan Harga', 'Formulasi Model Bisnis', 'Supervisi Proses Produksi', 'Quality Control & Inspeksi'],
      responsibilities: language === 'en' ? [
        'Coordinated with PT Pudak Scientific for the production of THMS protective enclosures, managing 3D CAD design, production costing, fabrication scheduling, and business model formulation.',
        'Engineered 3D protective enclosures tailored for electrical substation environments using Fusion 360 and SketchUp, optimizing design to reduce production costs.',
        'Supervised end-to-end device production workflows and conducted strict Quality Control (QC) inspections.',
        'Performed physical fitment testing and verified environmental durability compliance for critical transformer monitoring hardware.'
      ] : [
        'Berkoordinasi dengan PT Pudak Scientific untuk produksi enclosure Transformer Health Monitoring System (THMS), mulai dari desain 3D CAD, harga produksi, waktu produksi hingga formulasi model bisnis.',
        'Merancang 3D enclosure protektif menggunakan Fusion 360 dan SketchUp dengan optimasi biaya produksi untuk gardu trafo listrik.',
        'Mengawasi seluruh alur kerja produksi perangkat (device production workflows) dan inspeksi Quality Control (QC).',
        'Melakukan uji kesesuaian fisik (fitment test) dan verifikasi ketahanan operasional perangkat monitoring trafo.'
      ],
      results: language === 'en'
        ? 'Successfully formulated production costing, manufacturing timelines, and business models with PT Pudak Scientific while delivering precision cost-optimized THMS 3D protective enclosures and maintaining rigorous quality oversight.'
        : 'Berhasil merumuskan biaya produksi, jadwal manufaktur, dan model bisnis bersama PT Pudak Scientific serta menghadirkan 3D enclosure protektif THMS yang efisien biaya dengan pengawasan kualitas (QC) yang ketat.',
      category: 'cad'
    }
  ].map((p) => {
    const dataProject = PROJECTS.find((dp) => dp.id === p.id);
    if (!dataProject) return p;
    return {
      ...p,
      coverImage: dataProject.coverImage || p.coverImage,
      gallery: dataProject.gallery && dataProject.gallery.length > 0 ? dataProject.gallery : p.gallery,
      videos: dataProject.videos && dataProject.videos.length > 0 ? dataProject.videos : p.videos,
    };
  });

  const educationItems: EducationItem[] = [
    {
      id: 'telkom-university',
      institution: 'Telkom University',
      degree: language === 'en' 
        ? 'Bachelor of Engineering in Computer Engineering (GPA 3.41)' 
        : 'S1 Teknik Komputer (IPK 3.41)',
      period: 'Aug 2017 — Nov 2022',
      description: language === 'en'
        ? 'Specialized in computer engineering, hardware systems, microcontrollers, embedded IoT designs, and advanced digital research within elite laboratory divisions.'
        : 'Fokus studi pada sistem komputer, embedded hardware, mikrokontroler, arsitektur IoT, serta riset teknologi di laboratorium penelitian.',
      achievements: language === 'en' ? [
        'Research assistant in applied research of “The Implementation of Internet of Things, Machine Learning, and Linear Robot on Electricity Monitoring System” with funding IDR 5.750.000.',
        '1st place in Technogine National Competition – Technovation Division as a Research Assistant of Robotic and Embedded System Technology Laboratory.',
        '2nd place in School of Electrical Engineering Festival - National Line Follower Competition as a Research Assistant of Robotic and Embedded System Technology Laboratory.',
        'Teaching assistant of Robotic and Embedded System Technology Laboratory, teaching Digital System Design practicum course with 210 students.',
        'Top 120 Innovillage 2021, Implementation of social project of Hydroelectric Power Plant With Wireless Remote Monitoring and Control System in Tambolosu Village, South Konawe Regency With funding of IDR 17.500.000.'
      ] : [
        'Asisten Peneliti dalam riset terapan “Implementasi Internet of Things, Machine Learning, dan Linear Robot pada Sistem Monitoring Listrik” (Pendanaan Rp 5.750.000).',
        'Juara 1 Tingkat Nasional Kompetisi Technogine – Divisi Technovation bersama Tim Riset Lab RnEST.',
        'Juara 2 School of Electrical Engineering Festival - Kompetisi Nasional Line Follower Robot bersama Tim Riset Lab RnEST.',
        'Asisten Dosen / Praktikum Lab RnEST untuk mata kuliah Desain Sistem Digital (membimbing 210 mahasiswa).',
        'Top 120 Innovillage 2021, Implementasi proyek sosial Pembangkit Listrik Tenaga Mikrohidro dengan Sistem Monitoring & Kontrol Nirkabel di Desa Tambolosu, Konawe Selatan (Pendanaan Rp 17.500.000).'
      ],
      experience: language === 'en' ? [
        'Research Assistant of Robotic and Embedded System Technology Laboratory',
        'Teaching Assistant of Robotic and Embedded System Technology Laboratory (Digital System Design)',
        'Laboratory Assistant / Assistant in charge of the practicum division'
      ] : [
        'Research Assistant di Robotic and Embedded System Technology Laboratory (RnEST)',
        'Teaching Assistant mata kuliah Desain Sistem Digital (Lab RnEST)',
        'Asisten Laboratorium & Koordinator Divisi Praktikum'
      ]
    }
  ];

  const certifications: CertificationItem[] = [];

  const softSkills: string[] = language === 'en' ? [
    'Project Engineer',
    'Project Implementation',
    'Project Coordination',
    'Coding Education',
    '3D Modeling',
    'Team Leadership',
    'Problem Solving'
  ] : [
    'Project Engineer',
    'Implementasi Lapangan',
    'Koordinasi Proyek',
    'Coding Education',
    'Pemodelan CAD 3D',
    'Leadership & Teamwork',
    'Problem Solving'
  ];

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        workExperiences,
        projects,
        educationItems,
        certifications,
        softSkills,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
