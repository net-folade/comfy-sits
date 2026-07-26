# ComfySits Showroom — Build Plan

## Context

ComfySits is a Ghana-based handcrafted furniture business (Accra). They need a showroom site where customers browse a catalog, build a cart, and tap **"Order on WhatsApp"** — which opens WhatsApp pre-filled with their cart contents. **No payments happen on-site**; the order is finalised in the WhatsApp conversation.

The design is already fully specified in `Comfy Sits Showroom v2.dc.html` — a Claude design-canvas file containing a working React-class prototype: 2 screens (Landing + Showroom), a slide-in cart drawer, 12 products across 3 categories, 6 FAQs, a toast, and a floating WhatsApp button. **It is a desktop-only mockup** (fixed pixel sizes, hardcoded 3-column grids, 72px headings). The core job of this build is to port that logic faithfully to React + Vite while re-authoring the layout **mobile-first**, since the audience is overwhelmingly on phones and on metered data.

Outcome: a fast, static, mobile-first SPA deployed to Vercel, ready to point the customer's domain at.

### Decisions locked in with the user

| Topic | Decision |
|---|---|
| Logo | The `logo.png` found in the parent folder is from another project (a beauty/salon mark). **Do not use it.** Use the "Comfy Sits" Cormorant Garamond wordmark, as the design file does. Leave a documented drop-in slot for a real logo later. |
| Product images | **CSS placeholders now** — warm gradient blocks with the product name. Zero image weight. Real photos drop into `public/products/<id>.webp` later with no component changes. |
| WhatsApp number | Use `233123456789` (acknowledged placeholder), isolated as a single constant in `src/config.ts`. |
| Catalog | Same structure as the design, but all products/FAQs extracted into editable data files so Folade can rewrite content without touching components. |

### Constraints

- Mobile-first, light on data — this is a hard requirement, not a nice-to-have. Budget: **< 150 KB gzipped** total on first load.
- No payment integration, no backend, no database. Fully static.
- Small reviewable diffs; ask before adding any dependency beyond those listed in Part 1.
- **Atomic commits** throughout — see below.

---

## Commit discipline

Every part below ships as one or more **atomic commits**: one logical change per commit, each leaving the app in a working state (`npm run build` passes). No "wip", no end-of-day dumps, no mixing a refactor into a feature commit. If a part naturally splits — data layer vs. the component that consumes it — it becomes two commits.

Format: **conventional commits** (`feat:`, `fix:`, `chore:`, `style:`, `test:`, `docs:`), imperative mood, scoped where it helps.

Planned commit sequence:

| Part | Commits |
|---|---|
| 0 | `chore: scaffold vite + react + ts project` · `chore: move design mockup to design/` · `chore: strip vite demo boilerplate` |
| 1 | `style: add brand tokens and mobile-first css base` |
| 2 | `feat(data): add product catalog and faq content` · `feat(lib): add cedi formatter and whatsapp link builder` · `feat(cart): add useCart hook with localstorage persistence` · `test: cover formatter, cart message, and qty decrement` |
| 3 | `feat(nav): add router with home and showroom routes` · `feat(ui): add responsive header` · `feat(ui): add footer` |
| 4 | `feat(home): add hero section` · `feat(home): add offers and category grid` · `feat(home): add faq accordion` |
| 5 | `feat(showroom): add category filter tabs` · `feat(showroom): add product grid and card` · `feat(ui): add placeholder product image component` |
| 6 | `feat(cart): add slide-in cart drawer` · `feat(cart): add scroll lock and focus trap` · `feat(ui): add add-to-cart toast` · `feat(ui): add floating whatsapp button` |
| 7 | `feat: add seo metadata, favicon, and robots.txt` |
| 8 | `chore: add vercel spa rewrite config` · `docs: add readme with deploy and handover notes` |

Commits happen locally as work proceeds. **Pushing to a remote and deploying are stop-and-confirm** — neither happens without explicit go-ahead in that message.

---

## Dependency budget

Runtime deps — only three:

- `react`, `react-dom`
- `react-router-dom` — **the one judgement call.** The design uses `state.screen` for navigation, which needs zero deps. But this is a real site on a real domain: `/showroom` needs to be linkable (WhatsApp shares, Instagram bio, Google). ~10 KB gzipped buys shareable URLs, back-button support, and per-page titles. Approving this plan approves this dep.

