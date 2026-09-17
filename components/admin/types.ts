export type FieldType =
  | "text"
  | "textarea"
  | "number"
  | "checkbox"
  | "select"
  | "tags"
  | "date"
  | "image";

export interface FieldConfig {
  name: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  help?: string;
}

export interface ResourceConfig {
  resource: string; // maps to /api/admin/<resource>
  title: string;
  singular: string;
  fields: FieldConfig[];
  columns: { key: string; label: string }[];
}
