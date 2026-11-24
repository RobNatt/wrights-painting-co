"use client";

import { analyticsEnabled, reopenConsent, setConsent, useConsent } from "@/lib/consent";
import { useFieldFocus, useQuoteFormOnScreen } from "@/lib/useFieldFocus";

/**
 * Analytics consent banner. Shown until the visitor chooses; Accept and
 * Decline carry equal weight. Not a modal: the page, the call button and the
 * quote form stay usable. On phones it sits above the Call / Quote bar so it
 * never covers tap-to-call, and it steps aside while the quote form is on
 * screen or being filled in, so it can't block a field or the submit button.
 * Renders nothing if no analytics is configured.
 */
export function ConsentBanner() {
  const consent = useConsent();
  const typing = useFieldFocus();
  const formOnScreen = useQuoteFormOnScreen();
  if (!analyticsEnabled || consent !== null) return null;
  if (typing || formOnScreen) return null;

  return (
    <section
      aria-label="Analytics cookies"
      className="fixed inset-x-3 bottom-[calc(76px+env(safe-area-inset-bottom))] z-50 border border-border bg-paper p-3 shadow-[0_2px_8px_rgb(42_42_40/0.12)] sm:inset-x-auto sm:left-4 sm:max-w-sm sm:p-4 lg:bottom-6 lg:left-6 lg:p-5"
    >
      <p className="text-[0.875rem] leading-snug sm:text-[0.9375rem]">
        Can we use analytics cookies to see which pages help people find Mo? Nothing loads unless you say yes.
      </p>
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <button type="button" onClick={() => setConsent("denied")} className="btn btn-secondary min-h-11 px-3">
          Decline
        </button>
        <button type="button" onClick={() => setConsent("granted")} className="btn btn-secondary min-h-11 px-3">
          Accept
        </button>
      </div>
    </section>
  );
}

/** Footer link to change the choice later. Hidden when analytics is off. */
export function PrivacyChoicesButton() {
  const consent = useConsent();
  if (!analyticsEnabled || consent === "unknown") return null;
  return (
    <button type="button" onClick={reopenConsent} className="inline-flex min-h-11 items-center underline underline-offset-[3px] hover:text-charcoal">
      Privacy choices
    </button>
  );
}
