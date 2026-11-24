import Image from "next/image";
import type { ReactNode } from "react";
import { site } from "@/config/site";

/**
 * Wraps an unconfirmed detail with a dashed marker and a "TBC" tag.
 * Renders plain children once confirmed, or when site.markPlaceholders is false.
 */
export function Ph({
  confirmed = false,
  block = false,
  note,
  children,
}: {
  confirmed?: boolean;
  /** Wrap block content (lists, paragraphs) instead of inline text. */
  block?: boolean;
  /** Optional line explaining what needs confirming, shown above block content. */
  note?: string;
  children: ReactNode;
}) {
  if (confirmed || !site.markPlaceholders) return <>{children}</>;
  if (block) {
    return (
      <div className="ph-on p-3" title="Placeholder: confirm with Mo before launch">
        <p className="ph-note mb-2 text-xs font-semibold uppercase tracking-[0.06em] text-brick">
          To confirm with Mo{note ? `: ${note}` : ""}
        </p>
        {children}
      </div>
    );
  }
  return (
    <span className="ph-on" title="Placeholder: confirm with Mo before launch">
      {children}
      <span className="ph-tag" aria-hidden="true">
        TBC
      </span>
    </span>
  );
}

type PhotoProps = {
  /** What the photo should show. Used as the placeholder label and as alt text guidance. */
  label: string;
  /** Real image path in /public, once Mo supplies photos. */
  src?: string;
  alt?: string;
  ratio?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  /** Tiny slot (e.g. a headshot): shows a short label only. */
  small?: boolean;
};

/** "4 / 3" → orientation + minimum pixel size to ask Mo for. */
function shotSpec(ratio: string) {
  const [w, h] = ratio.split("/").map((n) => parseFloat(n));
  if (!w || !h) return "";
  const minW = w >= h ? 1600 : 1200;
  const orient = w > h ? "Landscape" : w < h ? "Portrait" : "Square";
  return `${orient} · at least ${minW}×${Math.round((minW * h) / w)}px`;
}

function CameraIcon({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={className}>
      <path d="M4 8h3l1.5-2h7L17 8h3a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1z" />
      <circle cx="12" cy="13" r="3.5" />
    </svg>
  );
}

/**
 * A job photo. Until `src` is set it renders a labeled PHOTO SLOT (dashed
 * frame, camera mark, what to shoot, orientation and minimum size), so it can
 * never be mistaken for a finished image. Fill slots with Mo's own job photos
 * only, never stock.
 */
export function Photo({ label, src, alt, ratio = "4 / 3", sizes = "100vw", priority, className = "", small }: PhotoProps) {
  if (src) {
    return (
      <div className={`relative overflow-hidden ${className}`} style={{ aspectRatio: ratio }}>
        <Image src={src} alt={alt ?? label} fill sizes={sizes} priority={priority} className="object-cover" />
      </div>
    );
  }
  return (
    <div
      role="img"
      aria-label={`Photo slot for Mo's own job photo: ${label}`}
      data-photo-slot
      className={`photo-slot relative overflow-hidden ${className}`}
      style={{ aspectRatio: ratio }}
    >
      {small ? (
        <span className="absolute inset-0 flex flex-col items-center justify-center gap-0.5 text-slate">
          <CameraIcon className="h-5 w-5" />
          <span className="text-[0.625rem] font-semibold uppercase tracking-[0.06em]">Photo</span>
        </span>
      ) : (
        <span className="absolute inset-0 flex flex-col justify-between p-3 sm:p-4">
          <span className="flex items-center gap-1.5 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-brick">
            <CameraIcon className="h-4 w-4" />
            Photo slot · Mo’s real job
          </span>
          <span className="block">
            <span className="block text-[0.9375rem] font-semibold leading-snug text-charcoal">{label}</span>
            <span className="mt-0.5 block text-xs text-slate">{shotSpec(ratio)}</span>
          </span>
        </span>
      )}
    </div>
  );
}
