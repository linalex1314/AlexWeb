import { AppData, Project, SkillCategory } from './types';

export const INITIAL_PROJECTS: Project[] = [
  {
    id: '1',
    name: '司機派遣系統',
    tech: ['ASP.NET (Web Form)', 'MS_SQL'],
    description: '包含售票、薪資計算、調度、排班系統',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '2',
    name: '逆風專案網站系統',
    tech: ['ASP.NET (Web Form)', 'MS_SQL'],
    description: '包含數據統計、人員紀錄、問卷回饋',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '3',
    name: '工讀生排班系統',
    tech: ['ASP.NET (Web Form)', 'MS_SQL'],
    description: '提供人力調度',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '4',
    name: '小吃POS系統',
    tech: ['ASP.NET (WPF)', 'MS_SQL'],
    description: '提供POS點菜系統',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '5',
    name: '訂席系統',
    tech: ['ASP.NET', 'MS_SQL'],
    description: '提供場地、婚宴合約訂購',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '6',
    name: '通訊暨傳播管理系統',
    tech: ['ASP.NET (Web Form)', 'MS_SQL'],
    description: '提供業者傳播通訊執照電台管理',
    roles: ['PG'],
  },
  {
    id: '7',
    name: '考試暨證照管理系統',
    tech: ['ASP.NET (Web Form)', 'MS_SQL'],
    description: '航空人員學科檢定及合格證照系統',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '8',
    name: '臉部平權系統',
    tech: ['ASP.NET (Web Form)', 'AngularJs', 'Access'],
    description: '動態問卷系統、後台資料統計分析',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '9',
    name: '中醫問診紀錄系統',
    tech: ['ASP.NET (Web Form)', 'MS-SQL'],
    description: '病歷紀錄、藥物紀錄',
    roles: ['SA', 'SD', 'PG'],
  },
  {
    id: '10',
    name: '路跑報名平台',
    tech: ['ASP.NET (Web Form)', 'jQuery', 'MS_SQL'],
    description: '提供報名平台的專案',
    roles: ['PG'],
  },
  {
    id: '11',
    name: 'Web POS系統',
    tech: ['ASP.NET (MVC)', 'jQuery', 'MS_SQL'],
    description: '提供門市POS後端物料管理專案',
    roles: ['PG'],
  },
  {
    id: '12',
    name: '賽事報名平台',
    tech: ['ASP.NET (MVC)', 'jQuery', 'MS_SQL'],
    description: '提供報名平台的專案',
    roles: ['SA', 'SD', 'PG'],
  },
];

export const INITIAL_SKILLS: SkillCategory[] = [
  {
    id: 's1',
    title: 'Backend & Frameworks',
    items: ['ASP.NET Web Form', 'ASP.NET MVC', 'WPF', 'C#', '.NET Framework'],
  },
  {
    id: 's2',
    title: 'Database',
    items: ['MS SQL Server', 'Microsoft Access', 'Database Design', 'Stored Procedures'],
  },
  {
    id: 's3',
    title: 'Frontend',
    items: ['jQuery', 'AngularJs', 'HTML/CSS', 'JavaScript'],
  },
  {
    id: 's4',
    title: 'System Analysis',
    items: ['System Analysis (SA)', 'System Design (SD)', 'Programming (PG)', 'Architecture Design'],
  },
];

export const INITIAL_PROFILE = {
  name: '資深全端工程師',
  title: 'Senior .NET Developer / System Analyst',
  summary: '擁有多年大型系統開發經驗，專精於 ASP.NET 生態系與 MS SQL 資料庫架構。擅長從需求分析 (SA)、系統設計 (SD) 到程式開發 (PG) 的完整專案生命週期管理。致力於打造高穩定、高效能的企業級應用系統。',
  email: 'developer@example.com',
  location: 'Taipei, Taiwan',
};

export const INITIAL_DATA: AppData = {
  profile: INITIAL_PROFILE,
  skills: INITIAL_SKILLS,
  projects: INITIAL_PROJECTS,
};