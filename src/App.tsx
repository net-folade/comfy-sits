import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { ScrollToTop } from './components/ScrollToTop'
import { Home } from './pages/Home'
import { Showroom } from './pages/Showroom'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/showroom" element={<Showroom />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
