import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { educationConfig } from "@/components/admin/field-configs/education";

export default async function EducationAdminPage() {
  const items = await prisma.education.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Education</h1>
        <Link href="/admin/education/new">
          <Button>Add education</Button>
        </Link>
      </div>
      <AdminTable config={educationConfig} items={items} />
    </div>
  );
}
