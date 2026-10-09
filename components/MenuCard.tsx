import type { Dictionary } from "@/lib/i18n";
import styles from "./sections.module.css";

export default function MenuCard({ menu }: { menu: Dictionary["menu"] }) {
  return (
    <section id="menu" className={`${styles.section} ${styles.white}`}>
      <p className={`label ${styles.spine}`}>{menu.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {menu.title}
        </h2>
        <ul className={styles.row}>
          {menu.items.map((item) => (
            <li key={item.name} className={styles.cell}>
              <h3>{item.name}</h3>
              <p className={styles.dishText}>{item.text}</p>
              <p className={styles.price} data-open={!item.price}>
                {item.price ? (
                  <>
                    <span className="label">CHF</span> {item.price}
                  </>
                ) : (
                  menu.onRequest
                )}
              </p>
            </li>
          ))}
          <li className={`${styles.cell} ${styles.slim}`}>
            <p className="label">{menu.note}</p>
          </li>
        </ul>
      </div>
    </section>
  );
}
