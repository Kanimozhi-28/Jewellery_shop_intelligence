import React from 'react';
import { Settings, FileText, Download, ShieldCheck, Database, Layout } from 'lucide-react';

export default function AdminSettings() {
    return (
        <div className="flex flex-col gap-8" style={{ maxWidth: '64rem' }}>
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight mb-2 italic">Control Center</h1>
                <p className="text-gray-500 font-medium italic" style={{ textDecoration: 'underline', textDecorationColor: 'rgba(212,175,55,0.2)', textUnderlineOffset: '8px' }}>System Configuration & Data Policy</p>
            </div>

            <div className="grid grid-cols-2 gap-8">
                {/* Settings Column */}
                <div className="flex flex-col gap-6">
                    <div className="glass p-8" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center gap-3 mb-8">
                            <ShieldCheck size={24} className="text-gold" />
                            <h3 className="text-xl font-bold italic">Privacy Guard Settings</h3>
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex justify-between items-center group">
                                <div>
                                    <p className="text-sm font-bold">Automatic Image Purge</p>
                                    <p className="text-tiny text-gray-500 font-bold uppercase tracking-widest mt-0.5" style={{ marginTop: '0.125rem' }}>MinIO Lifecycle Policy</p>
                                </div>
                                <span className="text-black px-4 py-1.5 rounded-full text-tiny font-black italic" style={{ background: 'var(--gold-primary)' }}>Active: 7 Days</span>
                            </div>
                            <div className="flex justify-between items-center group">
                                <div>
                                    <p className="text-sm font-bold">Face Blur / Anonymization</p>
                                    <p className="text-tiny text-gray-500 font-bold uppercase tracking-widest mt-0.5" style={{ marginTop: '0.125rem' }}>CV Pipeline Masking</p>
                                </div>
                                <div className="flex items-center" style={{ width: '40px', height: '20px', background: 'rgba(212,175,55,0.2)', borderRadius: '999px', padding: '0.25rem', cursor: 'pointer', position: 'relative' }}>
                                    <div className="w-3 h-3 rounded-full" style={{ width: '0.75rem', height: '0.75rem', background: 'var(--gold-primary)', float: 'right' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="glass p-8" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                        <div className="flex items-center gap-3 mb-8">
                            <Database size={24} className="text-gold" />
                            <h3 className="text-xl font-bold italic">Data Sources</h3>
                        </div>
                        <div className="flex items-center gap-4 p-4 bg-white/5 rounded-3xl border border-white/5" style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex items-center justify-center text-green-500" style={{ width: '40px', height: '40px', background: 'rgba(34, 197, 94, 0.1)', borderRadius: '0.75rem' }}>
                                <div className="w-2 h-2 rounded-full animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'currentColor' }}></div>
                            </div>
                            <div>
                                <p className="text-sm font-bold">POS Integration Status</p>
                                <p className="text-xs text-gray-500">Connected to Store-Central-v4</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Reports Column */}
                <div className="glass p-8 flex flex-col items-center justify-center text-center" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="p-10 bg-white/5 rounded-full mb-8 relative" style={{ padding: '2.5rem', background: 'rgba(255,255,255,0.05)', borderRadius: '50%', marginBottom: '2rem', position: 'relative' }}>
                        <FileText size={64} style={{ color: 'rgba(255,255,255,0.2)' }} />
                        <div className="absolute flex items-center justify-center text-black shadow-xl" style={{ top: 0, right: 0, width: '2rem', height: '2rem', background: 'var(--gold-primary)', borderRadius: '50%', boxShadow: '0 10px 25px rgba(0,0,0,0.1)' }}><Download size={14} /></div>
                    </div>
                    <h3 className="text-2xl font-black mb-2 italic">Monthly conversion_summary_dec.pdf</h3>
                    <p className="text-sm text-gray-500 mb-8 max-w-xs" style={{ marginBottom: '2rem', maxWidth: '20rem' }}>Full analytics breakdown of jewellery interest vs final purchase conversion for the month of December.</p>
                    <button className="btn-gold" style={{ width: '100%', py: '1.25rem', borderRadius: '1.5rem', fontStyle: 'italic', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', padding: '1.25rem' }}>
                        Generate Final Report
                    </button>
                </div>
            </div>
        </div>
    );
}
