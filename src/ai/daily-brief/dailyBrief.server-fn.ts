import { DailyBriefInputZodSchema } from "./dailyBrief.schema";
import type { DailyBriefData } from "./dailyBrief.types";

export const genererDailyBriefServerFn = async ({ data }: { data: unknown }): Promise<DailyBriefData> => {
  const parsedData = DailyBriefInputZodSchema.parse(data);
  const { generateDailyBriefIA } = await import("./dailyBrief.service");
  return await generateDailyBriefIA(parsedData);
};
