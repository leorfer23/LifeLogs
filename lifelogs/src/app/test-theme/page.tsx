"use client";

import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "@/lib/theme";
import {
  springs,
  staggerVariants,
  staggerItemVariants,
} from "@/lib/animations";

export default function TestThemePage() {
  const { theme, actualTheme } = useTheme();

  const colorSections = [
    {
      title: "Primary Colors",
      colors: [
        {
          name: "Primary",
          class: "bg-primary text-primary-foreground",
          desc: "Vibrant purple/blue for CTAs",
        },
        {
          name: "Secondary",
          class: "bg-secondary text-secondary-foreground",
          desc: "Warm gray for secondary actions",
        },
        {
          name: "Accent",
          class: "bg-accent text-accent-foreground",
          desc: "Vibrant cyan/teal for highlights",
        },
      ],
    },
    {
      title: "Feedback Colors",
      colors: [
        {
          name: "Success",
          class: "bg-success text-white",
          desc: "Vibrant green for success states",
        },
        {
          name: "Warning",
          class: "bg-warning text-black",
          desc: "Vibrant orange for warnings",
        },
        {
          name: "Destructive",
          class: "bg-destructive text-white",
          desc: "Vibrant red for errors",
        },
      ],
    },
    {
      title: "UI Elements",
      colors: [
        {
          name: "Background",
          class: "bg-background text-foreground border border-border",
          desc: "Main app background",
        },
        {
          name: "Card",
          class: "bg-card text-card-foreground border border-border",
          desc: "Card backgrounds",
        },
        {
          name: "Muted",
          class: "bg-muted text-muted-foreground",
          desc: "Subtle background areas",
        },
      ],
    },
    {
      title: "Chart Colors",
      colors: [
        {
          name: "Chart 1",
          class: "bg-chart-1 text-white",
          desc: "Primary data series",
        },
        {
          name: "Chart 2",
          class: "bg-chart-2 text-white",
          desc: "Teal data series",
        },
        {
          name: "Chart 3",
          class: "bg-chart-3 text-white",
          desc: "Green data series",
        },
        {
          name: "Chart 4",
          class: "bg-chart-4 text-white",
          desc: "Orange data series",
        },
        {
          name: "Chart 5",
          class: "bg-chart-5 text-white",
          desc: "Red data series",
        },
      ],
    },
  ];

  const shadowExamples = [
    { name: "Soft", class: "shadow-soft" },
    { name: "Medium", class: "shadow-medium" },
    { name: "Large", class: "shadow-large" },
    { name: "Glow", class: "shadow-glow" },
    { name: "Hover", class: "shadow-hover" },
  ];

  return (
    <motion.div
      className="min-h-screen bg-background text-foreground font-inter"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={springs.smooth}
    >
      <div className="max-w-7xl mx-auto p-8">
        {/* Header */}
        <motion.div
          className="flex-layout-between mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.fast}
        >
          <div>
            <h1 className="text-display mb-2">Theme System Demo</h1>
            <p className="text-body text-muted-foreground">
              Warm grays and vibrant accent colors with seamless light/dark mode
              switching
            </p>
          </div>
          <div className="flex-layout-inline">
            <div className="text-caption mr-4">
              <div>
                Current: <span className="font-medium">{theme}</span>
              </div>
              <div>
                Resolved: <span className="font-medium">{actualTheme}</span>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </motion.div>

        {/* Theme Information */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          variants={staggerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="bg-card border border-border rounded-xl p-6"
            variants={staggerItemVariants}
          >
            <h3 className="text-heading mb-4">🎨 Design Philosophy</h3>
            <ul className="text-body space-y-2">
              <li>• Warm grays for comfortable viewing</li>
              <li>• Vibrant accent colors for engagement</li>
              <li>• Enhanced contrast in dark mode</li>
              <li>• iOS Desktop-inspired feel</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-xl p-6"
            variants={staggerItemVariants}
          >
            <h3 className="text-heading mb-4">⚡ Spring Physics</h3>
            <ul className="text-body space-y-2">
              <li>• Smooth theme transitions</li>
              <li>• Natural motion patterns</li>
              <li>• Responsive interactions</li>
              <li>• No duration-based timing</li>
            </ul>
          </motion.div>

          <motion.div
            className="bg-card border border-border rounded-xl p-6"
            variants={staggerItemVariants}
          >
            <h3 className="text-heading mb-4">🎯 Accessibility</h3>
            <ul className="text-body space-y-2">
              <li>• System preference detection</li>
              <li>• Manual override support</li>
              <li>• Focus ring animations</li>
              <li>• Keyboard navigation</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Color Palette */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.2 }}
        >
          <h2 className="text-heading mb-6">Color System</h2>
          <div className="grid gap-8">
            {colorSections.map((section) => (
              <div key={section.title}>
                <h3 className="text-subheading mb-4">{section.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {section.colors.map((color) => (
                    <motion.div
                      key={color.name}
                      className={`${color.class} p-6 rounded-xl transition-all duration-300`}
                      whileHover={{
                        scale: 1.02,
                        y: -4,
                        transition: springs.ios,
                      }}
                      whileTap={{
                        scale: 0.98,
                        transition: springs.ultraFast,
                      }}
                    >
                      <div className="font-semibold text-lg mb-1">
                        {color.name}
                      </div>
                      <div className="text-sm opacity-90">{color.desc}</div>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Shadow System */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.4 }}
        >
          <h2 className="text-heading mb-6">Shadow System</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            {shadowExamples.map((shadow) => (
              <motion.div
                key={shadow.name}
                className={`bg-card p-6 rounded-xl ${shadow.class} transition-all duration-300`}
                whileHover={{
                  y: -2,
                  transition: springs.gentle,
                }}
              >
                <div className="text-center">
                  <div className="text-lg font-semibold mb-2">
                    {shadow.name}
                  </div>
                  <div className="text-caption text-muted-foreground">
                    {shadow.class}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Interactive Elements */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.6 }}
        >
          <h2 className="text-heading mb-6">Interactive Elements</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.button
              className="bg-primary text-primary-foreground px-6 py-4 rounded-xl font-medium interactive"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.ultraFast}
            >
              Primary Button
            </motion.button>

            <motion.button
              className="bg-secondary text-secondary-foreground px-6 py-4 rounded-xl font-medium interactive"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.ultraFast}
            >
              Secondary Button
            </motion.button>

            <motion.div
              className="bg-card border border-border p-6 rounded-xl interactive"
              whileHover={{
                scale: 1.01,
                y: -4,
                boxShadow: "0 20px 40px rgb(0 0 0 / 0.15)",
                transition: springs.ios,
              }}
            >
              <div className="text-lg font-semibold mb-2">Card Element</div>
              <div className="text-caption text-muted-foreground">
                Hover for interaction
              </div>
            </motion.div>

            <motion.input
              type="text"
              placeholder="Focus me..."
              className="bg-input border border-border px-4 py-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/30 focus:ring-offset-2 focus:ring-offset-background transition-all"
            />
          </div>
        </motion.div>

        {/* Typography Scale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ ...springs.smooth, delay: 0.8 }}
        >
          <h2 className="text-heading mb-6">Typography Scale</h2>
          <div className="bg-card border border-border rounded-xl p-8 space-y-6">
            <div className="text-display">Display Text - SF Pro, Bold</div>
            <div className="text-heading">Heading Text - SF Pro, Semibold</div>
            <div className="text-subheading">
              Subheading Text - Inter, Medium
            </div>
            <div className="text-body">
              Body Text - Inter, Regular. This is the main text used throughout
              the application for readable content.
            </div>
            <div className="text-caption">
              Caption Text - Inter, Small, Muted
            </div>
            <div className="text-mono">
              Monospace Text - JetBrains Mono, Code
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
