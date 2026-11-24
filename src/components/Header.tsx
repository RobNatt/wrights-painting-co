"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/config/site";
import { MenuIcon, PhoneIcon } from "./icons";
import { Ph } from "./Placeholder";

const phone = site.phone.value;

/**
 * Sticky header (design-system.md 7.1). Shrinks after 80px of scroll, detected
 * with an IntersectionObserver on a sentinel rather than a scroll listener.
 * Tap-to-call stays visible at every width and in both states.
 */
export function Header() {
  const sentinel = useRef<HTMLDivElement>(null);
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const items = navItems();

  useEffect(() => {
    const el = sentinel.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([entry]) => setCompact(!entry.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Close the mobile menu on navigation and on Escape.
  useEffect(() => setMenuOpen(false), [pathname]);
  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <>
      <div ref={sentinel} aria-hidden="true" className="pointer-events-none absolute left-0 top-0 h-20 w-px" />
      <header
        data-compact={compact || menuOpen}
        className="site-header sticky top-0 z-40 bg-sand"
      >
        <div className="mx-auto flex h-full max-w-[1200px] items-center gap-3 px-5 lg:gap-6 lg:px-8">
          <Link href="/" className="brand mr-auto flex min-h-11 min-w-0 items-center gap-2.5 no-underline" aria-label={`${site.name}, home`}>
            {/* LOGO PLACEHOLDER: replace with <Image src={site.logo.value} …/> once supplied */}
            {site.logo.value ? null : (
              <span
                aria-hidden="true"
                title="Logo placeholder"
                className="grid h-9 w-9 shrink-0 place-items-center max-[419px]:hidden rounded-[2px] border border-dashed border-brick font-serif text-sm font-bold text-shutter lg:h-11 lg:w-11 lg:text-base"
              >
                W
              </span>
            )}
            <span className="truncate font-serif text-[1.0625rem] font-bold leading-tight min-[420px]:text-lg lg:text-[1.375rem]">
              {site.name}
            </span>
          </Link>

          <nav aria-label="Main" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="py-2 font-medium no-underline decoration-2 underline-offset-[6px] hover:underline aria-[current=page]:text-shutter aria-[current=page]:underline"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Desktop: number as text link + primary quote button */}
          <a href={`tel:${phone.tel}`} className="hidden items-center gap-2 font-semibold tabular-nums text-shutter no-underline hover:underline lg:flex">
            <PhoneIcon className="h-5 w-5" />
            <Ph confirmed={site.phone.confirmed}>{phone.display}</Ph>
          </a>
          <a href="#quote" className="btn btn-primary hidden lg:inline-flex">
            Get a free quote
          </a>

          {/* Mobile: call button always visible; number shown when it fits */}
          <a
            href={`tel:${phone.tel}`}
            className="btn btn-primary min-h-11 shrink-0 gap-1.5 px-3 lg:hidden"
            aria-label={`Call Mo at ${phone.display}`}
          >
            <PhoneIcon className="h-5 w-5" />
            <span className="max-[399px]:hidden tabular-nums">{phone.display}</span>
            <span className="min-[400px]:hidden">Call</span>
          </a>
          <button
            type="button"
            className="-mr-2 grid h-11 w-11 shrink-0 place-items-center rounded-[4px] lg:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((o) => !o)}
          >
            <MenuIcon open={menuOpen} />
            <span className="sr-only">{menuOpen ? "Close menu" : "Open menu"}</span>
          </button>
        </div>

        {menuOpen ? (
          <nav id="mobile-menu" aria-label="Main" className="border-t border-border bg-paper shadow-[0_2px_8px_rgb(42_42_40/0.08)] lg:hidden">
            <ul className="mx-auto max-w-[1200px] px-5 py-2">
              {[{ href: "/", label: "Home" }, ...items].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={pathname === item.href ? "page" : undefined}
                    className="block border-b border-border py-3.5 font-medium no-underline aria-[current=page]:text-shutter"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li className="py-4">
                <a href="#quote" onClick={() => setMenuOpen(false)} className="btn btn-primary w-full">
                  Get a free quote
                </a>
              </li>
            </ul>
          </nav>
        ) : null}
      </header>
    </>
  );
}
