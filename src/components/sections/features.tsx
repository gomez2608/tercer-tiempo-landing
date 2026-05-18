import Image from "next/image";
import { Clock, CloudRainWind, Users, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { images } from "@/lib/images";

type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

const features: Feature[] = [
  {
    icon: CloudRainWind,
    title: "Protección contra la lluvia",
    description:
      "¿Tiempo difícil? ¿Lluvia incesante? Contamos con una cancha cubierta para que puedas jugar incluso en las peores condiciones.",
  },
  {
    icon: Clock,
    title: "El tiempo justo",
    description:
      "Nuestro sistema de cronometrado ofrece exactitud y justicia en todos los partidos. Hasta el último segundo cuenta.",
  },
  {
    icon: Users,
    title: "La mejor atención",
    description:
      "Nuestro personal está siempre dispuesto a atenderte. Incluso si necesitas bebidas durante el partido.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full bg-muted/50">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <Badge variant="default" className="px-3 py-1">
            ¿Qué ofrecemos?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Lleva tus partidos al 100%
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            Nuestra cancha ofrece las mejores condiciones para desbloquear tu
            juego al máximo.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 lg:grid-cols-2 lg:gap-10">
        <div className="grid gap-6">
          {features.map(({ icon: Icon, title, description }) => (
            <Card key={title}>
              <CardHeader className="p-4">
                <div className="flex items-center gap-2">
                  <Icon className="h-5 w-5 text-primary" />
                  <CardTitle className="text-xl">{title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center">
          <Image
            src={images.balon}
            alt="Balón sobre el pasto sintético de la cancha"
            className="rounded-lg object-cover"
          />
        </div>
      </div>
    </section>
  );
}
