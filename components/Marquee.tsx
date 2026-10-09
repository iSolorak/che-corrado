"use client";

import gsap from "gsap";
import { useEffect, useRef } from "react";
import { horizontalQuery } from "@/lib/site";
import styles from "./sections.module.css";

export default function Marquee({ items }: { items: string[] }) {
  const track = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const media = gsap.matchMedia();

    media.add(
      {
        sideways: horizontalQuery,
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        const { sideways, motion } = context.conditions ?? {};
        if (!motion) return;

        // In the sideways layout the strip stands upright and runs vertically.
        const loop = gsap.to(track.current, {
          [sideways ? "yPercent" : "xPercent"]: -50,
          duration: 28,
          ease: "none",
          repeat: -1,
        });
        // Start far from zero so the loop can also run backwards.
        loop.totalTime(loop.duration() * 100);

        // The strip follows the scroll direction.
        const scroller = sideways ? document.getElementById("main") : null;
        const position = () => (scroller ? scroller.scrollLeft : window.scrollY);
        let last = position();
        const onScroll = () => {
          const now = position();
          if (now === last) return;
          gsap.to(loop, {
            timeScale: now > last ? 1 : -1,
            duration: 0.3,
            overwrite: true,
          });
          last = now;
        };

        const target = scroller ?? window;
        target.addEventListener("scroll", onScroll, { passive: true });
        return () => target.removeEventListener("scroll", onScroll);
      },
    );

    return () => media.revert();
  }, []);

  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.marqueeTrack} ref={track}>
        {[0, 1].map((copy) => (
          <ul key={copy}>
            {[...items, ...items].map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
