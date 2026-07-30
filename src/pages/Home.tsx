import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/FaqAccordion'
import { DeliveryIcon, ExchangeIcon, MadeToOrderIcon } from '../components/OfferIcons'
import { ProductCard } from '../components/ProductCard'
import { PRODUCTS } from '../data/products'
import { directLink } from '../lib/whatsapp'

// The latest drop — edit this list to feature different pieces.
const LATEST_DROP = PRODUCTS.slice(0, 6)

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

interface HomeProps {
  onAdd: (id: string, name: string) => void
}

export function Home({ onAdd }: HomeProps) {
  useEffect(() => {
    document.title = 'Comfy Sits — Handcrafted Furniture in Accra'
  }, [])

  return (
    <main>
      <section className="hero">
        <div className="hero__backdrop" aria-hidden="true" />
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__eyebrow">COMFY SITS · IMPORTED AND HANDCRAFTED FURNITURE</div>
          <h1 className="hero__title">Elevate your space, elevate your life.</h1>
          <p className="hero__lead">
            Chairs, tables and dining sets in rich dark woods to make home feel like home.
          </p>
          <Link to="/showroom" className="hero__cta">
            Shop Now
          </Link>
        </div>
      </section>

      <section className="new-collections">
        <h2 className="section-title">Our New Collections</h2>
        <p className="section-lead">The latest drop — fresh from our Accra workshop.</p>
        <div className="product-grid">
          {LATEST_DROP.map((p) => (
            <ProductCard key={p.id} product={p} onAdd={onAdd} />
          ))}
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
                  View all products
                  <span className="category-card__arrow" aria-hidden="true">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="faq">
        <div className="faq__inner">
          <div className="faq__intro">
            <h2 className="section-title">You've got questions &amp; we've got answers</h2>
            <div className="faq__hint">Still have a question in mind?</div>
            <a
              href={directLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="faq__contact"
            >
              Contact Us ↗
            </a>
          </div>
          <FaqAccordion />
        </div>
      </section>

      <section className="showcase">
        <div className="showcase__panel">
          <div className="showcase__backdrop" aria-hidden="true" />
          <div className="showcase__scrim" aria-hidden="true" />
          <div className="showcase__content">
            <h2 className="showcase__title">
              Build your home with a comfortable room by using our interior
            </h2>
            <p className="showcase__lead">
              Looking for quality design furniture? You're in the right place — handcrafted
              pieces ready to be delivered to you.
            </p>
            <Link to="/showroom" className="showcase__cta">
              Shop Now
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
