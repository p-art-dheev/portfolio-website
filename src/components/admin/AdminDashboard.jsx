import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'
import {
  Eye, Users, Globe, FileText, Monitor, Smartphone, Tablet,
  LogOut, RefreshCw, ChevronLeft, ChevronRight, BarChart2, Clock,
  TrendingUp, ArrowUpRight
} from 'lucide-react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

// ── Palette ──────────────────────────────────────────────────
const COLORS = ['#059669', '#0d9488', '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899']
const CHART_GRID = 'rgba(255,255,255,0.06)'
const CHART_TICK = 'rgba(255,255,255,0.35)'

// ── Helpers ───────────────────────────────────────────────────
function formatDate(dateStr) {
  if (!dateStr) return ''
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

function formatTimestamp(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  return d.toLocaleString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })
}

// ── Sub-components ────────────────────────────────────────────
function StatCard({ icon: Icon, label, value, sub, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-white/8 p-5 flex flex-col gap-3 hover:border-white/15 transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-white/40 uppercase tracking-wider">{label}</span>
        <div className={`w-8 h-8 rounded-xl flex items-center justify-center ${color}`}>
          <Icon className="w-4 h-4 text-white" />
        </div>
      </div>
      <div>
        <div className="text-3xl font-bold text-white">{value ?? '—'}</div>
        {sub && <div className="text-xs text-white/35 mt-1 truncate">{sub}</div>}
      </div>
    </motion.div>
  )
}

function SectionCard({ title, icon: Icon, children, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className="rounded-2xl border border-white/8 p-5 hover:border-white/12 transition-all"
      style={{ background: 'rgba(255,255,255,0.03)', backdropFilter: 'blur(12px)' }}
    >
      <div className="flex items-center gap-2 mb-5">
        <Icon className="w-4 h-4 text-emerald-400" />
        <span className="text-sm font-semibold text-white/70">{title}</span>
      </div>
      {children}
    </motion.div>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="rounded-xl border border-white/10 px-3 py-2 text-xs shadow-2xl" style={{ background: '#111118' }}>
      <div className="text-white/50 mb-1">{formatDate(label)}</div>
      {payload.map((p, i) => (
        <div key={i} style={{ color: p.color }} className="flex gap-2">
          <span>{p.name}:</span>
          <span className="font-bold">{p.value}</span>
        </div>
      ))}
    </div>
  )
}

