// Edit this file to change the catalog — components render whatever is here.
// Product photos live under public/products/<id>/ and are referenced below.

export type Category =
  | 'sofa sets'
  | 'l-shapes'
  | 'office sets'
  | 'tv consoles'
  | 'center tables'
  | 'dining sets'

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
  pricePending?: boolean
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
  {
    id: 'sienna-recliner-suite',
    name: 'Sienna Recliner Set',
    cat: 'sofa sets',
    price: 0,
    pricePending: true,
    desc: 'Cocoa-toned recliner set with quilted panels and stud detailing',
    includes: '1 three-seater, 1 two-seater and 2 armchairs',
    materials: 'Leather-look upholstery with metal stud accents',
    images: [
      { src: '/products/sienna-recliner-suite/full-set.webp', alt: 'Complete Sienna recliner set in cocoa brown', width: 1280, height: 960 },
      { src: '/products/sienna-recliner-suite/armchair.webp', alt: 'Sienna recliner armchair front view', width: 1280, height: 960 },
      { src: '/products/sienna-recliner-suite/three-seater.webp', alt: 'Sienna three-seater recliner sofa front view', width: 1280, height: 960 },
      { src: '/products/sienna-recliner-suite/two-seater.webp', alt: 'Sienna two-seater recliner sofa front view', width: 1280, height: 960 },
    ],
    available: true,
    published: true,
  },
  {
    id: 'halo-dressing-table',
    name: 'Halo Dressing Table',
    cat: 'center tables',
    price: 0,
    pricePending: true,
    desc: 'Soft-curved dressing table with an illuminated mirror and generous storage',
    includes: '1 dressing table, 1 illuminated mirror and 1 stool',
    images: [
      { src: '/products/halo-dressing-table/front.webp', alt: 'Halo dressing table with illuminated mirror and stool', width: 1280, height: 960 },
      { src: '/products/halo-dressing-table/storage.webp', alt: 'Halo dressing table with its compartment drawer open', width: 1280, height: 960 },
    ],
    available: true,
    published: true,
  },
  {
    id: 'aria-tv-console',
    name: 'Aria TV Console',
    cat: 'tv consoles',
    price: 0,
    pricePending: true,
    desc: 'Layered black console with gold-tone rails and crisp white drawers',
    includes: '1 upper console and 1 lower display unit',
    images: [{ src: '/products/aria-tv-console/front.webp', alt: 'Aria black and gold TV console with twin white drawers', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'luna-bistro-set',
    name: 'Luna Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'A compact round table paired with two sculpted wraparound chairs',
    includes: '1 round table and 2 dining chairs',
    images: [{ src: '/products/luna-bistro-set/set.webp', alt: 'Luna set with round marble-effect table and two chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'heritage-dining-set',
    name: 'Heritage Dining Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'A warm wood dining set with carved lattice details and patterned seats',
    includes: '1 rectangular table and 6 dining chairs',
    images: [{ src: '/products/heritage-dining-set/set.webp', alt: 'Heritage wood dining table with six patterned chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'aurelia-dining-set',
    name: 'Aurelia Dining Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'A luminous gold-tone dining set with a marble-effect top and black seats',
    includes: '1 rectangular table and 6 dining chairs',
    images: [{ src: '/products/aurelia-dining-set/set.webp', alt: 'Aurelia gold-tone dining table with six black chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'noir-dining-set',
    name: 'Noir Dining Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'Bold black marble-effect dining set framed in polished silver tones',
    includes: '1 rectangular table and 6 dining chairs',
    images: [{ src: '/products/noir-dining-set/set.webp', alt: 'Noir black dining table with six silver-tone chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'amber-dining-set',
    name: 'Amber Dining Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'A softly rounded dining set with amber seats and a sculptural gold-tone base',
    includes: '1 rectangular table and 6 dining chairs',
    images: [{ src: '/products/amber-dining-set/set.webp', alt: 'Amber dining table with six warm brown quilted chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
  {
    id: 'pearl-dining-set',
    name: 'Pearl Dining Set',
    cat: 'dining sets',
    price: 0,
    pricePending: true,
    desc: 'Bright marble-effect dining set with a polished frame and cream seats',
    includes: '1 rectangular table and 6 dining chairs',
    images: [{ src: '/products/pearl-dining-set/set.webp', alt: 'Pearl white dining table with six cream chairs', width: 1280, height: 960 }],
    available: true,
    published: true,
  },
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

export const CATEGORIES = [
  'all',
  'sofa sets',
  'l-shapes',
  'office sets',
  'tv consoles',
  'center tables',
  'dining sets',
] as const
export type CategoryFilter = (typeof CATEGORIES)[number]

export const categoryLabel = (category: CategoryFilter): string =>
  category === 'center tables' ? 'tables' : category
