"use client";

import React, { useState } from "react";
import {
  ResizableThreePaneLayout,
  useResizableLayout,
  LAYOUT_PRESETS,
} from "@/components/layout/resizable-three-pane-layout";
import {
  SidebarAtlas,
  NavigationItem,
} from "@/components/navigation/sidebar-atlas";
import { ContextualIndex } from "@/components/navigation/contextual-index";
import {
  CanvasPane,
  PaneHeader,
  PaneContent,
} from "@/components/layout/three-pane-layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Heart,
  MessageCircle,
  Settings,
  Monitor,
  Maximize2,
  Minimize2,
  RotateCcw,
} from "lucide-react";

export default function TestResizableLayoutPage() {
  const [activeNavItem, setActiveNavItem] = useState("timeline");
  const { currentLayout, applyPreset, setCustomLayout } =
    useResizableLayout("default");
  const [layoutSizes, setLayoutSizes] = useState<{
    atlasWidth: number;
    indexWidth: number;
    canvasWidth: number;
  } | null>(null);

  const handleNavigationClick = (item: NavigationItem) => {
    setActiveNavItem(item.id);
    console.log("Navigation clicked:", item.label);
  };

  const handleCreateClick = () => {
    console.log("Create new memory clicked");
  };

  const handlePaneResize = (sizes: {
    atlasWidth: number;
    indexWidth: number;
    canvasWidth: number;
  }) => {
    setLayoutSizes(sizes);
    console.log("Panes resized:", sizes);
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Control Panel */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card">
        <div className="flex items-center gap-4">
          <h1 className="text-lg font-semibold">Resizable Layout Demo</h1>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Preset Layouts:
            </span>
            {Object.entries(LAYOUT_PRESETS).map(([key, preset]) => (
              <Button
                key={key}
                size="sm"
                variant={currentLayout === preset ? "default" : "outline"}
                onClick={() => applyPreset(key as keyof typeof LAYOUT_PRESETS)}
                className="text-xs"
              >
                {key === "default" && <Monitor className="h-3 w-3 mr-1" />}
                {key === "compact" && <Minimize2 className="h-3 w-3 mr-1" />}
                {key === "spacious" && <Maximize2 className="h-3 w-3 mr-1" />}
                {key === "atlasWide" && <Settings className="h-3 w-3 mr-1" />}
                {key === "indexWide" && <RotateCcw className="h-3 w-3 mr-1" />}
                {key.charAt(0).toUpperCase() + key.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Current Sizes Display */}
        {layoutSizes && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>Atlas: {layoutSizes.atlasWidth}px</span>
            <span>Index: {layoutSizes.indexWidth}px</span>
            <span>Canvas: {layoutSizes.canvasWidth}px</span>
          </div>
        )}
      </div>

      {/* Resizable Layout */}
      <div className="flex-1">
        <ResizableThreePaneLayout
          key={`${currentLayout.atlasWidth}-${currentLayout.indexWidth}`}
          initialAtlasWidth={currentLayout.atlasWidth}
          initialIndexWidth={currentLayout.indexWidth}
          onPaneResize={handlePaneResize}
          atlas={
            <SidebarAtlas
              activeItemId={activeNavItem}
              onItemClick={handleNavigationClick}
              onCreateClick={handleCreateClick}
            />
          }
          index={
            <ContextualIndex
              activeView={activeNavItem}
              onMemorySelect={(memory) =>
                console.log("Memory selected:", memory.title)
              }
              onPersonSelect={(person) =>
                console.log("Person selected:", person.name)
              }
              onPlaceSelect={(place) =>
                console.log("Place selected:", place.name)
              }
            />
          }
          canvas={
            <CanvasPane>
              <PaneHeader>
                <div className="flex items-center justify-between w-full">
                  <div>
                    <h1 className="text-lg font-semibold">
                      Resizable Layout Demo
                    </h1>
                    <p className="text-sm text-muted-foreground">
                      Drag the handles between panes to resize • Snap positions
                      included
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button size="sm" variant="ghost">
                      <MessageCircle className="h-4 w-4" />
                    </Button>
                    <Button size="sm" variant="ghost">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </PaneHeader>
              <PaneContent className="p-6">
                <div className="space-y-6">
                  {/* Feature Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className="p-4">
                      <h3 className="font-semibold text-sm mb-2">
                        🎯 Smart Snapping
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Panes automatically snap to common sizes (240px, 280px,
                        320px, 360px) when you get close while dragging.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold text-sm mb-2">
                        📏 Minimum Widths
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Each pane respects minimum widths to ensure usability.
                        Canvas requires at least 400px for content.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold text-sm mb-2">
                        🎨 Visual Feedback
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Drag handles highlight on hover and show grip icons.
                        Snapping is indicated with pulsing indicators.
                      </p>
                    </Card>

                    <Card className="p-4">
                      <h3 className="font-semibold text-sm mb-2">
                        ⚡ Smooth Animations
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Transitions are disabled during active dragging for
                        performance, then re-enabled for smooth preset changes.
                      </p>
                    </Card>
                  </div>

                  {/* Usage Instructions */}
                  <Card className="p-6">
                    <h3 className="font-semibold mb-3">How to Use</h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          1
                        </span>
                        <div>
                          <strong>Drag to Resize:</strong> Click and drag the
                          thin handles between panes to resize them manually.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          2
                        </span>
                        <div>
                          <strong>Use Presets:</strong> Click the preset buttons
                          above to quickly apply common layout configurations.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          3
                        </span>
                        <div>
                          <strong>Smart Snapping:</strong> When dragging, panes
                          will automatically snap to common sizes when you get
                          close.
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <span className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xs font-medium">
                          4
                        </span>
                        <div>
                          <strong>Monitor Sizes:</strong> Watch the size display
                          in the header to see current pane dimensions.
                        </div>
                      </div>
                    </div>
                  </Card>

                  {/* Current Layout Info */}
                  <Card className="p-4 bg-muted/30">
                    <h4 className="font-medium text-sm mb-2">
                      Current Layout Configuration
                    </h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Atlas Width:
                        </span>
                        <span className="ml-2 font-mono">
                          {currentLayout.atlasWidth}px
                        </span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Index Width:
                        </span>
                        <span className="ml-2 font-mono">
                          {currentLayout.indexWidth}px
                        </span>
                      </div>
                    </div>
                    {layoutSizes && (
                      <div className="mt-2 pt-2 border-t">
                        <span className="text-muted-foreground text-xs">
                          Live Canvas Width:
                        </span>
                        <span className="ml-2 font-mono text-xs">
                          {layoutSizes.canvasWidth}px
                        </span>
                      </div>
                    )}
                  </Card>
                </div>
              </PaneContent>
            </CanvasPane>
          }
        />
      </div>
    </div>
  );
}
