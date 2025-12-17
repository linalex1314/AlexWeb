import React from 'react';
import { Terminal } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2 bg-slate-800 rounded-lg">
                <Terminal className="w-5 h-5 text-amber-500" />
            </div>
            <span className="text-xl font-bold text-white">DEV.LOG</span>
        </div>
        <p className="text-slate-400 text-sm">
          © {new Date().getFullYear()} Professional Portfolio. All rights reserved.
        </p>
        <p className="text-slate-500 text-xs mt-2">
            Built with React & Tailwind CSS
        </p>
      </div>
    </footer>
  );
};