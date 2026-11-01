"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Inbox,
  ListChecks,
  Sunrise,
  Activity,
  BookOpen,
  ShieldCheck,
  GitBranch,
  AtSign,
  Mail,
} from "lucide-react";

import { AgencyOsLogo } from "@/components/home/logo";
import { fadeUp, staggerContainer, viewportOnce } from "@/lib/motion";

/**
 * Footer — sits at the bottom of the page using `mt-auto` on the
 * outer layout wrapper (see page.tsx) so it never floats when the
 * page is shorter than the viewport.
 *
 * Three column link grid + brand colophon. Each link is a real
 * anchor pointing at the section ids so the footer doubles as
 * a secondary nav.
 */

const FOOTER_LINKS: {
  title: string;
  links: { label: string; href: string; icon: React.ComponentType<{ className?: string }> }[];
}[] = [
  {
    title: "Product",
    links: [
      { label: "Unified inbox", href: "#features", icon: Inbox },
      { label: "Follow-ups & tasks", href: "#features", icon: ListChecks },
      { label: "Daily briefing", href: "#features", icon: Sunrise },
      { label: "Agent records", href: "#features", icon: Activity },
      { label: "Knowledge base", href: "#features", icon: BookOpen },
    ],
  },
  {
    title: "Architecture",
    links: [
      { label: "How it works", href: "#how-it-works", icon: Activity },
      { label: "Autonomy levels", href: "#autonomy", icon: ShieldCheck },
      { label: "Agent roles", href: "#agents", icon: Activity },
      { label: "Tool gateway", href: "#agents", icon: ShieldCheck },
    ],
  },
  {
    title: "Blueprint",
    links: [
      { label: "Strategic v2", href: "#top", icon: BookOpen },
      { label: "Request access", href: "#cta", icon: Mail },
      { label: "Local-first", href: "#cta", icon: ShieldCheck },
    ],
  },
];

const SOCIALS = [
  { icon: GitBranch, href: "https://github.com", label: "GitHub" },
  { icon: AtSign, href: "https://twitter.com", label: "Twitter / X" },
  { icon: Mail, href: "mailto:hello@agencyos.ai", label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-auto border-t border-border bg-surface/60">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-16">
        <motion.div
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-5"
        >
          {/* Brand col */}
          <motion.div variants={fadeUp} className="col-span-2 lg:col-span-2">
            <Link
              href="#top"
              className="inline-flex items-center gap-2.5"
              aria-label="AgencyOS AI — home"
            >
              <AgencyOsLogo className="h-8 w-8" />
              <span className="text-base font-semibold tracking-tight text-foreground">
                AgencyOS
                <span className="ml-1 text-primary">AI</span>
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              A policy-governed operating system for a one-person agency.
              Software owns the business rules. AI prepares and recommends.
              You decide.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIALS.map((s) => (
                <Link
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-background/60 text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  <s.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {FOOTER_LINKS.map((col) => (
            <motion.div key={col.title} variants={fadeUp}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {col.title}
              </h3>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="group inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      <link.icon className="h-3.5 w-3.5 text-muted-foreground/60 transition-colors group-hover:text-primary" />
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* bottom bar */}
        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} AgencyOS AI · Strategic Blueprint v2
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="inline-flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-success" />
              All systems recorded
            </span>
            <span className="text-muted-foreground/70">
              Next.js · FastAPI · PostgreSQL
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
