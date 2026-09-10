import { useCallback, useState } from 'react'
import { CART_STORAGE_KEY } from '../config'
import {
  addItem,
  decItem,
  removeItem,
  cartCount,
  cartSubtotal,
  normalizeCart,
  type Cart,
} from '../lib/cart'

export interface CartStorage {
  getItem: (key: string) => string | null
  setItem: (key: string, value: string) => void
  removeItem: (key: string) => void
}

export function loadStoredCart(storage: CartStorage): Cart {
  let raw: string | null
  try {
    raw = storage.getItem(CART_STORAGE_KEY)
  } catch {
    return {}
  }
  if (!raw) return {}

  try {
    const parsed: unknown = JSON.parse(raw)
    const normalized = normalizeCart(parsed)
    const serialized = JSON.stringify(normalized)
    try {
      if (serialized === '{}') storage.removeItem(CART_STORAGE_KEY)
      else if (serialized !== raw) storage.setItem(CART_STORAGE_KEY, serialized)
    } catch {
      // Reading succeeded, so keep the repaired in-memory cart even if rewriting fails.
    }
    return normalized
  } catch {
    try {
      storage.removeItem(CART_STORAGE_KEY)
    } catch {
      // Storage is unavailable; the empty in-memory fallback still works.
    }
    return {}
  }
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(() => loadStoredCart(localStorage))

  const update = useCallback((transform: (current: Cart) => Cart) => {
    setCart((current) => {
      const next = normalizeCart(transform(current))
      try {
        if (Object.keys(next).length === 0) localStorage.removeItem(CART_STORAGE_KEY)
        else localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
      } catch {
        // Storage unavailable (private mode / quota) — cart still works in memory.
      }
      return next
    })
  }, [])

  const add = useCallback((id: string) => update((cart) => addItem(cart, id)), [update])
  const inc = useCallback((id: string) => update((cart) => addItem(cart, id)), [update])
  const dec = useCallback((id: string) => update((cart) => decItem(cart, id)), [update])
  const remove = useCallback((id: string) => update((cart) => removeItem(cart, id)), [update])

  return {
    cart,
    add,
    inc,
    dec,
    remove,
    count: cartCount(cart),
    subtotal: cartSubtotal(cart),
  }
}
