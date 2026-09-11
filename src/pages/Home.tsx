import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { FaqAccordion } from '../components/FaqAccordion'
import { DeliveryIcon, ExchangeIcon, MadeToOrderIcon } from '../components/OfferIcons'
import { ProductCard } from '../components/ProductCard'
import { PUBLISHED_PRODUCTS, type Category } from '../data/products'
import { directLink } from '../lib/whatsapp'

// The first image for each product is its homepage and showroom tile image.
const LATEST_DROP_IDS = [
  'luna-bistro-set',
  'halo-dressing-table',
  'aria-tv-console',
]
const LATEST_DROP = LATEST_DROP_IDS.flatMap((id) => {
  const product = PUBLISHED_PRODUCTS.find((item) => item.id === id)
  return product ? [product] : []
})

const OFFERS = [
  {
    title: 'Delivery before payment',
    blurb: 'Receive your furniture first, then complete payment after delivery.',
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

const HOME_CATEGORIES: Array<{
  label: string
  cat: Category
  className: string
  image?: string
}> = [
  { label: 'sofa sets', cat: 'sofa sets', className: '' },
  { label: 'L-shapes', cat: 'l-shapes', className: '' },
  { label: 'office sets', cat: 'office sets', className: '' },
  { label: 'TV consoles', cat: 'tv consoles', className: '', image: '/products/aria-tv-console/front.webp' },
  { label: 'tables', cat: 'center tables', className: 'category-card--fit-image', image: '/products/halo-dressing-table/front.webp' },
  { label: 'dining sets', cat: 'dining sets', className: 'category-card--fit-image', image: '/products/amber-dining-set/set.webp' },
]

interface HomeProps {
  onAdd: (id: string, name: string) => void
}

export function Home({ onAdd }: HomeProps) {
  const whatsappUrl = directLink()
  const homeRef = useRef<HTMLElement>(null)

  useEffect(() => {
    document.title = 'Comfy Sits — Handcrafted Furniture in Accra'

    const home = homeRef.current
    if (!home || !('IntersectionObserver' in window)) return

    const revealItems = home.querySelectorAll<HTMLElement>('[data-home-reveal]')
    home.classList.add('home-motion')

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        entry.target.classList.add('is-visible')
        observer.unobserve(entry.target)
      })
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -8% 0px',
    })

    revealItems.forEach((item) => observer.observe(item))

    return () => observer.disconnect()
  }, [])

  return (
    <main ref={homeRef}>
      <section className="hero">
        <picture className="hero__backdrop" aria-hidden="true">
          <source media="(max-width: 767px)" srcSet="/hero-bg-768.jpg" />
          <img src="/hero-bg-1600.jpg" alt="" width="1600" height="1023" fetchPriority="high" />
        </picture>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <div className="hero__eyebrow">COMFY SITS · IMPORTED AND HANDCRAFTED FURNITURE</div>
          <h1 className="hero__title">Elevate your space, elevate your life.</h1>
          <p className="hero__lead">
            Sofa sets, L-shapes, office sets, TV consoles, tables and dining sets to make every
            room feel like home.
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
              <div
                className="category-card__backdrop"
                style={c.image ? { backgroundImage: `url('${c.image}')` } : undefined}
                aria-hidden="true"
              />
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
          <div className="faq__intro" data-home-reveal="">
            <h2 className="section-title">You've got questions &amp; we've got answers</h2>
            <div className="faq__hint">Still have a question in mind?</div>
            {whatsappUrl && <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="faq__contact"
            >
              Contact Us ↗
            </a>}
          </div>
          <FaqAccordion />
        </div>
      </section>

      <section className="showcase">
        <div className="showcase__panel" data-home-reveal="">
          <picture className="showcase__backdrop" aria-hidden="true">
            <source media="(max-width: 767px)" srcSet="/showcase-768.jpg" />
            <img src="/showcase-1600.jpg" alt="" width="1600" height="1200" loading="lazy" decoding="async" />
          </picture>
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
