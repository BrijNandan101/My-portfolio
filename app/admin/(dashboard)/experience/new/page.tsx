import { AdminForm } from "@/components/admin/AdminForm";
import { experienceConfig } from "@/components/admin/field-configs/experience";

export default function NewExperiencePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New experience</h1>
      <AdminForm config={experienceConfig} />
    </div>
  );
}
