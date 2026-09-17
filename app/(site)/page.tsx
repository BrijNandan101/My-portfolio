import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Button } from "@/components/ui/button";
import { HeroBackground } from "@/components/site/HeroBackground";
import { Reveal } from "@/components/site/Reveal";
import { ProjectCard } from "@/components/site/ProjectCard";
import { ServiceCard } from "@/components/site/ServiceCard";
import { HeroEntrance } from "@/components/site/HeroEntrance";
import { MagneticButton } from "@/components/site/MagneticButton";
import { Github, Linkedin, Code2, ArrowRight } from "lucide-react";

export default async function HomePage() {
  const [settings, featuredProjects, services] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.project.findMany({ where: { featured: true }, orderBy: { order: "asc" }, take: 3 }),
    prisma.service.findMany({ orderBy: { order: "asc" }, take: 3 }),
  ]);

  return (
    <div>
      <section className="relative overflow-hidden px-4 pb-24 pt-20 sm:px-6 sm:pt-28">
        <HeroBackground />
        <div className="mx-auto max-w-4xl text-center">
          <HeroEntrance>
            <p className="mb-4 text-sm font-medium uppercase tracking-widest text-accent">
              {settings?.tagline ?? "Software Developer"}
            </p>
            <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-6xl">
              Hi, I&apos;m Brij Nandan.
              <br />
              I build reliable backend &amp; GenAI systems.
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-balance text-muted-foreground sm:text-lg">
              {settings?.bio ||
                "Backend engineer building scalable services, evaluation frameworks, and fault-tolerant pipelines for production-grade LLM applications."}
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <MagneticButton>
                <Link href="/projects">
                  <Button size="lg">
                    View my work <ArrowRight size={16} />
                  </Button>
                </Link>
              </MagneticButton>
              <MagneticButton>
                <Link href="/contact">
                  <Button size="lg" variant="outline">
                    Get in touch
                  </Button>
                </Link>
              </MagneticButton>
            </div>
            <div className="mt-8 flex items-center justify-center gap-5 text-muted-foreground">
              {settings?.githubUrl && (
                <Link href={settings.githubUrl} target="_blank" className="hover:text-foreground">
                  <Github size={20} />
                </Link>
              )}
              {settings?.linkedinUrl && (
                <Link href={settings.linkedinUrl} target="_blank" className="hover:text-foreground">
                  <Linkedin size={20} />
                </Link>
              )}
              {settings?.leetcodeUrl && (
                <Link href={settings.leetcodeUrl} target="_blank" className="hover:text-foreground">
                  <Code2 size={20} />
                </Link>
              )}
            </div>
          </HeroEntrance>
        </div>
      </section>

      {featuredProjects.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <div className="mb-10 flex items-end justify-between">
              <h2 className="text-2xl font-semibold sm:text-3xl">Featured projects</h2>
              <Link href="/projects" className="text-sm text-accent hover:underline">
                View all →
              </Link>
            </div>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredProjects.map((project, i) => (
              <Reveal key={project.id} delay={i * 0.08} className="h-full">
                <ProjectCard project={project} />
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {services.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <Reveal>
            <h2 className="mb-10 text-2xl font-semibold sm:text-3xl">What I can help with</h2>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, i) => (
              <Reveal key={service.id} delay={i * 0.08} className="h-full">
                <ServiceCard service={service} />
              </Reveal>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
