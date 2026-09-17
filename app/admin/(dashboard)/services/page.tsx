import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { AdminTable } from "@/components/admin/AdminTable";
import { Button } from "@/components/ui/button";
import { serviceConfig } from "@/components/admin/field-configs/service";

export default async function ServicesAdminPage() {
  const items = await prisma.service.findMany({ orderBy: { order: "asc" } });
  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Services</h1>
        <Link href="/admin/services/new">
          <Button>Add service</Button>
        </Link>
      </div>
      <AdminTable config={serviceConfig} items={items} />
    </div>
  );
}
