"use client";

import { motion } from "framer-motion";

export function SkillBar({ name, proficiency }: { name: string; proficiency: number }) {
  const pct = Math.min(5, Math.max(1, proficiency)) * 20;

  return (
    <div>
      <div className="mb-1.5 flex items-center justify-between text-sm">
        <span>{name}</span>
        <span className="text-muted-foreground">{proficiency}/5</span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={{ width: 0 }}
          whileInView={{ width: `${pct}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        />
      </div>
    </div>
  );
}
