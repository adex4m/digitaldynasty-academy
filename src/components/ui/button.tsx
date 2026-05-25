import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-[4px] font-sans font-medium ring-offset-background transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-[#49228C] text-white hover:bg-[#7B4FBF]",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border-[1.5px] border-[#49228C] text-[#49228C] bg-transparent hover:bg-[#49228C] hover:text-white",
        secondary: "bg-[#EDE5F8] text-[#49228C] hover:bg-[#e2d5f3]",
        ghost: "hover:bg-[#EDE5F8] hover:text-[#49228C]",
        link: "text-[#49228C] underline-offset-4 hover:underline",
        // DDI Custom Variants — flat About style
        hero: "bg-[#49228C] text-white hover:bg-[#7B4FBF]",
        "hero-outline": "border-[1.5px] border-white/35 text-white bg-transparent hover:border-white/70",
        course: "bg-[#49228C] text-white hover:bg-[#7B4FBF]",
      },
      size: {
        default: "h-11 px-6 py-2 text-[15px]",
        sm: "h-10 px-4 text-[13px]",
        lg: "h-12 px-7 text-[15px] sm:px-8",
        xl: "h-12 px-6 text-[15px] sm:h-14 sm:px-10 sm:text-[16px]",
        icon: "h-11 w-11 sm:h-10 sm:w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return <Comp className={cn(buttonVariants({ variant, size, className }))} ref={ref} {...props} />;
  },
);
Button.displayName = "Button";

export { Button, buttonVariants };
