import React from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, MapPin, User } from 'lucide-react';

export const Hero: React.FC = () => {
  const { data } = useContent();
  const { profile } = data;

  return (
    <section id="about" className="relative min-h-screen pt-24 pb-20 overflow-hidden bg-gradient-to-br from-cyan-950 via-sky-950 to-blue-950">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-12">
          
          <div className="flex-1 space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <User className="w-5 h-5 text-cyan-400" />
                <span className="text-cyan-400 font-semibold tracking-wide uppercase text-sm">Profile</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                {profile.name}
              </h1>
              <h2 className="text-xl md:text-2xl text-cyan-200 font-medium">
                {profile.title}
              </h2>
            </div>

            <div className="max-w-2xl">
              <p className="text-lg text-slate-200 leading-relaxed whitespace-pre-wrap">
                {profile.summary}
              </p>
            </div>

            <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-lg border border-cyan-500/20">
                    <Mail className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-100">{profile.email}</span>
                </div>
                <div className="flex items-center gap-2 bg-slate-800/60 px-4 py-2 rounded-lg border border-cyan-500/20">
                    <MapPin className="w-5 h-5 text-cyan-400" />
                    <span className="text-cyan-100">{profile.location}</span>
                </div>
            </div>
          </div>

          {/* Decorative Code Block visual */}
          <div className="hidden md:block w-1/3">
             <div className="bg-slate-800/80 rounded-lg p-6 border border-cyan-500/30 shadow-2xl shadow-cyan-900/20 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="flex gap-2 mb-4">
                    <div className="w-3 h-3 rounded-full bg-red-500"/>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"/>
                    <div className="w-3 h-3 rounded-full bg-green-500"/>
                </div>
                <div className="space-y-2 font-mono text-sm">
                    <div className="text-pink-400">const <span className="text-cyan-300">developer</span> = <span className="text-yellow-300">new</span> <span className="text-green-400">Expert</span>();</div>
                    <div className="text-slate-200">developer.<span className="text-cyan-300">skills</span>.push(<span className="text-orange-300">"ASP.NET"</span>);</div>
                    <div className="text-slate-200">developer.<span className="text-cyan-300">skills</span>.push(<span className="text-orange-300">"MS SQL"</span>);</div>
                    <div className="text-slate-200">developer.<span className="text-cyan-300">role</span> = <span className="text-orange-300">"Full Stack"</span>;</div>
                    <div className="text-slate-400">// Ready to deploy</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </section>
  );
};