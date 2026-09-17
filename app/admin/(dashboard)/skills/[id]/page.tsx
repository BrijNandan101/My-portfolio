import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AdminForm } from "@/components/admin/AdminForm";
import { skillConfig } from "@/components/admin/field-configs/skill";

export default async function EditSkillPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await prisma.skill.findUnique({ where: { id } });
  if (!item) notFound();
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Edit skill</h1>
      <AdminForm config={skillConfig} id={id} initialValues={item} />
    </div>
  );
}
