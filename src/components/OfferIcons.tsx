interface IconProps {
  d: string
}

// Icon paths ported from the design mockup (offers section).
function Icon({ d }: IconProps) {
  return (
    <svg
      width="34"
      height="34"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d={d} />
    </svg>
  )
}

export const MadeToOrderIcon = () => <Icon d="M21 8l-9-5-9 5 9 5 9-5zm-18 0v8l9 5 9-5V8M12 13v8" />

export const DeliveryIcon = () => (
  <Icon d="M1 8h13v9H1zM14 11h4l3 3v3h-7zM5.5 20a1.5 1.5 0 1 0 0-.01M17.5 20a1.5 1.5 0 1 0 0-.01" />
)

export const ExchangeIcon = () => (
  <Icon d="M4 9a8 8 0 0 1 14-3l3 3m0-6v6h-6M20 15a8 8 0 0 1-14 3l-3-3m0 6v-6h6" />
)
