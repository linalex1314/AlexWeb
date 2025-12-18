import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AppData, ContentContextType, Profile, Project, SkillCategory } from '../types';
import { INITIAL_DATA } from '../constants';

const ContentContext = createContext<ContentContextType | undefined>(undefined);

type PageType = 'home' | 'about' | 'skills' | 'projects' | 'tools' | 'contact' | 'cms';

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppData>(() => {
    const saved = localStorage.getItem('portfolio_data_v1');
    return saved ? JSON.parse(saved) : INITIAL_DATA;
  });

  const [currentPage, setCurrentPage] = useState<PageType>('home');

  useEffect(() => {
    localStorage.setItem('portfolio_data_v1', JSON.stringify(data));
  }, [data]);

  const switchPage = (page: PageType) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const updateProfile = (field: keyof Profile, value: string) => {
    setData((prev) => ({
      ...prev,
      profile: { ...prev.profile, [field]: value },
    }));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    setData((prev) => ({
      ...prev,
      projects: prev.projects.map((p) => (p.id === id ? { ...p, [field]: value } : p)),
    }));
  };

  const addProject = () => {
    const newProject: Project = {
        id: Date.now().toString(),
        name: '新專案名稱',
        tech: ['New Tech'],
        description: '請輸入專案描述...',
        roles: ['Role']
    };
    setData(prev => ({
        ...prev,
        projects: [newProject, ...prev.projects]
    }));
  };

  const deleteProject = (id: string) => {
      // Confirmation moved to UI component
      setData(prev => ({
          ...prev,
          projects: prev.projects.filter(p => p.id !== id)
      }));
  };

  const updateSkillCategory = (id: string, title: string, items: string[]) => {
    setData((prev) => ({
      ...prev,
      skills: prev.skills.map((s) => (s.id === id ? { ...s, title, items } : s)),
    }));
  };

  const addSkillCategory = () => {
      const newSkill: SkillCategory = {
          id: Date.now().toString(),
          title: '新技能分類',
          items: ['Item 1', 'Item 2']
      };
      setData(prev => ({
          ...prev,
          skills: [...prev.skills, newSkill]
      }));
  };

  const deleteSkillCategory = (id: string) => {
    // Confirmation moved to UI component
    setData(prev => ({
        ...prev,
        skills: prev.skills.filter(s => s.id !== id)
    }));
  };

  const resetData = () => {
    // Confirmation moved to UI component
    setData(INITIAL_DATA);
  };

  return (
    <ContentContext.Provider
      value={{
        data,
        currentPage,
        switchPage,
        updateProfile,
        updateProject,
        addProject,
        deleteProject,
        updateSkillCategory,
        addSkillCategory,
        deleteSkillCategory,
        resetData
      }}
    >
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};