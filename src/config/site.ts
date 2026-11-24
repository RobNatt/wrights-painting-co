/**
 * Business details for Wright's Painting Co.
 *
 * Anything with `confirmed: false` is a PLACEHOLDER. It is shown on the page
 * with a dashed marker (while `markPlaceholders` is true) and is left OUT of
 * the LocalBusiness schema, so unconfirmed details never reach search engines.
 * When Mo confirms a value, replace it and set `confirmed: true`.
 */

export type Confirmable<T> = { value: T; confirmed: boolean };

export const site = {
  name: "Wright's Painting Co.",
  owner: "Mo Wright",

  /** PLACEHOLDER: replace with the live domain before launch. */
  url: "https://www.example.com",

  /** Feature switches. Set rentals to false if Mo doesn't do rental work:
   *  the page 404s, and the nav link, sitemap entry and form option disappear. */
  features: {
    rentals: true,
  },

  /** Show dashed outlines around unconfirmed details. Turn off for launch
   *  only once every `confirmed` below is true. */
  markPlaceholders: true,

  phone: {
    // 555-01xx numbers are reserved for fiction, so this can never ring a real person.
    value: { display: "(910) 555-0142", tel: "+19105550142" },
    confirmed: false,
  } as Confirmable<{ display: string; tel: string }>,

  /** Mo can receive texts on this number? Confirm before promoting "text". */
  acceptsTexts: { value: true, confirmed: false } as Confirmable<boolean>,

  hours: {
    value: "Mon–Fri 7am–5pm, Sat by appointment",
    confirmed: false,
  } as Confirmable<string>,

  /** Short phrase used in the Home subhead. */
  serviceAreaSummary: {
    value: "Wilmington, Leland, Wrightsville Beach and the rest of New Hanover County",
    confirmed: false,
  } as Confirmable<string>,

  /** Towns listed on Home and in the schema's areaServed. */
  towns: {
    value: [
      "Wilmington",
      "Wrightsville Beach",
      "Carolina Beach",
      "Kure Beach",
      "Leland",
      "Ogden",
      "Porters Neck",
      "Castle Hayne",
      "Hampstead",
      "Monkey Junction",
    ],
    confirmed: false,
  } as Confirmable<string[]>,

  insurance: {
    value: "Insurance details to come: carrier, coverage type and amount",
    confirmed: false,
  } as Confirmable<string>,

  /** Home hero image. The current one is AI-generated (not Mo's work), so it
   *  carries a "Sample image" caption. Swap in a real job photo and set
   *  generated: false. */
  heroImage: {
    src: "/images/hero-sample-house.jpg",
    alt: "Two-story house with off-white siding, blue-green shutters and a front porch in late-afternoon light",
    generated: true,
  },

  /** Set to the logo path in /public once supplied, e.g. "/logo.svg". */
  logo: { value: null as string | null, confirmed: false },
} as const;

export type NavItem = { href: string; label: string };

export function navItems(): NavItem[] {
  const items: NavItem[] = [
    { href: "/interior-painting", label: "Interior" },
    { href: "/exterior-painting", label: "Exterior" },
  ];
  if (site.features.rentals) items.push({ href: "/rentals", label: "Rentals" });
  items.push({ href: "/about", label: "About Mo" });
  return items;
}

export const jobTypes = [
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "both", label: "Both" },
  { value: "rental", label: "Rental property" },
  { value: "other", label: "Other" },
] as const;

export type JobType = (typeof jobTypes)[number]["value"];

export function availableJobTypes() {
  return jobTypes.filter((j) => site.features.rentals || j.value !== "rental");
}

export const bestTimes = [
  "Morning",
  "Midday",
  "Afternoon",
  "Evening",
  "Any time",
] as const;
