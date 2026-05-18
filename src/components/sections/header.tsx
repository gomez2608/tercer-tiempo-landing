"use client";

import Link from "next/link";
import { Menu } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Wordmark } from "@/components/wordmark";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import {
  navLinks,
  reserveWhatsappMessage,
  whatsappUrl,
  type NavId,
} from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const { activeSection, handleNavClick } = useSectionNavigation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const linkClass = (id: NavId) =>
    cn(
      "font-mono text-[11px] uppercase tracking-[0.22em] transition-colors",
      activeSection === id ? "text-lime" : "text-fg/70 hover:text-fg",
    );

  return (
    <header
      className={cn(
        "sticky top-0 z-50 flex items-center justify-between px-6 py-4 transition-colors md:px-10",
        scrolled
          ? "border-b border-hairline bg-ink/80 backdrop-blur"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Link href="#about" onClick={(e) => handleNavClick("about", e)}>
        <Wordmark size="md" withKicker className="hidden md:inline-flex" />
        <Wordmark size="md" className="md:hidden" />
      </Link>

      <nav className="hidden gap-7 md:flex">
        {navLinks
          .filter((l) => l.id !== "about")
          .map(({ id, label }) => (
            <Link
              key={id}
              href={`#${id}`}
              className={linkClass(id)}
              onClick={(e) => handleNavClick(id, e)}
            >
              {label}
            </Link>
          ))}
      </nav>

      <div className="flex items-center gap-3">
        <Link
          href={whatsappUrl(reserveWhatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="hidden md:inline-flex"
        >
          <Button size="sm" className="rounded-full px-5 font-bold">
            Reservar →
          </Button>
        </Link>

        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-ink">
            <nav className="mt-8 flex flex-col gap-5">
              {navLinks.map(({ id, label }) => (
                <Link
                  key={id}
                  href={`#${id}`}
                  className="font-mono text-sm uppercase tracking-[0.22em] text-fg/80 hover:text-lime"
                  onClick={(e) => handleNavClick(id, e)}
                >
                  {label}
                </Link>
              ))}
              <Link
                href={whatsappUrl(reserveWhatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4"
              >
                <Button className="w-full rounded-full font-bold">Reservar →</Button>
              </Link>
            </nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
