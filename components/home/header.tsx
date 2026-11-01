"use client";

import * as React from "react";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/home/navbar";

/**
 * Page-level header.
 *
 * - Sticky at the top of the viewport.
 * - Transparent over the hero, then collapses into a frosted,
 *   bordered bar once the user scrolls past ~12px.
 * - The background swap is driven by Framer Motion's useScroll
 *   so it stays smooth on momentum scrolling.
 *
 * Internally renders <Navbar />. Keeping Header + Navbar split
 * lets you swap the navbar (e.g. for an authenticated app shell)
 * without touching the scroll-aware wrapper logic.
 */
export function Header() {
  const [scrolled, setScrolled] = React.useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 12);
  });

  return (
    <motion.header
      id="top"
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-[background,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-xl supports-[backdrop-filter]:bg-background/65"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <Navbar />
    </motion.header>
  );
}
