"use client";

import { motion } from "framer-motion";

export function SkillDial({
  name,
  proficiency,
  delay = 0,
}: {
  name: string;
  proficiency: number;
  delay?: number;
}) {
  const pct = Math.min(5, Math.max(1, proficiency)) / 5;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -4 }}
      className="flex flex-col items-center gap-2 rounded-xl p-3 text-center transition-colors hover:bg-muted"
    >
      <div className="relative h-16 w-16">
        <svg viewBox="0 0 64 64" className="h-16 w-16 -rotate-90">
          <circle cx="32" cy="32" r={radius} fill="none" stroke="var(--muted)" strokeWidth="5" />
          <motion.circle
            cx="32"
            cy="32"
            r={radius}
            fill="none"
            stroke="var(--accent)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            whileInView={{ strokeDashoffset: circumference * (1 - pct) }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 1, delay: delay + 0.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center text-xs font-semibold text-foreground">
          {proficiency}/5
        </div>
      </div>
      <span className="text-sm text-foreground/90">{name}</span>
    </motion.div>
  );
}
