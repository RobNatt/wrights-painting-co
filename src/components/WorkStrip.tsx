"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowIcon } from "./icons";
import { Photo } from "./Placeholder";

export type WorkItem = { job: string; place: string; src?: string; alt?: string };

/**
 * Recent-work strip (design-system.md 7.3): a row of paint-chip tiles.
 * Native horizontal scroll with snap; arrow buttons on desktop scroll by one
 * tile. No autoplay, no loop, no carousel library.
 */
export function WorkStrip({ items, labelledBy }: { items: WorkItem[]; labelledBy: string }) {
  const track = useRef<HTMLUListElement>(null);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const update = useCallback(() => {
    const el = track.current;
    if (!el) return;
    setAtStart(el.scrollLeft <= 4);
    setAtEnd(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    update();
    const el = track.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const step = (dir: 1 | -1) => {
    const el = track.current;
    const tile = el?.querySelector("li");
    if (!el || !tile) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: dir * (tile.getBoundingClientRect().width + 16), behavior: reduce ? "auto" : "smooth" });
  };

  return (
    <div>
      <div className="mb-4 hidden justify-end gap-2 lg:flex">
        <button type="button" onClick={() => step(-1)} disabled={atStart} className="btn btn-secondary h-11 min-h-11 w-11 px-0 disabled:opacity-35" aria-label="Previous jobs">
          <ArrowIcon direction="left" />
        </button>
        <button type="button" onClick={() => step(1)} disabled={atEnd} className="btn btn-secondary h-11 min-h-11 w-11 px-0 disabled:opacity-35" aria-label="More jobs">
          <ArrowIcon />
        </button>
      </div>
      <ul
        ref={track}
        tabIndex={0}
        role="region"
        aria-labelledby={labelledBy}
        className="work-strip -mx-5 flex gap-4 overflow-x-auto px-5 pb-4 focus-visible:outline-offset-4 lg:mx-0 lg:px-0"
      >
        {items.map((item, i) => (
          <li key={i} className="w-[80%] shrink-0 sm:w-[300px] lg:w-[280px]">
            <figure className="border border-border bg-paper">
              <Photo label={`${item.job}, ${item.place}`} src={item.src} alt={item.alt} ratio="1 / 1" sizes="(min-width: 1024px) 280px, 80vw" />
              <figcaption className="border-t border-border bg-sand-deep px-3 py-2.5">
                <span className="block font-semibold leading-snug">{item.job}</span>
                <span className="block text-[0.9375rem] text-slate">{item.place}</span>
              </figcaption>
            </figure>
          </li>
        ))}
        <li className="w-[80%] shrink-0 sm:w-[300px] lg:w-[280px]">
          <a href="#quote" className="flex aspect-[1/1.17] flex-col justify-end border border-border bg-shutter-tint p-5 no-underline transition-colors duration-150 hover:border-shutter">
            <span className="font-serif text-xl font-semibold leading-snug">Want to see a job near you?</span>
            <span className="mt-2 text-[0.9375rem] text-slate">Ask Mo when he calls you back.</span>
            <span className="mt-4 inline-flex items-center gap-1.5 font-semibold text-shutter">
              Get a free quote <ArrowIcon className="h-4 w-4" />
            </span>
          </a>
        </li>
      </ul>
    </div>
  );
}
