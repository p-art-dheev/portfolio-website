import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub } from 'react-icons/fa'
import { useEffect, useState, useMemo } from 'react'

const CONTRIBUTION_LEVELS = [
  'bg-[--color-contrib-0]',
  'bg-[#0e4429]',
  'bg-[#006d32]',
  'bg-[#26a641]',
  'bg-[#39d353]',
]

const getLevel = (count) =>
  count === 0 ? 0 : count <= 3 ? 1 : count <= 6 ? 2 : count <= 9 ? 3 : 4

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

  return (
    <div ref={ref} className="glass-card p-6">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-2 theme-text-sub">
          <FaGithub className="text-xl" />
          <span className="font-display font-semibold text-xs uppercase" style={{ letterSpacing: '0.1em' }}>GitHub Contributions</span>
        </div>

        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-3 text-xs">
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

          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-primary-500 hover:text-primary-400 transition-colors"
          >
            @{username}
          </a>
          <a
            href={apiUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 text-xs text-primary-400/80 hover:text-primary-300 transition-colors"
          >
            Open API
          </a>
          {fetchError && (
            <div className="w-full text-xs text-red-400 mt-2">API error: {fetchError}</div>
          )}
        </div>
      </div>

      <div>
        <div className="relative mb-4">
          <div className="absolute left-0 top-0 bottom-0 grid grid-rows-7 gap-[4px] text-xs text-muted" style={{ width: 36 }}>
            {Array.from({ length: 7 }).map((_, idx) => (
              <div key={idx} className="h-3 flex items-center">
                {idx === 1 ? 'Mon' : idx === 3 ? 'Wed' : idx === 5 ? 'Fri' : ''}
              </div>
            ))}
          </div>

          <div className="pl-10">
            <div
              className=""
              style={{
                display: 'grid',
                gridAutoFlow: 'column',
                gridTemplateRows: 'repeat(7, minmax(0, 1fr))',
                gridAutoColumns: 'minmax(0, 1fr)',
                columnGap: '3px',
                rowGap: '3px'
              }}
            >
              {contributions.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.001 }}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125 flex items-center justify-center`}
                  style={day.level === 0 ? { backgroundColor: 'var(--color-contrib-0)' } : undefined}
                  title={formatContribTitle(day.date, day.count)}
                >
                  {day.level > 0 && (
                    <div className={`w-full h-full rounded-sm ${CONTRIBUTION_LEVELS[day.level]}`} />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-2 text-xs theme-text-muted">
          <span>Less</span>
          <div className="flex gap-1">
            {CONTRIBUTION_LEVELS.map((cls, i) => (
              <div
                key={i}
                className={`w-3 h-3 rounded-sm`}
                style={i === 0 ? { backgroundColor: 'var(--color-contrib-0)' } : undefined}
              >
                {i > 0 && <div className={`w-full h-full rounded-sm ${cls}`} />}
              </div>
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
    </div>
  )
}

export default GitHubContributions
