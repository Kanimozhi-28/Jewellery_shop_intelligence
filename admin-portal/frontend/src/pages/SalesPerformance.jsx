import React from 'react';
import {
    Users, Trophy, Target, TrendingUp,
    Search, Filter, ChevronRight, UserCircle
} from 'lucide-react';

const TEAM_DATA = [
    { id: 'EMP001', name: 'John Doe', sessions: 142, conversion: 28.5, revenue: '₹1.2M', items: 542 },
    { id: 'EMP002', name: 'Jane Smith', sessions: 128, conversion: 22.1, revenue: '₹950k', items: 485 },
    { id: 'EMP003', name: 'Mike Ross', sessions: 98, conversion: 18.5, revenue: '₹720k', items: 320 },
    { id: 'EMP004', name: 'Sarah Connor', sessions: 156, conversion: 32.2, revenue: '₹1.8M', items: 610 },
];

export default function SalespersonPerformance() {
    const sortedTeam = [...TEAM_DATA].sort((a, b) => b.conversion - a.conversion);

    return (
        <div className="flex flex-col gap-8">
            <div className="mb-10">
                <h1 className="text-4xl font-black tracking-tight mb-2 italic text-white flex items-center gap-4">
                    <Trophy className="text-gold" size={32} />
                    Sales Intelligence Team
                </h1>
                <p className="text-gray-500 font-medium italic" style={{ textDecoration: 'underline', textDecorationColor: 'rgba(212,175,55,0.2)', textUnderlineOffset: '8px' }}>Efficiency & Conversion Leaderboard</p>
            </div>

            <div className="grid grid-cols-4 gap-6 mb-12">
                <div className="glass overflow-hidden" style={{ gridColumn: 'span 3', borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                    <table className="w-full" style={{ textAlign: 'left', borderCollapse: 'collapse' }}>
                        <thead>
                            <tr className="text-sm font-black uppercase tracking-widest" style={{ background: 'rgba(212, 175, 55, 0.05)', borderBottom: '1px solid rgba(212, 175, 55, 0.2)' }}>
                                <th className="py-6 text-gold" style={{ paddingLeft: '5rem', textAlign: 'left' }}>Professional Associate</th>
                                <th className="px-6 py-6 text-gold font-black italic">Sessions</th>
                                <th className="px-6 py-6 text-gold font-black italic">Avg. Items</th>
                                <th className="px-6 py-6 text-gold font-black italic" style={{ textAlign: 'right' }}>Conversion</th>
                            </tr>
                        </thead>
                        <tbody style={{ borderTop: '1px solid rgba(255,255,255,0.02)' }}>
                            {sortedTeam.map((member, idx) => (
                                <tr key={member.id} className="group" style={{ transition: 'background 0.2s', borderBottom: '1px solid rgba(255,255,255,0.02)' }}>
                                    <td className="py-6" style={{ paddingLeft: '5rem' }}>
                                        <div className="flex items-center gap-4">
                                            <div className="relative">
                                                <div className="flex items-center justify-center font-bold text-gray-600 italic" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                                                    {idx + 1}
                                                </div>
                                            </div>
                                            <div>
                                                <p className="font-bold text-lg">{member.name}</p>
                                                <p className="text-tiny text-gray-600 font-bold uppercase tracking-tighter">{member.id} • Senior Associate</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-lg font-black text-white">{member.sessions}</p>
                                        <p className="text-tiny text-gray-700 font-bold italic">Interactions</p>
                                    </td>
                                    <td className="px-6 py-6">
                                        <p className="text-lg font-black text-gray-400">{(member.items / member.sessions).toFixed(1)}</p>
                                    </td>
                                    <td className="px-6 py-6" style={{ textAlign: 'right' }}>
                                        <div className="flex flex-col items-end">
                                            <span className="text-sm font-black text-black px-3 py-1 rounded-full gold-gradient shadow-lg mb-2">
                                                {member.conversion}%
                                            </span>
                                            <div className="h-1 rounded-full overflow-hidden" style={{ width: '80px', background: 'rgba(255,255,255,0.05)' }}>
                                                <div className="gold-gradient h-full" style={{ width: `${member.conversion}%` }}></div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="flex flex-col gap-6">
                    <div className="glass p-6 relative overflow-hidden group" style={{ borderRadius: '2rem', border: '1px solid rgba(255,255,255,0.05)', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
                        <div className="absolute" style={{ top: '-1rem', right: '-1rem', width: '6rem', height: '6rem', background: 'rgba(212,175,55,0.05)', borderRadius: '50%' }}></div>
                        <p className="text-tiny font-black text-gray-500 uppercase tracking-widest mb-4">Top Performer Revenue</p>
                        <h4 className="text-3xl font-black text-white italic mb-1">{sortedTeam[0].revenue}</h4>
                        <p className="text-xs text-gold font-medium" style={{ opacity: 0.6 }}>Verified conversions today</p>
                    </div>

                    <div className="glass p-8" style={{ borderRadius: '2rem', background: 'rgba(212,175,55,0.1)', border: '2px solid rgba(212,175,55,0.2)' }}>
                        <h4 className="text-lg font-black italic mb-4">Sync Performance</h4>
                        <div className="flex flex-col gap-4">
                            <div className="flex justify-between items-center text-sm">
                                <span className="text-gray-400 font-medium">Target Reach</span>
                                <span className="font-black">84%</span>
                            </div>
                            <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(0,0,0,0.4)' }}>
                                <div className="gold-gradient h-full" style={{ width: '84%' }}></div>
                            </div>
                            <p className="text-tiny text-gray-500 italic" style={{ lineHeight: '1.6' }}>System automatically maps POS sales to these interaction metrics using the loop-closure engine.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
