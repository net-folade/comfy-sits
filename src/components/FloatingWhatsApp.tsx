import { useState } from 'react'
import { directLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './WhatsAppIcon'

interface FloatingWhatsAppProps {
  hidden: boolean
}

// Hidden while the drawer or toast is open — on small screens it would
// otherwise sit on top of the drawer's order button.
// First click opens a chat prompt (icon flips to an ×); the prompt's
// button is what actually opens WhatsApp.
export function FloatingWhatsApp({ hidden }: FloatingWhatsAppProps) {
  const [open, setOpen] = useState(false)
  const whatsappUrl = directLink()

  if (hidden || !whatsappUrl) return null

  return (
    <div className="floating-wa-wrap">
      {open && (
        <div className="wa-popup" role="dialog" aria-label="Chat with Comfy Sits">
          <div className="wa-popup__title">Start a conversation?</div>
          <div className="wa-popup__text">
            Comfy Sits — chat with us on WhatsApp. We usually reply within minutes.
          </div>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-popup__cta"
          >
            Chat with us
          </a>
        </div>
      )}
      <button
        type="button"
        className="floating-wa"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? 'Close chat prompt' : 'Chat on WhatsApp'}
        title={open ? 'Close' : 'Chat on WhatsApp'}
      >
        {open ? (
          <span className="floating-wa__close" aria-hidden="true">
            ×
          </span>
        ) : (
          <WhatsAppIcon size={26} />
        )}
      </button>
    </div>
  )
}
