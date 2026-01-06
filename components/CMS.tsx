import React, { useState } from 'react';
import { useContent } from '../context/ContentContext';
import { RefreshCw, User, Briefcase, Wrench, Plus, Trash2, X, Check, AlertTriangle, Hammer } from 'lucide-react';

export const CMS: React.FC = () => {
  const { 
      data, 
      updateProfile, 
      updateProject, 
      addProject, 
      deleteProject,
      updateSkillCategory, 
      addSkillCategory,
      deleteSkillCategory,
      updateTool,
      addTool,
      deleteTool,
      resetData 
  } = useContent();

  // State to track which item is currently asking for delete confirmation
  // Format: { type: 'project' | 'skill' | 'tool' | 'reset', id?: string }
  const [confirmState, setConfirmState] = useState<{type: 'project' | 'skill' | 'tool' | 'reset', id?: string} | null>(null);

  // Helper to delete a specific line item from the tech/role arrays
  const removeArrayItem = (
      currentItems: string[], 
      indexToRemove: number, 
      updateFn: (newItems: string[]) => void
  ) => {
      const newItems = currentItems.filter((_, idx) => idx !== indexToRemove);
      updateFn(newItems);
  };

  const handleResetRequest = () => {
      if (confirmState?.type === 'reset') {
          resetData();
          setConfirmState(null);
      } else {
          setConfirmState({ type: 'reset' });
      }
  };

  const handleProjectDelete = (id: string) => {
      if (confirmState?.type === 'project' && confirmState.id === id) {
          deleteProject(id);
          setConfirmState(null);
      } else {
          setConfirmState({ type: 'project', id });
      }
  };

  const handleSkillDelete = (id: string) => {
      if (confirmState?.type === 'skill' && confirmState.id === id) {
          deleteSkillCategory(id);
          setConfirmState(null);
      } else {
          setConfirmState({ type: 'skill', id });
      }
  };

  const handleToolDelete = (id: string) => {
      if (confirmState?.type === 'tool' && confirmState.id === id) {
          deleteTool(id);
          setConfirmState(null);
      } else {
          setConfirmState({ type: 'tool', id });
      }
  };

  const cancelAction = () => {
      setConfirmState(null);
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-900 text-slate-200">
      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
            <h1 className="text-3xl font-bold text-white">網站內容管理系統</h1>
            <div className="flex gap-3 items-center">
                {confirmState?.type === 'reset' ? (
                    <div className="flex items-center gap-2 animate-pulse">
                        <span className="text-red-400 font-bold text-sm">確定重置?</span>
                        <button 
                            onClick={handleResetRequest}
                            className="flex items-center gap-1 px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-xs font-bold shadow-lg"
                        >
                            <Check className="w-4 h-4" /> 確認
                        </button>
                        <button 
                            onClick={cancelAction}
                            className="flex items-center gap-1 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors text-xs"
                        >
                            <X className="w-4 h-4" /> 取消
                        </button>
                    </div>
                ) : (
                    <button 
                        type="button"
                        onClick={handleResetRequest}
                        className="flex items-center gap-2 px-4 py-2 text-red-400 hover:text-white hover:bg-red-500/20 border border-red-500/30 rounded-lg transition-colors text-sm"
                    >
                        <RefreshCw className="w-4 h-4" />
                        重置預設資料
                    </button>
                )}
            </div>
        </div>

        {/* 1. Profile Section */}
        <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg mb-8">
            <div className="flex items-center gap-3 mb-6 border-b border-slate-700 pb-4">
                <User className="w-6 h-6 text-blue-400" />
                <h2 className="text-xl font-bold text-white">基本資料設定 (Profile)</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">顯示名稱</label>
                    <input 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        value={data.profile.name}
                        onChange={(e) => updateProfile('name', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">職稱</label>
                    <input 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        value={data.profile.title}
                        onChange={(e) => updateProfile('title', e.target.value)}
                    />
                </div>
                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-400 mb-1">個人簡介</label>
                    <textarea 
                        rows={4}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        value={data.profile.summary}
                        onChange={(e) => updateProfile('summary', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">Email</label>
                    <input 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        value={data.profile.email}
                        onChange={(e) => updateProfile('email', e.target.value)}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400 mb-1">地點</label>
                    <input 
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white focus:border-blue-500 outline-none"
                        value={data.profile.location}
                        onChange={(e) => updateProfile('location', e.target.value)}
                    />
                </div>
            </div>
        </section>

        {/* 2. Skills Section */}
        <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                    <Wrench className="w-6 h-6 text-green-400" />
                    <h2 className="text-xl font-bold text-white">技能工具箱 (Skills)</h2>
                </div>
                <button 
                    type="button"
                    onClick={addSkillCategory}
                    className="flex items-center gap-2 px-3 py-1.5 bg-green-600 hover:bg-green-500 text-white rounded text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    新增分類
                </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {data.skills.map((skill) => (
                    <div key={skill.id} className="relative bg-slate-900 p-5 rounded-lg border border-slate-700 group">
                         {/* Category Delete Logic */}
                         <div className="absolute top-3 right-3 z-10">
                            {confirmState?.type === 'skill' && confirmState.id === skill.id ? (
                                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg border border-red-500/50 shadow-xl">
                                    <button 
                                        onClick={() => handleSkillDelete(skill.id)}
                                        className="bg-red-600 text-white p-1.5 rounded hover:bg-red-700"
                                        title="確認刪除"
                                    >
                                        <Check className="w-4 h-4" />
                                    </button>
                                    <button 
                                        onClick={cancelAction}
                                        className="bg-slate-600 text-white p-1.5 rounded hover:bg-slate-500"
                                        title="取消"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => handleSkillDelete(skill.id)}
                                    className="p-2 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-full transition-colors cursor-pointer shadow-sm border border-slate-700"
                                    title="刪除此分類"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            )}
                         </div>

                         <div className="mr-10 mb-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">分類名稱</label>
                            <input 
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-green-500 outline-none"
                                value={skill.title}
                                onChange={(e) => updateSkillCategory(skill.id, e.target.value, skill.items)}
                            />
                        </div>
                        
                        <div className="space-y-2">
                            <div className="flex justify-between items-center">
                                <label className="block text-xs font-bold text-slate-500 uppercase">技能細項</label>
                                <button 
                                    type="button"
                                    onClick={() => updateSkillCategory(skill.id, skill.title, [...skill.items, "New Skill"])}
                                    className="text-xs text-green-400 hover:text-green-300 flex items-center gap-1"
                                >
                                    <Plus className="w-3 h-3"/> 增加
                                </button>
                            </div>
                            {skill.items.map((item, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input 
                                        className="flex-1 bg-slate-800 border border-slate-700 rounded p-1.5 text-sm text-slate-300 focus:border-green-500 outline-none"
                                        value={item}
                                        onChange={(e) => {
                                            const newItems = [...skill.items];
                                            newItems[idx] = e.target.value;
                                            updateSkillCategory(skill.id, skill.title, newItems);
                                        }}
                                    />
                                    {/* Item Delete Button */}
                                    <button 
                                        type="button"
                                        onClick={() => removeArrayItem(skill.items, idx, (newItems) => updateSkillCategory(skill.id, skill.title, newItems))}
                                        className="p-1.5 text-slate-500 hover:text-red-400 hover:bg-slate-800 rounded transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 3. Projects Section */}
        <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                    <Briefcase className="w-6 h-6 text-purple-400" />
                    <h2 className="text-xl font-bold text-white">專案列表 (Projects)</h2>
                </div>
                <button 
                    type="button"
                    onClick={addProject}
                    className="flex items-center gap-2 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    新增專案
                </button>
            </div>
            
            <div className="space-y-6">
                {data.projects.map((project) => (
                    <div key={project.id} className="relative bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-purple-500/50 transition-colors">
                        {/* Project Delete Logic - Inline Confirmation */}
                        <div className="absolute top-4 right-4 z-10">
                            {confirmState?.type === 'project' && confirmState.id === project.id ? (
                                <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-red-500/50 shadow-xl animate-in fade-in duration-200">
                                    <span className="text-red-400 text-xs font-bold pl-1 hidden sm:inline">確認刪除?</span>
                                    <button 
                                        onClick={() => handleProjectDelete(project.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"
                                    >
                                        <Check className="w-3 h-3" /> 是
                                    </button>
                                    <button 
                                        onClick={cancelAction}
                                        className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"
                                    >
                                        <X className="w-3 h-3" /> 否
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => handleProjectDelete(project.id)}
                                    className="p-2 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700 shadow-sm"
                                    title="刪除此專案"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4 pr-12">
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">專案名稱</label>
                                <input 
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-purple-500 outline-none"
                                    value={project.name}
                                    onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                                />
                             </div>
                             <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">使用技術 (逗號分隔)</label>
                                <input 
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-300 focus:border-purple-500 outline-none"
                                    value={project.tech.join(', ')}
                                    onChange={(e) => updateProject(project.id, 'tech', e.target.value.split(',').map(t => t.trim()))}
                                />
                             </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">任務描述</label>
                            <textarea 
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-300 focus:border-purple-500 outline-none"
                                rows={2}
                                value={project.description}
                                onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">擔任角色 (逗號分隔)</label>
                            <input 
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-300 focus:border-purple-500 outline-none"
                                value={project.roles.join(', ')}
                                onChange={(e) => updateProject(project.id, 'roles', e.target.value.split(',').map(r => r.trim()))}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>

        {/* 4. Tools Section */}
        <section className="bg-slate-800 rounded-xl p-6 border border-slate-700 shadow-lg mb-8">
            <div className="flex items-center justify-between mb-6 border-b border-slate-700 pb-4">
                <div className="flex items-center gap-3">
                    <Hammer className="w-6 h-6 text-amber-400" />
                    <h2 className="text-xl font-bold text-white">萬能工具 (Tools)</h2>
                </div>
                <button 
                    type="button"
                    onClick={addTool}
                    className="flex items-center gap-2 px-3 py-1.5 bg-amber-600 hover:bg-amber-500 text-white rounded text-sm transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    新增工具
                </button>
            </div>
            
            <div className="space-y-6">
                {data.tools.map((tool) => (
                    <div key={tool.id} className="relative bg-slate-900 p-6 rounded-lg border border-slate-700 hover:border-amber-500/50 transition-colors">
                        {/* Tool Delete Logic */}
                        <div className="absolute top-4 right-4 z-10">
                            {confirmState?.type === 'tool' && confirmState.id === tool.id ? (
                                <div className="flex items-center gap-2 bg-slate-800 p-1.5 rounded-lg border border-red-500/50 shadow-xl animate-in fade-in duration-200">
                                    <span className="text-red-400 text-xs font-bold pl-1 hidden sm:inline">確認刪除?</span>
                                    <button 
                                        onClick={() => handleToolDelete(tool.id)}
                                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"
                                    >
                                        <Check className="w-3 h-3" /> 是
                                    </button>
                                    <button 
                                        onClick={cancelAction}
                                        className="bg-slate-600 hover:bg-slate-500 text-white px-3 py-1.5 rounded text-xs font-bold flex items-center gap-1"
                                    >
                                        <X className="w-3 h-3" /> 否
                                    </button>
                                </div>
                            ) : (
                                <button 
                                    type="button"
                                    onClick={() => handleToolDelete(tool.id)}
                                    className="p-2 bg-slate-800 text-slate-400 hover:text-red-400 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer border border-slate-700 shadow-sm"
                                    title="刪除此工具"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            )}
                        </div>

                        <div className="grid md:grid-cols-2 gap-4 mb-4 pr-12">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">標題</label>
                                <input 
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-amber-500 outline-none"
                                    value={tool.title}
                                    onChange={(e) => updateTool(tool.id, 'title', e.target.value)}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-1">分類</label>
                                <select 
                                    className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-white focus:border-amber-500 outline-none"
                                    value={tool.category}
                                    onChange={(e) => updateTool(tool.id, 'category', e.target.value)}
                                >
                                    <option value="好用工具">好用工具</option>
                                    <option value="小遊戲">小遊戲</option>
                                </select>
                            </div>
                        </div>

                        <div className="mb-4">
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">超連結</label>
                            <input 
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-300 focus:border-amber-500 outline-none"
                                value={tool.url}
                                onChange={(e) => updateTool(tool.id, 'url', e.target.value)}
                                placeholder="https://..."
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-slate-500 uppercase mb-1">說明</label>
                            <textarea 
                                className="w-full bg-slate-800 border border-slate-600 rounded p-2 text-slate-300 focus:border-amber-500 outline-none"
                                rows={2}
                                value={tool.description}
                                onChange={(e) => updateTool(tool.id, 'description', e.target.value)}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>

      </div>
    </div>
  );
};