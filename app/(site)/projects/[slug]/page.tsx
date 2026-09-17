import { notFound } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, ArrowLeft } from "lucide-react";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  return { title: project ? `${project.title} — Brij Nandan` : "Project — Brij Nandan" };
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await prisma.project.findUnique({ where: { slug } });
  if (!project) notFound();

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <Link href="/projects" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft size={14} /> Back to projects
        </Link>

        {project.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.imageUrl}
            alt={project.title}
            className="mt-6 aspect-video w-full rounded-2xl border border-border object-cover"
          />
        )}

        <h1 className="mt-6 text-3xl font-semibold sm:text-4xl">{project.title}</h1>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <Badge key={tech}>{tech}</Badge>
          ))}
        </div>

        <p className="mt-6 text-lg text-muted-foreground">{project.description}</p>

        {project.longDescription && (
          <p className="mt-4 whitespace-pre-wrap leading-relaxed text-muted-foreground">
            {project.longDescription}
          </p>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          {project.repoUrl && (
            <a href={project.repoUrl} target="_blank">
              <Button variant="outline">
                <Github size={16} /> View code
              </Button>
            </a>
          )}
          {project.demoUrl && (
            <a href={project.demoUrl} target="_blank">
              <Button>
                <ExternalLink size={16} /> Live demo
              </Button>
            </a>
          )}
        </div>
      </Reveal>
    </div>
  );
}
