import { useState } from "react";
import Markdown from "react-markdown";
import {
  Sparkles,
  User,
  Copy,
  Check,
  AlertCircle,
  RefreshCw,
} from "lucide-react";
import type { ChatMessage } from "@/ai/chat/chat.types";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  onRetry?: () => void;
  userPrenom?: string;
}

export function ChatMessageItem({
  message,
  onRetry,
  userPrenom,
}: ChatMessageItemProps) {
  const isUser = message.role === "user";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  };

  const formattedTime = (() => {
    try {
      const date = new Date(message.timestamp);
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch {
      return "";
    }
  })();

  return (
    <div
      className={cn(
        "group flex w-full gap-3 py-3 px-2 sm:px-4 transition-colors",
        isUser ? "flex-row-reverse" : "flex-row",
      )}
    >
      {/* Avatar */}
      <div
        className={cn(
          "grid size-8 shrink-0 place-items-center rounded-xl text-xs font-bold shadow-xs backdrop-blur-md",
          isUser
            ? "bg-white/15 border border-white/20 text-foreground"
            : "bg-primary/15 border border-primary/30 text-primary",
        )}
      >
        {isUser ? (
          userPrenom ? (
            userPrenom.slice(0, 2).toUpperCase()
          ) : (
            <User className="size-4 text-foreground" />
          )
        ) : (
          <Sparkles className="size-4 text-primary" />
        )}
      </div>

      {/* Bubble Content */}
      <div
        className={cn(
          "flex max-w-[88%] sm:max-w-[80%] flex-col gap-1",
          isUser ? "items-end" : "items-start",
        )}
      >
        <div className="flex items-center gap-2 text-[11px] text-muted-foreground px-1">
          <span className="font-semibold text-foreground">
            {isUser ? userPrenom || "Vous" : "NACORA AI"}
          </span>
          {message.modelUsed && !isUser && (
            <span className="rounded-md bg-white/5 border border-white/10 px-1.5 py-0.2 text-[10px] font-medium text-muted-foreground">
              {message.modelUsed}
            </span>
          )}
          {formattedTime && (
            <span className="text-[10px] text-muted-foreground/70">
              {formattedTime}
            </span>
          )}
        </div>

        <div
          className={cn(
            "relative rounded-2xl px-4.5 py-3.5 text-sm leading-relaxed transition-all",
            isUser
              ? "bg-gradient-to-b from-[#EC0040]/90 to-[#D81A45]/95 text-white border border-white/30 shadow-[0_8px_25px_rgba(216,26,69,0.35),inset_0_1px_1px_rgba(255,255,255,0.4)] backdrop-blur-2xl rounded-tr-xs"
              : message.isError
                ? "bg-red-950/40 border border-red-500/35 text-red-100 rounded-tl-xs backdrop-blur-2xl shadow-md"
                : "glass-card border-white/14 text-foreground rounded-tl-xs shadow-[0_8px_25px_rgba(0,0,0,0.35),inset_0_1px_1px_rgba(255,255,255,0.2)]",
          )}
        >
          {isUser ? (
            <p className="whitespace-pre-wrap break-words">{message.content}</p>
          ) : message.isError ? (
            <div className="flex items-start gap-2">
              <AlertCircle className="size-4 shrink-0 text-destructive mt-0.5" />
              <div className="flex-1">
                <p className="text-xs font-semibold">{message.content}</p>
                {onRetry && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={onRetry}
                    className="mt-2 h-7 gap-1.5 rounded-lg border-destructive/30 text-xs text-destructive hover:bg-destructive/10"
                  >
                    <RefreshCw className="size-3" /> Réessayer
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <div className="prose prose-sm dark:prose-invert max-w-none text-foreground/90 break-words space-y-2 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:list-decimal [&_ol]:pl-5 [&_li]:my-0.5 [&_code]:bg-white/10 [&_code]:border [&_code]:border-white/10 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:rounded-md [&_code]:text-xs [&_pre]:bg-black/40 [&_pre]:border [&_pre]:border-white/10 [&_pre]:p-3 [&_pre]:rounded-xl [&_pre]:overflow-x-auto [&_strong]:font-semibold [&_strong]:text-foreground [&_h1]:text-base [&_h2]:text-sm [&_h3]:text-sm [&_h1]:font-bold [&_h2]:font-bold [&_h3]:font-semibold [&_h1]:text-foreground [&_h2]:text-foreground [&_h3]:text-foreground">
              <Markdown>{message.content}</Markdown>
            </div>
          )}
        </div>

        {/* Action toolbar below message */}
        {!isUser && !message.isError && (
          <div className="flex items-center gap-1 px-1 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="h-6 gap-1 rounded-md px-1.5 text-[11px] text-muted-foreground hover:text-foreground"
            >
              {copied ? (
                <>
                  <Check className="size-3 text-emerald-500" />
                  <span className="text-emerald-500">Copié</span>
                </>
              ) : (
                <>
                  <Copy className="size-3" />
                  <span>Copier</span>
                </>
              )}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
