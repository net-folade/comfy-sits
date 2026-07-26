import { test } from 'node:test'
import { strict as assert } from 'node:assert'
import { cedi } from '../src/lib/format'
import { buildCartMessage, cartLink } from '../src/lib/whatsapp'
import { cartCount, cartSubtotal, decItem } from '../src/lib/cart'

test('cedi formats with GH₵ prefix and thousands separators', () => {
  assert.equal(cedi(620), 'GH₵ 620')
  assert.equal(cedi(1240), 'GH₵ 1,240')
  assert.equal(cedi(11500), 'GH₵ 11,500')
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
  const href = cartLink({ 'osu-dining-chair': 1 })
  assert.ok(href.startsWith('https://wa.me/233123456789?text='))
  const decoded = decodeURIComponent(href.split('?text=')[1])
  assert.ok(decoded.includes('• 1× Osu Dining Chair — GH₵ 620'))
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
