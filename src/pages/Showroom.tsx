import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import { BackButton } from '../components/BackButton'
import { ProductCard } from '../components/ProductCard'
import { CATEGORIES, PUBLISHED_PRODUCTS, categoryLabel, type CategoryFilter } from '../data/products'

interface ShowroomProps {
  onAdd: (id: string, name: string) => void
}

export function Showroom({ onAdd }: ShowroomProps) {
  useEffect(() => {
    document.title = 'The Showroom — Comfy Sits'
  }, [])

  const [searchParams, setSearchParams] = useSearchParams()
  const raw = searchParams.get('cat')
  const filter: CategoryFilter = CATEGORIES.includes(raw as CategoryFilter)
    ? (raw as CategoryFilter)
    : 'all'

  const pick = (c: CategoryFilter) => {
    setSearchParams(c === 'all' ? {} : { cat: c })
  }

  const shown = filter === 'all' ? PUBLISHED_PRODUCTS : PUBLISHED_PRODUCTS.filter((p) => p.cat === filter)

  return (
    <main className="showroom">
      <BackButton fallbackTo="/" />
      <div className="showroom__head">
        <div>
          <div className="showroom__eyebrow">THE SHOWROOM</div>
          <h1 className="showroom__title">Browse the collection</h1>
        </div>
        <div className="showroom__hint">
          Add pieces to your cart, then send it to us to finalise your order.
        </div>
      </div>

      <div className="filter-tabs" role="group" aria-label="Filter by category">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            type="button"
            className={`filter-tab ${filter === c ? 'filter-tab--active' : ''}`}
            aria-pressed={filter === c}
            onClick={() => pick(c)}
          >
            {categoryLabel(c)}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {shown.map((p) => (
          <ProductCard key={p.id} product={p} onAdd={onAdd} />
        ))}
      </div>
      {shown.length === 0 && <p className="showroom__empty">No published pieces are available in this category yet.</p>}
    </main>
  )
}