Dev deps: `vite`, `@vitejs/plugin-react`, `typescript`, `@types/react`, `@types/react-dom`.

**No CSS framework.** The design is already expressed as concrete values; plain CSS with custom properties is lighter than Tailwind and maps 1:1 to the mockup.

---

## Part 0 — Scaffold and ground truth

1. This plan already lives at `comfy-sits/BUILD_PLAN.md`. Keep it updated as parts complete.
2. `npm create vite@latest . -- --template react-ts` in `/Users/foladeakhibi/Desktop/projects/comfy-sits`.
   - The folder already contains `Comfy Sits Showroom v2.dc.html`. **Keep it** — it is the reference spec. Move it to `design/` so it doesn't get served.
3. `git init`, `.gitignore` (node_modules, dist, .vercel).
4. Strip Vite's demo content: delete `src/App.css`, the React/Vite logo assets, and the counter demo out of `App.tsx`.

**Checkpoint:** `npm run dev` serves a blank page with no console errors.

---

## Part 1 — Design tokens and the mobile-first CSS base

`src/styles/global.css` — a single stylesheet, no CSS-in-JS.

Extract every colour from the design file into custom properties on `:root`:

```
--cream:#F6F1E7   --cream-card:#FFFDF7  --sand:#EFE7D6   --sand-line:#E3D9C6
--espresso:#241812 --espresso-2:#3A2A1C --ink:#2B1D12
--brass:#C9A45C   --brass-lit:#D9B872   --brass-deep:#A98547
--muted:#8F7E66   --muted-2:#9A8A73     --wa-green:#1F8A4C  --wa-green-dk:#187540
```

Fonts: keep the Google Fonts link from the design (`preconnect` + `display=swap`) but **trim the weight list to only what is used** — Cormorant Garamond 600,700 and Karla 400,600,700. Drop the italic and the 500s. This alone cuts the font payload meaningfully.

**Mobile-first rule:** base styles are the phone layout. Every multi-column grid, large type size, and generous padding lives inside a `min-width` media query. Breakpoints: `640px` (tablet), `1024px` (desktop). Fluid type via `clamp()` so the two breakpoints do most of the work.

Global: `box-sizing:border-box`, `body{overflow-x:hidden}`, `:focus-visible` ring in `--brass`, `@media (prefers-reduced-motion)` disabling the drawer transition. Minimum tap target **44×44px** on every button — several design buttons are currently 28px and must grow on touch.

---

## Part 2 — Data and pure logic (no UI)

These are the pieces to port verbatim from the design file — the logic is correct, just needs typing and extracting.

**`src/config.ts`**
```ts
export const WHATSAPP_NUMBER = '233123456789'; // ← swap for the real number before launch
export const BRAND = 'Comfy Sits';
export const CART_STORAGE_KEY = 'comfysits-cart';
```

**`src/data/products.ts`** — `Product` type (`id, name, cat, price, desc`) + the 12 products copied from design lines 252–265, and `CATEGORIES = ['All','Chairs','Tables','Dining Sets']` (design line 266). This is the file Folade edits to change the catalog.

**`src/data/faqs.ts`** — the 6 FAQs from design lines 267–274.

**`src/lib/format.ts`** — reuse the design's `cedi()` exactly: `'GH₵ ' + n.toLocaleString('en-GH')`.

**`src/lib/whatsapp.ts`** — reuse the design's `waLink()` (strips non-digits, `https://wa.me/<num>?text=<encoded>`) and the exact `cartMsg` template from design line 323:
```
Hello Comfy Sits! I'd like to order:
• 2× Osu Dining Chair — GH₵ 1,240

Subtotal: GH₵ 1,240

Name:
Delivery location:
```
Plus `directLink()` for the "Contact Us" / floating button.

**`src/hooks/useCart.ts`** — port `setCart`, `inc`, `dec`, `remove`, `add`, `count`, `subtotal` from design lines 286–321. Cart shape stays `Record<productId, qty>` (compact in localStorage). Two things the port must preserve:
- the `try/catch` around `JSON.parse` on load (design line 281–284) — a corrupted key must not white-screen the site;
- resolving ids through `PRODUCTS.find` and dropping misses, so a deleted product in a stale cart is silently ignored rather than crashing.

