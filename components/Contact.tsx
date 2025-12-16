import React from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, MapPin, Send } from 'lucide-react';

export const Contact: React.FC = () => {
    const { data } = useContent();

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-slate-900 border-t border-slate-800">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-blue-600/5 blur-[100px] pointer-events-none" />
            
            <div className="max-w-4xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                     <h2 className="text-3xl font-bold text-white mb-4">和我聯絡</h2>
                     <p className="text-slate-400">有有趣的專案或技術交流？歡迎隨時召喚我！</p>
                </div>
               
                <div className="grid md:grid-cols-2 gap-8">
                    {/* Email Card */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-2xl flex flex-col items-center text-center hover:border-blue-500/30 transition-colors group">
                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 shadow-lg">
                            <Mail className="w-8 h-8 text-blue-400" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Email</h3>
                        <p className="text-slate-500 text-sm mb-4">發送郵件，我會盡快回覆</p>
                        <div className="bg-slate-900 px-6 py-3 rounded-lg border border-slate-700/50 w-full">
                            <span className="text-blue-300 font-mono text-sm">{data.profile.email}</span>
                        </div>
                    </div>

                    {/* Location/Info Card */}
                    <div className="bg-slate-800/50 backdrop-blur border border-slate-700 p-8 rounded-2xl flex flex-col items-center text-center hover:border-green-500/30 transition-colors group">
                        <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 border border-slate-700 shadow-lg">
                            <MapPin className="w-8 h-8 text-green-400" />
                        </div>
                        <h3 className="text-white font-bold text-lg mb-2">Location</h3>
                         <p className="text-slate-500 text-sm mb-4">目前所在地</p>
                        <div className="bg-slate-900 px-6 py-3 rounded-lg border border-slate-700/50 w-full">
                            <span className="text-green-300 font-mono text-sm">{data.profile.location}</span>
                        </div>
                    </div>
                </div>

                {/* Call to Action Decoration */}
                <div className="mt-16 text-center">
                    <a href={`mailto:${data.profile.email}`} className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-full transition-all shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40">
                        <Send className="w-4 h-4" />
                        <span>發送邀請</span>
                    </a>
                </div>
            </div>
        </section>
    );
}