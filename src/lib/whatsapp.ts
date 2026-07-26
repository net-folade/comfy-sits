import { WHATSAPP_NUMBER } from '../config'
import { PRODUCTS } from '../data/products'
import { cedi } from './format'
import { cartEntries, cartSubtotal, type Cart } from './cart'

export const waLink = (msg: string): string => {
  const num = WHATSAPP_NUMBER.replace(/[^0-9]/g, '')
  return 'https://wa.me/' + num + '?text=' + encodeURIComponent(msg)
}

export const buildCartMessage = (cart: Cart): string => {
  const lines = cartEntries(cart)
    .map(([id, q]) => {
      const p = PRODUCTS.find((x) => x.id === id)
      return p ? `• ${q}× ${p.name} — ${cedi(p.price * q)}` : ''
    })
    .filter(Boolean)
  return (
    "Hello Comfy Sits! I'd like to order:\n" +
    lines.join('\n') +
    '\n\nSubtotal: ' +
    cedi(cartSubtotal(cart)) +
    '\n\nName:\nDelivery location:'
  )
}

export const cartLink = (cart: Cart): string => waLink(buildCartMessage(cart))

export const directLink = (): string => waLink("Hello Comfy Sits! I'd like to place an order.")