**Checkpoint:** these are pure functions — write a quick test for `cedi`, `buildCartMessage`, and the `dec`-to-zero-removes-item case before building any UI.

---

## Part 3 — Shell: Header, Footer, routing

`src/App.tsx` sets up `BrowserRouter` with `/` → Home and `/showroom` → Showroom, and owns cart state + drawer state, passed down by props (the tree is shallow; no Context needed).

**`components/Header.tsx`** — sticky, `rgba(30,19,12,0.88)` + backdrop blur, brass hairline border.
- *Mobile:* height 60px, two columns — wordmark left, cart pill right. **The centre nav (Home/Showroom) is dropped**; the wordmark is the home link and the showroom is reachable from the hero CTA and category cards. The cart pill shrinks to a bag icon + count badge to protect the wordmark's space.
- *≥640px:* height 76px, restore the 3-column grid with the centre nav and the full `CART · n` pill, with the active-link brass underline from design lines 332–335.

**`components/Footer.tsx`** — single column stacked on mobile; 3-column at ≥1024px. The newsletter input is **presentational only** (there is no backend) — either disable it with a "coming soon" note or drop it. Recommend dropping it; a dead input on a trust-sensitive site is worse than no input. Keep social links as `#` placeholders until real URLs are supplied.

---

## Part 4 — Landing page

`src/pages/Home.tsx`, four sections:

