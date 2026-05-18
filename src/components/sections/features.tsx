"use client";

import {
  Clock,
  CloudRainWind,
  Lightbulb,
  Users,
  type LucideIcon,
} from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: CloudRainWind,
    title: "Cubierta contra la lluvia",
    description:
      "¿Tiempo difícil? Nuestra cancha cubierta deja que juegues incluso en las peores condiciones.",
  },
  {
    icon: Lightbulb,
    title: "Iluminación profesional",
    description:
      "LEDs de alta potencia para que tus partidos de noche se vean tan bien como los de día.",
  },
  {
    icon: Clock,
    title: "Tiempo cronometrado",
    description:
      "Sistema de cronometrado preciso. Hasta el último segundo cuenta — sin discusiones.",
  },
  {
    icon: Users,
    title: "Atención dedicada",
    description:
      "Nuestro personal te recibe, te atiende durante el partido, y te despide.",
  },
];

export function Features() {
  return (
    <section id="features" className="bg-ink py-24 md:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Por qué Tercer tiempo
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            Lleva tus partidos al <span className="text-lime">100%</span>.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            Cuatro razones por las que la gente vuelve cada semana.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {features.map(({ icon: Icon, title, description }) => (
            <div
              key={title}
              className="group rounded-2xl border border-hairline bg-surface p-7 transition-colors hover:border-lime/30"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-lime/12 text-lime">
                <Icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 text-xl font-bold leading-tight tracking-[-0.015em]">
                {title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-fg/70">
                {description}
              </p>
            </div>
          ))}
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
