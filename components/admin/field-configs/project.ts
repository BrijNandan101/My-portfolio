import { ResourceConfig } from "@/components/admin/types";

export const projectConfig: ResourceConfig = {
  resource: "projects",
  title: "Projects",
  singular: "Project",
  columns: [
    { key: "title", label: "Title" },
    { key: "featured", label: "Featured" },
    { key: "order", label: "Order" },
  ],
  fields: [
    { name: "title", label: "Title", type: "text", required: true },
    { name: "slug", label: "Slug", type: "text", required: true, help: "Used in the URL, e.g. query-routing-service" },
    { name: "description", label: "Short description", type: "textarea", required: true },
    { name: "longDescription", label: "Long description", type: "textarea" },
    { name: "techStack", label: "Tech stack", type: "tags", help: "Comma-separated, e.g. Python, FastAPI, MongoDB" },
    { name: "repoUrl", label: "Repository URL", type: "text" },
    { name: "demoUrl", label: "Demo URL", type: "text" },
    { name: "imageUrl", label: "Image", type: "image" },
    { name: "featured", label: "Featured on homepage", type: "checkbox" },
    { name: "order", label: "Display order", type: "number" },
  ],
};
