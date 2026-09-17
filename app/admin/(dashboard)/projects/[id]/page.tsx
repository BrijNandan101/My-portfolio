import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { projectConfig } from "@/components/admin/field-configs/project";

export default async function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.project.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit project</h1>
      <AdminForm config={projectConfig} id={id} initialValues={item} />
    </div>
  );
}
