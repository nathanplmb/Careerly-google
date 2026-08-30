import type { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

const TAILLES = {
  sm: "sm:max-w-md",
  md: "sm:max-w-lg",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-3xl",
} as const;

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  children: ReactNode;
  footer?: ReactNode;
  size?: keyof typeof TAILLES;
  className?: string;
  bodyClassName?: string;
};

/** Fenêtre centrale Careerly : en-tête fixe, contenu défilant, actions en bas. */
export function CenterModal({
  open,
  onOpenChange,
  title,
  description,
  children,
  footer,
  size = "lg",
  className,
  bodyClassName,
}: Props) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={cn(
          "flex max-h-[88svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border-border/60 bg-card/95 p-0 shadow-[0_40px_120px_-40px_rgba(0,0,0,0.8)] backdrop-blur-2xl",
          TAILLES[size],
          className,
        )}
      >
        <DialogHeader className="shrink-0 space-y-1 border-b border-border/50 px-5 py-4 pr-12 text-left sm:px-6">
          <DialogTitle className="text-base sm:text-lg">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="truncate">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-5 py-5 sm:px-6",
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-border/50 bg-background/40 px-5 py-3.5 sm:px-6">
            {footer}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
