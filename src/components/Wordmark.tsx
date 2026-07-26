import { BRAND } from '../config'

// Logo drop-in slot: when a real logo arrives, replace this component's
// output with an <img> — nothing else in the app needs to change.
export function Wordmark({ className = '' }: { className?: string }) {
  return <span className={`wordmark ${className}`}>{BRAND}</span>
}
