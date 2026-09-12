import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { cedi } from '../src/lib/format'
import { buildCartMessage, cartLink } from '../src/lib/whatsapp'
import { MAX_CART_QUANTITY, cartCount, cartSubtotal, decItem, normalizeCart } from '../src/lib/cart'
import { PUBLISHED_PRODUCTS, findPublishedProduct } from '../src/data/products'
import { hasProductImage, productImageAlt } from '../src/lib/images'
import { DOCUMENTED_WHATSAPP_PLACEHOLDER, isValidWhatsAppNumber, optionalUrl } from '../src/config'
import { loadStoredCart, type CartStorage } from '../src/hooks/useCart'
import { productMetadata } from '../src/lib/metadata'
import { galleryIndex } from '../src/lib/gallery'
import { canUseHistoryBack } from '../src/lib/navigation'
import { asset, setAssetBase } from '../src/lib/asset'

test('cedi formats with GH₵ prefix and thousands separators', () => {
  assert.equal(cedi(620), 'GH₵ 620')
  assert.equal(cedi(1240), 'GH₵ 1,240')
  assert.equal(cedi(11500), 'GH₵ 11,500')
})

test('back navigation only uses an existing in-app history entry', () => {
  assert.equal(canUseHistoryBack({ idx: 2 }), true)
  assert.equal(canUseHistoryBack({ idx: 0 }), false)
  assert.equal(canUseHistoryBack(null), false)
})

test('buildCartMessage matches the design template', () => {
  const msg = buildCartMessage({ 'osu-dining-chair': 2 })
  assert.equal(
    msg,
    "Hello Comfy Sits! I'd like to order:\n" +
      '• 2× Osu Dining Chair — GH₵ 1,240\n\n' +
      'Subtotal: GH₵ 1,240\n\n' +
      'Name:\nDelivery location:'
  )
})

test('buildCartMessage drops ids missing from the catalog', () => {
  const msg = buildCartMessage({ 'deleted-product': 1, 'osu-dining-chair': 2 })
  assert.ok(!msg.includes('deleted-product'))
  assert.ok(msg.includes('• 2× Osu Dining Chair — GH₵ 1,240'))
  assert.ok(msg.includes('Subtotal: GH₵ 1,240'))
})

test('cartLink targets the configured number with an encoded message', () => {
  const href = cartLink({ 'osu-dining-chair': 1 }, '233501234567')
  assert.ok(href)
  assert.ok(href.startsWith('https://wa.me/233501234567?text='))
  const decoded = decodeURIComponent(href.split('?text=')[1])
  assert.ok(decoded.includes('• 1× Osu Dining Chair — GH₵ 620'))
})

test('WhatsApp links reject blank, malformed, and documented placeholder numbers', () => {
  assert.equal(isValidWhatsAppNumber(''), false)
  assert.equal(isValidWhatsAppNumber('1234'), false)
  assert.equal(isValidWhatsAppNumber(DOCUMENTED_WHATSAPP_PLACEHOLDER), false)
  assert.equal(cartLink({}, DOCUMENTED_WHATSAPP_PLACEHOLDER), null)
  assert.equal(isValidWhatsAppNumber('+233 50 123 4567'), true)
})

test('optional social URLs allow only non-empty HTTPS links', () => {
  assert.equal(optionalUrl(''), null)
  assert.equal(optionalUrl('javascript:alert(1)'), null)
  assert.equal(optionalUrl('http://example.com'), null)
  assert.equal(optionalUrl('https://instagram.com/comfysits'), 'https://instagram.com/comfysits')
})

test('subtotal and count match the verification scenario', () => {
  // 2× Osu Dining Chair (620) + 1× Volta Coffee Table (1650) = 2890, badge 3
  const cart = { 'osu-dining-chair': 2, 'volta-coffee': 1 }
  assert.equal(cartSubtotal(cart), 2890)
  assert.equal(cartCount(cart), 3)
})

test('decItem removes the item when qty reaches zero', () => {
  assert.deepEqual(decItem({ 'osu-dining-chair': 1 }, 'osu-dining-chair'), {})
  assert.deepEqual(decItem({ 'osu-dining-chair': 3 }, 'osu-dining-chair'), { 'osu-dining-chair': 2 })
})

test('the customer-visible catalog contains the expanded published collection', () => {
  assert.equal(PUBLISHED_PRODUCTS.length, 12)
  assert.deepEqual(
    new Set(PUBLISHED_PRODUCTS.map((product) => product.cat)),
    new Set(['sofa sets', 'center tables', 'dining sets', 'tv consoles'])
  )
  assert.ok(PUBLISHED_PRODUCTS.every((product) => product.published))
})

