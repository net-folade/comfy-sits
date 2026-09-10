import { BUSINESS, optionalUrl } from '../config'
import type { Product } from '../data/products'

export interface PageMetadata {
  title: string
  description: string
  canonicalUrl: string | null
  openGraphImage: string | null
}

const joinUrl = (base: string, path: string): string | null => {
  const safeBase = optionalUrl(base)
  if (!safeBase) return null
  return new URL(path, safeBase).toString()
}

export const productMetadata = (product: Product): PageMetadata => ({
  title: `${product.name} — Comfy Sits`,
  description: `${product.desc}. View details and add this ${product.cat.toLowerCase().replace(/s$/, '')} to your Comfy Sits cart.`,
  canonicalUrl: joinUrl(BUSINESS.domain, `/products/${product.id}`),
  openGraphImage: optionalUrl(BUSINESS.openGraphImage),
})

export const applyPageMetadata = (metadata: PageMetadata): (() => void) => {
  document.title = metadata.title
  const description = document.querySelector<HTMLMetaElement>('meta[name="description"]')
  const previousDescription = description?.content
  if (description) description.content = metadata.description

  const dynamicNodes: HTMLElement[] = []
  const restorations: Array<() => void> = []
  const addLink = (rel: string, href: string | null) => {
    if (!href) return
    const link = document.createElement('link')
    link.rel = rel
    link.href = href
    link.dataset.dynamicMetadata = 'true'
    document.head.append(link)
    dynamicNodes.push(link)
  }
  const addMeta = (property: string, content: string | null) => {
    if (!content) return
    const existing = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
    if (existing) {
      const previous = existing.content
      existing.content = content
      restorations.push(() => { existing.content = previous })
      return
    }
    const meta = document.createElement('meta')
    meta.setAttribute('property', property)
    meta.content = content
    meta.dataset.dynamicMetadata = 'true'
    document.head.append(meta)
    dynamicNodes.push(meta)
  }

  addLink('canonical', metadata.canonicalUrl)
  addMeta('og:title', metadata.title)
  addMeta('og:description', metadata.description)
  addMeta('og:url', metadata.canonicalUrl)
  addMeta('og:image', metadata.openGraphImage)

  return () => {
    dynamicNodes.forEach((node) => node.remove())
    restorations.forEach((restore) => restore())
    if (description && previousDescription !== undefined) description.content = previousDescription
  }
}
