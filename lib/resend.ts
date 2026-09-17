import { Resend } from "resend";

export async function sendContactEmail(input: { name: string; email: string; message: string }) {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? "onboarding@resend.dev";

  if (!apiKey || !to) {
    console.warn("[resend] RESEND_API_KEY or CONTACT_TO_EMAIL not set, skipping email send");
    return { skipped: true };
  }

  const resend = new Resend(apiKey);
  return resend.emails.send({
    from: `Portfolio Contact <${from}>`,
    to,
    replyTo: input.email,
    subject: `New portfolio message from ${input.name}`,
    text: `From: ${input.name} <${input.email}>\n\n${input.message}`,
  });
}
