import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { skillConfig } from "@/components/admin/field-configs/skill";

export default async function SkillsAdminPage() {
  const items = await prisma.skill.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Skills</h1>
        <Link href="/admin/skills/new">
          <Button>Add skill</Button>
        </Link>
      </div>
      <AdminTable config={skillConfig} items={items} />
    </div>
  );
}
