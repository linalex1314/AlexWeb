export interface Project {
  id: string;
  name: string;
  tech: string[];
  description: string;
  roles: string[]; // e.g., SA, SD, PG
}

export interface SkillCategory {
  id: string;
  title: string;
  items: string[];
}

export interface Profile {
  name: string;
  title: string;
  summary: string;
  email: string;
  location: string;
}

export interface AppData {
  profile: Profile;
  skills: SkillCategory[];
  projects: Project[];
}

export interface ContentContextType {
  data: AppData;
  currentPage: 'home' | 'cms';
  switchPage: (page: 'home' | 'cms') => void;
  updateProfile: (field: keyof Profile, value: string) => void;
  updateProject: (id: string, field: keyof Project, value: any) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
  updateSkillCategory: (id: string, title: string, items: string[]) => void;
  addSkillCategory: () => void;
  deleteSkillCategory: (id: string) => void;
  resetData: () => void;
}