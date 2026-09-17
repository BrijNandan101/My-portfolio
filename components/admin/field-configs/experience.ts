import { ResourceConfig } from "@/components/admin/types";

export const experienceConfig: ResourceConfig = {
  resource: "experience",
  title: "Experience",
  singular: "Experience",
  columns: [
    { key: "company", label: "Company" },
    { key: "role", label: "Role" },
    { key: "order", label: "Order" },
  ],
  fields: [
    { name: "company", label: "Company", type: "text", required: true },
    { name: "role", label: "Role", type: "text", required: true },
    { name: "location", label: "Location", type: "text" },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "endDate", label: "End date", type: "date", help: "Leave blank if this is your current role" },
    { name: "bullets", label: "Bullet points", type: "tags", help: "One per line" },
    { name: "order", label: "Display order", type: "number" },
  ],
};
