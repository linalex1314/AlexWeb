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

export type ToolCategory = '好用工具' | '小遊戲';

export interface Tool {
  id: string;
  title: string;
  url: string;
  description: string;
  category: ToolCategory;
}

export interface AppData {
  profile: Profile;
  skills: SkillCategory[];
  projects: Project[];
  tools: Tool[];
}

export interface ContentContextType {
  data: AppData;
  currentPage: 'home' | 'about' | 'skills' | 'projects' | 'tools' | 'contact' | 'cms';
  switchPage: (page: 'home' | 'about' | 'skills' | 'projects' | 'tools' | 'contact' | 'cms') => void;
  updateProfile: (field: keyof Profile, value: string) => void;
  updateProject: (id: string, field: keyof Project, value: any) => void;
  addProject: () => void;
  deleteProject: (id: string) => void;
  updateSkillCategory: (id: string, title: string, items: string[]) => void;
  addSkillCategory: () => void;
  deleteSkillCategory: (id: string) => void;
  updateTool: (id: string, field: keyof Tool, value: any) => void;
  addTool: () => void;
  deleteTool: (id: string) => void;
  resetData: () => void;
}