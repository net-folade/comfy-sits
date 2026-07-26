import { PRODUCTS } from '../data/products'

// Cart shape: { [productId]: qty } — compact in localStorage.
export type Cart = Record<string, number>

// Entries with a valid positive qty; ids that no longer exist in the
// catalog are resolved (and dropped) by the consumers below.
export const cartEntries = (cart: Cart): [string, number][] =>
  Object.entries(cart).filter(([, q]) => typeof q === 'number' && q > 0)

export const addItem = (cart: Cart, id: string): Cart => ({ ...cart, [id]: (cart[id] || 0) + 1 })

export const decItem = (cart: Cart, id: string): Cart => {
  const n = (cart[id] || 0) - 1
  const out = { ...cart }
  if (n <= 0) delete out[id]
  else out[id] = n
  return out
}

export const removeItem = (cart: Cart, id: string): Cart => {
  const out = { ...cart }
  delete out[id]
  return out
}

export const cartCount = (cart: Cart): number =>
  cartEntries(cart).reduce((a, [, q]) => a + q, 0)

export const cartSubtotal = (cart: Cart): number =>
  cartEntries(cart).reduce((a, [id, q]) => {
    const p = PRODUCTS.find((x) => x.id === id)
    return a + (p ? p.price * q : 0)
  }, 0)
