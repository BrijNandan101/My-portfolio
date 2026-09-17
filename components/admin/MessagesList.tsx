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

  if (messages.length === 0) {
    return <p className="text-muted-foreground">No messages yet.</p>;
  }

  return (
    <div className="space-y-4">
      {messages.map((m) => (
        <Card key={m.id} className={m.read ? "opacity-70" : ""}>
          <div className="flex items-start justify-between gap-4">
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
        </Card>
      ))}
    </div>
  );
}
