import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub } from 'react-icons/fa'
import React, { useEffect, useState, useMemo, useRef } from 'react'

const getLevel = (count) =>
  count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4

// 3D Isometric constants
const CAM = { vX_x: 28, vX_y: 14, vY_x: -28, vY_y: 14 };
const HEIGHTS = [4, 20, 40, 60, 80];

const IsometricBlock = ({ x, y, level, date, count, setHoverInfo }) => {
  const { vX_x, vX_y, vY_x, vY_y } = CAM;
  const cx = x * vX_x + y * vY_x;
  const cy = x * vX_y + y * vY_y;
  
  const h = HEIGHTS[level] || 4;
  const [hovered, setHovered] = React.useState(false);
  
  const gap = 0.85;
  const bx_x = vX_x * gap;
  const bx_y = vX_y * gap;
  const by_x = vY_x * gap;
  const by_y = vY_y * gap;

  const c0_x = -(bx_x + by_x) / 2;
  const c0_y = -(bx_y + by_y) / 2;

  const p0 = { x: cx + c0_x, y: cy + c0_y - h };
  const p1 = { x: p0.x + bx_x, y: p0.y + bx_y };
  const p2 = { x: p1.x + by_x, y: p1.y + by_y };
  const p3 = { x: p0.x + by_x, y: p0.y + by_y };

  const pTop = `${p0.x},${p0.y} ${p1.x},${p1.y} ${p2.x},${p2.y} ${p3.x},${p3.y}`;
  
  const f3 = { x: p3.x, y: p3.y + h };
  const f2 = { x: p2.x, y: p2.y + h };
  const pLeft = `${p3.x},${p3.y} ${p2.x},${p2.y} ${f2.x},${f2.y} ${f3.x},${f3.y}`;

  const f1 = { x: p1.x, y: p1.y + h };
  const pRight = `${p2.x},${p2.y} ${p1.x},${p1.y} ${f1.x},${f1.y} ${f2.x},${f2.y}`;

  const cTop = `var(--color-contrib-${level})`;
  const cLeft = `var(--color-contrib-${level}-l)`;
  const cRight = `var(--color-contrib-${level}-r)`;

  // Center of top face for label
  const topCx = (p0.x + p2.x) / 2;
  const topCy = (p0.y + p2.y) / 2;

  return (
    <g 
      className="cursor-pointer" 
      style={{ transition: 'transform 0.2s' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setHoverInfo(null); }}
    >
      <polygon points={pLeft} fill={cLeft} stroke={cLeft} strokeWidth="0.5" />
      <polygon points={pRight} fill={cRight} stroke={cRight} strokeWidth="0.5" />
      <polygon points={pTop} fill={cTop} stroke={cTop} strokeWidth="0.5" />
      {hovered && count > 0 && (() => {
        const label1 = `${count} commit${count !== 1 ? 's' : ''}`;
        const label2 = date ? (() => { const d = new Date(date + 'T00:00:00Z'); return `${MONTHS[d.getMonth()].slice(0,3)} ${d.getDate()}`; })() : '';
        const maxLen = Math.max(label1.length, label2.length);
        const rw = maxLen * 6 + 12;
        const rh = label2 ? 26 : 16;
        return (
          <>
            <rect
              x={topCx - rw / 2}
              y={topCy - rh - 6}
              width={rw}
              height={rh}
              rx={4}
              fill="rgba(8,16,26,0.92)"
              stroke="rgba(16,185,129,0.5)"
              strokeWidth="1"
            />
            <text
              x={topCx}
              y={topCy - rh + 2}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize="10"
              fill="#10b981"
              fontFamily="monospace"
              fontWeight="bold"
            >
              {label1}
            </text>
            {label2 && (
              <text
                x={topCx}
                y={topCy - 10}
                textAnchor="middle"
                dominantBaseline="middle"
                fontSize="9"
                fill="#94a3b8"
                fontFamily="monospace"
              >
                {label2}
              </text>
            )}
          </>
        );
      })()}
    </g>
  );
}

