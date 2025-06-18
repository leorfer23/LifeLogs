/**
 * Icon System for LifeLogs
 * Provides consistent sizing, theming, and accessibility patterns for all icons
 */

import React, { ComponentType, forwardRef } from "react";
import { LucideProps } from "lucide-react";
import { cn } from "@/lib/utils";

// ================================
// ICON SIZE SYSTEM
// ================================

export const iconSizes = {
  xs: "w-3 h-3", // 12px - Small indicators, badges
  sm: "w-4 h-4", // 16px - Button icons, inline text icons
  md: "w-5 h-5", // 20px - Default size, navigation icons
  lg: "w-6 h-6", // 24px - Card icons, larger buttons
  xl: "w-8 h-8", // 32px - Hero icons, avatars
  "2xl": "w-12 h-12", // 48px - Large displays, empty states
  "3xl": "w-16 h-16", // 64px - Major graphics, loading states
} as const;

export type IconSize = keyof typeof iconSizes;

// ================================
// ICON COLOR SYSTEM
// ================================

export const iconColors = {
  // Semantic colors
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  secondary: "text-secondary-foreground",
  accent: "text-accent",
  destructive: "text-destructive",
  success: "text-success",
  warning: "text-warning",

  // Interactive states
  interactive: "text-muted-foreground hover:text-foreground transition-colors",
  "interactive-primary":
    "text-muted-foreground hover:text-primary transition-colors",
  "interactive-accent":
    "text-muted-foreground hover:text-accent transition-colors",

  // Status indicators
  active: "text-primary",
  inactive: "text-muted-foreground",
  disabled: "text-muted-foreground/50",

  // Context-aware
  inherit: "", // Inherits from parent
} as const;

export type IconColor = keyof typeof iconColors;

// ================================
// ICON COMPONENT WRAPPER
// ================================

export interface IconProps extends Omit<LucideProps, "size"> {
  size?: IconSize;
  color?: IconColor;
  interactive?: boolean;
  "aria-label"?: string;
}

export const createIcon = (LucideIcon: ComponentType<LucideProps>) => {
  const IconComponent = forwardRef<SVGSVGElement, IconProps>(
    (
      {
        size = "md",
        color = "default",
        interactive = false,
        className,
        ...props
      },
      ref
    ) => {
      const sizeClass = iconSizes[size];
      const colorClass = interactive
        ? iconColors["interactive"]
        : iconColors[color];

      return React.createElement(LucideIcon, {
        ref,
        className: cn(
          sizeClass,
          colorClass,
          interactive && "cursor-pointer",
          className
        ),
        ...props,
      });
    }
  );

  IconComponent.displayName = `Icon(${
    LucideIcon.displayName || LucideIcon.name
  })`;
  return IconComponent;
};

// ================================
// COMMON ICON REGISTRY
// ================================

import {
  // Navigation & Layout
  Home,
  Calendar,
  User,
  Users,
  MapPin,
  Star,
  Search,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  ChevronDown,
  ArrowLeft,
  ArrowRight,

  // Actions
  Plus,
  Edit,
  Trash2,
  Save,
  Download,
  Upload,
  Share,
  Copy,
  Check,
  AlertTriangle,
  Info,
  HelpCircle,
  Settings,

  // Content & Media
  Camera,
  Image,
  Video,
  Music,
  File,
  FileText,
  Book,
  Bookmark,
  Heart,
  MessageCircle,

  // Navigation Actions
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  VolumeX,

  // Status & Feedback
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Loader,

  // Tools & Utilities
  Filter,
  Sort,
  Grid3X3,
  List,
  Map,
  Globe,
  Link,
  ExternalLink,

  // Social & Communication
  Mail,
  Phone,
  MessageSquare,

  // Theme & Display
  Sun,
  Moon,
  Monitor,
  Eye,
  EyeOff,

  // Travel & Lifestyle
  Plane,
  Car,
  Train,
  Coffee,
  Utensils,

  // Weather & Nature
  Cloud,
  Sun as SunIcon,
  CloudRain,
} from "lucide-react";

