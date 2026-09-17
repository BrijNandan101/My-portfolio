import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { contactFormSchema } from "@/lib/validations";
import { sendContactEmail } from "@/lib/resend";
import { cleanupOldMessages, hasRecentSubmission } from "@/lib/contact";

export async function POST(req: NextRequest) {
  const body = await req.json();

  const parsed = contactFormSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Invalid input" }, { status: 400 });
  }

  cleanupOldMessages().catch((err) => console.error("[contact] cleanup failed", err));

  if (await hasRecentSubmission(parsed.data.email)) {
    return NextResponse.json(
      { error: "You've already sent a message in the last 24 hours. Please wait before sending another." },
      { status: 429 }
    );
  }

  const submission = await prisma.contactSubmission.create({ data: parsed.data });

  try {
    await sendContactEmail(parsed.data);
  } catch (err) {
    console.error("[contact] failed to send email", err);
  }

  return NextResponse.json({ ok: true, id: submission.id }, { status: 201 });
}
