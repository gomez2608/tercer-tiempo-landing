import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { images } from "@/lib/images";
import { reserveWhatsappMessage, whatsappUrl } from "@/lib/site-config";

export function Hero() {
  return (
    <section
      id="about"
      className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48"
    >
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat blur-[2px]"
        style={{ backgroundImage: `url(${images.fondo.src})` }}
        aria-hidden
      />
      <div className="absolute inset-0 bg-black/30" aria-hidden />

      <div className="relative mx-5 grid gap-6 px-5 lg:gap-12">
        <div className="flex flex-col justify-center space-y-4">
          <div className="space-y-2 rounded-lg bg-white/80 p-6 backdrop-blur-sm">
            <h1 className="py-2 text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
              Tercer tiempo
            </h1>
            <p className="text-center text-muted-foreground md:text-xl">
              La cancha sintética todo en 1 en Ubaté. Ven y disfruta de un
              espacio único para compartir con tus amigos y familiares.
            </p>
          </div>

          <div className="flex flex-col items-center justify-center gap-2 min-[400px]:flex-row">
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
            <Link href="#contact">
              <Button variant="outline" size="lg" className="bg-white/90">
                Contáctanos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
