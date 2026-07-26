import { useState } from 'react'
import { CART_STORAGE_KEY } from '../config'
import { addItem, decItem, removeItem, cartCount, cartSubtotal, type Cart } from '../lib/cart'

// A corrupted localStorage key must not white-screen the site.
function loadCart(): Cart {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem(CART_STORAGE_KEY) || '{}')
    if (saved && typeof saved === 'object' && !Array.isArray(saved)) return saved as Cart
  } catch {
    // fall through to empty cart
  }
  return {}
}

export function useCart() {
  const [cart, setCart] = useState<Cart>(loadCart)

  const update = (next: Cart) => {
    setCart(next)
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(next))
    } catch {
      // storage unavailable (private mode / quota) — cart still works in memory
    }
  }

  return {
    cart,
    add: (id: string) => update(addItem(cart, id)),
    inc: (id: string) => update(addItem(cart, id)),
    dec: (id: string) => update(decItem(cart, id)),
    remove: (id: string) => update(removeItem(cart, id)),
    count: cartCount(cart),
    subtotal: cartSubtotal(cart),
  }
}
