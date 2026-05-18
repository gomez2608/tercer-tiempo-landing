"use client";

import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@radix-ui/react-dialog";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { galleryImages } from "@/lib/images";
import { gallery } from "@/lib/site-config";

export function GalleryLightbox({
  open,
  onOpenChange,
  startIndex,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  startIndex: number;
}) {
  const [index, setIndex] = useState(startIndex);
  const [prevOpen, setPrevOpen] = useState(open);

  // Reset index to startIndex whenever the lightbox transitions to open.
  // Using the prev-prop pattern instead of an effect avoids a cascading render.
  if (prevOpen !== open) {
    setPrevOpen(open);
    if (open) setIndex(startIndex);
  }

  const item = gallery[index];

  const next = useCallback(
    () => setIndex((i) => (i + 1) % gallery.length),
    [],
  );
  const prev = useCallback(
    () => setIndex((i) => (i - 1 + gallery.length) % gallery.length),
    [],
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, next, prev]);

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 z-50 flex items-center justify-center bg-ink/95 p-4 backdrop-blur">
        <DialogTitle className="sr-only">{item.alt}</DialogTitle>

        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-5 top-5 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Cerrar"
        >
          <X className="h-4 w-4" />
        </button>

        <button
          onClick={prev}
          className="absolute left-5 top-1/2 -translate-y-1/2 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Anterior"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <button
          onClick={next}
          className="absolute right-5 top-1/2 -translate-y-1/2 rounded-full border border-hairline bg-elevated p-2.5 text-fg/80 hover:text-fg"
          aria-label="Siguiente"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="relative h-[80vh] w-full max-w-5xl">
          <Image
            src={galleryImages[item.key]!}
            alt={item.alt}
            fill
            sizes="(min-width: 1024px) 1024px, 100vw"
            className="rounded-2xl object-contain"
          />
        </div>

        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 font-mono text-[10px] uppercase tracking-[0.22em] text-fg/55">
          {index + 1} / {gallery.length} · {item.caption}
        </div>
      </DialogContent>
    </Dialog>
  );
}
