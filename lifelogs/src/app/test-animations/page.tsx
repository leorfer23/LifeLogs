"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import {
  springs,
  fadeVariants,
  slideVariants,
  scaleVariants,
  staggerVariants,
  staggerItemVariants,
  memoryCardVariants,
  commandPaletteVariants,
  focusVariants,
} from "@/lib/animations";

export default function TestAnimationsPage() {
  const [showModal, setShowModal] = useState(false);
  const [showCommandPalette, setShowCommandPalette] = useState(false);
  const [selectedCard, setSelectedCard] = useState<number | null>(null);
  const [hoveredButton, setHoveredButton] = useState<string | null>(null);

  const memoryCards = [
    { id: 1, title: "Trip to Japan", color: "bg-blue-100" },
    { id: 2, title: "Birthday Party", color: "bg-pink-100" },
    { id: 3, title: "Hiking Adventure", color: "bg-green-100" },
    { id: 4, title: "Coffee Meeting", color: "bg-yellow-100" },
    { id: 5, title: "Beach Vacation", color: "bg-cyan-100" },
    { id: 6, title: "Concert Night", color: "bg-purple-100" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground font-inter p-8">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={springs.smooth}
        >
          <div className="flex-layout-between mb-8">
            <h1 className="text-display">Spring Physics Animation System</h1>
            <ThemeToggle />
          </div>

          {/* Animation Controls */}
          <div className="flex-layout-spread mb-12">
            <motion.button
              onClick={() => setShowModal(true)}
              className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium interactive"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.ultraFast}
            >
              Show Modal
            </motion.button>

            <motion.button
              onClick={() => setShowCommandPalette(true)}
              className="px-6 py-3 bg-accent text-accent-foreground rounded-lg font-medium interactive"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              transition={springs.ultraFast}
            >
              Command Palette
            </motion.button>
          </div>

          {/* Spring Physics Showcase */}
          <div className="grid gap-8 mb-12">
            <div>
              <h2 className="text-heading mb-4">
                Spring Physics Configurations
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {Object.entries(springs).map(([name, config]) => (
                  <motion.div
                    key={name}
                    className="p-4 bg-card rounded-lg border border-border"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={config}
                  >
                    <h3 className="font-semibold text-sm mb-2 capitalize">
                      {name}
                    </h3>
                    <div className="text-xs text-muted-foreground space-y-1">
                      <div>Stiffness: {config.stiffness}</div>
                      <div>Damping: {config.damping}</div>
                      <div>Mass: {config.mass}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Interactive Buttons */}
            <div>
              <h2 className="text-heading mb-4">Interactive Elements</h2>
              <div className="flex-layout-spread">
                {["primary", "secondary", "accent"].map((variant) => (
                  <motion.button
                    key={variant}
                    className={`px-6 py-3 rounded-lg font-medium ${
                      variant === "primary"
                        ? "bg-primary text-primary-foreground"
                        : variant === "secondary"
                        ? "bg-secondary text-secondary-foreground"
                        : "bg-accent text-accent-foreground"
                    }`}
                    variants={scaleVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="pressed"
                    onHoverStart={() => setHoveredButton(variant)}
                    onHoverEnd={() => setHoveredButton(null)}
                  >
                    {variant.charAt(0).toUpperCase() + variant.slice(1)} Button
                    {hoveredButton === variant && (
                      <motion.div
                        className="absolute inset-0 bg-white/20 rounded-lg"
                        layoutId="buttonHover"
                        transition={springs.ultraFast}
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Memory Cards Grid */}
            <div>
              <h2 className="text-heading mb-4">
                Memory Cards with Stagger Animation
              </h2>
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerVariants}
                initial="hidden"
                animate="visible"
              >
                {memoryCards.map((card) => (
                  <motion.div
                    key={card.id}
                    className={`p-6 rounded-xl ${card.color} cursor-pointer relative overflow-hidden`}
                    variants={memoryCardVariants}
                    initial="idle"
                    whileHover="hover"
                    whileTap="tap"
                    onClick={() =>
                      setSelectedCard(card.id === selectedCard ? null : card.id)
                    }
                    layout
                  >
                    <motion.div
                      className="w-full h-32 bg-white/50 rounded-lg mb-4"
                      variants={staggerItemVariants}
                    />
                    <motion.h3
                      className="text-lg font-semibold text-gray-800"
                      variants={staggerItemVariants}
                    >
                      {card.title}
                    </motion.h3>
                    <motion.p
                      className="text-sm text-gray-600 mt-2"
                      variants={staggerItemVariants}
                    >
                      Experience the spring physics in action
                    </motion.p>

                    <AnimatePresence>
                      {selectedCard === card.id && (
                        <motion.div
                          className="absolute inset-0 bg-primary/10 rounded-xl"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={springs.fast}
                        />
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Slide Animations */}
            <div>
              <h2 className="text-heading mb-4">Slide Animations</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div
                  className="p-6 bg-card rounded-lg border border-border"
                  variants={slideVariants}
                  initial="leftHidden"
                  animate="leftVisible"
                >
                  <h3 className="font-semibold mb-2">Slide from Left</h3>
                  <p className="text-sm text-muted-foreground">
                    Perfect for sidebars and navigation panels
                  </p>
                </motion.div>

                <motion.div
                  className="p-6 bg-card rounded-lg border border-border"
                  variants={slideVariants}
                  initial="rightHidden"
                  animate="rightVisible"
                >
                  <h3 className="font-semibold mb-2">Slide from Right</h3>
                  <p className="text-sm text-muted-foreground">
                    Great for context panels and drawers
                  </p>
                </motion.div>
              </div>
            </div>

            {/* Focus Ring Demo */}
            <div>
              <h2 className="text-heading mb-4">Focus Ring Animation</h2>
              <div className="flex-layout-spread">
                <motion.input
                  type="text"
                  placeholder="Focus me with keyboard"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none"
                  variants={focusVariants}
                  initial="idle"
                  whileFocus="focused"
                />
                <motion.textarea
                  placeholder="I also have focus animation"
                  className="px-4 py-2 border border-border rounded-lg focus:outline-none resize-none"
                  variants={focusVariants}
                  initial="idle"
                  whileFocus="focused"
                  rows={3}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowModal(false)}
          >
            <motion.div
              className="bg-card p-8 rounded-xl max-w-md w-full mx-4"
              variants={fadeVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-semibold mb-4">
                Spring Physics Modal
              </h3>
              <p className="text-muted-foreground mb-6">
                This modal uses spring physics for smooth, natural animations
                that feel responsive and iOS-like.
              </p>
              <motion.button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={springs.ultraFast}
              >
                Close
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Command Palette */}
      <AnimatePresence>
        {showCommandPalette && (
          <motion.div
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-end justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCommandPalette(false)}
          >
            <motion.div
              className="bg-card border border-border rounded-xl w-full max-w-2xl shadow-2xl"
              variants={commandPaletteVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4 border-b border-border">
                <input
                  type="text"
                  placeholder="Type a command or search..."
                  className="w-full bg-transparent text-lg placeholder-gray-400 focus:outline-none"
                  autoFocus
                />
              </div>
              <div className="p-4">
                <div className="space-y-2">
                  {[
                    "New Memory",
                    "Search Memories",
                    "Switch to Canvas Mode",
                    "Open Graph View",
                  ].map((command, index) => (
                    <motion.div
                      key={command}
                      className="p-3 rounded-lg hover:bg-muted cursor-pointer transition-colors"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ ...springs.fast, delay: index * 0.05 }}
                    >
                      {command}
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
