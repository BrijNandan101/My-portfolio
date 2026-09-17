import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { educationConfig } from "@/components/admin/field-configs/education";

export default async function EditEducationPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.education.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit education</h1>
      <AdminForm config={educationConfig} id={id} initialValues={item} />
    </div>
  );
}
