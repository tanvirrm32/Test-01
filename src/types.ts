export interface PortfolioItem {
  id: string;
  title: string;
  description: string;
  category: "Branding" | "Packaging" | "Social Media" | "Print Design" | "Website UI" | "Advertising";
  imageUrl: string;
  client: string;
  challenge: string;
  process: string;
  mockupGallery: string[];
  feedback: string;
  year: string;
  tags: string[];
  industry: string;
}

export interface Service {
  id: string;
  title: string;
  description: string;
  iconName: string;
  price: string;
  features: string[];
  faq: { question: string; answer: string }[];
}

export interface BlogPost {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  imageUrl: string;
  readTime: string;
  author: string;
  date: string;
  likes: number;
  commentsCount: number;
  comments?: { author: string; content: string; date: string }[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  feedback: string;
  rating: number;
  imageUrl: string;
  videoUrl?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  skills: { name: string; percentage: number }[];
  bio: string;
  socials: { twitter?: string; linkedin?: string; behance?: string; instagram?: string };
}

export interface Career {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-Time" | "Part-Time" | "Contract" | "Remote";
  salary: string;
  description: string;
  requirements: string[];
}

export interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  status: "unread" | "read" | "replied";
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  service: string;
  dateTime: string;
  message?: string;
  status: "pending" | "confirmed" | "declined";
  createdAt: string;
}

export interface SiteSettings {
  id: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutText: string;
  personalStoryName: string;
  personalStoryTitle: string;
  personalStoryContent: string;
  creativePhilosophy: string;
  activeAwardsCount: number;
  completedProjectsCount: number;
  happyClientsCount: number;
  yearsExperience: number;
}
