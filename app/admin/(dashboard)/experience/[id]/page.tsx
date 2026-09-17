import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { experienceConfig } from "@/components/admin/field-configs/experience";

export default async function EditExperiencePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.experience.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit experience</h1>
      <AdminForm config={experienceConfig} id={id} initialValues={item} />
    </div>
  );
}
