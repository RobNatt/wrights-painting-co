import type { Metadata } from "next";
import Link from "next/link";
import { ArrowIcon, PhoneIcon } from "@/components/icons";
import { telHref } from "@/components/PhoneLink";
import { Photo, Ph } from "@/components/Placeholder";
import { QuoteForm } from "@/components/QuoteForm";
import { SectionHeader } from "@/components/SectionHeader";
import { StickyQuotePanel } from "@/components/StickyQuotePanel";
import { WorkStrip, type WorkItem } from "@/components/WorkStrip";
import { site } from "@/config/site";

// Target keyword: "painter Wilmington NC"
export const metadata: Metadata = {
  title: { absolute: `Painter Wilmington NC | Interior & Exterior House Painting | ${site.name}` },
  description: `Looking for a painter in Wilmington, NC? ${site.owner} paints house interiors and exteriors, with prep built for sun, humidity and salt air. Call or get a free quote.`,
  alternates: { canonical: "/" },
};

// PLACEHOLDER jobs: swap for Mo's real photos and neighborhoods.
const recentWork: WorkItem[] = [
  { job: "Exterior repaint", place: "Neighborhood to confirm" },
  { job: "Living room walls and trim", place: "Neighborhood to confirm" },
  { job: "Front door and shutters", place: "Neighborhood to confirm" },
  { job: "Deck refinish", place: "Neighborhood to confirm" },
  { job: "Ceilings and stairwell", place: "Neighborhood to confirm" },
  { job: "Siding and trim", place: "Neighborhood to confirm" },
];

const coastal = [
  {
    term: "Sun",
    text: "Strong summer sun fades color and breaks paint down over time, fastest on south- and west-facing walls. That chalky film that rubs off on your hand is paint wearing out.",
  },
  {
    term: "Humidity",
    text: "Damp air feeds mildew and soaks into bare wood. Paint laid over damp or dirty wood is the paint that blisters and peels a season or two later.",
  },
  {
    term: "Salt air",
    text: "Closer to the water, a thin layer of salt settles on siding and trim. New paint doesn’t grip well to it, so it has to be washed off before anything else happens.",
  },
];

const steps = [
  {
    title: "Call or text Mo",
    text: "Tell him what you want painted, or fill in the quote form and he’ll call you at the time that suits you.",
  },
  {
    title: "Get a free quote",
    text: "Mo looks at the job, talks through colors and prep, and gives you a price. No cost, no obligation.",
  },
  {
    title: "The job, done clean",
    text: "Mo preps, paints and cleans up after himself, so the house is ready to live in when he leaves.",
  },
];

