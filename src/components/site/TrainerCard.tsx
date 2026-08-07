"use client";

import type { Trainer } from "@/data/trainers";
import { MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function TrainerCard({ trainer }: { trainer: Trainer }) {
  return (
    <motion.div
      className="group flex flex-col overflow-hidden rounded-xl border border-calp-blue/5 bg-white transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-calp-blue/5"
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] as const }}
    >
      <div className="aspect-square w-full overflow-hidden bg-calp-canvas">
        <img
          src={trainer.photo}
          alt={trainer.name}
          loading="lazy"
          width={300}
          height={300}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="font-display text-lg font-bold leading-tight text-calp-blue">
          <span className="relative inline-block after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:origin-bottom-right after:scale-x-0 after:bg-calp-red after:transition-transform after:duration-300 group-hover:after:origin-bottom-left group-hover:after:scale-x-100">
            {trainer.name}
          </span>
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-calp-ink">
          <MapPin className="h-3.5 w-3.5" />
          <span>{trainer.location}</span>
        </div>
        <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {trainer.languages.map((l) => (
            <span
              key={l}
              className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-calp-blue transition-transform duration-200 group-hover:scale-105"
            >
              {l}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

