"use client";

import React, { useState } from "react";
import {
  ThreePaneLayout,
  IndexPane,
  CanvasPane,
  PaneHeader,
  PaneContent,
} from "@/components/layout/three-pane-layout";
import {
  SidebarAtlas,
  NavigationItem,
} from "@/components/navigation/sidebar-atlas";
import { ContextualIndex } from "@/components/navigation/contextual-index";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Calendar,
  Clock,
  Heart,
  MessageCircle,
  MapPin,
} from "lucide-react";

export default function TestThreePanePage() {
  const [activeNavItem, setActiveNavItem] = useState("timeline");

  const handleNavigationClick = (item: NavigationItem) => {
    setActiveNavItem(item.id);
    console.log("Navigation clicked:", item.label);
  };

  const handleCreateClick = () => {
    console.log("Create new memory clicked");
  };

  return (
    <ThreePaneLayout
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
          onPlaceSelect={(place) => console.log("Place selected:", place.name)}
        />
      }
      canvas={
        <CanvasPane>
          <PaneHeader>
            <div className="flex items-center justify-between w-full">
              <div>
                <h1 className="text-lg font-semibold">Team Meeting Notes</h1>
                <p className="text-sm text-muted-foreground">
                  November 15, 2024 • 2:30 PM
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
            <div className="prose prose-sm max-w-none">
              <h2>Q4 Planning Discussion</h2>
              <p>
                Today we discussed our priorities for the fourth quarter and
                outlined the key initiatives that will drive our product
                forward.
              </p>

              <h3>Key Decisions Made</h3>
              <ul>
                <li>Focus on improving user onboarding experience</li>
                <li>Implement advanced search functionality</li>
                <li>Enhance mobile responsiveness</li>
                <li>Prepare for annual performance reviews</li>
              </ul>

              <h3>Action Items</h3>
              <ul>
                <li>
                  <strong>Sarah:</strong> Create user journey maps by next
                  Friday
                </li>
                <li>
                  <strong>Mike:</strong> Research search implementation options
                </li>
                <li>
                  <strong>Team:</strong> Complete mobile audit by end of month
                </li>
              </ul>

              <h3>Next Steps</h3>
              <p>
                We&apos;ll reconvene next week to review Sarah&apos;s user
                journey maps and discuss the technical implementation details
                for the search feature.
              </p>
            </div>
          </PaneContent>
        </CanvasPane>
      }
    />
  );
}
