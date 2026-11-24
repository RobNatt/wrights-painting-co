"use client";

import Script from "next/script";
import { gaId, useStoredConsent } from "@/lib/consent";

/**
 * Google Analytics 4, loaded ONLY after the visitor accepts in the consent
 * banner. Before that, no script tag, no request to Google, no cookies.
 * Set NEXT_PUBLIC_GA_ID (G-XXXXXXX) to turn analytics on at all.
 */
export function Analytics() {
  const consent = useStoredConsent();
  if (!gaId || consent !== "granted") return null;
  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
      </Script>
    </>
  );
}
