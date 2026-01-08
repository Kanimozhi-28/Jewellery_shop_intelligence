import React from 'react';
import { Map, Users, TrendingUp, IndianRupee, Clock, ArrowRight } from 'lucide-react';
import { ZONES } from '../data/mock';

export default function ZoneAnalytics() {
    return (
        <div className="flex flex-col gap-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight mb-2 italic">Store Topography</h1>
                <p className="text-gray-500 font-medium">Zone-wise traffic flow and revenue density</p>
            </div>

            <div className="grid grid-cols-3 gap-8">
                {ZONES.map(zone => (
                    <div key={zone.id} className="glass p-8 relative group" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)', transition: 'all 0.2s', cursor: 'pointer' }}>
                        <div className="absolute" style={{ top: 0, right: 0, width: '8rem', height: '8rem', opacity: 0.05, borderBottomLeftRadius: '100px', backgroundColor: zone.color }}></div>

                        <div className="flex justify-between items-start mb-8">
                            <div className="p-4 rounded-2xl bg-white/5 transition-colors">
                                <Map size={28} style={{ color: zone.color }} />
                            </div>
                            <div style={{ textAlign: 'right' }}>
                                <p className="text-tiny font-black text-gray-500 uppercase tracking-widest">Floor</p>
                                <p className="text-xl font-bold italic text-white" style={{ fontFamily: 'serif' }}>{zone.floor}</p>
                            </div>
                        </div>

                        <h3 className="text-2xl font-black mb-1 transition-colors">{zone.name}</h3>
                        <p className="text-sm text-gray-600 font-medium italic mb-10">High Demand Area • {zone.activeCount * 3} Daily Visitors</p>

                        <div className="grid grid-cols-2 gap-6 mb-8">
                            <div>
                                <p className="text-tiny font-black text-gray-600 uppercase mb-1">Interaction Rate</p>
                                <p className="text-xl font-black flex items-center gap-1">84% <TrendingUp size={14} className="text-green-500" /></p>
                            </div>
                            <div>
                                <p className="text-tiny font-black text-gray-600 uppercase mb-1">Revenue Heat</p>
                                <p className="text-xl font-black text-gold">High</p>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                            <div className="flex items-center gap-2" style={{ opacity: 0.6 }}>
                                <Users size={16} />
                                <span className="text-xs font-bold">{zone.activeCount} Live</span>
                            </div>
                            <div className="flex items-center gap-2" style={{ opacity: 0.6, marginLeft: 'auto' }}>
                                <span className="text-xs font-black uppercase text-gold">View Heatmap</span>
                                <ArrowRight size={14} className="text-gold" />
                            </div>
                        </div>
                    </div>
                ))}

                {/* Add New Zone Placeholder */}
                <div
                    className="flex flex-col items-center justify-center text-gray-700 group"
                    style={{ borderRadius: '2.5rem', border: '2px dashed rgba(255,255,255,0.05)', padding: '2rem', cursor: 'pointer', transition: 'all 0.2s' }}
                >
                    <div className="flex items-center justify-center mb-4 transition-transform" style={{ width: '64px', height: '64px', borderRadius: '50%', border: '2px dashed currentColor' }}>
                        <Map size={24} />
                    </div>
                    <p className="font-black italic text-sm">Configure New Store Zone</p>
                </div>
            </div>
        </div>
    );
}
