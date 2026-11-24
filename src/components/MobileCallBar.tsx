"use client";

import { site } from "@/config/site";
import { useFieldFocus } from "@/lib/useFieldFocus";
import { PhoneIcon } from "./icons";

/**
 * Mobile/tablet bottom bar: Call + Get a free quote (design-system.md 7.2).
 * Hides while a form field has focus so it never sits on top of the keyboard.
 */
export function MobileCallBar() {
  const hidden = useFieldFocus();

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-border bg-paper px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-2px_8px_rgb(42_42_40/0.08)] lg:hidden ${hidden ? "hidden" : ""}`}
    >
      <div className="mx-auto grid max-w-md grid-cols-2 gap-3">
        <a href={`tel:${site.phone.value.tel}`} className="btn btn-secondary" aria-label={`Call Mo at ${site.phone.value.display}`}>
          <PhoneIcon className="h-5 w-5" />
          Call Mo
        </a>
        <a href="#quote" className="btn btn-primary">
          Get a free quote
        </a>
      </div>
    </div>
  );
}
