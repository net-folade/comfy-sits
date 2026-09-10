import { useEffect } from 'react'
import { Link } from 'react-router-dom'

export function NotFound() {
  useEffect(() => {
    document.title = 'Page not found — Comfy Sits'
  }, [])

  return (
    <main className="not-found">
      <p className="product-detail__eyebrow">404 · PAGE NOT FOUND</p>
      <h1>We couldn't find that page</h1>
      <p>The address may have changed, or the page may no longer exist.</p>
      <div className="not-found__actions">
        <Link to="/" className="product-detail__cta">Go home</Link>
        <Link to="/showroom" className="not-found__secondary">Browse the showroom</Link>
      </div>
    </main>
  )
}
