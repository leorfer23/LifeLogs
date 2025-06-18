"use client";

import { motion } from "framer-motion";
import { cardVariants, memoryCardVariants } from "@/lib/animations";
import { ReactNode } from "react";

interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "memory";
  onClick?: () => void;
}

/**
 * Demo animated card component showcasing Framer Motion integration
 * Used to verify animations are working properly
 */
export function AnimatedCard({
  children,
  className = "",
  variant = "default",
  onClick,
}: AnimatedCardProps) {
  const variants = variant === "memory" ? memoryCardVariants : cardVariants;

  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
      className={`
        p-6 
        bg-white 
        rounded-lg 
        shadow-sm 
        border 
        border-gray-200 
        cursor-pointer
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

/**
 * Animated container for lists of cards
 */
export function AnimatedContainer({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