export default function Home() {
  return (
    <div className="mx-auto max-w-[1200px] px-5 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8">
      {/* ---------- Hero (left 8 columns) ---------- */}
      <section aria-labelledby="hero-title" className="pt-8 pb-8 lg:col-span-8 lg:pt-14 lg:pb-10">
        <p className="text-eyebrow">House painter · Wilmington, NC</p>
        <h1 id="hero-title" className="text-display mt-3 max-w-[18ch]">
          Wilmington painting, done right for coastal weather.
        </h1>
        <p className="mt-5 max-w-[38rem] text-lg text-slate">
          Interior and exterior house painting for homes in{" "}
          <Ph confirmed={site.serviceAreaSummary.confirmed}>{site.serviceAreaSummary.value}</Ph>.
        </p>

        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#quote" className="btn btn-primary">
            Get a free quote
          </a>
          <a href={telHref} className="btn btn-secondary">
            <PhoneIcon className="h-5 w-5" />
            Call <span className="tabular-nums">{site.phone.value.display}</span>
          </a>
        </div>

      </section>

      {/* ---------- Quote panel: inline on mobile, sticky right column on desktop ---------- */}
      <aside
        id="quote"
        aria-label="Get a free quote"
        className="pb-8 lg:col-span-4 lg:col-start-9 lg:row-span-4 lg:row-start-1 lg:pt-14 lg:pb-24"
      >
        <StickyQuotePanel>
          <QuoteForm />
        </StickyQuotePanel>
      </aside>

      {/* ---------- Hero image: under the headline on desktop, after the form on phones ---------- */}
      <figure className="lg:col-span-8">
        <Photo
          label="Exterior job: whole house, front, late-afternoon light"
          src={site.heroImage.src}
          alt={site.heroImage.alt}
          ratio="3 / 2"
          priority
          sizes="(min-width: 1200px) 760px, (min-width: 1024px) 64vw, 100vw"
        />
        {site.heroImage.generated ? (
          <figcaption className="mt-2 text-xs text-slate">
            Sample image, not a Wright’s Painting job.{" "}
            {site.markPlaceholders ? <span className="text-brick">Replace with a photo of Mo’s work.</span> : null}
          </figcaption>
        ) : null}
      </figure>

      {/* ---------- The Mo line + facts ---------- */}
      <div className="pt-8 pb-4 lg:col-span-8 lg:pt-10">
        {/* The Mo line, set against his photo */}
        <figure className="grid grid-cols-[5rem_1fr] items-center gap-4 border-y border-border py-5 sm:grid-cols-[6rem_1fr] sm:gap-6">
          <Photo label="Mo Wright, head and shoulders" ratio="1 / 1" sizes="96px" small />
          <blockquote className="font-serif text-xl font-semibold leading-snug sm:text-2xl">
            You deal with Mo. He answers, he quotes, he paints.
          </blockquote>
        </figure>

        <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem]">
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brick" aria-hidden="true" />
            <dt className="sr-only">Business</dt>
            <dd>Owner-operated by {site.owner}</dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brick" aria-hidden="true" />
            <dt className="sr-only">Insurance</dt>
            <dd>
              <Ph confirmed={site.insurance.confirmed}>Insurance details</Ph>
            </dd>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-brick" aria-hidden="true" />
            <dt className="sr-only">Hours</dt>
            <dd>
              <Ph confirmed={site.hours.confirmed}>{site.hours.value}</Ph>
            </dd>
          </div>
        </dl>
      </div>

      {/* ---------- Everything else (left 8 columns) ---------- */}
      <div className="lg:col-span-8">
        {/* Interior + exterior: two uneven rows, not equal cards */}
        <section aria-labelledby="services-title" className="border-t border-border py-16 lg:mt-6 lg:py-20">
          <SectionHeader eyebrow="What Mo paints" title="Inside and out" id="services-title" />

          <div className="mt-10 grid gap-6 sm:grid-cols-[1.35fr_1fr] sm:items-end">
            <Photo label="Exterior job: whole house, front, daylight" ratio="4 / 3" sizes="(min-width: 1024px) 440px, 60vw" />
            <div className="sm:pb-2">
              <h3 className="text-[1.375rem] font-semibold leading-tight">Exterior painting</h3>
              <p className="mt-2 text-slate">Siding, trim, doors and decks, with the washing, scraping, caulking and priming that coastal weather calls for.</p>
              <Link href="/exterior-painting" className="link mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold">
                Exterior house painting <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="mt-12 grid gap-6 border-t border-border pt-12 sm:grid-cols-[1fr_1.1fr] sm:items-start">
            <div className="sm:order-1 sm:pt-6">
              <h3 className="text-[1.375rem] font-semibold leading-tight">Interior painting</h3>
              <p className="mt-2 text-slate">Walls, ceilings and trim, with furniture and floors covered and the room put back when Mo’s done.</p>
              <Link href="/interior-painting" className="link mt-1 inline-flex min-h-11 items-center gap-1.5 font-semibold">
                Interior painting <ArrowIcon className="h-4 w-4" />
              </Link>
            </div>
            <Photo label="Interior job: finished room, walls and trim" ratio="5 / 4" sizes="(min-width: 1024px) 380px, 60vw" className="sm:order-2" />
          </div>
        </section>

        {/* Why coastal homes need it: a spec-sheet list, no icons */}
        <section aria-labelledby="coastal-title" className="border-t border-border py-16 lg:py-20">
          <SectionHeader eyebrow="Why coastal homes need it" title="Sun, humidity and salt air are hard on paint" id="coastal-title">
            <p>Houses here take more weather than most. The paint job has to be planned around it.</p>
          </SectionHeader>
          <dl className="mt-10 border-t-2 border-charcoal">
            {coastal.map((c) => (
              <div key={c.term} className="grid gap-1 border-b border-border py-5 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <dt className="font-serif text-xl font-semibold">{c.term}</dt>
                <dd className="text-charcoal">{c.text}</dd>
              </div>
            ))}
          </dl>
          <p className="mt-6 max-w-[40rem]">
            That’s why the prep is most of the job: washing, scraping, caulking and priming before any color goes on.{" "}
            <Link href="/exterior-painting#prep" className="link font-semibold">
              What Mo does before he paints
            </Link>
          </p>
        </section>

        {/* Recent work strip */}
        <section aria-labelledby="work-title" className="border-t border-border py-16 lg:py-20">
          <SectionHeader eyebrow="Recent work" title="Jobs around Wilmington" id="work-title" />
          <div className="mt-8">
            <WorkStrip items={recentWork} labelledBy="work-title" />
          </div>
        </section>

        {/* Towns served */}
        <section aria-labelledby="towns-title" className="border-t border-border py-16 lg:py-20">
          <SectionHeader eyebrow="Where Mo works" title="Towns served" id="towns-title" />
          <div className="mt-8">
            <Ph confirmed={site.towns.confirmed} block note="final list of towns">
              <ul className="columns-2 gap-6 sm:columns-3">
                {site.towns.value.map((t) => (
                  <li key={t} className="break-inside-avoid border-b border-border py-2.5 font-medium">
                    {t}
                  </li>
                ))}
              </ul>
            </Ph>
          </div>
          <p className="mt-6 text-slate">
            Not on the list?{" "}
            <a href={telHref} className="link font-semibold">
              Call and ask
            </a>
            .
          </p>
        </section>

        {/* How it works: a numbered rail, not cards */}
        <section aria-labelledby="how-title" className="border-t border-border py-16 lg:py-20">
          <SectionHeader eyebrow="How it works" title="Three steps, one person" id="how-title" />
          <ol className="relative mt-10 space-y-10 before:absolute before:top-3 before:bottom-3 before:left-[1.4rem] before:w-px before:bg-border">
            {steps.map((s, i) => (
              <li key={s.title} className="relative grid grid-cols-[2.8rem_1fr] gap-5">
                <span
                  aria-hidden="true"
                  className="relative grid h-11 w-11 place-items-center rounded-full border-2 border-shutter bg-sand font-serif text-xl font-bold text-shutter"
                >
                  {i + 1}
                </span>
                <div className="pt-1.5">
                  <h3 className="text-[1.375rem] font-semibold leading-tight">
                    <span className="sr-only">Step {i + 1}: </span>
                    {s.title}
                  </h3>
                  <p className="mt-2 max-w-[36rem] text-slate">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
          <div className="mt-10 flex flex-wrap gap-3 pl-[4.05rem]">
            <a href="#quote" className="btn btn-primary">
              Get a free quote
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
