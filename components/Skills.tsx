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
    <section id="skills" className="py-24 bg-slate-900 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-12">
            <div className="p-3 bg-blue-500/10 rounded-xl border border-blue-500/20">
                <Wrench className="w-8 h-8 text-blue-400" />
            </div>
            <div>
                <h2 className="text-3xl font-bold text-white">萬能工具箱</h2>
                <p className="text-slate-400 mt-1">累積多年的技術軍火庫，隨時準備上陣</p>
            </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.skills.map((category) => (
            <div key={category.id} className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 hover:bg-slate-800 hover:border-blue-500/50 transition-all duration-300 group shadow-lg hover:shadow-blue-500/10">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-blue-900/20 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors border border-blue-500/10">
                  {icons[category.id] || <Code2 className="w-6 h-6" />}
                </div>
                <h3 className="font-bold text-lg text-slate-100">{category.title}</h3>
              </div>
              
              <div className="space-y-3">
                {category.items?.map((item, idx) => (
                  <div key={idx} className="relative group/item">
                    <div className="flex items-center gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-blue-500 group-hover/item:scale-125 transition-transform"></div>
                        <span className="text-slate-300 text-sm font-medium group-hover/item:text-white transition-colors">{item}</span>
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