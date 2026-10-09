import type { CSSProperties, ReactNode } from "react";
import type { Dictionary } from "@/lib/i18n";
import type { SectionId } from "@/lib/site";
import styles from "./Embers.module.css";

const stroke = {
  stroke: "var(--ink)",
  strokeWidth: 5,
  strokeLinejoin: "miter",
} as const;

const shapes: Record<string, ReactNode> = {
  flame: (
    <path
      {...stroke}
      fill="var(--ember)"
      d="M52 4c6 24 34 38 34 62a36 36 0 0 1-72 0c0-18 14-24 18-42 8 10 16 4 20-20Z"
    />
  ),
  knife: (
    <>
      <path {...stroke} fill="var(--white)" d="M40 4c24 16 30 40 24 62H40Z" />
      <rect {...stroke} fill="var(--ink)" x="40" y="66" width="16" height="30" />
    </>
  ),
  pepper: (
    <>
      <path
        {...stroke}
        fill="var(--ink)"
        d="M34 24C12 40 14 82 54 96 42 72 66 54 62 28c-8-10-20-10-28-4Z"
      />
      <path {...stroke} fill="none" d="M48 22c0-10 6-16 14-16" />
    </>
  ),
  octopus: (
    <>
      <path
        {...stroke}
        fill="none"
        strokeWidth={8}
        d="M28 54c-12 14 6 22-6 38M42 60c-6 14 8 20 0 34M58 60c6 14-8 20 0 34M72 54c12 14-6 22 6 38"
      />
      <ellipse {...stroke} fill="var(--ember)" cx="50" cy="36" rx="28" ry="30" />
      <circle fill="var(--ink)" cx="40" cy="38" r="5" />
      <circle fill="var(--ink)" cx="60" cy="38" r="5" />
    </>
  ),
  lemon: (
    <>
      <path
        {...stroke}
        fill="var(--white)"
        d="M8 50c6-6 8-30 42-30s36 24 42 30c-6 6-8 30-42 30S14 56 8 50Z"
      />
      <path {...stroke} fill="none" d="M34 38c8-6 18-6 26-2" />
    </>
  ),
};

// Fixed lanes and timings so server and client render the same thing.
const drops: {
  shape: keyof typeof shapes;
  to: SectionId;
  left: string;
  duration: number;
  delay: number;
  rest: string;
}[] = [
  { shape: "flame", to: "chef", left: "6%", duration: 15, delay: -2, rest: "58%" },
  { shape: "octopus", to: "cuina", left: "24%", duration: 21, delay: -12, rest: "22%" },
  { shape: "knife", to: "services", left: "44%", duration: 17, delay: -7, rest: "66%" },
  { shape: "pepper", to: "menu", left: "63%", duration: 23, delay: -16, rest: "30%" },
  { shape: "lemon", to: "contact", left: "82%", duration: 18, delay: -4, rest: "62%" },
];

export default function Embers({ nav }: { nav: Dictionary["nav"] }) {
  return (
    <div className={styles.field} data-overlay>
      {drops.map((drop) => (
        <div
          key={drop.shape}
          className={styles.lane}
          style={
            {
              left: drop.left,
              "--duration": `${drop.duration}s`,
              "--delay": `${drop.delay}s`,
              "--rest": drop.rest,
            } as CSSProperties
          }
        >
          <a className={styles.drop} href={`#${drop.to}`} aria-label={nav[drop.to]}>
            <svg viewBox="0 0 100 100" aria-hidden="true">
              {shapes[drop.shape]}
            </svg>
          </a>
        </div>
      ))}
    </div>
  );
}
