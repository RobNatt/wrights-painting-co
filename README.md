# Wright's Painting Co. website

Next.js 16 (App Router) + Tailwind CSS 4. Built from [design-system.md](design-system.md).

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Pages

| Route | Target keyword |
|---|---|
| `/` | painter Wilmington NC |
| `/interior-painting` | interior painting Wilmington NC |
| `/exterior-painting` | exterior house painting Wilmington NC |
| `/about` | (brand / trust) |
| `/rentals` | can be turned off, see below |

Every page has the sticky header with tap-to-call, the LocalBusiness (`HousePainter`) schema, and a quote form with `id="quote"`. All "Get a free quote" buttons link to it.

## Before launch: placeholders

Every unconfirmed detail lives in **`src/config/site.ts`**. It shows on the page with a dashed brick outline and a **TBC** tag. When Mo confirms a value, replace it and set `confirmed: true`. Unconfirmed values are kept **out of the schema**, so search engines never see placeholder data.

| Item | Where |
|---|---|
| Phone (currently a fictional 555-01xx number) | `site.phone` |
| Whether Mo takes texts | `site.acceptsTexts` |
| Hours | `site.hours` (add `openingHoursSpecification` in `LocalBusinessSchema.tsx` once confirmed) |
| Service-area subhead | `site.serviceAreaSummary` |
| Towns served | `site.towns` |
| Insurance details | `site.insurance` |
| Logo | `site.logo` + `src/components/Header.tsx` (marked `LOGO PLACEHOLDER`) + `src/app/icon.svg` |
| Live domain | `site.url` |
| Photos | Every `<Photo label="…">` without `src` renders a dashed **PHOTO SLOT · MO'S REAL JOB** frame that names the shot needed, its orientation and its minimum size. Put Mo's real job photos in `/public/images` and pass `src`. Work strip items: `recentWork` in `src/app/page.tsx` |
| Home hero image | `site.heroImage`. The current file (`public/images/hero-sample-house.jpg`, 1024×688) is **AI-generated, not Mo's work**, and is captioned "Sample image, not a Wright's Painting job". Replace it with a real exterior photo (at least 1600px wide) and set `generated: false`. |
| Mo's bio | `src/app/about/page.tsx` |
| Process lists (interior prep checklist, exterior wash/scrape/caulk/prime, rental services) | Marked "To confirm with Mo" on the page |

Once everything is confirmed, set `markPlaceholders: false`.

There are deliberately **no prices, reviews, ratings, years in business or other claims**. Add them only after Mo confirms them.

## Turning off the Rentals page

Set `features.rentals: false` in `src/config/site.ts`. The page returns 404 and drops out of the nav, footer, sitemap and the form's job-type options.

## Analytics and consent

Set `NEXT_PUBLIC_GA_ID` (GA4, `G-XXXXXXX`) to turn analytics on. With it empty there is no analytics and no banner.

- **Nothing loads before consent.** No Google script, no request and no cookie until the visitor clicks Accept. The choice is kept in `localStorage` (`src/lib/consent.ts`).
- Accept and Decline carry equal weight. The banner isn't a modal. On phones it sits above the Call / Quote bar and hides while the quote form is on screen or being filled in, so it never blocks the form.
- "Privacy choices" in the footer re-opens it. Switching from Accept to Decline deletes the GA cookies and reloads the page without analytics.

## Quote form delivery

The form posts to `/api/quote`, which forwards each request as JSON to `QUOTE_WEBHOOK_URL` (Zapier, Make, Formspree, an email relay, etc.). See `.env.example`.

- In development, without the variable, requests are logged to the console.
- In production, without the variable, the API **refuses** the request (503), and the form tells the visitor to call Mo. Leads are never silently dropped.

A hidden honeypot field filters basic spam bots.
