import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { experienceConfig } from "@/components/admin/field-configs/experience";

export default async function ExperienceAdminPage() {
  const items = await prisma.experience.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Experience</h1>
        <Link href="/admin/experience/new">
          <Button>Add experience</Button>
        </Link>
      </div>
      <AdminTable config={experienceConfig} items={items} />
    </div>
  );
}
