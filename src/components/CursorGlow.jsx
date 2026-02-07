import { useState, useEffect, useRef } from 'react'

const CursorGlow = () => {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const glowRef = useRef(null)
  const pos = useRef({ x: 0, y: 0 })
  const isHovering = useRef(false)

  useEffect(() => {
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
  }, [])

  const centered = {
    position: 'fixed',
    pointerEvents: 'none',
    transform: 'translate(-50%, -50%)',
    transition: 'width 0.15s, height 0.15s, opacity 0.15s',
  }

  return (
    <>
      <div
        ref={dotRef}
        style={{
          ...centered,
          zIndex: 9999,
          width: 6,
          height: 6,
          borderRadius: '50%',
          backgroundColor: '#34d399',
          opacity: 0,
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...centered,
          zIndex: 9998,
          width: 26,
          height: 26,
          borderRadius: '50%',
          border: '2px solid rgba(52, 211, 153, 0.5)',
          opacity: 0,
        }}
      />
      <div
        ref={glowRef}
        style={{
          ...centered,
          zIndex: 9997,
          width: 60,
          height: 60,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 70%)',
          mixBlendMode: 'var(--cursor-blend)',
          opacity: 0,
        }}
      />
    </>
  )
}

export default CursorGlow
