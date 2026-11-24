"use client";

import { useSyncExternalStore } from "react";

/**
 * Analytics consent, stored in localStorage (not a cookie, so storing the
 * choice itself needs no consent). Nothing analytics-related loads until the
 * value is "granted".
 */
export type Consent = "granted" | "denied" | null;
/** "unknown" = server render / before hydration: render no banner, load nothing. */
type Snapshot = Consent | "unknown";

const KEY = "wpc-analytics-consent";
const listeners = new Set<() => void>();
/** True while the visitor has re-opened the banner from "Privacy choices". */
let reopened = false;

function read(): Consent {
  try {
    const v = window.localStorage.getItem(KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

function emit() {
  listeners.forEach((l) => l());
}

function subscribe(l: () => void) {
  listeners.add(l);
  window.addEventListener("storage", l);
  return () => {
    listeners.delete(l);
    window.removeEventListener("storage", l);
  };
}

/** Remove Google Analytics cookies on every domain level they may sit on. */
function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const parts = host.split(".");
  const domains = ["", host];
  for (let i = 1; i < parts.length - 1; i++) domains.push("." + parts.slice(i).join("."));
  document.cookie.split(";").forEach((c) => {
    const name = c.split("=")[0].trim();
    if (!/^_ga|^_gid$|^_gat/.test(name)) return;
    domains.forEach((d) => {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    });
  });
}

export function setConsent(value: "granted" | "denied") {
  const before = read();
  reopened = false;
  try {
    window.localStorage.setItem(KEY, value);
  } catch {
    /* private mode: choice lasts this page view only */
  }
  if (value === "denied" && before === "granted") {
    // A loaded script can't be unloaded: clear its cookies and reload clean.
    clearAnalyticsCookies();
    window.location.reload();
    return;
  }
  emit();
}

/** Re-open the banner (footer "Privacy choices"). */
export function reopenConsent() {
  reopened = true;
  emit();
}

export function useConsent(): Snapshot {
  return useSyncExternalStore<Snapshot>(subscribe, () => (reopened ? null : read()), () => "unknown");
}

/** The stored choice, ignoring a re-opened banner (analytics stays on until changed). */
export function useStoredConsent(): Snapshot {
  return useSyncExternalStore<Snapshot>(subscribe, read, () => "unknown");
}

/** GA4 measurement ID, validated so it can be inlined in a script safely. */
const rawId = process.env.NEXT_PUBLIC_GA_ID ?? "";
export const gaId = /^G-[A-Z0-9]{4,20}$/.test(rawId) ? rawId : null;
export const analyticsEnabled = gaId !== null;
