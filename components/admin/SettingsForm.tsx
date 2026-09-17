"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

type Settings = {
  tagline: string;
  bio: string;
  linkedinUrl: string | null;
  githubUrl: string | null;
  leetcodeUrl: string | null;
  email: string | null;
  resumeUrl: string | null;
  profileImageUrl: string | null;
  seoTitle: string;
  seoDescription: string;
};

export function SettingsForm({ settings }: { settings: Settings }) {
  const router = useRouter();
  const [values, setValues] = useState<Settings>(settings);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState<"photo" | "resume" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  function set<K extends keyof Settings>(key: K, value: Settings[K]) {
    setValues((prev) => ({ ...prev, [key]: value }));
    setSaved(false);
  }

  async function upload(kind: "photo" | "resume", file: File) {
    setUploading(kind);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "settings");
      const res = await fetch("/api/admin/upload", { method: "POST", body: formData });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      if (kind === "photo") set("profileImageUrl", data.url);
      else set("resumeUrl", data.url);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setUploading(null);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/settings", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error ?? "Save failed");
      }
      setSaved(true);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5">
      {error && (
        <div className="rounded-lg border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</div>
      )}
      {saved && (
        <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700">
          Saved.
        </div>
      )}

      <div>
        <Label htmlFor="tagline">Tagline</Label>
        <Input id="tagline" value={values.tagline} onChange={(e) => set("tagline", e.target.value)} required />
      </div>

      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea id="bio" rows={6} value={values.bio} onChange={(e) => set("bio", e.target.value)} />
      </div>

      <div>
        <Label htmlFor="profileImage">Profile photo</Label>
        {values.profileImageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={values.profileImageUrl}
            alt=""
            className="mb-2 h-24 w-24 rounded-full border border-border object-cover"
          />
        )}
        <input
          id="profileImage"
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload("photo", file);
          }}
        />
        {uploading === "photo" && <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>}
      </div>

      <div>
        <Label htmlFor="resume">Resume (PDF)</Label>
        {values.resumeUrl && (
          <a href={values.resumeUrl} target="_blank" className="mb-2 block text-sm text-accent underline">
            Current resume ↗
          </a>
        )}
        <input
          id="resume"
          type="file"
          accept="application/pdf"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) upload("resume", file);
          }}
        />
        {uploading === "resume" && <p className="mt-1 text-xs text-muted-foreground">Uploading…</p>}
      </div>

      <div>
        <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
        <Input
          id="linkedinUrl"
          value={values.linkedinUrl ?? ""}
          onChange={(e) => set("linkedinUrl", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="githubUrl">GitHub URL</Label>
        <Input id="githubUrl" value={values.githubUrl ?? ""} onChange={(e) => set("githubUrl", e.target.value)} />
      </div>
      <div>
        <Label htmlFor="leetcodeUrl">LeetCode URL</Label>
        <Input
          id="leetcodeUrl"
          value={values.leetcodeUrl ?? ""}
          onChange={(e) => set("leetcodeUrl", e.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="email">Contact email</Label>
        <Input id="email" type="email" value={values.email ?? ""} onChange={(e) => set("email", e.target.value)} />
      </div>

      <div>
        <Label htmlFor="seoTitle">SEO title</Label>
        <Input id="seoTitle" value={values.seoTitle} onChange={(e) => set("seoTitle", e.target.value)} required />
      </div>
      <div>
        <Label htmlFor="seoDescription">SEO description</Label>
        <Textarea
          id="seoDescription"
          rows={3}
          value={values.seoDescription}
          onChange={(e) => set("seoDescription", e.target.value)}
          required
        />
      </div>

      <Button type="submit" disabled={saving}>
        {saving ? "Saving…" : "Save settings"}
      </Button>
    </form>
  );
}
