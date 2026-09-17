"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/skills", label: "Skills" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
];

export function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Brij Nandan
        </Link>

        <nav className="hidden items-center gap-1 md:flex" onMouseLeave={() => setHovered(null)}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onMouseEnter={() => setHovered(link.href)}
              className={cn(
                "relative rounded-full px-4 py-2 text-sm transition-colors",
                pathname === link.href ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              )}
            >
              {hovered === link.href && (
                <motion.span
                  layoutId="nav-hover-pill"
                  className="absolute inset-0 rounded-full bg-muted"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {pathname === link.href && hovered !== link.href && (
                <span className="absolute inset-0 rounded-full bg-muted" />
              )}
              <span className="relative">{link.label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden md:block">
          <Link href="/contact">
            <Button size="sm">Contact</Button>
          </Link>
        </div>

        <button
          aria-label="Toggle menu"
          className="flex h-9 w-9 items-center justify-center rounded-lg border border-border md:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <div className="space-y-1">
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
            <span className="block h-0.5 w-4 bg-foreground" />
          </div>
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-3 md:hidden">
          {[...links, { href: "/contact", label: "Contact" }].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
