import { cn } from "@/lib/utils";

export function FilterChip({
  active,
  onClick,
  children,
}: {
  active?: boolean;
  onClick?: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "rounded-full border px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all",
        active
          ? "border-calp-navy bg-calp-navy text-white"
          : "border-calp-navy/15 bg-white text-calp-slate hover:border-calp-navy/40 hover:text-calp-navy",
      )}
    >
      {children}
    </button>
  );
}
