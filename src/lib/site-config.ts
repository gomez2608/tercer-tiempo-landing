export const site = {
  name: "Tercer Tiempo Ubaté",
  shortName: "Tercer Tiempo",
  description: "La cancha sintética todo en 1 en Ubaté.",
  url: "https://tercertiempo-ubate.example.com",
  whatsappNumber: "573112311293",
  email: "canchasintetica3ertiempo@gmail.com",
  socials: {
    facebook:
      "https://www.facebook.com/people/Cancha-sint%C3%A9tica-Tercer-Tiempo/100031018192314/",
    instagram:
      "https://www.instagram.com/tercer_tiempo_ubate?igsh=MTFoMDh6NGNwZzh3bQ==",
  },
} as const;

export const businessHours = {
  open: { hour: 15, minute: 0 },  // 3:00 PM
  close: { hour: 21, minute: 0 }, // 9:00 PM
} as const;

export const location = {
  street: "Carrera 9 #10-51",
  city: "Ubaté",
  country: "Colombia",
  mapsUrl: "https://maps.app.goo.gl/WXS2wrak5dmdEYWk6",
  /**
   * Resolved Google Maps embed URL. If empty, the Visit section falls back
   * to a styled card with a "Ver en Maps →" CTA.
   */
  mapEmbedUrl: "",
} as const;

export const hero = {
  kicker: "Tercer Tiempo · Ubaté",
  headline: { line1: "Tu cancha.", line2: "Al 100." },
  sub: "La sintética cubierta de Ubaté, abierta todos los días de 3 pm a 9 pm. Reserva en un mensaje.",
  trust: {
    enabled: true,
    rating: 4.9,
    matchesPlayed: 500,
  },
} as const;

export type GalleryItem = {
  key: string;
  alt: string;
  caption: string;
  span: "wide" | "tall" | "regular";
  /** Tailwind object-position class (e.g. "object-bottom") for the tile crop. */
  objectPosition?: string;
};

export const gallery: GalleryItem[] = [
  {
    key: "g-night-1",
    alt: "Cancha sintética iluminada por la noche",
    caption: "Nocturna",
    span: "wide",
  },
  {
    key: "g-field-1",
    alt: "Detalle del balón sobre el pasto sintético",
    caption: "El campo",
    span: "regular",
  },
  {
    key: "g-detail-1",
    alt: "Dos jugadores posando frente al arco antes del partido",
    caption: "Antes del partido",
    span: "tall",
  },
  {
    key: "g-day-1",
    alt: "Vista interior de la cancha cubierta durante el día",
    caption: "Diurna",
    span: "regular",
  },
  {
    key: "g-teams-1",
    alt: "Equipo de fútbol posando frente al arco",
    caption: "Nuestros equipos",
    span: "wide",
    objectPosition: "object-[center_60%]",
  },
];

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const mailtoUrl = `mailto:${site.email}`;

export const navLinks = [
  { id: "about", label: "Inicio" },
  { id: "services", label: "Servicios" },
  { id: "gallery", label: "Galería" },
  { id: "testimonials", label: "Opiniones" },
  { id: "visit", label: "Visítanos" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

export const plans = [
  {
    kind: "frequent",
    title: "Cliente frecuente",
    description: "Si has jugado 10 o más veces con nosotros.",
    headline: "1 hora",
    headlineSuffix: "gratis",
    bullets: [
      "Una hora gratis por cada 10 partidos.",
      "Disponible con nuestra tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Inscríbete",
      whatsappMessage: "Hola, quiero ser un cliente frecuente.",
    },
    highlighted: false,
  },
  {
    kind: "reserve",
    title: "Reserva",
    description: "Una hora para tu fútbol sin compromisos.",
    headline: "$50.000",
    headlineSuffix: "/ hora",
    bullets: [
      "Disponibilidad exclusiva durante tu hora.",
      "Suma puntos para tu tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Reservar ya",
      whatsappMessage: "Hola, quiero reservar una cancha.",
    },
    highlighted: true,
  },
  {
    kind: "event",
    title: "Celebra con nosotros",
    description: "Cumpleaños, integraciones, eventos especiales.",
    headline: null,
    headlineSuffix: null,
    bullets: ["Cumpleaños", "Eventos especiales", "Asados e integraciones", "Atención dedicada"],
    cta: {
      label: "Cotizar evento",
      whatsappMessage: "Hola, quiero cotizar un evento.",
    },
    highlighted: false,
  },
] as const;

export const testimonials = [
  {
    name: "Andres L.",
    role: "Futbolista amateur",
    quote:
      "Jugar en esta cancha es una experiencia increíble. El pasto sintético tiene un gran agarre.",
    image: "andres",
  },
  {
    name: "Santiago P.",
    role: "Futbolista amateur",
    quote:
      "Esta cancha está a otro nivel. La iluminación es ideal para los partidos nocturnos. ¡100% recomendada!",
    image: "santiago",
  },
  {
    name: "Luis M.",
    role: "Padre de futbolista juvenil",
    quote:
      "Mi hijo juega aquí cada semana y estoy tranquilo porque la cancha es segura y bien mantenida.",
    image: "luis",
  },
] as const;

export const reserveWhatsappMessage = "Hola, quiero reservar una cancha.";
export const moreInfoWhatsappMessage = "Hola, quiero más información.";
export const tonightWhatsappMessage = "Hola, ¿hay cupo para esta noche?";
