"use client";

import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Clock,
  Network,
  Users,
  MapPin,
  Search,
  Plus,
  Settings,
  Archive,
} from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  onClick?: () => void;
  badge?: string | number;
  isActive?: boolean;
  shortcut?: string;
}

const defaultNavigationItems: NavigationItem[] = [
  {
    id: "timeline",
    label: "Timeline",
    icon: <Clock className="h-4 w-4" />,
    shortcut: "⌘T",
  },
  {
    id: "memory-graph",
    label: "Memory Graph",
    icon: <Network className="h-4 w-4" />,
    shortcut: "⌘G",
  },
  {
    id: "people",
    label: "People",
    icon: <Users className="h-4 w-4" />,
    shortcut: "⌘P",
  },
  {
    id: "places",
    label: "Places",
    icon: <MapPin className="h-4 w-4" />,
    shortcut: "⌘L",
  },
  {
    id: "search",
    label: "Search",
    icon: <Search className="h-4 w-4" />,
    shortcut: "⌘F",
  },
];

const secondaryNavigationItems: NavigationItem[] = [
  {
    id: "archive",
    label: "Archive",
    icon: <Archive className="h-4 w-4" />,
  },
  {
    id: "settings",
    label: "Settings",
    icon: <Settings className="h-4 w-4" />,
  },
];

interface SidebarAtlasProps {
  navigationItems?: NavigationItem[];
  secondaryItems?: NavigationItem[];
  activeItemId?: string;
  onItemClick?: (item: NavigationItem) => void;
  className?: string;
  showCreateButton?: boolean;
  onCreateClick?: () => void;
}

export function SidebarAtlas({
  navigationItems = defaultNavigationItems,
  secondaryItems = secondaryNavigationItems,
  activeItemId,
  onItemClick,
  className,
  showCreateButton = true,
  onCreateClick,
}: SidebarAtlasProps) {
  const handleItemClick = (item: NavigationItem) => {
    if (item.onClick) {
      item.onClick();
    } else if (onItemClick) {
      onItemClick(item);
    }
  };

  return (
    <div className={cn("flex flex-col h-full bg-sidebar", className)}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        <div>
          <h1 className="text-sm font-semibold text-sidebar-foreground">
            Atlas
          </h1>
          <p className="text-xs text-sidebar-foreground/60">
            Navigate your memories
          </p>
        </div>
        {showCreateButton && (
          <Button
            size="sm"
            variant="outline"
            onClick={onCreateClick}
            className="h-8 w-8 p-0 border-sidebar-border hover:bg-sidebar-accent"
          >
            <Plus className="h-4 w-4" />
            <span className="sr-only">Create new memory</span>
          </Button>
        )}
      </div>

      {/* Main Navigation */}
      <div className="flex-1 overflow-y-auto">
        <nav className="p-2 space-y-1">
          {navigationItems.map((item) => (
            <NavigationButton
              key={item.id}
              item={item}
              isActive={activeItemId === item.id}
              onClick={() => handleItemClick(item)}
            />
          ))}
        </nav>

        {/* Secondary Navigation */}
        {secondaryItems && secondaryItems.length > 0 && (
          <div className="border-t border-sidebar-border mt-4 pt-4">
            <nav className="px-2 space-y-1">
              {secondaryItems.map((item) => (
                <NavigationButton
                  key={item.id}
                  item={item}
                  isActive={activeItemId === item.id}
                  onClick={() => handleItemClick(item)}
                  variant="secondary"
                />
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/40 text-center">
          Press{" "}
          <kbd className="px-1 py-0.5 text-xs font-mono bg-sidebar-accent rounded">
            ⌘K
          </kbd>{" "}
          for commands
        </div>
      </div>
    </div>
  );
}

interface NavigationButtonProps {
  item: NavigationItem;
  isActive?: boolean;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}

function NavigationButton({
  item,
  isActive = false,
  onClick,
  variant = "primary",
}: NavigationButtonProps) {
  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={onClick}
      className={cn(
        "w-full justify-start gap-3 h-9 px-3 font-normal",
        "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        "transition-all duration-200 ease-out",
        isActive && [
          "bg-sidebar-primary text-sidebar-primary-foreground",
          "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground",
          "shadow-sm",
        ],
        variant === "secondary" && [
          "text-sidebar-foreground/70 hover:text-sidebar-foreground",
          isActive && "bg-sidebar-accent text-sidebar-accent-foreground",
        ]
      )}
    >
      <span className="flex items-center justify-center">{item.icon}</span>

      <span className="flex-1 text-left truncate">{item.label}</span>

      <div className="flex items-center gap-2">
        {item.badge && (
          <span
            className={cn(
              "text-xs px-1.5 py-0.5 rounded-full font-medium",
              "bg-sidebar-accent text-sidebar-accent-foreground",
              isActive &&
                "bg-sidebar-primary-foreground/20 text-sidebar-primary-foreground"
            )}
          >
            {item.badge}
          </span>
        )}

        {item.shortcut && (
          <kbd
            className={cn(
              "text-xs font-mono px-1.5 py-0.5 rounded border",
              "bg-sidebar-background border-sidebar-border text-sidebar-foreground/60",
              isActive &&
                "bg-sidebar-primary-foreground/10 border-sidebar-primary-foreground/20"
            )}
          >
            {item.shortcut}
          </kbd>
        )}
      </div>
    </Button>
  );
}

// Export individual components for flexibility
export { NavigationButton };
