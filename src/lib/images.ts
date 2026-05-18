import type { StaticImageData } from "next/image";

import logo from "@/app/imgs/logo.svg";
import fondo from "@/app/imgs/fondo.jpg";
import balon from "@/app/imgs/balon.jpg";
import andres from "@/app/imgs/testimonial-andres.png";
import santiago from "@/app/imgs/testimonial-santiago.jpg";
import luis from "@/app/imgs/testimonial-luis.jpg";
import noche from "@/app/imgs/noche.jpg";
import dia from "@/app/imgs/dia.jpg";
import equipos from "@/app/imgs/equipos.jpg";
import equipos2 from "@/app/imgs/equipos2.jpg";

export const images = {
  logo,
  fondo,
  balon,
} as const;

export const testimonialImages: Record<string, StaticImageData> = {
  andres,
  santiago,
  luis,
};

export const galleryImages: Record<string, StaticImageData> = {
  "g-night-1": noche,
  "g-field-1": balon,
  "g-detail-1": equipos2,
  "g-day-1": dia,
  "g-teams-1": equipos,
};
