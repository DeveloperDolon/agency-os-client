"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Layers,
  Sparkles,
  ShieldCheck,
  Workflow,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/home/theme-toggle";
import { AgencyOsLogo } from "@/components/home/logo";

/**
 * Top-of-page navigation.
 *
 * Logo + primary nav links on the left, theme toggle + primary CTA
 * on the right. Below `md` the links collapse into a Sheet (slide-in
 * drawer) triggered by the hamburger.
 */

type NavItem = {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
};

const NAV_ITEMS: NavItem[] = [
  { label: "Features", href: "#features", icon: Layers },
  { label: "How it works", href: "#how-it-works", icon: Workflow },
  { label: "Autonomy levels", href: "#autonomy", icon: ShieldCheck },
  { label: "Agents", href: "#agents", icon: Sparkles },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [activeHref, setActiveHref] = React.useState<string>("");

  // Track which section is in view to highlight the active nav link.
  React.useEffect(() => {
    const ids = NAV_ITEMS.map((i) => i.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveHref(`#${visible.target.id}`);
      },
      { rootMargin: "-30% 0px -60% 0px", threshold: [0, 0.25, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="Primary"
      className="relative z-50 mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8"
    >
      {/* Left: logo */}
      <Link
        href="#top"
        className="flex items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-ring"
        aria-label="AgencyOS AI — home"
      >
        <AgencyOsLogo className="h-8 w-8" />
        <span className="text-[15px] font-semibold tracking-tight text-foreground">
          AgencyOS
          <span className="ml-1 text-primary">AI</span>
        </span>
      </Link>

      {/* Center: desktop nav */}
      <div className="hidden items-center gap-1 md:flex">
        {NAV_ITEMS.map((item) => {
          const isActive = activeHref === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative rounded-md px-3 py-2 text-sm font-medium transition-colors",
                "outline-none focus-visible:ring-2 focus-visible:ring-ring",
                isActive
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {item.label}
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-x-2 -bottom-px h-px bg-primary"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </Link>
          );
        })}
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <Button
          asChild
          size="sm"
          className="hidden h-9 rounded-full bg-primary px-4 text-primary-foreground shadow-sm shadow-primary/20 hover:bg-primary/90 sm:inline-flex"
        >
          <Link href="#cta">Request access</Link>
        </Button>

        {/* Mobile hamburger */}
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-9 w-9 rounded-full border border-border bg-surface/60 md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="right"
            className="w-[300px] border-border bg-background p-0"
          >
            <SheetHeader className="flex flex-row items-center justify-between border-b border-border px-5 py-4">
              <SheetTitle className="flex items-center gap-2 text-left">
                <AgencyOsLogo className="h-7 w-7" />
                <span className="text-base font-semibold">
                  AgencyOS<span className="text-primary"> AI</span>
                </span>
              </SheetTitle>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-4 w-4" />
              </Button>
            </SheetHeader>

            <div className="flex flex-col gap-1 px-3 py-4">
              <AnimatePresence>
                {NAV_ITEMS.map((item, i) => (
                  <motion.div
                    key={item.href}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.3 }}
                  >
                    <Link
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent hover:text-foreground"
                    >
                      <item.icon className="h-4 w-4 text-primary" />
                      {item.label}
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>

              <div className="mt-4 border-t border-border pt-4">
                <Button
                  asChild
                  className="h-10 w-full rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                  onClick={() => setMobileOpen(false)}
                >
                  <Link href="#cta">Request access</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
}
