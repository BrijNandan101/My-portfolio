import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { ServiceCard } from "@/components/site/ServiceCard";

export const metadata = { title: "Services — Brij Nandan" };

export default async function ServicesPage() {
  const services = await prisma.service.findMany({ orderBy: { order: "asc" } });

  return (
    <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">Services</h1>
        <p className="mt-3 text-muted-foreground">How I can help with your next project.</p>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => (
          <Reveal key={service.id} delay={i * 0.08} className="h-full">
            <ServiceCard service={service} />
          </Reveal>
        ))}
      </div>
      {services.length === 0 && <p className="text-muted-foreground">Services coming soon.</p>}
    </div>
  );
}
