import type { Trainer } from "@/data/trainers";

export function TrainerRow({ trainer }: { trainer: Trainer }) {
  return (
    <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3 rounded-xl border border-calp-blue/10 bg-white px-3 py-2">
      <img
        src={trainer.photo}
        alt={trainer.name}
        loading="lazy"
        width={80}
        height={80}
        className="h-10 w-10 shrink-0 rounded-full object-cover"
      />
      <div className="min-w-0">
        <p className="truncate font-display text-sm font-medium text-calp-blue">
          {trainer.name}
        </p>
        <p className="truncate text-sm text-calp-ink">
          {trainer.location} • {trainer.languages.join(", ")}
        </p>
      </div>
    </div>
  );
}
