import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const ids = Array.isArray(body.ids) ? (body.ids as string[]) : [];
  const action = body.action as "delete" | "read" | "unread";

  if (ids.length === 0) {
    return NextResponse.json({ error: "No messages selected" }, { status: 400 });
  }

  if (action === "delete") {
    const { count } = await prisma.contactSubmission.deleteMany({ where: { id: { in: ids } } });
    return NextResponse.json({ ok: true, count });
  }

  if (action === "read" || action === "unread") {
    const { count } = await prisma.contactSubmission.updateMany({
      where: { id: { in: ids } },
      data: { read: action === "read" },
    });
    return NextResponse.json({ ok: true, count });
  }

  return NextResponse.json({ error: "Unknown action" }, { status: 400 });
}
