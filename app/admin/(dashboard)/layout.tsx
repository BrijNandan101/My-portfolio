import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Every admin page reads live data straight from the database, so none of
// it should ever be statically prerendered at build time.
export const dynamic = "force-dynamic";

const navItems = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/projects", label: "Projects" },
  { href: "/admin/skills", label: "Skills" },
  { href: "/admin/services", label: "Services" },
  { href: "/admin/experience", label: "Experience" },
  { href: "/admin/education", label: "Education" },
  { href: "/admin/messages", label: "Messages" },
  { href: "/admin/settings", label: "Settings" },
];

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const unreadCount = await prisma.contactSubmission.count({ where: { read: false } });

  return (
    <div className="min-h-screen">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
          <div className="text-sm font-semibold">Portfolio Admin</div>
          <div className="flex items-center gap-3">
            <Link href="/" target="_blank" className="text-sm text-muted-foreground hover:text-foreground">
              View site ↗
            </Link>
            <LogoutButton />
          </div>
        </div>
      </header>
      <div className="mx-auto flex max-w-6xl gap-8 px-4 py-8">
        <nav className="w-48 shrink-0 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {item.label}
              {item.href === "/admin/messages" && unreadCount > 0 && (
                <span className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground">
                  {unreadCount}
                </span>
              )}
            </Link>
          ))}
        </nav>
        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
