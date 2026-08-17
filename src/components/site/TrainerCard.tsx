import type { Trainer } from "@/data/trainers";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <div className="flex min-w-0 flex-col">
      <div className="aspect-square w-full overflow-hidden rounded-xl">
        <img
          src={trainer.photo}
          alt={trainer.name}
          loading="lazy"
          width={300}
          height={300}
          className="h-full w-full object-cover"
        />
      </div>
      <h3 className="mt-3 break-words font-display text-xl font-bold text-calp-blue">
        {trainer.name}
      </h3>
      <p className="mt-1 text-base text-calp-ink">{trainer.languages.join(", ")}</p>
      <p className="text-base text-calp-ink">{trainer.location}</p>
    </div>
  );
}
