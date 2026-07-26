import { Link, NavLink } from 'react-router-dom'
import { Wordmark } from './Wordmark'

interface HeaderProps {
  count: number
  onOpenCart: () => void
}

export function Header({ count, onOpenCart }: HeaderProps) {
  return (
    <header className="site-header">
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
        </nav>
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
      </div>
    </header>
  )
}
