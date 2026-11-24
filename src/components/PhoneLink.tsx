import { site } from "@/config/site";
import { PhoneIcon } from "./icons";
import { Ph } from "./Placeholder";

const phone = site.phone.value;

export const telHref = `tel:${phone.tel}`;

/** Full number, always a tel: link, always tabular figures. */
export function PhoneNumber({ className = "" }: { className?: string }) {
  return (
    <a href={telHref} className={`whitespace-nowrap font-semibold tabular-nums ${className}`}>
      <Ph confirmed={site.phone.confirmed}>{phone.display}</Ph>
    </a>
  );
}

/** Shutter "Call" button with the number visible. */
export function CallButton({ className = "", label = "Call" }: { className?: string; label?: string }) {
  return (
    <a href={telHref} className={`btn btn-primary ${className}`} aria-label={`${label} Mo at ${phone.display}`}>
      <PhoneIcon className="h-5 w-5 shrink-0" />
      <span>{label}</span>
      <span className="tabular-nums">{phone.display}</span>
    </a>
  );
}
