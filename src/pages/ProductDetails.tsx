import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { ProductGallery } from '../components/ProductGallery'
import { categoryLabel, findPublishedProduct } from '../data/products'
import { cedi } from '../lib/format'
import { applyPageMetadata, productMetadata } from '../lib/metadata'

interface ProductDetailsProps {
  onAdd: (id: string, name: string) => void
}

export function ProductDetails({ onAdd }: ProductDetailsProps) {
  const { productId = '' } = useParams()
  const product = findPublishedProduct(productId)

  useEffect(() => {
    if (product) return applyPageMetadata(productMetadata(product))
    document.title = 'Product not found — Comfy Sits'
  }, [product])

  if (!product) {
    return (
      <main className="product-missing">
        <p className="product-detail__eyebrow">PRODUCT UNAVAILABLE</p>
        <h1>This piece isn't in the showroom</h1>
        <p>It may be unpublished or no longer available.</p>
        <Link to="/showroom" className="product-detail__cta">Browse the showroom</Link>
      </main>
    )
  }

  return (
    <main className="product-detail">
      <BackButton fallbackTo="/showroom" />
      <div className="product-detail__layout">
        <ProductGallery product={product} />
        <section className="product-detail__info">
          <p className="product-detail__eyebrow">{categoryLabel(product.cat)}</p>
          <h1>{product.name}</h1>
          <p className="product-detail__price">
            {product.pricePending ? 'price coming soon' : cedi(product.price)}
          </p>
          <p className="product-detail__desc">{product.desc}</p>
          {product.includes && <p className="product-detail__includes"><strong>This set includes:</strong> {product.includes}</p>}
          <dl className="product-detail__specs">
            {product.materials && <><dt>Materials</dt><dd>{product.materials}</dd></>}
            {product.dimensions && <><dt>Dimensions</dt><dd>{product.dimensions}</dd></>}
            {product.leadTime && <><dt>Lead time</dt><dd>{product.leadTime}</dd></>}
            <dt>Availability</dt><dd>{product.available ? 'Available to enquire' : 'Currently unavailable'}</dd>
          </dl>
          <button
            type="button"
            className="product-detail__cta"
            disabled={!product.available}
            onClick={() => onAdd(product.id, product.name)}
          >
            Add to cart
          </button>
        </section>
      </div>
    </main>
  )
}
