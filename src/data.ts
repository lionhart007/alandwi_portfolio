import { Project, EducationItem, SkillItem, CertificationItem, WorkExperience } from './types';

// ==========================================
// FOTO PROFIL / PROFILE PHOTO
// Anda bisa memasukkan:
// 1. Link Google Drive (contoh: https://drive.google.com/file/d/XXX/view?usp=drive_link)
// 2. Link gambar publik / CDN
// 3. File di folder public (contoh: '/profile.jpg')
// ==========================================
export const PROFILE_IMAGE = 'https://drive.google.com/file/d/12CvILTCKPBzT1NjteE7kBTYMIaxNwdo-/view?usp=drive_link';

// ==========================================
// INFORMASI KONTAK & MEDIA SOSIAL
// Sesuai curriculum vitae
// ==========================================
export const CONTACT_INFO = {
  name: 'ALAN REZKY DWIPUTRA NUR',
  location: 'Sukagalih, Bandung City, West Java',
  phone: '(+62) 813 4153 4090',
  email: 'aalan6943@gmail.com',
  linkedin: 'linkedin.com/in/alan-rezky-dwiputra-nur-b53828225',
  linkedinUrl: 'https://linkedin.com/in/alan-rezky-dwiputra-nur-b53828225',
  github: 'github.com/lionhart007',
  githubUrl: 'https://github.com/lionhart007',
  whatsappUrl: 'https://wa.me/6281341534090',
};

export const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/alan-rezky-dwiputra-nur-b53828225' },
  { label: 'GitHub', href: 'https://github.com/lionhart007' },
  { label: 'WhatsApp', href: 'https://wa.me/6281341534090' },
];

