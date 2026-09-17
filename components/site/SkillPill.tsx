"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SkillPill({
  name,
  proficiency,
  delay = 0,
}: {
  name: string;
  proficiency: number;
  delay?: number;
}) {
  const level = Math.min(5, Math.max(1, proficiency));

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.35, delay }}
      whileHover={{ y: -3, scale: 1.05, transition: { type: "spring", stiffness: 300, damping: 18 } }}
      className="flex items-center gap-3 rounded-full border border-border bg-card px-4 py-2 shadow-sm transition-colors hover:border-accent/50 hover:bg-accent-soft"
    >
      <span className="text-sm font-medium whitespace-nowrap">{name}</span>
      <span className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full", i < level ? "bg-accent" : "bg-muted-foreground/25")}
          />
        ))}
      </span>
    </motion.div>
  );
}
