import Link from "next/link";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { plans, whatsappUrl } from "@/lib/site-config";
import { cn } from "@/lib/utils";

export function Pricing() {
  return (
    <section id="services" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="max-w-2xl">
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
            Servicios
          </span>
          <h2 className="mt-4 text-4xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-6xl">
            3 maneras de jugar.
          </h2>
          <p className="mt-5 max-w-lg text-base text-fg/70 md:text-lg">
            Precios justos, sin sorpresas. Reserva una hora, suma puntos cada
            partido, o monta tu evento.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {plans.map((plan) => (
            <Card
              key={plan.kind}
              className={cn(
                "relative flex h-full flex-col border-hairline bg-surface text-fg",
                plan.highlighted &&
                  "border-lime/40 ring-1 ring-lime/40 md:-translate-y-3",
              )}
            >
              {plan.highlighted && (
                <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-ink">
                  Más popular
                </span>
              )}
              <CardHeader className="pt-7">
                <CardTitle className="text-2xl font-bold">
                  {plan.title}
                </CardTitle>
                <CardDescription className="text-fg/60">
                  {plan.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1">
                {plan.headline && (
                  <div className="mb-6 flex items-baseline gap-1.5">
                    <span className="text-5xl font-black tracking-[-0.03em] text-lime">
                      {plan.headline}
                    </span>
                    {plan.headlineSuffix && (
                      <span className="text-sm text-fg/55">
                        {plan.headlineSuffix}
                      </span>
                    )}
                  </div>
                )}
                <ul className="space-y-3">
                  {plan.bullets.map((bullet) => (
                    <li
                      key={bullet}
                      className="flex items-start gap-2.5 text-sm text-fg/85"
                    >
                      <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-lime" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter className="pt-2">
                <Link
                  href={whatsappUrl(plan.cta.whatsappMessage)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full"
                >
                  <Button
                    variant={plan.highlighted ? "default" : "outline"}
                    className={cn(
                      "w-full rounded-full font-bold",
                      !plan.highlighted &&
                        "border-fg/25 bg-transparent text-fg hover:bg-fg/5 hover:text-fg",
                    )}
                  >
                    {plan.cta.label}
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
