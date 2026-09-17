import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { ProjectsGrid } from "@/components/site/ProjectsGrid";

export const metadata = { title: "Projects — Brij Nandan" };

export default async function ProjectsPage() {
  const projects = await prisma.project.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">Projects</h1>
        <p className="mt-3 text-muted-foreground">A selection of backend and GenAI systems I&apos;ve built.</p>
      </Reveal>
      <div className="mt-12">
        <ProjectsGrid projects={projects} />
      </div>
    </div>
  );
}
