import * as React from "react";
import { cva } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-transparent bg-gray-700 text-white",
        secondary: "border-transparent bg-gray-800 text-gray-300",
        destructive: "border-transparent bg-red-500/20 text-red-500",
        outline: "text-gray-300",
        success: "border-transparent bg-green-500/20 text-green-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

function Badge({ className, variant, ...props }) {
  return (
    <div className={badgeVariants({ variant, className })} {...props} />
  );
}

export { Badge, badgeVariants };