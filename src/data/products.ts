// Edit this file to change the catalog — components render whatever is here.
// Product photos live under public/products/<id>/ and are referenced below.

export type Category = 'sofa sets' | 'center tables' | 'dining sets'

export interface ProductImageData {
  src: string
  alt: string
  width?: number
  height?: number
  sources?: ProductImageSource[]
}

export interface ProductImageSource {
  srcSet: string
  type?: string
  media?: string
}

export interface Product {
  id: string
  name: string
  cat: Category
  price: number
  desc: string
  images: ProductImageData[]
  includes?: string
  dimensions?: string
  materials?: string
  leadTime?: string
  available: boolean
  published: boolean
}

export const PRODUCTS: Product[] = [
  { id: 'accra-lounge', name: 'Accra Lounge Chair', cat: 'sofa sets', price: 1450, desc: 'Solid teak frame with a woven cane back', images: [], available: false, published: false },
  { id: 'adjoa-armchair', name: 'Adjoa Armchair', cat: 'sofa sets', price: 1880, desc: 'Deep-seat comfort in ivory bouclé', images: [], available: false, published: false },
  { id: 'osu-dining-chair', name: 'Osu Dining Chair', cat: 'sofa sets', price: 620, desc: 'Sculpted mahogany, brass-capped legs', materials: 'Mahogany with brass-capped legs', images: [{ src: '/products/osu-dining-chair/chair-front.webp', alt: 'Osu dining chair' }], available: true, published: true },
  { id: 'sankofa-rocker', name: 'Sankofa Rocker', cat: 'sofa sets', price: 2100, desc: 'Hand-carved rocker in dark iroko', images: [], available: false, published: false },
  { id: 'volta-coffee', name: 'Volta Coffee Table', cat: 'center tables', price: 1650, desc: 'Live-edge slab on a brass hairpin base', materials: 'Live-edge wood with a brass hairpin base', images: [{ src: '/products/volta-coffee/table.webp', alt: 'Volta coffee table' }], available: true, published: true },
  { id: 'labadi-side', name: 'Labadi Side Table', cat: 'center tables', price: 780, desc: 'Compact walnut round in two heights', images: [], available: false, published: false },
  { id: 'kumasi-console', name: 'Kumasi Console', cat: 'center tables', price: 2300, desc: 'Fluted front with soft-close storage', images: [], available: false, published: false },
  { id: 'aburi-dining', name: 'Aburi Dining Table', cat: 'center tables', price: 3900, desc: 'Seats six, oiled dark oak', images: [], available: false, published: false },
  { id: 'tema-compact', name: 'Tema Compact Set', cat: 'dining sets', price: 4200, desc: 'Round table with four Osu chairs', includes: '1 round dining table and 4 Osu chairs', images: [{ src: '/products/tema-compact/set.webp', alt: 'Complete Tema compact dining set with one round table and four chairs' }], available: true, published: true },
  { id: 'elmina-4', name: 'Elmina 4-Seater Set', cat: 'dining sets', price: 5400, desc: 'Family table with cushioned seats', images: [], available: false, published: false },
  { id: 'ashanti-6', name: 'Ashanti 6-Seater Set', cat: 'dining sets', price: 8200, desc: 'Statement set in rich mahogany', images: [], available: false, published: false },
  { id: 'cape-coast-8', name: 'Cape Coast 8-Seater', cat: 'dining sets', price: 11500, desc: 'Grand entertaining with brass inlay', images: [], available: false, published: false },
]

export const PUBLISHED_PRODUCTS = PRODUCTS.filter((product) => product.published)

export const findPublishedProduct = (id: string): Product | undefined =>
  PUBLISHED_PRODUCTS.find((product) => product.id === id)

export const CATEGORIES = ['all', 'sofa sets', 'center tables', 'dining sets'] as const
export type CategoryFilter = (typeof CATEGORIES)[number]

export const categoryLabel = (category: CategoryFilter): string =>
  category === 'center tables' ? 'tables' : category
