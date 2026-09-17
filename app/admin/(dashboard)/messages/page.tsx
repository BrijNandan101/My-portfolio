import { prisma } from "@/lib/prisma";
import { MessagesList } from "@/components/admin/MessagesList";
import { cleanupOldMessages } from "@/lib/contact";

export default async function MessagesAdminPage() {
  await cleanupOldMessages();
  const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Messages</h1>
      <MessagesList messages={messages} />
    </div>
  );
}
