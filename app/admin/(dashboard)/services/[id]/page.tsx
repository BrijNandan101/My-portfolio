import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { serviceConfig } from "@/components/admin/field-configs/service";

export default async function EditServicePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.service.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit service</h1>
      <AdminForm config={serviceConfig} id={id} initialValues={item} />
    </div>
  );
}
