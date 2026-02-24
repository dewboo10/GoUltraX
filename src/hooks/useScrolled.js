import { useState, useEffect } from 'react'

/**
 * Returns true when the window has been scrolled past `threshold` pixels.
 */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handle = () => setScrolled(window.scrollY > threshold)
    window.addEventListener('scroll', handle, { passive: true })
    handle()
    return () => window.removeEventListener('scroll', handle)
  }, [threshold])

  return scrolled
}
