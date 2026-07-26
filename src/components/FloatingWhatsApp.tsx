import { directLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

interface FloatingWhatsAppProps {
  hidden: boolean
}

// Hidden while the drawer or toast is open — on small screens it would
// otherwise sit on top of the drawer's order button.
export function FloatingWhatsApp({ hidden }: FloatingWhatsAppProps) {
  if (hidden) return null
  return (
    <a
      href={directLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-wa"
      title="Chat on WhatsApp"
      aria-label="Chat on WhatsApp"
    >
      <WhatsAppIcon size={26} />
    </a>
  )
}
