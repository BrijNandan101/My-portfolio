import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCrudService } from "@/lib/crud";
import { serviceSchema } from "@/lib/validations";

const crud = createCrudService(prisma.service, serviceSchema, ["/", "/services"]);

export async function GET(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const item = await crud.get(id);
  if (!item) return NextResponse.json({ error: "Not found" }, { status: 404 });
  return NextResponse.json(item);
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const body = await req.json();
  try {
    const item = await crud.update(id, body);
    return NextResponse.json(item);
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  await crud.remove(id);
  return NextResponse.json({ ok: true });
}
