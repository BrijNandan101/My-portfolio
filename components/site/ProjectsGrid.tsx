"use client";

import { useMemo, useState } from "react";
import { ProjectCard } from "@/components/site/ProjectCard";
import { Reveal } from "@/components/site/Reveal";
import { cn } from "@/lib/utils";

type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  techStack: string[];
  repoUrl?: string | null;
  demoUrl?: string | null;
  imageUrl?: string | null;
};

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<string | null>(null);

  const tags = useMemo(() => {
    const set = new Set<string>();
    projects.forEach((p) => p.techStack.forEach((t) => set.add(t)));
    return Array.from(set).sort();
  }, [projects]);

  const visible = filter ? projects.filter((p) => p.techStack.includes(filter)) : projects;

  return (
    <div>
      {tags.length > 0 && (
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setFilter(null)}
            className={cn(
              "rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors",
              !filter ? "bg-accent text-accent-foreground border-accent" : "text-muted-foreground hover:bg-muted"
            )}
          >
            All
          </button>
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => setFilter(tag)}
              className={cn(
                "rounded-full border border-border px-3.5 py-1.5 text-sm transition-colors",
                filter === tag
                  ? "bg-accent text-accent-foreground border-accent"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visible.map((project, i) => (
          <Reveal key={project.id} delay={(i % 3) * 0.08} className="h-full">
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>

      {visible.length === 0 && <p className="text-muted-foreground">No projects match this filter yet.</p>}
    </div>
  );
}
