import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { PRODUCTS } from '../data/products'
import { cartEntries, type Cart } from '../lib/cart'
import { cedi } from '../lib/format'
import { cartLink } from '../lib/whatsapp'
import { ProductImage } from './ProductImage'
import { WhatsAppIcon } from './WhatsAppIcon'

interface CartDrawerProps {
  open: boolean
  cart: Cart
  subtotal: number
  onClose: () => void
  onInc: (id: string) => void
  onDec: (id: string) => void
  onRemove: (id: string) => void
}

export function CartDrawer({ open, cart, subtotal, onClose, onInc, onDec, onRemove }: CartDrawerProps) {
  const navigate = useNavigate()
  const drawerRef = useRef<HTMLElement>(null)

  // Body scroll lock while the drawer is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  // Escape closes; Tab is trapped inside the drawer while open.
  useEffect(() => {
    if (!open) return
    const drawer = drawerRef.current
    const focusables = () =>
      Array.from(
        drawer?.querySelectorAll<HTMLElement>('button, a[href]') ?? []
      ).filter((el) => el.offsetParent !== null)

    const previouslyFocused = document.activeElement as HTMLElement | null
    focusables()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return
      const els = focusables()
      if (els.length === 0) return
      const first = els[0]
      const last = els[els.length - 1]
      const active = document.activeElement
      if (e.shiftKey && (active === first || !drawer?.contains(active))) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && (active === last || !drawer?.contains(active))) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  // Resolve ids through the catalog and drop misses — a stale cart entry
  // for a deleted product must not crash the drawer.
  const items = cartEntries(cart)
    .map(([id, qty]) => {
      const p = PRODUCTS.find((x) => x.id === id)
      return p ? { ...p, qty } : null
    })
    .filter((x): x is NonNullable<typeof x> => x !== null)
  const checkoutUrl = cartLink(cart)

  const browseShowroom = () => {
    onClose()
    navigate('/showroom')
  }

  return (
    <>
      {open && <div className="drawer-overlay" onClick={onClose} aria-hidden="true" />}
      <aside
        ref={drawerRef}
        className={`cart-drawer ${open ? 'cart-drawer--open' : ''}`}
        aria-hidden={!open}
        aria-label="Shopping cart"
        {...(!open && { inert: true })}
      >
        <div className="cart-drawer__head">
          <div className="cart-drawer__title">Your cart</div>
          <button type="button" className="cart-drawer__close" onClick={onClose} aria-label="Close cart">
            ×
          </button>
        </div>
        <div className="cart-drawer__body">
          {items.length === 0 ? (
            <div className="cart-empty">
              <div className="cart-empty__title">Your cart is empty</div>
              <div className="cart-empty__hint">Browse the showroom and add pieces you love.</div>
              <button type="button" className="cart-empty__cta" onClick={browseShowroom}>
                Browse the showroom
              </button>
            </div>
          ) : (
            items.map((it) => (
              <div key={it.id} className="cart-line">
                <div className="cart-line__thumb">
                  <ProductImage id={it.id} name={it.name} image={it.images[0]} showName={false} sizes="64px" />
                </div>
                <div className="cart-line__info">
                  <div className="cart-line__name">{it.name}</div>
                  <div className="cart-line__price">{cedi(it.price)} each</div>
                  <button type="button" className="cart-line__remove" onClick={() => onRemove(it.id)}>
                    Remove
                  </button>
                </div>
                <div className="cart-line__stepper">
                  <button
                    type="button"
                    className="cart-line__step"
                    onClick={() => onDec(it.id)}
                    aria-label={`Decrease ${it.name} quantity`}
                  >
                    −
                  </button>
                  <output className="cart-line__qty" aria-live="polite" aria-label={`${it.name} quantity`}>{it.qty}</output>
                  <button
                    type="button"
                    className="cart-line__step"
                    onClick={() => onInc(it.id)}
                    aria-label={`Increase ${it.name} quantity`}
                  >
                    +
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {items.length > 0 && (
          <div className="cart-drawer__foot">
            <div className="cart-drawer__subtotal-row">
              <div className="cart-drawer__subtotal-label">SUBTOTAL</div>
              <div className="cart-drawer__subtotal">{cedi(subtotal)}</div>
            </div>
            {checkoutUrl ? <a
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="cart-drawer__send"
            >
              <WhatsAppIcon size={19} />
              Send order on WhatsApp
            </a> : <p className="cart-drawer__unavailable">WhatsApp ordering will be available once the business number is confirmed.</p>}
            <div className="cart-drawer__reassurance">
              Opens WhatsApp with your cart pre-filled — you confirm everything with us before
              paying.
            </div>
          </div>
        )}
      </aside>
    </>
  )
}
