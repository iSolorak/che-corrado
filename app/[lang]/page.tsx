import { notFound } from "next/navigation";
import Chef from "@/components/Chef";
import Club from "@/components/Club";
import Contact from "@/components/Contact";
import CuinaPetita from "@/components/CuinaPetita";
import Hero from "@/components/Hero";
import InstagramStrip from "@/components/InstagramStrip";
import Marquee from "@/components/Marquee";
import MenuCard from "@/components/MenuCard";
import Reveal from "@/components/Reveal";
import Services from "@/components/Services";
import Track from "@/components/Track";
import { getDictionary, hasLocale } from "@/lib/i18n";

export default async function Page({ params }: PageProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang);

  return (
    <Track>
      <Hero hero={dict.hero} nav={dict.nav} />
      <Marquee items={dict.marquee} />
      <Chef chef={dict.chef} />
      <CuinaPetita cuina={dict.cuina} />
      <Services services={dict.services} />
      <MenuCard menu={dict.menu} />
      <Club club={dict.club} />
      <InstagramStrip instagram={dict.instagram} />
      <Contact contact={dict.contact} footer={dict.footer} />
      <Reveal />
    </Track>
  );
}
