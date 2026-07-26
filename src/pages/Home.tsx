import { Link } from 'react-router-dom'

export function Home() {
  return (
    <main>
      <section className="hero">
        <div className="hero__backdrop" aria-hidden="true" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__eyebrow">COMFY SITS · HANDCRAFTED FURNITURE</div>
          <h1 className="hero__title">Elevate your space, elevate your life.</h1>
          <p className="hero__lead">
            Chairs, tables and dining sets in rich dark woods with brass detailing — built by hand
            to make home feel like home.
          </p>
          <Link to="/showroom" className="hero__cta">
            Shop Now
          </Link>
        </div>
      </section>
    </main>
  )
}
