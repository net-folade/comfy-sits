import { PUBLISHED_PRODUCTS } from '../data/products'

// Cart shape: { [productId]: qty } — compact in localStorage.
export type Cart = Record<string, number>
export const MAX_CART_QUANTITY = 99

export const normalizeCart = (value: unknown): Cart => {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  const publishedIds = new Set(PUBLISHED_PRODUCTS.map((product) => product.id))
  return Object.fromEntries(
    Object.entries(value).filter(([id, quantity]) =>
      publishedIds.has(id) &&
      typeof quantity === 'number' &&
      Number.isFinite(quantity) &&
      Number.isInteger(quantity) &&
      quantity > 0 &&
      quantity <= MAX_CART_QUANTITY
    )
  )
}

// Entries with a valid positive qty; ids that no longer exist in the
// catalog are resolved (and dropped) by the consumers below.
export const cartEntries = (cart: Cart): [string, number][] =>
  Object.entries(normalizeCart(cart))

export const addItem = (cart: Cart, id: string): Cart => {
  const normalized = normalizeCart(cart)
  if (!PUBLISHED_PRODUCTS.some((product) => product.id === id)) return normalized
  return { ...normalized, [id]: Math.min((normalized[id] || 0) + 1, MAX_CART_QUANTITY) }
}

export const decItem = (cart: Cart, id: string): Cart => {
  const out = normalizeCart(cart)
  const n = (out[id] || 0) - 1
  if (n <= 0) delete out[id]
  else out[id] = n
  return out
}

export const removeItem = (cart: Cart, id: string): Cart => {
  const out = normalizeCart(cart)
  delete out[id]
  return out
}

export const cartCount = (cart: Cart): number =>
  cartEntries(cart).reduce((a, [, q]) => a + q, 0)

export const cartSubtotal = (cart: Cart): number =>
  cartEntries(cart).reduce((a, [id, q]) => {
    const p = PUBLISHED_PRODUCTS.find((x) => x.id === id)
    return a + (p && !p.pricePending ? p.price * q : 0)
  }, 0)
