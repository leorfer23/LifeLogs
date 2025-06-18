"use client";

import React from "react";
import { ResizableThreePaneLayout } from "@/components/layout/resizable-three-pane-layout";
import {
  SidebarAtlas,
  NavigationItem,
} from "@/components/navigation/sidebar-atlas";
import { ContextualIndex } from "@/components/navigation/contextual-index";

interface AppLayoutProps {
  children: React.ReactNode;
}

export function AppLayout({ children }: AppLayoutProps) {
  const handleNavigationClick = (item: NavigationItem) => {
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
    console.log("Panes resized:", sizes);
  };

  return (
    <ResizableThreePaneLayout
      initialAtlasWidth={280}
      initialIndexWidth={320}
      onPaneResize={handlePaneResize}
      cacheKey="lifelogs-main-layout"
      enableCache={true}
      atlas={
        <SidebarAtlas
          activeItemId="timeline"
          onItemClick={handleNavigationClick}
          onCreateClick={handleCreateClick}
        />
      }
      index={
        <ContextualIndex
          activeView="timeline"
          onMemorySelect={(memory) =>
            console.log("Memory selected:", memory.title)
          }
          onPersonSelect={(person) =>
            console.log("Person selected:", person.name)
          }
          onPlaceSelect={(place) => console.log("Place selected:", place.name)}
        />
      }
      canvas={children}
    />
  );
}
