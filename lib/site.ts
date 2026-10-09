export const site = {
  url: "https://checorrado.com",
  name: "Che Corrado",
  project: "Cuina Petita",
  phone: "+41 78 749 19 68",
  phoneHref: "tel:+41787491968",
  // TODO: confirm with Che. The public listing prints this address without the dot.
  email: "fuegocorrado@gmail.com",
  address: ["Industriestrasse 9", "8305 Dietlikon", "Zürich"],
  mapHref: "https://www.google.com/maps/search/?api=1&query=Industriestrasse+9+8305+Dietlikon",
  instagram: [
    { handle: "@che.corrado", href: "https://www.instagram.com/che.corrado/" },
    {
      handle: "@cuina.petita.kleine.kueche",
      href: "https://www.instagram.com/cuina.petita.kleine.kueche/",
    },
  ],
} as const;

export const sections = [
  "chef",
  "cuina",
  "services",
  "menu",
  "club",
  "contact",
] as const;

// Wide, tall-enough screens get the sideways layout; everything else stacks.
export const horizontalQuery = "(min-width: 861px) and (min-height: 640px)";

export type SectionId = (typeof sections)[number];

export const mailto = (subject: string) =>
  `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
