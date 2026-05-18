"use client";

import { useOpenNow } from "@/hooks/use-open-now";
import { cn } from "@/lib/utils";

type Variant = "eyebrow" | "pill";

export function OpenNowBadge({ variant = "eyebrow" }: { variant?: Variant }) {
  const state = useOpenNow();

  if (!state) {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]",
          variant === "pill" && "rounded-full border border-hairline bg-elevated px-3 py-1.5",
        )}
        aria-live="polite"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-muted" />
        <span className="opacity-50">Cargando…</span>
      </span>
    );
  }

  const isOpen = state.state === "open";
  const dotColor = isOpen ? "bg-lime shadow-[0_0_10px_var(--color-lime)]" : "bg-[var(--color-status-warn)]";
  const textColor = isOpen ? "text-lime" : "text-[var(--color-status-warn)]";

  const label =
    state.state === "open"
      ? `Abierto ahora · cierra ${state.closesAt}`
      : state.state === "opens-today"
        ? `Cerrado · abre hoy ${state.opensAt}`
        : `Cerrado · abre mañana ${state.opensAt}`;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em]",
        variant === "pill" && "rounded-full border border-hairline bg-elevated px-3 py-1.5",
      )}
      aria-live="polite"
    >
      <span
        className={cn(
          "h-1.5 w-1.5 rounded-full",
          dotColor,
          isOpen && "motion-safe:animate-pulse",
        )}
      />
      <span className={textColor}>{label}</span>
    </span>
  );
}
