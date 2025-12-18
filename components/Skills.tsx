import React from 'react';
import { useContent } from '../context/ContentContext';
import { Database, Layout, Code2, Server, Wrench } from 'lucide-react';

const icons: Record<string, React.ReactNode> = {
  s1: <Server className="w-6 h-6" />,
  s2: <Database className="w-6 h-6" />,
  s3: <Layout className="w-6 h-6" />,
  s4: <Code2 className="w-6 h-6" />,
};

export const Skills: React.FC = () => {
  const { data } = useContent();

  return (
    <section id="skills" className="min-h-screen pt-24 pb-16 bg-gradient-to-br from-slate-950 via-zinc-950 to-neutral-950 relative">
      {/* Background Accent */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-lime-500/20 rounded-xl border border-lime-400/30">
                <Wrench className="w-8 h-8 text-lime-400" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-white">技能樹</h2>
                <p className="text-lime-200/70 mt-1">累積多年的技術軍火庫，隨時準備上陣</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.skills.map((category) => (
            <div key={category.id} className="bg-zinc-900/60 backdrop-blur border border-lime-500/20 rounded-xl p-6 hover:bg-zinc-800/70 hover:border-lime-400/40 transition-all duration-300 group shadow-lg hover:shadow-lime-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-lime-900/40 rounded-lg text-lime-400 group-hover:text-lime-300 transition-colors border border-lime-500/20">
                  {icons[category.id] || <Code2 className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-lg text-white">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.items?.map((item, idx) => (
                  <div key={idx} className="relative group/item">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-lime-400 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-slate-200 text-sm font-medium group-hover/item:text-lime-300 transition-colors">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};