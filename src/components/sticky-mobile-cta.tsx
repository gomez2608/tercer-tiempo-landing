"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { reserveWhatsappMessage, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("about");
    if (!hero) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry?.isIntersecting),
      { rootMargin: "0px 0px -80% 0px" },
    );
    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-3 bottom-3 z-40 transition-transform duration-300 md:hidden",
        visible ? "translate-y-0" : "translate-y-[120%]",
      )}
    >
      <Link
        href={whatsappUrl(reserveWhatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        className="block"
      >
        <Button className="w-full rounded-2xl py-6 font-bold shadow-[0_-10px_30px_rgba(0,0,0,0.4)]">
          Reservar por WhatsApp
          <ArrowRight className="h-4 w-4" />
        </Button>
      </Link>
    </div>
  );
}
