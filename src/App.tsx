import { useCallback, useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import { CartDrawer } from './components/CartDrawer'
import { FloatingWhatsApp } from './components/FloatingWhatsApp'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
import { Toast } from './components/Toast'
import { About } from './pages/About'
import { Home } from './pages/Home'
import { Showroom } from './pages/Showroom'
import { ProductDetails } from './pages/ProductDetails'
import { NotFound } from './pages/NotFound'

function App() {
  const cart = useCart()
  const [drawerOpen, setDrawerOpen] = useState(false)
  const [toast, setToast] = useState('')
  const toastTimer = useRef<number | undefined>(undefined)

  const showToast = useCallback((msg: string) => {
    clearTimeout(toastTimer.current)
    setToast(msg)
    toastTimer.current = window.setTimeout(() => setToast(''), 2600)
  }, [])
  useEffect(() => () => clearTimeout(toastTimer.current), [])

  const openCart = useCallback(() => {
    setDrawerOpen(true)
    setToast('')
  }, [])

  const closeCart = useCallback(() => setDrawerOpen(false), [])

  const addToCart = (id: string, name: string) => {
    cart.add(id)
    showToast(`${name} added to cart`)
  }

  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <ScrollToTop />
      <Header count={cart.count} onOpenCart={openCart} />
      <Routes>
        <Route path="/" element={<Home onAdd={addToCart} />} />
        <Route path="/showroom" element={<Showroom onAdd={addToCart} />} />
        <Route path="/products/:productId" element={<ProductDetails onAdd={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer onOpenCart={openCart} />
      <CartDrawer
        open={drawerOpen}
        cart={cart.cart}
        subtotal={cart.subtotal}
        onClose={closeCart}
        onInc={cart.inc}
        onDec={cart.dec}
        onRemove={cart.remove}
      />
      <Toast message={toast} onViewCart={openCart} />
      <FloatingWhatsApp hidden={drawerOpen || toast !== ''} />
    </BrowserRouter>
  )
}

export default App
