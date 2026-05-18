"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { ScrollReveal } from "@/components/scroll-reveal";
import { Button } from "@/components/ui/button";
import {
  mailtoUrl,
  site,
  tonightWhatsappMessage,
  whatsappUrl,
} from "@/lib/site-config";

export function CallToAction() {
  return (
    <section id="contact" className="relative isolate overflow-hidden bg-ink py-28 md:py-40">
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(198,255,91,0.12), transparent 60%)",
        }}
      />
      <ScrollReveal>
        <div className="mx-auto max-w-2xl px-6 text-center">
        <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
          Cierre
        </span>
        <h2 className="mt-5 text-4xl font-extrabold leading-[0.95] tracking-[-0.025em] md:text-6xl">
          El cupo de esta noche se{" "}
          <span className="text-lime">llena rápido</span>.
        </h2>
        <p className="mt-5 text-base text-fg/70 md:text-lg">
          Reserva en un mensaje y deja el resto a nosotros.
        </p>
        <div className="mt-9 flex flex-col items-center gap-3">
          <Link
            href={whatsappUrl(tonightWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-full px-8 font-bold">
              Reservar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={mailtoUrl}
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg/55 hover:text-fg"
          >
            o escríbenos a {site.email}
          </Link>
        </div>
        </div>
      </ScrollReveal>
    </section>
  );
}
