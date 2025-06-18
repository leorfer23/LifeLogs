"use client";

import { useState } from "react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TestLayoutsPage() {
  const [layoutMode, setLayoutMode] = useState<
    "three-pane" | "two-pane" | "single-pane"
  >("three-pane");

  return (
    <div className="min-h-screen bg-background text-foreground font-inter">
      {/* Header */}
      <header className="flex-layout-between p-4 border-b border-border">
        <h1 className="text-heading">Layout System Demo</h1>
        <div className="flex-layout-inline">
          <div className="flex-layout-inline mr-4">
            <button
              onClick={() => setLayoutMode("three-pane")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                layoutMode === "three-pane"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Three Pane
            </button>
            <button
              onClick={() => setLayoutMode("two-pane")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                layoutMode === "two-pane"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Two Pane
            </button>
            <button
              onClick={() => setLayoutMode("single-pane")}
              className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                layoutMode === "single-pane"
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              }`}
            >
              Single Pane
            </button>
          </div>
          <ThemeToggle />
        </div>
      </header>

      {/* Main Layout */}
      <main
        className={`h-[calc(100vh-73px)] ${
          layoutMode === "three-pane"
            ? "grid-layout-three-pane"
            : layoutMode === "two-pane"
            ? "grid-layout-two-pane"
            : "grid-layout-single-pane"
        }`}
      >
        {/* Atlas Pane */}
        {(layoutMode === "three-pane" || layoutMode === "two-pane") && (
          <div className="grid-area-atlas bg-sidebar border-r border-sidebar-border p-4 container-query">
            <div className="flex-layout-column-between h-full">
              <div className="flex-layout-stack">
                <h2 className="text-subheading font-sf-pro">Atlas</h2>
                <div className="flex-layout-stack">
                  <div className="flex-layout-inline">
                    <div className="w-4 h-4 bg-chart-1 rounded-full"></div>
                    <span className="text-body">Timeline</span>
                  </div>
                  <div className="flex-layout-inline">
                    <div className="w-4 h-4 bg-chart-2 rounded-full"></div>
                    <span className="text-body">Memory Graph</span>
                  </div>
                  <div className="flex-layout-inline">
                    <div className="w-4 h-4 bg-chart-3 rounded-full"></div>
                    <span className="text-body">People</span>
                  </div>
                  <div className="flex-layout-inline">
                    <div className="w-4 h-4 bg-chart-4 rounded-full"></div>
                    <span className="text-body">Places</span>
                  </div>
                  <div className="flex-layout-inline">
                    <div className="w-4 h-4 bg-chart-5 rounded-full"></div>
                    <span className="text-body">Search</span>
                  </div>
                </div>
              </div>

              {/* Container Query Demo */}
              <div className="p-3 bg-muted rounded-lg">
                <div className="cq-sm-hide text-caption">
                  Container too small
                </div>
                <div className="cq-sm-show cq-md-hide text-caption">
                  Small container
                </div>
                <div className="cq-md-show cq-lg-hide text-caption">
                  Medium container
                </div>
                <div className="cq-lg-show text-caption">Large container</div>
              </div>
            </div>
          </div>
        )}

        {/* Index Pane */}
        {layoutMode === "three-pane" && (
          <div className="grid-area-index bg-card border-r border-border p-4 container-query">
            <div className="flex-layout-column h-full">
              <h2 className="text-subheading font-sf-pro mb-4">Index</h2>

              {/* Responsive Grid based on container size */}
              <div className="grid gap-3 cq-md-grid-2 cq-lg-grid-3">
                {Array.from({ length: 6 }, (_, i) => (
                  <div key={i} className="p-3 bg-muted rounded-lg">
                    <div className="w-full h-16 bg-primary/20 rounded mb-2"></div>
                    <div className="text-caption">Memory {i + 1}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Canvas Pane */}
        <div className="grid-area-canvas bg-background p-4 overflow-hidden">
          <div className="flex-layout-column h-full">
            <div className="flex-layout-between mb-4">
              <h2 className="text-subheading font-sf-pro">Canvas</h2>
              <div className="flex-layout-inline">
                <button className="px-3 py-1 bg-primary text-primary-foreground rounded-md text-sm font-medium">
                  Document Mode
                </button>
                <button className="px-3 py-1 bg-secondary text-secondary-foreground rounded-md text-sm font-medium">
                  Canvas Mode
                </button>
              </div>
            </div>

            {/* Flex Layout Examples */}
            <div className="flex-1 bg-card rounded-lg p-6 overflow-auto">
              <div className="flex-layout-stack">
                <div className="text-body mb-4">Layout Examples:</div>

                {/* Spatial Grid */}
                <div className="mb-6">
                  <div className="text-caption mb-2">Spatial Grid Layout</div>
                  <div className="layout-spatial-grid">
                    {Array.from({ length: 4 }, (_, i) => (
                      <div key={i} className="p-4 bg-muted rounded-lg">
                        <div className="w-full h-24 bg-accent/20 rounded mb-2"></div>
                        <div className="text-caption">Card {i + 1}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Flex Layouts */}
                <div className="mb-6">
                  <div className="text-caption mb-2">Flex Layout Examples</div>
                  <div className="flex-layout-stack">
                    <div className="flex-layout-between p-3 bg-muted rounded-lg">
                      <span className="text-body">Between</span>
                      <span className="text-body">Layout</span>
                    </div>
                    <div className="flex-layout-center p-3 bg-muted rounded-lg">
                      <span className="text-body">Centered Layout</span>
                    </div>
                    <div className="flex-layout-inline p-3 bg-muted rounded-lg">
                      <div className="w-4 h-4 bg-primary rounded-full"></div>
                      <span className="text-body">Inline Layout</span>
                    </div>
                  </div>
                </div>

                {/* Focus Mode Demo */}
                <div className="mb-6">
                  <div className="text-caption mb-2">Focus Mode Layout</div>
                  <div className="layout-focus-mode bg-muted rounded-lg">
                    <div className="text-body">
                      This content is centered and constrained for focus mode
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
