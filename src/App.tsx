import { useEffect, useRef, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { useCart } from './hooks/useCart'
import { Header } from './components/Header'
import { ScrollToTop } from './components/ScrollToTop'
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

  void addToCart
  void drawerOpen
  void setDrawerOpen
  void toast

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Header count={cart.count} onOpenCart={openCart} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
