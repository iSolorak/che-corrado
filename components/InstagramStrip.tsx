import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import Photo from "./Photo";
import styles from "./sections.module.css";

export default function InstagramStrip({
  instagram,
}: {
  instagram: Dictionary["instagram"];
}) {
  const [main] = site.instagram;

  return (
    <section className={styles.section}>
      <p className={`label ${styles.spine}`}>{instagram.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {instagram.title}
        </h2>
        <ul className={`${styles.row} ${styles.shots}`}>
          {instagram.photos.map((alt, index) => (
            <li key={alt} className={styles.shot}>
              <a href={main.href} target="_blank" rel="noreferrer">
                <Photo
                  name={`feed-${index + 1}`}
                  alt={alt}
                  ratio="1 / 1"
                  sizes="(max-width: 860px) 34vw, 60vh"
                />
              </a>
            </li>
          ))}
          <li className={`${styles.cell} ${styles.handles}`}>
            {site.instagram.map((account) => (
              <a
                key={account.handle}
                href={account.href}
                target="_blank"
                rel="noreferrer"
              >
                {account.handle} ↗
              </a>
            ))}
          </li>
        </ul>
      </div>
    </section>
  );
}
