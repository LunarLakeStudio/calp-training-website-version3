import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { TRAINING_HUB_LOGIN_URL } from "@/config/site";

const LABEL = "Training Hub";

export function TrainingHubButton({
  variant = "button",
  label = LABEL,
  className,
}: {
  variant?: "button" | "link";
  label?: string;
  className?: string;
}) {
  const isButton = variant === "button";
  const enabled = TRAINING_HUB_LOGIN_URL.length > 0;

  const base = isButton
    ? "inline-flex items-center justify-center gap-1.5 rounded-md border border-calp-blue/20 bg-white px-5 py-2.5 text-base font-medium text-calp-blue transition-opacity"
    : "inline-flex items-center gap-1.5 text-base font-medium text-calp-blue underline-offset-4";

  const state = enabled
    ? isButton
      ? "hover:opacity-90"
      : "hover:underline"
    : "cursor-not-allowed opacity-60";

  const content = (
    <>
      <Lock className={isButton ? "h-4 w-4" : "h-3.5 w-3.5"} aria-hidden />
      <span>{label}</span>
    </>
  );

  if (!enabled) {
    return (
      <span
        className={cn(base, state, className)}
        title="Coming soon"
        aria-disabled="true"
      >
        {content}
      </span>
    );
  }

  return (
    <a
      href={TRAINING_HUB_LOGIN_URL}
      target="_blank"
      rel="noreferrer"
      className={cn(base, state, className)}
    >
      {content}
    </a>
  );
}