1. **Hero** — `min-height:78vh` on mobile (not the design's fixed 600px, which overflows small phones), `calc(100vh - 76px)` at ≥1024px. Headline `clamp(34px, 9vw, 72px)`. The image slot becomes a `--espresso` → `--brass-deep` gradient block under the existing dark scrim, so the overlay text keeps its contrast with no photo present. "Shop Now" → `/showroom`.
2. **"What we can offer you"** — 3 cards (design lines 336–340, inline SVG icons ported as components). 1 column mobile → 3 at ≥1024px.
3. **Category grid** — the design's asymmetric 1.15fr/1fr mosaic collapses to a **single stacked column at 180px tall each** on mobile; the mosaic only appears at ≥1024px. Each card deep-links to `/showroom?cat=Chairs|Tables|Dining%20Sets`.
4. **FAQ accordion** — single-column always (the design's 2-column layout makes the accordion jump around when items open; one column is better on every size). Single-open behaviour and the ▲/▼ chevron from design lines 341–345. Use `<button aria-expanded>` + `<section role="region">` for accessibility.

---

## Part 5 — Showroom page

`src/pages/Showroom.tsx`

- Reads the active category from the `?cat=` search param so category deep-links and the browser back button work.
- **Filter tabs:** the 4 pills from design lines 346–351. On mobile these become a horizontally scrollable row (`overflow-x:auto`, no visible scrollbar, `scroll-snap`) rather than wrapping to two lines.
- **Product grid:** 1 column < 400px, 2 columns 400–767px, then `repeat(auto-fill, minmax(262px, 1fr))` — matching the design at desktop.
- **`components/ProductImage.tsx`** — the placeholder abstraction. Renders a deterministic warm gradient (hashed from the product id, so each product gets a stable distinct tone) with the product name in Cormorant. **If `public/products/<id>.webp` is later added, this is the single component to change** — `<img loading="lazy" decoding="async" width height>` and nothing else in the app moves.
- **`components/ProductCard.tsx`** — category eyebrow, name, desc, `cedi(price)`, "Add to cart". Card image area 200px on mobile, 250px at ≥640px.

---

## Part 6 — Cart drawer, toast, floating WhatsApp

**`components/CartDrawer.tsx`** — the highest-value screen; get it right on mobile.
- `width:min(420px, 92vw)`, slides via `transform: translateX(108%→0)` (design line 360). Overlay click and Escape both close.
- **Body scroll lock** while open, and **focus trap** — the design prototype has neither, and both are noticeable bugs on a phone.
- Empty state (design lines 212–218) with "Browse the showroom".
- Line items: 64px thumb, name, `GH₵ n each`, Remove, and −/qty/+ steppers. The design's 28px steppers **must grow to 44px on touch**.
- Sticky footer: SUBTOTAL + the green **"Send order on WhatsApp"** button (`target="_blank" rel="noopener noreferrer"`) + the reassurance line "Opens WhatsApp with your cart pre-filled — you confirm everything with us before paying." Footer must sit above the iOS Safari bottom bar — use `padding-bottom: max(26px, env(safe-area-inset-bottom))`.

**`components/Toast.tsx`** — "X added to cart" + "View cart", auto-dismiss 2600ms with the timer cleared on unmount (design lines 293–297). `role="status"` so screen readers announce it.

**`components/FloatingWhatsApp.tsx`** — fixed bottom-right, 58px green circle. **Must hide while the drawer or toast is open** — on a 375px screen it otherwise sits directly on top of the drawer's order button. This is a real collision the desktop mockup never exposes.

---

## Part 7 — Polish, SEO, and metadata

- `index.html`: `<title>Comfy Sits — Handcrafted Furniture in Accra</title>`, meta description, `theme-color: #241812`, Open Graph tags (WhatsApp renders link previews — this matters when customers share the site).
- Favicon: a small inline SVG "CS" monogram in brass on espresso. **Not** the salon logo.
- `<html lang="en">`, one `<h1>` per page, alt text on meaningful graphics.
- `public/robots.txt`.

---

## Part 8 — Build, budget check, and Vercel deploy

1. `npm run build` → inspect `dist/`. **Assert the gzipped JS+CSS is under 150 KB.** If it isn't, investigate before deploying.
2. `npm run preview` and walk the full flow once more against the built output.
3. `vercel.json` with the SPA rewrite — without it, a direct hit on `/showroom` 404s:
   ```json
   { "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }] }
   ```
4. Push to GitHub, import to Vercel (framework preset auto-detects Vite; build `npm run build`, output `dist`).
5. **Deployment is a stop-and-confirm step** — I will not push or deploy without explicit go-ahead in that message.
6. Domain: hand over the DNS records; the customer points their domain at Vercel.

---

## Verification

Run after Part 6, and again against the production build in Part 8.

**Responsive** — DevTools device toolbar at **375px** (iPhone SE), **768px**, **1280px**. At every width: no horizontal scroll on `<body>`; no text clipped; every tap target ≥44px; the floating button never covers the drawer CTA.

**Cart flow, end to end**
1. Add 2× "Osu Dining Chair" and 1× "Volta Coffee Table" → header badge reads **3**.
2. Open drawer → subtotal reads **GH₵ 2,890** (620×2 + 1650). This is the arithmetic that must be right; a wrong total sent to WhatsApp is a real business problem.
3. Reload the page → cart survives (localStorage).
4. `−` on a qty-1 item removes the row; emptying the cart shows the empty state.

**WhatsApp link** — copy the button's `href` and decode it. Confirm: number is `233123456789`, and the body contains one `• 2× Osu Dining Chair — GH₵ 1,240` line per item, the subtotal, and the trailing `Name:` / `Delivery location:` prompts. Then **open it on an actual phone** — desktop `wa.me` behaviour differs from mobile and this is the single most important link on the site.

**Resilience** — set `localStorage['comfysits-cart'] = 'not json'` in the console and reload; the site must render normally with an empty cart, not white-screen.

**Routing** — `/showroom?cat=Tables` loads with the Tables tab pre-selected; browser back returns to `/`.

**Unit tests** — `cedi`, `buildCartMessage`, and the decrement-to-removal case pass.

---

## Notes and follow-ups

- **Real logo** — the wordmark ships now. `src/components/Wordmark.tsx` is the one file to change when a real mark arrives.
- **Real WhatsApp number** — `src/config.ts` line 1. Must be corrected before the domain goes live.
- **Product photos** — drop `public/products/<id>.webp` (matching the ids in `src/data/products.ts`) and update `ProductImage.tsx` only. Target ≤60 KB each; that is the main future data cost, so it deserves a compression pass when the photos arrive.
- **Out of scope by request:** payments, accounts, order history, inventory, admin CMS.
- **Newsletter input** is being dropped rather than faked — flagging in case the customer actually wants it, which would need a backend or a Formspree-style service.
