import { useEffect, useRef, useState } from 'react'
import type { Product } from '../data/products'
import { ProductImage } from './ProductImage'
import { galleryIndex } from '../lib/gallery'

interface ProductGalleryProps {
  product: Product
}

export function ProductGallery({ product }: ProductGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const images = product.images.length > 0 ? product.images : [undefined]

  useEffect(() => {
    setActiveIndex(0)
    scrollerRef.current?.scrollTo({ left: 0 })
  }, [product.id])

  const selectImage = (index: number, behavior: ScrollBehavior = 'smooth') => {
    setActiveIndex(index)
    const scroller = scrollerRef.current
    if (scroller) scroller.scrollTo({ left: index * scroller.clientWidth, behavior })
  }

  const selectRelative = (offset: number) => {
    selectImage(galleryIndex(activeIndex, offset, images.length))
  }

  const syncActiveImage = () => {
    const scroller = scrollerRef.current
    if (!scroller || scroller.clientWidth === 0) return
    const index = Math.min(images.length - 1, Math.max(0, Math.round(scroller.scrollLeft / scroller.clientWidth)))
    setActiveIndex(index)
  }

  return (
    <section className="product-gallery" aria-label={`${product.name} gallery`}>
      <div className="product-gallery__viewport">
        <div
          ref={scrollerRef}
          className="product-gallery__main"
          onScroll={syncActiveImage}
          aria-label="Swipe or scroll to browse photographs"
        >
          {images.map((image, index) => (
            <div className="product-gallery__slide" key={image?.src ?? index}>
              <ProductImage
                id={product.id}
                name={product.name}
                image={image}
                eager={index === 0}
                fit="contain"
                sizes="(min-width: 1024px) 56vw, 100vw"
              />
            </div>
          ))}
        </div>
        {images.length > 1 && (
          <div className="product-gallery__controls">
            <button type="button" onClick={() => selectRelative(-1)} aria-label="Previous photograph">
              ←
            </button>
            <span aria-live="polite">{activeIndex + 1} / {images.length}</span>
            <button type="button" onClick={() => selectRelative(1)} aria-label="Next photograph">
              →
            </button>
          </div>
        )}
      </div>
      {images.length > 1 && (
        <div className="product-gallery__thumbnails" role="list" aria-label="Choose a photograph">
          {images.map((image, index) => (
            <button
              type="button"
              role="listitem"
              key={image?.src ?? index}
              className={index === activeIndex ? 'product-gallery__thumbnail product-gallery__thumbnail--active' : 'product-gallery__thumbnail'}
              aria-label={`Show photograph ${index + 1}: ${image?.alt ?? product.name}`}
              aria-current={index === activeIndex ? 'true' : undefined}
              onClick={() => selectImage(index)}
            >
              <ProductImage id={product.id} name={product.name} image={image} showName={false} sizes="96px" />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
