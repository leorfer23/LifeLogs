"use client";

import React, {
  ReactNode,
  useState,
  useRef,
  useCallback,
  useEffect,
} from "react";
import { cn } from "@/lib/utils";
import { GripVertical } from "lucide-react";

interface ResizableThreePaneLayoutProps {
  atlas?: ReactNode;
  index?: ReactNode;
  canvas?: ReactNode;
  className?: string;
  initialAtlasWidth?: number;
  initialIndexWidth?: number;
  minAtlasWidth?: number;
  minIndexWidth?: number;
  minCanvasWidth?: number;
  snapPositions?: {
    atlasWidth?: number[];
    indexWidth?: number[];
  };
  onPaneResize?: (sizes: {
    atlasWidth: number;
    indexWidth: number;
    canvasWidth: number;
  }) => void;
  cacheKey?: string; // Unique key for storing layout in localStorage
  enableCache?: boolean; // Whether to enable caching functionality
}

// Snap threshold in pixels
const SNAP_THRESHOLD = 15;

// Default snap positions (in pixels)
const DEFAULT_SNAP_POSITIONS = {
  atlasWidth: [240, 280, 320, 360],
  indexWidth: [280, 320, 380, 440],
};

// Cache utility functions
const getFromCache = (
  key: string
): { atlasWidth: number; indexWidth: number } | null => {
  if (typeof window === "undefined") {
    console.log("🔧 getFromCache: window undefined (SSR)");
    return null;
  }

  try {
    const cached = localStorage.getItem(key);
    console.log("📖 Reading from cache:", key, cached);
    if (cached) {
      const parsed = JSON.parse(cached);
      if (
        typeof parsed.atlasWidth === "number" &&
        typeof parsed.indexWidth === "number"
      ) {
        console.log("✅ Cache loaded successfully:", parsed);
        return parsed;
      } else {
        console.log("❌ Invalid cache format:", parsed);
      }
    } else {
      console.log("📭 No cache found for key:", key);
    }
  } catch (error) {
    console.warn("Failed to parse cached layout:", error);
  }

  return null;
};

const saveToCache = (
  key: string,
  atlasWidth: number,
  indexWidth: number
): void => {
  if (typeof window === "undefined") return;

  try {
    const data = { atlasWidth, indexWidth };
    localStorage.setItem(key, JSON.stringify(data));
    console.log("💾 Saved to cache:", key, data);
  } catch (error) {
    console.warn("Failed to save layout to cache:", error);
  }
};

