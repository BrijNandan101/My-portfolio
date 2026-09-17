import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { Card } from "@/components/ui/card";

export default async function AdminOverviewPage() {
  const [projects, skills, services, experience, unread] = await Promise.all([
    prisma.project.count(),
    prisma.skill.count(),
    prisma.service.count(),
    prisma.experience.count(),
    prisma.contactSubmission.count({ where: { read: false } }),
  ]);

  const stats = [
    { label: "Projects", value: projects, href: "/admin/projects" },
    { label: "Skills", value: skills, href: "/admin/skills" },
    { label: "Services", value: services, href: "/admin/services" },
    { label: "Experience entries", value: experience, href: "/admin/experience" },
    { label: "Unread messages", value: unread, href: "/admin/messages" },
  ];

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Overview</h1>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href}>
            <Card className="transition-colors hover:border-accent">
              <div className="text-3xl font-semibold">{stat.value}</div>
              <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
