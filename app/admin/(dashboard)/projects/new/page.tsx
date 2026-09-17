import { AdminForm } from "@/components/admin/AdminForm";
import { projectConfig } from "@/components/admin/field-configs/project";

export default function NewProjectPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New project</h1>
      <AdminForm config={projectConfig} />
    </div>
  );
}
