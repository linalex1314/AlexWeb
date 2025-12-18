import React from 'react';
import { useContent } from '../context/ContentContext';
import { Hammer, Wrench, Zap, Settings, Code, Database, Cloud, Shield } from 'lucide-react';

export const Tools: React.FC = () => {
  const { data } = useContent();

  const toolCategories = [
    {
      id: '1',
      title: '開發工具',
      icon: Code,
      items: ['VS Code', 'Git', 'Docker', 'Postman', 'npm/yarn'],
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2', 
      title: '資料庫工具',
      icon: Database,
      items: ['MySQL Workbench', 'pgAdmin', 'MongoDB Compass', 'Redis Desktop Manager'],
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      title: '雲端服務',
      icon: Cloud,
      items: ['AWS', 'Azure', 'GCP', 'Vercel', 'Netlify'],
      color: 'from-purple-500 to-violet-500'
    },
    {
      id: '4',
      title: '協作工具',
      icon: Settings,
      items: ['Jira', 'Confluence', 'Slack', 'Teams', 'Notion'],
      color: 'from-orange-500 to-amber-500'
    },
    {
      id: '5',
      title: '測試工具',
      icon: Shield,
      items: ['Jest', 'Cypress', 'Selenium', 'JMeter', 'SonarQube'],
      color: 'from-red-500 to-rose-500'
    },
    {
      id: '6',
      title: 'DevOps',
      icon: Zap,
      items: ['Jenkins', 'GitHub Actions', 'GitLab CI', 'Kubernetes', 'Terraform'],
      color: 'from-teal-500 to-cyan-500'
    }
  ];

  return (
    <section className="min-h-screen bg-gradient-to-br from-slate-800 via-slate-900 to-zinc-900 pt-24 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-4">
            <Hammer className="w-10 h-10 text-amber-400" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              萬能工具
            </h2>
          </div>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            精通的開發工具與平台，幫助高效完成各類專案
          </p>
        </div>

        {/* Tool Categories Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {toolCategories.map((category) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={category.id}
                className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-2xl p-6 hover:border-slate-600 transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 group"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-amber-400 transition-colors">
                    {category.title}
                  </h3>
                </div>

                {/* Tool Items */}
                <div className="flex flex-wrap gap-2">
                  {category.items.map((item, index) => (
                    <span 
                      key={index}
                      className="px-3 py-1.5 bg-slate-700/50 text-slate-300 rounded-lg text-sm font-medium hover:bg-slate-600/50 hover:text-white transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <Wrench className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">持續學習中</h3>
            <p className="text-slate-400 max-w-md">
              技術日新月異，我持續關注最新的工具與技術，不斷提升開發效率與品質
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
