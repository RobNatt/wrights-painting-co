import type { Metadata } from "next";
import { BeforeAfter, PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import { QuoteSection } from "@/components/QuoteSection";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/config/site";

// Target keyword: "exterior house painting Wilmington NC"
export const metadata: Metadata = {
  title: "Exterior House Painting Wilmington NC",
  description: `Exterior house painting in Wilmington, NC: siding, trim, doors and decks, washed, scraped, caulked and primed for sun, humidity and salt air. Free quotes from ${site.owner}.`,
  alternates: { canonical: "/exterior-painting" },
};

const surfaces = [
  { name: "Siding", text: "Full repaints, or just the sides that take the most sun and weather." },
  { name: "Trim", text: "Fascia, soffits, corner boards and window trim: the parts that show wear first." },
  { name: "Doors", text: "Front, side and garage doors. A freshly painted front door changes how a house looks from the street." },
  { name: "Decks", text: "Deck boards, steps and railings cleaned and refinished." },
];

// PLACEHOLDER process: confirm with Mo before launch.
const prep = [
  { step: "Wash", text: "Siding and trim washed to take off salt, dirt, pollen and mildew. Paint won’t hold to any of them." },
  { step: "Scrape", text: "Loose and peeling paint scraped off, rough edges sanded so the new coat lies flat." },
  { step: "Caulk", text: "Gaps around windows, doors and trim sealed so rain and damp air stay out of the wood." },
  { step: "Prime", text: "Bare wood and repairs primed so the finish coat sticks and wears evenly." },
];

export default function ExteriorPage() {
  return (
    <>
      <PageHero
        eyebrow="Exterior painting"
        title="Exterior house painting in Wilmington, NC"
        photoLabel="Finished exterior: full front of house with shutters and trim"
      >
        <p>
          Sun, humidity and salt air wear paint out faster here than inland. Mo paints siding, trim, doors and decks, and
          spends the time on prep that makes an exterior paint job last.
        </p>
      </PageHero>

      {/* Surfaces */}
      <section aria-labelledby="surfaces-title" className="border-t border-border">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What Mo paints outside" title="Siding, trim, doors and decks" id="surfaces-title" />
          </div>
          <dl className="lg:col-span-7 lg:col-start-6">
            {surfaces.map((s, i) => (
              <div key={s.name} className={`grid gap-1 py-6 sm:grid-cols-[8rem_1fr] sm:gap-6 ${i ? "border-t border-border" : ""}`}>
                <dt className="font-serif text-2xl font-semibold">{s.name}</dt>
                <dd className="text-charcoal sm:pt-1">{s.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What we do before we paint: a process rail, in order */}
      <section id="prep" aria-labelledby="prep-title" className="bg-shutter text-white">
        <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-24">
          <SectionHeader tone="dark" eyebrow="In this order, every time" title="What we do before we paint" id="prep-title">
            <p>Skip any of these and the new paint fails early, especially this close to the water.</p>
          </SectionHeader>
          <div className="mt-12">
            <Ph block note="prep steps match how Mo works">
              <ol className="grid gap-10 md:grid-cols-4 md:gap-6">
                {prep.map((p, i) => (
                  <li key={p.step} className="relative border-t-2 border-white/30 pt-5">
                    <span aria-hidden="true" className="absolute -top-[7px] left-0 h-3 w-3 rounded-full bg-sand" />
                    <p className="font-sans text-sm font-semibold tracking-[0.08em] text-shutter-tint">
                      <span className="sr-only">Step </span>
                      {String(i + 1).padStart(2, "0")}
                    </p>
                    <h3 className="mt-1 text-[1.75rem] font-bold leading-tight">{p.step}</h3>
                    <p className="mt-2 text-white/85">{p.text}</p>
                  </li>
                ))}
              </ol>
            </Ph>
          </div>
        </div>
      </section>

      <section aria-labelledby="ba-title" className="mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Recent exterior job" title="Before and after" id="ba-title" />
          </div>
          <div className="lg:col-span-8">
            <BeforeAfter subject="house exterior" />
          </div>
        </div>
      </section>

      <QuoteSection lead="Is the paint outside starting to go?" defaultJobType="exterior" />
    </>
  );
}
