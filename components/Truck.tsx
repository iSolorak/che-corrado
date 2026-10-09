"use client";

import { useEffect, useRef } from "react";
import { horizontalQuery } from "@/lib/site";
import styles from "./Truck.module.css";

const stroke = {
  stroke: "var(--ink)",
  strokeWidth: 5,
  strokeLinejoin: "miter",
} as const;

const puffs = [0, 1, 2, 3, 4];
const gap = 14;

// The Cuina Petita truck. It drives along an edge of the screen as the page
// scrolls: across the top bar in the sideways layout, along the bottom edge
// when the page is stacked.
export default function Truck() {
  const truck = useRef<HTMLDivElement>(null);
  const flip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = truck.current;
    const flipper = flip.current;
    if (!element || !flipper) return;

    const sideways = window.matchMedia(horizontalQuery);
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    const wheels = element.querySelectorAll<SVGGElement>("[data-wheel]");
    const smoke = element.querySelectorAll<HTMLElement>("[data-puff]");
    const find = (name: string) =>
      document.querySelector<HTMLElement>(`[data-road="${name}"]`);

    let road = { start: 0, end: 0 };
    let borders: number[] = [];
    let section = 0;
    let x = 0;
    let facing = 1;
    let turn = 0;
    let hop = 0;
    let nextPuff = 0;
    let puff = 0;
    let frame = 0;
    let placed = false;

    const scroller = () =>
      sideways.matches ? document.getElementById("main") : null;

    const position = () => scroller()?.scrollLeft ?? window.scrollY;

    const progress = () => {
      const track = scroller();
      const max = track
        ? track.scrollWidth - track.clientWidth
        : document.documentElement.scrollHeight - window.innerHeight;
      return max > 0 ? Math.min(1, Math.max(0, position() / max)) : 0;
    };

    // Work out where the road starts and ends, and where sections begin.
    const measure = () => {
      const width = element.offsetWidth;
      const track = scroller();

      const bar = find("start")?.parentElement;

      if (track && bar) {
        const from = find("start")?.getBoundingClientRect().right ?? 0;
        const to = find("end")?.getBoundingClientRect().left ?? window.innerWidth;
        road = { start: from + gap, end: to - gap - width };
        // Stand the wheels (71/80 down the drawing) on the bar's bottom line.
        const line = parseFloat(getComputedStyle(bar).borderBottomWidth);
        const floor = bar.getBoundingClientRect().bottom - line;
        element.style.top = `${floor - element.offsetHeight * (71 / 80)}px`;
      } else {
        element.style.top = "";
        const sticker = find("sticker")?.getBoundingClientRect();
        const edge = sticker?.width ? sticker.left : window.innerWidth;
        road = { start: gap, end: edge - gap - width };
      }
      element.hidden = road.end <= road.start;

      const origin = track ? track.getBoundingClientRect().left : 0;
      borders = [...document.querySelectorAll("#main > section, #main > footer")]
        .map((part) => {
          const box = part.getBoundingClientRect();
          return track ? box.left - origin + track.scrollLeft : box.top + window.scrollY;
        })
        .slice(1);
    };

    const target = () => road.start + (road.end - road.start) * progress();

    const draw = (bob: number, drift: number) => {
      element.style.transform = `translate3d(${x + drift}px, ${bob - hop}px, 0)`;
      flipper.style.transform = `scaleX(${facing})`;
      wheels.forEach((wheel) => {
        wheel.style.transform = `rotate(${turn}rad)`;
      });
    };

    const emit = (moving: boolean) => {
      const dot = smoke[puff++ % smoke.length];
      const rise = element.offsetWidth * (0.3 + Math.random() * 0.2);
      const lean = (Math.random() - 0.5) * 16 - (moving ? 14 : 0);
      const size = 0.9 + Math.random() * 0.8;
      dot.animate(
        [
          { opacity: 0.95, transform: "translate(-50%, 0) scale(0.35)" },
          {
            opacity: 0,
            transform: `translate(calc(-50% + ${lean}px), ${-rise}px) scale(${size})`,
          },
        ],
        { duration: 1400 + Math.random() * 700, easing: "ease-out" },
      );
    };

    const tick = (now: number) => {
      const time = now / 1000;
      if (!placed) {
        x = target();
        placed = true;
      }

      const step = (target() - x) * 0.06;
      x += step;
      const moving = Math.abs(step) > 0.35;
      if (moving) facing = step > 0 ? 1 : -1;
      turn += (step * facing) / (element.offsetWidth * 0.09);

      // A hop each time the scroll crosses into another section.
      const here = borders.filter((border) => border <= position() + 1).length;
      if (here !== section) {
        section = here;
        hop = 7;
      }
      hop *= 0.86;

      if (now > nextPuff) {
        emit(moving);
        nextPuff = now + (moving ? 240 + Math.random() * 160 : 2400 + Math.random() * 2600);
      }

      // Two slow waves each, out of step, so the motion never visibly repeats.
      const bob = Math.sin(time * 1.7) * 1.1 + Math.sin(time * 0.9 + 1) * 0.7;
      const drift = Math.sin(time * 0.31) * 4 + Math.sin(time * 0.17 + 2) * 3;
      draw(bob, drift);
      frame = requestAnimationFrame(tick);
    };

    // With reduced motion the truck only marks how far the page has scrolled.
    const park = () => {
      x = target();
      draw(0, 0);
    };

    const restart = () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", park, true);
      measure();
      placed = false;
      if (still.matches) {
        window.addEventListener("scroll", park, { capture: true, passive: true });
        park();
      } else {
        frame = requestAnimationFrame(tick);
      }
    };

    const resized = new ResizeObserver(restart);
    resized.observe(document.body);
    const start = find("start");
    if (start) resized.observe(start);
    sideways.addEventListener("change", restart);
    still.addEventListener("change", restart);
    restart();
    element.dataset.ready = "true";

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", park, true);
      resized.disconnect();
      sideways.removeEventListener("change", restart);
      still.removeEventListener("change", restart);
    };
  }, []);

  return (
    <div className={styles.truck} ref={truck} aria-hidden="true">
      <div className={styles.flip} ref={flip}>
        {puffs.map((index) => (
          <span key={index} className={styles.puff} data-puff />
        ))}
        <svg viewBox="0 0 120 80">
          <rect fill="var(--ink)" x="64" y="2" width="8" height="14" />
          <rect {...stroke} fill="var(--white)" x="8" y="16" width="70" height="42" />
          <path {...stroke} fill="var(--white)" d="M78 30h20l14 14v14H78Z" />
          <path fill="var(--ink)" d="M84 35h12l8 9H84Z" />
          <rect fill="var(--ink)" x="18" y="30" width="40" height="16" />
          <path {...stroke} fill="var(--ember)" d="M14 16h50l5 12H9Z" />
          {[30, 92].map((cx) => (
            <g key={cx} data-wheel className={styles.wheel}>
              <circle fill="var(--ink)" cx={cx} cy="60" r="11" />
              <path
                stroke="var(--paper)"
                strokeWidth="3"
                d={`M${cx - 7} 60h14M${cx} 53v14`}
              />
            </g>
          ))}
        </svg>
      </div>
    </div>
  );
}
