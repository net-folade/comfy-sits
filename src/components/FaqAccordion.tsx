import { useState } from 'react'
import { FAQS } from '../data/faqs'

export function FaqAccordion() {
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <div className="faq__list">
      {FAQS.map((f, i) => {
        const open = openFaq === i
        return (
          <div key={f.q} className="faq-item" data-home-reveal="">
            <button
              type="button"
              className="faq-item__question"
              aria-expanded={open}
              aria-controls={`faq-answer-${i}`}
              onClick={() => setOpenFaq(open ? null : i)}
            >
              <span>{f.q}</span>
              <span className="faq-item__chevron" aria-hidden="true">
                ⌄
              </span>
            </button>
            {open && (
              <section id={`faq-answer-${i}`} role="region" className="faq-item__answer">
                {f.a}
              </section>
            )}
          </div>
        )
      })}
    </div>
  )
}
