# Wright's Painting Co. — Design System

Owner-operated house painting in Wilmington, North Carolina. Run by Mo Wright.

**The site has one job: get more calls and quote requests.** Every rule below supports that. When a design choice is in doubt, pick the one that makes the phone number or the quote form easier to reach.

---

## 1. Principles

1. **Phone and quote form are always one tap or one glance away.** No page state, scroll position or screen size hides both.
2. **Direct before decorative.** Say what Mo does, where, and how to reach him in the first screen. No slogans that need decoding.
3. **Trust comes from specifics, not adjectives.** Real job photos, real street names, Mo's name and face, license and insurance stated plainly. "Quality" and "professional" are never the proof on their own.
4. **Coastal Carolina from named references, not props.** The look comes from things you can point to in Wilmington (section 2), not from beach icons.
5. **Quiet motion.** Movement helps people find the phone and the form. It never decorates.

---

## 2. Visual references

These are the sources for color, texture and tone. Describe new work in terms of them, not adjectives like "breezy" or "coastal".

| Reference | What we take from it |
|---|---|
| **Painted shutters on the houses along Orange, Dock and Nun Streets in the downtown historic district** | The main accent: a deep, slightly green blue-black that historic shutters and front doors wear. Used on buttons, links and the header. |
| **The brick of the Cotton Exchange and the older storefronts on Front Street** | The rare second accent: a weathered brick red. Used for small markers only, never large areas. |
| **Lime-washed and painted trim on those same houses, faded by sun off the Cape Fear River** | The base: warm sand and off-white backgrounds, never stark white. |
| **The color chip wall at a neighborhood paint counter** | The layout idea for color and work samples: neat rows of rectangular tiles, labels beneath, plenty of gaps. It is what the recent-work strip and service cards are modelled on. |
| **Hand-painted shop lettering on the downtown storefronts** | Headings: sturdy, upright serif, set large and plainly. No script. |

**Banned:** anchors, seashells, starfish, waves, lighthouses, sailboats, palm trees, rope borders, distressed wood textures, script or handwritten fonts, teal-and-coral pairings, paint-splash or brush-stroke graphics, stock photos of smiling painters.

---

## 3. Color

### Tokens

| Token | Hex | Role |
|---|---|---|
| `--color-sand` | `#F5EFE3` | Page background |
| `--color-paper` | `#FBF8F2` | Cards, form panel, raised surfaces |
| `--color-sand-deep` | `#EAE0CC` | Alternating section bands, footer |
| `--color-charcoal` | `#2A2A28` | Body text, headings |
| `--color-slate` | `#5A564F` | Secondary text, captions, helper text |
| `--color-shutter` | `#1D4A4C` | Primary accent: buttons, links, header bar, focus ring |
| `--color-shutter-dark` | `#14373A` | Button hover/pressed |
| `--color-shutter-tint` | `#DCE7E4` | Selected states, info notes, light highlight band |
| `--color-brick` | `#9E3B2A` | Rare accent (see rules below) |
| `--color-border` | `#D6CBB6` | Decorative dividers and card outlines only |
| `--color-input-border` | `#857B6D` | Form field borders (meets 3:1 for UI controls) |
| `--color-white` | `#FFFFFF` | Text on shutter or brick fills only |

```css
:root {
  --color-sand: #F5EFE3;
  --color-paper: #FBF8F2;
  --color-sand-deep: #EAE0CC;
  --color-charcoal: #2A2A28;
  --color-slate: #5A564F;
  --color-shutter: #1D4A4C;
  --color-shutter-dark: #14373A;
  --color-shutter-tint: #DCE7E4;
  --color-brick: #9E3B2A;
  --color-border: #D6CBB6;
  --color-input-border: #857B6D;
  --color-white: #FFFFFF;
}
```

### Proportions

Roughly **80% sand/paper, 12% charcoal text, 7% shutter, under 1% brick.** If a screen shows more brick than a few small marks, remove some.

### Brick-red rules

Brick is for marking, not for filling. Allowed:

