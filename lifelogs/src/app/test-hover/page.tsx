"use client";

import {
  Play,
  Heart,
  Star,
  MapPin,
  Calendar,
  User,
  Camera,
  Music,
  Book,
  Coffee,
  Plane,
  Home,
  Trash2,
  Edit,
  Check,
  AlertTriangle,
} from "lucide-react";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function TestHoverPage() {
  return (
    <div className="container max-w-7xl mx-auto px-6 py-12">
      <div className="space-y-12">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-end mb-4">
            <ThemeToggle />
          </div>
          <h1 className="text-4xl font-bold text-heading">
            Hover States & Lift Effects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Soft glowing shadows and subtle lift effects that adapt to light and
            dark themes. Each component includes performance-optimized hover
            animations.
          </p>
        </div>

        {/* Button Variants */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Button Hover Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">
                Primary Actions
              </h3>
              <div className="flex flex-col space-y-3">
                <button className="btn-primary px-6 py-3 rounded-lg font-medium flex items-center">
                  <Play className="w-4 h-4 mr-2" />
                  Start Journey
                </button>
                <button className="btn-accent px-6 py-3 rounded-lg font-medium flex items-center">
                  <Heart className="w-4 h-4 mr-2" />
                  Save Memory
                </button>
                <button className="btn-success px-6 py-3 rounded-lg font-medium flex items-center">
                  <Check className="w-4 h-4 mr-2" />
                  Complete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">
                Secondary Actions
              </h3>
              <div className="flex flex-col space-y-3">
                <button className="btn-secondary px-6 py-3 rounded-lg font-medium flex items-center">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Details
                </button>
                <button className="btn-warning px-6 py-3 rounded-lg font-medium flex items-center">
                  <AlertTriangle className="w-4 h-4 mr-2" />
                  Warning
                </button>
                <button className="btn-destructive px-6 py-3 rounded-lg font-medium flex items-center">
                  <Trash2 className="w-4 h-4 mr-2" />
                  Delete
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-medium text-muted-foreground">
                Custom Hover
              </h3>
              <div className="flex flex-col space-y-3">
                <button className="px-6 py-3 rounded-lg font-medium bg-background border border-border hover-button hover-primary text-foreground">
                  Primary Glow
                </button>
                <button className="px-6 py-3 rounded-lg font-medium bg-background border border-border hover-button hover-accent text-foreground">
                  Accent Glow
                </button>
                <button className="px-6 py-3 rounded-lg font-medium bg-background border border-border hover-lift-strong text-foreground">
                  Strong Lift
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Card Hover Effects */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Card Hover Effects
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="card-memory p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Camera className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Memory Card</h3>
                  <p className="text-sm text-muted-foreground">
                    Primary glow effect
                  </p>
                </div>
              </div>
              <p className="text-sm">
                A beautiful memory from your recent travels. Hover to see the
                soft glow effect.
              </p>
            </div>

            <div className="card-interactive p-6 rounded-xl space-y-4">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-accent/10 rounded-lg">
                  <Music className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold">Interactive Card</h3>
                  <p className="text-sm text-muted-foreground">
                    Standard lift effect
                  </p>
                </div>
              </div>
              <p className="text-sm">
                Standard interactive card with medium lift and subtle scale
                transform.
              </p>
            </div>

            <div className="bg-card border border-border hover-lift-strong p-6 rounded-xl space-y-4 cursor-pointer">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-success/10 rounded-lg">
                  <Book className="w-5 h-5 text-success" />
                </div>
                <div>
                  <h3 className="font-semibold">Strong Lift</h3>
                  <p className="text-sm text-muted-foreground">
                    Enhanced elevation
                  </p>
                </div>
              </div>
              <p className="text-sm">
                Card with strong lift effect for important interactive elements.
              </p>
            </div>
          </div>
        </section>

        {/* Interactive Elements */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Interactive Elements
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-6">
              <h3 className="font-medium text-muted-foreground">
                Navigation Items
              </h3>
              <div className="space-y-2">
                {[
                  { icon: Home, label: "Dashboard", active: true },
                  { icon: Calendar, label: "Timeline" },
                  { icon: User, label: "People" },
                  { icon: MapPin, label: "Places" },
                  { icon: Star, label: "Favorites" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`interactive flex items-center space-x-3 p-3 rounded-lg ${
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

            <div className="space-y-6">
              <h3 className="font-medium text-muted-foreground">
                Input Fields
              </h3>
              <div className="space-y-4">
                <input
                  className="input-enhanced w-full px-4 py-3 rounded-lg text-foreground placeholder:text-muted-foreground"
                  placeholder="Search memories..."
                />
                <input
                  className="input-enhanced w-full px-4 py-3 rounded-lg text-foreground placeholder:text-muted-foreground"
                  placeholder="Add tags..."
                />
                <textarea
                  className="input-enhanced w-full px-4 py-3 rounded-lg resize-none text-foreground placeholder:text-muted-foreground"
                  rows={4}
                  placeholder="Write your thoughts..."
                />
              </div>
            </div>
          </div>
        </section>

        {/* Icon Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Icon Button Effects
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { icon: Heart, color: "hover-destructive" },
              { icon: Star, color: "hover-warning" },
              { icon: MapPin, color: "hover-success" },
              { icon: Camera, color: "hover-primary" },
              { icon: Music, color: "hover-accent" },
              { icon: Coffee, color: "hover-warning" },
              { icon: Plane, color: "hover-accent" },
              { icon: Book, color: "hover-primary" },
            ].map((item, index) => (
              <button
                key={index}
                className={`interactive p-4 rounded-xl bg-card border border-border ${item.color} hover-button`}
              >
                <item.icon className="w-6 h-6" />
              </button>
            ))}
          </div>
        </section>

        {/* Floating Action Buttons */}
        <section className="space-y-6">
          <h2 className="text-2xl font-semibold text-heading">
            Floating Action Buttons
          </h2>
          <div className="flex flex-wrap gap-4">
            <button className="btn-primary p-4 rounded-full shadow-large hover-lift-strong">
              <Play className="w-6 h-6" />
            </button>
            <button className="btn-accent p-4 rounded-full shadow-large hover-lift-strong">
              <Heart className="w-6 h-6" />
            </button>
            <button className="btn-success p-4 rounded-full shadow-large hover-lift-strong">
              <Check className="w-6 h-6" />
            </button>
            <button className="btn-warning p-4 rounded-full shadow-large hover-lift-strong">
              <AlertTriangle className="w-6 h-6" />
            </button>
          </div>
        </section>

        {/* Performance Notes */}
        <section className="space-y-4">
          <h2 className="text-2xl font-semibold text-heading">
            Performance & Accessibility
          </h2>
          <div className="bg-card border border-border rounded-xl p-6 space-y-4">
            <h3 className="font-semibold text-primary">Design Philosophy</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                • <strong>Hardware-accelerated:</strong> All transforms use
                translate3d and scale
              </li>
              <li>
                • <strong>Theme-aware:</strong> Glow effects automatically adapt
                to light/dark mode
              </li>
              <li>
                • <strong>Keyboard-friendly:</strong> Focus rings with matching
                glow colors
              </li>
              <li>
                • <strong>Performance-optimized:</strong> Will-change and
                transform properties
              </li>
              <li>
                • <strong>Accessible:</strong> Respects reduced motion
                preferences
              </li>
              <li>
                • <strong>iOS-inspired:</strong> Subtle lift effects for premium
                feel
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
