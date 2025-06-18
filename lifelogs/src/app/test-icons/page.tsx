"use client";

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

  // Media Controls
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
  ArrowUpDown,
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
  CloudRain,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

// Icon size classes
const iconSizes = {
  xs: "w-3 h-3", // 12px
  sm: "w-4 h-4", // 16px
  md: "w-5 h-5", // 20px
  lg: "w-6 h-6", // 24px
  xl: "w-8 h-8", // 32px
  "2xl": "w-12 h-12", // 48px
  "3xl": "w-16 h-16", // 64px
};

// Icon color classes
const iconColors = {
  default: "text-foreground",
  muted: "text-muted-foreground",
  primary: "text-primary",
  accent: "text-accent",
  success: "text-success",
  warning: "text-warning",
  destructive: "text-destructive",
  interactive:
    "text-muted-foreground hover:text-foreground transition-colors cursor-pointer",
  "interactive-primary":
    "text-muted-foreground hover:text-primary transition-colors cursor-pointer",
  "interactive-accent":
    "text-muted-foreground hover:text-accent transition-colors cursor-pointer",
};

// Icon categories for organization
const iconCategories = {
  navigation: [
    { icon: Home, name: "Home", usage: "Main navigation, dashboard" },
    { icon: Calendar, name: "Calendar", usage: "Timeline, events, dates" },
    { icon: User, name: "User", usage: "Profile, single person" },
    { icon: Users, name: "Users", usage: "Groups, multiple people" },
    { icon: MapPin, name: "MapPin", usage: "Location, places" },
    { icon: Star, name: "Star", usage: "Favorites, bookmarks" },
    { icon: Search, name: "Search", usage: "Search functionality" },
    { icon: Menu, name: "Menu", usage: "Mobile menu, hamburger" },
  ],

  actions: [
    { icon: Plus, name: "Plus", usage: "Add, create new" },
    { icon: Edit, name: "Edit", usage: "Edit, modify" },
    { icon: Trash2, name: "Trash2", usage: "Delete, remove" },
    { icon: Save, name: "Save", usage: "Save, persist" },
    { icon: Download, name: "Download", usage: "Download, export" },
    { icon: Upload, name: "Upload", usage: "Upload, import" },
    { icon: Share, name: "Share", usage: "Share, distribute" },
    { icon: Copy, name: "Copy", usage: "Copy, duplicate" },
  ],

  media: [
    { icon: Camera, name: "Camera", usage: "Photos, capture" },
    { icon: Image, name: "Image", usage: "Pictures, gallery" },
    { icon: Video, name: "Video", usage: "Videos, recordings" },
    { icon: Music, name: "Music", usage: "Audio, songs" },
    { icon: Play, name: "Play", usage: "Play media" },
    { icon: Pause, name: "Pause", usage: "Pause playback" },
    { icon: Volume2, name: "Volume2", usage: "Audio on" },
    { icon: VolumeX, name: "VolumeX", usage: "Audio muted" },
  ],

  status: [
    { icon: CheckCircle, name: "CheckCircle", usage: "Success, completed" },
    { icon: XCircle, name: "XCircle", usage: "Error, failed" },
    { icon: AlertCircle, name: "AlertCircle", usage: "Warning, attention" },
    { icon: Info, name: "Info", usage: "Information, help" },
    { icon: Clock, name: "Clock", usage: "Time, pending" },
    { icon: Loader, name: "Loader", usage: "Loading, processing" },
  ],

  utility: [
    { icon: Settings, name: "Settings", usage: "Configuration, preferences" },
    { icon: Filter, name: "Filter", usage: "Filter, sort" },
    { icon: ArrowUpDown, name: "ArrowUpDown", usage: "Sort, reorder" },
    { icon: Grid3X3, name: "Grid3X3", usage: "Grid view" },
    { icon: List, name: "List", usage: "List view" },
    { icon: Link, name: "Link", usage: "Internal links" },
    { icon: ExternalLink, name: "ExternalLink", usage: "External links" },
    { icon: Eye, name: "Eye", usage: "Show, visible" },
  ],
};

