import { ResourceConfig } from "@/components/admin/types";

export const serviceConfig: ResourceConfig = {
  resource: "services",
  title: "Services",
  singular: "Service",
  columns: [
    { key: "title", label: "Title" },
    { key: "order", label: "Order" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "description", label: "Description", type: "textarea", required: true },
    {
      name: "icon",
      label: "Icon name",
      type: "text",
      help: "A lucide-react icon name in PascalCase, e.g. Server, Brain, Code2",
    },
    { name: "order", label: "Display order", type: "number" },
  ],
};
