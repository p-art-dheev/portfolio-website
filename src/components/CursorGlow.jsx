import { useState, useEffect, useRef } from 'react'

const CURSOR_BASE_STYLE = {
  position: 'fixed',
  pointerEvents: 'none',
  transform: 'translate(-50%, -50%)',
  transition: 'width 0.15s, height 0.15s, opacity 0.15s',
}

const CursorGlow = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Don't initialize cursor on mobile
    if (isMobile) return

    const dot = dotRef.current
    const ring = ringRef.current
    const glow = glowRef.current
    if (!dot || !ring || !glow) return

    const handleMouseMove = (e) => {
      pos.current = { x: e.clientX, y: e.clientY }
      const { x, y } = pos.current
      dot.style.left = `${x}px`
      dot.style.top = `${y}px`
      dot.style.opacity = '1'
      ring.style.left = `${x}px`
      ring.style.top = `${y}px`
      ring.style.opacity = '1'
      glow.style.left = `${x}px`
      glow.style.top = `${y}px`
      glow.style.opacity = '0.3'
    }

    const hide = () => {
      dot.style.opacity = '0'
      ring.style.opacity = '0'
      glow.style.opacity = '0'
    }

    const grow = () => {
      isHovering.current = true
      dot.style.width = '15px'
      dot.style.height = '15px'
      dot.style.opacity = '0.25'
      ring.style.width = '26px'
      ring.style.height = '26px'
    }

    const shrink = () => {
      isHovering.current = false
      dot.style.width = '6px'
      dot.style.height = '6px'
      dot.style.opacity = '1'
      ring.style.width = '26px'
      ring.style.height = '26px'
    }

    const addHoverListeners = () => {
      const els = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .cursor-hover')
      els.forEach(el => {
        el.addEventListener('mouseenter', grow)
        el.addEventListener('mouseleave', shrink)
      })
      return els
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', hide)

    const observer = new MutationObserver(() => addHoverListeners())
    observer.observe(document.body, { childList: true, subtree: true })
    const initialEls = addHoverListeners()

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', hide)
      observer.disconnect()
      initialEls.forEach(el => {
        el.removeEventListener('mouseenter', grow)
        el.removeEventListener('mouseleave', shrink)
      })
    }
  }, [isMobile])

  return (
    <>
      {!isMobile && (
        <>
          <div
            ref={dotRef}
            style={{
              ...CURSOR_BASE_STYLE,
              zIndex: 9999,
              width: 6,
              height: 6,
              borderRadius: '50%',
              backgroundColor: '#059669', // Updated to darker emerald
              opacity: 0,
            }}
          />
          <div
            ref={ringRef}
            style={{
              ...CURSOR_BASE_STYLE,
              zIndex: 9998,
              width: 26,
              height: 26,
              borderRadius: '50%',
              border: '2px solid rgba(5, 150, 105, 0.5)', // Updated to darker emerald
              opacity: 0,
            }}
          />
          <div
            ref={glowRef}
            style={{
              ...CURSOR_BASE_STYLE,
              zIndex: 9997,
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(5, 150, 105, 0.2) 0%, transparent 70%)', // Updated to darker emerald
              mixBlendMode: 'var(--cursor-blend)',
              opacity: 0,
            }}
          />
        </>
      )}
    </>
  )
}

export default CursorGlow
