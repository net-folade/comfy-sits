import { Link } from 'react-router-dom'
import { directLink } from '../lib/whatsapp'
import { Wordmark } from './Wordmark'
import { BUSINESS, optionalUrl } from '../config'

interface FooterProps {
  onOpenCart: () => void
}

export function Footer({ onOpenCart }: FooterProps) {
  const whatsappUrl = directLink()
  const tiktokUrl = optionalUrl(BUSINESS.tiktokUrl)
  const instagramUrl = optionalUrl(BUSINESS.instagramUrl)
  const location = BUSINESS.location ? ` · ${BUSINESS.location}` : ''
  return (
    <footer className="site-footer" id="contact">
      <div className="site-footer__grid">
        <div className="site-footer__col site-footer__col--brand">
          <Wordmark className="wordmark--footer" />
          <p className="site-footer__blurb">
            We craft high-quality sofa sets, tables and dining sets — each piece reflecting a warm,
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
          {whatsappUrl && <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="site-footer__link"
          >
            WhatsApp us
          </a>}
          {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="site-footer__link">TikTok</a>}
          {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="site-footer__link">Instagram</a>}
        </div>
      </div>
      <div className="site-footer__bottom">
        <div className="site-footer__bottom-inner">
          <div className="site-footer__copyright">© {new Date().getFullYear()} {BUSINESS.brand}{location}</div>
          <div className="site-footer__socials">
            {tiktokUrl && <a href={tiktokUrl} target="_blank" rel="noopener noreferrer" className="site-footer__social">TikTok</a>}
            {instagramUrl && <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="site-footer__social">Instagram</a>}
            {whatsappUrl && <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-footer__social"
            >
              WhatsApp
            </a>}
          </div>
        </div>
      </div>
    </footer>
  )
}
