"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResourceConfig } from "@/components/admin/types";

type Values = Record<string, unknown>;

function toDateInputValue(value: unknown) {
  if (!value) return "";
  const d = new Date(value as string);
  if (Number.isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}

function toTagsInputValue(value: unknown) {
  if (!Array.isArray(value)) return "";
  return value.join("\n");
}

export function AdminForm({
  config,
  initialValues,
  id,
}: {
  config: ResourceConfig;
  initialValues?: Values;
  id?: string;
}) {
  const router = useRouter();
  const [values, setValues] = useState<Values>(initialValues ?? {});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  function setField(name: string, value: unknown) {
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  async function handleImageUpload(name: string, file: File) {
    setUploadingField(name);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", config.resource);
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      setField(name, data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploadingField(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);

    const payload: Values = { ...values };
    for (const field of config.fields) {
      if (field.type === "tags") {
        const raw = payload[field.name];
        payload[field.name] =
          typeof raw === "string"
            ? raw
                .split(/[\n,]/)
                .map((s) => s.trim())
                .filter(Boolean)
            : raw ?? [];
      }
      if (field.type === "number" && typeof payload[field.name] === "string") {
        payload[field.name] = payload[field.name] === "" ? undefined : Number(payload[field.name]);
      }
      if (field.type === "checkbox") {
        payload[field.name] = Boolean(payload[field.name]);
      }
    }

    try {
      const url = id ? `/api/admin/${config.resource}/${id}` : `/api/admin/${config.resource}`;
      const method = id ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      router.push(`/admin/${config.resource}`);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}

      {config.fields.map((field) => {
        const value = values[field.name];

        if (field.type === "checkbox") {
          return (
            <div key={field.name} className="flex items-center gap-2">
              <input
                id={field.name}
                type="checkbox"
                checked={Boolean(value)}
                onChange={(e) => setField(field.name, e.target.checked)}
                className="h-4 w-4 rounded border-border accent-[var(--accent)]"
              />
              <Label htmlFor={field.name} className="mb-0">
                {field.label}
              </Label>
            </div>
          );
        }

        if (field.type === "select") {
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <select
                id={field.name}
                required={field.required}
                value={(value as string) ?? ""}
                onChange={(e) => setField(field.name, e.target.value)}
                className="flex h-11 w-full rounded-lg border border-border bg-background px-3.5 text-sm outline-none focus-visible:border-accent focus-visible:ring-1 focus-visible:ring-accent"
              >
                <option value="" disabled>
                  Select…
                </option>
                {field.options?.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          );
        }

        if (field.type === "textarea" || field.type === "tags") {
          const textValue =
            field.type === "tags"
              ? typeof value === "string"
                ? value
                : toTagsInputValue(value)
              : (value as string) ?? "";
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Textarea
                id={field.name}
                required={field.required}
                placeholder={field.placeholder}
                value={textValue}
                onChange={(e) => setField(field.name, e.target.value)}
                rows={field.type === "tags" ? 3 : 5}
              />
              {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
            </div>
          );
        }

        if (field.type === "date") {
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              <Input
                id={field.name}
                type="date"
                required={field.required}
                value={toDateInputValue(value)}
                onChange={(e) => setField(field.name, e.target.value)}
              />
              {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
            </div>
          );
        }

        if (field.type === "image") {
          return (
            <div key={field.name}>
              <Label htmlFor={field.name}>{field.label}</Label>
              {typeof value === "string" && value && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={value} alt="" className="mb-2 h-32 w-auto rounded-lg border border-border object-cover" />
              )}
              <input
                id={field.name}
                type="file"
                accept="image/*,.pdf"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) handleImageUpload(field.name, file);
                }}
                className="block text-sm"
              />
              {uploadingField === field.name && <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>}
            </div>
          );
        }

        return (
          <div key={field.name}>
            <Label htmlFor={field.name}>{field.label}</Label>
            <Input
              id={field.name}
              type={field.type === "number" ? "number" : "text"}
              required={field.required}
              placeholder={field.placeholder}
              value={(value as string | number) ?? ""}
              onChange={(e) => setField(field.name, e.target.value)}
            />
            {field.help && <p className="mt-1 text-xs text-muted-foreground">{field.help}</p>}
          </div>
        );
      })}

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={saving}>
          {saving ? "Saving…" : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push(`/admin/${config.resource}`)}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
