import { prisma } from "@/lib/prisma";
import { Reveal } from "@/components/site/Reveal";
import { SpotlightCard } from "@/components/site/SpotlightCard";
import { SkillPill } from "@/components/site/SkillPill";
import { Code2, Layers, Brain, Cloud, Blocks } from "lucide-react";

export const metadata = { title: "Skills — Brij Nandan" };

const categoryMeta: Record<string, { label: string; icon: typeof Code2 }> = {
  LANGUAGES: { label: "Languages", icon: Code2 },
  FRAMEWORKS: { label: "Frameworks", icon: Layers },
  GENAI: { label: "GenAI & LLM", icon: Brain },
  TOOLS_CLOUD: { label: "Tools & Cloud", icon: Cloud },
  FUNDAMENTALS: { label: "Fundamentals", icon: Blocks },
};

export default async function SkillsPage() {
  const skills = await prisma.skill.findMany({ orderBy: [{ category: "asc" }, { order: "asc" }] });

  const grouped = skills.reduce<Record<string, typeof skills>>((acc, skill) => {
    (acc[skill.category] ??= []).push(skill);
    return acc;
  }, {});

  return (
    <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6">
      <Reveal>
        <h1 className="text-3xl font-semibold sm:text-4xl">Skills</h1>
        <p className="mt-3 text-muted-foreground">Technologies and fundamentals I work with day to day.</p>
      </Reveal>

      <div className="mt-12 space-y-6">
        {Object.entries(grouped).map(([category, items], i) => {
          const meta = categoryMeta[category] ?? { label: category, icon: Code2 };
          const Icon = meta.icon;
          return (
            <Reveal key={category} delay={i * 0.06}>
              <SpotlightCard>
                <div className="mb-4 flex items-center gap-2.5">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-soft text-accent">
                    <Icon size={18} />
                  </div>
                  <h2 className="font-semibold">{meta.label}</h2>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {items.map((skill, j) => (
                    <SkillPill key={skill.id} name={skill.name} proficiency={skill.proficiency} delay={j * 0.03} />
                  ))}
                </div>
              </SpotlightCard>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}
