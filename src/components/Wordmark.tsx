import { BRAND } from '../config'

export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <img
      className={`wordmark ${className}`}
      src="/logo.webp"
      width="1720"
      height="528"
      alt={BRAND}
      decoding="async"
    />
  )
}
