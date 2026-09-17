import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { formatDate } from "@/lib/utils";

export const metadata = { title: "About — Brij Nandan" };

export default async function AboutPage() {
  const [settings, education] = await Promise.all([
    prisma.siteSettings.findUnique({ where: { id: "singleton" } }),
    prisma.education.findMany({ orderBy: { order: "asc" } }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">About me</h1>
        {settings?.profileImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={settings.profileImageUrl}
            alt="Brij Nandan"
            className="mt-8 h-32 w-32 rounded-full border border-border object-cover"
          />
        )}
        <p className="mt-6 whitespace-pre-wrap text-lg leading-relaxed text-muted-foreground">
          {settings?.bio ||
            "Backend engineer building scalable services, evaluation frameworks, and fault-tolerant pipelines. Strong foundation in system design, APIs, and distributed, data-driven systems, focused on reliable, production-grade backend applications."}
        </p>
      </Reveal>

      {education.length > 0 && (
        <div className="mt-16">
          <Reveal>
            <h2 className="mb-6 text-2xl font-semibold">Education</h2>
          </Reveal>
          <div className="space-y-4">
            {education.map((edu, i) => (
              <Reveal key={edu.id} delay={i * 0.06}>
                <SpotlightCard>
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h3 className="font-medium">{edu.institution}</h3>
                    <span className="text-sm text-muted-foreground">
                      {formatDate(edu.startDate)} – {formatDate(edu.endDate)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">{edu.degree}</p>
                  {edu.detail && <p className="mt-1 text-sm text-muted-foreground">{edu.detail}</p>}
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
