import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import { CartDrawer } from './components/CartDrawer'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { Toast } from './components/Toast'
import { Home } from './pages/Home'
import { Showroom } from './pages/Showroom'

function App() {
  const cart = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = (msg: string) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = window.setTimeout(() => setToast(''), 2600)
  }
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const openCart = () => {
    setDrawerOpen(true)
    setToast('')
  }

  const addToCart = (id: string, name: string) => {
    cart.add(id)
    showToast(`${name} added to cart`)
  }

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header count={cart.count} onOpenCart={openCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showroom" element={<Showroom onAdd={addToCart} />} />
      </Routes>
      <Footer onOpenCart={openCart} />
      <CartDrawer
        open={drawerOpen}
        cart={cart.cart}
        subtotal={cart.subtotal}
        onClose={() => setDrawerOpen(false)}
        onInc={cart.inc}
        onDec={cart.dec}
        onRemove={cart.remove}
      />
      <Toast message={toast} onViewCart={openCart} />
    </BrowserRouter>
  )
}

export default App
