interface ToastProps {
  message: string
  onViewCart: () => void
}

export function Toast({ message, onViewCart }: ToastProps) {
  if (!message) return null
  return (
    <div className="toast" role="status">
      <span className="toast__text">{message}</span>
      <button type="button" className="toast__cta" onClick={onViewCart}>
        View cart
      </button>
    </div>
  )
}
