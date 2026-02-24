import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    AreaChart, Area, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer
} from 'recharts';
import { Users, MousePointerClick, FileText, Loader2, AlertCircle, ArrowUpRight, ArrowDownRight, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

// Format Date directly to IST timezone
const formatIST = (dateString, options = {}) => {
    return new Date(dateString).toLocaleString('en-IN', {
        timeZone: 'Asia/Kolkata',
        ...options
    });
};

export default function AdminDashboard() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    // Controls
    const [timeframe, setTimeframe] = useState('30days');
    const [chartType, setChartType] = useState('line'); // 'line' or 'bar'
    const [page, setPage] = useState(1);
    const limit = 5; // Pagination limit for table

    const navigate = useNavigate();

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [timeframe, page]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const res = await fetch(`/api/admin/stats?timeframe=${timeframe}&page=${page}&limit=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const json = await res.json();

            if (res.status === 401 || res.status === 403) {
                localStorage.removeItem('adminToken');
                navigate('/admin/login');
                return;
            }

            if (json.success) {
                setData(json.data);
            } else {
                setError(json.message || 'Failed to load data');
            }
        } catch (err) {
            setError('Connection error');
        } finally {
            setLoading(false);
        }
    };

    if (loading && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-indigo-500">
                <Loader2 className="animate-spin w-12 h-12 mb-4" />
                <p className="text-slate-500 font-medium animate-pulse">Loading Insights...</p>
            </div>
        );
    }

    if (error && !data) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[60vh] text-red-500">
                <AlertCircle className="w-16 h-16 mb-4 opacity-50" />
                <p className="text-xl font-semibold mb-2">Error Loading Dashboard</p>
                <p className="text-slate-500">{error}</p>
                <button
                    onClick={fetchData}
                    className="mt-6 px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-xl text-white font-medium transition"
                >
                    Try Again
                </button>
            </div>
        );
    }

    // Format time series data for charts
    const chartData = data?.timeSeries?.map(item => ({
        date: formatIST(item.date, { month: 'short', day: 'numeric' }),
        views: item.views,
        visitors: item.visitors // Using real unique visitor count per day
    })) || [];

    // Pagination Props
    const recentFeedInfo = data?.recentVisitors || { data: [], total: 0, totalPages: 1 };
    const hasNextPage = page < recentFeedInfo.totalPages;
    const hasPrevPage = page > 1;

    // Calculations for dynamic insights
    const topCountry = data?.viewsByCountry?.[0];
    const topCountryPct = topCountry && data?.totalViews ? Math.round((topCountry.count / data.totalViews) * 100) : 0;

    return (
        <div className="space-y-6 pb-20 max-w-[1400px] mx-auto select-none">

            {/* Top Controls */}
            {loading && !data && (
                <div className="fixed top-24 right-8 bg-white shadow-lg border border-slate-100 rounded-full p-2 text-indigo-500 animate-spin z-50">
                    <Loader2 size={20} />
                </div>
            )}

            {/* KPI Cards Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-dark-500 rounded-2xl p-6 shadow-sm border border-dark-400 col-span-1 min-h-[140px] flex flex-col justify-between group hover:border-primary-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <button className="text-xs font-semibold text-dark-200 hover:text-dark-100 transition flex items-center gap-1">
                            View details <ChevronRight size={14} />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{data?.uniqueVisitors}</h3>
                        <p className="text-sm font-medium text-dark-100">Unique Visitors</p>
                    </div>
                </div>
                {/* Card 2 */}
                <div className="bg-dark-500 rounded-2xl p-6 shadow-sm border border-dark-400 col-span-1 min-h-[140px] flex flex-col justify-between group hover:border-primary-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                            <MousePointerClick size={24} />
                        </div>
                        <button className="text-xs font-semibold text-dark-200 hover:text-dark-100 transition flex items-center gap-1">
                            View details <ChevronRight size={14} />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{data?.totalViews}</h3>
                        <p className="text-sm font-medium text-dark-100">Page Views</p>
                    </div>
                </div>
                {/* Card 3 */}
                <div className="bg-dark-500 rounded-2xl p-6 shadow-sm border border-dark-400 col-span-1 min-h-[140px] flex flex-col justify-between group hover:border-primary-500/50 transition-colors">
                    <div className="flex justify-between items-start mb-4">
                        <div className="w-12 h-12 rounded-xl bg-primary-500/10 text-primary-500 flex items-center justify-center">
                            <FileText size={24} />
                        </div>
                        <button className="text-xs font-semibold text-dark-200 hover:text-dark-100 transition flex items-center gap-1">
                            View details <ChevronRight size={14} />
                        </button>
                    </div>
                    <div>
                        <h3 className="text-3xl font-bold text-white mb-1">{data?.topPaths?.length || 0}</h3>
                        <p className="text-sm font-medium text-dark-100">Active Paths</p>
                    </div>
                </div>
            </div>

            {/* Charts Column (Stacked) */}
            <div className="flex flex-col gap-6">

                {/* Visitors Chart */}
                <div className="bg-dark-500 rounded-2xl p-6 shadow-sm border border-dark-400 flex flex-col h-[320px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-white">Unique Visitor</h3>
                        <div className="flex items-center gap-4">
                            {/* Chart Toggle */}
                            <div className="flex bg-dark-600 rounded-lg p-1 border border-dark-400">
                                <button
                                    onClick={() => setChartType('line')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${chartType === 'line' ? 'bg-primary-500 text-white' : 'text-dark-200 hover:text-white'}`}
                                >
                                    Line
                                </button>
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${chartType === 'bar' ? 'bg-primary-500 text-white' : 'text-dark-200 hover:text-white'}`}
                                >
                                    Bar
                                </button>
                            </div>
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent text-xs font-semibold text-dark-100 focus:outline-none cursor-pointer"
                            >
                                <option value="7days" className="text-dark-600">Last 7 Days</option>
                                <option value="30days" className="text-dark-600">Last 30 Days</option>
                                <option value="all" className="text-dark-600">All Time</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-3xl font-bold text-white">{data?.uniqueVisitors}</span>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'line' ? (
                                <LineChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a24" />
                                    <XAxis dataKey="date" stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <YAxis allowDecimals={false} stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #1a1a24', backgroundColor: '#13131a', color: '#e8e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} itemStyle={{ color: '#10b981' }} />
                                    <Line type="monotone" dataKey="visitors" stroke="#10b981" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                </LineChart>
                            ) : (
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorVisitorBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#10b981" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#059669" stopOpacity={0.5} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a24" />
                                    <XAxis dataKey="date" stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <YAxis allowDecimals={false} stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #1a1a24', backgroundColor: '#13131a', color: '#e8e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} itemStyle={{ color: '#10b981' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                    <Bar dataKey="visitors" fill="url(#colorVisitorBar)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Page Views Chart */}
                <div className="bg-dark-500 rounded-2xl p-6 shadow-sm border border-dark-400 flex flex-col h-[320px]">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-base font-bold text-white">Page Views</h3>
                        <div className="flex items-center gap-4">
                            {/* Chart Toggle */}
                            <div className="flex bg-dark-600 rounded-lg p-1 border border-dark-400">
                                <button
                                    onClick={() => setChartType('line')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${chartType === 'line' ? 'bg-primary-500 text-white' : 'text-dark-200 hover:text-white'}`}
                                >
                                    Line
                                </button>
                                <button
                                    onClick={() => setChartType('bar')}
                                    className={`px-3 py-1 text-xs font-bold rounded-md transition ${chartType === 'bar' ? 'bg-primary-500 text-white' : 'text-dark-200 hover:text-white'}`}
                                >
                                    Bar
                                </button>
                            </div>
                            <select
                                value={timeframe}
                                onChange={(e) => setTimeframe(e.target.value)}
                                className="bg-transparent text-xs font-semibold text-dark-100 focus:outline-none cursor-pointer"
                            >
                                <option value="7days" className="text-dark-600">Last 7 Days</option>
                                <option value="30days" className="text-dark-600">Last 30 Days</option>
                                <option value="all" className="text-dark-600">All Time</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-end gap-3 mb-6">
                        <span className="text-3xl font-bold text-white">{data?.totalViews}</span>
                    </div>
                    <div className="flex-1 w-full min-h-0">
                        <ResponsiveContainer width="100%" height="100%">
                            {chartType === 'line' ? (
                                <LineChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a24" />
                                    <XAxis dataKey="date" stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <YAxis allowDecimals={false} stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #1a1a24', backgroundColor: '#13131a', color: '#e8e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} itemStyle={{ color: '#34d399' }} />
                                    <Line type="monotone" dataKey="views" stroke="#34d399" strokeWidth={3} dot={false} activeDot={{ r: 6 }} />
                                </LineChart>
                            ) : (
                                <BarChart data={chartData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="colorViewsBar" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor="#34d399" stopOpacity={1} />
                                            <stop offset="100%" stopColor="#10b981" stopOpacity={0.5} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#1a1a24" />
                                    <XAxis dataKey="date" stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <YAxis allowDecimals={false} stroke="#4a4a5a" tick={{ fill: '#6e6e7e', fontSize: 10 }} tickLine={false} axisLine={false} />
                                    <RechartsTooltip contentStyle={{ borderRadius: '12px', border: '1px solid #1a1a24', backgroundColor: '#13131a', color: '#e8e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)', fontSize: '12px' }} itemStyle={{ color: '#34d399' }} cursor={{ fill: 'rgba(255,255,255,0.05)' }} />
                                    <Bar dataKey="views" fill="url(#colorViewsBar)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            )}
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

            {/* Pages and Devices Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Pages (Horizontal Bars) */}
                <div className="bg-dark-500 rounded-2xl shadow-sm border border-dark-400 col-span-1 lg:col-span-2 flex flex-col min-h-[400px]">
                    <div className="p-6 border-b border-dark-400 flex items-center justify-between">
                        <h3 className="text-base font-bold text-white">Top Paths</h3>
                    </div>

                    <div className="p-6 flex-1 overflow-auto">
                        <div className="flex justify-between text-xs font-bold text-dark-200 mb-6 uppercase tracking-wider px-2">
                            <span>Pages Name</span>
                            <span>Visitors</span>
                        </div>

                        <div className="space-y-5">
                            {data?.topPaths?.length > 0 ? (
                                data.topPaths.map((item, i) => {
                                    const maxCount = data.topPaths[0].count;
                                    const percentage = Math.max((item.count / maxCount) * 100, 5); // Ensure min width
                                    return (
                                        <div key={i} className="flex items-center gap-4 group">
                                            <div className="w-32 text-sm font-bold text-dark-50 truncate">{item.path === '/' ? '/Home page' : item.path}</div>
                                            <div className="flex-1 flex items-center">
                                                <div
                                                    className="h-3 rounded-full bg-gradient-to-r from-primary-600 to-primary-400 transition-all duration-1000 ease-out"
                                                    style={{ width: `${percentage}%` }}
                                                ></div>
                                            </div>
                                            <div className="w-12 text-right text-sm font-bold text-white">{item.count}</div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="text-center text-dark-200 py-10">No page data</div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Device Users */}
                <div className="bg-dark-500 rounded-2xl shadow-sm border border-dark-400 flex flex-col min-h-[400px]">
                    <div className="p-6 border-b border-dark-400 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-white">Device Types</h3>
                    </div>

                    <div className="p-6 flex-1 flex flex-col">
                        <p className="text-xs font-semibold text-dark-200 mb-1">Total Visitors ({timeframe})</p>
                        <div className="flex items-end gap-2 mb-8">
                            <span className="text-3xl font-bold text-white">{data?.totalViews}</span>
                        </div>

                        <div className="space-y-6 flex-1">
                            {data?.viewsByDevice?.length > 0 ? (
                                data.viewsByDevice.map((dev, i) => {
                                    const total = data.totalViews;
                                    const pct = Math.round((dev.count / total) * 100);
                                    return (
                                        <div key={i} className="relative">
                                            <div className="flex justify-between text-xs font-semibold text-dark-50 mb-2">
                                                <span>{dev.name === 'Desktop' ? 'Mac/Win' : dev.name}</span>
                                                <span>{pct}%</span>
                                            </div>
                                            <div className="w-full h-2 bg-dark-400 rounded-full overflow-hidden">
                                                <div className="h-full bg-primary-500 rounded-full" style={{ width: `${pct}%` }}></div>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : (
                                <div className="text-center text-dark-200 py-4">No device data</div>
                            )}
                        </div>

                        <div className="mt-6 flex items-center justify-between text-xs">
                            <span className="font-semibold text-dark-200">You almost maintain very good statistics</span>
                            <a href="#" className="font-bold text-primary-500 flex items-center gap-1 hover:underline">
                                View report <ArrowUpRight size={12} />
                            </a>
                        </div>
                    </div>
                </div>

            </div>

            {/* Paginated Data Table (Recent Visitors) */}
            <div className="bg-dark-500 rounded-2xl shadow-sm border border-dark-400 flex flex-col">
                <div className="p-6 border-b border-dark-400 flex items-center justify-between">
                    <h3 className="text-lg font-bold text-white">Recent Visitors Feed</h3>
                    <div className="text-sm font-medium text-dark-200">
                        Total logs: <span className="font-bold text-white">{recentFeedInfo.total}</span>
                    </div>
                </div>

                <div className="w-full overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr className="bg-dark-400/30 text-dark-200 text-xs font-bold uppercase tracking-wider border-b border-dark-400">
                                <th className="py-4 px-6">Timestamp (IST)</th>
                                <th className="py-4 px-6">Location</th>
                                <th className="py-4 px-6">URL Path</th>
                                <th className="py-4 px-6">IP Address</th>
                            </tr>
                        </thead>
                        <tbody className="text-sm align-middle text-dark-50">
                            {recentFeedInfo.data?.length > 0 ? (
                                recentFeedInfo.data.map((v, i) => (
                                    <tr key={i} className="border-b border-dark-400/50 hover:bg-dark-400/50 transition group">
                                        <td className="py-4 px-6 font-medium">
                                            {formatIST(v.timestamp, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                        </td>
                                        <td className="py-4 px-6">
                                            <div className="flex items-center gap-2 font-semibold">
                                                <MapPin size={14} className="text-primary-500" />
                                                {v.country || 'Unknown'}
                                            </div>
                                        </td>
                                        <td className="py-4 px-6 font-mono text-xs font-bold text-primary-400">{v.path}</td>
                                        <td className="py-4 px-6 font-mono text-dark-200 group-hover:text-dark-50 transition">
                                            {v.ip}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="4" className="py-8 text-center text-dark-200">No recent activity detected on this page.</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Controls */}
                <div className="p-4 border-t border-dark-400 flex items-center justify-between bg-dark-400/10 rounded-b-2xl">
                    <p className="text-sm font-medium text-dark-200 pl-2">
                        Showing <span className="font-bold text-white">{((page - 1) * limit) + (recentFeedInfo.data?.length > 0 ? 1 : 0)}</span> to <span className="font-bold text-white">{Math.min(page * limit, recentFeedInfo.total)}</span> of <span className="font-bold text-white">{recentFeedInfo.total}</span> results
                    </p>
                    <div className="flex items-center gap-2 pr-2">
                        <button
                            onClick={() => setPage(p => Math.max(1, p - 1))}
                            disabled={!hasPrevPage}
                            className={`p-1.5 rounded-lg border flex items-center justify-center transition ${hasPrevPage ? 'bg-dark-400 border-dark-300 text-white hover:bg-dark-300' : 'bg-dark-500 border-dark-400 text-dark-300 cursor-not-allowed'}`}
                        >
                            <ChevronLeft size={16} />
                        </button>
                        <div className="px-3 py-1 bg-primary-500/20 border border-primary-500/30 text-primary-400 text-sm font-bold rounded-lg">
                            {page}
                        </div>
                        <button
                            onClick={() => setPage(p => Math.min(recentFeedInfo.totalPages, p + 1))}
                            disabled={!hasNextPage}
                            className={`p-1.5 rounded-lg border flex items-center justify-center transition ${hasNextPage ? 'bg-dark-400 border-dark-300 text-white hover:bg-dark-300' : 'bg-dark-500 border-dark-400 text-dark-300 cursor-not-allowed'}`}
                        >
                            <ChevronRight size={16} />
                        </button>
                    </div>
                </div>

            </div>

        </div >
    );
}
