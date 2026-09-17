"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { Badge } from "@/components/ui/badge";

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

export function ProjectCard({ project }: { project: Project }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="h-full"
    >
      <SpotlightCard className="flex h-full flex-col">
        {project.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="-mx-6 -mt-6 mb-4 h-40 w-[calc(100%+3rem)] rounded-t-2xl object-cover"
          />
        )}
        <Link href={`/projects/${project.slug}`} className="text-lg font-semibold hover:text-accent">
          {project.title}
        </Link>
        <p className="mt-2 line-clamp-3 flex-1 text-sm text-muted-foreground">{project.description}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.slice(0, 4).map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>
        <div className="mt-4 flex gap-4 text-sm">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <Github size={14} /> Code
            </a>
          )}
          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground"
            >
              <ExternalLink size={14} /> Demo
            </a>
          )}
        </div>
      </SpotlightCard>
    </motion.div>
  );
}
