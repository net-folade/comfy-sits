import { BRAND } from '../config'
import { asset } from '../lib/asset'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <img
      className={`wordmark ${className}`}
      src={asset('/logo.webp')}
      width="1720"
      height="528"
      alt={BRAND}
      decoding="async"
    />
  )
}
