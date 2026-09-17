import { AdminForm } from "@/components/admin/AdminForm";
import { educationConfig } from "@/components/admin/field-configs/education";

export default function NewEducationPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New education</h1>
      <AdminForm config={educationConfig} />
    </div>
  );
}
