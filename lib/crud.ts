/* eslint-disable @typescript-eslint/no-explicit-any */
import { z } from "zod";
import { revalidatePath } from "next/cache";

type Delegate = {
  findMany: (args?: any) => Promise<unknown[]>;
  findUnique: (args: { where: { id: string } }) => Promise<unknown>;
  create: (args: { data: any }) => Promise<unknown>;
  update: (args: { where: { id: string }; data: any }) => Promise<unknown>;
  delete: (args: { where: { id: string } }) => Promise<unknown>;
};

// One generic CRUD service reused by every admin resource route — adding a
// new content type later only needs a Prisma model + one call to this.
export function createCrudService(
  delegate: Delegate,
  schema: z.ZodTypeAny,
  revalidatePaths: string[] = []
) {
  function touch() {
    for (const path of revalidatePaths) revalidatePath(path);
  }

  return {
    list: (orderBy: Record<string, unknown> = { order: "asc" }) =>
      delegate.findMany({ orderBy }),
    get: (id: string) => delegate.findUnique({ where: { id } }),
    async create(data: unknown) {
      const parsed = schema.parse(data);
      const record = await delegate.create({ data: parsed });
      touch();
      return record;
    },
    async update(id: string, data: unknown) {
      const parsed = (schema as z.ZodObject<z.ZodRawShape>).partial().parse(data);
      const record = await delegate.update({ where: { id }, data: parsed });
      touch();
      return record;
    },
    async remove(id: string) {
      const record = await delegate.delete({ where: { id } });
      touch();
      return record;
    },
  };
}
