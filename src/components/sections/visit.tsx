import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { OpenNowBadge } from "@/components/open-now-badge";
import { Button } from "@/components/ui/button";
import { businessHours, location } from "@/lib/site-config";

const DAY_GROUPS = [
  { label: "Lun – Vie", ids: [1, 2, 3, 4, 5] },
  { label: "Sáb", ids: [6] },
  { label: "Dom", ids: [0] },
] as const;

function formatHour(h: number) {
  const period = h >= 12 ? "PM" : "AM";
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  return `${hour12}:00 ${period}`;
}

export function Visit() {
  const todayDow = new Date().getDay();
  const hoursLabel = `${formatHour(businessHours.open.hour)} — ${formatHour(businessHours.close.hour)}`;
  const hasMapEmbed = location.mapEmbedUrl.length > 0;

  return (
    <section id="visit" className="bg-ink py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10">
        <div className="overflow-hidden rounded-3xl border border-hairline bg-surface md:grid md:grid-cols-2">
          {/* Info column */}
          <div className="flex flex-col gap-7 p-8 md:p-12">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-lime">
                Visítanos
              </span>
              <h2 className="mt-4 text-3xl font-extrabold leading-[0.95] tracking-[-0.02em] md:text-5xl">
                {location.street.split(" #")[0]}{" "}
                <span className="text-lime">
                  #{location.street.split(" #")[1]}
                </span>
                .
              </h2>
            </div>

            <div className="flex flex-wrap gap-2">
              <OpenNowBadge variant="pill" />
              <span className="rounded-full border border-hairline bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70">
                Cubierta
              </span>
              <span className="rounded-full border border-hairline bg-elevated px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-fg/70">
                Sintética
              </span>
            </div>

            <div className="rounded-2xl border border-hairline bg-elevated p-5">
              {DAY_GROUPS.map((group) => {
                const isToday = (group.ids as readonly number[]).includes(todayDow);
                return (
                  <div
                    key={group.label}
                    className={
                      isToday
                        ? "-mx-3 flex items-center justify-between rounded-xl bg-lime/10 px-3 py-2.5"
                        : "flex items-center justify-between border-b border-hairline py-2.5 last:border-b-0"
                    }
                  >
                    <span
                      className={
                        isToday
                          ? "font-bold text-fg before:mr-2 before:text-lime before:content-['●']"
                          : "text-fg/75"
                      }
                    >
                      {isToday ? `Hoy · ${group.label}` : group.label}
                    </span>
                    <span className="font-mono text-xs uppercase tracking-[0.1em] text-lime">
                      {hoursLabel}
                    </span>
                  </div>
                );
              })}
            </div>

            <div>
              <div className="font-mono text-[10px] uppercase tracking-[0.25em] text-fg/55">
                Dirección
              </div>
              <div className="mt-1.5 text-lg font-bold tracking-[-0.015em]">
                {location.street}, {location.city}
              </div>
              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-block"
              >
                <Button className="rounded-full font-bold">
                  Cómo llegar
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Map column */}
          <div className="relative min-h-[320px] bg-elevated md:min-h-full">
            {hasMapEmbed ? (
              <iframe
                src={location.mapEmbedUrl}
                title={`Mapa de Tercer tiempo ${location.city}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 h-full w-full"
              />
            ) : (
              <Link
                href={location.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-elevated p-8 text-center"
                style={{
                  backgroundImage:
                    "radial-gradient(ellipse at 60% 45%, rgba(198,255,91,0.08) 0%, transparent 55%), linear-gradient(rgba(244,255,245,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244,255,245,0.04) 1px, transparent 1px)",
                  backgroundSize: "auto, 40px 40px, 40px 40px",
                }}
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-lime text-2xl text-ink shadow-[0_0_0_8px_rgba(198,255,91,0.15)]">
                  ⚽
                </div>
                <div className="font-mono text-[11px] uppercase tracking-[0.25em] text-fg/70">
                  {location.street}
                </div>
                <Button
                  variant="outline"
                  className="rounded-full border-fg/25 bg-transparent font-bold text-fg hover:bg-fg/5 hover:text-fg"
                >
                  Ver en Google Maps
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
