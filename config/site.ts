export const site = {
  name: 'Chargeur-Rapide',
  description:
    "Média français sur la charge, l'énergie mobile et la mobilité durable : guides, comparatifs et analyses techniques.",
  url: 'https://www.chargeur-rapide.fr',
  socials: {
    twitter: '@chargeurrapide'
  },
  nav: [
    { label: 'Chargeurs', href: '/chargeurs' },
    { label: 'Batteries', href: '/batteries' },
    { label: 'Mobilité', href: '/mobilite' },
    { label: 'Énergie', href: '/energie' },
    { label: 'Guides', href: '/guides' },
    { label: 'À propos', href: '/a-propos' },
    { label: 'Contact', href: '/contact' }
  ]
} as const;

export type CategoryKey = 'chargeurs' | 'batteries' | 'mobilite' | 'energie' | 'guides';

export const categories: Record<CategoryKey, { label: string; description: string; cover: string }> = {
  chargeurs: {
    label: 'Chargeurs',
    description: 'Charge rapide, USB-C, PD/PPS, câbles et connectique.',
    cover: '/images/covers/chargeurs.jpg'
  },
  batteries: {
    label: 'Batteries',
    description: 'Batteries externes, stations portables, solaire pliable.',
    cover: '/images/covers/batteries.jpg'
  },
  mobilite: {
    label: 'Mobilité',
    description: 'Trottinettes, vélos électriques, bornes et infrastructures.',
    cover: '/images/covers/mobilite.jpg'
  },
  energie: {
    label: 'Énergie',
    description: "Innovation, GaN, solaire, efficacité énergétique.",
    cover: '/images/covers/energie.jpg'
  },
  guides: {
    label: 'Guides',
    description: 'Guides transverses et pratiques.',
    cover: '/images/covers/guides.jpg'
  }
};

export type CatKey = keyof typeof categories;


