"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const isField = (el: EventTarget | null) => el instanceof HTMLElement && el.matches("input, select, textarea");

/** True while a form field has focus (phone keyboard likely open). */
export function useFieldFocus() {
  const [focused, setFocused] = useState(false);
  useEffect(() => {
    const onIn = (e: FocusEvent) => isField(e.target) && setFocused(true);
    const onOut = (e: FocusEvent) => isField(e.target) && !isField(e.relatedTarget) && setFocused(false);
    document.addEventListener("focusin", onIn);
    document.addEventListener("focusout", onOut);
    return () => {
      document.removeEventListener("focusin", onIn);
      document.removeEventListener("focusout", onOut);
    };
  }, []);
  return focused;
}

/**
 * True while any quote form is on screen at phone/tablet widths, so overlays
 * (the consent banner) never sit on top of the form's fields or submit button.
 */
export function useQuoteFormOnScreen() {
  const [onScreen, setOnScreen] = useState(false);
  const pathname = usePathname(); // re-attach to the new page's form after client navigation
  useEffect(() => {
    setOnScreen(false);
    const mq = window.matchMedia("(max-width: 1023px)");
    const forms = document.querySelectorAll("#quote");
    if (!forms.length || !("IntersectionObserver" in window)) return;
    const visible = new Set<Element>();
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visible.add(e.target) : visible.delete(e.target)));
      setOnScreen(mq.matches && visible.size > 0);
    });
    forms.forEach((f) => io.observe(f));
    const onMq = () => setOnScreen(mq.matches && visible.size > 0);
    mq.addEventListener("change", onMq);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", onMq);
    };
  }, [pathname]);
  return onScreen;
}
