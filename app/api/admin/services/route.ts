import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createCrudService } from "@/lib/crud";
import { serviceSchema } from "@/lib/validations";

const crud = createCrudService(prisma.service, serviceSchema, ["/", "/services"]);

export async function GET() {
  const items = await crud.list();
  return NextResponse.json(items);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const item = await crud.create(body);
    return NextResponse.json(item, { status: 201 });
  } catch (err) {
    return NextResponse.json({ error: (err as Error).message }, { status: 400 });
  }
}
