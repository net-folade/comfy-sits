import { useSearchParams } from 'react-router-dom'
import { CATEGORIES, type CategoryFilter } from '../data/products'

export function Showroom() {
  const [searchParams, setSearchParams] = useSearchParams()
  const raw = searchParams.get('cat')
  const filter: CategoryFilter = CATEGORIES.includes(raw as CategoryFilter)
    ? (raw as CategoryFilter)
    : 'All'

  const pick = (c: CategoryFilter) => {
    setSearchParams(c === 'All' ? {} : { cat: c })
  }

  return (
    <main className="showroom">
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
            {c}
          </button>
        ))}
      </div>
    </main>
  )
}