export const WORK_EXPERIENCES: WorkExperience[] = [
  {
    id: 'langgeng-cipta-solusi',
    company: 'Langgeng Cipta Solusi',
    position: 'Internet of Things Developer, Project Manager and Project Engineer',
    period: 'Dec 2022 — Present',
    location: 'Bandung, West Java, Indonesia',
    description: [
      'Developed high-reliability RTU (Remote Terminal Unit) firmware for real-time sensor data acquisition and smart modem firmware to read and transmit AMI (Advanced Metering Infrastructure) electric meter data across STM32 ARM 32-bit, ESP32, and ATmega microcontrollers, integrating DLMS/COSEM, MQTT, Wi-Fi, and custom fiber-optic protocols.',
      'Designed custom PCB layouts and optimized existing PCB component architectures using EasyEDA and Fusion 360, developing reliable power distribution circuitry and multi-sensor interfaces (tiltmeter, strain gauge, 2D/3D anemometers, accelerometers, cable tension sensors, and LVDT); conducted laboratory and on-site sensor calibrations.',
      'Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs, and utilized SketchUp to simulate bridge sensor placement and field installation layouts; coordinated with PT ADS for the production of SHMS panel enclosures and supporting equipment, and with PT Pudak Scientific for Smart Meter Like AMI, DCU, and THMS enclosures across design, costing, timelines, and business model formulation.',
      'Served as Project Manager handling the Sei Wampu Toll Bridge SHMS project from inception to completion, communicating directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover, while handling on-site sensor installation and integration in the field; served as Project Engineer on the Sodongkopo Bridge (Pangandaran) SHMS project for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V) handling sensor installation and integration on the bridge from start to finish, supervising device production workflows, DAU panel assembly, QC inspections, and coordinating with PT ADS; served as Sensor Developer for the Merah Putih Bridge (Ambon) SHMS project developing and calibrating the multi-sensor monitoring suite, firmware, and PCB layouts; and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to guarantee all delivered systems functioned flawlessly in strict compliance with client specifications.'
    ]
  },
  {
    id: 'brightchamps',
    company: 'BrightCHAMPS',
    position: 'Coding Educator',
    period: 'Sep 2023 — Dec 2024',
    location: 'Indonesia (Remote)',
    description: [
      'Taught core coding principles to kids, teens, and juniors across diverse age groups.',
      'Instructed programming languages and environments including Python, Scratch/Code blocks, JavaScript, HTML, CSS, C, and C++.'
    ]
  },
  {
    id: 'rnest-lab-assistant',
    company: 'RnEST Laboratory',
    position: 'Laboratory Assistant',
    period: 'Feb 2021 — Feb 2022',
    location: 'Bandung, West Java, Indonesia',
    description: [
      'Served as a Laboratory Assistant and assistant in charge of the practicum division.',
      'Administered academic laboratories, managed schedules, and supported students in hands-on experiment modules.'
    ]
  },
  {
    id: 'intens-rfid',
    company: 'PT. Inti Konten Indonesia (INTENS)',
    position: 'Information Technology Solutions Developer',
    period: 'Jul 2021',
    location: 'Bandung, West Java, Indonesia',
    description: [
      'Designed and engineered an active animal tracking system utilizing RFID technology.',
      'Created a comprehensive, user-friendly monitoring website and dashboard for livestock tracking systems.'
    ]
  },
  {
    id: 'rnest-lab-researcher',
    company: 'RnEST Laboratory',
    position: 'Research Assistant',
    period: 'Sep 2019 — Sep 2020',
    location: 'Bandung, West Java, Indonesia',
    description: [
      'Conducted cutting-edge research on advanced embedded hardware, sensor arrays, and microcontroller modules.',
      'Fabricated physical robotic prototypes and worked closely on decentralized IoT system development.'
    ]
  },
  {
    id: 'telkom-indonesia-access',
    company: 'Telkom Indonesia',
    position: 'Corporate Customer Access Network Specialist',
    period: 'Jul 2020 — Aug 2020',
    location: 'Kota Tangerang, Banten, Indonesia',
    description: [
      'Designed and developed a corporate web portal to streamline the coordinate and access order dispatch process.',
      'Simplified internal data input and enhanced workflow management speed for field technicians.'
    ]
  },
  {
    id: 'pln-persero',
    company: 'PT PLN (Persero)',
    position: 'Mechanical Engineering Specialist',
    period: 'Aug 2017 — Dec 2017',
    location: 'Kota Kendari, Southeast Sulawesi, Indonesia',
    description: [
      'Operated as a machine maintenance mechanic, ensuring optimal runtime status of hardware systems.',
      'Conducted preventive maintenance, diagnostic checks, and mechanical updates.'
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'shm-pangandaran',
    title: 'Structural Health Monitoring System at Sodongkopo Bridge, Pangandaran, West Java',
    company: 'Langgeng Cipta Solusi',
    position: 'Project Engineer',
    duration: 'Jun 2026 — Oct 2026',
    description: 'Served as Project Engineer on the Structural Health Monitoring System (SHMS) project for Sodongkopo Bridge in Pangandaran for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V), handling sensor installation and integration on the bridge from start to finish. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections, and coordinated with PT ADS for the production of SHMS panel enclosures and supporting equipment. Designed dustproof and waterproof (weatherproof) sensor enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs, and utilized SketchUp to simulate bridge sensor placement and field installation layouts. Developed custom PCB layouts and optimized existing component architectures using EasyEDA and Fusion 360, calibrated upgraded tiltmeter sensors, engineered strain gauge sensors with tensile sling simulation, and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to ensure all delivered equipment functioned properly according to client specifications.',
    coverImage: 'https://drive.google.com/file/d/1eX4dum6No_3jzOR9EekQAnrFmjgJpiPA/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/1OdAPWQIMzN41L__-7aaWTT7WdvcGLszN/view?usp=drive_link',
      'https://drive.google.com/file/d/1512MshAUMQQQfhX3Qr_MZRFYJz3U-xdc/view?usp=drive_link',
      'https://drive.google.com/file/d/1qMM_vIS-1aLyZAd0mlB81pleIRiQT778/view?usp=drive_link',
      'https://drive.google.com/file/d/15IhGXherGtNzVj4fYFDodw3WKwmGBZv6/view?usp=drive_link',
      'https://drive.google.com/file/d/1LKbX9G2yCUevaxFA2cuidt00Xq3OYkDE/view?usp=drive_link',
      'https://drive.google.com/file/d/1PeAwSQYPKbXOBhAsNYlbMg5bUh0jUfh-/view?usp=drive_link',
      'https://drive.google.com/file/d/1bYoFolyoQio5HqaeL7NF1y4xTicMcdbF/view?usp=drive_link',
      'https://drive.google.com/file/d/1-ZryASMrZBjCsmJ19fUogAZ-jDQc2Vqz/view?usp=drive_link',
      'https://drive.google.com/file/d/1TzJFSyaDqxhDB-IONQwk_bXPnCKH1sNJ/view?usp=drive_link',
      'https://drive.google.com/file/d/1kuMA2ttsQkSB8nrlPjM9ggmRQ8d9-Wgl/view?usp=drive_link'
    ],
    videos: [],
    technologies: ['Tiltmeter', 'Strain Gauge', 'DAU & Gateway Panel', 'Vendor Coordination (PT ADS)', 'RTU & DAU Assembly & QC', 'Sensor Calibration', 'Bridge Simulation (SketchUp)', 'Fusion 360 Enclosures', 'FAT & SAT Testing', 'Sensor Installation & Integration'],
    skills: ['Project Engineering', 'Vendor Coordination (PT ADS)', 'Sensor Installation & Integration', 'Weatherproof Enclosure Design', 'Bridge Simulation (SketchUp)', 'Tiltmeter Calibration', 'Strain Gauge & Transducer Design', 'DAU Panel Assembly & QC', 'FAT & SAT Execution', 'Bridge SHMS Integration'],
    responsibilities: [
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
    ],
    results: 'Successfully delivered the project for client West Java Provincial Road and Bridge Management Technical Implementation Unit (UPTD Service Region V), coordinated enclosure production with PT ADS, supervised DAU panel assembly and QC, calibrated sensors, executed FAT & SAT, and managed sensor installation and integration from start to finish across Sodongkopo bridge in Pangandaran.',
    category: 'embedded'
  },
  {
    id: 'shm-seiwampu',
    title: 'Structural Health Monitoring System at Sei Wampu Toll Bridge, Medan, North Sumatera',
    company: 'Langgeng Cipta Solusi',
    position: 'Project Manager & IoT Engineer',
    duration: 'Aug 2024 — Oct 2025',
    description: 'Served as Project Manager handling the Structural Health Monitoring System (SHMS) project for the Sei Wampu Toll Bridge in Medan, North Sumatera from inception to completion. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections. Developed high-reliability RTU (Remote Terminal Unit) firmware and custom PCB layouts for sensor data acquisition with fiber-optic communication protocols. Coordinated directly with PT ADS for the precision production of SHMS panel enclosures and supporting equipment. Designed dustproof and waterproof sensor enclosures in Fusion 360 to optimize production costs, and simulated sensor placement using SketchUp. Communicated directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover, handled on-site sensor installation and integration in the field from start to finish, and conducted comprehensive Factory Acceptance Tests (FAT) and Site Acceptance Tests (SAT) to guarantee all delivered systems functioned flawlessly in strict compliance with client specifications.',
    coverImage: 'https://drive.google.com/file/d/1jb-6DpCjal-kxVj5lv_7-3_IxaGkUJmR/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/1jS2I5bYWE2y9ShaYW4sROhBUBPO_AV0u/view?usp=drive_link',
      'https://drive.google.com/file/d/1D8EdOth4-pHYX4RQIy-_2eL7kvdUGIhb/view?usp=drive_link',
      'https://drive.google.com/file/d/1oIA9xLBXDAAjpJVI90nDMbtksgeoB-xN/view?usp=drive_link',
      'https://drive.google.com/file/d/1DXDcJXYuqZTvXwElZwuIQyn1XDZyLxLG/view?usp=drive_link',
      'https://drive.google.com/file/d/1kJALryD2Xvf0gBxinpujX4sv1QP1ErhC/view?usp=drive_link',
      'https://drive.google.com/file/d/1ph5i-0XE1FZWnelW0gpjl93qMdhLGz0r/view?usp=drive_link',
      'https://drive.google.com/file/d/1At-J7TKwnCqJwKeZYJtTspWy_kkvAae6/view?usp=drive_link',
      'https://drive.google.com/file/d/1pF-ovue5QIPc3s5XBP8PZKg2oy60Nm0G/view?usp=drive_link',
      'https://drive.google.com/file/d/1KGan5_qTBjcvgDRVpEpJBPeNbcEVgDTS/view?usp=drive_link',
      'https://drive.google.com/file/d/1u6Kf_Au_axPaIfkkNE_dIjT6Mdux6MDP/view?usp=drive_link'
    ],
    videos: [],
    technologies: ['Project Management', 'Client Coordination (PT Hutama Karya Indonesia)', 'Vendor Coordination (PT ADS)', 'Fiber Optic Protocol', 'RTU Firmware & PCB Design', 'DAU Panel Assembly & QC', 'Fusion 360 Enclosures', 'SketchUp Simulation', 'FAT & SAT Testing', 'Project Permits & Handover', 'Field Sensor Installation & Integration'],
    skills: ['Project Management', 'Client Communication (PT Hutama Karya Indonesia)', 'Vendor Coordination (PT ADS)', 'FAT & SAT Execution', 'Weatherproof Enclosure Design', 'SketchUp Simulation', 'Project Planning & Handover', 'Project Permits & Licensing', 'Fiber Optic Data Transmission', 'DAU Panel Assembly & QC', 'Field Sensor Installation & Integration'],
    responsibilities: [
      'Handled the Sei Wampu Toll Bridge SHMS project end-to-end from inception to completion as Project Manager.',
      'Communicated directly with client PT Hutama Karya Indonesia regarding project planning, project permits & site licensing, and final project handover.',
      'Supervised device production workflows, Data Acquisition Unit (DAU) panel assembly, and Quality Control (QC) inspections.',
      'Coordinated with PT ADS for the precision production of SHMS panel enclosures and supporting equipment.',
      'Designed dustproof and waterproof sensor enclosures tailored to project requirements using Fusion 360 to optimize production costs, and utilized SketchUp to simulate bridge sensor placement.',
      'Developed dedicated RTU firmware and custom PCB layouts for sensor data acquisition with fiber-optic communication protocols.',
      'Conducted Factory Acceptance Testing (FAT) and on-site Site Acceptance Testing (SAT) to ensure all delivered instruments and monitoring equipment operated flawlessly in compliance with client requirements.',
      'Handled on-site sensor installation and system integration in the field from start to finish, field cable routing, and final commissioning.'
    ],
    results: 'Successfully managed the Sei Wampu Toll Bridge SHMS project end-to-end, coordinated directly with client PT Hutama Karya Indonesia and vendor PT ADS, executed FAT & SAT, established fiber-optic sensor telemetry, and completed on-site sensor installation and integration with zero transmission loss.',
    category: 'embedded'
  },
  {
    id: 'shm-ambon',
    title: 'Structural Health Monitoring System at Merah Putih Bridge, Ambon, Maluku',
    company: 'Langgeng Cipta Solusi',
    position: 'Sensor Developer',
    duration: 'Jun 2023 — Apr 2024',
    description: 'Served as Sensor Developer for the Merah Putih Bridge Structural Health Monitoring System (SHMS) project in Ambon, Maluku. Developed custom firmware and PCB layouts using EasyEDA and Fusion 360 for multi-sensor suites (3D anemometer, accelerometer, tiltmeter, strain gauge, cable tension, temperature, and ATRH) with Wi-Fi telemetry. Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections, coordinated with PT ADS for the precision production of enclosure panels and supporting SHMS equipment, engineered dedicated power distribution circuitry, and performed precise sensor calibrations.',
    coverImage: 'https://drive.google.com/file/d/1ju3A42NAItJd2cvBESB1wt6oM_Gi-3gC/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/10AXZbARgiQEqkB3fR8nNOfFDK_fAvF6p/view?usp=drive_link',
      'https://drive.google.com/file/d/1s2jpi2sWqaWcLn3ikCf3ng5OtaX1uZT-/view?usp=drive_link',
      'https://drive.google.com/file/d/1dDyNXu1kNM3imSygenTk7__KRCndU7Uf/view?usp=drive_link',
      'https://drive.google.com/file/d/1IuestIdmxE84-CwuqMPJgn-_uIok70wo/view?usp=drive_link',
      'https://drive.google.com/file/d/1bqgb5bPXh9lB7rz2w5XIvMXvKm9uAZWw/view?usp=drive_link',
      'https://drive.google.com/file/d/1UOgdZn4Wt5p2adsHxZE7uxiRT7jpfX_j/view?usp=drive_link',
      'https://drive.google.com/file/d/1UOgdZn4Wt5p2adsHxZE7uxiRT7jpfX_j/view?usp=drive_link',
      'https://drive.google.com/file/d/1CZ712xvlQb2lgGgvAsO1U4kZWRcAEGtC/view?usp=drive_link',
      ],
    videos: [],
    technologies: ['Firmware Dev', 'PCB (EasyEDA / Fusion 360)', 'Vendor Coordination (PT ADS)', 'Wi-Fi Protocol', 'Cable Tension Sensor', 'Accelerometer & Tiltmeter', '3D Anemometer', 'Power Distribution', 'RTU & DAU Assembly & QC'],
    skills: ['Sensor Development', 'Firmware Development', 'PCB Design (EasyEDA / Fusion 360)', 'Vendor Coordination (PT ADS)', 'Wi-Fi Communication', 'Power Distribution Design', 'Sensor Calibration', 'RTU/DAU Assembly & QC Supervision'],
    responsibilities: [
      'Served as Sensor Developer for the Merah Putih Bridge SHMS project in Ambon, Maluku, focusing on sensor instrumentation and firmware development.',
      'Supervised device production workflows, DAU panel assembly, and Quality Control (QC) inspections for the sensor systems.',
      'Coordinated with PT ADS for the precision fabrication and production of enclosure panels and SHMS supporting equipment.',
      'Developed custom firmware and PCB layouts using EasyEDA and Fusion 360 for multi-sensor suites across the bridge.',
      'Engineered dedicated power distribution circuitry and cabling infrastructure to deliver clean, uninterrupted power to all bridge sensors.',
      'Conducted laboratory and field calibration for tiltmeter and cable tension accelerometer sensors to ensure exact measurement accuracy.'
    ],
    results: 'Successfully coordinated enclosure production with PT ADS, supervised DAU panel assembly and QC, and developed and calibrated multi-sensor firmware with custom Wi-Fi telemetry and stable power distribution on Merah Putih Bridge in Ambon.',
    category: 'embedded'
  },
  {
    id: 'watermeter-project',
    title: 'Smart Water Meter Monitoring System',
    company: 'Langgeng Cipta Solusi',
    position: 'Enclosure Designer',
    duration: '',
    description: 'Designed dustproof and waterproof (weatherproof) sensor and Remote Terminal Unit (RTU) enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs. Took full responsibility for the end-to-end production, assembly, and Quality Control (QC) processes of RTUs for water meter sensors, conducted sensor data validation and testing, and performed comprehensive functional testing on fully assembled Remote Terminal Units.',
    coverImage: 'https://drive.google.com/file/d/1IZbkufQY5ez-6F3JFTNDsNzuWoBUcxrW/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/1wYApuTeu__y2rmcE0HYG7rFo0LShQa2z/view?usp=drive_link',
      'https://drive.google.com/file/d/11RtjNMHYhMMTGpz_dz22K5QG0n4mo7JF/view?usp=drive_link',
      'https://drive.google.com/file/d/1tO5B0pZhEjC7eE-U0sKfagZzV4irMfdq/view?usp=drive_link',
      'https://drive.google.com/file/d/16dGgbXBwdBVqTPHy5EAT9hnRB01aUYtn/view?usp=drive_link',
      'https://drive.google.com/file/d/1tO5B0pZhEjC7eE-U0sKfagZzV4irMfdq/view?usp=drive_link',
    ],
    videos: [],
    technologies: ['Fusion 360', 'SketchUp', 'Dustproof & Waterproof Enclosures', 'Cost Optimization', 'RTU Assembly & QC', 'Water Meter Sensor', 'Sensor Data Testing', '3D CAD Modeling', 'Rapid Prototyping'],
    skills: ['Weatherproof Enclosure Design', 'Cost Optimization', 'RTU Production & Assembly', 'Quality Control (QC)', 'Sensor Data Testing & Validation', 'CAD Modeling'],
    responsibilities: [
      'Designed dustproof and waterproof (weatherproof) sensor and Remote Terminal Unit (RTU) enclosures tailored to project requirements using Fusion 360, optimizing dimensions and material selection to reduce production costs.',
      'Took full ownership of the end-to-end production pipeline, manual assembly, and Quality Control (QC) inspection for water meter sensor RTUs.',
      'Conducted extensive sensor data testing, flow rate validation, and readout accuracy verification for water meter sensors.',
      'Performed comprehensive functional and reliability testing on fully assembled Remote Terminal Units to ensure flawless field deployment.'
    ],
    results: 'Successfully delivered rugged dustproof and waterproof enclosures engineered for cost optimization, and managed the production, assembly, QC, and validation testing for water meter RTUs, ensuring 100% operational reliability and measurement accuracy in field deployments.',
    category: 'embedded'
  },
  {
    id: 'modem-smart-meter-ami',
    title: 'Modem for Smart Meter AMI (Advanced Metering Infrastructure)',
    company: 'Langgeng Cipta Solusi',
    position: 'Firmware & Embedded Systems Developer',
    duration: '',
    description: 'Developed high-reliability modem firmware for AMI (Advanced Metering Infrastructure) electric meters across STM32 ARM 32-bit hardware platforms, implementing DLMS/COSEM communication protocols to read and transmit real-time electricity usage data reliably to central servers.',
    coverImage: 'https://drive.google.com/file/d/1dBXftdFgfIHl8SClI9UUllDwARm3RAmy/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/18ySnOETH6TEAh8ydZ-SxuRk1jjnAvmuC/view?usp=drive_link',
      'https://drive.google.com/file/d/1sU8V60iw-xKDlWNuV1f3_05Qh0unAW2-/view?usp=drive_link',
      'https://drive.google.com/file/d/1jRf2bdleP8xuC5t5dX-sioqomAnG002y/view?usp=drive_link',
      'https://drive.google.com/file/d/1ic1OiajoLoOOK0zFIIRzZdd4ysHdRy7B/view?usp=drive_link',
    ],
    videos: [],
    technologies: ['STM32 ARM 32-bit', 'Firmware Dev', 'DLMS / COSEM', 'AMI Smart Meter', 'C / C++', 'Serial Communication', 'Energy Data Acquisition'],
    skills: ['Firmware Development', 'STM32 Architecture', 'DLMS Protocol Integration', 'Smart Meter Systems', 'Electricity Data Acquisition'],
    responsibilities: [
      'Developed high-reliability modem firmware for smart meters on available STM32 ARM 32-bit hardware architecture to read and transmit AMI electric meter data.',
      'Studied, analyzed, and implemented DLMS/COSEM communication protocols for AMI smart meters.',
      'Integrated and deployed the modem into AMI smart meters to reliably acquire and transmit real-time electricity consumption data.'
    ],
    results: 'Successfully developed STM32 ARM 32-bit modem firmware and integrated DLMS protocols with AMI smart meters for accurate, automated electricity usage data transmission.',
    category: 'embedded'
  },
  {
    id: 'smart-meter-ami-dcu',
    title: 'Smart Meter Like AMI and DCU (Data Collector Unit)',
    company: 'Langgeng Cipta Solusi',
    position: 'CAD 3D Designer & IoT Systems Engineer',
    duration: '',
    description: 'Coordinated with PT Pudak Scientific for the production of smart meter like AMI and Data Collector Unit (DCU) enclosures, managing the entire pipeline from 3D CAD enclosure design, production costing and quotation, manufacturing timeline scheduling, to business model formulation. Engineered rugged protective enclosures using Fusion 360 and SketchUp, optimizing designs to reduce production costs, and routed energy consumption data to central MQTT brokers for automated telemetry.',
    coverImage: 'https://drive.google.com/file/d/1PaHpA4GJM-R3ZgKW9zPsWY8WxMVuOB2T/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/1Y_LOahWWeWSTY9D-HTE9SzBcgddgPKa9/view?usp=drive_link',
      'https://drive.google.com/file/d/1qESLLh8NsYz-D9qYlzj_ZywKBhdLSRmf/view?usp=drive_link',
      'https://drive.google.com/file/d/1hQNyPWVim6tYzxonDkFEr5QJsyLxOBRf/view?usp=drive_link',
      'https://drive.google.com/file/d/15YN9GlaWFR85OsYVcjeGfH8_jQg5F-ld/view?usp=drive_link',
      'https://drive.google.com/file/d/1UYgB7PQlCTI2kZ6bV5zH1tMrXrQuomCg/view?usp=drive_link',
      'https://drive.google.com/file/d/1qpKLFVH9uCxbtsHXzfLGCXeudUAFySXg/view?usp=drive_link'
    ],
    videos: [],
    technologies: ['Vendor Coordination (PT Pudak Scientific)', 'Costing & Business Model', 'Production Timeline Scheduling', 'Cost-Optimized Enclosures', 'Fusion 360 / SketchUp / 3D CAD', '3D Enclosure Design', 'DCU (Data Collector Unit)', 'MQTT Protocol', 'Prepaid Smart Meter'],
    skills: ['CAD 3D Modeling', 'Enclosure Engineering', 'Cost Optimization', 'Vendor Coordination (PT Pudak Scientific)', 'Production Costing & Pricing', 'Business Model Formulation', 'Manufacturing Timelines', 'MQTT Telemetry'],
    responsibilities: [
      'Coordinated with PT Pudak Scientific for the manufacturing of smart meter like AMI and DCU enclosures covering 3D design, unit production pricing, manufacturing lead times, and business model formulation.',
      'Engineered 3D protective enclosures using Fusion 360 and SketchUp, optimizing dimensions and material selection to reduce production costs and upgrade meters to AMI standards.',
      'Designed custom 3D enclosures for Data Collector Units (DCU) optimized for field installation and environmental protection.',
      'Streamed energy consumption data from prepaid smart meters to central servers via MQTT protocol.',
      'Monitored operational status and connectivity of smart meters deployed with Data Collector Units in the field.'
    ],
    results: 'Successfully partnered with PT Pudak Scientific to establish unit pricing, production timelines, and business models while modeling custom cost-optimized 3D enclosures for prepaid smart meters & DCUs and streaming live energy telemetry via MQTT.',
    category: 'cad'
  },
  {
    id: 'transformer-health-monitoring',
    title: 'Transformer Health Monitoring System (THMS)',
    company: 'Langgeng Cipta Solusi',
    position: 'CAD 3D Designer & Production Quality Engineer',
    duration: '',
    description: 'Coordinated with PT Pudak Scientific for the production of Transformer Health Monitoring System (THMS) protective enclosures, overseeing the full lifecycle from 3D CAD enclosure engineering, unit production pricing and cost estimation, manufacturing timelines, to business model formulation. Engineered protective enclosures in Fusion 360 and SketchUp, optimizing design to reduce production costs for substation environments, and supervised device production workflows and Quality Control (QC) inspections.',
    coverImage: 'https://drive.google.com/file/d/1E7IcahSEpEApDPqM0rjc2if15-nWyTNN/view?usp=drive_link',
    gallery: [
      'https://drive.google.com/file/d/1AASXS9e7-c4J3dECp7UDy68fkdjK14s5/view?usp=drive_link',
      'https://drive.google.com/file/d/1-_KgrzbOiBZ0gNGMEeiIrTMoCIlbWIS5/view?usp=drive_link',
      'https://drive.google.com/file/d/1mOjw3RsogzKJLgUN3CePmt5CqbbvsgTi/view?usp=drive_link',
      'https://drive.google.com/file/d/1yJgnOi-V2WqpGN7y6Ae_eeAXHn4UWIrX/view?usp=drive_link',
      'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=1200&auto=format&fit=crop'
    ],
    videos: [],
    technologies: ['Vendor Coordination (PT Pudak Scientific)', 'Costing & Business Model', 'Production Timeline Scheduling', 'CAD 3D Enclosure', 'Cost Optimization', 'Fusion 360', 'SketchUp', 'Transformer Health Monitoring', 'THMS Hardware', 'Production Supervision & QC'],
    skills: ['3D Enclosure Design', 'Cost Optimization', 'Vendor Coordination (PT Pudak Scientific)', 'Cost Estimation & Pricing', 'Business Model Formulation', 'Production Process Supervision', 'Quality Control & Inspection'],
    responsibilities: [
      'Coordinated with PT Pudak Scientific for the production of THMS protective enclosures, managing 3D CAD design, production costing, fabrication scheduling, and business model formulation.',
      'Engineered 3D protective enclosures tailored for electrical substation environments using Fusion 360 and SketchUp, optimizing design to reduce production costs.',
      'Supervised end-to-end device production workflows and conducted strict Quality Control (QC) inspections.',
      'Performed physical fitment testing and verified environmental durability compliance for critical transformer monitoring hardware.'
    ],
    results: 'Successfully formulated production costing, manufacturing timelines, and business models with PT Pudak Scientific while delivering precision cost-optimized THMS 3D protective enclosures and maintaining rigorous quality oversight.',
    category: 'cad'
  }
];

