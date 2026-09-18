import { appelerGeminiSecurise, extraireJsonPropre } from "@/lib/gemini.server";
import {
  NETWORKING_MESSAGE_SYSTEM_PROMPT,
  buildNetworkingMessageUserPrompt,
} from "./networkingMessage.prompt";
import { GenerateNetworkingMessageResultZodSchema } from "./networkingMessage.schema";
import type {
  GenerateNetworkingMessageInput,
  GenerateNetworkingMessageResult,
} from "./networkingMessage.types";

export async function generateNetworkingMessageIA(
  input: GenerateNetworkingMessageInput,
): Promise<GenerateNetworkingMessageResult> {
  const promptUtilisateur = buildNetworkingMessageUserPrompt(input);

  const rawResult = await appelerGeminiSecurise({
    promptSysteme: NETWORKING_MESSAGE_SYSTEM_PROMPT,
    promptUtilisateur,
    reponseFormat: "json",
    temperature: 0.6,
  });

  const jsonClean = extraireJsonPropre(rawResult);
  const parsed = JSON.parse(jsonClean);
  return GenerateNetworkingMessageResultZodSchema.parse(parsed);
}