// Interactive components with proper hover feedback
const InteractiveButton = ({
  icon: Icon,
  variant = "default",
  size = "md",
  children,
  ...props
}: {
  icon: any;
  variant?: "default" | "primary" | "ghost" | "destructive";
  size?: keyof typeof iconSizes;
  children?: React.ReactNode;
  [key: string]: any;
}) => {
  const variantStyles = {
    default: "btn-secondary",
    primary: "btn-primary",
    ghost:
      "hover-interactive bg-transparent border-transparent hover:bg-hover-bg",
    destructive: "btn-destructive",
  };

  return (
    <button
      className={`interactive flex items-center gap-2 px-3 py-2 rounded-lg transition-all focus-visible-ring ${variantStyles[variant]}`}
      {...props}
    >
      <Icon className={iconSizes[size]} />
      {children}
    </button>
  );
};

const IconButton = ({
  icon: Icon,
  variant = "default",
  size = "md",
  ...props
}: {
  icon: any;
  variant?: "default" | "primary" | "ghost" | "destructive";
  size?: keyof typeof iconSizes;
  [key: string]: any;
}) => {
  const variantStyles = {
    default: "hover-button bg-background border border-border hover-primary",
    primary: "btn-primary",
    ghost:
      "hover-interactive bg-transparent border-transparent hover:bg-hover-bg",
    destructive: "btn-destructive",
  };

  return (
    <button
      className={`interactive p-2 rounded-lg transition-all focus-visible-ring ${variantStyles[variant]}`}
      {...props}
    >
      <Icon className={iconSizes[size]} aria-hidden="true" />
    </button>
  );
};

