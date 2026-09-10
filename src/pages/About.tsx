import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { directLink } from '../lib/whatsapp'

export function About() {
  const navigate = useNavigate()
  const whatsappUrl = directLink()

  useEffect(() => {
    document.title = 'About — Comfy Sits'
  }, [])

  return (
    <main className="about">
      <button type="button" className="back-link" onClick={() => navigate(-1)}>
        ← Back
      </button>
      <div className="about__eyebrow">ABOUT US</div>
      <h1 className="about__title">Handcrafted in Accra</h1>
      <p className="about__body">
        Comfy Sits crafts high-quality sofa sets, tables and dining sets — each piece reflecting a
        warm, timeless aesthetic. Everything is made to order in our Accra workshop, in rich dark
        woods with brass detailing, and delivered carefully wherever you are.
      </p>
      <p className="about__body">
        Have a question about a piece, a custom size or delivery? We're one message away.
      </p>
      {whatsappUrl && <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="about__cta">
        WhatsApp us ↗
      </a>}
    </main>
  )
}
