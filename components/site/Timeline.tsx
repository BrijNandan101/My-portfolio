"use client";

import { motion } from "framer-motion";
import { formatDate } from "@/lib/utils";

type Experience = {
  id: string;
  company: string;
  role: string;
  location?: string | null;
  startDate: Date | string;
  endDate?: Date | string | null;
  bullets: string[];
};

export function Timeline({ items }: { items: Experience[] }) {
  return (
    <div className="relative border-l border-border pl-8">
      {items.map((item, i) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -16 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: i * 0.1 }}
          className="relative mb-12 last:mb-0"
        >
          <span className="absolute -left-[2.35rem] top-1 h-3 w-3 rounded-full bg-accent ring-4 ring-accent-soft" />
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h3 className="text-lg font-semibold">{item.role}</h3>
            <span className="text-sm text-muted-foreground">
              {formatDate(item.startDate)} – {formatDate(item.endDate)}
            </span>
          </div>
          <p className="text-sm font-medium text-accent">
            {item.company}
            {item.location ? ` · ${item.location}` : ""}
          </p>
          <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm text-muted-foreground">
            {item.bullets.map((bullet, j) => (
              <li key={j}>{bullet}</li>
            ))}
          </ul>
        </motion.div>
      ))}
    </div>
  );
}
