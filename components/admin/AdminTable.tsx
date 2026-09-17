"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ResourceConfig } from "@/components/admin/types";

type Row = Record<string, unknown> & { id: string };

function displayValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "boolean") return value ? "Yes" : "No";
  if (Array.isArray(value)) return value.join(", ");
  if (value instanceof Date) return value.toLocaleDateString();
  return String(value);
}

export function AdminTable({ config, items }: { config: ResourceConfig; items: Row[] }) {
  const router = useRouter();
  const [pendingId, setPendingId] = useState<string | null>(null);

  async function handleDelete(id: string) {
    if (!confirm(`Delete this ${config.singular.toLowerCase()}? This cannot be undone.`)) return;
    setPendingId(id);
    try {
      const res = await fetch(`/api/admin/${config.resource}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      router.refresh();
    } catch (err) {
      alert((err as Error).message);
    } finally {
      setPendingId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <table className="w-full text-sm">
        <thead className="bg-muted text-left text-muted-foreground">
          <tr>
            {config.columns.map((col) => (
              <th key={col.key} className="px-4 py-3 font-medium">
                {col.label}
              </th>
            ))}
            <th className="px-4 py-3" />
          </tr>
        </thead>
        <tbody>
          {items.length === 0 && (
            <tr>
              <td colSpan={config.columns.length + 1} className="px-4 py-8 text-center text-muted-foreground">
                No {config.title.toLowerCase()} yet.
              </td>
            </tr>
          )}
          {items.map((item) => (
            <tr key={item.id} className="border-t border-border">
              {config.columns.map((col) => (
                <td key={col.key} className="px-4 py-3">
                  {displayValue(item[col.key])}
                </td>
              ))}
              <td className="px-4 py-3 text-right space-x-2 whitespace-nowrap">
                <Link href={`/admin/${config.resource}/${item.id}`}>
                  <Button variant="outline" size="sm">
                    Edit
                  </Button>
                </Link>
                <Button
                  variant="destructive"
                  size="sm"
                  disabled={pendingId === item.id}
                  onClick={() => handleDelete(item.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
