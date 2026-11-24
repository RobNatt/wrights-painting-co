import { site, type JobType } from "@/config/site";
import { PhoneNumber } from "./PhoneLink";
import { Ph } from "./Placeholder";
import { QuoteForm } from "./QuoteForm";

/**
 * Full-width quote band that ends every page except Home (Home has the
 * sticky panel instead). Carries id="quote" so every "Get a free quote"
 * button on the page lands here.
 */
export function QuoteSection({ lead, defaultJobType }: { lead: string; defaultJobType?: JobType }) {
  return (
    <section id="quote" aria-label="Get a free quote" className="bg-sand-deep py-16 lg:py-24">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="lg:col-span-5">
          <span className="block h-[3px] w-10 bg-brick" aria-hidden="true" />
          <p className="text-eyebrow mt-4">Free quote</p>
          <p className="mt-2 font-serif text-h2">{lead}</p>
          <p className="mt-4 max-w-[34rem] text-slate">
            Tell Mo a little about the job and when to reach you. He’ll call back, come take a look and give you a price.
          </p>
          <dl className="mt-8 space-y-4 border-t border-border pt-6">
            <div>
              <dt className="text-eyebrow">Call{site.acceptsTexts.value ? " or text" : ""}</dt>
              <dd className="mt-1 text-lg">
                <PhoneNumber className="text-shutter no-underline hover:underline" />
              </dd>
            </div>
            <div>
              <dt className="text-eyebrow">Hours</dt>
              <dd className="mt-1">
                <Ph confirmed={site.hours.confirmed}>{site.hours.value}</Ph>
              </dd>
            </div>
          </dl>
        </div>
        <div className="border border-border bg-paper p-5 sm:p-8 lg:col-span-6 lg:col-start-7">
          <QuoteForm defaultJobType={defaultJobType} heading="Tell Mo about the job" />
        </div>
      </div>
    </section>
  );
}
