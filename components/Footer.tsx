import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-100 border-t border-slate-200 py-4">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-1">
            <img src="/logo.png" alt="Fidogood" className="w-6 h-6 object-contain" />
            <span className="text-sm font-bold text-slate-800">Fidogood 飛朵資訊</span>
        </div>
        <p className="text-slate-500 text-xs">
          © {new Date().getFullYear()} Fidogood. All rights reserved.
        </p>
      </div>
    </footer>
  );
};