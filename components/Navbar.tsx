import React, { useState, useRef, useEffect } from 'react';
import { useContent } from '../context/ContentContext';
import { Terminal, Settings, ArrowLeft, Menu, X, KeyRound, Check, Lock, Eye, EyeOff, User, Wrench, Trophy, MessageCircle } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentPage, switchPage } = useContent();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  // Login State
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input when login mode is toggled
  useEffect(() => {
    if (isLoginMode && inputRef.current) {
        inputRef.current.focus();
    }
    if (!isLoginMode) {
        setPassword('');
        setShowPassword(false);
        setIsError(false);
    }
  }, [isLoginMode]);

  const navClass = "fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-md border-b border-amber-600/30 shadow-md transition-all duration-300";

  const navItems = [
    { label: '自我介紹', id: 'about', icon: User },
    { label: '萬能工具箱', id: 'skills', icon: Wrench },
    { label: '專案戰績', id: 'projects', icon: Trophy },
    { label: '和我聯絡', id: 'contact', icon: MessageCircle },
  ];

  const handleScroll = (id: string) => {
      setIsMenuOpen(false);
      const element = document.getElementById(id);
      if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
      }
  };

  const handleLoginSubmit = (e?: React.FormEvent) => {
      e?.preventDefault();
      const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD || '';
      if (password === adminPassword) {
          switchPage('cms');
          setIsMenuOpen(false);
          setIsLoginMode(false);
      } else {
          setIsError(true);
          setTimeout(() => setIsError(false), 1000);
      }
  };

  const handleExitCMS = () => {
      switchPage('home');
      setIsMenuOpen(false);
  };

  return (
    <nav className={navClass}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex justify-between items-center">
            {/* Logo Area */}
            <div 
                className="flex items-center gap-3 group cursor-pointer" 
                onClick={() => switchPage('home')}
            >
                <img src="/logo.png" alt="Fidogood" className="w-10 h-10 object-contain" />
                <span className="text-2xl font-bold text-white tracking-wider">
                    Fidogood <span className="text-sm font-normal text-amber-500 ml-1 block sm:inline">{currentPage === 'cms' ? 'CMS Mode' : '飛朵資訊'}</span>
                </span>
            </div>
            
            {/* Desktop Navigation */}
            {currentPage === 'home' && !isLoginMode && (
                <div className="hidden md:flex items-center space-x-1">
                {navItems.map((item) => {
                    const IconComponent = item.icon;
                    return (
                    <button
                    key={item.label}
                    onClick={() => handleScroll(item.id)}
                    className="flex items-center gap-2 px-4 py-2 text-lg font-bold text-slate-200 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-all duration-200"
                    >
                    <IconComponent className="w-4 h-4" />
                    {item.label}
                    </button>
                    );
                })}
                </div>
            )}

            {/* Desktop Action Buttons / Login Form */}
            <div className="hidden md:flex items-center gap-3">
            {currentPage === 'home' ? (
                isLoginMode ? (
                    <form onSubmit={handleLoginSubmit} className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-300 shadow-lg ring-1 ring-slate-100">
                        <Lock className="w-4 h-4 text-slate-400 ml-1" />
                        <div className="relative">
                            <input 
                                ref={inputRef}
                                type={showPassword ? "text" : "password"}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="輸入密碼"
                                className={`text-sm py-1 pl-2 pr-8 outline-none w-48 bg-white text-slate-900 placeholder:text-slate-400 rounded-md ${isError ? 'text-red-600' : ''}`}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-1 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5"
                            >
                                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                            </button>
                        </div>
                        <div className="h-4 w-px bg-slate-200 mx-1"></div>
                        <button 
                            type="submit"
                            className="p-1.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md transition-colors"
                        >
                            <Check className="w-4 h-4" />
                        </button>
                        <button 
                            type="button"
                            onClick={() => setIsLoginMode(false)}
                            className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    </form>
                ) : (
                    <button
                        onClick={() => setIsLoginMode(true)}
                        className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-base font-semibold transition-colors shadow-md hover:shadow-lg"
                    >
                        <Settings className="w-4 h-4" />
                        <span>進入後台</span>
                    </button>
                )
            ) : (
                <button
                    onClick={handleExitCMS}
                    className="flex items-center gap-2 px-5 py-2.5 bg-amber-600 hover:bg-amber-700 text-white rounded-md text-base font-semibold transition-colors shadow-md"
                >
                    <ArrowLeft className="w-4 h-4" />
                    <span>返回前台</span>
                </button>
            )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
                <button 
                    onClick={() => {
                        setIsMenuOpen(!isMenuOpen);
                        setIsLoginMode(false); 
                    }}
                    className="p-2 text-slate-200 hover:text-amber-400 focus:outline-none"
                >
                    {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                </button>
            </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
          <div className="md:hidden bg-slate-900 border-t border-amber-600/30 absolute w-full shadow-xl">
              <div className="px-4 pt-2 pb-6 space-y-2">
                  {currentPage === 'home' && navItems.map((item) => {
                      const IconComponent = item.icon;
                      return (
                      <button
                          key={item.label}
                          onClick={() => handleScroll(item.id)}
                          className="flex items-center gap-3 w-full text-left px-4 py-3 text-xl font-bold text-slate-200 hover:text-amber-400 hover:bg-slate-800 rounded-lg"
                      >
                          <IconComponent className="w-5 h-5" />
                          {item.label}
                      </button>
                      );
                  })}
                  
                  <div className="pt-4 mt-4 border-t border-slate-700">
                    {currentPage === 'home' ? (
                        isLoginMode ? (
                             <form onSubmit={handleLoginSubmit} className="flex flex-col gap-3 p-3 bg-slate-800 rounded-xl border border-slate-700 shadow-inner">
                                <div className="text-sm font-bold text-slate-300 mb-1 ml-1">請輸入管理密碼：</div>
                                <div className="flex items-center gap-2 bg-white px-3 py-2.5 rounded-lg border border-slate-300 shadow-sm focus-within:ring-2 focus-within:ring-amber-500/20">
                                    <KeyRound className="w-5 h-5 text-slate-400 flex-shrink-0" />
                                    <div className="flex-1 relative">
                                        <input 
                                            ref={inputRef}
                                            type={showPassword ? "text" : "password"} 
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            placeholder="Password"
                                            className={`w-full outline-none text-slate-900 bg-white placeholder:text-slate-400 pr-8 ${isError ? 'text-red-600' : ''}`}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-0 top-1/2 -translate-y-1/2 text-slate-400 p-1"
                                        >
                                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>
                                <div className="flex gap-2">
                                    <button 
                                        type="submit"
                                        className="flex-1 py-2.5 bg-amber-600 text-white rounded-lg font-medium flex justify-center items-center gap-2 shadow-sm active:scale-[0.98] transition-transform"
                                    >
                                        <Check className="w-4 h-4" /> 確認
                                    </button>
                                    <button 
                                        type="button"
                                        onClick={() => setIsLoginMode(false)}
                                        className="py-2.5 px-5 bg-white border border-slate-300 text-slate-600 rounded-lg font-medium shadow-sm active:scale-[0.98] transition-transform"
                                    >
                                        取消
                                    </button>
                                </div>
                                {isError && <p className="text-xs text-red-500 text-center font-bold bg-red-50 py-1 rounded">密碼錯誤，請重試</p>}
                             </form>
                        ) : (
                            <button
                                onClick={() => setIsLoginMode(true)}
                                className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-base font-semibold shadow-md active:scale-[0.98] transition-transform"
                            >
                                <Settings className="w-4 h-4" />
                                進入後台
                            </button>
                        )
                    ) : (
                        <button
                            onClick={handleExitCMS}
                            className="flex w-full items-center justify-center gap-2 px-4 py-3 bg-amber-600 hover:bg-amber-700 text-white rounded-lg text-base font-semibold shadow-md active:scale-[0.98] transition-transform"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            返回前台
                        </button>
                    )}
                  </div>
              </div>
          </div>
      )}
    </nav>
  );
};