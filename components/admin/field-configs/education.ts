import { ResourceConfig } from "@/components/admin/types";

export const educationConfig: ResourceConfig = {
  resource: "education",
  title: "Education",
  singular: "Education",
  columns: [
    { key: "institution", label: "Institution" },
    { key: "degree", label: "Degree" },
    { key: "order", label: "Order" },
  ],
  fields: [
    { name: "institution", label: "Institution", type: "text", required: true },
    { name: "degree", label: "Degree", type: "text", required: true },
    { name: "detail", label: "Detail", type: "text", help: "e.g. GPA 6.9/10.0" },
    { name: "startDate", label: "Start date", type: "date", required: true },
    { name: "endDate", label: "End date", type: "date" },
    { name: "order", label: "Display order", type: "number" },
  ],
};
