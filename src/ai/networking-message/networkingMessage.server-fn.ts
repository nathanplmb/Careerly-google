import { createServerFn } from "@tanstack/react-start";
import { GenerateNetworkingMessageInputZodSchema } from "./networkingMessage.schema";
import type { GenerateNetworkingMessageResult } from "./networkingMessage.types";

export const generateNetworkingMessageServerFn = createServerFn({
  method: "POST",
})
  .validator((data: unknown) =>
    GenerateNetworkingMessageInputZodSchema.parse(data),
  )
  .handler(async ({ data }): Promise<GenerateNetworkingMessageResult> => {
    const { generateNetworkingMessageIA } =
      await import("./networkingMessage.service");
    return await generateNetworkingMessageIA(data);
  });
