import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

// The design's go() scrolled to top on every screen change; do the same per route.
export function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [pathname])
  return null
}
