import { NextRequest, NextResponse } from "next/server";
import { uploadFile } from "@/lib/blob";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  const folder = (formData.get("folder") as string) || "uploads";

  if (!(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  try {
    const url = await uploadFile(file, folder);
    return NextResponse.json({ url });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 500 });
  }
}
