export const site = {
  name: "Tercer tiempo Ubaté",
  shortName: "Tercer tiempo",
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

export function whatsappUrl(text: string): string {
  return `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(text)}`;
}

export const mailtoUrl = `mailto:${site.email}`;

export const navLinks = [
  { id: "about", label: "¿Quiénes somos?" },
  { id: "services", label: "Nuestros servicios" },
  { id: "features", label: "Características" },
  { id: "testimonials", label: "Opiniones" },
  { id: "contact", label: "Contáctanos" },
] as const;

export type NavId = (typeof navLinks)[number]["id"];

export const plans = [
  {
    kind: "frequent",
    title: "Cliente frecuente",
    description: "Si has jugado 10 o más veces con nosotros.",
    headline: "1 hora",
    headlineSuffix: null,
    bullets: [
      "Gratis por cada 10 partidos.",
      "Disponible con nuestra tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Contáctanos",
      whatsappMessage: "Hola, quiero ser un cliente frecuente.",
    },
    highlighted: false,
  },
  {
    kind: "reserve",
    title: "Reserva",
    description: "1 hora para disfrutar tu futbol al máximo.",
    headline: "$50.000",
    headlineSuffix: "/hora",
    bullets: [
      "Disponibilidad exclusiva.",
      "Adquiere nuestra tarjeta cliente frecuente.",
    ],
    cta: {
      label: "Reserva ya",
      whatsappMessage: "Hola, quiero reservar una cancha.",
    },
    highlighted: true,
  },
  {
    kind: "event",
    title: "Celebra con nosotros",
    description: "Para celebraciones o eventos especiales.",
    headline: null,
    headlineSuffix: null,
    bullets: ["Cumpleaños", "Eventos especiales", "Asados", "Integraciones"],
    cta: {
      label: "Cotiza ya",
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
