import { put, del } from "@vercel/blob";

export async function uploadFile(file: File, folder: string) {
  const filename = `${folder}/${Date.now()}-${file.name}`;
  const blob = await put(filename, file, { access: "public" });
  return blob.url;
}

export async function deleteFile(url: string) {
  try {
    await del(url);
  } catch {
    // best-effort cleanup
  }
}