- The short rule (3–4 px tall, 40 px wide) above section eyebrows
- The "Licensed & insured" or "Owner on every job" badge dot
- Required-field asterisks and form error text
- A single highlighted word in a pull quote, at most once per page

Not allowed: buttons, backgrounds, large headings, icons in bulk, the phone number.

### Contrast check (WCAG 2.2)

Computed for every pairing the system uses. AA needs 4.5:1 for body text and 3:1 for large text and UI controls.

| Foreground | Background | Ratio | Result |
|---|---|---|---|
| charcoal | sand | 12.56 | AAA |
| charcoal | paper | 13.57 | AAA |
| charcoal | sand-deep | 10.98 | AAA |
| charcoal | shutter-tint | 11.36 | AAA |
| slate | sand | 6.37 | AA (AAA large) |
| slate | paper | 6.88 | AA (AAA large) |
| slate | sand-deep | 5.57 | AA |
| shutter (links) | sand | 8.58 | AAA |
| shutter (links) | paper | 9.27 | AAA |
| shutter | sand-deep | 7.51 | AAA |
| shutter | shutter-tint | 7.77 | AAA |
| white | shutter (buttons, header) | 9.83 | AAA |
| white | shutter-dark (hover) | 12.83 | AAA |
| sand | shutter | 8.58 | AAA |
| brick | sand | 5.89 | AA |
| brick | paper | 6.36 | AA |
| white | brick | 6.75 | AA |
| input-border | paper | 3.92 | Passes 3:1 for controls |
| input-border | sand | 3.63 | Passes 3:1 for controls |
| border | sand | 1.40 | Decorative only; never the only edge of a control |

Every text pairing passes AA; most pass AAA. Do not put slate text on shutter-tint or brick text on sand-deep without re-checking.

---

## 4. Typography

### Families

| Role | Family | Why |
|---|---|---|
| Headings | **Source Serif 4** (600, 700) | Sturdy, upright, high x-height; reads like painted storefront lettering without being a costume. Optical sizing keeps large headings crisp. |
| Body and UI | **Public Sans** (400, 500, 600) | Plain, neutral sans built for public-service sites. Clear at small sizes on phones, with no personality fighting the serif. |
| Fallbacks | `Georgia, "Times New Roman", serif` / `system-ui, -apple-system, "Segoe UI", Roboto, sans-serif` | |

**Why the pairing works:** a serif with strong, slightly bracketed strokes next to a sans with no quirks. The contrast in structure keeps hierarchy clear, and their x-heights are close, so mixed lines (a serif heading over a sans phone link) sit evenly. Both are free on Google Fonts and support variable weights, so it costs two font files.

Load only the weights listed. Use `font-display: swap` and preload the heading 700 and body 400 files.

### Scale (mobile → desktop, fluid with `clamp`)

| Token | Size | Line height | Family / weight | Use |
|---|---|---|---|---|
| `--text-display` | `clamp(2.25rem, 1.6rem + 3vw, 3.5rem)` | 1.1 | Serif 700 | Home hero headline only |
| `--text-h1` | `clamp(2rem, 1.5rem + 2vw, 2.75rem)` | 1.15 | Serif 700 | Page titles |
| `--text-h2` | `clamp(1.5rem, 1.2rem + 1.2vw, 2rem)` | 1.2 | Serif 600 | Section headings |
| `--text-h3` | `1.25rem` | 1.3 | Serif 600 | Card titles |
| `--text-eyebrow` | `0.8125rem`, `letter-spacing: 0.08em`, uppercase | 1.4 | Sans 600 | Label above section headings |
| `--text-body` | `1.0625rem` (17 px) | 1.6 | Sans 400 | Paragraphs |
| `--text-small` | `0.9375rem` | 1.5 | Sans 400 | Captions, helper text |
| `--text-button` | `1rem` | 1 | Sans 600 | Buttons |
| `--text-phone` | `1.125rem` | 1 | Sans 600, `font-variant-numeric: tabular-nums` | Phone number wherever it appears |

Rules:

