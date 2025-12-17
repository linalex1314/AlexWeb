import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-4">
            <img src="/logo.png" alt="Fidogood" className="w-10 h-10 object-contain" />
            <span className="text-xl font-bold text-slate-800">Fidogood 飛朵資訊</span>
        </div>
        <p className="text-slate-600 text-sm">
          © {new Date().getFullYear()} Fidogood. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs mt-2">
            Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};