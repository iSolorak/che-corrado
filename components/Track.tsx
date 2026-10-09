"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { horizontalQuery } from "@/lib/site";
import styles from "./sections.module.css";

const keys: Record<string, (page: number) => number> = {
  ArrowRight: () => 160,
  ArrowDown: () => 160,
  ArrowLeft: () => -160,
  ArrowUp: () => -160,
  PageDown: (page) => page * 0.85,
  " ": (page) => page * 0.85,
  PageUp: (page) => -page * 0.85,
  Home: () => -Infinity,
  End: () => Infinity,
};

// On wide screens the page scrolls sideways; this turns the wheel and the
// usual scrolling keys into horizontal movement.
export default function Track({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const track = ref.current;
    if (!track) return;

    const horizontal = window.matchMedia(horizontalQuery);
    let target = track.scrollLeft;
    let frame = 0;

    const step = () => {
      const distance = target - track.scrollLeft;
      if (Math.abs(distance) < 1) {
        track.scrollLeft = target;
        frame = 0;
        return;
      }
      track.scrollLeft +=
        Math.sign(distance) * Math.max(1, Math.abs(distance) * 0.2);
      frame = requestAnimationFrame(step);
    };

    const scrollBy = (delta: number) => {
      if (!frame) target = track.scrollLeft;
      const max = track.scrollWidth - track.clientWidth;
      target = Math.min(max, Math.max(0, target + delta));
      if (!frame) frame = requestAnimationFrame(step);
    };

    const onWheel = (event: WheelEvent) => {
      if (!horizontal.matches || event.ctrlKey) return;
      const delta =
        Math.abs(event.deltaY) > Math.abs(event.deltaX)
          ? event.deltaY
          : event.deltaX;
      event.preventDefault();
      // The track is many screens long, so the wheel covers ground a little faster.
      scrollBy(delta * (event.deltaMode === 1 ? 40 : 1) * 1.5);
    };

    const onKey = (event: KeyboardEvent) => {
      const move = keys[event.key];
      if (!move || !horizontal.matches || event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      // Space on a focused link or button belongs to that control.
      if (
        event.key === " " &&
        event.target instanceof Element &&
        event.target.closest("a, button")
      ) {
        return;
      }
      event.preventDefault();
      scrollBy(move(track.clientWidth));
    };

    // Browsers only line anchors up vertically, so section links are moved
    // to the left edge by hand.
    const offsetOf = (hash: string) => {
      const section = hash.length > 1 && document.getElementById(hash.slice(1));
      if (!section || section === track || !track.contains(section)) return null;
      return (
        section.getBoundingClientRect().left - track.getBoundingClientRect().left
      );
    };

    const onClick = (event: MouseEvent) => {
      if (!horizontal.matches || !(event.target instanceof Element)) return;
      const link = event.target.closest<HTMLAnchorElement>('a[href^="#"]');
      const offset = link && offsetOf(link.hash);
      if (!link || offset === null) return;
      event.preventDefault();
      history.replaceState(null, "", link.hash);
      scrollBy(offset);
    };

    const landed = horizontal.matches ? offsetOf(window.location.hash) : null;
    if (landed !== null) track.scrollLeft += landed;

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <main id="main" className={styles.track} ref={ref}>
      {children}
    </main>
  );
}
