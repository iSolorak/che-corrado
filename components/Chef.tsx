import type { Dictionary } from "@/lib/i18n";
import Photo from "./Photo";
import styles from "./sections.module.css";

export default function Chef({ chef }: { chef: Dictionary["chef"] }) {
  const [lead, ...rest] = chef.paragraphs;

  return (
    <section id="chef" className={styles.section}>
      <p className={`label ${styles.spine}`}>{chef.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {chef.title}
        </h2>
        <div className={styles.row}>
          <div className={styles.cell}>
            <p className={styles.lead}>{lead}</p>
          </div>
          <div className={styles.cell}>
            <div className={styles.prose}>
              {rest.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Photo
        name="grill"
        alt={chef.photo}
        ratio="4 / 5"
        sizes="(max-width: 860px) 100vw, 70vh"
      />
      <blockquote className={styles.quote} data-reveal>
        <p>“{chef.quote}”</p>
      </blockquote>
    </section>
  );
}
