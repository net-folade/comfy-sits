interface ProductImageProps {
  id: string
  name: string
  showName?: boolean
}

// Deterministic hash so each product keeps a stable, distinct tone.
function hashId(id: string): number {
  let h = 0
  for (let i = 0; i < id.length; i++) h = (h * 31 + id.charCodeAt(i)) % 997
  return h
}

// Placeholder product visual: a warm gradient block with the product name.
// When real photos exist, drop them in public/products/<id>.webp and replace
// this component's output with:
//   <img src={`/products/${id}.webp`} alt={name} loading="lazy" decoding="async" width={..} height={..} />
// Nothing else in the app needs to change.
export function ProductImage({ id, name, showName = true }: ProductImageProps) {
  const h = hashId(id)
  const hue = 18 + (h % 25)
  const light = 26 + (h % 12)
  const background = `linear-gradient(155deg, hsl(${hue} 36% ${light}%) 0%, hsl(${hue + 10} 44% ${light + 16}%) 100%)`

  return (
    <div className="product-image" style={{ background }} role="img" aria-label={name}>
      {showName && <span className="product-image__name">{name}</span>}
    </div>
  )
}
