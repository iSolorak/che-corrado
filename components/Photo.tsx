import Image from "next/image";
import styles from "./sections.module.css";

// Placeholder photos live in public/img; see CREDITS.md there.
export default function Photo({
  name,
  alt,
  ratio,
  sizes,
  priority,
  className,
}: {
  name: string;
  alt: string;
  ratio: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  return (
    <div
      className={[styles.photo, className].filter(Boolean).join(" ")}
      style={{ aspectRatio: ratio }}
    >
      <Image
        src={`/img/${name}.webp`}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
      />
    </div>
  );
}
