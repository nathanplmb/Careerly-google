import { createServerFn } from "@tanstack/react-start";
import { ClassifyContactsBatchInputZodSchema } from "./contactImport.schema";
import type { ClassifyContactsBatchResult } from "./contactImport.types";

export const classifyContactsBatchServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => ClassifyContactsBatchInputZodSchema.parse(data))
  .handler(async ({ data }): Promise<ClassifyContactsBatchResult> => {
    const { classifyContactsBatchIA } = await import("./contactImport.service");
    return await classifyContactsBatchIA(data);
  });
