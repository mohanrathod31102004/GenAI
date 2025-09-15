export interface GeneratedImage {
  id: string;
  dataUrl: string;
}

export interface AspectRatioOption {
  value: string;
  label: string;
}

export interface Experience {
  id: string;
  jobTitle: string;
  company: string;
  startDate: string;
  endDate:string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  gradDate: string;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}