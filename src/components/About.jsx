import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { FaGithub } from 'react-icons/fa'
import { useEffect, useState, useMemo } from 'react'
import { config } from '../config'

/** GitHub-style contribution colors — adapts via CSS variable for level 0 */
const CONTRIBUTION_LEVELS = [
  'bg-[--color-contrib-0]',
  'bg-primary-900',
  'bg-primary-700',
  'bg-primary-500',
  'bg-primary-300',
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
  const d = new Date(date + 'T00:00:00')
  const month = MONTHS[d.getMonth()]
  const day = ordinal(d.getDate())
  return `${count} contribution${count !== 1 ? 's' : ''} on ${month} ${day}`
}

const About = () => {
  const [ref, inView] = useInView({ triggerOnce: true, threshold: 0.1 })
  const [contributions, setContributions] = useState([])
  const [selectedYear, setSelectedYear] = useState('last')
  const [stats, setStats] = useState({ total: 0, current: 0, longest: 0 })

  const { username, startYear = 2020 } = config.github
  const currentYear = new Date().getFullYear()
  const years = useMemo(
    () => Array.from({ length: currentYear - startYear + 1 }, (_, i) => currentYear - i),
    [currentYear, startYear],
  )

  useEffect(() => {
    let cancelled = false

    const fetchContributions = async () => {
      try {
        const res = await fetch(
          `https://github-contributions-api.jogruber.de/v4/${username}?y=${selectedYear}`,
        )
        if (!res.ok) throw new Error('API error')
        const data = await res.json()
        if (cancelled || !data.contributions) return

        const mapped = data.contributions.map((c) => ({
          date: c.date, count: c.count, level: getLevel(c.count),
        }))
        setContributions(mapped)
        setStats(calculateStreaks(data.contributions))
      } catch (err) {
        console.error('GitHub contributions fetch failed:', err)
        if (cancelled) return
        const fallback = Array.from({ length: 364 }, () => {
          const count = Math.floor(Math.random() * 20)
          return { level: getLevel(count), count }
        })
        setContributions(fallback)
      }
    }

    fetchContributions()
    return () => { cancelled = true }
  }, [username, selectedYear])

  return (
    <section id="about">
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 50 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-1 gap-6"
      >
        {/* About Card */}
        <div className="glass-card p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-display font-extrabold mb-4 text-center" style={{ letterSpacing: '-0.02em' }}>About Me</h2>
          <div className="space-y-3 text-sm md:text-base theme-text-sub leading-relaxed font-grotesk">
            {config.personal.bio.map((paragraph, i) => (
              <p key={i}>{paragraph}</p>
            ))}
          </div>
        </div>

        {/* GitHub Contributions */}
        <div className="glass-card p-6">
          <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
            <div className="flex items-center gap-2 theme-text-sub">
              <FaGithub className="text-xl" />
              <span className="font-display font-semibold text-xs uppercase" style={{ letterSpacing: '0.1em' }}>GitHub Contributions</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              {/* Stats */}
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

              {/* Year selector */}
              <select
                value={selectedYear}
                onChange={(e) => {
                  const val = e.target.value
                  setSelectedYear(val === 'last' ? 'last' : Number(val))
                }}
                className="px-3 py-1.5 theme-surface border theme-border rounded-lg text-sm text-primary-500 font-mono cursor-pointer theme-surface-hover transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/50 appearance-none bg-no-repeat bg-[length:16px] bg-[right_8px_center] pr-8"
                style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%2300e187'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z'/%3E%3C/svg%3E")` }}
              >
                <option value="last">Last 365 days</option>
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
            </div>
          </div>

          {/* Grid */}
          <div className="overflow-x-auto">
            <div
              className="grid grid-flow-col gap-[3px] mb-4 min-w-max"
              style={{ gridTemplateRows: 'repeat(7, minmax(0, 1fr))' }}
            >
              {contributions.map((day, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: i * 0.002 }}
                  className={`w-3 h-3 rounded-sm cursor-pointer transition-transform hover:scale-125`}
                  style={day.level === 0 ? { backgroundColor: 'var(--color-contrib-0)' } : undefined}
                  title={formatContribTitle(day.date, day.count)}
                >
                  {day.level > 0 && (
                    <div className={`w-full h-full rounded-sm ${CONTRIBUTION_LEVELS[day.level]}`} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Legend */}
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
      </motion.div>
    </section>
  )
}

export default About
