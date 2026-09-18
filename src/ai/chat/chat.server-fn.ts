import { createServerFn } from "@tanstack/react-start";
import { ChatRequestZodSchema } from "./chat.schema";
import { normalizeCandidateContext } from "./chat.context";
import type { ChatResponsePayload } from "./chat.types";

export const executeChatTurnServerFn = createServerFn({ method: "POST" })
  .validator((data: unknown) => {
    if (data && typeof data === "object") {
      const obj = data as Record<string, unknown>;
      if ("candidateContext" in obj && obj.candidateContext !== undefined) {
        return ChatRequestZodSchema.parse({
          ...obj,
          candidateContext: normalizeCandidateContext(obj.candidateContext),
        });
      }
    }
    return ChatRequestZodSchema.parse(data);
  })
  .handler(async ({ data }): Promise<ChatResponsePayload> => {
    const { executeChatTurn } = await import("./chat.service");
    return await executeChatTurn(data);
  });
