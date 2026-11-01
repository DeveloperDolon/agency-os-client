"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

/**
 * Light/Dark theme toggle.
 * Uses next-themes; waits until mounted to avoid hydration mismatch.
 * The icon swap is animated with AnimatePresence for a soft cross-fade
 * + rotation, which reads as a deliberate "switch" rather than a flicker.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  React.useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
            className="relative h-9 w-9 rounded-full border border-border bg-surface/60 text-foreground/80 backdrop-blur transition-colors hover:text-foreground hover:bg-accent"
          >
            {/* Render a stable placeholder until mounted so layout doesn't shift */}
            {!mounted ? (
              <span className="block h-[18px] w-[18px]" />
            ) : (
              <AnimatePresence mode="wait" initial={false}>
                {isDark ? (
                  <motion.span
                    key="moon"
                    initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <Moon className="h-[18px] w-[18px]" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="sun"
                    initial={{ rotate: 90, opacity: 0, scale: 0.6 }}
                    animate={{ rotate: 0, opacity: 1, scale: 1 }}
                    exit={{ rotate: -90, opacity: 0, scale: 0.6 }}
                    transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                    className="block"
                  >
                    <Sun className="h-[18px] w-[18px]" />
                  </motion.span>
                )}
              </AnimatePresence>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">
          {isDark ? "Switch to light" : "Switch to dark"}
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