// Create wrapped versions of common icons
export const Icons = {
  // Navigation & Layout
  home: createIcon(Home),
  calendar: createIcon(Calendar),
  user: createIcon(User),
  users: createIcon(Users),
  mapPin: createIcon(MapPin),
  star: createIcon(Star),
  search: createIcon(Search),
  menu: createIcon(Menu),
  close: createIcon(X),
  chevronLeft: createIcon(ChevronLeft),
  chevronRight: createIcon(ChevronRight),
  chevronUp: createIcon(ChevronUp),
  chevronDown: createIcon(ChevronDown),
  arrowLeft: createIcon(ArrowLeft),
  arrowRight: createIcon(ArrowRight),

  // Actions
  add: createIcon(Plus),
  edit: createIcon(Edit),
  delete: createIcon(Trash2),
  save: createIcon(Save),
  download: createIcon(Download),
  upload: createIcon(Upload),
  share: createIcon(Share),
  copy: createIcon(Copy),
  check: createIcon(Check),
  warning: createIcon(AlertTriangle),
  info: createIcon(Info),
  help: createIcon(HelpCircle),
  settings: createIcon(Settings),

  // Content & Media
  camera: createIcon(Camera),
  image: createIcon(Image),
  video: createIcon(Video),
  music: createIcon(Music),
  file: createIcon(File),
  document: createIcon(FileText),
  book: createIcon(Book),
  bookmark: createIcon(Bookmark),
  heart: createIcon(Heart),
  comment: createIcon(MessageCircle),

  // Media Controls
  play: createIcon(Play),
  pause: createIcon(Pause),
  skipBack: createIcon(SkipBack),
  skipForward: createIcon(SkipForward),
  volume: createIcon(Volume2),
  mute: createIcon(VolumeX),

  // Status & Feedback
  success: createIcon(CheckCircle),
  error: createIcon(XCircle),
  alert: createIcon(AlertCircle),
  clock: createIcon(Clock),
  loading: createIcon(Loader),

  // Tools & Utilities
  filter: createIcon(Filter),
  sort: createIcon(Sort),
  grid: createIcon(Grid3X3),
  list: createIcon(List),
  map: createIcon(Map),
  globe: createIcon(Globe),
  link: createIcon(Link),
  externalLink: createIcon(ExternalLink),

  // Social & Communication
  mail: createIcon(Mail),
  phone: createIcon(Phone),
  message: createIcon(MessageSquare),

  // Theme & Display
  sun: createIcon(Sun),
  moon: createIcon(Moon),
  monitor: createIcon(Monitor),
  show: createIcon(Eye),
  hide: createIcon(EyeOff),

  // Travel & Lifestyle
  plane: createIcon(Plane),
  car: createIcon(Car),
  train: createIcon(Train),
  coffee: createIcon(Coffee),
  restaurant: createIcon(Utensils),

  // Weather & Nature
  cloud: createIcon(Cloud),
  sunny: createIcon(SunIcon),
  rain: createIcon(CloudRain),
} as const;

// ================================
// ICON UTILITIES
// ================================

// Icon button wrapper with proper hover states
export interface IconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "primary" | "secondary" | "destructive" | "ghost";
  iconName: keyof typeof Icons;
  size?: IconSize;
  iconColor?: IconColor;
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      iconName,
      variant = "default",
      size = "md",
      iconColor,
      className,
      ...props
    },
    ref
  ) => {
    const IconComponent = Icons[iconName];

    const variantStyles = {
      default: "hover-button bg-background border border-border hover-primary",
      primary: "btn-primary",
      secondary: "btn-secondary",
      destructive: "btn-destructive",
      ghost:
        "hover-interactive bg-transparent border-transparent hover:bg-hover-bg",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "interactive p-2 rounded-lg transition-all focus-visible-ring",
          variantStyles[variant],
          className
        )}
        {...props}
      >
        <IconComponent
          size={size}
          color={iconColor || (variant === "ghost" ? "interactive" : "inherit")}
          aria-hidden="true"
        />
      </button>
    );
  }
);

IconButton.displayName = "IconButton";

// ================================
// ICON ACCESSIBILITY HELPERS
// ================================

// Decorative icon wrapper (for purely visual icons)
export const DecorativeIcon = ({
  iconName,
  ...props
}: { iconName: keyof typeof Icons } & IconProps) => {
  const IconComponent = Icons[iconName];
  return <IconComponent aria-hidden="true" {...props} />;
};

// Semantic icon wrapper (for meaningful icons)
export const SemanticIcon = ({
  iconName,
  "aria-label": ariaLabel,
  ...props
}: { iconName: keyof typeof Icons } & IconProps & { "aria-label": string }) => {
  const IconComponent = Icons[iconName];
  return <IconComponent aria-label={ariaLabel} role="img" {...props} />;
};

// Status icon with consistent styling
export const StatusIcon = ({
  status,
  size = "sm",
  ...props
}: {
  status: "success" | "warning" | "error" | "info" | "loading";
} & Omit<IconProps, "color">) => {
  const iconMap = {
    success: "success",
    warning: "warning",
    error: "error",
    info: "info",
    loading: "loading",
  } as const;

  const colorMap = {
    success: "success",
    warning: "warning",
    error: "destructive",
    info: "primary",
    loading: "muted",
  } as const;

  const IconComponent = Icons[iconMap[status]];

  return (
    <IconComponent
      size={size}
      color={colorMap[status]}
      className={cn(status === "loading" && "animate-spin", props.className)}
      {...props}
    />
  );
};

export default Icons;
