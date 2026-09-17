import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { Github, Linkedin, Code2, Mail } from "lucide-react";

export const metadata = { title: "Contact — Brij Nandan" };

export default async function ContactPage() {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  const socials = [
    { href: settings?.githubUrl, label: "GitHub", icon: Github },
    { href: settings?.linkedinUrl, label: "LinkedIn", icon: Linkedin },
    { href: settings?.leetcodeUrl, label: "LeetCode", icon: Code2 },
    { href: settings?.email ? `mailto:${settings.email}` : undefined, label: settings?.email ?? "Email", icon: Mail },
  ].filter((s): s is { href: string; label: string; icon: typeof Mail } => Boolean(s.href));

  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">Get in touch</h1>
        <p className="mt-3 text-muted-foreground">
          Have a project in mind or just want to say hi? Send me a message and I&apos;ll reply by email.
        </p>
      </Reveal>

      <div className="mt-10 grid gap-10 sm:grid-cols-[1fr_220px]">
        <Reveal delay={0.1}>
          <ContactForm />
        </Reveal>

        {socials.length > 0 && (
          <Reveal delay={0.2}>
            <div className="space-y-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href?.startsWith("mailto:") ? undefined : "_blank"}
                  className="flex items-center gap-2.5 text-sm text-muted-foreground hover:text-foreground"
                >
                  <s.icon size={16} /> {s.label}
                </a>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
