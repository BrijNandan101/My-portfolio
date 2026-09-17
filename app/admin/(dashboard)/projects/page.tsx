import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { projectConfig } from "@/components/admin/field-configs/project";

export default async function ProjectsAdminPage() {
  const items = await prisma.project.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Projects</h1>
        <Link href="/admin/projects/new">
          <Button>Add project</Button>
        </Link>
      </div>
      <AdminTable config={projectConfig} items={items} />
    </div>
  );
}
