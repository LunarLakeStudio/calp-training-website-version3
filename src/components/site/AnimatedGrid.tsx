"use client";

import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export function AnimatedGrid({
  children,
  className,
  keyPrefix,
}: {
  children: React.ReactNode;
  className?: string;
  keyPrefix?: string;
}) {
  return (
    <motion.div
      className={cn(className)}
      layout
      initial="hidden"
      animate="visible"
      exit="hidden"
    >
      <AnimatePresence mode="popLayout">
        {children}
      </AnimatePresence>
    </motion.div>
  );
}

export function AnimatedGridItem({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id: string | number;
}) {
  return (
    <motion.div
      key={id}
      layout
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -8 }}
      transition={{
        layout: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
        opacity: { duration: 0.25 },
        scale: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
        y: { duration: 0.35, ease: [0.22, 1, 0.36, 1] as const },
      }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  );
}
