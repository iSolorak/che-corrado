"use client";

import { useEffect } from "react";
import { horizontalQuery } from "@/lib/site";

// Wipes in every [data-reveal] element in hard steps as it scrolls into view.
// The hidden state only applies once this has run, so nothing stays hidden without JS.
export default function Reveal() {
  useEffect(() => {
    const root = document.documentElement;
    // Content arrives from the right in the sideways layout, from below otherwise.
    const sideways = window.matchMedia(horizontalQuery).matches;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-reveal", "in");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: sideways ? "0px -10% 0px 0px" : "0px 0px -12% 0px" },
    );

    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    root.dataset.reveal = "on";

    return () => {
      observer.disconnect();
      delete root.dataset.reveal;
    };
  }, []);

  return null;
}
