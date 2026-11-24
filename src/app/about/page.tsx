import type { Metadata } from "next";
import { PhoneNumber } from "@/components/PhoneLink";
import { Photo, Ph } from "@/components/Placeholder";
import { QuoteSection } from "@/components/QuoteSection";
import { SectionHeader } from "@/components/SectionHeader";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: `About ${site.owner}`,
  description: `${site.name} is owner-operated by ${site.owner}, a house painter in Wilmington, NC. You deal with Mo: he answers, he quotes, he paints.`,
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <section className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-8 pb-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-14 lg:pb-24">
        <div className="lg:col-span-4">
          <Photo label="Mo Wright on a job site, natural light, no posed stock look" ratio="4 / 5" priority sizes="(min-width: 1024px) 380px, 100vw" />
        </div>
        <div className="lg:col-span-7 lg:col-start-6 lg:pt-4">
          <p className="text-eyebrow">Owner-operated</p>
          <h1 className="text-h1 mt-3">About Mo Wright</h1>
          <p className="mt-6 border-l-[3px] border-shutter pl-5 font-serif text-2xl font-semibold leading-snug sm:text-[1.75rem]">
            You deal with Mo. He answers, he quotes, he paints.
          </p>
          <div className="mt-8 max-w-[38rem] space-y-4">
            <Ph block note="Mo's story, in his words">
              <p className="text-slate">
                Two or three short paragraphs from Mo: how long he’s been painting, how he got started, and what he
                pays attention to on a job. Write it with him, in first person, and keep it plain. No claims about
                years, awards or numbers until he confirms them.
              </p>
            </Ph>
          </div>
        </div>
      </section>

      <section aria-labelledby="details-title" className="border-t border-border">
        <div className="mx-auto grid max-w-[1200px] gap-10 px-5 py-16 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:py-24">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="The short version" title="Who does what" id="details-title" />
          </div>
          <dl className="border-t-2 border-charcoal lg:col-span-7 lg:col-start-6">
            {[
              ["Answers the phone", <>Mo, at <PhoneNumber key="p" className="text-shutter no-underline hover:underline" /></>],
              ["Writes the quote", "Mo"],
              ["Paints the house", "Mo"],
              ["Works in", <Ph key="t" confirmed={site.towns.confirmed}>{site.towns.value.join(", ")}</Ph>],
              ["Hours", <Ph key="h" confirmed={site.hours.confirmed}>{site.hours.value}</Ph>],
              ["Insurance", <Ph key="i" confirmed={site.insurance.confirmed}>{site.insurance.value}</Ph>],
            ].map(([term, value]) => (
              <div key={String(term)} className="grid gap-1 border-b border-border py-4 sm:grid-cols-[12rem_1fr] sm:gap-6">
                <dt className="font-semibold">{term}</dt>
                <dd>{value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <QuoteSection lead="Want Mo to take a look?" />
    </>
  );
}
