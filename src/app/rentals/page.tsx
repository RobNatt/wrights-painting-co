import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import { QuoteSection } from "@/components/QuoteSection";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/config/site";

/**
 * Rentals page. Turn it off with site.features.rentals = false in
 * src/config/site.ts: this route then 404s, and the nav link, sitemap entry
 * and "Rental property" form option all disappear.
 */

export const metadata: Metadata = site.features.rentals
  ? {
      title: "Rental Property Painting Wilmington NC",
      description: `Painting for rental properties in Wilmington, NC: turnovers between tenants, touch-ups and full repaints. One contact, ${site.owner}. Get a free quote.`,
      alternates: { canonical: "/rentals" },
    }
  : { robots: { index: false } };

const work = [
  { name: "Turnovers", text: "Walls, trim and doors repainted between tenants so the unit is ready to show." },
  { name: "Touch-ups", text: "Scuffs, patches and repaired spots blended in, without repainting the whole room." },
  { name: "Full repaints", text: "Interior or exterior, when a property needs more than a refresh." },
  { name: "Color records", text: "A note of the colors and finishes used, so the next touch-up matches." },
];

export default function RentalsPage() {
  if (!site.features.rentals) notFound();

  return (
    <>
      <PageHero eyebrow="Rental properties" title="Painting for rental properties in Wilmington" photoLabel="Rental unit, freshly painted, empty and ready to show" photoRatio="4 / 3">
        <p>
          For landlords and property managers who need units painted between tenants without chasing a crew. One number,
          one person: Mo quotes it and paints it.
        </p>
      </PageHero>

      <section aria-labelledby="rental-work-title" className="border-t border-border">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Rental work" title="What Mo can take on" id="rental-work-title" />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <Ph block note="Mo does rental work, and each item below">
              <dl>
                {work.map((w, i) => (
                  <div key={w.name} className={`grid gap-1 py-5 sm:grid-cols-[9rem_1fr] sm:gap-6 ${i ? "border-t border-border" : ""}`}>
                    <dt className="font-serif text-xl font-semibold">{w.name}</dt>
                    <dd className="sm:pt-0.5">{w.text}</dd>
                  </div>
                ))}
              </dl>
            </Ph>
          </div>
        </div>
      </section>

      <QuoteSection lead="Have a unit coming up?" defaultJobType="rental" />
    </>
  );
}
