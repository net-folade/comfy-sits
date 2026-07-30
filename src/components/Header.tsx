import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { directLink } from '../lib/whatsapp'
import { TikTokIcon } from './TikTokIcon'
import { WhatsAppIcon } from './WhatsAppIcon'
import { Wordmark } from './Wordmark'

interface HeaderProps {
  count: number
  onOpenCart: () => void
}

export function Header({ count, onOpenCart }: HeaderProps) {
  const { pathname } = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  // Close the mobile menu whenever the route changes.
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Transparent only while sitting on top of the home hero — everywhere
  // else the text would land on cream backgrounds and disappear.
  const solid = scrolled || pathname !== '/'

  return (
    <header className={`site-header${solid ? ' site-header--solid' : ''}`}>
      <div className="site-header__inner">
        <Link to="/" className="site-header__brand" aria-label="Comfy Sits — home">
          <Wordmark className="wordmark--header" />
        </Link>
        <nav className="site-nav" aria-label="Main">
          <NavLink to="/" end className="site-nav__link">
            Home
          </NavLink>
          <NavLink to="/showroom" className="site-nav__link">
            Showroom
          </NavLink>
          <NavLink to="/about" className="site-nav__link">
            About
          </NavLink>
          <a href="#contact" className="site-nav__link">
            Contact
          </a>
        </nav>
        <div className="site-header__actions">
          {/* Placeholder href — swap for the real TikTok profile before launch */}
          <a href="#" className="header-icon" aria-label="Comfy Sits on TikTok" title="TikTok">
            <TikTokIcon size={19} />
          </a>
          <a
            href={directLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="header-icon"
            aria-label="Chat on WhatsApp"
            title="WhatsApp"
          >
            <WhatsAppIcon size={21} />
          </a>
          <button
            type="button"
            className="cart-pill"
            onClick={onOpenCart}
            aria-label={`Open cart, ${count} ${count === 1 ? 'item' : 'items'}`}
          >
            <svg
              className="cart-pill__icon"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M6 7h12l1.5 14h-15L6 7Z" />
              <path d="M9 10V6a3 3 0 0 1 6 0v4" />
            </svg>
            <span className="cart-pill__label">CART</span>
            <span className="cart-pill__count">{count}</span>
          </button>
          <button
            type="button"
            className="menu-toggle"
            onClick={() => setMenuOpen((o) => !o)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          >
            <span className="menu-toggle__icon" aria-hidden="true">
              {menuOpen ? '✕' : '☰'}
            </span>
            <span className="menu-toggle__label">MENU</span>
          </button>
        </div>
      </div>
      {menuOpen && (
        <nav className="mobile-menu" aria-label="Mobile">
          <NavLink to="/" end className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/showroom" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            Showroom
          </NavLink>
          <NavLink to="/about" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            About
          </NavLink>
          <a href="#contact" className="mobile-menu__link" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>
      )}
    </header>
  )
}
