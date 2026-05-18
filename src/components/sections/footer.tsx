"use client";

import Link from "next/link";
import { Facebook, Instagram, type LucideIcon } from "lucide-react";
import type { ComponentType, SVGProps } from "react";

import { WhatsAppIcon } from "@/components/icons/whatsapp-icon";
import { Wordmark } from "@/components/wordmark";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { formatHour } from "@/lib/format-time";
import {
  businessHours,
  moreInfoWhatsappMessage,
  navLinks,
  site,
  whatsappUrl,
} from "@/lib/site-config";

const productLinkIds = ["services", "gallery", "testimonials", "visit"] as const;

type SocialIcon = LucideIcon | ComponentType<SVGProps<SVGSVGElement>>;

const socialLinks: ReadonlyArray<{
  href: string;
  Icon: SocialIcon;
  label: string;
}> = [
  { href: site.socials.facebook, Icon: Facebook, label: "Facebook" },
  { href: site.socials.instagram, Icon: Instagram, label: "Instagram" },
  {
    href: whatsappUrl(moreInfoWhatsappMessage),
    Icon: WhatsAppIcon,
    label: "WhatsApp",
  },
];

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
              {socialLinks.map(({ href, Icon, label }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${label} de ${site.name}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-hairline bg-elevated text-fg/70 transition-colors hover:border-lime/40 hover:text-lime"
                >
                  <Icon className="h-4 w-4" />
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
