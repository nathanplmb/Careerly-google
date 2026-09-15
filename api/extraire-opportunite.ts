import type { IncomingMessage, ServerResponse } from "http";
import { extraireOpportuniteIA } from "../src/ai/opportunity/opportunity.service";

type VercelRequest = IncomingMessage & {
  body?: unknown;
  query?: Record<string, string | string[]>;
};

type VercelResponse = ServerResponse & {
  status: (statusCode: number) => VercelResponse;
  json: (data: unknown) => void;
  send: (data: unknown) => void;
};

export default async function handler(
  req: VercelRequest,
  res: VercelResponse,
): Promise<void> {
  // CORS & Options
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  if (req.method !== "POST") {
    res.statusCode = 405;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ error: "Méthode non autorisée. Utilisez POST." }));
    return;
  }

  try {
    let body = req.body;
    if (typeof body === "string") {
      try {
        body = JSON.parse(body);
      } catch {
        // Garder le body tel quel
      }
    }

    const payload = (body as Record<string, unknown>) || {};
    const text = (payload["text"] ||
      (payload["data"] as Record<string, unknown> | undefined)?.["text"]) as
      string | undefined;
    const url = (payload["url"] ||
      (payload["data"] as Record<string, unknown> | undefined)?.["url"]) as
      string | undefined;

    if (!text || typeof text !== "string" || text.trim().length < 10) {
      res.statusCode = 400;
      res.setHeader("Content-Type", "application/json");
      res.end(
        JSON.stringify({
          error: "Le texte de l'offre doit comporter au moins 10 caractères.",
        }),
      );
      return;
    }

    const result = await extraireOpportuniteIA(text, url);

    res.statusCode = 200;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  } catch (err: unknown) {
    const errorObj = err instanceof Error ? err : new Error(String(err));
    console.error(
      "[Vercel Serverless /api/extraire-opportunite] Erreur d'analyse :",
      errorObj.message,
    );
    res.statusCode = 500;
    res.setHeader("Content-Type", "application/json");
    res.end(
      JSON.stringify({
        error: errorObj.message || "Erreur lors de l'analyse de l'offre.",
      }),
    );
  }
}
