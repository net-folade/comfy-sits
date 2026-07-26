// Edit this file to change the catalog — components render whatever is here.
// Product photos: drop public/products/<id>.webp and update ProductImage.tsx.

export type Category = 'Chairs' | 'Tables' | 'Dining Sets'

export interface Product {
  id: string
  name: string
  cat: Category
  price: number
  desc: string
}

export const PRODUCTS: Product[] = [
  { id: 'accra-lounge', name: 'Accra Lounge Chair', cat: 'Chairs', price: 1450, desc: 'Solid teak frame with a woven cane back' },
  { id: 'adjoa-armchair', name: 'Adjoa Armchair', cat: 'Chairs', price: 1880, desc: 'Deep-seat comfort in ivory bouclé' },
  { id: 'osu-dining-chair', name: 'Osu Dining Chair', cat: 'Chairs', price: 620, desc: 'Sculpted mahogany, brass-capped legs' },
  { id: 'sankofa-rocker', name: 'Sankofa Rocker', cat: 'Chairs', price: 2100, desc: 'Hand-carved rocker in dark iroko' },
  { id: 'volta-coffee', name: 'Volta Coffee Table', cat: 'Tables', price: 1650, desc: 'Live-edge slab on a brass hairpin base' },
  { id: 'labadi-side', name: 'Labadi Side Table', cat: 'Tables', price: 780, desc: 'Compact walnut round in two heights' },
  { id: 'kumasi-console', name: 'Kumasi Console', cat: 'Tables', price: 2300, desc: 'Fluted front with soft-close storage' },
  { id: 'aburi-dining', name: 'Aburi Dining Table', cat: 'Tables', price: 3900, desc: 'Seats six, oiled dark oak' },
  { id: 'tema-compact', name: 'Tema Compact Set', cat: 'Dining Sets', price: 4200, desc: 'Round table with four Osu chairs' },
  { id: 'elmina-4', name: 'Elmina 4-Seater Set', cat: 'Dining Sets', price: 5400, desc: 'Family table with cushioned seats' },
  { id: 'ashanti-6', name: 'Ashanti 6-Seater Set', cat: 'Dining Sets', price: 8200, desc: 'Statement set in rich mahogany' },
  { id: 'cape-coast-8', name: 'Cape Coast 8-Seater', cat: 'Dining Sets', price: 11500, desc: 'Grand entertaining with brass inlay' },
]

export const CATEGORIES = ['All', 'Chairs', 'Tables', 'Dining Sets'] as const
export type CategoryFilter = (typeof CATEGORIES)[number]
