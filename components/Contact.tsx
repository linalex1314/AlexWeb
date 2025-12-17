import React, { useState, useRef } from 'react';
import { useContent } from '../context/ContentContext';
import { Mail, MapPin, Send, User, MessageSquare, Loader2, CheckCircle, AlertCircle } from 'lucide-react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export const Contact: React.FC = () => {
    const { data } = useContent();
    const formRef = useRef<HTMLFormElement>(null);
    const [formStatus, setFormStatus] = useState<FormStatus>('idle');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormStatus('sending');

        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        console.log('EmailJS Config Check:', { 
            hasServiceId: !!serviceId, 
            hasTemplateId: !!templateId, 
            hasPublicKey: !!publicKey 
        });

        // 檢查環境變數是否存在
        if (!serviceId || !templateId || !publicKey) {
            console.error('EmailJS configuration missing!');
            alert('郵件服務設定錯誤，請聯繫網站管理員。');
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
            return;
        }

        try {
            console.log('Sending email...');
            const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    service_id: serviceId,
                    template_id: templateId,
                    user_id: publicKey,
                    template_params: {
                        from_name: formData.name,
                        from_email: formData.email,
                        subject: formData.subject,
                        message: formData.message,
                        to_email: data.profile.email,
                    }
                })
            });

            console.log('Response status:', response.status);

            if (response.ok) {
                setFormStatus('success');
                setFormData({ name: '', email: '', subject: '', message: '' });
                setTimeout(() => setFormStatus('idle'), 5000);
            } else {
                const errorText = await response.text();
                console.error('EmailJS error response:', response.status, errorText);
                alert('發送失敗: ' + errorText);
                throw new Error('Failed to send');
            }
        } catch (error) {
            console.error('Email error:', error);
            setFormStatus('error');
            setTimeout(() => setFormStatus('idle'), 5000);
        }
    };

    return (
        <section id="contact" className="py-24 relative overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">
            {/* Background Accent */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-64 bg-violet-500/10 blur-[100px] pointer-events-none" />
            
            <div className="max-w-5xl mx-auto px-4 relative z-10">
                <div className="text-center mb-12">
                     <div className="flex items-center justify-center gap-3 mb-4">
                         <div className="p-3 bg-violet-500/20 rounded-xl border border-violet-400/30">
                             <MessageSquare className="w-8 h-8 text-violet-400" />
                         </div>
                     </div>
                     <h2 className="text-3xl font-bold text-white mb-4">和我聯絡</h2>
                     <p className="text-violet-200/70">有有趣的專案或技術交流？歡迎隨時召喚我！</p>
                </div>
               
                <div className="grid lg:grid-cols-5 gap-8">
                    {/* Contact Info Cards */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Email Card */}
                        <div className="bg-slate-800/40 backdrop-blur border border-violet-500/20 p-6 rounded-2xl flex items-center gap-4 hover:border-violet-400/40 transition-colors group">
                            <div className="w-12 h-12 bg-violet-900/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-violet-500/20 shadow-lg flex-shrink-0">
                                <Mail className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Email</h3>
                                <span className="text-violet-200 font-mono text-sm">{data.profile.email}</span>
                            </div>
                        </div>

                        {/* Location Card */}
                        <div className="bg-slate-800/40 backdrop-blur border border-violet-500/20 p-6 rounded-2xl flex items-center gap-4 hover:border-violet-400/40 transition-colors group">
                            <div className="w-12 h-12 bg-violet-900/40 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 border border-violet-500/20 shadow-lg flex-shrink-0">
                                <MapPin className="w-5 h-5 text-violet-400" />
                            </div>
                            <div>
                                <h3 className="text-white font-bold text-sm mb-1">Location</h3>
                                <span className="text-violet-200 font-mono text-sm">{data.profile.location}</span>
                            </div>
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-3">
                        <form ref={formRef} onSubmit={handleSubmit} className="bg-slate-800/40 backdrop-blur border border-violet-500/20 p-8 rounded-2xl space-y-5">
                            <h3 className="text-white font-bold text-lg mb-2">發送訊息給我</h3>
                            
                            <div className="grid sm:grid-cols-2 gap-4">
                                {/* Name */}
                                <div className="relative">
                                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/60" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="你的名字"
                                        required
                                        className="w-full bg-slate-900/60 border border-violet-500/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-400 transition-colors"
                                    />
                                </div>
                                
                                {/* Email */}
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/60" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="你的 Email"
                                        required
                                        className="w-full bg-slate-900/60 border border-violet-500/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-400 transition-colors"
                                    />
                                </div>
                            </div>

                            {/* Subject */}
                            <div className="relative">
                                <MessageSquare className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-violet-400/60" />
                                <input
                                    type="text"
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleChange}
                                    placeholder="主旨"
                                    required
                                    className="w-full bg-slate-900/60 border border-violet-500/20 rounded-lg py-3 pl-10 pr-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-400 transition-colors"
                                />
                            </div>

                            {/* Message */}
                            <textarea
                                name="message"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="請輸入訊息內容..."
                                required
                                rows={5}
                                className="w-full bg-slate-900/60 border border-violet-500/20 rounded-lg py-3 px-4 text-white placeholder:text-slate-400 focus:outline-none focus:border-violet-400 transition-colors resize-none"
                            />

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={formStatus === 'sending'}
                                className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg font-medium transition-all ${
                                    formStatus === 'sending'
                                        ? 'bg-slate-700 text-slate-400 cursor-not-allowed'
                                        : formStatus === 'success'
                                        ? 'bg-green-600 text-white'
                                        : formStatus === 'error'
                                        ? 'bg-red-600 text-white'
                                        : 'bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/30 hover:shadow-violet-900/50'
                                }`}
                            >
                                {formStatus === 'sending' && <Loader2 className="w-4 h-4 animate-spin" />}
                                {formStatus === 'success' && <CheckCircle className="w-4 h-4" />}
                                {formStatus === 'error' && <AlertCircle className="w-4 h-4" />}
                                {formStatus === 'idle' && <Send className="w-4 h-4" />}
                                <span>
                                    {formStatus === 'sending' && '發送中...'}
                                    {formStatus === 'success' && '發送成功！'}
                                    {formStatus === 'error' && '發送失敗，請稍後再試'}
                                    {formStatus === 'idle' && '發送訊息'}
                                </span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
}