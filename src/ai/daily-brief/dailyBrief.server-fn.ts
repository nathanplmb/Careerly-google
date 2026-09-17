import { createServerFn } from "@tanstack/react-start";
import { DailyBriefInputZodSchema } from "./dailyBrief.schema";
import type { DailyBriefData } from "./dailyBrief.types";

export const genererDailyBriefServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => DailyBriefInputZodSchema.parse(data))
  .handler(async ({ data }): Promise<DailyBriefData> => {
    const { generateDailyBriefIA } = await import("./dailyBrief.service");
    return await generateDailyBriefIA(data);
  });
