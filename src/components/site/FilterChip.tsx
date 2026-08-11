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
        "rounded-full border px-3 py-1.5 text-xs font-medium transition-all",
        active
          ? "border-calp-blue bg-calp-blue text-white"
          : "border-calp-blue/15 bg-white text-calp-ink hover:border-calp-blue/40 hover:text-calp-blue",
      )}
    >
      {children}
    </button>
  );
}
