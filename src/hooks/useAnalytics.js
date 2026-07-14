import { useEffect } from 'react'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000'

export function useAnalytics() {
  useEffect(() => {
    const track = async () => {
      try {
        await fetch(`${API_BASE}/api/analytics/track`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ path: window.location.pathname }),
        })
      } catch {
        // Silent fail — never disrupt UX for analytics
      }
    }
    track()
  }, [])
}
