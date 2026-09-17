import { prisma } from "@/lib/prisma";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgressBar } from "@/components/site/ScrollProgressBar";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await prisma.siteSettings.findUnique({ where: { id: "singleton" } });

  return (
    <>
      <ScrollProgressBar />
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer
        linkedinUrl={settings?.linkedinUrl}
        githubUrl={settings?.githubUrl}
        leetcodeUrl={settings?.leetcodeUrl}
        email={settings?.email}
      />
    </>
  );
}