export const EDUCATION_ITEMS: EducationItem[] = [
  {
    id: 'telkom-university',
    institution: 'Telkom University',
    degree: 'Bachelor of Engineering in Computer Engineering (GPA 3.41)',
    period: 'Aug 2017 — Nov 2022',
    description: 'Specialized in computer engineering, hardware systems, microcontrollers, embedded IoT designs, and advanced digital research within elite laboratory divisions.',
    achievements: [
      'Research assistant in applied research of “The Implementation of Internet of Things, Machine Learning, and Linear Robot on Electricity Monitoring System” with funding IDR 5.750.000.',
      '1st place in Technogine National Competition – Technovation Division as a Research Assistant of Robotic and Embedded System Technology Laboratory.',
      '2nd place in School of Electrical Engineering Festival - National Line Follower Competition as a Research Assistant of Robotic and Embedded System Technology Laboratory.',
      'Teaching assistant of Robotic and Embedded System Technology Laboratory, teaching Digital System Design practicum course with 210 students.',
      'Top 120 Innovillage 2021, Implementation of social project of Hydroelectric Power Plant With Wireless Remote Monitoring and Control System in Tambolosu Village, South Konawe Regency With funding of IDR 17.500.000.'
    ],
    experience: [
      'Research Assistant of Robotic and Embedded System Technology Laboratory',
      'Teaching Assistant of Robotic and Embedded System Technology Laboratory (Digital System Design)',
      'Laboratory Assistant / Assistant in charge of the practicum division'
    ]
  }
];

export const SKILL_ITEMS: SkillItem[] = [
  { name: 'C / C++ Firmware', category: 'embedded' },
  { name: 'Microcontrollers (ARM / ATmega / Espressif)', category: 'embedded' },
  { name: 'IoT Protocols (MQTT / DLMS / Modbus)', category: 'iot' },
  { name: 'PCB Design (EasyEDA / Fusion 360)', category: 'cad' },
  { name: '3D Enclosure Modeling (Fusion 360 / SketchUp)', category: 'cad' },
  { name: 'IoT Infrastructure Monitoring (SHMS / AMI / THMS)', category: 'iot' }
];

export const SOFT_SKILLS: string[] = [
  'Project Engineer',
  'Project Implementation',
  'Project Coordination',
  'Coding Education',
  '3D Modeling',
  'Team Leadership',
  'Problem Solving'
];

export const CERTIFICATIONS: CertificationItem[] = [];
