import React from 'react';
import { EyeOff, Ghost, ArrowRight, IndianRupee, MessageCircle, AlertCircle } from 'lucide-react';
import { JEWELLERY_DATA } from '../data/mock';

export default function LostOpportunities() {
    // Sort items by viewed but not purchased gap
    const lostOpps = JEWELLERY_DATA.slice(0, 4).map(item => ({
        ...item,
        viewed: Math.floor(Math.random() * 50) + 10,
        purchased: Math.floor(Math.random() * 2),
        commonFeedback: "Design too heavy for 18k preference"
    }));

    return (
        <div className="flex flex-col gap-8">
            <div className="mb-10 flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 italic">Lost Opportunities</h1>
                    <p className="text-gray-500 font-medium">Items shown but results not converted • <span className="text-red-500 font-black italic" style={{ opacity: 0.8 }}>Loop Closure Gaps</span></p>
                </div>
                <div className="px-6 py-3 glass flex items-center gap-2" style={{ borderRadius: '1rem', border: '1px solid rgba(239, 68, 68, 0.1)' }}>
                    <AlertCircle size={18} className="text-red-500" />
                    <span className="text-xs font-black italic">14% Global Leakage</span>
                </div>
            </div>

            <div className="flex flex-col gap-4">
                {lostOpps.map((item) => (
                    <div key={item.barcode} className="glass p-8 flex items-center gap-10 group" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)', position: 'relative', overflow: 'hidden', transition: 'all 0.2s' }}>
                        <div style={{ position: 'absolute', top: 0, left: 0, width: '4px', height: '100%', background: '#ef4444', opacity: 0, transition: 'opacity 0.2s' }}></div>

                        <div className="flex items-center justify-center text-gray-700" style={{ width: '96px', height: '96px', background: 'rgba(255,255,255,0.05)', borderRadius: '1.5rem', transition: 'color 0.2s' }}>
                            <EyeOff size={40} />
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-3 mb-1">
                                <h3 className="text-2xl font-black italic">{item.name}</h3>
                                <span className="px-3 py-1 text-tiny font-black text-gray-500 rounded-full italic" style={{ background: 'rgba(255,255,255,0.05)' }}>{item.barcode}</span>
                            </div>
                            <p className="text-sm text-gray-600 font-bold uppercase tracking-widest mb-4">Category: {item.category} • Value: ₹{item.price.toLocaleString()}</p>

                            <div className="flex gap-4">
                                <div className="px-4 py-2 rounded-xl flex items-center gap-2" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.1)' }}>
                                    <Ghost size={16} style={{ color: 'rgba(239, 68, 68, 0.6)' }} />
                                    <span className="text-sm font-black text-gray-400">Shown {item.viewed} times</span>
                                </div>
                                <div className="px-4 py-2 bg-white/5 rounded-xl flex items-center gap-2">
                                    <IndianRupee size={14} style={{ color: 'rgba(212, 175, 55, 0.5)' }} />
                                    <span className="text-sm font-black text-white">Sold: {item.purchased}</span>
                                </div>
                            </div>
                        </div>

                        <div className="glass p-6" style={{ width: '20rem', borderRadius: '1.5rem', background: 'rgba(0,0,0,0.4)', border: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex items-center gap-2 text-tiny font-black text-gray-600 uppercase tracking-widest mb-3">
                                <MessageCircle size={14} style={{ color: 'rgba(212, 175, 55, 0.3)' }} />
                                Dominant Feedback
                            </div>
                            <p className="text-xs text-gray-400 italic font-medium" style={{ lineHeight: '1.6' }}>"{item.commonFeedback}"</p>
                            <button className="flex items-center gap-1" style={{ marginTop: '1rem', background: 'transparent', border: 'none', color: 'var(--gold-primary)', fontSize: '10px', fontBlack: 900, cursor: 'pointer' }}>
                                Analyze Drilldown <ArrowRight size={12} />
                            </button>
                        </div>
                    </div>
                ))}

                <div className="flex flex-col items-center justify-center text-gray-700" style={{ borderRadius: '2.5rem', border: '2px dashed rgba(255,255,255,0.05)', padding: '2rem' }}>
                    <p className="font-black italic text-sm">No More Critical Drops</p>
                    <p className="text-tiny mt-2 font-medium">All high-dwell paths were serviced.</p>
                </div>
            </div>
        </div>
    );
}
