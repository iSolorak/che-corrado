import type { Dictionary } from "@/lib/i18n";
import { mailto } from "@/lib/site";
import styles from "./sections.module.css";

export default function Club({ club }: { club: Dictionary["club"] }) {
  return (
    <section id="club" className={`${styles.section} ${styles.ember}`}>
      <p className={`label ${styles.spine}`}>{club.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {club.title}
        </h2>
        <div className={styles.row}>
          <div className={`${styles.cell} ${styles.wide}`}>
            <p className={styles.lead}>{club.text}</p>
          </div>
          <div className={styles.cell}>
            <p className={styles.cta}>
              <a className="button" href={mailto(club.subject)}>
                {club.cta} →
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
