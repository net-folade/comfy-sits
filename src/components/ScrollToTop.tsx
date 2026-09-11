import { useEffect } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

export function ScrollToTop() {
  const { pathname } = useLocation()
  const navigationType = useNavigationType()

  useEffect(() => {
    // Let the browser restore the previous scroll position for Back/Forward.
    if (navigationType === 'POP') return
    window.scrollTo({ top: 0 })
  }, [navigationType, pathname])

  return null
}
