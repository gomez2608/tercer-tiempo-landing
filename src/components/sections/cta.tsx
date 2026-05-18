import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  mailtoUrl,
  reserveWhatsappMessage,
  whatsappUrl,
} from "@/lib/site-config";

export function CallToAction() {
  return (
    <section
      id="contact"
      className="w-full bg-muted/50 py-12 md:py-24 lg:py-32"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            ¿Listo para llevar tus partidos al siguiente nivel?
          </h2>
          <p className="max-w-[600px] text-muted-foreground md:text-xl">
            Únete a nuestra comunidad y disfruta de los beneficios de jugar en
            la mejor cancha de Ubaté.
          </p>
        </div>
        <div className="flex flex-col gap-2 min-[400px]:flex-row">
          <Link
            href={whatsappUrl(reserveWhatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button size="lg" className="gap-1">
              Reserva ya
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link href={mailtoUrl}>
            <Button variant="outline" size="lg">
              Contáctanos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
