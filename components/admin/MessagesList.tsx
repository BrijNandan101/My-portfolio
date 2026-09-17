"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: Date | string;
};

export function MessagesList({ messages }: { messages: Message[] }) {
  const router = useRouter();
  const [busyId, setBusyId] = useState<string | null>(null);
  const [bulkBusy, setBulkBusy] = useState(false);
  const [selected, setSelected] = useState<Set<string>>(new Set());

  const allSelected = messages.length > 0 && selected.size === messages.length;
  const someSelected = selected.size > 0;

  function toggleOne(id: string) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(messages.map((m) => m.id)));
  }

  async function toggleRead(id: string, read: boolean) {
    setBusyId(id);
    await fetch(`/api/admin/messages/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ read }),
    });
    router.refresh();
    setBusyId(null);
  }

  async function remove(id: string) {
    if (!confirm("Delete this message?")) return;
    setBusyId(id);
    await fetch(`/api/admin/messages/${id}`, { method: "DELETE" });
    router.refresh();
    setBusyId(null);
  }

  async function bulkAction(action: "delete" | "read" | "unread") {
    if (action === "delete" && !confirm(`Delete ${selected.size} selected message(s)?`)) return;
    setBulkBusy(true);
    await fetch("/api/admin/messages/bulk", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ids: Array.from(selected), action }),
    });
    setSelected(new Set());
    router.refresh();
    setBulkBusy(false);
  }

  if (messages.length === 0) {
    return <p className="text-muted-foreground">No messages yet.</p>;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-3">
        <label className="flex items-center gap-2 text-sm text-muted-foreground">
          <input
            type="checkbox"
            checked={allSelected}
            onChange={toggleAll}
            className="h-4 w-4 rounded border-border accent-[var(--accent)]"
          />
          Select all
        </label>

        {someSelected && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{selected.size} selected</span>
            <Button size="sm" variant="outline" disabled={bulkBusy} onClick={() => bulkAction("read")}>
              Mark read
            </Button>
            <Button size="sm" variant="outline" disabled={bulkBusy} onClick={() => bulkAction("unread")}>
              Mark unread
            </Button>
            <Button size="sm" variant="destructive" disabled={bulkBusy} onClick={() => bulkAction("delete")}>
              Delete selected
            </Button>
          </div>
        )}
      </div>

      <div className="space-y-4">
        {messages.map((m) => (
          <Card key={m.id} className={m.read ? "opacity-70" : ""}>
            <div className="flex items-start gap-4">
              <input
                type="checkbox"
                checked={selected.has(m.id)}
                onChange={() => toggleOne(m.id)}
                className="mt-1 h-4 w-4 shrink-0 rounded border-border accent-[var(--accent)]"
              />
              <div className="flex flex-1 items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{m.name}</span>
                    <span className="text-sm text-muted-foreground">{m.email}</span>
                    {!m.read && <Badge className="border-accent bg-accent-soft text-accent">New</Badge>}
                  </div>
                  <p className="mt-2 whitespace-pre-wrap text-sm">{m.message}</p>
                  <p className="mt-2 text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    disabled={busyId === m.id}
                    onClick={() => toggleRead(m.id, !m.read)}
                  >
                    {m.read ? "Mark unread" : "Mark read"}
                  </Button>
                  <Button size="sm" variant="destructive" disabled={busyId === m.id} onClick={() => remove(m.id)}>
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
