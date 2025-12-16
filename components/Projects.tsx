import React from 'react';
import { useContent } from '../context/ContentContext';
import { Briefcase, Cpu, Users, Trophy } from 'lucide-react';

export const Projects: React.FC = () => {
  const { data } = useContent();

  return (
    <section id="projects" className="py-24 bg-slate-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-purple-500/10 rounded-xl border border-purple-500/20">
                <Trophy className="w-8 h-8 text-purple-400" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-white">專案戰績</h2>
                <p className="text-slate-400 mt-1">在各個領域攻城略地的實戰紀錄</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {data.projects.map((project) => (
            <div key={project.id} className="group bg-slate-900 rounded-xl overflow-hidden border border-slate-800 hover:border-purple-500/30 shadow-lg hover:shadow-purple-900/10 transition-all duration-300 flex flex-col">
              
              {/* Header */}
              <div className="p-6 border-b border-slate-800 bg-gradient-to-br from-slate-900 to-slate-800 group-hover:from-slate-800 group-hover:to-slate-900 transition-colors">
                <div className="flex items-start justify-between mb-4">
                    <div className="p-2 bg-slate-950 rounded-lg text-purple-400 border border-slate-800">
                        <Briefcase className="w-5 h-5"/>
                    </div>
                </div>
                <h3 className="text-xl font-bold text-white mb-1 block leading-tight group-hover:text-purple-300 transition-colors">
                    {project.name || '未命名專案'}
                </h3>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col space-y-5">
                
                {/* Tech Stack */}
                <div>
                   <div className="flex items-center gap-2 text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
                        <Cpu className="w-3 h-3" />
                        <span>裝備技能</span>
                   </div>
                   <div className="flex flex-wrap gap-2">
                        {project.tech?.map((t, i) => (
                            <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-800 text-purple-200 border border-slate-700/50">
                                {t}
                            </span>
                        ))}
                   </div>
                </div>

                {/* Description */}
                <div className="flex-1">
                     <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">任務內容</div>
                     <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-wrap">
                        {project.description}
                     </p>
                </div>

                {/* Roles */}
                <div className="pt-4 mt-auto border-t border-slate-800">
                    <div className="flex items-center gap-2 mb-2">
                         <Users className="w-3 h-3 text-slate-500" />
                         <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">擔任角色</span>
                    </div>
                    <div className="flex gap-2">
                        {project.roles?.map((r, i) => (
                            <span key={i} className="text-xs text-slate-400 font-mono bg-slate-950 px-2 py-1 rounded border border-slate-800">
                                {r}
                            </span>
                        ))}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};