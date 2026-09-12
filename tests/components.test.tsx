import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { renderToStaticMarkup } from 'react-dom/server'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { ProductGallery } from '../src/components/ProductGallery'
import { ProductDetails } from '../src/pages/ProductDetails'
import { Showroom } from '../src/pages/Showroom'
import { Home } from '../src/pages/Home'
import { NotFound } from '../src/pages/NotFound'
import type { Product } from '../src/data/products'

const renderRoute = (path: string, element: React.ReactNode, route = '*') =>
  renderToStaticMarkup(
    <MemoryRouter initialEntries={[path]}>
      <Routes><Route path={route} element={element} /></Routes>
    </MemoryRouter>
  )

test('category query selection renders only its published product', () => {
  const html = renderRoute('/showroom?cat=center%20tables', <Showroom onAdd={() => undefined} />)
  assert.match(html, /Volta Coffee Table/)
  assert.doesNotMatch(html, /Osu Dining Chair/)
  assert.match(html, /aria-pressed="true"[^>]*>tables/)
})

test('home renders exactly three products in the latest drop', () => {
  const html = renderRoute('/', <Home onAdd={() => undefined} />)
  assert.equal((html.match(/class="product-card"/g) ?? []).length, 3)
})

test('home marks every section below the hero for scroll reveals', () => {
  const html = renderRoute('/', <Home onAdd={() => undefined} />)
  // 5 new collections, 5 offers, 6 categories, 7 faq, 1 showcase.
  assert.equal((html.match(/data-home-reveal=""/g) ?? []).length, 24)
  // The hero stays on its load-time animation.
  assert.doesNotMatch(html, /hero__title"[^>]*data-home-reveal/)
})

test('showroom product cards opt out of the home scroll reveal', () => {
  const html = renderRoute('/showroom', <Showroom onAdd={() => undefined} />)
  assert.doesNotMatch(html, /data-home-reveal/)
})

test('published product route renders details and add action', () => {
  const html = renderRoute('/products/tema-compact', <ProductDetails onAdd={() => undefined} />, '/products/:productId')
  assert.match(html, /Tema Compact Set/)
  assert.match(html, /This set includes:/)
  assert.match(html, /Add to cart/)
})

test('product details renders a history-aware back button', () => {
  const html = renderRoute('/products/amber-dining-set', <ProductDetails onAdd={() => undefined} />, '/products/:productId')
  assert.match(html, /<button[^>]*class="back-link"[^>]*>← Back<\/button>/)
})

test('unpublished product route renders the unavailable state', () => {
  const html = renderRoute('/products/accra-lounge', <ProductDetails onAdd={() => undefined} />, '/products/:productId')
  assert.match(html, /This piece isn&#x27;t in the showroom/)
  assert.doesNotMatch(html, /Add to cart/)
})

test('gallery renders switch controls, thumbnails, and stable image dimensions', () => {
  const product: Product = {
    id: 'test-chair',
    name: 'Test Chair',
    cat: 'sofa sets',
    price: 1,
    desc: 'Test',
    available: true,
    published: true,
    images: [
      { src: '/one.webp', alt: 'Front view' },
      { src: '/two.webp', alt: 'Side view' },
    ],
  }
  const html = renderToStaticMarkup(<ProductGallery product={product} />)
  assert.match(html, /aria-label="Previous photograph"/)
  assert.match(html, /aria-label="Next photograph"/)
  assert.match(html, /Choose a photograph/)
  assert.match(html, /width="1200" height="900"/)
})

test('unknown route renders recovery links', () => {
  const html = renderRoute('/does-not-exist', <NotFound />)
  assert.match(html, /We couldn&#x27;t find that page/)
  assert.match(html, /href="\/"/)
  assert.match(html, /href="\/showroom"/)
})