// ── Main Dashboard ────────────────────────────────────────────
export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState(null)
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState('30days')
  const [page, setPage] = useState(1)
  const [refreshKey, setRefreshKey] = useState(0)

  const fetchStats = useCallback(async (tf, pg) => {
    setLoading(true)
    try {
      const token = localStorage.getItem('admin_token')
      if (!token) { navigate('/admin'); return }

      const res = await fetch(`${API_BASE}/api/admin/stats?timeframe=${tf}&page=${pg}&limit=10`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      if (res.status === 401 || res.status === 403) {
        localStorage.removeItem('admin_token')
        navigate('/admin')
        return
      }
      const data = await res.json()
      if (data.success) setStats(data.data)
    } catch (err) {
      console.error('Failed to fetch stats:', err)
    } finally {
      setLoading(false)
    }
  }, [navigate])

  useEffect(() => {
    fetchStats(timeframe, page)
  }, [timeframe, page, refreshKey, fetchStats])

  const handleLogout = () => {
    localStorage.removeItem('admin_token')
    navigate('/admin')
  }

  const handleTimeframe = (tf) => {
    setTimeframe(tf)
    setPage(1)
  }

  // Derived values
  const topCountry = stats?.viewsByCountry?.[0]?.country ?? '—'
  const topPath    = stats?.topPaths?.[0]?.path ?? '—'
  const totalPages = stats?.recentVisitors?.totalPages ?? 1

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-white">
      {/* Grid overlay */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.08]"
        style={{
          backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* Glow blobs */}
      <div className="fixed top-0 left-1/4 w-96 h-96 bg-emerald-500/8 rounded-full blur-3xl pointer-events-none" />
      <div className="fixed bottom-0 right-1/4 w-96 h-96 bg-teal-500/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-8">

        {/* ── Header ── */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 flex items-center justify-center shadow-lg shadow-emerald-500/20">
              <BarChart2 className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Analytics Dashboard</h1>
              <p className="text-xs text-white/35">pardheev.online · Live data from Neon</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Refresh */}
            <button
              id="refresh-stats-btn"
              onClick={() => setRefreshKey(k => k + 1)}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/50 border border-white/8 hover:border-white/15 hover:text-white/80 transition-all"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </button>

            {/* Logout */}
            <button
              id="logout-btn"
              onClick={handleLogout}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs text-white/50 border border-white/8 hover:border-red-500/40 hover:text-red-400 transition-all"
            >
              <LogOut className="w-3.5 h-3.5" />
              Logout
            </button>
          </div>
        </div>

        {/* ── Timeframe Selector ── */}
        <div className="flex gap-1.5 mb-7">
          {[
            { key: '7days',  label: '7 Days' },
            { key: '30days', label: '30 Days' },
            { key: 'all',    label: 'All Time' },
          ].map(({ key, label }) => (
            <button
              key={key}
              id={`timeframe-${key}`}
              onClick={() => handleTimeframe(key)}
              className={`px-4 py-1.5 rounded-xl text-xs font-medium transition-all ${
                timeframe === key
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'text-white/40 border border-white/8 hover:border-white/15 hover:text-white/60'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* ── Loading overlay ── */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex justify-center py-20"
            >
              <div className="flex flex-col items-center gap-3">
                <svg className="animate-spin w-8 h-8 text-emerald-500" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                <span className="text-white/30 text-sm">Loading analytics…</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {!loading && stats && (
          <>
            {/* ── Stat Cards ── */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
              <StatCard icon={Eye}         label="Total Views"      value={stats.totalViews?.toLocaleString()}    color="bg-emerald-500/20"  delay={0}   />
              <StatCard icon={Users}       label="Unique Visitors"  value={stats.uniqueVisitors?.toLocaleString()} color="bg-teal-500/20"     delay={0.05}/>
              <StatCard icon={Globe}       label="Top Country"      value={topCountry}                              color="bg-cyan-500/20"     delay={0.1} />
              <StatCard icon={FileText}    label="Top Page"         value={topPath}                                 color="bg-blue-500/20"    delay={0.15}/>
            </div>

            {/* ── Time Series Chart ── */}
            <SectionCard title="Traffic Over Time" icon={TrendingUp} delay={0.2}>
              <ResponsiveContainer width="100%" height={240}>
                <AreaChart data={stats.timeSeries?.map(d => ({ ...d, date: formatDate(d.date) }))}>
                  <defs>
                    <linearGradient id="gViews" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#059669" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="gVisitors" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#0d9488" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#0d9488" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} />
                  <XAxis dataKey="date" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend wrapperStyle={{ color: CHART_TICK, fontSize: 12 }} />
                  <Area type="monotone" dataKey="views"    name="Views"    stroke="#059669" fill="url(#gViews)"    strokeWidth={2} dot={false} />
                  <Area type="monotone" dataKey="visitors" name="Visitors" stroke="#0d9488" fill="url(#gVisitors)" strokeWidth={2} dot={false} />
                </AreaChart>
              </ResponsiveContainer>
            </SectionCard>

            {/* ── Row: Country + Device ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              {/* Country Bar Chart */}
              <SectionCard title="Views by Country" icon={Globe} delay={0.25}>
                <ResponsiveContainer width="100%" height={220}>
                  <BarChart data={stats.viewsByCountry} layout="vertical" margin={{ left: 8, right: 8 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID} horizontal={false} />
                    <XAxis type="number" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis dataKey="country" type="category" tick={{ fill: CHART_TICK, fontSize: 11 }} axisLine={false} tickLine={false} width={36} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="count" name="Views" radius={[0, 6, 6, 0]}>
                      {stats.viewsByCountry?.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </SectionCard>

              {/* Device Pie Chart */}
              <SectionCard title="Device Breakdown" icon={Monitor} delay={0.3}>
                <ResponsiveContainer width="100%" height={220}>
                  <PieChart>
                    <Pie
                      data={stats.viewsByDevice}
                      dataKey="count"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={55}
                      outerRadius={85}
                      paddingAngle={3}
                      strokeWidth={0}
                    >
                      {stats.viewsByDevice?.map((_, i) => (
                        <Cell key={i} fill={COLORS[i % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip
                      formatter={(v, n) => [v, n]}
                      contentStyle={{ background: '#111118', border: '1px solid rgba(255,255,255,0.1)', borderRadius: 12, fontSize: 12 }}
                      labelStyle={{ color: 'rgba(255,255,255,0.5)' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Legend
                      iconType="circle"
                      iconSize={8}
                      wrapperStyle={{ color: CHART_TICK, fontSize: 12 }}
                      formatter={(value, entry) => (
                        <span style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {value === 'Desktop' ? <Monitor className="inline w-3 h-3 mr-1" /> :
                           value === 'Mobile'  ? <Smartphone className="inline w-3 h-3 mr-1" /> :
                                                 <Tablet className="inline w-3 h-3 mr-1" />}
                          {value}
                        </span>
                      )}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </SectionCard>
            </div>

            {/* ── Row: Browsers + Top Pages ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">

              {/* Browser Breakdown */}
              <SectionCard title="Browser Breakdown" icon={BarChart2} delay={0.35}>
                <div className="flex flex-col gap-2.5">
                  {stats.viewsByBrowser?.map((b, i) => {
                    const max = stats.viewsByBrowser[0]?.count || 1
                    const pct = Math.round((b.count / max) * 100)
                    return (
                      <div key={b.name} className="flex items-center gap-3">
                        <span className="text-xs text-white/40 w-16 truncate">{b.name}</span>
                        <div className="flex-1 h-2 rounded-full bg-white/5 overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${pct}%` }}
                            transition={{ delay: 0.4 + i * 0.05, duration: 0.6 }}
                            className="h-full rounded-full"
                            style={{ background: COLORS[i % COLORS.length] }}
                          />
                        </div>
                        <span className="text-xs text-white/50 w-8 text-right">{b.count}</span>
                      </div>
                    )
                  })}
                  {(!stats.viewsByBrowser || stats.viewsByBrowser.length === 0) && (
                    <p className="text-white/25 text-sm text-center py-4">No data yet</p>
                  )}
                </div>
              </SectionCard>

              {/* Top Pages */}
              <SectionCard title="Top Pages" icon={FileText} delay={0.4}>
                <div className="flex flex-col gap-2">
                  {stats.topPaths?.map((p, i) => (
                    <div key={p.path} className="flex items-center gap-3 py-1.5 border-b border-white/5 last:border-0">
                      <span className="text-xs text-white/20 w-4 text-center">{i + 1}</span>
                      <span className="flex-1 text-sm text-white/70 font-mono truncate">{p.path}</span>
                      <div className="flex items-center gap-1 text-emerald-400">
                        <ArrowUpRight className="w-3 h-3" />
                        <span className="text-xs font-semibold">{p.count}</span>
                      </div>
                    </div>
                  ))}
                  {(!stats.topPaths || stats.topPaths.length === 0) && (
                    <p className="text-white/25 text-sm text-center py-4">No data yet</p>
                  )}
                </div>
              </SectionCard>
            </div>

            {/* ── Recent Visitors ── */}
            <SectionCard title="Recent Visitors" icon={Clock} delay={0.45}>
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-white/6">
                      {['IP', 'Country', 'Page', 'Time'].map(h => (
                        <th key={h} className="text-left pb-3 pr-4 text-white/30 font-medium uppercase tracking-wider text-[10px]">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentVisitors?.data?.map((v, i) => (
                      <motion.tr
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 + i * 0.03 }}
                        className="border-b border-white/4 hover:bg-white/3 transition-colors"
                      >
                        <td className="py-2.5 pr-4 font-mono text-white/50">{v.ip}</td>
                        <td className="py-2.5 pr-4 text-white/60">{v.country || '—'}</td>
                        <td className="py-2.5 pr-4 font-mono text-emerald-400/80">{v.path}</td>
                        <td className="py-2.5 text-white/35 whitespace-nowrap">{formatTimestamp(v.timestamp)}</td>
                      </motion.tr>
                    ))}
                    {(!stats.recentVisitors?.data || stats.recentVisitors.data.length === 0) && (
                      <tr>
                        <td colSpan={4} className="text-center text-white/25 py-8">No visits recorded yet</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/6">
                  <span className="text-xs text-white/30">
                    Page {page} of {totalPages} · {stats.recentVisitors?.total?.toLocaleString()} total
                  </span>
                  <div className="flex gap-2">
                    <button
                      id="prev-page-btn"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-white/8 text-white/40 hover:border-white/20 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      <ChevronLeft className="w-3 h-3" /> Prev
                    </button>
                    <button
                      id="next-page-btn"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={page === totalPages}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs border border-white/8 text-white/40 hover:border-white/20 hover:text-white/70 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
                    >
                      Next <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              )}
            </SectionCard>

          </>
        )}

        {/* Empty state */}
        {!loading && !stats && (
          <div className="text-center py-20 text-white/25">
            <BarChart2 className="w-12 h-12 mx-auto mb-4 opacity-30" />
            <p>Could not load analytics. Is the backend server running?</p>
          </div>
        )}

      </div>
    </div>
  )
}
