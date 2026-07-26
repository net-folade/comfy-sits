# Comfy Sits — Showroom

Mobile-first showroom site for Comfy Sits, a handcrafted furniture business in Accra, Ghana. Customers browse the catalog, build a cart, and tap **"Send order on WhatsApp"** — the order is finalised in the WhatsApp conversation. No payments happen on-site; the site is fully static (React + Vite).

The original design mockup lives in `design/` and is the visual reference.


## Editing content 

| What | Where |
|---|---|
| Products (name, price, description, category) | `src/data/products.ts` |
| FAQs | `src/data/faqs.ts` |
| WhatsApp number | `src/config.ts` — **swap the placeholder before launch** |
| Social links, opening hours | `src/components/Footer.tsx` |

## Before launch checklist

1. **WhatsApp number** — `src/config.ts` still holds the placeholder `233123456789`. Replace with the real number (country code, digits only).
2. **Product photos** — drop `public/products/<id>.webp` files (ids from `src/data/products.ts`, target ≤60 KB each) and swap the placeholder markup in `src/components/ProductImage.tsx` for the `<img>` shown in its comment. Nothing else changes.
3. **Logo** — the serif wordmark ships now. When a real logo exists, edit only `src/components/Wordmark.tsx`.
4. **Social links** — real Instagram/Facebook URLs in `src/components/Footer.tsx` (currently `#`).
5. Test the WhatsApp order link **on a real phone** — desktop `wa.me` behaves differently.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. Import into Vercel — the Vite preset is auto-detected (build `npm run build`, output `dist`).
3. `vercel.json` already contains the SPA rewrite so `/showroom` deep links work.
4. Point the customer's domain at Vercel (Vercel dashboard → Domains → follow the DNS instructions).

## Notes

- The newsletter input from the mockup was intentionally dropped — it would need a backend or a form service (e.g. Formspree) to be real.
- Cart persists in `localStorage` under `comfysits-cart`; a corrupted value falls back to an empty cart.
- Out of scope by request: payments, accounts, order history, inventory, admin CMS.