- Body text never below 16 px. Measure 60–72 characters.
- Headings in sentence case. No all-caps headings (eyebrows only).
- The phone number is always written in full, `(910) 555-0123` format, and always a `tel:` link.

---

## 5. Spacing, layout, shape

- **Spacing scale (4 px base):** 4, 8, 12, 16, 24, 32, 48, 64, 96, 128.
- **Section padding:** 64 px top/bottom on mobile, 96 px on desktop.
- **Container:** max 1200 px, 20 px side gutters on mobile, 32 px on desktop.
- **Home page desktop grid:** 12 columns. Content spans 7–8, the sticky quote panel spans 4 (see 7.2).
- **Radius:** 4 px on buttons, inputs and cards. Tiles in the work strip are square-cornered, like paint chips. No pill buttons, no large rounded cards.
- **Shadows:** one only, for the sticky header once scrolled and the sticky form panel: `0 2px 8px rgb(42 42 40 / 0.08)`. Everything else is flat with a 1 px `--color-border` outline.
- **Touch targets:** at least 44 × 44 px, 48 px for the call and quote buttons.

---

## 6. Components

### Buttons

| Variant | Style | Use |
|---|---|---|
| Primary | Shutter fill, white text, 4 px radius, 48 px tall | "Get a free quote", form submit. One per view. |
| Call | Shutter fill, white text, phone icon left, full number visible | Tap-to-call. On mobile, the header call button. |
| Secondary | Transparent, 2 px shutter border, shutter text | "See more work", secondary actions |
| Text link | Shutter text, underline offset 3 px, thicker underline on hover | Inline links |

Hover: shutter → shutter-dark, 150 ms. Focus: 3 px shutter outline with 2 px sand offset, on every interactive element. Never remove focus styles.

### Quote form

- Fields, in this order: **Name, Phone, Address or neighborhood, Interior / Exterior / Both, Short description (optional), Photo upload (optional)**. Email is optional; phone is required, because Mo calls back.
- Visible labels above fields, never placeholder-only. Placeholders show examples ("e.g. Forest Hills, Ogden, Carolina Beach").
- Input: paper background, 1 px `--color-input-border`, 4 px radius, 48 px tall. Focus: shutter 2 px border plus focus ring.
- Errors: brick text with an icon, below the field, written plainly ("Add a phone number so Mo can call you back").
- Under the submit button, in slate small text: "Mo usually calls back the same day. Prefer to talk now? Call (910) 555-0123."
- Success state replaces the form in place: "Thanks, [name]. Mo will call you at [number]."

### Trust row

Directly under the hero: license number, "Fully insured", years in business, Google rating with count, "Owner on every job". Charcoal text, a small brick dot before each item. No logos unless they are real certifications.

### Work tile (paint-chip card)

Square-cornered photo on top, a sand-deep label bar beneath (like the name strip on a paint chip) with the job type and neighborhood: "Exterior repaint, Carolina Place". Optionally a small swatch of the main color used with its name.

### Section header

Brick rule (40 × 3 px) → eyebrow (sans, uppercase, slate) → H2 (serif). Left-aligned. This is the only element that gets a scroll reveal (7.4).

---

## 7. Motion spec

Global rules:

- **Easing:** `cubic-bezier(0.2, 0, 0, 1)` for everything.
- **Durations:** 150 ms for hovers and state changes, 200 ms for the header, 400 ms for section header reveals.
- **Animate only `transform` and `opacity`** (plus `height`/`padding` on the header, see below).
- **`prefers-reduced-motion: reduce`:** turn off all reveals and smooth scrolling, set the header to its compact size with no transition, and let the work strip scroll without snap animation. Sticky positioning stays, because it is layout rather than motion.

### 7.1 Sticky header that shrinks

| State | Trigger | Height (mobile / desktop) | Contents |
|---|---|---|---|
| Full | Top of page | 72 / 96 px | Logo wordmark, nav (desktop), phone number with icon, "Get a quote" button |
| Compact | Scrolled past 80 px | 56 / 64 px | Smaller wordmark, nav, phone, "Get a quote". Adds the single shadow. |

