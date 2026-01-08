import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
    LineChart, Line, Cell, PieChart, Pie
} from 'recharts';
import {
    Users, ShoppingBag, TrendingUp, Clock,
    MapPin, Eye, ArrowUpRight, ArrowDownRight,
    TrendingDown, Percent
} from 'lucide-react';

const API_BASE_URL = `http://${window.location.hostname}:8001/api/analytics`;

const TREND_DATA = [
    { name: 'Mon', sales: 4000, interactions: 2400 },
    { name: 'Tue', sales: 3000, interactions: 1398 },
    { name: 'Wed', sales: 2000, interactions: 9800 },
    { name: 'Thu', sales: 2780, interactions: 3908 },
    { name: 'Fri', sales: 1890, interactions: 4800 },
    { name: 'Sat', sales: 2390, interactions: 3800 },
    { name: 'Sun', sales: 3490, interactions: 4300 },
];

const CATEGORY_DATA = [
    { name: 'Rings', value: 400 },
    { name: 'Earrings', value: 300 },
    { name: 'Chains', value: 200 },
    { name: 'Bracelets', value: 100 },
];

const COLORS = ['#d4af37', '#b8c6db', '#a8a8a8', '#f1d592'];

const KpiCard = ({ title, value, detail, icon: Icon, color, trend }) => (
    <div className="kpi-card group">
        <div className={`absolute top-0 right-0 w-24 h-24 ${color}`} style={{ opacity: 0.05, borderBottomLeftRadius: '80px' }}></div>
        <div className="flex justify-between items-start mb-6">
            <div className={`p-4 rounded-2xl bg-white/5`}>
                <Icon size={24} className="text-gold" />
            </div>
            <div className={`flex items-center gap-1 text-xs font-bold ${trend > 0 ? 'text-green-500' : 'text-red-500'}`}>
                {trend > 0 ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                {Math.abs(trend)}%
            </div>
        </div>
        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
        <h3 className="text-3xl font-black mb-1">{value}</h3>
        <p className="text-gray-600 font-medium italic" style={{ fontSize: '10px' }}>{detail}</p>
    </div>
);

export default function Dashboard() {
    const [summary, setSummary] = useState(null);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            const response = await axios.get(`${API_BASE_URL}/summary`);
            setSummary(response.data);
        } catch (err) {
            console.error("Failed to fetch summary", err);
        }
    };
    return (
        <div className="flex flex-col gap-8">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-4xl font-black tracking-tight mb-2 italic">Dashboard</h1>
                    <p className="text-gray-500 font-medium">Real-time Retail Intelligence Overview</p>
                </div>
                <div className="flex gap-4">
                    <button className="btn-secondary">Today</button>
                    <button className="btn-gold">Export PDF</button>
                </div>
            </div>

            {/* KPI Row */}
            <div className="grid grid-cols-4 gap-6">
                <KpiCard
                    title="Total Interactions"
                    value={summary?.total_interactions || 0}
                    detail="Real-time scans across all zones"
                    icon={Eye}
                    color="gold-gradient"
                    trend={12}
                />
                <KpiCard
                    title="Conversion Rate"
                    value={`${summary?.conversion_rate || 0}%`}
                    detail="Avg. across all zones"
                    icon={Percent}
                    color="btn-secondary"
                    trend={4}
                />
                <KpiCard
                    title="Revenue Est."
                    value={`₹${((summary?.revenue_estimate || 0) / 100000).toFixed(1)}L`}
                    detail="Sum of scanned items price"
                    icon={TrendingUp}
                    trend={8}
                />
                <KpiCard
                    title="Sales Team"
                    value={summary?.active_salespersons || 0}
                    detail="Currently on duty"
                    icon={Users}
                    trend={0}
                />
            </div>

            <div className="grid grid-cols-3 gap-8">
                {/* Main Sales Chart */}
                <div className="card" style={{ gridColumn: 'span 2' }}>
                    <div className="flex justify-between items-center mb-8">
                        <h3 className="text-xl font-bold">Sales & Interactions</h3>
                        <div className="flex items-center gap-4 text-xs font-bold text-gray-500">
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full gold-gradient" style={{ width: '8px', height: '8px', borderRadius: '50%' }}></div> Sales</span>
                            <span className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--muted-foreground)' }}></div> Visitors</span>
                        </div>
                    </div>
                    <div className="h-[350px] w-full" style={{ height: '350px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={TREND_DATA}>
                                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
                                <XAxis dataKey="name" stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} dy={10} />
                                <YAxis stroke="var(--muted-foreground)" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'var(--card)',
                                        borderColor: 'var(--border)',
                                        color: 'var(--foreground)',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
                                    }}
                                    itemStyle={{ color: 'var(--foreground)' }}
                                    labelStyle={{ color: 'var(--muted-foreground)' }}
                                />
                                <Line type="monotone" dataKey="sales" stroke="#d4af37" strokeWidth={4} dot={{ fill: '#d4af37', r: 6 }} activeDot={{ r: 8 }} />
                                <Line type="monotone" dataKey="interactions" stroke="var(--muted-foreground)" strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Category Split */}
                <div className="card">
                    <h3 className="text-xl font-bold mb-8">Interaction Share</h3>
                    <div className="h-[250px]" style={{ height: '250px' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={CATEGORY_DATA}
                                    innerRadius={60}
                                    outerRadius={90}
                                    paddingAngle={8}
                                    dataKey="value"
                                >
                                    {CATEGORY_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} cornerRadius={10} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                        {CATEGORY_DATA.map((cat, i) => (
                            <div key={cat.name} className="flex justify-between items-center group cursor-default">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[i], width: '8px', height: '8px', borderRadius: '50%' }}></div>
                                    <span className="text-sm font-medium text-gray-400">{cat.name}</span>
                                </div>
                                <span className="text-sm font-black text-white">{cat.value} views</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
