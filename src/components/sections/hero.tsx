import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OpenNowBadge } from "@/components/open-now-badge";
import { Button } from "@/components/ui/button";
import {
  hero,
  location,
  reserveWhatsappMessage,
  whatsappUrl,
} from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="about"
      className="relative isolate overflow-hidden bg-ink"
      aria-label="Bienvenido a Tercer tiempo"
    >
      {/* Gradient + grid background */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 70% 30%, rgba(198,255,91,0.18), transparent 55%), radial-gradient(ellipse 70% 70% at 20% 80%, rgba(143,201,46,0.12), transparent 60%), linear-gradient(180deg, #0a0f0d 0%, #11181a 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-0 -z-10"
        style={{
          backgroundImage:
            "linear-gradient(rgba(198,255,91,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(198,255,91,0.04) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage:
            "radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 60% 40%, black 30%, transparent 80%)",
        }}
      />

      <div className="mx-auto flex min-h-[88vh] max-w-[1200px] flex-col justify-center px-6 pb-32 pt-20 md:px-10 md:pb-40 md:pt-32">
        <OpenNowBadge />

        <h1 className="mt-8 font-black leading-[0.88] tracking-[-0.045em]">
          <span className="block text-[clamp(56px,9vw,128px)]">
            {hero.headline.line1}
          </span>
          <span className="block text-[clamp(56px,9vw,128px)] text-lime">
            {hero.headline.line2}
          </span>
        </h1>

        <p className="mt-7 max-w-xl text-base leading-relaxed text-fg/80 md:text-lg">
          {hero.sub}
        </p>

        <div className="mt-9 flex flex-wrap items-center gap-3">
          <Link
            href={whatsappUrl(reserveWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="rounded-full px-7 font-bold">
              Reservar por WhatsApp
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link
            href={location.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="outline"
              size="lg"
              className="rounded-full border-fg/25 bg-transparent px-7 font-semibold text-fg hover:bg-fg/5 hover:text-fg"
            >
              Cómo llegar
            </Button>
          </Link>
        </div>

        {hero.trust.enabled && (
          <div className="mt-16 flex flex-wrap items-center gap-x-6 gap-y-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg/55">
            <span>
              <span className="text-lime">★★★★★</span> {hero.trust.rating} / 5
            </span>
            <span className="h-3 w-px bg-hairline" aria-hidden />
            <span>+{hero.trust.matchesPlayed} partidos jugados</span>
            <span className="h-3 w-px bg-hairline" aria-hidden />
            <span>{location.street}</span>
          </div>
        )}
      </div>
    </section>
  );
}
