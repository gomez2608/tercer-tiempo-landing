import Link from "next/link";
import { CheckCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
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

export function Pricing() {
  return (
    <section
      id="services"
      className="w-full bg-muted/50 py-8 md:py-20 lg:py-26"
    >
      <div className="flex flex-col items-center justify-center space-y-4 text-center">
        <div className="space-y-2">
          <Badge variant="default" className="px-3 py-1">
            Nuestros servicios
          </Badge>
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
            Precios justos, económicos y simples.
          </h2>
          <p className="max-w-[900px] text-muted-foreground md:text-xl">
            ¿Alguna duda? Contáctanos y te ayudaremos a encontrar el plan
            perfecto para ti.
          </p>
        </div>
      </div>

      <div className="mx-auto grid max-w-5xl gap-6 py-12 lg:grid-cols-3">
        {plans.map((plan) => (
          <Card
            key={plan.kind}
            className={plan.highlighted ? "relative h-full" : "h-full"}
          >
            {plan.highlighted && (
              <div className="absolute -top-4 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                Más popular
              </div>
            )}
            <CardHeader>
              <CardTitle>{plan.title}</CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>
            <CardContent>
              {plan.headline && (
                <div className="mb-4 flex items-baseline">
                  <span className="text-4xl font-bold">{plan.headline}</span>
                  {plan.headlineSuffix && (
                    <span className="ml-1 text-muted-foreground">
                      {plan.headlineSuffix}
                    </span>
                  )}
                </div>
              )}
              <ul className="space-y-3">
                {plan.bullets.map((bullet) => (
                  <li key={bullet} className="flex items-center">
                    <CheckCircle className="mr-2 h-4 w-4 text-primary" />
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
            <CardFooter>
              <Link
                href={whatsappUrl(plan.cta.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full"
              >
                <Button className="w-full">{plan.cta.label}</Button>
              </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
}
