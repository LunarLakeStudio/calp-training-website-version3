"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  },
};

export function AnimatedPageHero({
  eyebrow,
  title,
  intro,
  className,
}: {
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  intro?: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.header
      className={cn(
        "mx-auto max-w-7xl px-6 pt-16 pb-12",
        className,
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {eyebrow ? (
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full bg-calp-red/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-calp-red"
        >
          {eyebrow}
        </motion.div>
      ) : null}
      <motion.h1
        variants={itemVariants}
        className="mb-6 max-w-3xl font-display text-5xl font-bold leading-[1.05] tracking-tight text-balance md:text-6xl"
      >
        {title}
      </motion.h1>
      {intro ? (
        <motion.p
          variants={itemVariants}
          className="max-w-2xl text-lg leading-relaxed text-calp-ink"
        >
          {intro}
        </motion.p>
      ) : null}
    </motion.header>
  );
}
