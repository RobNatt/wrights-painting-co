import { site } from "@/config/site";

/**
 * LocalBusiness (HousePainter) JSON-LD, rendered on every page from layout.tsx.
 *
 * Only CONFIRMED details are included. Placeholder phone, hours, towns or logo
 * are left out, so structured data never publishes something Mo hasn't
 * approved. No ratings, reviews or prices, by design.
 */
export function LocalBusinessSchema() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "HousePainter",
    "@id": `${site.url}/#business`,
    name: site.name,
    url: site.url,
    founder: { "@type": "Person", name: site.owner },
    description: "Owner-operated interior and exterior house painting in Wilmington, North Carolina.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Wilmington",
      addressRegion: "NC",
      addressCountry: "US",
    },
  };

  if (site.phone.confirmed) data.telephone = site.phone.value.tel;
  if (site.logo.confirmed && site.logo.value) {
    data.logo = `${site.url}${site.logo.value}`;
    data.image = `${site.url}${site.logo.value}`;
  }
  data.areaServed = site.towns.confirmed
    ? site.towns.value.map((name) => ({ "@type": "City", name: `${name}, NC` }))
    : [{ "@type": "City", name: "Wilmington, NC" }];
  // Hours: once confirmed, replace site.hours with structured days/times and
  // add openingHoursSpecification here.

  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here; escape "<" to rule out </script> injection.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
