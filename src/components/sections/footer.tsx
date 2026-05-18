"use client";

import Image from "next/image";
import Link from "next/link";

import { Wordmark } from "@/components/wordmark";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { formatHour } from "@/lib/format-time";
import { images } from "@/lib/images";
import {
  businessHours,
  moreInfoWhatsappMessage,
  navLinks,
  site,
  whatsappUrl,
} from "@/lib/site-config";

const productLinkIds = ["services", "gallery", "testimonials", "visit"] as const;

const socialLinks = [
  { href: site.socials.facebook, image: images.facebook, label: "Facebook" },
  { href: site.socials.instagram, image: images.instagram, label: "Instagram" },
  {
    href: whatsappUrl(moreInfoWhatsappMessage),
    image: images.whatsapp,
    label: "WhatsApp",
  },
] as const;

export function Footer() {
  const { handleNavClick } = useSectionNavigation();
  const year = new Date().getFullYear();
  const productLinks = navLinks.filter((l) =>
    (productLinkIds as readonly string[]).includes(l.id),
  );

  const hoursLabel = `${formatHour(businessHours.open.hour, businessHours.open.minute)} — ${formatHour(businessHours.close.hour, businessHours.close.minute)}`;

  return (
    <footer className="border-t border-hairline bg-ink py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="grid gap-12 md:grid-cols-3">
          <div className="space-y-5">
            <Wordmark size="md" withKicker />
            <p className="max-w-xs text-sm text-fg/55">{site.description}</p>
            <div className="flex gap-3">
              {socialLinks.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full border border-hairline bg-elevated p-2.5 transition-colors hover:border-lime/40"
                >
                  <Image
                    src={s.image}
                    alt={`${s.label} ${site.name}`}
                    width={20}
                    height={20}
                    className="opacity-80"
                  />
                  <span className="sr-only">{s.label}</span>
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/55">
              Horario
            </h4>
            <p className="mt-4 text-base text-fg/80">Todos los días</p>
            <p className="font-mono text-sm text-lime">{hoursLabel}</p>
          </div>

          <div>
            <h4 className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/55">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm">
              {productLinks.map(({ id, label }) => (
                <li key={id}>
                  <Link
                    href={`#${id}`}
                    className="text-fg/75 transition-colors hover:text-lime"
                    onClick={(e) => handleNavClick(id, e)}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-14 border-t border-hairline pt-7 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-fg/45">
          © {year} {site.name}. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
}
