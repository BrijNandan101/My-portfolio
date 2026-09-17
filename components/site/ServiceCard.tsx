"use client";

import * as LucideIcons from "lucide-react";
import { Sparkles, LucideIcon } from "lucide-react";
import { SpotlightCard } from "@/components/site/SpotlightCard";

type Service = {
  id: string;
  title: string;
  description: string;
  icon?: string | null;
};

export function ServiceCard({ service }: { service: Service }) {
  const icons = LucideIcons as unknown as Record<string, LucideIcon>;
  const Icon = (service.icon && icons[service.icon]) || Sparkles;

  return (
    <SpotlightCard className="h-full">
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
        <Icon size={20} />
      </div>
      <h3 className="text-lg font-semibold">{service.title}</h3>
      <p className="mt-2 text-sm text-muted-foreground">{service.description}</p>
    </SpotlightCard>
  );
}
