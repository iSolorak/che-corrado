import type { Dictionary } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";
import styles from "./sections.module.css";

export default function Contact({
  contact,
  footer,
}: {
  contact: Dictionary["contact"];
  footer: Dictionary["footer"];
}) {
  return (
    <footer id="contact" className={`${styles.section} ${styles.inverted}`}>
      <p className={`label ${styles.spine}`}>{contact.label}</p>
      <div className={styles.body}>
        <h2 className={styles.headline} data-reveal>
          {contact.title}
        </h2>
        <dl className={`${styles.row} ${styles.contact}`}>
          <div className={styles.cell}>
            <dt className="label">{contact.call}</dt>
            <dd>
              <a href={site.phoneHref}>{site.phone}</a>
            </dd>
          </div>
          <div className={styles.cell}>
            <dt className="label">{contact.write}</dt>
            <dd>
              <a href={mailto(contact.subject)}>{site.email}</a>
            </dd>
          </div>
          <div className={styles.cell}>
            <dt className="label">{contact.find}</dt>
            <dd>
              <a href={site.mapHref} target="_blank" rel="noreferrer">
                {site.address.map((line) => (
                  <span key={line}>{line}</span>
                ))}
              </a>
            </dd>
          </div>
          <div className={styles.cell}>
            <dt className="label">{contact.follow}</dt>
            <dd>
              {site.instagram.map((account) => (
                <a
                  key={account.handle}
                  href={account.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {account.handle}
                </a>
              ))}
            </dd>
          </div>
          <div className={`${styles.cell} ${styles.slim} ${styles.colophon} label`}>
            <span>
              © {site.project} · {site.name}
            </span>
            <span>{footer.type}</span>
            <a href="#top">{footer.top}</a>
          </div>
        </dl>
      </div>
    </footer>
  );
}
