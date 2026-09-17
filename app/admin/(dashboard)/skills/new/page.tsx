import { AdminForm } from "@/components/admin/AdminForm";
import { skillConfig } from "@/components/admin/field-configs/skill";

export default function NewSkillPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New skill</h1>
      <AdminForm config={skillConfig} />
    </div>
  );
}
