import type { Product } from '../data/products'
import { cedi } from '../lib/format'
import { ProductImage } from './ProductImage'

interface ProductCardProps {
  product: Product
  onAdd: (id: string, name: string) => void
}

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <div className="product-card">
      <div className="product-card__image">
        <ProductImage id={product.id} name={product.name} />
      </div>
      <div className="product-card__body">
        <div className="product-card__eyebrow">{product.cat.toUpperCase()}</div>
        <div className="product-card__name">{product.name}</div>
        <div className="product-card__desc">{product.desc}</div>
        <div className="product-card__row">
          <div className="product-card__price">{cedi(product.price)}</div>
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
