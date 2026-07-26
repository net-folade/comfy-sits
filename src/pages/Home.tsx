import { Link } from 'react-router-dom'
import { DeliveryIcon, ExchangeIcon, MadeToOrderIcon } from '../components/OfferIcons'

const OFFERS = [
  {
    title: 'Made to order',
    blurb: 'Every piece is built for you in our Accra workshop.',
    icon: <MadeToOrderIcon />,
  },
  {
    title: 'Reliable delivery',
    blurb: 'Carefully delivered and placed, wherever you are.',
    icon: <DeliveryIcon />,
  },
  {
    title: 'Easy exchange',
    blurb: 'Hassle-free exchange within 14 days of delivery.',
    icon: <ExchangeIcon />,
  },
]

const HOME_CATEGORIES = [
  { label: 'Chairs', cat: 'Chairs', className: 'category-card--tall' },
  { label: 'Tables', cat: 'Tables', className: '' },
  { label: 'Dining Sets', cat: 'Dining Sets', className: '' },
]

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

      <section className="offers">
        <h2 className="section-title">What we can offer you</h2>
        <p className="section-lead">
          High-quality, stylish and functional furniture designed to elevate your space with
          comfort and elegance.
        </p>
        <div className="offers__grid">
          {OFFERS.map((o) => (
            <div key={o.title} className="offer-card">
              <div className="offer-card__icon">{o.icon}</div>
              <div className="offer-card__title">{o.title}</div>
              <div className="offer-card__blurb">{o.blurb}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="categories">
        <div className="categories__grid">
          {HOME_CATEGORIES.map((c) => (
            <div key={c.cat} className={`category-card ${c.className}`}>
              <div className="category-card__backdrop" aria-hidden="true" />
              <div className="category-card__scrim" aria-hidden="true" />
              <div className="category-card__content">
                <div className="category-card__name">{c.label}</div>
                <Link
                  to={`/showroom?cat=${encodeURIComponent(c.cat)}`}
                  className="category-card__cta"
                >
                  View all products ↗
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  )
}
