"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Home-page quote panel (design-system.md 7.2). From 1024px up it sticks below
 * the compact header while the left column scrolls, and releases at the end of
 * its grid. If the panel is taller than the space available it falls back to
 * static, so the submit button can never sit off-screen.
 */
export function StickyQuotePanel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [fits, setFits] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => {
      const headerPx = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-compact")) || 64;
      setFits(el.offsetHeight + headerPx + 24 + 16 <= window.innerHeight);
    };
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    window.addEventListener("resize", check);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", check);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`border border-border bg-paper p-5 sm:p-6 lg:p-5 xl:p-6 lg:shadow-[0_2px_8px_rgb(42_42_40/0.08)] ${fits ? "lg:sticky lg:top-[calc(var(--header-compact)+24px)]" : ""}`}
    >
      {children}
    </div>
  );
}
