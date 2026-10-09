import type { Dictionary } from "@/lib/i18n";
import styles from "./sections.module.css";

export default function CuinaPetita({ cuina }: { cuina: Dictionary["cuina"] }) {
  return (
    <section id="cuina" className={`${styles.section} ${styles.inverted}`}>
      <p className={`label ${styles.spine}`}>{cuina.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {cuina.title}
        </h2>
        <div className={styles.row}>
          <div className={`${styles.cell} ${styles.wide}`}>
            <p className={styles.aside}>({cuina.aside})</p>
            <p className={styles.lead}>{cuina.lead}</p>
          </div>
          <div className={`${styles.cell} ${styles.stat}`}>
            <strong>{cuina.stat}</strong>
            <p>{cuina.statText}</p>
          </div>
          {cuina.pillars.map((pillar) => (
            <div key={pillar.title} className={styles.cell}>
              <h3>{pillar.title}</h3>
              <p>{pillar.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
