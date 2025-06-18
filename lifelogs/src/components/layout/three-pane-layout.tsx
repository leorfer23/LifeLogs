import React from "react";
import { cn } from "@/lib/utils";

interface PaneHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function PaneHeader({ children, className }: PaneHeaderProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 border-b border-border bg-card/50",
        className
      )}
    >
      {children}
    </div>
  );
}

interface PaneContentProps {
  children: React.ReactNode;
  className?: string;
}

export function PaneContent({ children, className }: PaneContentProps) {
  return (
    <div className={cn("flex-1 overflow-auto", className)}>{children}</div>
  );
}

interface CanvasPaneProps {
  children: React.ReactNode;
  className?: string;
}

export function CanvasPane({ children, className }: CanvasPaneProps) {
  return (
    <div className={cn("flex flex-col h-full bg-background", className)}>
      {children}
    </div>
  );
}
