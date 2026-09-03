import { useState, useRef } from "react";
import {
  UploadCloud,
  FileText,
  ArrowRight,
  AlertCircle,
  ClipboardType,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export const ACCEPTED_CV_EXTENSIONS = ".pdf,.docx,.txt,.md,.rtf";

interface CvUploadProps {
  onFileSelected: (file: File) => void;
  onTextSelected: (text: string) => void;
  disabled?: boolean;
}

export function CvUpload({
  onFileSelected,
  onTextSelected,
  disabled,
}: CvUploadProps) {
  const [activeTab, setActiveTab] = useState<"file" | "text">("file");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [pastedText, setPastedText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx", "txt", "rtf", "md"].includes(ext || "")) {
      setError(
        "Format non pris en charge. Veuillez sélectionner un fichier PDF, DOCX ou TXT.",
      );
      return;
    }
    if (file.size > 20 * 1024 * 1024) {
      setError("Le fichier dépasse la taille maximale autorisée (20 Mo).");
      return;
    }
    setSelectedFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleStartFileAnalysis = () => {
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  const handleStartTextAnalysis = () => {
    const trimmed = pastedText.trim();
    if (trimmed.length < 40) {
      setError(
        "Le texte collé est trop court pour être analysé (minimum 40 caractères).",
      );
      return;
    }
    setError(null);
    onTextSelected(trimmed);
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Importer mon CV
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Déposez votre CV ou collez son texte pour en extraire fidèlement
          toutes les informations.
        </p>
      </div>

      {/* Sélecteur de mode : Importer un fichier OU Coller le texte */}
      <div className="flex items-center justify-center">
        <div className="inline-flex p-1 rounded-xl bg-card border border-border/60 shadow-sm">
          <button
            type="button"
            onClick={() => {
              setActiveTab("file");
              setError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "file"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <UploadCloud className="size-4" />
            <span>Importer un fichier</span>
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveTab("text");
              setError(null);
            }}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-lg transition-all ${
              activeTab === "text"
                ? "bg-purple-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardType className="size-4" />
            <span>Coller le texte</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {activeTab === "file" ? (
        <div className="space-y-4">
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={() => inputRef.current?.click()}
            className={`relative flex flex-col items-center justify-center p-8 rounded-2xl border-2 border-dashed transition-all cursor-pointer ${
              isDragging
                ? "border-purple-500 bg-purple-500/10 scale-[0.99]"
                : "border-border/80 bg-card/50 hover:bg-card hover:border-purple-500/50"
            } ${disabled ? "opacity-50 pointer-events-none" : ""}`}
          >
            <input
              ref={inputRef}
              type="file"
              accept={ACCEPTED_CV_EXTENSIONS}
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleFile(f);
              }}
            />

            <div className="size-14 rounded-2xl bg-purple-500/10 text-purple-400 flex items-center justify-center mb-4 border border-purple-500/20 shadow-inner">
              <UploadCloud className="size-7" />
            </div>

            <p className="text-sm font-semibold text-foreground mb-1">
              Glissez-déposez votre CV ici, ou{" "}
              <span className="text-purple-400 underline underline-offset-4">
                parcourez vos fichiers
              </span>
            </p>
            <p className="text-xs text-muted-foreground">
              Formats acceptés : PDF ou DOCX (Max 20 Mo)
            </p>
          </div>

          {selectedFile && (
            <div className="flex items-center justify-between p-4 rounded-xl bg-card border border-purple-500/30 shadow-sm animate-in fade-in slide-in-from-bottom-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="size-10 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0">
                  <FileText className="size-5" />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {selectedFile.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {(selectedFile.size / (1024 * 1024)).toFixed(2)} Mo •{" "}
                    {selectedFile.name.split(".").pop()?.toUpperCase()}
                  </p>
                </div>
              </div>

              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  handleStartFileAnalysis();
                }}
                disabled={disabled}
                className="bg-purple-600 hover:bg-purple-500 text-white gap-2 text-xs font-semibold px-4 shadow-lg shadow-purple-600/20"
              >
                <span>Analyser mon CV</span>
                <ArrowRight className="size-4" />
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-4">
          <div className="relative">
            <Textarea
              rows={10}
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Collez ici l'intégralité du texte de votre CV (coordonnées, expériences professionnelles, formations, compétences, langues, certifications, etc.)..."
              className="resize-none font-mono text-xs bg-card/60 border-border/80 p-4 focus-visible:ring-purple-500"
              disabled={disabled}
            />
            <div className="flex justify-between items-center mt-2 px-1 text-xs text-muted-foreground">
              <span>{pastedText.length} caractères</span>
              <span>Minimum 40 caractères requis</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button
              onClick={handleStartTextAnalysis}
              disabled={disabled || pastedText.trim().length < 40}
              className="bg-purple-600 hover:bg-purple-500 text-white gap-2 text-xs font-semibold px-5 shadow-lg shadow-purple-600/20"
            >
              <span>Analyser ce texte</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
