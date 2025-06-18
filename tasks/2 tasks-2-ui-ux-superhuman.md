## Relevant Files

- `src/components/ui/command-palette.tsx` - Main command palette component inspired by Superhuman's speed (Cmd+K/Cmd+J)
- `src/components/ui/command-palette.test.tsx` - Unit tests for command palette functionality
- `src/components/layout/three-pane-layout.tsx` - Core three-pane layout (Atlas, Index, Canvas) with flexible pane configuration
- `src/components/layout/resizable-three-pane-layout.tsx` - Enhanced layout with drag handles, snap positions, and interactive resizing
- `src/components/navigation/sidebar-atlas.tsx` - Professional sidebar navigation for Atlas pane with keyboard shortcuts and badges
- `src/components/navigation/contextual-index.tsx` - Dynamic index component with Timeline, People, Places, Memory Graph, and Search views
- `src/app/test-three-pane/page.tsx` - Demo page showcasing the three-pane layout with fully interactive contextual navigation
- `src/app/test-resizable-layout/page.tsx` - Advanced demo with resizable panes, preset controls, and live size monitoring
- `src/components/layout/three-pane-layout.test.tsx` - Unit tests for layout component
- `src/components/memory/memory-canvas.tsx` - Main memory canvas component with hybrid doc/canvas modes
- `src/components/memory/memory-canvas.test.tsx` - Unit tests for memory canvas
- `src/components/memory/memory-blocks.tsx` - Notion-style content blocks system
- `src/components/memory/memory-blocks.test.tsx` - Unit tests for content blocks
- `src/components/navigation/sidebar-atlas.tsx` - Left sidebar navigation (Atlas)
- `src/components/navigation/sidebar-atlas.test.tsx` - Unit tests for sidebar navigation
- `src/components/graph/memory-graph.tsx` - Obsidian-inspired graph visualization
- `src/components/graph/memory-graph.test.tsx` - Unit tests for graph component
- `src/hooks/useKeyboardShortcuts.ts` - Custom hook for keyboard-first navigation
- `src/hooks/useKeyboardShortcuts.test.ts` - Unit tests for keyboard shortcuts
- `src/lib/animations.ts` - Spring physics animation configurations and utilities for Framer Motion
- `src/lib/animations.test.ts` - Unit tests for animation utilities
- `src/lib/theme.ts` - Theme provider and utilities for light/dark mode system
- `src/components/ui/theme-toggle.tsx` - Theme toggle component with dropdown menu
- `src/components/ui/dropdown-menu.tsx` - Dropdown menu component for theme selection
- `src/styles/globals.css` - Global styles with design system tokens, layout utilities, and theme colors
- `src/styles/components.css` - Component-specific styles following design philosophy
- `src/app/layout.tsx` - Root layout with theme provider and font configuration
- `src/app/page.tsx` - Updated homepage using new font system
- `src/app/test-layouts/page.tsx` - Demo page showcasing CSS Grid, Flexbox, and Container Query utilities
- `src/app/test-animations/page.tsx` - Demo page showcasing spring physics animations and interactions
- `src/app/test-theme/page.tsx` - Demo page showcasing the complete theme system with light/dark mode
- `src/app/test-hover/page.tsx` - Demo page showcasing enhanced hover states and lift effects
- `src/app/test-icons/page.tsx` - Demo page showcasing consistent icon system and interactive elements

### Notes

- Unit tests should typically be placed alongside the code files they are testing
- Use `npx jest [optional/path/to/test/file]` to run tests
- Focus on keyboard accessibility and speed in all components
- Follow the design philosophy: Speed First, Keyboard-Driven, Focus Mode, iOS Desktop Feel, Spatial Memory
- Visit `/test-layouts` to see the layout system in action
- Visit `/test-animations` to see the spring physics animation system
- Visit `/test-theme` to see the complete theme system with warm grays and vibrant accent colors
- Visit `/test-hover` to see enhanced hover states with soft glowing shadows and subtle lift effects
- Visit `/test-icons` to see the comprehensive icon system with consistent sizing and interactive elements

## Tasks

