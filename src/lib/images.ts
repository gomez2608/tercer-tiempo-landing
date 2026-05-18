import type { StaticImageData } from "next/image";

import logo from "@/app/imgs/logo.svg";
import fondo from "@/app/imgs/fondo.jpg";
import balon from "@/app/imgs/balon.jpg";
import facebook from "@/app/imgs/facebook.png";
import instagram from "@/app/imgs/instagram.jpg";
import whatsapp from "@/app/imgs/whatsapp.png";
import andres from "@/app/imgs/testimonial-andres.png";
import santiago from "@/app/imgs/testimonial-santiago.jpg";
import luis from "@/app/imgs/testimonial-luis.jpg";

export const images = {
  logo,
  fondo,
  balon,
  facebook,
  instagram,
  whatsapp,
} as const;

export const testimonialImages: Record<string, StaticImageData> = {
  andres,
  santiago,
  luis,
};

// TODO(gallery): three of these keys (g-detail-1, g-day-1, g-teams-1) currently
// reuse the testimonial portrait photos as placeholders. Replace with real or
// curated pitch photos under src/app/imgs/gallery/ and update the imports below.
export const galleryImages: Record<string, StaticImageData> = {
  "g-night-1": fondo,
  "g-field-1": balon,
  "g-detail-1": andres,
  "g-day-1": santiago,
  "g-teams-1": luis,
};
