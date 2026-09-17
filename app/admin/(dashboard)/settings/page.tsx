import { prisma } from "@/lib/prisma";
import { SettingsForm } from "@/components/admin/SettingsForm";

export default async function SettingsAdminPage() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Site settings</h1>
      <SettingsForm settings={settings} />
    </div>
  );
}
