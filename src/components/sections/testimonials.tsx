"use client";

import Image from "next/image";
import { Star } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { testimonialImages } from "@/lib/images";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink py-24 md:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Opiniones
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            La cancha favorita de <span className="text-lime">Ubaté</span>.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            No solo lo decimos nosotros. Lo que dicen quienes ya jugaron aquí.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex h-full flex-col rounded-2xl border border-hairline bg-surface p-7"
            >
              <div className="flex gap-0.5" aria-label="5 estrellas">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-lime text-lime"
                    aria-hidden
                  />
                ))}
              </div>
              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-fg/85">
                &ldquo;{t.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-7 flex items-center gap-3">
                <Image
                  src={testimonialImages[t.image]!}
                  alt={`Foto de ${t.name}`}
                  width={48}
                  height={48}
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div>
                  <div className="font-bold text-fg">{t.name}</div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/55">
                    {t.role}
                  </div>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
