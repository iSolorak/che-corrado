import type { Dictionary } from "@/lib/i18n";
import { site } from "@/lib/site";
import Embers from "./Embers";
import Photo from "./Photo";
import styles from "./sections.module.css";

export default function Hero({
  hero,
  nav,
}: {
  hero: Dictionary["hero"];
  nav: Dictionary["nav"];
}) {
  const [first, last] = site.name.split(" ");

  return (
    <section id="top" className={`${styles.section} ${styles.hero}`}>
      <div className={styles.heroType}>
        <h1 className={styles.heroName}>
          <span>{first}</span> <span>{last}</span>
        </h1>
        <div className={styles.heroMeta}>
          <ul className="label">
            {hero.labels.map((label) => (
              <li key={label}>{label}</li>
            ))}
          </ul>
          <p>{hero.intro}</p>
        </div>
        <p className={`label ${styles.heroHint}`}>
          {hero.hint} <span aria-hidden="true" />
        </p>
      </div>
      <Photo
        name="hero"
        alt={hero.photo}
        ratio="21 / 9"
        sizes="(max-width: 860px) 100vw, 130vh"
        priority
        className={styles.heroPhoto}
      />
      <Embers nav={nav} />
    </section>
  );
}
