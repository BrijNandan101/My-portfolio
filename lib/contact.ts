import { prisma } from "@/lib/prisma";

const RATE_LIMIT_WINDOW_MS = 24 * 60 * 60 * 1000; // 1 day
const RETENTION_MS = 7 * 24 * 60 * 60 * 1000; // 1 week

export async function hasRecentSubmission(email: string) {
  const recent = await prisma.contactSubmission.findFirst({
    where: { email, createdAt: { gt: new Date(Date.now() - RATE_LIMIT_WINDOW_MS) } },
    select: { id: true },
  });
  return Boolean(recent);
}

export async function cleanupOldMessages() {
  await prisma.contactSubmission.deleteMany({
    where: { createdAt: { lt: new Date(Date.now() - RETENTION_MS) } },
  });
}