test('pending prices are deferred to WhatsApp confirmation', () => {
  const cart = { 'sienna-recliner-suite': 1, 'osu-dining-chair': 2 }
  assert.equal(cartSubtotal(cart), 1240)
  assert.equal(
    buildCartMessage(cart),
    "Hello Comfy Sits! I'd like to order:\n" +
      '• 1× Sienna Recliner Set — price to be confirmed\n' +
      '• 2× Osu Dining Chair — GH₵ 1,240\n\n' +
      'Subtotal: to be confirmed\n\n' +
      'Name:\nDelivery location:'
  )
})

test('published lookup hides unpublished and unknown products', () => {
  assert.equal(findPublishedProduct('osu-dining-chair')?.name, 'Osu Dining Chair')
  assert.equal(findPublishedProduct('accra-lounge'), undefined)
  assert.equal(findPublishedProduct('unknown'), undefined)
})

test('product images require both a source and useful alt text', () => {
  assert.equal(hasProductImage(undefined), false)
  assert.equal(hasProductImage({ src: '', alt: 'Chair' }), false)
  assert.equal(hasProductImage({ src: '/chair.webp', alt: '' }), false)
  assert.equal(hasProductImage({ src: '/chair.webp', alt: 'A chair' }), true)
})

test('missing product images receive an accessible fallback label', () => {
  assert.equal(productImageAlt('Osu Dining Chair'), 'Osu Dining Chair image coming soon')
  assert.equal(productImageAlt('Osu Dining Chair', { src: '/chair.webp', alt: 'Front view' }), 'Front view')
})

test('cart normalization keeps only published ids and valid quantities', () => {
  assert.deepEqual(normalizeCart({
    'osu-dining-chair': 2,
    'volta-coffee': 1.5,
    'tema-compact': Infinity,
    'accra-lounge': 1,
    unknown: 3,
    negative: -1,
    zero: 0,
  }), { 'osu-dining-chair': 2 })
  assert.deepEqual(normalizeCart({ 'osu-dining-chair': MAX_CART_QUANTITY + 1 }), {})
  assert.deepEqual(normalizeCart([]), {})
  assert.deepEqual(normalizeCart(null), {})
})

test('cart totals and messages use the same normalized empty cart', () => {
  const invalid = { unknown: 4, 'osu-dining-chair': -2 }
  assert.equal(cartCount(invalid), 0)
  assert.equal(cartSubtotal(invalid), 0)
  assert.equal(buildCartMessage(invalid), "Hello Comfy Sits! I'd like to order:\n\nSubtotal: GH₵ 0\n\nName:\nDelivery location:")
})

test('stored cart loading rewrites invalid data and clears corrupted data', () => {
  const values = new Map<string, string>([['comfysits-cart', JSON.stringify({ 'osu-dining-chair': 2, unknown: 5 })]])
  const storage: CartStorage = {
    getItem: (key) => values.get(key) ?? null,
    setItem: (key, value) => { values.set(key, value) },
    removeItem: (key) => { values.delete(key) },
  }
  assert.deepEqual(loadStoredCart(storage), { 'osu-dining-chair': 2 })
  assert.equal(values.get('comfysits-cart'), JSON.stringify({ 'osu-dining-chair': 2 }))

  values.set('comfysits-cart', 'not json')
  assert.deepEqual(loadStoredCart(storage), {})
  assert.equal(values.has('comfysits-cart'), false)
})

test('stored cart loading survives unavailable storage', () => {
  const unavailable: CartStorage = {
    getItem: () => { throw new Error('blocked') },
    setItem: () => { throw new Error('blocked') },
    removeItem: () => { throw new Error('blocked') },
  }
  assert.deepEqual(loadStoredCart(unavailable), {})
})

test('product metadata uses product content and omits unconfigured optional URLs', () => {
  const product = findPublishedProduct('tema-compact')
  assert.ok(product)
  const metadata = productMetadata(product)
  assert.equal(metadata.title, 'Tema Compact Set — Comfy Sits')
  assert.ok(metadata.description.includes(product.desc))
  assert.equal(metadata.canonicalUrl, null)
  assert.equal(metadata.openGraphImage, null)
})

test('gallery navigation wraps in both directions', () => {
  assert.equal(galleryIndex(0, 1, 3), 1)
  assert.equal(galleryIndex(2, 1, 3), 0)
  assert.equal(galleryIndex(0, -1, 3), 2)
  assert.equal(galleryIndex(0, 1, 0), 0)
})

test('asset prefixes public paths with the deployed base path', () => {
  setAssetBase('/comfy-sits/')
  assert.equal(asset('/logo.webp'), '/comfy-sits/logo.webp')
  assert.equal(asset('/products/aria-tv-console/front.webp'), '/comfy-sits/products/aria-tv-console/front.webp')
  setAssetBase('/comfy-sits')
  assert.equal(asset('/logo.webp'), '/comfy-sits/logo.webp')
  setAssetBase('/')
  assert.equal(asset('/logo.webp'), '/logo.webp')
})
