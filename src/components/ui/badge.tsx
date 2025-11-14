import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "outline" | "secondary" | "destructive";
}

function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors",
        {
          "bg-blue-100 text-blue-800": variant === "default",
          "border border-gray-300 text-gray-700": variant === "outline",
          "bg-gray-100 text-gray-800": variant === "secondary",
          "bg-red-100 text-red-800": variant === "destructive",
        },
        className
      )}
      {...props}
    />
  );
}

export { Badge };

