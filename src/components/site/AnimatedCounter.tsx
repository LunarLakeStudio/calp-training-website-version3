"use client";

import { useEffect, useRef, useState } from "react";
import { useSpring, useInView } from "framer-motion";

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  duration = 1.2,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);
  const spring = useSpring(0, {
    stiffness: 40,
    damping: 25,
    duration: duration * 1000,
  });

  useEffect(() => {
    if (!isInView) return;

    const unsubscribe = spring.on("change", (latest) => {
      setDisplay(Math.round(latest));
    });

    spring.set(value);

    return () => {
      unsubscribe();
    };
  }, [isInView, spring, value]);

  return (
    <span ref={ref}>
      {prefix}
      {display}
      {suffix}
    </span>
  );
}
