import React from 'react';
import { useContent } from '../context/ContentContext';
import { Hammer, Wrench, ExternalLink, Gamepad2 } from 'lucide-react';

export const Tools: React.FC = () => {
  const { data } = useContent();

  // 依分類分組工具
  const usefulTools = data.tools.filter((tool) => tool.category === '好用工具');
  const games = data.tools.filter((tool) => tool.category === '小遊戲');

  const categoryConfig = [
    {
      id: 'useful',
      title: '好用工具',
      icon: Wrench,
      tools: usefulTools,
      color: 'from-blue-500 to-cyan-500',
      borderColor: 'border-blue-500/30',
      hoverBorder: 'hover:border-blue-500/60',
    },
    {
      id: 'games',
      title: '小遊戲',
      icon: Gamepad2,
      tools: games,
      color: 'from-pink-500 to-rose-500',
      borderColor: 'border-pink-500/30',
      hoverBorder: 'hover:border-pink-500/60',
    },
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
            精選好用工具與有趣小遊戲
          </p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {categoryConfig.map((category) => {
            const IconComponent = category.icon;
            if (category.tools.length === 0) return null;
            
            return (
              <div key={category.id}>
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color}`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-white">
                    {category.title}
                  </h3>
                  <span className="text-slate-500 text-sm">({category.tools.length})</span>
                </div>

                {/* Tool Cards Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {category.tools.map((tool) => (
                    <a
                      key={tool.id}
                      href={tool.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group block bg-slate-800/50 backdrop-blur-sm border ${category.borderColor} rounded-xl p-5 ${category.hoverBorder} transition-all duration-300 hover:shadow-xl hover:shadow-slate-900/50 hover:-translate-y-1`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h4 className="text-lg font-bold text-white group-hover:text-amber-400 transition-colors">
                          {tool.title}
                        </h4>
                        <ExternalLink className="w-4 h-4 text-slate-500 group-hover:text-amber-400 transition-colors flex-shrink-0 mt-1" />
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed whitespace-pre-line">
                        {tool.description}
                      </p>
                    </a>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {data.tools.length === 0 && (
          <div className="text-center py-16">
            <Wrench className="w-16 h-16 text-slate-600 mx-auto mb-4" />
            <p className="text-slate-500 text-lg">尚無工具資料，請至後台新增</p>
          </div>
        )}

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="inline-block bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 rounded-2xl p-8">
            <Wrench className="w-12 h-12 text-amber-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-white mb-2">持續更新中</h3>
            <p className="text-slate-400 max-w-md">
              收集各種實用工具與有趣小遊戲，歡迎常來逛逛
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
