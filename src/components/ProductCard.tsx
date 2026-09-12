import { categoryLabel, type Product } from '../data/products'
import { Link } from 'react-router-dom'
import { cedi } from '../lib/format'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  onAdd: (id: string, name: string) => void
  /** Opt into the home page's scroll-reveal animation. */
  reveal?: boolean
}

export function ProductCard({ product, onAdd, reveal }: ProductCardProps) {
  return (
    <div className="product-card" data-product-id={product.id} data-home-reveal={reveal ? '' : undefined}>
      <Link
        to={`/products/${product.id}`}
        className="product-card__image"
        aria-label={`View ${product.name} details`}
      >
        <ProductImage id={product.id} name={product.name} image={product.images[0]} sizes="(min-width: 768px) 30vw, 50vw" />
      </Link>
      <div className="product-card__body">
        <div className="product-card__eyebrow">{categoryLabel(product.cat)}</div>
        <Link to={`/products/${product.id}`} className="product-card__name">
          {product.name}
        </Link>
        <div className="product-card__desc">{product.desc}</div>
        <div className="product-card__row">
          <div className="product-card__price">
            {product.pricePending ? 'price coming soon' : cedi(product.price)}
          </div>
          <button
            type="button"
            className="product-card__add"
            onClick={() => onAdd(product.id, product.name)}
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}
