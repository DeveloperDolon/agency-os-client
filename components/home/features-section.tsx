"use client";

import { motion } from "framer-motion";
import {
  Inbox,
  ListChecks,
  Sunrise,
  Activity,
  BookOpen,
  DollarSign,
  ArrowUpRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  cardHover,
} from "@/lib/motion";

/**
 * Core features grid — the "build now" modules from the blueprint,
 * each card representing one shipping surface of AgencyOS AI.
 *
 * The first card is featured (spans 2 columns on lg) to break the
 * grid rhythm and direct the eye to the highest-value surface:
 * the unified inbox.
 */

type Feature = {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  bullets: string[];
  badge?: string;
  tone: "primary" | "running" | "success" | "pending";
  featured?: boolean;
};

const FEATURES: Feature[] = [
  {
    icon: Inbox,
    title: "Unified inbox + reply drafting",
    description:
      "Paste in messages from Upwork, Fiverr, or email. AgencyOS classifies intent, extracts the missing fields, and drafts a reply bound to your pricing rules — never sent until you approve.",
    bullets: [
      "Manual import as a first-class connector",
      "Approval bound to the exact draft version",
      "Material change invalidates the approval",
    ],
    badge: "highest value",
    tone: "primary",
    featured: true,
  },
  {
    icon: ListChecks,
    title: "Follow-ups & tasks",
    description:
      "Every conversation can spawn a follow-up with a due date. They land in one list you actually look at.",
    bullets: ["Due-date math", "ai_created tag (capped)", "Never alters deadlines you set"],
    tone: "success",
  },
  {
    icon: Sunrise,
    title: "Daily briefing",
    description:
      "Every morning: unanswered conversations, due follow-ups, and pending approvals — sourced from the database, not invented.",
    bullets: ["Read-only", "Every claim links to a record", "Level 4 autonomy"],
    tone: "running",
  },
  {
    icon: Activity,
    title: "Agent activity records",
    description:
      "Every agent run + tool invocation is one durable row with model, prompt version, tokens, and outcome.",
    bullets: ["Shared record for workflows + agents", "Idempotency keys", "Denials logged too"],
    tone: "primary",
  },
  {
    icon: BookOpen,
    title: "Knowledge base",
    description:
      "Agency profile, services, and pricing — each fact with provenance and a reviewable change history.",
    bullets: ["Provenance on every fact", "Reviewed changes only", "Profile first, then expand"],
    tone: "pending",
  },
  {
    icon: DollarSign,
    title: "Model usage & cost tracking",
    description:
      "Tokens per run are recorded from day one. After a week of real use, you have a measured cost — not a guess.",
    bullets: ["Per-run token counts", "Derived daily / weekly cost", "Provider usage fields"],
    tone: "success",
  },
];

const toneClasses: Record<Feature["tone"], string> = {
  primary: "bg-primary/10 text-primary",
  running: "bg-running/10 text-running",
  success: "bg-success/10 text-success",
  pending: "bg-pending-bg text-pending",
};

export function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
    >
      {/* soft divider wash */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer(0.1, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="max-w-2xl"
        >
          <motion.span
            variants={fadeUp}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            What ships in v2
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            One spine for the whole agency —{" "}
            <span className="text-primary">read-only first, autonomy later.</span>
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg"
          >
            The smallest version with real value: paste-in inbox, validated
            reply drafts, approve-and-copy, a follow-up list with due dates, and
            a morning briefing. It carries almost no risk because it acts on
            your data, not on the world.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
        >
          {FEATURES.map((f) => (
            <motion.article
              key={f.title}
              variants={fadeUp}
              {...cardHover}
              className={cn(
                "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-surface p-6",
                "transition-shadow hover:shadow-xl hover:shadow-foreground/5",
                f.featured && "lg:col-span-2 lg:row-span-1"
              )}
            >
              {/* subtle corner glow on hover */}
              <div className="pointer-events-none absolute -right-12 -top-12 h-32 w-32 rounded-full bg-primary/10 opacity-0 blur-2xl transition-opacity duration-300 group-hover:opacity-100" />

              <div className="flex items-start justify-between gap-3">
                <div
                  className={cn(
                    "flex h-11 w-11 items-center justify-center rounded-xl",
                    toneClasses[f.tone]
                  )}
                >
                  <f.icon className="h-5 w-5" />
                </div>
                {f.badge && (
                  <span className="rounded-full border border-primary/30 bg-primary/10 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                    {f.badge}
                  </span>
                )}
              </div>

              <h3 className="mt-5 text-lg font-semibold text-foreground">
                {f.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {f.description}
              </p>

              <ul className="mt-4 space-y-1.5">
                {f.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex items-start gap-2 text-xs text-muted-foreground"
                  >
                    <ArrowUpRight className="mt-0.5 h-3 w-3 shrink-0 text-primary" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
