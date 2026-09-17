import { ResourceConfig } from "@/components/admin/types";

export const skillConfig: ResourceConfig = {
  resource: "skills",
  title: "Skills",
  singular: "Skill",
  columns: [
    { key: "name", label: "Name" },
    { key: "category", label: "Category" },
    { key: "proficiency", label: "Proficiency" },
  ],
  fields: [
    { name: "name", label: "Name", type: "text", required: true },
    {
      name: "category",
      label: "Category",
      type: "select",
      required: true,
      options: [
        { label: "Languages", value: "LANGUAGES" },
        { label: "Frameworks", value: "FRAMEWORKS" },
        { label: "GenAI & LLM", value: "GENAI" },
        { label: "Tools & Cloud", value: "TOOLS_CLOUD" },
        { label: "Fundamentals", value: "FUNDAMENTALS" },
      ],
    },
    { name: "proficiency", label: "Proficiency (1-5)", type: "number" },
    { name: "order", label: "Display order", type: "number" },
  ],
};
