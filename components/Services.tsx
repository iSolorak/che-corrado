import type { Dictionary } from "@/lib/i18n";
import styles from "./sections.module.css";

export default function Services({
  services,
}: {
  services: Dictionary["services"];
}) {
  return (
    <section id="services" className={styles.section}>
      <p className={`label ${styles.spine}`}>{services.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {services.title}
        </h2>
        <ul className={styles.row}>
          {services.items.map((item) => (
            <li key={item.title} className={`${styles.cell} ${styles.hot}`}>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
