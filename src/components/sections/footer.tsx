"use client";

import Image from "next/image";
import Link from "next/link";

import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { images } from "@/lib/images";
import {
  moreInfoWhatsappMessage,
  navLinks,
  site,
  whatsappUrl,
} from "@/lib/site-config";

const productLinkIds = ["services", "gallery", "testimonials", "visit"] as const;

const socialLinks = [
  {
    href: site.socials.facebook,
    image: images.facebook,
    label: "Facebook",
  },
  {
    href: site.socials.instagram,
    image: images.instagram,
    label: "Instagram",
  },
  {
    href: whatsappUrl(moreInfoWhatsappMessage),
    image: images.whatsapp,
    label: "WhatsApp",
  },
] as const;

export function Footer() {
  const { handleNavClick } = useSectionNavigation();
  const year = new Date().getFullYear();
  const productLinks = navLinks.filter((link) =>
    (productLinkIds as readonly string[]).includes(link.id),
  );

  return (
    <footer className="w-full border-t bg-background py-6 md:py-12">
      <div className="mx-8 grid justify-center gap-8 px-8 lg:grid-cols-2">
        <div className="items-center justify-center space-y-4">
          <div className="flex items-center gap-2">
            <Image
              src={images.logo}
              alt={`Logo de ${site.name}`}
              width={32}
              height={32}
              className="rounded"
            />
            <span className="text-xl font-bold">{site.name}</span>
          </div>
          <p className="text-sm text-muted-foreground">{site.description}</p>
          <div className="flex gap-4">
            {socialLinks.map((social) => (
              <Link
                key={social.label}
                href={social.href}
                className="text-muted-foreground hover:text-foreground"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src={social.image}
                  alt={`${social.label} ${site.name}`}
                  width={32}
                  height={32}
                  className="rounded"
                />
                <span className="sr-only">{social.label}</span>
              </Link>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <h4 className="text-sm font-medium">Producto</h4>
          <ul className="space-y-2 text-sm">
            {productLinks.map(({ id, label }) => (
              <li key={id}>
                <Link
                  href={`#${id}`}
                  className="text-muted-foreground hover:text-foreground"
                  onClick={(e) => handleNavClick(id, e)}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
        <p>© {year} {site.name}. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
