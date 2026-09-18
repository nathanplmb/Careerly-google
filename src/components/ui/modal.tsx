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
  "2xl": "sm:max-w-5xl",
  "7xl": "sm:max-w-7xl",
  full: "sm:max-w-[96vw]",
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

/** Fenêtre centrale NACORA : en-tête fixe, contenu défilant, actions en bas. */
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
          "flex max-h-[88svh] w-[calc(100vw-1.5rem)] flex-col gap-0 overflow-hidden rounded-3xl border border-white/15 bg-card/90 p-0 shadow-[0_32px_90px_-20px_rgba(0,0,0,0.75),inset_0_1px_0_rgba(255,255,255,0.18)] backdrop-blur-3xl",
          TAILLES[size],
          className,
        )}
      >
        <DialogHeader className="shrink-0 space-y-1 border-b border-white/10 px-6 py-4.5 pr-14 text-left sm:px-7">
          <DialogTitle className="text-base sm:text-lg font-semibold tracking-tight">{title}</DialogTitle>
          {description ? (
            <DialogDescription className="truncate text-xs sm:text-sm text-muted-foreground">
              {description}
            </DialogDescription>
          ) : null}
        </DialogHeader>

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto px-6 py-6 sm:px-7",
            bodyClassName,
          )}
        >
          {children}
        </div>

        {footer ? (
          <div className="shrink-0 border-t border-white/10 bg-white/5 dark:bg-white/5 backdrop-blur-md px-6 py-4 sm:px-7">
            {footer}
          </div>
        ) : null}
      </DialogContent>
    </Dialog>
  );
}
