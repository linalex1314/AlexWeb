import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-slate-500 text-sm">
          © {new Date().getFullYear()} Professional Portfolio. All rights reserved.
        </p>
        <p className="text-slate-600 text-xs mt-2">
            Built with React & Tailwind CSS. Simulated CMS functionality.
        </p>
      </div>
    </footer>
  );
};