import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { Timeline } from "@/components/site/Timeline";

export const metadata = { title: "Experience — Brij Nandan" };

export default async function ExperiencePage() {
  const experience = await prisma.experience.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">Experience</h1>
        <p className="mt-3 text-muted-foreground">Where I&apos;ve worked and what I&apos;ve shipped.</p>
      </Reveal>
      <div className="mt-14">
        <Timeline items={experience} />
      </div>
    </div>
  );
}