export function ResizableThreePaneLayout({
  atlas,
  index,
  canvas,
  className,
  initialAtlasWidth = 280,
  initialIndexWidth = 320,
  minAtlasWidth = 240,
  minIndexWidth = 280,
  minCanvasWidth = 400,
  snapPositions = DEFAULT_SNAP_POSITIONS,
  onPaneResize,
  cacheKey = "resizable-three-pane-layout",
  enableCache = true,
}: ResizableThreePaneLayoutProps) {
  // Initialize state with initial values (not cached) to avoid hydration mismatch
  const [atlasWidth, setAtlasWidth] = useState(initialAtlasWidth);
  const [indexWidth, setIndexWidth] = useState(initialIndexWidth);
  const [isHydrated, setIsHydrated] = useState(false);
  const [showSkeleton, setShowSkeleton] = useState(true);
  const hasCacheLoadedRef = useRef(false);

  console.log("🏗️ Component state:", {
    atlasWidth,
    indexWidth,
    isHydrated,
    enableCache,
    cacheKey,
    initialAtlasWidth,
    initialIndexWidth,
  });

  const [isDragging, setIsDragging] = useState<"atlas" | "index" | null>(null);
  const [isSnapping, setIsSnapping] = useState(false);

  // Load cached values after hydration to avoid SSR mismatch
  useEffect(() => {
    if (enableCache && !isHydrated) {
      const cached = getFromCache(cacheKey);
      if (cached) {
        const cachedAtlasWidth = Math.max(cached.atlasWidth, minAtlasWidth);
        const cachedIndexWidth = Math.max(cached.indexWidth, minIndexWidth);

        // IMPORTANT: Update refs immediately so mouse handlers have correct values
        hasCacheLoadedRef.current = true;
        atlasWidthRef.current = cachedAtlasWidth;
        indexWidthRef.current = cachedIndexWidth;

        // Apply cached values - CSS transitions will make it smooth
        setAtlasWidth(cachedAtlasWidth);
        setIndexWidth(cachedIndexWidth);
      }
      setIsHydrated(true);
    }

    // Hide skeleton after brief moment (like Notion)
    const timer = setTimeout(() => {
      setShowSkeleton(false);
    }, 150);

    return () => clearTimeout(timer);
  }, [enableCache, cacheKey, minAtlasWidth, minIndexWidth, isHydrated]);

  // Update internal state when props change (for presets)
  useEffect(() => {
    console.log("🎛️ Props changed, updating to initial values:", {
      initialAtlasWidth,
      initialIndexWidth,
      isHydrated,
      hasCacheLoaded: hasCacheLoadedRef.current,
    });
    // Only update if not using cached values AND cache hasn't been loaded
    if (!enableCache || (!isHydrated && !hasCacheLoadedRef.current)) {
      console.log("✅ Updating to initial props values");
      setAtlasWidth(initialAtlasWidth);
      setIndexWidth(initialIndexWidth);
    } else {
      console.log(
        "🚫 Skipping props update - using cached values or cache already loaded"
      );
    }
  }, [initialAtlasWidth, initialIndexWidth, isHydrated, enableCache]);

  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartRef = useRef<{
    x: number;
    atlasWidth: number;
    indexWidth: number;
  } | null>(null);
  const currentDragRef = useRef<"atlas" | "index" | null>(null);

  // Use refs to store current state to avoid stale closures
  const atlasWidthRef = useRef(atlasWidth);
  const indexWidthRef = useRef(indexWidth);
  const isSnappingRef = useRef(false);

  // Update refs when state changes
  useEffect(() => {
    atlasWidthRef.current = atlasWidth;
    console.log("📍 atlasWidthRef updated to:", atlasWidth);
  }, [atlasWidth]);

  useEffect(() => {
    indexWidthRef.current = indexWidth;
    console.log("📍 indexWidthRef updated to:", indexWidth);
  }, [indexWidth]);

  useEffect(() => {
    isSnappingRef.current = isSnapping;
  }, [isSnapping]);

  // Debug: Track state changes
  useEffect(() => {
    console.log(
      "🔄 State changed - atlasWidth:",
      atlasWidth,
      "indexWidth:",
      indexWidth
    );
  }, [atlasWidth, indexWidth]);

  // Calculate canvas width based on container and other panes
  const getCanvasWidth = useCallback(
    (
      containerWidth: number,
      currentAtlasWidth: number,
      currentIndexWidth: number
    ) => {
      return Math.max(
        containerWidth - currentAtlasWidth - currentIndexWidth,
        minCanvasWidth
      );
    },
    [minCanvasWidth]
  );

  // Snap to nearest snap position
  const snapToPosition = useCallback(
    (value: number, snapPositions: number[]) => {
      for (const snapPos of snapPositions) {
        if (Math.abs(value - snapPos) <= SNAP_THRESHOLD) {
          return snapPos;
        }
      }
      return value;
    },
    []
  );

  // Create stable mouse event handlers using refs
  const mouseMoveHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);
  const mouseUpHandlerRef = useRef<((e: MouseEvent) => void) | null>(null);

  // Create the mouse move handler
  const createMouseMoveHandler = useCallback(() => {
    return (e: MouseEvent) => {
      const currentDrag = currentDragRef.current;
      if (!currentDrag || !dragStartRef.current || !containerRef.current)
        return;

      const deltaX = e.clientX - dragStartRef.current.x;
      const containerWidth = containerRef.current.offsetWidth;
      const currentAtlasWidth = atlasWidthRef.current;

      if (currentDrag === "atlas") {
        let newAtlasWidth = dragStartRef.current.atlasWidth + deltaX;

        // Apply minimum constraint
        newAtlasWidth = Math.max(newAtlasWidth, minAtlasWidth);

        // Apply maximum constraint (leave space for index and canvas)
        const maxAtlasWidth = containerWidth - minIndexWidth - minCanvasWidth;
        newAtlasWidth = Math.min(newAtlasWidth, maxAtlasWidth);

        // Snap to positions
        const snappedWidth = snapToPosition(
          newAtlasWidth,
          snapPositions.atlasWidth || []
        );

        const shouldSnap = snappedWidth !== newAtlasWidth;
        setIsSnapping(shouldSnap);

        if (shouldSnap) {
          newAtlasWidth = snappedWidth;
        }

        setAtlasWidth(newAtlasWidth);

        // Save to cache if enabled and hydrated
        if (enableCache && isHydrated) {
          console.log(
            "💾 Saving atlas width:",
            newAtlasWidth,
            "index:",
            indexWidthRef.current
          );
          saveToCache(cacheKey, newAtlasWidth, indexWidthRef.current);
        } else {
          console.log("🚫 Not saving to cache:", { enableCache, isHydrated });
        }
      } else if (currentDrag === "index") {
        let newIndexWidth = dragStartRef.current.indexWidth + deltaX;

        // Apply minimum constraint
        newIndexWidth = Math.max(newIndexWidth, minIndexWidth);

        // Apply maximum constraint (leave space for atlas and canvas)
        const maxIndexWidth =
          containerWidth - currentAtlasWidth - minCanvasWidth;
        newIndexWidth = Math.min(newIndexWidth, maxIndexWidth);

        // Snap to positions
        const snappedWidth = snapToPosition(
          newIndexWidth,
          snapPositions.indexWidth || []
        );

        const shouldSnap = snappedWidth !== newIndexWidth;
        setIsSnapping(shouldSnap);

        if (shouldSnap) {
          newIndexWidth = snappedWidth;
        }

        setIndexWidth(newIndexWidth);

        // Save to cache if enabled and hydrated
        if (enableCache && isHydrated) {
          console.log(
            "💾 Saving index width:",
            newIndexWidth,
            "atlas:",
            atlasWidthRef.current
          );
          saveToCache(cacheKey, atlasWidthRef.current, newIndexWidth);
        } else {
          console.log("🚫 Not saving to cache:", { enableCache, isHydrated });
        }
      }
    };
  }, [
    snapToPosition,
    snapPositions,
    minAtlasWidth,
    minIndexWidth,
    minCanvasWidth,
    enableCache,
    cacheKey,
    isHydrated,
  ]);

  // Create the mouse up handler
  const createMouseUpHandler = useCallback(() => {
    return () => {
      console.log("Mouse up - ending drag");

      // Only proceed if we're actually dragging
      if (!currentDragRef.current) return;

      setIsDragging(null);
      setIsSnapping(false);
      currentDragRef.current = null;
      dragStartRef.current = null;

      // Clean up event listeners
      if (mouseMoveHandlerRef.current) {
        document.removeEventListener("mousemove", mouseMoveHandlerRef.current);
        mouseMoveHandlerRef.current = null;
      }
      if (mouseUpHandlerRef.current) {
        document.removeEventListener("mouseup", mouseUpHandlerRef.current);
        mouseUpHandlerRef.current = null;
      }

      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.body.style.pointerEvents = "";

      // Save final positions to cache
      if (enableCache && isHydrated) {
        const currentAtlasWidth = atlasWidthRef.current;
        const currentIndexWidth = indexWidthRef.current;
        console.log("💾 Final save on mouse up:", {
          currentAtlasWidth,
          currentIndexWidth,
        });
        saveToCache(cacheKey, currentAtlasWidth, currentIndexWidth);
      } else {
        console.log("🚫 Not saving final positions:", {
          enableCache,
          isHydrated,
        });
      }

      // Notify parent of resize
      if (onPaneResize && containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const currentAtlasWidth = atlasWidthRef.current;
        const currentIndexWidth = indexWidthRef.current;

        onPaneResize({
          atlasWidth: currentAtlasWidth,
          indexWidth: currentIndexWidth,
          canvasWidth: getCanvasWidth(
            containerWidth,
            currentAtlasWidth,
            currentIndexWidth
          ),
        });
      }
    };
  }, [onPaneResize, getCanvasWidth, enableCache, cacheKey, isHydrated]);

  // Handle mouse down on resize handles
  const handleMouseDown = useCallback(
    (e: React.MouseEvent, handle: "atlas" | "index") => {
      e.preventDefault();
      e.stopPropagation();
      console.log("Mouse down on handle:", handle);

      setIsDragging(handle);
      currentDragRef.current = handle;

      dragStartRef.current = {
        x: e.clientX,
        atlasWidth: atlasWidthRef.current,
        indexWidth: indexWidthRef.current,
      };

      // Create fresh handlers
      mouseMoveHandlerRef.current = createMouseMoveHandler();
      mouseUpHandlerRef.current = createMouseUpHandler();

      // Add event listeners with the fresh handlers
      document.addEventListener("mousemove", mouseMoveHandlerRef.current, {
        passive: false,
      });
      document.addEventListener("mouseup", mouseUpHandlerRef.current, {
        passive: false,
      });

      // Prevent text selection and set cursor
      document.body.style.cursor = "col-resize";
      document.body.style.userSelect = "none";
      document.body.style.pointerEvents = "none";
    },
    [createMouseMoveHandler, createMouseUpHandler]
  );

  // Cleanup event listeners on unmount
  useEffect(() => {
    return () => {
      if (mouseMoveHandlerRef.current) {
        document.removeEventListener("mousemove", mouseMoveHandlerRef.current);
      }
      if (mouseUpHandlerRef.current) {
        document.removeEventListener("mouseup", mouseUpHandlerRef.current);
      }
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      document.body.style.pointerEvents = "";
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "flex h-screen w-full overflow-hidden bg-background relative",
        className
      )}
    >
      {/* Atlas Pane - Left Navigation */}
      <div
        className={cn(
          "flex flex-col bg-sidebar border-r border-sidebar-border overflow-hidden",
          "transition-all duration-200 ease-out",
          isDragging === "atlas" && "transition-none"
        )}
        style={{
          width: `${atlasWidth}px`,
          minWidth: `${minAtlasWidth}px`,
          flexShrink: 0,
        }}
      >
        <div className="flex-1 overflow-hidden">
          {showSkeleton ? (
            <div className="p-4 space-y-3">
              <div className="h-6 bg-sidebar-accent rounded animate-pulse"></div>
              <div className="space-y-2">
                <div className="h-4 bg-sidebar-accent/70 rounded w-3/4 animate-pulse"></div>
                <div className="h-4 bg-sidebar-accent/70 rounded w-1/2 animate-pulse"></div>
                <div className="h-4 bg-sidebar-accent/70 rounded w-2/3 animate-pulse"></div>
              </div>
              <div className="pt-4 space-y-2">
                <div className="h-4 bg-sidebar-accent/50 rounded w-5/6 animate-pulse"></div>
                <div className="h-4 bg-sidebar-accent/50 rounded w-3/5 animate-pulse"></div>
              </div>
            </div>
          ) : (
            atlas || (
              <div className="flex items-center justify-center h-full text-sidebar-foreground/60">
                <div className="text-center">
                  <div className="text-sm font-medium">Atlas</div>
                  <div className="text-xs text-sidebar-foreground/40 mt-1">
                    Navigation
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Atlas Resize Handle */}
      <div
        className={cn(
          "w-2 bg-border hover:bg-primary/30 cursor-col-resize flex items-center justify-center",
          "transition-colors duration-200 group relative select-none",
          isDragging === "atlas" && "bg-primary/50",
          isSnapping && isDragging === "atlas" && "bg-primary/70"
        )}
        onMouseDown={(e) => handleMouseDown(e, "atlas")}
        style={{ cursor: isDragging === "atlas" ? "col-resize" : "col-resize" }}
      >
        <div
          className={cn(
            "w-1 h-8 bg-border rounded-full opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200 flex items-center justify-center",
            isDragging === "atlas" && "opacity-100"
          )}
        >
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </div>

        {/* Snap indicator */}
        {isSnapping && isDragging === "atlas" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </div>

      {/* Index Pane - Middle Contextual Lists */}
      <div
        className={cn(
          "flex flex-col bg-card border-r border-border overflow-hidden",
          "transition-all duration-200 ease-out",
          isDragging === "index" && "transition-none"
        )}
        style={{
          width: `${indexWidth}px`,
          minWidth: `${minIndexWidth}px`,
          flexShrink: 0,
        }}
      >
        <div className="flex-1 overflow-hidden">
          {showSkeleton ? (
            <div className="p-4 space-y-4">
              <div className="h-5 bg-muted rounded animate-pulse w-1/3"></div>
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="p-3 border border-border rounded-lg space-y-2 animate-pulse"
                  >
                    <div className="h-4 bg-muted rounded w-3/4"></div>
                    <div className="h-3 bg-muted/70 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            index || (
              <div className="flex items-center justify-center h-full text-foreground/60">
                <div className="text-center">
                  <div className="text-sm font-medium">Index</div>
                  <div className="text-xs text-foreground/40 mt-1">
                    Contextual Lists
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Index Resize Handle */}
      <div
        className={cn(
          "w-2 bg-border hover:bg-primary/30 cursor-col-resize flex items-center justify-center",
          "transition-colors duration-200 group relative select-none",
          isDragging === "index" && "bg-primary/50",
          isSnapping && isDragging === "index" && "bg-primary/70"
        )}
        onMouseDown={(e) => handleMouseDown(e, "index")}
        style={{ cursor: isDragging === "index" ? "col-resize" : "col-resize" }}
      >
        <div
          className={cn(
            "w-1 h-8 bg-border rounded-full opacity-0 group-hover:opacity-100",
            "transition-opacity duration-200 flex items-center justify-center",
            isDragging === "index" && "opacity-100"
          )}
        >
          <GripVertical className="h-3 w-3 text-muted-foreground" />
        </div>

        {/* Snap indicator */}
        {isSnapping && isDragging === "index" && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-primary rounded-full animate-pulse" />
        )}
      </div>

      {/* Canvas Pane - Right Main Content */}
      <div
        className={cn(
          "flex flex-col bg-background overflow-hidden flex-1",
          "transition-all duration-200 ease-out"
        )}
        style={{ minWidth: `${minCanvasWidth}px` }}
      >
        <div className="flex-1 overflow-hidden">
          {showSkeleton ? (
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <div className="h-8 bg-muted rounded animate-pulse w-1/2"></div>
                <div className="h-4 bg-muted/70 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-muted/70 rounded animate-pulse w-1/2"></div>
              </div>
              <div className="space-y-4">
                <div className="h-20 bg-muted rounded-lg animate-pulse"></div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
                  <div className="h-32 bg-muted rounded-lg animate-pulse"></div>
                </div>
              </div>
            </div>
          ) : (
            canvas || (
              <div className="flex items-center justify-center h-full text-foreground/60">
                <div className="text-center">
                  <div className="text-sm font-medium">Canvas</div>
                  <div className="text-xs text-foreground/40 mt-1">
                    Main Content
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>

      {/* Global drag overlay to prevent text selection */}
      {isDragging && (
        <div
          className="absolute inset-0 z-50 cursor-col-resize"
          style={{ pointerEvents: "none" }}
        />
      )}
    </div>
  );
}

// Preset layout configurations
export const LAYOUT_PRESETS = {
  default: { atlasWidth: 280, indexWidth: 320 },
  compact: { atlasWidth: 240, indexWidth: 280 },
  spacious: { atlasWidth: 320, indexWidth: 380 },
  atlasWide: { atlasWidth: 360, indexWidth: 320 },
  indexWide: { atlasWidth: 280, indexWidth: 440 },
};

// Hook for managing layout state
export function useResizableLayout(
  initialPreset: keyof typeof LAYOUT_PRESETS = "default"
) {
  const [currentLayout, setCurrentLayout] = useState(
    LAYOUT_PRESETS[initialPreset]
  );

  const applyPreset = useCallback((preset: keyof typeof LAYOUT_PRESETS) => {
    setCurrentLayout(LAYOUT_PRESETS[preset]);
  }, []);

  const setCustomLayout = useCallback(
    (layout: { atlasWidth: number; indexWidth: number }) => {
      setCurrentLayout(layout);
    },
    []
  );

  return {
    currentLayout,
    applyPreset,
    setCustomLayout,
    presets: LAYOUT_PRESETS,
  };
}