- [x] 1.0 Setup Core UI Foundation & Design System

  - [x] 1.1 Install and configure shadcn/ui v2, Radix UI primitives, Framer Motion 11, @use-gesture/react, Lucide React, and Heroicons v2
  - [x] 1.2 Create design system tokens in `src/styles/globals.css` (colors, typography, spacing, shadows, border radius)
  - [x] 1.3 Configure Inter and SF Pro fonts with system fallbacks
  - [x] 1.4 Set up CSS Grid and Flexbox base classes with Container Queries support
  - [x] 1.5 Create base animation configurations in `src/lib/animations.ts` using spring physics (not timers)
  - [x] 1.6 Implement light/dark mode system with warm grays and vibrant accent colors
  - [x] 1.7 Create hover states with soft glowing shadows and subtle lift effects
  - [x] 1.8 Set up consistent icon system and ensure all interactive elements have proper hover feedback

- [ ] 2.0 Implement Command Palette & Keyboard Navigation

  - [ ] 2.1 Create `src/components/ui/command-palette.tsx` with sleek bottom bar appearance (Cmd+K/Cmd+J triggers)
  - [ ] 2.2 Implement real-time search with fuzzy matching and smart suggestions
  - [ ] 2.3 Add command categories: Navigation ("Go to Japan Trip"), Creation ("New Memory: Lunch with Sarah"), Actions ("Add map", "Apply template")
  - [ ] 2.4 Create `src/hooks/useKeyboardShortcuts.ts` for global keyboard shortcuts (Cmd+Enter save, Cmd+Shift+S search)
  - [ ] 2.5 Implement context-aware commands that change based on current view/selection
  - [ ] 2.6 Add command palette animations with spring physics entrance/exit
  - [ ] 2.7 Create keyboard navigation within palette (arrow keys, tab navigation)
  - [ ] 2.8 Add voice input support for dictation through command palette

- [ ] 3.0 Build Three-Pane Layout Architecture

  - [x] 3.1 Create `src/components/layout/three-pane-layout.tsx` with Atlas (left), Index (middle), Canvas (right) structure
  - [x] 3.2 Implement `src/components/navigation/sidebar-atlas.tsx` with icons for Timeline, Memory Graph, People, Places, Search
  - [x] 3.3 Build contextual Index pane that updates based on Atlas selection (chronological lists, person-filtered memories, etc.)
  - [x] 3.4 Add pane resizing functionality with drag handles and snap positions
  - [ ] 3.5 Implement responsive behavior for tablet/mobile with collapsible panes
  - [ ] 3.6 Create smooth transitions between different Atlas selections
  - [ ] 3.7 Add spatial memory with consistent layouts users can memorize
  - [ ] 3.8 Implement focus states and keyboard navigation between panes

- [ ] 4.0 Create Memory Canvas with Hybrid Doc/Canvas Modes

  - [ ] 4.1 Build base `src/components/memory/memory-canvas.tsx` with Document mode as default
  - [ ] 4.2 Implement Notion-style `/` commands in `src/components/memory/memory-blocks.tsx` (text, headings, lists, images, etc.)
  - [ ] 4.3 Create Canvas mode toggle that transforms linear document into free-form 2D space
  - [ ] 4.4 Add drag-and-drop functionality for moving, resizing, and layering blocks in Canvas mode
  - [ ] 4.5 Implement cover image, title/icon, and metadata bar (date, people, location, weather)
  - [ ] 4.6 Create advanced content blocks: Web bookmarks with rich previews, interactive maps, mood trackers, habit logs
  - [ ] 4.7 Add template system with gallery of pre-designed templates (Daily Reflection, Trip Planner, etc.)
  - [ ] 4.8 Implement stickers and inserts system for digital scrapbooking elements
  - [ ] 4.9 Create comment system with Figma-style pins and sidebar threads
  - [ ] 4.10 Add infinite zoom and pan functionality for Canvas mode

- [ ] 5.0 Develop Memory Graph Visualization System
  - [ ] 5.1 Create `src/components/graph/memory-graph.tsx` with dark mode constellation view (memories as glowing stars)
  - [ ] 5.2 Implement node sizing based on connections and content (bigger stars = more connections)
  - [ ] 5.3 Create nebula clusters for themes (#travel, #work, #family) that group related memories
  - [ ] 5.4 Add cinematic zoom transitions when clicking on clusters (fly through void animation)
  - [ ] 5.5 Implement three view modes: Graph (constellation), Timeline (vertical scroll), Map (geographic pins)
  - [ ] 5.6 Create interactive node selection with hover effects and connection highlighting
  - [ ] 5.7 Add search and filter functionality within graph view
  - [ ] 5.8 Implement physics-based node positioning with spring animations for organic movement
  - [ ] 5.9 Create connection threads that visually link related memories with glowing lines
  - [ ] 5.10 Add graph navigation controls (zoom, pan, reset view, mini-map)
