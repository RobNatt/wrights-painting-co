"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  eyebrow: string;
  title: ReactNode;
  id?: string;
  as?: "h1" | "h2";
  children?: ReactNode;
  className?: string;
  /** "dark" for use on the shutter background band. */
  tone?: "light" | "dark";
};

/**
 * Brick rule → eyebrow → heading. The only element on the site that reveals
 * on scroll: the rule draws in from the left while the text settles.
 * Runs once, at 15% visibility. Turned off by prefers-reduced-motion (CSS).
 */
export function SectionHeader({ eyebrow, title, id, as = "h2", children, className = "", tone = "light" }: Props) {
  const dark = tone === "dark";
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-in");
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("is-in");
          io.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Heading = as;
  return (
    <div ref={ref} data-reveal className={`max-w-[44rem] ${className}`}>
      <span className={`reveal-rule block h-[3px] w-10 ${dark ? "bg-sand" : "bg-brick"}`} aria-hidden="true" />
      <p className={`reveal-text text-eyebrow mt-4 ${dark ? "text-shutter-tint" : ""}`}>{eyebrow}</p>
      <Heading id={id} className={`reveal-text mt-2 ${as === "h1" ? "text-h1" : "text-h2"}`}>
        {title}
      </Heading>
      {children ? <div className={`mt-4 ${dark ? "text-white/85" : "text-slate"}`}>{children}</div> : null}
    </div>
  );
}
