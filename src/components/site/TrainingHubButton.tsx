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
    ? "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md bg-calp-blue px-6 py-2.5 text-base font-medium text-white transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-calp-blue focus-visible:ring-offset-2"
    : "inline-flex items-center gap-1.5 text-base font-medium text-calp-blue underline-offset-4";

  const state = enabled
    ? isButton
      ? "hover:opacity-90"
      : "hover:underline"
    : "cursor-not-allowed opacity-60";

  const content = (
    <>
      <Lock className={isButton ? "h-4 w-4 text-white" : "h-3.5 w-3.5"} aria-hidden />

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
