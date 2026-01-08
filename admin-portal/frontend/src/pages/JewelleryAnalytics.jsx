import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Plus, Search, Filter, ArrowUpDown,
    MessageSquare, ChevronDown, ChevronUp, BarChart,
    Eye, ShoppingCart, Percent, Clock, Calendar
} from 'lucide-react';

const API_BASE_URL = `http://${window.location.hostname}:8001/api/analytics`;

export default function JewelleryAnalytics() {
    const [stats, setStats] = useState([]);
    const [comments, setComments] = useState({});
    const [expandedRow, setExpandedRow] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/jewellery-stats`);
            setStats(response.data);
        } catch (err) {
            console.error("Failed to fetch jewellery stats", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchComments = async (barcode) => {
        if (comments[barcode]) return;
        try {
            const response = await axios.get(`${API_BASE_URL}/scans/${barcode}/comments`);
            setComments(prev => ({ ...prev, [barcode]: response.data }));
        } catch (err) {
            console.error("Failed to fetch comments", err);
        }
    };

    const handleExpandToggle = (barcode) => {
        if (expandedRow === barcode) {
            setExpandedRow(null);
        } else {
            setExpandedRow(barcode);
            fetchComments(barcode);
        }
    };

    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 italic">Jewellery Intelligence</h1>
                    <p className="text-gray-500 font-medium">Individual item performance & feedback</p>
                </div>
                <div className="flex gap-4">
                    <div className="relative">
                        <Search className="absolute text-white" style={{ left: '1rem', top: '50%', transform: 'translateY(-50%)', opacity: 0.2 }} size={18} />
                        <input type="text" placeholder="Search item..." className="input-field" style={{ paddingLeft: '3rem', width: '16rem', borderRadius: '1rem', padding: '0.75rem 1rem 0.75rem 3rem' }} />
                    </div>
                    <button className="btn-gold" style={{ padding: '0.75rem', borderRadius: '1rem', width: 'auto' }}><Filter size={20} /></button>
                </div>
            </div>

            <div className="glass overflow-x-auto" style={{ borderRadius: '2.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
                <table className="w-full" style={{ textAlign: 'left', borderCollapse: 'collapse' }}>
                    <thead>
                        <tr className="text-white text-tiny font-black uppercase tracking-widest" style={{ background: 'rgba(255,255,255,0.1)' }}>
                            <th className="px-8 py-6">Item Identity</th>
                            <th className="px-6 py-6" style={{ textAlign: 'center' }}><div className="flex items-center justify-center gap-2"><Eye size={12} /> Interacted</div></th>
                            <th className="px-6 py-6" style={{ textAlign: 'center' }}><div className="flex items-center justify-center gap-2"><ShoppingCart size={12} /> Sold</div></th>
                            <th className="px-6 py-6" style={{ textAlign: 'center' }}><div className="flex items-center justify-center gap-2"><Percent size={12} /> Conversion</div></th>
                            <th className="px-8 py-6" style={{ textAlign: 'right' }}>Actions</th>
                        </tr>
                    </thead>
                    <tbody style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                        {stats.map((item) => {
                            const conv = ((item.sold / item.viewed) * 100).toFixed(1);
                            const isExpanded = expandedRow === item.barcode;
                            const itemComments = comments[item.barcode] || [];

                            return (
                                <React.Fragment key={item.barcode}>
                                    <tr
                                        className="group"
                                        style={{
                                            transition: 'background 0.2s',
                                            background: isExpanded ? 'rgba(255,255,255,0.05)' : 'transparent',
                                            borderBottom: '1px solid rgba(255,255,255,0.02)'
                                        }}
                                    >
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="font-black italic flex items-center justify-center text-gray-500" style={{ width: '48px', height: '48px', background: 'rgba(255,255,255,0.05)', borderRadius: '1rem' }}>
                                                    {item.name[0]}
                                                </div>
                                                <div>
                                                    <p className="font-bold text-lg">{item.name}</p>
                                                    <p className="text-xs text-gray-600 font-bold uppercase">{item.barcode}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-6 text-xl font-black" style={{ textAlign: 'center' }}>{item.viewed}</td>
                                        <td className="px-6 py-6 text-xl font-black text-green-500" style={{ textAlign: 'center' }}>{item.sold}</td>
                                        <td className="px-6 py-6" style={{ textAlign: 'center' }}>
                                            <span
                                                className="font-black text-sm"
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    borderRadius: '9999px',
                                                    background: 'rgba(255,255,255,0.05)',
                                                    color: conv > 15 ? 'var(--gold-primary)' : 'var(--text-muted)',
                                                    boxShadow: conv > 15 ? '0 0 10px rgba(212,175,55,0.1)' : 'none'
                                                }}
                                            >
                                                {conv}%
                                            </span>
                                        </td>
                                        <td className="px-8 py-6" style={{ textAlign: 'right' }}>
                                            <button
                                                onClick={() => handleExpandToggle(item.barcode)}
                                                className="btn-secondary"
                                                style={{
                                                    padding: '0.5rem 1rem',
                                                    fontSize: '0.75rem',
                                                    width: 'auto',
                                                    background: isExpanded ? 'var(--gold-primary)' : 'rgba(255,255,255,0.05)',
                                                    color: isExpanded ? 'black' : 'var(--text-muted)',
                                                    fontStyle: isExpanded ? 'italic' : 'normal'
                                                }}
                                            >
                                                {isExpanded ? 'Hide Feed' : 'View Comments'}
                                                {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} style={{ marginLeft: '0.5rem' }} />}
                                            </button>
                                        </td>
                                    </tr>
                                    {isExpanded && (
                                        <tr>
                                            <td colSpan={5} className="p-0">
                                                <div style={{ background: '#f9fafb', padding: '2rem 3rem', borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                                                    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                                                        <table className="w-full text-left table-fixed" style={{ borderCollapse: 'separate', borderSpacing: '0' }}>
                                                            <thead>
                                                                <tr style={{ background: '#f3f4f6' }}>
                                                                    <th className="py-4 px-10 font-bold text-gray-700 text-xs uppercase tracking-wider first:rounded-tl-lg border-b border-gray-200" style={{ width: '30%' }}>Time</th>
                                                                    <th className="py-4 px-10 font-bold text-gray-700 text-xs uppercase tracking-wider border-b border-gray-200" style={{ width: '30%' }}>Customer ID</th>
                                                                    <th className="py-4 px-10 font-bold text-gray-700 text-xs uppercase tracking-wider last:rounded-tr-lg border-b border-gray-200" style={{ width: '40%' }}>Comments</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody className="bg-white">
                                                                {itemComments.length === 0 ? (
                                                                    <tr>
                                                                        <td colSpan={3} className="py-8 text-center text-gray-500 italic border-l border-r border-b border-gray-200 rounded-b-lg">
                                                                            No qualitative feedback recorded for this session.
                                                                        </td>
                                                                    </tr>
                                                                ) : itemComments.map((c, idx) => (
                                                                    <tr key={idx} className="hover:bg-gray-50 transition-colors">
                                                                        <td className="py-5 px-10 border-b border-gray-200 border-l font-mono text-gray-600 text-sm align-top">
                                                                            {new Date(c.scanned_at).toLocaleDateString(undefined, {
                                                                                month: 'short', day: 'numeric',
                                                                                hour: '2-digit', minute: '2-digit'
                                                                            })}
                                                                        </td>
                                                                        <td className="py-5 px-10 border-b border-gray-200 font-bold text-gray-900 text-sm align-top">
                                                                            C{c.session_id}
                                                                        </td>
                                                                        <td className="py-5 px-10 border-b border-gray-200 border-r text-gray-800 text-sm leading-relaxed align-top">
                                                                            {c.comment || <span className="text-gray-400 italic">—</span>}
                                                                        </td>
                                                                    </tr>
                                                                ))}
                                                            </tbody>
                                                        </table>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
