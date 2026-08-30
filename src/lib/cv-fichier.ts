/** Extraction du texte d'un CV côté navigateur. Aucun fichier n'est envoyé au serveur. */

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
    const content = await page.getTextContent();
    pages.push(
      content.items
        .map((it) => ("str" in it ? it.str : ""))
        .join(" ")
        .replace(/\s+/g, " ")
        .trim(),
    );
  }
  const texte = pages.join("\n\n").trim();
  if (texte.length < 50)
    throw new Error(
      "Ce PDF ne contient pas de texte lisible (CV scanné ?). Copiez-collez son contenu.",
    );
  return texte;
}

async function extraireDocx(file: File): Promise<string> {
  const mammoth = await import(
    /* @vite-ignore */ "mammoth/mammoth.browser.js" as string
  );
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
