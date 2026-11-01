"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { Eye, Lightbulb, FileEdit, Send, Cpu, Lock } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  fadeUp,
  staggerContainer,
  viewportOnce,
  scaleIn,
} from "@/lib/motion";

/**
 * Autonomy levels — the five-level permission ladder that is the
 * conceptual spine of the whole product. Each level is rendered as
 * a horizontally-growing bar so the gradient from read-only (0) to
 * bounded autonomy (4) reads visually as "more trust = more reach".
 *
 * Hovering a level expands its inline description; the active level
 * is also keyboard-focusable.
 */

type Level = {
  level: number;
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  oneLiner: string;
  body: string;
  /** width % of the bar at this level — used for the animated fill */
  width: number;
  tone: "blocked" | "running" | "primary" | "pending" | "success";
};

const LEVELS: Level[] = [
  {
    level: 0,
    name: "Read-only",
    icon: Eye,
    oneLiner: "Look, don't touch.",
    body: "The model can read a scoped slice of your data to summarize or answer a question. Output is labeled AI-generated. Nothing is written.",
    width: 18,
    tone: "blocked",
  },
  {
    level: 1,
    name: "Recommend",
    icon: Lightbulb,
    oneLiner: "Suggest, don't prepare.",
    body: "The model proposes a next action. A human turns the recommendation into the actual draft or change. Stored as derived data, never as verified fact.",
    width: 36,
    tone: "running",
  },
  {
    level: 2,
    name: "Prepare",
    icon: FileEdit,
    oneLiner: "Draft, don't send.",
    body: "The model produces a complete, ready-to-send draft — reply, proposal, or knowledge change. It sits in a queue until a human approves it. The default ceiling for anything that touches a client, money, or commitments.",
    width: 56,
    tone: "primary",
  },
  {
    level: 3,
    name: "Approved execution",
    icon: Send,
    oneLiner: "Act, with a signed approval.",
    body: "An action runs for real, but only after an unexpired approval whose payload hash matches the exact target and version. Single-use. Any material change invalidates it. Never reaches a third party at level 4.",
    width: 78,
    tone: "pending",
  },
  {
    level: 4,
    name: "Bounded autonomy",
    icon: Cpu,
    oneLiner: "Run, inside a cage.",
    body: "An allowlisted action type with a written rule, a daily count cap, a spending cap, a kill switch, and a weekly audit review. Starts with internal, reversible actions only. Third-party reach waits for months of clean audit data.",
    width: 100,
    tone: "success",
  },
];

const toneClasses: Record<Level["tone"], { fill: string; chip: string; text: string }> = {
  blocked: {
    fill: "bg-blocked",
    chip: "bg-blocked/10 text-blocked",
    text: "text-blocked",
  },
  running: {
    fill: "bg-running",
    chip: "bg-running/10 text-running",
    text: "text-running",
  },
  primary: {
    fill: "bg-primary",
    chip: "bg-primary/10 text-primary",
    text: "text-primary",
  },
  pending: {
    fill: "bg-pending",
    chip: "bg-pending-bg text-pending",
    text: "text-pending",
  },
  success: {
    fill: "bg-success",
    chip: "bg-success/10 text-success",
    text: "text-success",
  },
};

export function AutonomyLevels() {
  const [active, setActive] = React.useState<number>(2);

  return (
    <section
      id="autonomy"
      className="relative scroll-mt-24 py-20 sm:py-24 lg:py-28"
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
            variants={scaleIn}
            className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            <Lock className="h-3 w-3 text-success" />
            Autonomy levels · enforced by the backend
          </motion.span>

          <motion.h2
            variants={fadeUp}
            className="mt-4 text-balance text-3xl font-semibold tracking-tight text-foreground sm:text-4xl"
          >
            Five levels of trust, set{" "}
            <span className="text-success">per action category</span>
            — not per agent.
          </motion.h2>

          <motion.p
            variants={fadeUp}
            className="mt-4 text-pretty text-base text-muted-foreground sm:text-lg"
          >
            A permission is a row in a policy table that the backend reads
            before any action. Changing a row is a human-only operation. The
            model can&apos;t widen its own permissions by writing a different prompt.
          </motion.p>
        </motion.div>

        <motion.div
          variants={staggerContainer(0.1, 0.15)}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-12 space-y-3"
        >
          {LEVELS.map((lvl) => {
            const isActive = active === lvl.level;
            const tone = toneClasses[lvl.tone];
            return (
              <motion.button
                key={lvl.level}
                variants={fadeUp}
                type="button"
                onClick={() => setActive(lvl.level)}
                onFocus={() => setActive(lvl.level)}
                onMouseEnter={() => setActive(lvl.level)}
                aria-pressed={isActive}
                aria-label={`Autonomy level ${lvl.level}: ${lvl.name}`}
                className={cn(
                  "group relative block w-full overflow-hidden rounded-2xl border bg-surface p-4 text-left transition-colors sm:p-5",
                  isActive
                    ? "border-border shadow-lg shadow-foreground/5"
                    : "border-border/70 hover:border-border"
                )}
              >
                <div className="flex items-center gap-4 sm:gap-6">
                  {/* level number + icon */}
                  <div className="flex w-16 shrink-0 items-center gap-3 sm:w-24">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-xl",
                        tone.chip
                      )}
                    >
                      <lvl.icon className="h-5 w-5" />
                    </div>
                    <div className="hidden flex-col sm:flex">
                      <span className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
                        level
                      </span>
                      <span className="text-lg font-semibold leading-none text-foreground">
                        {lvl.level}
                      </span>
                    </div>
                  </div>

                  {/* name + one-liner */}
                  <div className="flex-1">
                    <p className="text-base font-semibold text-foreground">
                      {lvl.name}
                    </p>
                    <p className="text-xs text-muted-foreground sm:text-sm">
                      {lvl.oneLiner}
                    </p>
                  </div>

                  {/* the animated bar */}
                  <div className="hidden w-40 shrink-0 sm:block lg:w-56">
                    <div className="h-2 w-full overflow-hidden rounded-full bg-border/60">
                      <motion.div
                        className={cn("h-full rounded-full", tone.fill)}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lvl.width}%` }}
                        viewport={viewportOnce}
                        transition={{
                          duration: 0.8,
                          ease: [0.16, 1, 0.3, 1],
                          delay: 0.1 * lvl.level,
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* expanded body */}
                <motion.div
                  initial={false}
                  animate={{
                    height: isActive ? "auto" : 0,
                    opacity: isActive ? 1 : 0,
                  }}
                  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pt-4 pl-16 text-sm leading-relaxed text-muted-foreground sm:pl-24">
                    {lvl.body}
                  </p>
                </motion.div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* footnote */}
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportOnce}
          className="mt-8 text-xs text-muted-foreground"
        >
          <span className="font-semibold text-foreground">Override:</span>{" "}
          marketplace terms, provider capabilities, legal duties, and account
          permissions sit above this table. If a connector does not declare a
          capability, the action is denied regardless of level — and the denial
          is logged.
        </motion.p>
      </div>
    </section>
  );
}