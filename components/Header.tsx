"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { locales, type Dictionary, type Locale } from "@/lib/i18n";
import { sections, site, type SectionId } from "@/lib/site";
import styles from "./Header.module.css";

type Props = {
  lang: Locale;
  nav: Dictionary["nav"];
  bookHref: string;
};

export default function Header({ lang, nav, bookHref }: Props) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<SectionId | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open]);

  // The section under the middle of the screen is the current one.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const id = entry.target.id;
          setActive(id === "top" ? null : (id as SectionId));
        }
      },
      { rootMargin: "-49% -49% -49% -49%" },
    );

    for (const id of ["top", ...sections]) {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <header className={styles.bar}>
        <a className={styles.wordmark} href="#top">
          {site.name}
        </a>
        <nav className={styles.langs} aria-label={nav.language}>
          {locales.map((locale) => (
            <Link
              key={locale}
              href={`/${locale}`}
              hrefLang={locale}
              aria-current={locale === lang ? "page" : undefined}
            >
              {locale}
            </Link>
          ))}
        </nav>
        <button
          className={styles.toggle}
          type="button"
          aria-expanded={open}
          aria-controls="site-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? nav.close : nav.open}
        </button>
      </header>

      <nav
        id="site-menu"
        className={styles.menu}
        data-open={open}
        inert={!open}
        aria-label={nav.open}
      >
        <ol>
          {sections.map((id, index) => (
            <li key={id} style={{ transitionDelay: `${index * 50}ms` }}>
              <a href={`#${id}`} onClick={() => setOpen(false)}>
                {nav[id]}
              </a>
            </li>
          ))}
        </ol>
      </nav>

      <a className={styles.book} href={bookHref}>
        {nav.book}
      </a>

      <nav className={styles.dock} aria-label={nav.sections}>
        {sections.map((id) => (
          <a
            key={id}
            href={`#${id}`}
            aria-current={active === id ? "true" : undefined}
          >
            {nav[id]}
          </a>
        ))}
        <a className={styles.dockBook} href={bookHref}>
          {nav.book} →
        </a>
      </nav>
    </>
  );
}
