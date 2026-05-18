"use client";

import Image from "next/image";
import Link from "next/link";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useSectionNavigation } from "@/hooks/use-section-navigation";
import { images } from "@/lib/images";
import { navLinks, site, type NavId } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Header() {
  const { activeSection, handleNavClick } = useSectionNavigation();

  const linkClass = (id: NavId) =>
    cn(
      "text-sm font-medium px-3 py-2 rounded-md",
      activeSection === id
        ? "bg-primary text-primary-foreground"
        : "hover:text-primary",
    );

  const renderLinks = () =>
    navLinks.map(({ id, label }) => (
      <Link
        key={id}
        href={`#${id}`}
        className={linkClass(id)}
        onClick={(e) => handleNavClick(id, e)}
      >
        {label}
      </Link>
    ));

  return (
    <header className="sticky top-0 z-50 flex w-auto items-center justify-between border-b bg-background/95 px-4 py-2 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="my-2 flex items-center gap-2 px-4 py-2">
        <Image
          src={images.logo}
          alt={`Logo de ${site.name}`}
          width={70}
          height={70}
          className="rounded"
          priority
        />
        <span className="text-xl font-bold">{site.name}</span>
      </div>

      <nav className="hidden gap-6 md:flex">{renderLinks()}</nav>

      <div className="flex items-center gap-4 md:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Abrir menú</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <nav className="mt-8 flex flex-col gap-4">{renderLinks()}</nav>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