- Use `position: sticky; top: 0`. Detect the threshold with an IntersectionObserver on a sentinel element at 80 px, not a scroll listener.
- Transition: 200 ms on height, padding and logo `transform: scale(0.85)`.
- **Tap-to-call is visible in both states on every screen size.** On mobile the header shows the wordmark and a shutter "Call" button with the phone icon and number; if space runs out below 360 px wide, show the icon plus "Call" but never hide the button.
- Mobile navigation goes behind a menu button; the call button never does.
- Header background: sand at full size, paper with shadow when compact. No transparency or blur over the hero.

### 7.2 Quote form that stays in view (home page, desktop)

- **Breakpoint:** 1024 px and up.
- The quote form sits in the right 4 columns as a paper panel with the single shadow, `position: sticky; top: calc(var(--header-compact) + 24px)`.
- It stays in view while the left column scrolls through services, the work strip, reviews and the service area. It releases at the footer (end of its grid container), so it never covers the footer.
- If the panel is taller than the viewport, it becomes `position: static` (check with a resize observer). Never let the submit button sit off-screen inside a sticky panel.
- **Below 1024 px:** the form is placed inline after the hero and again before the footer. A sticky bottom bar on mobile carries two equal buttons, **Call** and **Get a quote** (the second scrolls to the nearest form). The bar hides while a form field has focus, so it never covers the keyboard.
- Other pages: no sticky form. They end with a full-width quote section, and the header buttons cover the rest.

### 7.3 Recent-work strip that scrolls sideways

- A horizontal row of work tiles (section 6), like a run of chips on the paint-store wall.
- Native horizontal scroll: `overflow-x: auto; scroll-snap-type: x mandatory`, tiles `scroll-snap-align: start`. No carousel library, no autoplay, no infinite loop.
- Tile width: 80% of the viewport on mobile (so the next tile peeks in), 320 px on desktop. 16 px gaps.
- Desktop: previous/next buttons (secondary style, 44 px, with accessible labels) scroll by one tile width with `behavior: smooth`, disabled at the ends. Shift+wheel and trackpad swipes work natively.
- Keyboard: the strip is a focusable region with `aria-label="Recent work"`; each tile is a link to the project or gallery.
- Hide the scrollbar only if the arrow buttons are present; on touch, a thin scrollbar is fine.
- The last item is a "See all work" tile in shutter-tint that links to the gallery.

### 7.4 Reveals on section headers only

- Applies to the section header group (brick rule, eyebrow, H2) and nothing else. Body text, images, cards, forms and buttons appear immediately.
- Effect: opacity 0 → 1 and `translateY(12px)` → 0 over 400 ms. The brick rule grows from 0 to 40 px wide at the same time.
- Triggered once, by IntersectionObserver at 15% visibility. Never replays on scroll up.
- Content is visible by default; the hidden starting state is only added once JavaScript has loaded, so nothing stays hidden if scripts fail.
- No stagger, no parallax, no scroll-linked animation anywhere else.

---

## 8. Imagery and voice

**Photos:** Mo's real jobs only. Before/after pairs from the same angle. Houses shown whole, in daylight, with the street visible where the owner agrees. One clear photo of Mo on the home page and About page. No stock photos of people.

**Voice:** first person from Mo or plain third person, short sentences, local specifics.

- Yes: "I'm Mo Wright. I quote every job myself and I'm on site every day until it's done."
- Yes: "Exterior repaints from Wrightsville Beach to Leland."
- No: "Elevating your home's coastal charm with premium painting solutions."

Calls to action say what happens next: "Get a free quote", "Call Mo", not "Learn more" or "Submit".

---

## 9. Checklist before shipping a page

- [ ] Phone number visible and tappable at every scroll position, on mobile and desktop
- [ ] Quote form or a button to it within one screen, everywhere
- [ ] Brick appears only in the allowed places, and rarely
- [ ] All text pairings are from the contrast table
- [ ] Only section headers animate; reduced-motion turns them off
- [ ] Sticky form panel never hides its submit button or overlaps the footer
- [ ] No banned motifs from section 2
- [ ] Every photo is Mo's own work
