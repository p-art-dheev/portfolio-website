import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

const StatusWidget = ({ inline = false }) => {
  const [time, setTime] = useState('')
  const [isAway, setIsAway] = useState(false)

  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      setTime(
        now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }),
      )

      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }))
      const hour = istTime.getHours()
      setIsAway(hour >= 0 && hour < 8)
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  if (inline) {
    return (
      <div className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl theme-surface border theme-border max-w-fit">
        <div className="flex items-center gap-1.5">
          <span className="relative flex h-2.5 w-2.5">
            {isAway ? (
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-500" />
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary-500" />
              </>
            )}
          </span>
          <span className={`text-[10px] font-bold uppercase ${isAway ? 'text-yellow-500' : 'text-primary-500'}`} style={{ letterSpacing: '0.1em' }}>
            {isAway ? 'Away' : 'Online'}
          </span>
        </div>

        <div className="h-3 w-[1px] bg-white/20" />

        <div className="flex items-center gap-1.5 theme-text-sub">
          <FaClock className="text-xs" />
          <span className="text-xs font-display font-bold leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
          <span className="text-[10px] theme-text-muted font-sans uppercase">IST</span>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-card p-4 h-full flex flex-col justify-center">
      <div className="flex flex-col gap-0.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            {isAway ? (
              <span className="relative inline-flex rounded-full h-3 w-3 bg-yellow-500" />
            ) : (
              <>
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
              </>
            )}
          </span>
          <span className={`text-[10px] font-semibold uppercase ${isAway ? 'text-yellow-500' : 'text-primary-500'}`} style={{ letterSpacing: '0.12em' }}>
            {isAway ? 'Away' : 'Online'}
          </span>
        </div>

        <div className="flex items-center flex-wrap gap-x-2 gap-y-1 mt-1">
          <div className="flex items-center gap-2 theme-text-sub leading-none">
            <FaClock className="text-sm md:text-base" />
            <span className="text-base md:text-lg font-display font-bold leading-none" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
          </div>
          <span className="text-[10px] theme-text-muted font-sans uppercase leading-none self-center" style={{ letterSpacing: '0.12em' }}>IST (India)</span>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget
