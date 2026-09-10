import type { ProductImageData } from '../data/products'

export const hasProductImage = (image?: ProductImageData): image is ProductImageData =>
  typeof image?.src === 'string' && image.src.trim().length > 0 && image.alt.trim().length > 0

export const productImageAlt = (name: string, image?: ProductImageData): string =>
  hasProductImage(image) ? image.alt : `${name} image coming soon`
