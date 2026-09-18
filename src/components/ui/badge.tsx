import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium backdrop-blur-md transition-all select-none shadow-[inset_0_1px_0_rgba(255,255,255,0.12)]",
  {
    variants: {
      variant: {
        default: "border-primary/30 bg-primary/20 text-primary shadow-[0_0_10px_rgba(216,26,69,0.2)]",
        vibrant: "border-primary/40 bg-primary/25 text-white shadow-[0_0_12px_rgba(216,26,69,0.3)]",
        secondary: "border-white/10 bg-white/8 text-secondary-foreground",
        bordeaux: "border-[#780328]/40 bg-[#780328]/25 text-[#FEC9D5]",
        soft: "border-white/10 bg-white/5 text-muted-foreground",
        destructive: "border-destructive/30 bg-destructive/15 text-destructive",
        outline: "border-white/15 text-foreground bg-transparent",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends
    React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
