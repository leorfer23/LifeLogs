/**
 * Animation utilities and variants for Framer Motion
 * Provides consistent animations throughout the LifeLogs application
 */

import { Variants, Transition } from "framer-motion";

// ================================
// SPRING PHYSICS CONFIGURATIONS
// ================================

// Base spring configurations - no duration timers, only physics
export const springs = {
  // Ultra-fast for instant feedback (button presses, hovers)
  ultraFast: {
    type: "spring" as const,
    stiffness: 400,
    damping: 30,
    mass: 0.8,
  },

  // Fast for UI interactions (modal opens, dropdown, tooltips)
  fast: {
    type: "spring" as const,
    stiffness: 300,
    damping: 25,
    mass: 1,
  },

  // Smooth for page transitions and layout changes
  smooth: {
    type: "spring" as const,
    stiffness: 200,
    damping: 20,
    mass: 1.2,
  },

  // Bouncy for playful interactions (success states, notifications)
  bouncy: {
    type: "spring" as const,
    stiffness: 250,
    damping: 15,
    mass: 1,
  },

  // Gentle for subtle animations (focus rings, selection states)
  gentle: {
    type: "spring" as const,
    stiffness: 150,
    damping: 25,
    mass: 1.5,
  },

  // iOS-like spring for that native desktop feel
  ios: {
    type: "spring" as const,
    stiffness: 280,
    damping: 22,
    mass: 1.1,
  },
} as const;

// ================================
// ANIMATION VARIANTS
// ================================

// Fade animations
export const fadeVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: springs.fast,
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    transition: springs.ultraFast,
  },
};

// Slide animations for panels and drawers
export const slideVariants: Variants = {
  // From left (Atlas pane)
  leftHidden: {
    x: "-100%",
    opacity: 0,
  },
  leftVisible: {
    x: 0,
    opacity: 1,
    transition: springs.smooth,
  },

  // From right (panels, modals)
  rightHidden: {
    x: "100%",
    opacity: 0,
  },
  rightVisible: {
    x: 0,
    opacity: 1,
    transition: springs.smooth,
  },

  // From bottom (command palette, sheets)
  bottomHidden: {
    y: "100%",
    opacity: 0,
  },
  bottomVisible: {
    y: 0,
    opacity: 1,
    transition: springs.ios,
  },

  // From top (notifications, dropdowns)
  topHidden: {
    y: "-100%",
    opacity: 0,
  },
  topVisible: {
    y: 0,
    opacity: 1,
    transition: springs.fast,
  },
};

// Scale animations for interactive elements
export const scaleVariants: Variants = {
  // Button press feedback
  idle: {
    scale: 1,
    transition: springs.ultraFast,
  },
  pressed: {
    scale: 0.95,
    transition: springs.ultraFast,
  },
  hover: {
    scale: 1.02,
    y: -2,
    transition: springs.gentle,
  },

  // Card hover effects
  cardIdle: {
    scale: 1,
    y: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    transition: springs.gentle,
  },
  cardHover: {
    scale: 1.01,
    y: -4,
    boxShadow: "0 8px 30px rgb(0 0 0 / 0.12)",
    transition: springs.ios,
  },
};

// Stagger animations for lists and grids
export const staggerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1,
    },
  },
};

export const staggerItemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: springs.fast,
  },
};

// Focus ring animations
export const focusVariants: Variants = {
  idle: {
    scale: 1,
    boxShadow: "0 0 0 0px rgba(var(--primary), 0)",
    transition: springs.ultraFast,
  },
  focused: {
    scale: 1,
    boxShadow: "0 0 0 3px rgba(var(--primary), 0.3)",
    transition: springs.gentle,
  },
};

// ================================
// SPECIALIZED ANIMATIONS
// ================================

// Command palette specific animations
export const commandPaletteVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95,
    y: 50,
    backdropFilter: "blur(0px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    backdropFilter: "blur(12px)",
    transition: {
      ...springs.ios,
      backdropFilter: { delay: 0.1 },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 30,
    transition: springs.ultraFast,
  },
};

