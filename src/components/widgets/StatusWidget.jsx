import { useState, useEffect } from 'react'
import { FaClock } from 'react-icons/fa'

const StatusWidget = () => {
  const [time, setTime] = useState('')

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
    }

    updateTime()
    const interval = setInterval(updateTime, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="glass-card p-4 h-full flex flex-col justify-center">
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-3 w-3 bg-primary-500" />
          </span>
          <span className="text-[10px] font-semibold text-primary-500 uppercase" style={{ letterSpacing: '0.12em' }}>Online</span>
        </div>

        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 theme-text-sub">
            <FaClock className="text-lg" />
            <span className="text-2xl font-display font-bold" style={{ fontVariantNumeric: 'tabular-nums' }}>{time}</span>
          </div>
          <span className="text-[10px] theme-text-muted font-sans ml-6 uppercase" style={{ letterSpacing: '0.12em' }}>IST (India)</span>
        </div>
      </div>
    </div>
  )
}

export default StatusWidget
