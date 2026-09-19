import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium cursor-pointer transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-35 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 active:scale-[0.97] select-none",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-b from-[#EC0040] to-[#D81A45] text-white border border-white/25 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 hover:shadow-[0_6px_22px_rgba(216,26,69,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5",
        vibrant:
          "bg-gradient-to-b from-[#EC0040] to-[#D81A45] text-white border border-white/25 shadow-[0_4px_16px_rgba(216,26,69,0.35),inset_0_1px_0_rgba(255,255,255,0.3)] hover:brightness-110 hover:shadow-[0_6px_22px_rgba(216,26,69,0.5),inset_0_1px_0_rgba(255,255,255,0.45)] hover:-translate-y-0.5",
        destructive:
          "bg-destructive/90 text-destructive-foreground border border-destructive/30 shadow-[0_4px_14px_rgba(240,68,56,0.3)] hover:bg-destructive hover:brightness-105 hover:-translate-y-0.5",
        outline:
          "border border-white/10 dark:border-white/10 bg-white/5 dark:bg-white/5 text-foreground backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.12)] hover:bg-white/10 dark:hover:bg-white/10 hover:border-white/20 hover:text-foreground hover:-translate-y-0.5",
        secondary:
          "bg-secondary/70 backdrop-blur-md text-secondary-foreground hover:bg-secondary/90 border border-white/10 shadow-xs hover:-translate-y-0.5",
        bordeaux:
          "bg-[#780328]/35 text-[#FEC9D5] border border-[#780328]/60 backdrop-blur-md hover:bg-[#780328]/50 shadow-xs hover:-translate-y-0.5",
        soft: "bg-primary/15 text-primary hover:bg-primary/25 border border-primary/25 backdrop-blur-md shadow-xs hover:-translate-y-0.5",
        ghost:
          "text-muted-foreground hover:bg-white/8 dark:hover:bg-white/8 hover:text-foreground",
        link: "text-primary underline-offset-4 hover:underline px-0 py-0 h-auto font-medium",
      },
      size: {
        default: "h-9.5 px-4 py-2 text-sm",
        sm: "h-8 rounded-lg px-3 text-xs",
        lg: "h-11 rounded-xl px-6 text-base font-semibold",
        xl: "h-12 rounded-2xl px-7 text-base font-semibold",
        icon: "h-9.5 w-9.5 rounded-xl",
        "icon-sm": "h-8 w-8 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
