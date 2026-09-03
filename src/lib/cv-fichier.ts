/** Extraction du texte d'un CV côté navigateur. Aucun fichier n'est envoyé au serveur. */
import { initPolyfills, patchReadableStreamInstance } from "@/lib/polyfills";

export const TYPES_ACCEPTES = ".pdf,.docx,.txt,.md,.rtf";

const TAILLE_MAX = 20 * 1024 * 1024;

export async function extraireTexteFichier(file: File): Promise<string> {
  const nom = file.name.toLowerCase();

  if (file.size === 0) throw new Error("Ce fichier est vide.");
  if (file.size > TAILLE_MAX)
    throw new Error(
      "Ce fichier dépasse 20 Mo. Utilisez une version plus légère.",
    );

  if (nom.endsWith(".pdf")) return extrairePdf(file);
  if (nom.endsWith(".docx")) return extraireDocx(file);
  if (nom.endsWith(".txt") || nom.endsWith(".md"))
    return (await file.text()).trim();
  if (nom.endsWith(".rtf")) return extraireRtf(file);
  if (nom.endsWith(".doc"))
    throw new Error(
      "L'ancien format .doc ne permet pas une extraction fiable. Enregistrez-le en PDF ou .docx.",
    );

  throw new Error(
    "Format non pris en charge. Utilisez PDF, DOCX, TXT, Markdown ou RTF.",
  );
}

async function extrairePdf(file: File): Promise<string> {
  initPolyfills();
  // Le build legacy inclut les compatibilités nécessaires à Safari/iOS plus ancien.
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const workerUrl = (
    await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url")
  ).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
  const pages: string[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);

    // Patch défensif pour Safari/WebKit où ReadableStream.prototype[Symbol.asyncIterator] n'est pas implémenté
    const origStreamTextContent = (
      page as unknown as { streamTextContent?: (...args: unknown[]) => unknown }
    ).streamTextContent;
    if (typeof origStreamTextContent === "function") {
      (
        page as unknown as {
          streamTextContent: (...args: unknown[]) => unknown;
        }
      ).streamTextContent = function (...args: unknown[]) {
        const stream = origStreamTextContent.apply(this, args);
        patchReadableStreamInstance(stream);
        return stream;
      };
    }

    const content = await page.getTextContent();

    interface RawItem {
      str: string;
      x: number;
      y: number;
      width: number;
      height: number;
    }

    const items: RawItem[] = [];
    for (const it of content.items) {
      if (
        "str" in it &&
        typeof it.str === "string" &&
        it.str.trim().length > 0
      ) {
        const transform = it.transform || [1, 0, 0, 1, 0, 0];
        const x = transform[4];
        const y = transform[5];
        items.push({
          str: it.str,
          x,
          y,
          width: it.width || 0,
          height: it.height || 0,
        });
      }
    }

    if (items.length === 0) continue;

    // Détection éventuelle d'une mise en page multi-colonnes
    // Si une distribution bimodal nette en X existe (colonne gauche < seuil, colonne droite >= seuil)
    const minX = Math.min(...items.map((it) => it.x));
    const maxX = Math.max(...items.map((it) => it.x + it.width));
    const midX = (minX + maxX) / 2;

    const leftColItems = items.filter((it) => it.x + it.width <= midX + 20);
    const rightColItems = items.filter((it) => it.x >= midX - 20);

    const isTwoColumn =
      leftColItems.length >= 10 &&
      rightColItems.length >= 10 &&
      leftColItems.length + rightColItems.length >= items.length * 0.85;

    const reconstruireLignes = (colItems: RawItem[]): string => {
      // Trier par Y descendant (haut vers bas), puis par X ascendant (gauche à droite)
      const sorted = [...colItems].sort((a, b) => {
        if (Math.abs(a.y - b.y) <= 4) {
          return a.x - b.x;
        }
        return b.y - a.y;
      });

      const lignes: string[] = [];
      let ligneCourante: RawItem[] = [];
      let dernierY: number | null = null;

      for (const it of sorted) {
        if (dernierY === null || Math.abs(it.y - dernierY) <= 4) {
          ligneCourante.push(it);
          dernierY = it.y;
        } else {
          // Nouvelle ligne
          const texteLigne = ligneCourante
            .map((item) => item.str.trim())
            .filter(Boolean)
            .join(" ");
          if (texteLigne) {
            // Si grand saut vertical (>= 20pt), ajouter un saut de paragraphe
            if (dernierY !== null && dernierY - it.y >= 20) {
              lignes.push("");
            }
            lignes.push(texteLigne);
          }
          ligneCourante = [it];
          dernierY = it.y;
        }
      }

      if (ligneCourante.length > 0) {
        const texteLigne = ligneCourante
          .map((item) => item.str.trim())
          .filter(Boolean)
          .join(" ");
        if (texteLigne) lignes.push(texteLigne);
      }

      return lignes.join("\n");
    };

    if (isTwoColumn) {
      const colGauche = reconstruireLignes(leftColItems);
      const colDroite = reconstruireLignes(rightColItems);
      pages.push(`${colGauche}\n\n${colDroite}`);
    } else {
      pages.push(reconstruireLignes(items));
    }
  }

  const texte = pages.join("\n\n").trim();
  if (texte.length < 50)
    throw new Error(
      "Ce PDF ne contient pas de texte lisible (CV scanné ?). Copiez-collez son contenu.",
    );
  return texte;
}

async function extraireDocx(file: File): Promise<string> {
  const mammoth = await import("mammoth/mammoth.browser.js" as any);
  const buffer = await file.arrayBuffer();
  const res = await (
    mammoth as unknown as {
      extractRawText: (o: {
        arrayBuffer: ArrayBuffer;
      }) => Promise<{ value: string }>;
    }
  ).extractRawText({ arrayBuffer: buffer });
  const texte = res.value.trim();
  if (texte.length < 50)
    throw new Error("Ce document Word ne contient pas assez de texte lisible.");
  return texte;
}

async function extraireRtf(file: File): Promise<string> {
  const brut = await file.text();
  const texte = brut
    .replace(/\\par[d]?\b/g, "\n")
    .replace(/\\'[0-9a-fA-F]{2}/g, (code) =>
      String.fromCharCode(Number.parseInt(code.slice(2), 16)),
    )
    .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  if (texte.length < 50)
    throw new Error("Ce fichier RTF ne contient pas assez de texte lisible.");
  return texte;
}