export default function TestIconsPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-heading">
            Icon System & Interactive Elements
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Comprehensive icon system with consistent sizing, theming, and hover
            feedback. All interactive elements follow accessibility best
            practices.
          </p>
        </div>

        {/* Icon Size System */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Icon Size System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Object.entries(iconSizes).map(([size, className]) => (
              <div
                key={size}
                className="flex items-center justify-between p-4 bg-card border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Star className={className} />
                  <span className="font-medium">{size}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {className}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Icon Color System */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Icon Color System
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(iconColors).map(([color, className]) => (
              <div
                key={color}
                className="flex items-center justify-between p-3 bg-card border border-border rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Heart className={`w-5 h-5 ${className}`} />
                  <span className="font-medium">{color}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Icon Categories */}
        {Object.entries(iconCategories).map(([category, icons]) => (
          <section key={category} className="space-y-6">
            <h2 className="text-2xl font-semibold text-heading capitalize">
              {category} Icons
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {icons.map(({ icon: Icon, name, usage }) => (
                <div
                  key={name}
                  className="p-4 bg-card border border-border rounded-lg hover-card"
                >
                  <div className="flex items-start gap-3">
                    <Icon className="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <div className="min-w-0">
                      <h3 className="font-medium text-sm">{name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">
                        {usage}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Interactive Button Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Interactive Buttons with Icons
          </h2>
          <div className="space-y-8">
            {/* Text + Icon Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Text + Icon Buttons</h3>
              <div className="flex flex-wrap gap-3">
                <InteractiveButton icon={Plus} variant="primary">
                  Create Memory
                </InteractiveButton>
                <InteractiveButton icon={Edit} variant="default">
                  Edit Details
                </InteractiveButton>
                <InteractiveButton icon={Share} variant="ghost">
                  Share
                </InteractiveButton>
                <InteractiveButton icon={Trash2} variant="destructive">
                  Delete
                </InteractiveButton>
              </div>
            </div>

            {/* Icon-Only Buttons */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Icon-Only Buttons</h3>
              <div className="flex flex-wrap gap-2">
                <IconButton
                  icon={Heart}
                  variant="default"
                  aria-label="Add to favorites"
                />
                <IconButton
                  icon={Bookmark}
                  variant="default"
                  aria-label="Bookmark"
                />
                <IconButton icon={Share} variant="default" aria-label="Share" />
                <IconButton
                  icon={Download}
                  variant="default"
                  aria-label="Download"
                />
                <IconButton
                  icon={Settings}
                  variant="ghost"
                  aria-label="Settings"
                />
                <IconButton
                  icon={HelpCircle}
                  variant="ghost"
                  aria-label="Help"
                />
                <IconButton
                  icon={Trash2}
                  variant="destructive"
                  aria-label="Delete"
                />
              </div>
            </div>

            {/* Different Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Button Sizes</h3>
              <div className="flex items-center gap-3">
                <IconButton
                  icon={Plus}
                  size="sm"
                  variant="primary"
                  aria-label="Add small"
                />
                <IconButton
                  icon={Plus}
                  size="md"
                  variant="primary"
                  aria-label="Add medium"
                />
                <IconButton
                  icon={Plus}
                  size="lg"
                  variant="primary"
                  aria-label="Add large"
                />
                <IconButton
                  icon={Plus}
                  size="xl"
                  variant="primary"
                  aria-label="Add extra large"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Navigation Examples */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Navigation Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Sidebar Navigation */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sidebar Navigation</h3>
              <div className="bg-card border border-border rounded-lg p-4 space-y-2">
                {[
                  { icon: Home, label: "Dashboard", active: true },
                  { icon: Calendar, label: "Timeline" },
                  { icon: Users, label: "People" },
                  { icon: MapPin, label: "Places" },
                  { icon: Star, label: "Favorites" },
                  { icon: Settings, label: "Settings" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`interactive flex items-center gap-3 p-3 rounded-lg transition-all cursor-pointer ${
                      item.active
                        ? "bg-primary/10 text-primary shadow-glow-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-hover-bg"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breadcrumbs */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Breadcrumbs</h3>
              <div className="flex items-center gap-2 text-sm">
                <button className="interactive text-muted-foreground hover:text-foreground flex items-center gap-1">
                  <Home className="w-4 h-4" />
                  Home
                </button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <button className="interactive text-muted-foreground hover:text-foreground">
                  Memories
                </button>
                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                <span className="text-foreground">Japan Trip</span>
              </div>
            </div>
          </div>
        </section>

        {/* Status Indicators */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Status Indicators
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-success" />
                <span className="font-medium">Success</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Operation completed successfully
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-warning" />
                <span className="font-medium">Warning</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Attention required
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-destructive" />
                <span className="font-medium">Error</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Something went wrong
              </p>
            </div>

            <div className="p-4 bg-card border border-border rounded-lg">
              <div className="flex items-center gap-2">
                <Loader className="w-5 h-5 text-muted-foreground animate-spin" />
                <span className="font-medium">Loading</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Processing request
              </p>
            </div>
          </div>
        </section>

        {/* Accessibility & Guidelines */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Guidelines & Best Practices
          </h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Size Guidelines</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>xs (12px):</strong> Small indicators, badges
                  </li>
                  <li>
                    • <strong>sm (16px):</strong> Button icons, inline text
                    icons
                  </li>
                  <li>
                    • <strong>md (20px):</strong> Default size, navigation icons
                  </li>
                  <li>
                    • <strong>lg (24px):</strong> Card icons, larger buttons
                  </li>
                  <li>
                    • <strong>xl (32px):</strong> Hero icons, avatars
                  </li>
                  <li>
                    • <strong>2xl+ (48px+):</strong> Large displays, empty
                    states
                  </li>
                </ul>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold text-primary">Accessibility</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li>
                    • <strong>Decorative icons:</strong> Use{" "}
                    <code>aria-hidden="true"</code>
                  </li>
                  <li>
                    • <strong>Meaningful icons:</strong> Provide{" "}
                    <code>aria-label</code>
                  </li>
                  <li>
                    • <strong>Interactive icons:</strong> Include visible or
                    screen reader text
                  </li>
                  <li>
                    • <strong>Focus states:</strong> Ensure keyboard navigation
                    works
                  </li>
                  <li>
                    • <strong>Color contrast:</strong> Meet WCAG standards
                  </li>
                  <li>
                    • <strong>Hover feedback:</strong> Visual indication of
                    interactivity
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-border">
              <h3 className="font-semibold text-primary mb-3">
                Interactive Element Standards
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div className="space-y-2">
                  <strong>✅ All buttons have:</strong>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Hover state with lift effect</li>
                    <li>• Focus ring for keyboard navigation</li>
                    <li>• Proper semantic markup</li>
                    <li>• Accessible labels</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <strong>✅ All icons have:</strong>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Consistent sizing system</li>
                    <li>• Theme-aware colors</li>
                    <li>• Proper accessibility attributes</li>
                    <li>• Semantic naming</li>
                  </ul>
                </div>
                <div className="space-y-2">
                  <strong>✅ All interactions have:</strong>
                  <ul className="text-muted-foreground space-y-1">
                    <li>• Visual feedback on hover</li>
                    <li>• Hardware-accelerated animations</li>
                    <li>• Spring physics timing</li>
                    <li>• Reduced motion support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
