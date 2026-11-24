import Link from "next/link";
import { navItems, site } from "@/config/site";
import { PrivacyChoicesButton } from "./ConsentBanner";
import { PhoneNumber } from "./PhoneLink";
import { Ph } from "./Placeholder";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-border bg-sand pb-28 pt-14 lg:pb-12">
      <div className="mx-auto grid max-w-[1200px] gap-10 px-5 sm:grid-cols-2 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="font-serif text-xl font-bold">{site.name}</p>
          <p className="mt-2 max-w-[28rem] text-slate">
            House painting in Wilmington, NC. Owner-operated by {site.owner}.
          </p>
          <p className="mt-4 text-lg">
            <PhoneNumber className="text-shutter no-underline hover:underline" />
          </p>
        </div>

        <div className="lg:col-span-3">
          <p className="text-eyebrow">Hours</p>
          <p className="mt-2">
            <Ph confirmed={site.hours.confirmed}>{site.hours.value}</Ph>
          </p>
          <p className="text-eyebrow mt-6">Insurance</p>
          <p className="mt-2 text-[0.9375rem]">
            <Ph confirmed={site.insurance.confirmed}>{site.insurance.value}</Ph>
          </p>
        </div>

        <nav aria-label="Footer" className="lg:col-span-4">
          <p className="text-eyebrow">Pages</p>
          <ul className="mt-2 grid grid-cols-2 gap-x-6">
            {[{ href: "/", label: "Home" }, ...navItems()].map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="inline-flex min-h-11 items-center no-underline hover:underline">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1200px] flex-wrap gap-x-4 gap-y-2 px-5 text-sm text-slate lg:px-8">
        <span className="inline-flex min-h-11 items-center">© {year} {site.name} · Wilmington, North Carolina</span>
        <PrivacyChoicesButton />
      </div>
    </footer>
  );
}
