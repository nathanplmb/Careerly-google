import type { DocumentStructure, DocumentPage, TextBlockItem } from "./types";

export const ACCEPTED_CV_TYPES = ".pdf,.docx,.txt,.md,.rtf";
const MAX_FILE_SIZE = 20 * 1024 * 1024; // 20 MB

export async function readCVDocument(file: File): Promise<DocumentStructure> {
  // Polyfill pour les environnements où ReadableStream n'a pas [Symbol.asyncIterator]
  if (
    typeof ReadableStream !== "undefined" &&
    !ReadableStream.prototype[Symbol.asyncIterator]
  ) {
    ReadableStream.prototype[Symbol.asyncIterator] = async function* () {
      const reader = this.getReader();
      try {
        while (true) {
          const { done, value } = await reader.read();
          if (done) return;
          yield value;
        }
      } finally {
        reader.releaseLock();
      }
    };
  }

  const fileName = file.name || "document";
  const fileSize = file.size;
  const lowerName = fileName.toLowerCase();

  if (fileSize === 0) {
    throw new Error("Ce fichier est vide.");
  }
  if (fileSize > MAX_FILE_SIZE) {
    throw new Error("Ce fichier dépasse 20 Mo. Veuillez utiliser un fichier plus léger.");
  }

  let fileType: DocumentStructure["fileType"] = "autre";
  let pages: DocumentPage[] = [];
  let plainText = "";

  if (lowerName.endsWith(".pdf")) {
    fileType = "pdf";
    const res = await readPdfDocument(file);
    pages = res.pages;
    plainText = res.plainText;
  } else if (lowerName.endsWith(".docx")) {
    fileType = "docx";
    const res = await readDocxDocument(file);
    pages = res.pages;
    plainText = res.plainText;
  } else if (lowerName.endsWith(".txt") || lowerName.endsWith(".md")) {
    fileType = "txt";
    const text = (await file.text()).trim();
    pages = [{ pageNumber: 1, blocks: [{ text }], text }];
    plainText = text;
  } else if (lowerName.endsWith(".rtf")) {
    fileType = "rtf";
    const text = await readRtfDocument(file);
    pages = [{ pageNumber: 1, blocks: [{ text }], text }];
    plainText = text;
  } else if (lowerName.endsWith(".doc")) {
    throw new Error(
      "Le format .doc binaire ancien n'est pas pris en charge de façon fiable. Veuillez exporter votre CV en PDF ou .docx.",
    );
  } else {
    throw new Error(
      "Format non pris en charge. Veuillez sélectionner un fichier PDF, DOCX ou TXT.",
    );
  }

  if (plainText.trim().length < 40) {
    throw new Error(
      "Le document ne contient pas assez de texte lisible. S'il s'agit d'un scan ou d'une image, veuillez utiliser un PDF avec du texte sélectionnable.",
    );
  }

  return {
    fileName,
    fileSize,
    fileType,
    pages,
    plainText,
  };
}

async function readPdfDocument(
  file: File,
): Promise<{ pages: DocumentPage[]; plainText: string }> {
  const pdfjs = await import("pdfjs-dist/legacy/build/pdf.mjs");
  const workerUrl = (
    await import("pdfjs-dist/legacy/build/pdf.worker.min.mjs?url")
  ).default;
  pdfjs.GlobalWorkerOptions.workerSrc = workerUrl;

  const buffer = await file.arrayBuffer();
  const doc = await pdfjs.getDocument({ data: new Uint8Array(buffer) }).promise;
  const pages: DocumentPage[] = [];

  for (let i = 1; i <= doc.numPages; i++) {
    const page = await doc.getPage(i);
    const content = await page.getTextContent();

    const items: TextBlockItem[] = [];
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
          text: it.str,
          x,
          y,
          width: it.width || 0,
          height: it.height || 0,
          page: i,
        });
      }
    }

    if (items.length === 0) continue;

    // Détection multi-colonnes (distribution en X)
    const minX = Math.min(...items.map((it) => it.x ?? 0));
    const maxX = Math.max(...items.map((it) => (it.x ?? 0) + (it.width ?? 0)));
    const midX = (minX + maxX) / 2;

    const leftColItems = items.filter(
      (it) => (it.x ?? 0) + (it.width ?? 0) <= midX + 20,
    );
    const rightColItems = items.filter((it) => (it.x ?? 0) >= midX - 20);

    const isTwoColumn =
      leftColItems.length >= 8 &&
      rightColItems.length >= 8 &&
      leftColItems.length + rightColItems.length >= items.length * 0.8;

    const sortAndBuildLines = (colItems: TextBlockItem[]): string => {
      const sorted = [...colItems].sort((a, b) => {
        const ay = a.y ?? 0;
        const by = b.y ?? 0;
        if (Math.abs(ay - by) <= 4) {
          return (a.x ?? 0) - (b.x ?? 0);
        }
        return by - ay; // Haut vers bas
      });

      const lines: string[] = [];
      let currentLine: TextBlockItem[] = [];
      let lastY: number | null = null;

      for (const it of sorted) {
        const currentY = it.y ?? 0;
        if (lastY === null || Math.abs(currentY - lastY) <= 4) {
          currentLine.push(it);
          lastY = currentY;
        } else {
          const lineText = currentLine
            .map((item) => item.text.trim())
            .filter(Boolean)
            .join(" ");
          if (lineText) {
            if (lastY !== null && lastY - currentY >= 20) {
              lines.push(""); // Espacement paragraphe
            }
            lines.push(lineText);
          }
          currentLine = [it];
          lastY = currentY;
        }
      }

      if (currentLine.length > 0) {
        const lineText = currentLine
          .map((item) => item.text.trim())
          .filter(Boolean)
          .join(" ");
        if (lineText) lines.push(lineText);
      }

      return lines.join("\n");
    };

    let pageText = "";
    if (isTwoColumn) {
      const colGauche = sortAndBuildLines(leftColItems);
      const colDroite = sortAndBuildLines(rightColItems);
      pageText = `${colGauche}\n\n${colDroite}`;
    } else {
      pageText = sortAndBuildLines(items);
    }

    pages.push({
      pageNumber: i,
      blocks: items,
      text: pageText,
    });
  }

  const plainText = pages.map((p) => p.text).join("\n\n").trim();
  return { pages, plainText };
}

async function readDocxDocument(
  file: File,
): Promise<{ pages: DocumentPage[]; plainText: string }> {
  const mammoth = await import("mammoth/mammoth.browser.js");
  const buffer = await file.arrayBuffer();
  const res = await (
    mammoth as unknown as {
      extractRawText: (o: {
        arrayBuffer: ArrayBuffer;
      }) => Promise<{ value: string }>;
    }
  ).extractRawText({ arrayBuffer: buffer });

  const text = res.value.trim();
  const paragraphs = text
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);

  const blocks: TextBlockItem[] = paragraphs.map((p) => ({ text: p, page: 1 }));
  const pages: DocumentPage[] = [
    {
      pageNumber: 1,
      blocks,
      text,
    },
  ];

  return { pages, plainText: text };
}

async function readRtfDocument(file: File): Promise<string> {
  const raw = await file.text();
  const text = raw
    .replace(/\\par[d]?\b/g, "\n")
    .replace(/\\'[0-9a-fA-F]{2}/g, (code) =>
      String.fromCharCode(Number.parseInt(code.slice(2), 16)),
    )
    .replace(/\\[a-zA-Z]+-?\d* ?/g, "")
    .replace(/[{}]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
  return text;
}
