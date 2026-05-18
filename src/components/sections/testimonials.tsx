import Image from "next/image";
import { Star } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { testimonialImages } from "@/lib/images";
import { testimonials } from "@/lib/site-config";

export function Testimonials() {
  return (
    <section id="testimonials" className="w-full bg-muted/50">
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <Badge variant="default" className="px-3 py-1">
            ¿Qué opinan nuestros clientes?
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            La cancha favorita de todos
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            No solo lo decimos nosotros, nuestros clientes hablan por sí solos.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
        {testimonials.map((t) => (
          <Card key={t.name} className="h-full">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className="h-5 w-5 fill-primary text-primary"
                    />
                  ))}
                </div>
                <p className="text-muted-foreground">&ldquo;{t.quote}&rdquo;</p>
              </div>
              <div className="mt-6 flex items-center space-x-3">
                <Image
                  src={testimonialImages[t.image]}
                  alt={`Foto de ${t.name}`}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-medium">{t.name}</p>
                  <p className="text-sm text-muted-foreground">{t.role}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
