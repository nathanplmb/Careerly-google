import { useState, useRef } from "react";
import { UploadCloud, FileText, ArrowRight, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ACCEPTED_CV_TYPES } from "@/lib/cv-import/document";

interface CvUploadProps {
  onFileSelected: (file: File) => void;
  disabled?: boolean;
}

export function CvUpload({ onFileSelected, disabled }: CvUploadProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    setError(null);
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx", "txt", "rtf", "md"].includes(ext || "")) {
      setError("Format non pris en charge. Veuillez sélectionner un fichier PDF ou DOCX.");
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

  const handleStartAnalysis = () => {
    if (selectedFile) {
      onFileSelected(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-1.5">
        <h2 className="text-xl font-bold tracking-tight text-foreground">
          Importer mon CV
        </h2>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Déposez votre CV pour importer automatiquement les informations réellement présentes dans votre document.
        </p>
      </div>

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
          accept={ACCEPTED_CV_TYPES}
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

      {error && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-red-500/10 border border-red-500/30 text-xs text-red-400">
          <AlertCircle className="size-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

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
              handleStartAnalysis();
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
  );
}
