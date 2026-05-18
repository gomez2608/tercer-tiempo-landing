import { cn } from "@/lib/utils";

type Size = "sm" | "md" | "lg";

const sizeMap: Record<Size, string> = {
  sm: "text-base",
  md: "text-xl",
  lg: "text-3xl",
};

export function Wordmark({
  size = "md",
  withKicker = false,
  className,
}: {
  size?: Size;
  withKicker?: boolean;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex flex-col leading-none", className)}>
      <span
        className={cn(
          "font-black tracking-[-0.02em]",
          sizeMap[size],
        )}
      >
        Tercer<span className="text-lime"> Tiempo</span>
      </span>
      {withKicker && (
        <span className="mt-1 font-mono text-[9px] uppercase tracking-[0.28em] text-fg/55">
          Ubaté · Colombia
        </span>
      )}
    </span>
  );
}
