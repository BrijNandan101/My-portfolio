import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { siteSettingsSchema } from "@/lib/validations";

export async function GET() {
  const settings = await prisma.siteSettings.upsert({
    where: { id: "singleton" },
    update: {},
    create: { id: "singleton" },
  });
  return NextResponse.json(settings);
}

export async function PATCH(req: NextRequest) {
  const body = await req.json();
  try {
    const parsed = siteSettingsSchema.partial().parse(body);
    const settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: parsed,
      create: { id: "singleton", ...parsed },
    });
    revalidatePath("/");
    revalidatePath("/about");
    revalidatePath("/contact");
    return NextResponse.json(settings);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
