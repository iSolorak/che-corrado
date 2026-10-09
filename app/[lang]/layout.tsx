import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Truck from "@/components/Truck";
import { getDictionary, hasLocale, locales } from "@/lib/i18n";
import { mailto, site } from "@/lib/site";
import "../globals.css";

const libron = localFont({
  src: [
    { path: "../fonts/Libron-Regular.woff2", weight: "400", style: "normal" },
    { path: "../fonts/Libron-Italic.woff2", weight: "400", style: "italic" },
    { path: "../fonts/Libron-Bold.woff2", weight: "700", style: "normal" },
    { path: "../fonts/Libron-BoldItalic.woff2", weight: "700", style: "italic" },
  ],
  variable: "--font-libron",
  display: "swap",
});

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang);

  return {
    metadataBase: new URL(site.url),
    title: dict.meta.title,
    description: dict.meta.description,
    alternates: {
      canonical: `/${lang}`,
      languages: Object.fromEntries(locales.map((l) => [l, `/${l}`])),
    },
    openGraph: {
      title: dict.meta.title,
      description: dict.meta.description,
      locale: lang,
      type: "website",
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <html lang={lang} className={libron.variable}>
      <body>
        <a className="skip" href="#main">
          {dict.nav.skip}
        </a>
        <Header
          lang={lang}
          nav={dict.nav}
          bookHref={mailto(dict.contact.subject)}
        />
        {children}
        <Truck />
      </body>
    </html>
  );
}