const calculateStreaks = (contributions) => {
  let total = 0, longest = 0, tempStreak = 0, current = 0

  contributions.forEach((c) => {
    total += c.count
    if (c.count > 0) { tempStreak++; if (tempStreak > longest) longest = tempStreak }
    else tempStreak = 0
  })

  for (let i = contributions.length - 1; i >= 0; i--) {
    if (contributions[i].count > 0) current++; else break
  }

  return { total, current, longest }
}

const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']

const ordinal = (n) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

  const formatContribTitle = (date, count) => {
  if (!date) return `${count} contributions`
  const d = new Date(date + 'T00:00:00Z')
  const month = MONTHS[d.getMonth()]
  const day = ordinal(d.getDate())
  return `${count} contribution${count !== 1 ? 's' : ''} on ${month} ${day}`
}

const GitHubContributions = ({ username = '', startYear = 2020 }) => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contributions, setContributions] = useState([])
  const [selectedYear, setSelectedYear] = useState('last')
  const [stats, setStats] = useState({ total: 0, current: 0, longest: 0 })
  const [viewMode, setViewMode] = useState('2d')
  const [hoverInfo, setHoverInfo] = useState(null)

  const currentYear = new Date().getFullYear()
  const years = useMemo(
    () => Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i),
    [currentYear, startYear],
  )

  const [fetchError, setFetchError] = useState(null)
  const [rawData, setRawData] = useState(null)
  const apiUrl = selectedYear === 'last'
    ? `https://github-contributions-api.jogruber.de/v4/${username}`
    : `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`

  useEffect(() => {
    let cancelled = false

    const fetchContributions = async () => {
      try {
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        console.debug('GitHub contributions API response:', data)
        setRawData(data)
        if (cancelled || !data.contributions) return

        const mapped = data.contributions.map((c) => ({
          date: c.date,
          count: c.count,
          level: getLevel(c.count),
        }))
        // Ensure chronological order (oldest first)
        mapped.sort((a, b) => new Date(a.date + 'T00:00:00Z') - new Date(b.date + 'T00:00:00Z'))

        let final = mapped
        if (selectedYear === 'last') {
          const today = new Date()
          const start = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
          start.setUTCDate(start.getUTCDate() - 364) // include today => 365 days
          const end = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
          final = mapped.filter((c) => {
            const d = new Date(c.date + 'T00:00:00Z')
            return d >= start && d <= end
          })
        }

        // compute stats from the real final days (without week-padding)
        setStats(calculateStreaks(final))

        // pad only leading days so first column aligns to week start (Sunday).
        let padded = final.slice()
        if (padded.length > 0 && padded[0].date) {
          const firstDate = new Date(padded[0].date + 'T00:00:00Z')
          const leading = firstDate.getUTCDay() // 0=Sun .. 6=Sat
          const leadPads = Array.from({ length: leading }, () => ({ date: null, count: 0, level: 0 }))
          padded = leadPads.concat(padded)
        }

        // do NOT add trailing pads — this avoids showing future placeholder tiles
        setContributions(padded)
      } catch (err) {
        console.error('GitHub contributions fetch failed:', err)
        setFetchError(String(err))
        if (cancelled) return
        const fallback = Array.from({ length: 365 }, () => {
          const count = Math.floor(Math.random() * 20)
          return { date: null, count, level: getLevel(count) }
        })
        setContributions(fallback)
        setStats(calculateStreaks(fallback))
      }
    }

    if (username) fetchContributions()
    return () => { cancelled = true }
  }, [username, selectedYear, startYear])

  const scrollContainerRef = useRef(null)

  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollLeft = scrollContainerRef.current.scrollWidth
    }
  }, [contributions])

  // Calculate dynamic bounding box for SVG based on current camera angle
  const viewBoxStr = useMemo(() => {
    if (viewMode !== '3d') return "0 0 0 0";
    const corners = [
      { x: 0, y: 0 },
      { x: 52, y: 0 },
      { x: 0, y: 6 },
      { x: 52, y: 6 },
    ];
    const projected = corners.map(c => ({
      cx: c.x * CAM.vX_x + c.y * CAM.vY_x,
      cy: c.x * CAM.vX_y + c.y * CAM.vY_y,
    }));
    const minX = Math.min(...projected.map(p => p.cx));
    const maxX = Math.max(...projected.map(p => p.cx));
    const minY = Math.min(...projected.map(p => p.cy));
    const maxY = Math.max(...projected.map(p => p.cy));
    
    // Extra padding for block heights and labels
    const pX = 50;
    const pTop = 60; 
    const pBottom = 20;

    return `${minX - pX} ${minY - pTop} ${(maxX - minX) + pX * 2} ${(maxY - minY) + pTop + pBottom}`;
  }, [viewMode]);

  return (
    <motion.div layout ref={ref} className="glass-card p-6 relative" transition={{ duration: 0.3, ease: 'easeInOut' }}>
      
      {/* Custom Tooltip */}
      <AnimatePresence>
        {hoverInfo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 5 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 5 }}
            transition={{ duration: 0.15 }}
            className="fixed z-50 pointer-events-none whitespace-nowrap transform -translate-x-1/2 -translate-y-full"
            style={{ top: hoverInfo.y - 8, left: hoverInfo.x }}
          >
            <div className="px-3 py-2 rounded-lg shadow-2xl border text-center" style={{ background: 'rgba(8,16,26,0.95)', borderColor: 'rgba(16,185,129,0.4)' }}>
              <div className="text-[13px] font-bold font-mono" style={{ color: '#10b981' }}>
                {hoverInfo.count} commit{hoverInfo.count !== 1 ? 's' : ''}
              </div>
              {hoverInfo.dateStr && (
                <div className="text-[11px] font-mono mt-0.5" style={{ color: '#94a3b8' }}>
                  {hoverInfo.dateStr}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 theme-text-sub">
          <FaGithub className="text-xl" />
          <span className="font-display font-semibold text-xs uppercase" style={{ letterSpacing: '0.1em' }}>GitHub Contributions</span>
        </div>

          <motion.div layout className="flex items-center gap-3 flex-wrap">
            <div className="hidden sm:flex items-center gap-3 text-xs">
              {[
                { label: 'Total', value: stats.total },
                { label: 'Current', value: `${stats.current} days` },
                { label: 'Longest', value: `${stats.longest} days` },
              ].map(({ label, value }) => (
                <div key={label} className="px-3 py-1 theme-surface rounded-md">
                  <span className="theme-text-muted">{label}: </span>
                  <span className="text-primary-500 font-semibold">{value}</span>
                </div>
              ))}
            </div>

            <select
              value={selectedYear}
              onChange={(e) => {
                const val = e.target.value
                setSelectedYear(val === 'last' ? 'last' : Number(val))
              }}
              className="px-3 py-1 theme-surface border theme-border rounded-md text-sm text-primary-500 font-mono cursor-pointer theme-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50 appearance-none bg-no-repeat bg-[length:14px] bg-[right_6px_center] pr-6"
              style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2310b981'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E")` }}
            >
            <option value="last">Last year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>

          <div className="flex items-center theme-surface border theme-border rounded-md overflow-hidden">
            <button 
              onClick={() => setViewMode('2d')} 
              className={`px-3 py-1 text-xs font-mono font-semibold transition-colors ${viewMode === '2d' ? 'bg-primary-500 text-white' : 'theme-text-muted hover:text-primary-500'}`}
            >
              2D
            </button>
            <button 
              onClick={() => setViewMode('3d')} 
              className={`px-3 py-1 text-xs font-mono font-semibold transition-colors ${viewMode === '3d' ? 'bg-primary-500 text-white' : 'theme-text-muted hover:text-primary-500'}`}
            >
              3D
            </button>
          </div>

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:text-primary-400 transition-colors"
          >
            @{username}
          </a>
          {fetchError && (
            <div className="w-full text-xs text-red-400 mt-2">API error: {fetchError}</div>
          )}
        </motion.div>
      </motion.div>

      <motion.div layout>
        <motion.div layout className="flex items-start gap-2 mb-4">
          {viewMode === '2d' && (
            <div
              className="flex-shrink-0 select-none"
              style={{
                width: 28,
                display: 'grid',
                gridTemplateRows: 'repeat(7, 13px)',
                gap: '3px',
              }}
            >
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, idx) => (
                <div key={idx} className="h-[13px] flex items-center font-mono text-[10px] theme-text-muted leading-none">
                  {day}
                </div>
              ))}
            </div>
          )}

          <div ref={scrollContainerRef} className="flex-1 overflow-x-auto pb-3 custom-scrollbar">
            <AnimatePresence mode="wait">
              {viewMode === '3d' ? (
                <motion.div 
                  key="3d"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="w-full flex flex-col items-center pt-4"
                >
                  <svg 
                    width="100%" 
                    viewBox={viewBoxStr} 
                    style={{ filter: 'drop-shadow(0 10px 15px rgba(0,0,0,0.2))' }}
                  >
                    <g className="days-labels">
                      {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((day, y) => {
                        if (!day) return null;
                        const cx = (-1.5) * CAM.vX_x + y * CAM.vY_x;
                        const cy = (-1.5) * CAM.vX_y + y * CAM.vY_y;
                        return (
                          <text 
                            key={y} 
                            x={cx - 5} 
                            y={cy} 
                            className="text-[12px] theme-text-muted fill-current font-mono"
                            alignmentBaseline="middle"
                            textAnchor="end"
                          >
                            {day}
                          </text>
                        )
                      })}
                    </g>
                    {contributions
                      .map((day, i) => ({ ...day, x: Math.floor(i / 7), y: i % 7 }))
                      .sort((a, b) => {
                         const cyA = a.x * CAM.vX_y + a.y * CAM.vY_y;
                         const cyB = b.x * CAM.vX_y + b.y * CAM.vY_y;
                         return cyA - cyB;
                      })
                      .map((day, i) => (
                        <IsometricBlock key={i} {...day} setHoverInfo={setHoverInfo} />
                      ))}
                  </svg>
                </motion.div>
              ) : (
                <motion.div
                  key="2d"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="min-w-max w-full"
                  style={{
                    display: 'grid',
                    gridAutoFlow: 'column',
                    gridTemplateRows: 'repeat(7, 13px)',
                    gridAutoColumns: '13px',
                    rowGap: '3px',
                    columnGap: '3px',
                    justifyContent: 'space-between'
                  }}
                >
                  {contributions.map((day, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={inView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: i * 0.001 }}
                      className="w-[13px] h-[13px] rounded-sm cursor-pointer transition-transform hover:scale-125"
                      style={{ backgroundColor: `var(--color-contrib-${day.level})` }}
                      onMouseEnter={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const d = day.date ? new Date(day.date + 'T00:00:00Z') : null;
                        const dateStr = d ? `${MONTHS[d.getMonth()]} ${ordinal(d.getDate())}` : null;
                        setHoverInfo({ x: rect.left + rect.width / 2, y: rect.top, count: day.count, dateStr });
                      }}
                      onMouseLeave={() => setHoverInfo(null)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        <motion.div layout className="flex items-center justify-end gap-2 text-xs theme-text-muted">
          <span>Less</span>
          <div className="flex gap-1">
            {[0, 1, 2, 3, 4].map((level) => (
              <div
                key={level}
                className="w-3 h-3 rounded-sm"
                style={{ backgroundColor: `var(--color-contrib-${level})` }}
              />
            ))}
          </div>
          <span>More</span>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default GitHubContributions
