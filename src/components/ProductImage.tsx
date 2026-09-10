import { useEffect, useState } from 'react'
import type { ProductImageData } from '../data/products'
import { hasProductImage, productImageAlt } from '../lib/images'

interface ProductImageProps {
  id: string
  name: string
  image?: ProductImageData
  showName?: boolean
  eager?: boolean
  fit?: 'cover' | 'contain'
  sizes?: string
}

// Deterministic hash so each product keeps a stable, distinct tone.
function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997
  return h
}

// Real photographs use the shared product data; missing files fall back to
// a deterministic warm placeholder without changing surrounding layouts.
export function ProductImage({
  id,
  name,
  image,
  showName = true,
  eager = false,
  fit = 'cover',
  sizes,
}: ProductImageProps) {
  const [failed, setFailed] = useState(false)
  const [loaded, setLoaded] = useState(false)
  useEffect(() => {
    setFailed(false)
    setLoaded(false)
  }, [image?.src])

  const h = hashId(id)
  const hue = 18 + (h % 25)
  const light = 26 + (h % 12)
  const background = `linear-gradient(155deg, hsl(${hue} 36% ${light}%) 0%, hsl(${hue + 10} 44% ${light + 16}%) 100%)`

  if (hasProductImage(image) && !failed) {
    return (
      <picture className={`product-image-picture${loaded ? ' product-image-picture--loaded' : ''}`}>
        {image.sources?.map((source) => (
          <source key={`${source.srcSet}-${source.media ?? ''}`} {...source} />
        ))}
        <img
          className={`product-image product-image--${fit}`}
          src={image.src}
          alt={image.alt}
          width={image.width ?? 1200}
          height={image.height ?? 900}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : 'auto'}
          decoding="async"
          sizes={sizes}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
        />
      </picture>
    )
  }

  return (
    <div className="product-image product-image--placeholder" style={{ background }} role="img" aria-label={productImageAlt(name, image)}>
      {showName && <span className="product-image__name">{name}</span>}
    </div>
  )
}
