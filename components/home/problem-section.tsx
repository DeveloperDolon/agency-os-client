"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Clock3,
  FileText,
  TrendingDown,
  Layers,
  EyeOff,
} from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
} from "@/lib/motion";

/**
 * Problem statement.
 *
 * Lists the five revenue-leaking behaviours a solo agency owner
 * falls into, drawn directly from the AgencyOS blueprint's
 * "Core problem" paragraph. Each row animates in from the left
 * with a soft stagger so the reader's eye walks down the list.
 */
const PROBLEMS = [
  {
    icon: Clock3,
    title: "Slow replies",
    body: "Marketplace inboxes reward the first responder. By the time you open the tab, the lead has gone cold.",
  },
  {
    icon: EyeOff,
    title: "Forgotten follow-ups",
    body: "Replies that needed a nudge next Tuesday slip through the cracks because no list owns them.",
  },
  {
    icon: FileText,
    title: "Weak proposals",
    body: "Each proposal starts from a blank page, so pricing, scope, and case studies get reinvented every time.",
  },
  {
    icon: TrendingDown,
    title: "Invisible profitability",
    body: "Without a single ledger, you can't tell which client type actually pays for the hours it eats.",
  },
  {
    icon: Layers,
    title: "Tool-switching tax",
    body: "Inbox, notes, spreadsheet, code tool — context is rebuilt in every tab and never compounds.",
  },
  {
    icon: AlertTriangle,
    title: "Silent AI risk",
    body: "When AI acts autonomously, you find out about the mistake from the customer — never the system.",
  },
];

export function ProblemSection() {
  return (
    <section
      id="problem"
      className="relative py-20 sm:py-24 lg:py-28"
    >
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
            <span className="h-1.5 w-1.5 rounded-full bg-danger" />
            The core problem
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            A solo agency loses revenue to{" "}
            <span className="text-danger">slow replies, forgotten follow-ups,
            and weak proposals</span>{" "}
            — not to a lack of effort.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg"
          >
            The work is happening across five tabs that never talk to each
            other. AgencyOS AI replaces the chaos with one spine — and one
            record of every decision made inside it.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {PROBLEMS.map((p) => (
            <motion.article
              key={p.title}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className={cn(
                "group relative overflow-hidden rounded-2xl border border-border bg-surface p-5",
                "transition-colors hover:border-danger/40"
              )}
            >
              {/* hover wash */}
              <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-br from-danger/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-danger/10 text-danger">
                <p.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-4 text-base font-semibold text-foreground">
                {p.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {p.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
