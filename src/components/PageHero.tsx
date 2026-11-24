import type { ReactNode } from "react";
import { PhoneIcon } from "./icons";
import { telHref } from "./PhoneLink";
import { Photo } from "./Placeholder";
import { site } from "@/config/site";

/** Inner-page hero: left-aligned copy on 7 columns, photo offset on the right. */
export function PageHero({
  eyebrow,
  title,
  children,
  photoLabel,
  photoSrc,
  photoRatio = "4 / 5",
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
  photoLabel: string;
  photoSrc?: string;
  photoRatio?: string;
}) {
  return (
    <section className="mx-auto grid max-w-[1200px] gap-10 px-5 pt-8 pb-14 lg:grid-cols-12 lg:gap-8 lg:px-8 lg:pt-14 lg:pb-20">
      <div className="lg:col-span-7 lg:pt-6">
        <p className="text-eyebrow">{eyebrow}</p>
        <h1 className="text-h1 mt-3 max-w-[18ch]">{title}</h1>
        <div className="mt-5 max-w-[38rem] space-y-4 text-lg text-slate">{children}</div>
        <div className="mt-7 flex flex-wrap gap-3">
          <a href="#quote" className="btn btn-primary">
            Get a free quote
          </a>
          <a href={telHref} className="btn btn-secondary">
            <PhoneIcon className="h-5 w-5" />
            Call <span className="tabular-nums">{site.phone.value.display}</span>
          </a>
        </div>
      </div>
      <div className="lg:col-span-4 lg:col-start-9">
        <Photo label={photoLabel} src={photoSrc} ratio={photoRatio} priority sizes="(min-width: 1024px) 380px, 100vw" />
      </div>
    </section>
  );
}

/** Before/after pair from the same angle. */
export function BeforeAfter({ subject }: { subject: string }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4">
      {(["Before", "After"] as const).map((when) => (
        <figure key={when}>
          <Photo label={`${when}: ${subject}, same angle`} ratio="4 / 3" sizes="(min-width: 1024px) 380px, 50vw" />
          <figcaption className="mt-2 text-eyebrow">{when}</figcaption>
        </figure>
      ))}
    </div>
  );
}
