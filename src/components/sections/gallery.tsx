"use client";

import Image from "next/image";
import { useState } from "react";

import { GalleryLightbox } from "@/components/gallery-lightbox";
import { ScrollReveal } from "@/components/scroll-reveal";
import { galleryImages } from "@/lib/images";
import { gallery } from "@/lib/site-config";
import { cn } from "@/lib/utils";

const spanClass: Record<(typeof gallery)[number]["span"], string> = {
  wide: "md:col-span-3 md:row-span-1",
  regular: "md:col-span-2 md:row-span-1",
  tall: "md:col-span-1 md:row-span-2",
};

export function Gallery() {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <section id="gallery" className="bg-ink py-24 md:py-32">
      <ScrollReveal>
        <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            La cancha
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            En <span className="text-lime">acción</span>.
          </h2>
        </div>

        <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-6 md:grid-rows-[220px_180px]">
          {gallery.map((item, i) => (
            <button
              key={item.key}
              onClick={() => setOpenAt(i)}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-hairline bg-surface transition-transform hover:scale-[1.015]",
                spanClass[item.span],
                "aspect-square md:aspect-auto",
              )}
              aria-label={`Abrir ${item.caption}`}
            >
              <Image
                src={galleryImages[item.key]!}
                alt={item.alt}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-opacity group-hover:opacity-95"
              />
              <span className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-fg/85">
                  {item.caption}
                </span>
              </span>
            </button>
          ))}
        </div>
        </div>
      </ScrollReveal>

      <GalleryLightbox
        open={openAt !== null}
        onOpenChange={(o) => !o && setOpenAt(null)}
        startIndex={openAt ?? 0}
      />
    </section>
  );
}
