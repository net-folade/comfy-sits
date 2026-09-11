import { BUSINESS, isValidWhatsAppNumber } from '../config'
import { PUBLISHED_PRODUCTS } from '../data/products'
import { cedi } from './format'
import { cartEntries, cartSubtotal, type Cart } from './cart'

export const waLink = (msg: string, number = BUSINESS.whatsappNumber): string | null => {
  if (!isValidWhatsAppNumber(number)) return null
  const num = number.replace(/[^0-9]/g, '')
  return 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg)
}

export const buildCartMessage = (cart: Cart): string => {
  const entries = cartEntries(cart)
  const hasPendingPrice = entries.some(([id]) =>
    PUBLISHED_PRODUCTS.find((product) => product.id === id)?.pricePending
  )
  const lines = entries
    .map(([id, q]) => {
      const p = PUBLISHED_PRODUCTS.find((x) => x.id === id)
      if (!p) return ''
      return p.pricePending
        ? `• ${q}× ${p.name} — price to be confirmed`
        : `• ${q}× ${p.name} — ${cedi(p.price * q)}`
    })
    .filter(Boolean)
  return (
    "Hello Comfy Sits! I'd like to order:\n" +
    (lines.length > 0 ? lines.join('\n') + '\n' : '') +
    '\nSubtotal: ' +
    (hasPendingPrice ? 'to be confirmed' : cedi(cartSubtotal(cart))) +
    '\n\nName:\nDelivery location:'
  )
}

export const cartLink = (cart: Cart, number = BUSINESS.whatsappNumber): string | null =>
  waLink(buildCartMessage(cart), number)

export const directLink = (number = BUSINESS.whatsappNumber): string | null =>
  waLink("Hello Comfy Sits! I'd like to place an order.", number)
