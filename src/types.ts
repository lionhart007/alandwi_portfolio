export interface SubProject {
  title: string;
  location: string;
  description?: string;
  image?: string;
}

export interface Project {
  id: string;
  title: string;
  company: string;
  position: string;
  duration: string;
  description: string;
  coverImage: string;
  gallery: string[];
  videos: string[]; // URLs or placeholders for video files
  technologies: string[];
  skills: string[];
  responsibilities: string[];
  results: string;
  category: string;
  subProjects?: SubProject[];
}

export interface EducationItem {
  id: string;
  institution: string;
  degree: string;
  period: string;
  description: string;
  achievements: string[];
  experience: string[];
}

export interface SkillItem {
  name: string;
  percentage?: number;
  category: 'design' | 'cad' | 'embedded' | 'iot' | 'hardware';
}

export interface CertificationItem {
  id: string;
  thumbnail?: string; // Icon or thumbnail representing the certificate
  title: string;
  issuer: string;
  date: string;
  description: string;
  credentialId: string;
  verificationUrl: string;
}

export interface WorkExperience {
  id: string;
  company: string;
  position: string;
  period: string;
  location: string;
  description: string[];
}
