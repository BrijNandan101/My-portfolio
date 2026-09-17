import { AdminForm } from "@/components/admin/AdminForm";
import { serviceConfig } from "@/components/admin/field-configs/service";

export default function NewServicePage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">New service</h1>
      <AdminForm config={serviceConfig} />
    </div>
  );
}
