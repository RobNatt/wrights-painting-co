import type { Metadata } from "next";
import { CheckIcon } from "@/components/icons";
import { BeforeAfter, PageHero } from "@/components/PageHero";
import { Ph } from "@/components/Placeholder";
import { QuoteSection } from "@/components/QuoteSection";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/config/site";

// Target keyword: "interior painting Wilmington NC"
export const metadata: Metadata = {
  title: "Interior Painting Wilmington NC",
  description: `Interior painting in Wilmington, NC: walls, ceilings and trim, with careful prep and a clean finish. ${site.owner} quotes and paints every job. Get a free quote.`,
  alternates: { canonical: "/interior-painting" },
};

const surfaces = [
  {
    name: "Walls",
    text: "Single rooms or the whole house. Patched, sanded and painted so the finish reads even in daylight and lamplight.",
  },
  {
    name: "Ceilings",
    text: "Flat ceilings, stairwells and high spots. Water stains sealed first so they don’t bleed back through.",
  },
  {
    name: "Trim",
    text: "Baseboards, door and window casings, crown molding and doors. Gaps caulked and edges cut in clean.",
  },
];

// PLACEHOLDER process: confirm each line with Mo before launch.
const prep = [
  "Furniture moved to the middle of the room and covered",
  "Floors covered with drop cloths",
  "Switch plates and outlet covers taken off",
  "Nail holes and cracks filled and sanded smooth",
  "Gaps along trim and casings caulked",
  "Repairs and stains spot-primed so they don’t show through",
  "Greasy or dusty surfaces cleaned so paint sticks (kitchens and baths especially)",
  "Edges cut in by hand, with tape where it helps",
  "Room put back and cleaned up at the end",
];

export default function InteriorPage() {
  return (
    <>
      <PageHero eyebrow="Interior painting" title="Interior painting in Wilmington, NC" photoLabel="Finished interior: living room walls, ceiling and trim">
        <p>
          Walls, ceilings and trim, painted by the same person who quoted the job. Mo covers what needs covering, does the
          prep properly and leaves the room ready to use.
        </p>
      </PageHero>

      {/* Surfaces: header on the left, list on the right */}
      <section aria-labelledby="surfaces-title" className="border-t border-border">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="What Mo paints inside" title="Walls, ceilings and trim" id="surfaces-title" />
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

      {/* Prep checklist: a job sheet */}
      <section aria-labelledby="prep-title" className="bg-sand-deep">
        <div className="mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-24">
          <SectionHeader eyebrow="Before the first coat" title="Prep checklist" id="prep-title">
            <p>Most of a good interior paint job happens before the paint can opens. This is what gets done in every room.</p>
          </SectionHeader>
          <div className="mt-10 max-w-[60rem]">
            <Ph block note="prep checklist matches how Mo works">
              <ul className="border border-border bg-paper sm:columns-2 sm:gap-0">
                {prep.map((item) => (
                  <li key={item} className="flex break-inside-avoid gap-3 border-b border-border px-5 py-4 sm:border-r">
                    <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-[2px] border-2 border-shutter text-shutter">
                      <CheckIcon className="h-4 w-4" />
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </Ph>
          </div>
        </div>
      </section>

      <section aria-labelledby="ba-title" className="mx-auto max-w-[1200px] px-5 py-16 lg:px-8 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Recent interior job" title="Before and after" id="ba-title" />
          </div>
          <div className="lg:col-span-8">
            <BeforeAfter subject="interior room" />
          </div>
        </div>
      </section>

      <QuoteSection lead="Planning an interior job?" defaultJobType="interior" />
    </>
  );
}