// Three-pane layout animations
export const paneVariants: Variants = {
  // Atlas pane
  atlasHidden: {
    x: "-280px",
    opacity: 0,
  },
  atlasVisible: {
    x: 0,
    opacity: 1,
    transition: springs.smooth,
  },

  // Index pane
  indexHidden: {
    x: "-320px",
    opacity: 0,
  },
  indexVisible: {
    x: 0,
    opacity: 1,
    transition: {
      ...springs.smooth,
      delay: 0.1,
    },
  },

  // Canvas smooth transitions
  canvasEnter: {
    opacity: 1,
    scale: 1,
    transition: springs.gentle,
  },
  canvasExit: {
    opacity: 0,
    scale: 0.98,
    transition: springs.fast,
  },
};

// Memory card animations
export const memoryCardVariants: Variants = {
  idle: {
    scale: 1,
    y: 0,
    rotateY: 0,
    boxShadow: "0 1px 3px 0 rgb(0 0 0 / 0.1)",
    transition: springs.gentle,
  },
  hover: {
    scale: 1.02,
    y: -8,
    rotateY: 2,
    boxShadow: "0 20px 40px rgb(0 0 0 / 0.15)",
    transition: springs.ios,
  },
  tap: {
    scale: 0.98,
    transition: springs.ultraFast,
  },
};

// Graph visualization animations
export const graphVariants: Variants = {
  nodeIdle: {
    scale: 1,
    opacity: 0.8,
    filter: "brightness(1)",
    transition: springs.gentle,
  },
  nodeHover: {
    scale: 1.2,
    opacity: 1,
    filter: "brightness(1.1)",
    transition: springs.bouncy,
  },
  nodeSelected: {
    scale: 1.3,
    opacity: 1,
    filter: "brightness(1.2)",
    transition: springs.fast,
  },
};

// ================================
// ANIMATION UTILITIES
// ================================

// Create spring transition with custom values
export const createSpring = (
  stiffness: number = 200,
  damping: number = 20,
  mass: number = 1
): Transition => ({
  type: "spring",
  stiffness,
  damping,
  mass,
});

// Stagger children animation helper
export const createStagger = (
  staggerChildren: number = 0.05,
  delayChildren: number = 0
): Transition => ({
  staggerChildren,
  delayChildren,
});

// Entrance animation for new content
export const entranceAnimation = {
  initial: { opacity: 0, y: 20, scale: 0.95 },
  animate: { opacity: 1, y: 0, scale: 1 },
  transition: springs.fast,
};

// Exit animation for removed content
export const exitAnimation = {
  exit: { opacity: 0, y: -10, scale: 0.95 },
  transition: springs.ultraFast,
};

// Layout animation for elements changing position
export const layoutTransition = springs.smooth;

// ================================
// GESTURE-BASED ANIMATIONS
// ================================

// Drag constraints and physics
export const dragConstraints = {
  top: -100,
  bottom: 100,
  left: -100,
  right: 100,
};

export const dragTransition = {
  bounceStiffness: 300,
  bounceDamping: 20,
  power: 0.3,
};

// Swipe thresholds for gesture recognition
export const swipeThreshold = {
  velocity: 500,
  distance: 100,
};

// ================================
// ANIMATION PRESETS
// ================================

// Complete animation configs for common components
export const animationPresets = {
  // Modal/Dialog
  modal: {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: fadeVariants,
  },

  // Command Palette
  commandPalette: {
    initial: "hidden",
    animate: "visible",
    exit: "exit",
    variants: commandPaletteVariants,
  },

  // Sidebar/Drawer
  sidebar: {
    initial: "leftHidden",
    animate: "leftVisible",
    exit: "leftHidden",
    variants: slideVariants,
  },

  // Card Grid
  cardGrid: {
    initial: "hidden",
    animate: "visible",
    variants: staggerVariants,
  },

  // Individual Card
  card: {
    initial: "idle",
    whileHover: "hover",
    whileTap: "tap",
    variants: memoryCardVariants,
  },

  // Focus Ring
  focusRing: {
    initial: "idle",
    whileFocus: "focused",
    variants: focusVariants,
  },
};

// Export everything for easy importing
export default {
  springs,
  fadeVariants,
  slideVariants,
  scaleVariants,
  staggerVariants,
  staggerItemVariants,
  focusVariants,
  commandPaletteVariants,
  paneVariants,
  memoryCardVariants,
  graphVariants,
  createSpring,
  createStagger,
  entranceAnimation,
  exitAnimation,
  layoutTransition,
  dragConstraints,
  dragTransition,
  swipeThreshold,
  animationPresets,
};
