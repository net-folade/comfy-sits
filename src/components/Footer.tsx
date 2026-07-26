import { Link } from 'react-router-dom'
import { directLink } from '../lib/whatsapp'
import { Wordmark } from './Wordmark'

interface FooterProps {
  onOpenCart: () => void
}

export function Footer({ onOpenCart }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="site-footer__grid">
        <div className="site-footer__col site-footer__col--brand">
          <Wordmark className="wordmark--footer" />
          <p className="site-footer__blurb">
            We craft high-quality chairs, tables and dining sets — each piece reflecting a warm,
            timeless aesthetic.
          </p>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading">QUICK MENU</div>
          <Link to="/" className="site-footer__link">
            Home
          </Link>
          <Link to="/showroom" className="site-footer__link">
            Showroom
          </Link>
          <button type="button" className="site-footer__link site-footer__link--button" onClick={onOpenCart}>
            Cart
          </button>
        </div>
        <div className="site-footer__col">
          <div className="site-footer__heading">CONTACT</div>
          <a
            href={directLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            WhatsApp us
          </a>
          <div className="site-footer__hours">
            Showroom by appointment
            <br />
            Mon – Sat · 9:00am – 6:00pm
          </div>
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__copyright">© 2026 Comfy Sits · Accra, Ghana</div>
          <div className="site-footer__socials">
            {/* Placeholder hrefs — swap for real profiles before launch */}
            <a href="#" className="site-footer__social">
              Instagram
            </a>
            <a href="#" className="site-footer__social">
              Facebook
            </a>
            <a href="#" className="site-footer__social">
              X / Twitter
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
