import Link from "next/link";
import { Github, Linkedin, Code2, Mail } from "lucide-react";

export function Footer({
  linkedinUrl,
  githubUrl,
  leetcodeUrl,
  email,
}: {
  linkedinUrl?: string | null;
  githubUrl?: string | null;
  leetcodeUrl?: string | null;
  email?: string | null;
}) {
  return (
    <footer className="mt-24 border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 py-10 text-sm text-muted-foreground sm:flex-row sm:justify-between sm:px-6">
        <p>© {new Date().getFullYear()} Brij Nandan. All rights reserved.</p>
        <div className="flex items-center gap-4">
          {githubUrl && (
            <Link href={githubUrl} target="_blank" aria-label="GitHub" className="hover:text-foreground">
              <Github size={18} />
            </Link>
          )}
          {linkedinUrl && (
            <Link href={linkedinUrl} target="_blank" aria-label="LinkedIn" className="hover:text-foreground">
              <Linkedin size={18} />
            </Link>
          )}
          {leetcodeUrl && (
            <Link href={leetcodeUrl} target="_blank" aria-label="LeetCode" className="hover:text-foreground">
              <Code2 size={18} />
            </Link>
          )}
          {email && (
            <Link href={`mailto:${email}`} aria-label="Email" className="hover:text-foreground">
              <Mail size={18} />
            </Link>
          )}
        </div>
      </div>
    </footer>
  );
}
